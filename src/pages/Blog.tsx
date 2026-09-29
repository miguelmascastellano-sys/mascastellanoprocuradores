import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { usePublishedPosts } from "@/hooks/usePosts";
import { estimateReadTime } from "@/lib/markdown";
import ScrollReveal from "@/components/ScrollReveal";
import { Helmet } from "react-helmet-async";

const Blog = () => {
  const { data: posts, isLoading } = usePublishedPosts();

  return (
    <>
      <Helmet>
        <title>Blog | Mas Castellano — Procurador en Dénia, Alicante y Marina Alta</title>
        <meta
          name="description"
          content="Artículos de procuraduría y derecho procesal en Dénia, Alicante y Benidorm. Guías sobre representación judicial, plazos, notificaciones y ejecuciones."
        />
        <meta name="keywords" content="procurador Dénia, procurador Alicante, procurador Benidorm, representación procesal, notificaciones judiciales, ejecuciones judiciales" />
        <link rel="canonical" href="https://mascastellanoprocuradores.com/blog" />
        <meta property="og:title" content="Blog | Mas Castellano — Procurador en Dénia, Alicante y Marina Alta" />
        <meta property="og:description" content="Artículos sobre procuraduría y representación procesal en Dénia, Alicante y Benidorm." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mascastellanoprocuradores.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Mas Castellano — Procurador en Dénia, Alicante y Marina Alta" />
        <meta name="twitter:description" content="Artículos sobre procuraduría y representación procesal en Dénia, Alicante y Benidorm." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-20 md:py-28 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal>
              <div className="w-12 h-px bg-primary mx-auto mb-6" />
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
                Blog
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                Artículos sobre representación procesal, plazos y actuaciones judiciales en Dénia, Alicante y Benidorm
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Posts grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-border rounded-lg bg-card p-8 animate-pulse">
                    <div className="h-4 bg-muted rounded w-20 mb-4" />
                    <div className="h-6 bg-muted rounded w-full mb-3" />
                    <div className="h-4 bg-muted rounded w-3/4 mb-6" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {posts?.map((post, i) => (
                  <ScrollReveal key={post.slug} delay={i * 0.08}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group block h-full"
                    >
                      <article className="border border-border rounded-lg bg-card p-8 h-full flex flex-col transition-colors hover:border-primary/50">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                            Artículo
                          </span>
                        </div>
                        <h2 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {post.published_at
                                ? new Date(post.published_at).toLocaleDateString("es-ES", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "—"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {estimateReadTime(post.content_markdown)}
                            </span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </article>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
            {!isLoading && (!posts || posts.length === 0) && (
              <p className="text-center text-muted-foreground">No hay artículos publicados todavía.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;
