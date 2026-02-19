import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import ScrollReveal from "@/components/ScrollReveal";
import { Helmet } from "react-helmet-async";

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog | Mas Castellano — Procurador de los Tribunales</title>
        <meta
          name="description"
          content="Artículos sobre procuraduría, derecho procesal, plazos judiciales y práctica forense. Información útil para abogados y ciudadanos."
        />
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
                Artículos sobre procuraduría, derecho procesal y práctica forense
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Posts grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {blogPosts.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.08}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block h-full"
                  >
                    <article className="border border-border rounded-lg bg-card p-8 h-full flex flex-col transition-colors hover:border-primary/50">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {post.category}
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
                            {new Date(post.date).toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {post.readTime}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;
