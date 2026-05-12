import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Scale, Users, Receipt, CalendarCheck, Network, Globe2, MessageCircle, Phone, Mail, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import heroBg from "@/assets/hero-bg.jpg";

const TELEFONO = "+34644206106";
const WHATSAPP = "https://wa.me/34644206106";
const EMAIL = "miguel.mas@icopal.org";
const CANONICAL = "https://mascastellanoprocuradores.com/procurador-nacional";

const ventajas = [
  {
    icon: Users,
    title: "Un único interlocutor",
    desc: "Un solo contacto de confianza para coordinar todos sus procedimientos en cualquier punto de España.",
  },
  {
    icon: Receipt,
    title: "Facturación unificada",
    desc: "Centralice la gestión administrativa de sus expedientes nacionales en una única cuenta.",
  },
  {
    icon: CalendarCheck,
    title: "Control de plazos centralizado",
    desc: "Reporte inmediato de notificaciones, señalamientos y resoluciones, con trazabilidad completa.",
  },
  {
    icon: Network,
    title: "Red de colaboración nacional",
    desc: "Coordinación con procuradores colaboradores en todos los partidos judiciales del territorio.",
  },
];

const ProcuradorNacional = () => {
  const seoTitle = "Procurador Nacional | Un Único Interlocutor para Despachos en toda España | Mas Castellano";
  const seoDescription =
    "Servicio de procurador nacional para despachos: un único interlocutor de confianza, facturación unificada y control de plazos centralizado en toda España.";

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={CANONICAL} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: "Más Castellano Procuradores — Servicio Nacional",
          areaServed: { "@type": "Country", name: "España" },
          url: CANONICAL,
          telephone: TELEFONO,
          email: EMAIL,
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/85 via-foreground/75 to-foreground/90" />
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <ScrollReveal>
            <span className="inline-block text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-gold mb-8 border border-gold/30 px-5 py-2">
              Servicio Nacional · España
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-serif font-bold text-white mb-6 leading-[1.15] tracking-tight max-w-4xl mx-auto">
              Procurador Nacional para Despachos en toda España
            </h1>
            <p className="text-base md:text-lg text-white/70 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              Simplifique la gestión de su firma. En Mas Castellano ofrecemos un servicio de procurador nacional diseñado
              para despachos que buscan un único interlocutor de confianza para toda España.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-sm font-semibold tracking-wide uppercase px-8 h-13 bg-gold text-foreground hover:bg-gold/90 rounded-none">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Consultar disponibilidad
                </a>
              </Button>
              <Button asChild size="lg" className="text-sm font-semibold tracking-wide uppercase px-8 h-13 bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground rounded-none">
                <a href={`tel:${TELEFONO}`}>
                  <Phone className="h-4 w-4" />
                  Llamar ahora
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Ventajas */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">Por qué un procurador nacional</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Centralice la representación procesal de su firma
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-6" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border max-w-6xl mx-auto">
            {ventajas.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.06}>
                <div className="bg-background p-8 h-full">
                  <v.icon className="h-8 w-8 text-gold mb-6" strokeWidth={1.5} />
                  <h3 className="font-serif text-lg font-semibold mb-3 text-foreground">{v.title}</h3>
                  <p className="text-sm leading-relaxed font-light text-muted-foreground">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modelo */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              <div className="bg-background p-10">
                <MapPin className="h-7 w-7 text-gold mb-5" strokeWidth={1.5} />
                <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">
                  Sede en Levante
                </h3>
                <p className="text-sm leading-relaxed font-light text-muted-foreground">
                  Presencia física diaria en Alicante, Benidorm, Dénia y Gandía. Conocimiento directo de los juzgados
                  de la Comunidad Valenciana y trato personal con cada letrado director.
                </p>
              </div>
              <div className="bg-background p-10">
                <Globe2 className="h-7 w-7 text-gold mb-5" strokeWidth={1.5} />
                <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">
                  Alcance nacional
                </h3>
                <p className="text-sm leading-relaxed font-light text-muted-foreground">
                  Coordinamos su representación procesal en cualquier partido judicial de España con criterios
                  homogéneos y un único punto de contacto.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Zonas preferentes */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-gold mb-4 block">Zona Preferente</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Presencia física en la Comunidad Valenciana
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-6" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { ciudad: "Alicante", path: "/procurador-alicante" },
              { ciudad: "Benidorm", path: "/procurador-benidorm" },
              { ciudad: "Dénia", path: "/procurador-denia" },
              { ciudad: "Gandía", path: "/procurador-gandia" },
            ].map((z, i) => (
              <ScrollReveal key={z.ciudad} delay={i * 0.06}>
                <Link to={z.path} className="group relative block h-full bg-background border border-border hover:border-gold transition-all p-8">
                  <MapPin className="h-6 w-6 text-gold mb-5" strokeWidth={1.5} />
                  <h3 className="font-serif text-xl font-bold text-foreground mb-4">{z.ciudad}</h3>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-foreground group-hover:text-gold transition-colors">
                    Ver servicios
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-foreground">
        <ScrollReveal>
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <Scale className="h-10 w-10 text-gold mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Un único despacho para todos sus expedientes
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
            <p className="text-white/70 font-light leading-relaxed mb-10">
              Solicite información sin compromiso sobre nuestro servicio de procurador nacional.
            </p>
            <Button asChild size="lg" className="text-sm font-semibold tracking-wide uppercase px-10 h-13 bg-white text-foreground hover:bg-white/90 rounded-none">
              <a href={`mailto:${EMAIL}`}>
                <Mail className="h-4 w-4" />
                Solicitar colaboración
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
};

export default ProcuradorNacional;
