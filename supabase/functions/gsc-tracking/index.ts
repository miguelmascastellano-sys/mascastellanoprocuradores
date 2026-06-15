import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const SITE = 'sc-domain:mascastellanoprocuradores.com';
const TARGET_QUERIES = [
  'procurador denia',
  'procurador dénia',
  'procurador alicante',
  'procurador benidorm',
  'procurador gandia',
  'procurador gandía',
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    // --- Auth: only admin users ---
    const authHeader = req.headers.get('Authorization') ?? '';
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { data: isAdmin } = await supabase.rpc('has_role', {
      _user_id: userData.user.id, _role: 'admin',
    });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'forbidden' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // --- Parse body ---
    const body = await req.json().catch(() => ({}));
    const days = Math.min(Math.max(Number(body.days) || 28, 1), 480);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setUTCDate(endDate.getUTCDate() - days);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);

    const LOVABLE_KEY = Deno.env.get('LOVABLE_API_KEY');
    const GSC_KEY = Deno.env.get('GOOGLE_SEARCH_CONSOLE_API_KEY');
    if (!LOVABLE_KEY || !GSC_KEY) {
      return new Response(JSON.stringify({ error: 'Search Console no está conectado en este proyecto.' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const gatewayUrl = `https://connector-gateway.lovable.dev/google_search_console/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;

    async function gscQuery(dimensions: string[]) {
      const res = await fetch(gatewayUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_KEY}`,
          'X-Connection-Api-Key': GSC_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: fmt(startDate),
          endDate: fmt(endDate),
          dimensions,
          dimensionFilterGroups: [{
            filters: TARGET_QUERIES.map((q) => ({
              dimension: 'query', operator: 'equals', expression: q,
            })),
            groupType: 'or',
          }],
          rowLimit: 1000,
          type: 'web',
        }),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`GSC ${res.status}: ${text}`);
      return JSON.parse(text);
    }

    const [byQuery, byPage, byCountry, byPageQuery, dailyByQuery] = await Promise.all([
      gscQuery(['query']),
      gscQuery(['query', 'page']),
      gscQuery(['query', 'country']),
      gscQuery(['query', 'page', 'country']),
      gscQuery(['date', 'query']),
    ]);

    return new Response(JSON.stringify({
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
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e?.message ?? e) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
