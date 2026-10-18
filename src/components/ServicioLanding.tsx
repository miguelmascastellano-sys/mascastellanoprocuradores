import { Helmet } from "@/lib/helmet";
import { Link } from "@/lib/router-compat";
import { Phone, MessageCircle, Mail, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "@/components/ScrollReveal";
import heroBg from "@/assets/hero-bg.jpg";
import { coverageAreas } from "@/data/coverage";
import RelatedPages from "@/components/RelatedPages";

const TELEFONO = "+34644206106";
const TELEFONO_DISPLAY = "644 206 106";
const WHATSAPP = "https://wa.me/34644206106";
const EMAIL = "miguel.mas@icopal.org";

export interface ServicioSection {
  h2: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ServicioLandingProps {
  badge: string;
  h1: string;
  heroSubtitulo: string;
  intro: string;
  sections: ServicioSection[];
  faqs: { q: string; a: string }[];
  faqClose: string;
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  schemaName: string;
  schemaDescription: string;
  /** Pasos opcionales del bloque "Cómo trabajamos". */
  steps?: { title: string; desc: string }[];
  /** Enlaces internos a servicios relacionados. */
  related?: { label: string; path: string }[];
  /** Ámbito nacional: cambia migas y áreas atendidas en datos estructurados. */
  national?: boolean;
  /** Tipo schema.org principal (por defecto LegalService). */
  schemaType?: string;
  routeMetadata?: boolean;
}

const ServicioLanding = ({
  badge,
  h1,
  heroSubtitulo,
  intro,
  sections,
  faqs,
  faqClose,
  seoTitle,
  seoDescription,
  canonical,
  schemaName,
  schemaDescription,
  steps,
  related,
  schemaType = "LegalService",
  national = false,
  routeMetadata = false,
}: ServicioLandingProps) => {
  const areaServed = coverageAreas;
  const localRelated = canonical.endsWith("/desahucios-alicante")
    ? [{ label: "Procurador en Alicante", path: "/procurador-alicante" }, { label: "Ejecuciones judiciales en Alicante", path: "/ejecuciones-judiciales-alicante" }, { label: "Aranceles de procurador", path: "/precio-procurador-alicante" }]
    : canonical.endsWith("/subastas-judiciales-alicante")
      ? [{ label: "Ejecuciones judiciales en Alicante", path: "/ejecuciones-judiciales-alicante" }, { label: "Procurador para ejecuciones", path: "/procurador-ejecuciones-judiciales" }, { label: "Provincia de Alicante", path: "/procurador-provincia-alicante" }]
      : canonical.endsWith("/ejecuciones-judiciales-alicante")
        ? [{ label: "Procurador en Alicante", path: "/procurador-alicante" }, { label: "Subastas judiciales en Alicante", path: "/subastas-judiciales-alicante" }, { label: "Gestionar ejecuciones con procurador", path: "/gestionar-ejecuciones-con-procurador" }]
        : undefined;
  const relatedLinks = related ?? localRelated;
  const parent = national
    ? { name: "Servicios", path: "/servicios" }
    : { name: "Procurador en Alicante", path: "/procurador-alicante" };
  return (
    <>
      <Helmet>
        {!routeMetadata && <>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        </>}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": schemaType,
          name: schemaName,
          description: schemaDescription,
          url: canonical,
          telephone: TELEFONO,
          email: EMAIL,
          areaServed,
          provider: { "@id": "https://mascastellanoprocuradores.com/#organization" },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/85 via-foreground/75 to-foreground/90" />
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <ScrollReveal>
            <span className="inline-block text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-gold mb-8 border border-gold/30 px-5 py-2">
              {badge}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-serif font-bold text-white mb-6 leading-[1.15] tracking-tight max-w-4xl mx-auto">
              {h1}
            </h1>
            <p className="text-base md:text-lg text-white/70 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              {heroSubtitulo}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="text-sm font-semibold tracking-wide uppercase px-8 h-13 bg-gold text-foreground hover:bg-gold/90 rounded-none"
              >
                <a href={`tel:${TELEFONO}`}>
                  <Phone className="h-4 w-4" />
                  Llamar al {TELEFONO_DISPLAY}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="text-sm font-semibold tracking-wide uppercase px-8 h-13 bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground rounded-none"
              >
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="text-sm font-semibold tracking-wide uppercase px-8 h-13 bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground rounded-none"
              >
                <Link to="/contacto">
                  <Mail className="h-4 w-4" />
                  Formulario
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-xs font-sans tracking-wide text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-foreground">Inicio</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={parent.path} className="hover:text-foreground">{parent.name}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{badge}</span>
          </nav>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <p className="text-lg md:text-xl font-serif text-foreground leading-relaxed text-center">
              {intro}
            </p>
            <div className="w-12 h-px bg-gold mx-auto mt-10" />
          </ScrollReveal>
        </div>
      </section>

      {/* Secciones de contenido */}
      <section className="pb-20 md:pb-28 bg-background">
        <div className="container mx-auto px-4 max-w-3xl space-y-16">
          {sections.map((s, idx) => (
            <ScrollReveal key={s.h2} delay={idx * 0.04}>
              <article>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6 leading-tight">
                  {s.h2}
                </h2>
                <div className="space-y-5">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-base text-muted-foreground font-light leading-relaxed">
                      {p}
                    </p>
                  ))}
                  {s.bullets && (
                    <ul className="space-y-3 mt-4">
                      {s.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-muted-foreground font-light leading-relaxed">
                          <span className="block h-1.5 w-1.5 bg-gold mt-2.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {steps && steps.length > 0 && (
        <section className="py-20 md:py-24 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">Método</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Cómo trabajamos</h2>
                <div className="w-12 h-px bg-gold mx-auto mt-6" />
              </div>
            </ScrollReveal>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
              {steps.map((st, i) => (
                <li key={st.title} className="bg-background p-8">
                  <span className="font-serif text-3xl text-gold">{i + 1}</span>
                  <h3 className="font-serif text-lg font-semibold text-foreground mt-3 mb-2">{st.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{st.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* CTA intermedio */}
      <section className="py-16 bg-foreground">
        <ScrollReveal>
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
              Consulte su asunto sin compromiso
            </h2>
            <p className="text-white/70 font-light mb-8 leading-relaxed">
              Atención directa por el procurador. Valoramos su caso, le indicamos los plazos aplicables y la actuación procesal recomendada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="text-sm font-semibold tracking-wide uppercase px-8 h-13 bg-gold text-foreground hover:bg-gold/90 rounded-none"
              >
                <a href={`tel:${TELEFONO}`}>
                  <Phone className="h-4 w-4" />
                  {TELEFONO_DISPLAY}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="text-sm font-semibold tracking-wide uppercase px-8 h-13 bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground rounded-none"
              >
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">
                Preguntas frecuentes
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Resuelva sus dudas
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-6" />
            </div>
          </ScrollReveal>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border bg-background"
              >
                <AccordionTrigger className="text-left font-serif text-base md:text-lg text-foreground px-6 py-5 hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent forceMount className="data-[state=closed]:hidden px-6 pb-5 text-sm text-muted-foreground font-light leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <ScrollReveal>
            <p className="text-center text-sm text-muted-foreground font-light mt-10 leading-relaxed">
              {faqClose}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contacto final */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <ScrollReveal>
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <ShieldCheck className="h-8 w-8 text-gold mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
              Procurador Miguel Mas Castellano
            </h2>
            <p className="text-muted-foreground font-light mb-8 leading-relaxed">
              Actuamos directamente en Alicante, Benidorm, Dénia y Gandía; en el resto de España, con procuradores colaboradores coordinados por nosotros. Llame, escriba por WhatsApp o envíe un correo y reciba una primera valoración profesional.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild className="rounded-none bg-foreground text-white hover:bg-foreground/90">
                <a href={`tel:${TELEFONO}`}>
                  <Phone className="h-4 w-4" /> {TELEFONO_DISPLAY}
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-none">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-none">
                <a href={`mailto:${EMAIL}`}>
                  <Mail className="h-4 w-4" /> Email
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-none">
                <Link to="/contacto">Formulario</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
      {relatedLinks && relatedLinks.length > 0 && <RelatedPages links={relatedLinks} />}
    </>
  );
};

export default ServicioLanding;
