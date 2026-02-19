import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Mas Castellano — Procurador de los Tribunales",
    },
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Mas Castellano — Procurador</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={`/blog/${post.slug}`} />
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
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-bold text-foreground mb-10 leading-tight">
                {post.title}
              </h1>
            </ScrollReveal>

            <div className="space-y-6">
              {post.content.map((paragraph, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <p className="text-muted-foreground leading-relaxed text-[1.05rem]">
                    {paragraph}
                  </p>
                </ScrollReveal>
              ))}
            </div>

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
