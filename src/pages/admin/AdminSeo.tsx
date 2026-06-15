import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Search, TrendingUp, MousePointerClick, Eye, BarChart3 } from "lucide-react";

type Row = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };
type Data = {
  startDate: string; endDate: string; days: number;
  targetQueries: string[];
  byQuery: Row[]; byPage: Row[]; byCountry: Row[]; byPageQuery: Row[]; daily: Row[];
};

const fmtPct = (n: number) => `${(n * 100).toFixed(2)}%`;
const fmtPos = (n: number) => n.toFixed(1);
const shortUrl = (u: string) => u.replace(/^https?:\/\/[^/]+/, "") || "/";
const countryName = (c: string) => {
  try { return new Intl.DisplayNames(["es"], { type: "region" }).of(c.toUpperCase()) ?? c; }
  catch { return c; }
};

const AdminSeo = () => {
  const [days, setDays] = useState(28);

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
