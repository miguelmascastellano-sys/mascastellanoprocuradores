import { Link } from "@/lib/router-compat";
import { Calendar, ArrowRight } from "lucide-react";
import { usePublishedPosts } from "@/hooks/usePosts";

const formatFecha = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
    : "";

const ActualidadSection = () => {
  const { data: posts } = usePublishedPosts();
  const articulos = (posts ?? []).slice(0, 3);

  if (articulos.length === 0) return null;

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] tracking-[0.42em] uppercase text-gold font-medium">
            Actualidad
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mt-4 leading-tight">
            Actualidad y Consejos Procesales
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            Reflexiones y análisis prácticos sobre el día a día de la procura en los partidos
            judiciales de Alicante, Dénia, Benidorm y Gandía.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articulos.map((art) => (
            <article
              key={art.id}
              className="group flex flex-col border border-border bg-card p-8 hover:border-gold/60 transition-colors"
            >
              <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
                <Calendar className="h-3.5 w-3.5 text-gold" />
                <span>{formatFecha(art.published_at ?? art.created_at)}</span>
              </div>
              <h3 className="font-serif text-xl md:text-[22px] font-semibold text-foreground leading-snug mb-4">
                {art.title}
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8 flex-1">
                {art.excerpt ?? ""}
              </p>
              <Link
                to={`/blog/${art.slug}`}
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-foreground hover:text-gold transition-colors self-start"
              >
                Leer artículo completo
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActualidadSection;
