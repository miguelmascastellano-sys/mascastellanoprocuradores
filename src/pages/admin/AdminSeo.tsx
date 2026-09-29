import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Search, TrendingUp, MousePointerClick, Eye, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Row = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };
type Data = {
  startDate: string; endDate: string; days: number;
  targetQueries: string[];
  byQuery: Row[]; byPage: Row[]; byCountry: Row[]; byPageQuery: Row[]; daily: Row[];
};
type Recommendation = { action: "crear" | "mejorar"; title: string; locality: string; targetQuery: string; targetPage: string; reason: string; angle: string };
type Analysis = { summary: string; recommendations: Recommendation[] };
type InputRow = { query: string; page: string; clicks: number; impressions: number; ctr: number; position: number };

function parsePerformance(input: string): InputRow[] {
  const lines = input.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2 || lines.length > 101) throw new Error("Pega la cabecera y entre 1 y 100 filas de Search Console.");
  const delimiter = lines[0].includes("\t") ? "\t" : lines[0].includes(";") ? ";" : ",";
  const split = (line: string) => line.split(delimiter).map((cell) => cell.trim().replace(/^"|"$/g, ""));
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const headers = split(lines[0]).map(normalize);
  const column = (names: string[]) => headers.findIndex((h) => names.includes(h));
  const cols = [column(["query", "queries", "consulta", "consultas", "palabra clave"]), column(["page", "pagina", "paginas", "url"]), column(["clicks", "clics"]), column(["impressions", "impresiones"]), column(["ctr"]), column(["position", "posicion"] )];
  if ([cols[0], cols[2], cols[3], cols[5]].some((v) => v < 0)) throw new Error("Se necesitan columnas Consulta, Clics, Impresiones y Posición; Página y CTR son opcionales.");
  const numeric = (value: string) => value.trim() ? Number(value.replace(/\s/g, "").replace(/\.(?=\d{3}(?:\D|$))/g, "").replace(",", ".").replace("%", "")) : NaN;
  return lines.slice(1).map((line, i) => {
    const cells = split(line);
    const query = cells[cols[0]]?.trim() ?? "";
    const page = cols[1] < 0 ? "" : cells[cols[1]] ?? "";
    const clicks = numeric(cells[cols[2]] ?? "");
    const impressions = numeric(cells[cols[3]] ?? "");
    const position = numeric(cells[cols[5]] ?? "");
    const ctr = cols[4] < 0 ? (impressions ? clicks / impressions : 0) : numeric(cells[cols[4]] ?? "") / (cells[cols[4]]?.includes("%") ? 100 : 1);
    if (!query || !Number.isInteger(clicks) || !Number.isInteger(impressions) || clicks < 0 || impressions < 0 || clicks > impressions || !Number.isFinite(ctr) || ctr < 0 || ctr > 1 || !Number.isFinite(position) || position < 0 || (page && !page.startsWith("/") && !/^https?:\/\/mascastellanoprocuradores\.com(?:\/|$)/i.test(page))) {
      throw new Error(`Revisa las cifras o la página de la fila ${i + 2}.`);
    }
    return { query, page, clicks, impressions, ctr, position };
  });
}

const fmtPct = (n: number) => `${(n * 100).toFixed(2)}%`;
const fmtPos = (n: number) => n.toFixed(1);
const shortUrl = (u: string) => u.replace(/^https?:\/\/[^/]+/, "") || "/";
const countryName = (c: string) => {
  try { return new Intl.DisplayNames(["es"], { type: "region" }).of(c.toUpperCase()) ?? c; }
  catch { return c; }
};

