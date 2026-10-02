import { useParams, Link, Navigate } from "@/lib/router-compat";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { usePostBySlug } from "@/hooks/usePosts";
import { trackView } from "@/hooks/usePostStats";
import { renderMarkdown, estimateReadTime } from "@/lib/markdown";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useEffect, useRef } from "react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = usePostBySlug(slug);
  const tracked = useRef(false);

  useEffect(() => {
    if (post && !tracked.current) {
      tracked.current = true;
      trackView(post.id, post.slug);
    }
  }, [post]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="py-20 md:py-28 container mx-auto px-4 max-w-3xl animate-pulse">
          <div className="h-4 bg-muted rounded w-24 mb-8" />
          <div className="h-8 bg-muted rounded w-3/4 mb-4" />
          <div className="h-6 bg-muted rounded w-1/2 mb-10" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-muted rounded" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error || !post) return <Navigate to="/blog" replace />;

  const seoTitle = post.seo_title ?? post.title;
  const seoDesc = post.seo_description ?? post.excerpt ?? "";
  const canonical = post.seo_canonical_url ?? `/blog/${post.slug}`;

  const jsonLd = post.schema_json_ld ?? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: seoTitle,
    description: seoDesc,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    image: post.og_image_url ?? post.cover_image_url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    author: {
      "@type": "Organization",
      name: "Mas Castellano — Procurador de los Tribunales",
    },
  };

  const htmlContent = renderMarkdown(post.content_markdown);

  return (
    <>
      <Helmet>
        <title>{seoTitle} | Mas Castellano — Procurador</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={canonical} />
        {post.seo_robots && <meta name="robots" content={post.seo_robots} />}
        <meta property="og:title" content={post.og_title ?? seoTitle} />
        <meta property="og:description" content={post.og_description ?? seoDesc} />
        {(post.og_image_url ?? post.cover_image_url) && (
          <meta property="og:image" content={post.og_image_url ?? post.cover_image_url!} />
        )}
        <meta name="twitter:card" content={post.twitter_card ?? "summary_large_image"} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="min-h-screen bg-background">
        <article className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-3xl">
            <ScrollReveal>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al blog
              </Link>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Artículo
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "—"}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {estimateReadTime(post.content_markdown)}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-bold text-foreground mb-10 leading-tight">
                {post.title}
              </h1>
            </ScrollReveal>

            <ScrollReveal>
              <div
                className="prose prose-neutral max-w-none text-muted-foreground leading-relaxed text-[1.05rem] [&_h2]:font-serif [&_h2]:text-foreground [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-serif [&_h3]:text-foreground [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </ScrollReveal>

            <ScrollReveal>
              <div className="mt-16 pt-10 border-t border-border text-center">
                <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                  ¿Necesita un procurador de confianza?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Estamos a su disposición para resolver cualquier consulta procesal.
                </p>
                <Button asChild size="lg" className="text-base font-semibold px-10">
                  <Link to="/contacto">Contactar Ahora</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogPost;
