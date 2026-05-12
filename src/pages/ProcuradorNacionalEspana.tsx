import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Scale,
  Cpu,
  Users,
  BarChart3,
  Globe2,
  ShieldCheck,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import heroBg from "@/assets/hero-bg.jpg";

const TELEFONO = "+34644206106";
const WHATSAPP = "https://wa.me/34644206106";
const EMAIL = "miguel.mas@icopal.org";
const CANONICAL = "https://mascastellanoprocuradores.com/procurador-nacional-espana";

const ventajas = [
  {
    icon: Cpu,
    title: "Gestión digital avanzada",
    desc: "Expediente íntegramente digital, integración LexNET y reportes accesibles desde cualquier lugar.",
  },
  {
    icon: Users,
    title: "Interlocutor único",
    desc: "Un solo contacto para todos sus expedientes en cualquier partido judicial de España.",
  },
  {
    icon: ShieldCheck,
    title: "Unificación de criterios",
    desc: "Mismos estándares de calidad, control de plazos y comunicación en todas las jurisdicciones.",
  },
  {
    icon: BarChart3,
    title: "Reportes en tiempo real",
    desc: "Información actualizada al instante sobre el estado de cada procedimiento y sus próximas actuaciones.",
  },
];

const ProcuradorNacionalEspana = () => {
  const seoTitle = "Procurador Nacional en España | Cobertura en todos los Partidos Judiciales | Mas Castellano";
  const seoDescription =
    "Procuradores con cobertura nacional en España. Centralice sus expedientes en un único despacho con gestión digital, interlocutor único y reportes en tiempo real.";

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
          name: "Más Castellano Procuradores — Cobertura Nacional",
          areaServed: { "@type": "Country", name: "España" },
          url: CANONICAL,
          telephone: TELEFONO,
          email: EMAIL,
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/85 via-foreground/75 to-foreground/90" />
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <ScrollReveal>
            <span className="inline-block text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-gold mb-8 border border-gold/30 px-5 py-2">
              Cobertura Nacional · España
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-serif font-bold text-white mb-6 leading-[1.15] tracking-tight max-w-4xl mx-auto">
              Procuradores de los Tribunales con Cobertura Nacional
            </h1>
            <p className="text-base md:text-lg text-white/70 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              Centraliza tus expedientes en un solo despacho. Ofrecemos una gestión integral en todos los partidos
              judiciales de España, combinando la cercanía local en la Comunidad Valenciana con una red de colaboración
              eficiente en todo el territorio nacional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="text-sm font-semibold tracking-wide uppercase px-8 h-13 bg-gold text-foreground hover:bg-gold/90 rounded-none"
              >
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Consultar disponibilidad
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="text-sm font-semibold tracking-wide uppercase px-8 h-13 bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground rounded-none"
              >
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
            <div className="text-center mb-16">
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">
                Ventajas clave
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Un único despacho para toda España
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

      {/* Modelo dos pilares */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              <div className="bg-background p-10">
                <MapPin className="h-7 w-7 text-gold mb-5" strokeWidth={1.5} />
                <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">
                  Cercanía local en la Comunidad Valenciana
                </h3>
                <p className="text-sm leading-relaxed font-light text-muted-foreground">
                  Presencia diaria y directa en Alicante, Dénia, Benidorm y Gandía. Conocimiento profundo de los
                  juzgados de la provincia y trato personal con el letrado director de cada asunto.
                </p>
              </div>
              <div className="bg-background p-10">
                <Globe2 className="h-7 w-7 text-gold mb-5" strokeWidth={1.5} />
                <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">
                  Red de colaboración nacional
                </h3>
                <p className="text-sm leading-relaxed font-light text-muted-foreground">
                  Coordinamos la representación procesal en cualquier partido judicial de España a través de una red
                  de procuradores colaboradores con criterios homogéneos y comunicación centralizada.
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
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-gold mb-4 block">
                Zona Preferente
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Sede en Alicante y Valencia
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
                <Link
                  to={z.path}
                  className="group relative block h-full bg-background border border-border hover:border-gold transition-all p-8"
                >
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
              Centralice sus expedientes en un solo despacho
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
            <p className="text-white/70 font-light leading-relaxed mb-10">
              Consulte sin compromiso la disponibilidad inmediata para cualquier partido judicial de España.
            </p>
            <Button
              asChild
              size="lg"
              className="text-sm font-semibold tracking-wide uppercase px-10 h-13 bg-white text-foreground hover:bg-white/90 rounded-none"
            >
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

export default ProcuradorNacionalEspana;