const AdminSeo = () => {
  const [days, setDays] = useState(28);
  const [pastedData, setPastedData] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [analysisError, setAnalysisError] = useState("");
  const [analysing, setAnalysing] = useState(false);

  const { data, isLoading, error, refetch, isFetching } = useQuery<Data>({
    queryKey: ["gsc-tracking", days],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("gsc-tracking", { body: { days } });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      return data as Data;
    },
  });

  const totals = data?.byQuery.reduce(
    (acc, r) => ({ clicks: acc.clicks + r.clicks, impressions: acc.impressions + r.impressions }),
    { clicks: 0, impressions: 0 },
  ) ?? { clicks: 0, impressions: 0 };
  const avgCtr = totals.impressions ? totals.clicks / totals.impressions : 0;
  const avgPos = data?.byQuery.length
    ? data.byQuery.reduce((a, r) => a + r.position * r.impressions, 0) / Math.max(totals.impressions, 1)
    : 0;

  const analyse = async () => {
    setAnalysis(null);
    setAnalysisError("");
    let rows: InputRow[];
    try {
      rows = pastedData.trim()
        ? parsePerformance(pastedData)
        : (data?.byPageQuery.length ? data.byPageQuery : data?.byQuery ?? []).slice(0, 100).map((r) => ({
            query: r.keys[0], page: r.keys[1] ?? "", clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
          }));
      if (!rows.length) throw new Error("Pega datos de Search Console o espera a que se carguen las métricas conectadas.");
    } catch (e) { setAnalysisError((e as Error).message); return; }
    setAnalysing(true);
    try {
      const { data: published, error: postsError } = await supabase.from("posts").select("title").eq("status", "published").limit(50);
      if (postsError) throw postsError;
      const { data: response, error: invokeError } = await supabase.functions.invoke("seo-recommendations", {
        body: { rows, period: pastedData.trim() ? "Datos aportados por administrador" : `${data?.startDate} a ${data?.endDate}`, existingArticles: published?.map((p) => p.title) ?? [] },
      });
      if (invokeError) {
        const details = await invokeError.context?.json?.().catch(() => null);
        throw new Error(details?.error ?? invokeError.message);
      }
      if (response?.error) throw new Error(response.error);
      setAnalysis(response as Analysis);
    } catch (e) { setAnalysisError((e as Error).message); }
    finally { setAnalysing(false); }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Posicionamiento SEO</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Google Search Console · "procurador denia/alicante/benidorm/gandia"
          </p>
        </div>
        <div className="flex gap-2 items-center">
          {[7, 28, 90, 180].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                days === d ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >{d}d</button>
          ))}
          <button
            onClick={() => refetch()}
            className="px-3 py-1.5 text-xs rounded-full border border-border hover:bg-muted"
          >{isFetching ? "Actualizando…" : "Actualizar"}</button>
        </div>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Cargando datos de Search Console…</p>}
      {error && (
        <div className="p-4 rounded-md border border-destructive/40 bg-destructive/5 text-sm text-destructive">
          Error: {(error as Error).message}
        </div>
      )}

      <section className="space-y-4 border-y border-border py-6" aria-label="Oportunidades editoriales">
        <div>
          <h2 className="text-lg font-serif font-bold text-foreground flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />Oportunidades de artículos locales</h2>
          <p className="text-sm text-muted-foreground mt-1">Pega filas exportadas de Search Console o analiza los datos conectados. Las propuestas no se publican automáticamente.</p>
        </div>
        <label htmlFor="gsc-input" className="block text-sm font-medium text-foreground">Datos de rendimiento (CSV o columnas copiadas de una tabla)</label>
        <Textarea id="gsc-input" value={pastedData} onChange={(e) => setPastedData(e.target.value)} rows={5} className="font-mono text-xs" placeholder={"Consulta\tPágina\tClics\tImpresiones\tCTR\tPosición\nprocurador denia\thttps://mascastellanoprocuradores.com/procurador-denia\t4\t120\t3,33%\t12,5"} />
        <Button onClick={analyse} disabled={analysing} className="gap-2"><Sparkles className="h-4 w-4" />{analysing ? "Analizando…" : "Recomendar artículos"}</Button>
        {analysisError && <p role="alert" className="text-sm text-destructive">{analysisError}</p>}
        {analysis && <div aria-live="polite" className="space-y-3">
          <p className="text-sm text-foreground">{analysis.summary}</p>
          {!analysis.recommendations.length && <p className="text-sm text-muted-foreground">No hay oportunidades justificadas con estos datos.</p>}
          <div className="grid gap-3 md:grid-cols-2">
            {analysis.recommendations.map((item, i) => <article key={`${item.title}-${i}`} className="border border-border bg-background rounded-md p-4 space-y-2">
              <p className="text-xs font-semibold text-primary uppercase">{item.action === "crear" ? "Crear" : "Mejorar"} · {item.locality}</p>
              <h3 className="font-serif font-bold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground"><strong>Consulta:</strong> {item.targetQuery}</p>
              {item.targetPage && <p className="text-sm text-muted-foreground break-all"><strong>Página:</strong> {item.targetPage}</p>}
              <p className="text-sm text-foreground">{item.reason}</p>
              <p className="text-sm text-muted-foreground">{item.angle}</p>
            </article>)}
          </div>
        </div>}
      </section>

      {data && (
        <>
          <p className="text-xs text-muted-foreground">
            Periodo: {data.startDate} → {data.endDate} ({data.days} días)
          </p>

          {/* KPI cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KpiCard icon={Eye} label="Impresiones" value={totals.impressions.toLocaleString("es-ES")} />
            <KpiCard icon={MousePointerClick} label="Clics" value={totals.clicks.toLocaleString("es-ES")} />
            <KpiCard icon={BarChart3} label="CTR medio" value={fmtPct(avgCtr)} />
            <KpiCard icon={TrendingUp} label="Posición media" value={avgPos ? fmtPos(avgPos) : "—"} />
          </div>

          {/* By query */}
          <Section title="Por palabra clave" icon={Search}>
            <Table headers={["Keyword", "Impresiones", "Clics", "CTR", "Posición"]}>
              {data.byQuery.map((r) => (
                <tr key={r.keys[0]} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{r.keys[0]}</td>
                  <td className="px-3 py-2 tabular-nums">{r.impressions}</td>
                  <td className="px-3 py-2 tabular-nums">{r.clicks}</td>
                  <td className="px-3 py-2 tabular-nums">{fmtPct(r.ctr)}</td>
                  <td className="px-3 py-2 tabular-nums">{fmtPos(r.position)}</td>
                </tr>
              ))}
              {!data.byQuery.length && <EmptyRow cols={5} />}
            </Table>
          </Section>

          {/* By page */}
          <Section title="Por página de destino" icon={Search}>
            <Table headers={["Keyword", "Página", "Impresiones", "Clics", "CTR", "Posición"]}>
              {data.byPage.map((r, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-3 py-2">{r.keys[0]}</td>
                  <td className="px-3 py-2 font-mono text-xs">{shortUrl(r.keys[1])}</td>
                  <td className="px-3 py-2 tabular-nums">{r.impressions}</td>
                  <td className="px-3 py-2 tabular-nums">{r.clicks}</td>
                  <td className="px-3 py-2 tabular-nums">{fmtPct(r.ctr)}</td>
                  <td className="px-3 py-2 tabular-nums">{fmtPos(r.position)}</td>
                </tr>
              ))}
              {!data.byPage.length && <EmptyRow cols={6} />}
            </Table>
          </Section>

          {/* By country */}
          <Section title="Por país" icon={Search}>
            <Table headers={["Keyword", "País", "Impresiones", "Clics", "CTR", "Posición"]}>
              {data.byCountry.map((r, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-3 py-2">{r.keys[0]}</td>
                  <td className="px-3 py-2">{countryName(r.keys[1])}</td>
                  <td className="px-3 py-2 tabular-nums">{r.impressions}</td>
                  <td className="px-3 py-2 tabular-nums">{r.clicks}</td>
                  <td className="px-3 py-2 tabular-nums">{fmtPct(r.ctr)}</td>
                  <td className="px-3 py-2 tabular-nums">{fmtPos(r.position)}</td>
                </tr>
              ))}
              {!data.byCountry.length && <EmptyRow cols={6} />}
            </Table>
          </Section>

          {/* Cross: Keyword × Página × País */}
          <Section title="Detalle Keyword × Página × País" icon={Search}>
            <Table headers={["Keyword", "Página", "País", "Imp.", "Clics", "CTR", "Pos."]}>
              {data.byPageQuery.map((r, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-3 py-2">{r.keys[0]}</td>
                  <td className="px-3 py-2 font-mono text-xs">{shortUrl(r.keys[1])}</td>
                  <td className="px-3 py-2">{countryName(r.keys[2])}</td>
                  <td className="px-3 py-2 tabular-nums">{r.impressions}</td>
                  <td className="px-3 py-2 tabular-nums">{r.clicks}</td>
                  <td className="px-3 py-2 tabular-nums">{fmtPct(r.ctr)}</td>
                  <td className="px-3 py-2 tabular-nums">{fmtPos(r.position)}</td>
                </tr>
              ))}
              {!data.byPageQuery.length && <EmptyRow cols={7} />}
            </Table>
          </Section>
        </>
      )}
    </div>
  );
};

const KpiCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="rounded-lg border border-border bg-background p-4">
    <div className="flex items-center gap-2 text-xs text-muted-foreground"><Icon className="h-3.5 w-3.5" />{label}</div>
    <div className="mt-2 text-2xl font-serif font-bold text-foreground">{value}</div>
  </div>
);

const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <section>
    <h2 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
      <Icon className="h-4 w-4 text-muted-foreground" />{title}
    </h2>
    <div className="rounded-lg border border-border bg-background overflow-x-auto">{children}</div>
  </section>
);

const Table = ({ headers, children }: { headers: string[]; children: React.ReactNode }) => (
  <table className="w-full text-sm">
    <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
      <tr>{headers.map((h) => <th key={h} className="px-3 py-2 text-left font-medium">{h}</th>)}</tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

const EmptyRow = ({ cols }: { cols: number }) => (
  <tr><td colSpan={cols} className="px-3 py-6 text-center text-xs text-muted-foreground">Sin datos en el periodo seleccionado.</td></tr>
);

export default AdminSeo;
