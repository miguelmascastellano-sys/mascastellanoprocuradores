import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const SITE = "sc-domain:mascastellanoprocuradores.com";
const TARGET_QUERIES = [
  "procurador denia",
  "procurador dénia",
  "procurador alicante",
  "procurador benidorm",
  "procurador gandia",
  "procurador gandía",
];

type GscRow = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };

export type GscTrackingResult =
  | {
      site: string;
      startDate: string;
      endDate: string;
      days: number;
      targetQueries: string[];
      byQuery: GscRow[];
      byPage: GscRow[];
      byCountry: GscRow[];
      byPageQuery: GscRow[];
      daily: GscRow[];
    }
  | { error: string };

export const gscTracking = createServerFn({ method: "POST" })
  .middleware([attachSupabaseAuth])
  .inputValidator((input: unknown): { days?: number } => {
    if (input == null || typeof input !== "object") return {};
    return input as { days?: number };
  })
  .handler(async ({ data: body }): Promise<GscTrackingResult> => {
    try {
      // --- Auth: only admin users ---
      const authHeader = getRequestHeader("authorization") ?? "";
      const supabase = createClient(
        process.env['SUPABASE_URL']!,
        process.env['SUPABASE_ANON_KEY']!,
        { global: { headers: { Authorization: authHeader } } },
      );
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr || !userData?.user) {
        return { error: "unauthorized" };
      }
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: userData.user.id,
        _role: "admin",
      });
      if (!isAdmin) {
        return { error: "forbidden" };
      }

      const days = Math.min(Math.max(Number(body.days) || 28, 1), 480);
      const endDate = new Date();
      const startDate = new Date();
      startDate.setUTCDate(endDate.getUTCDate() - days);
      const fmt = (d: Date) => d.toISOString().slice(0, 10);

      const LOVABLE_KEY = process.env['LOVABLE_API_KEY'];
      const GSC_KEY = process.env['GOOGLE_SEARCH_CONSOLE_API_KEY'];
      if (!LOVABLE_KEY || !GSC_KEY) {
        return { error: "Search Console no está conectado en este proyecto." };
      }

      const gatewayUrl = `https://connector-gateway.lovable.dev/google_search_console/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;

      async function gscQuery(dimensions: string[]): Promise<{ rows?: GscRow[] }> {
        const res = await fetch(gatewayUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_KEY}`,
            "X-Connection-Api-Key": GSC_KEY!,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: fmt(startDate),
            endDate: fmt(endDate),
            dimensions,
            dimensionFilterGroups: [
              {
                filters: TARGET_QUERIES.map((q) => ({
                  dimension: "query",
                  operator: "equals",
                  expression: q,
                })),
                groupType: "or",
              },
            ],
            rowLimit: 1000,
            type: "web",
          }),
        });
        const text = await res.text();
        if (!res.ok) throw new Error(`GSC ${res.status}: ${text}`);
        return JSON.parse(text) as { rows?: GscRow[] };
      }

      const [byQuery, byPage, byCountry, byPageQuery, dailyByQuery] = await Promise.all([
        gscQuery(["query"]),
        gscQuery(["query", "page"]),
        gscQuery(["query", "country"]),
        gscQuery(["query", "page", "country"]),
        gscQuery(["date", "query"]),
      ]);

      return {
        site: SITE,
        startDate: fmt(startDate),
        endDate: fmt(endDate),
        days,
        targetQueries: TARGET_QUERIES,
        byQuery: byQuery.rows ?? [],
        byPage: byPage.rows ?? [],
        byCountry: byCountry.rows ?? [],
        byPageQuery: byPageQuery.rows ?? [],
        daily: dailyByQuery.rows ?? [],
      };
    } catch (e) {
      const err = e as { message?: string };
      return { error: String(err?.message ?? e) };
    }
  });
