import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const siteUrl = "https://mascastellanoprocuradores.com";

  const { data: posts } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const staticPages = [
    { loc: "/", priority: "1.0" },
    { loc: "/sobre-nosotros", priority: "0.8" },
    { loc: "/servicios", priority: "0.8" },
    { loc: "/blog", priority: "0.9" },
    { loc: "/contacto", priority: "0.7" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (p) => `  <url>
    <loc>${siteUrl}${p.loc}</loc>
    <priority>${p.priority}</priority>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join("\n")}
${(posts ?? [])
  .map(
    (p) => `  <url>
    <loc>${siteUrl}/blog/${p.slug}</loc>
    <lastmod>${new Date(p.updated_at).toISOString().split("T")[0]}</lastmod>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, { headers: corsHeaders });
});
