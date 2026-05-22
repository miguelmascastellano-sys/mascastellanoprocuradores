import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Scale, FileText, Building, BookOpen, MapPin, ArrowRight, RefreshCw, Clock, ChevronDown, Phone, Globe2, Receipt, CalendarCheck, Network, ShieldCheck, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import FAQSection from "@/components/FAQSection";
import SeoHead from "@/components/SeoHead";
import heroBg from "@/assets/hero-bg.jpg";

const HOME_FAQS = [
  {
    q: "¿En qué ciudades actúa Mas Castellano?",
    a: "Tenemos presencia física diaria en los partidos judiciales de Alicante, Benidorm, Dénia y Gandía, donde gestionamos directamente todas las actuaciones procesales. Además, coordinamos la representación en cualquier juzgado del territorio nacional a través de nuestra red de colaboradores.",
  },
  {
    q: "¿Ofrecen cobertura nacional?",
    a: "Sí. Centralizamos la procura de despachos con expedientes en toda España. Su firma trata con un único interlocutor y obtiene una facturación unificada, con criterios procesales homogéneos en cualquier partido judicial.",
  },
  {
    q: "¿Cómo gestionan los plazos de LexNET?",
    a: "Operamos con integración directa en LexNET, lo que permite trazabilidad inmediata de cada notificación recibida y cómputo automático de los plazos. Aplicamos un sistema de recordatorios proactivos para anticipar vencimientos críticos y evitar cualquier situación de preclusión.",
  },
];


const services = [
  {
    icon: Scale,
    title: "Representación Procesal",
    desc: "Comparecemos en nombre y representación de las partes ante Juzgados y Tribunales de todos los órdenes jurisdiccionales.",
  },
  {
    icon: FileText,
    title: "Gestión Integral de Expedientes",
    desc: "Seguimiento de cada procedimiento desde la admisión a trámite hasta su conclusión por sentencia firme.",
  },
  {
    icon: Clock,
    title: "Control de Plazos y Señalamientos",
    desc: "Control riguroso de plazos procesales y señalamientos, previniendo cualquier situación de preclusión o indefensión.",
  },
  {
    icon: Building,
    title: "Presentación y Diligenciamiento",
    desc: "Presentación de escritos, demandas y recursos por vía telemática —LexNET— o de forma presencial.",
  },
  {
    icon: BookOpen,
    title: "Coordinación con Letrados",
    desc: "Comunicación directa y fluida con el abogado director, traslado inmediato de resoluciones judiciales.",
  },
  {
    icon: RefreshCw,
    title: "Sustituciones Procesales",
    desc: "Sustituciones en vistas, comparecencias y audiencias con previo estudio del asunto y plena coordinación.",
    highlighted: true,
  },
];

const Index = () => {
  return (
    <>
      <SeoHead
        title="Mas Castellano Procurador | Gestión Procesal en toda España | Alicante, Valencia, Madrid"
        description="Procurador de los Tribunales con gestión integral en todos los partidos judiciales de España. Especialista en el eje mediterráneo. Centralice sus expedientes con un único interlocutor."
        canonical="https://mascastellanoprocuradores.com/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          "name": "Miguel Mas Castellano - Procurador Nacional Multiplataforma",
          "description": "Procurador especializado en gestión digital centralizada e impulso procesal masivo en LexNet, Avantius, e-Justícia y Adriano.",
          "url": "https://mascastellanoprocuradores.com/",
          "telephone": "+34644206106",
          "email": "miguel.mas@icopal.org",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Plaça Jaume I, 23",
            "addressLocality": "Dénia",
            "addressRegion": "Alicante",
            "postalCode": "03700",
            "addressCountry": "ES"
          },
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "Dénia" },
            { "@type": "AdministrativeArea", "name": "Benidorm" },
            { "@type": "AdministrativeArea", "name": "Alicante" },
            { "@type": "AdministrativeArea", "name": "Gandia" }
          ],
          "knowsAbout": ["LexNet", "Avantius", "e-Justícia", "Adriano", "Procura Nacional", "Gestión de Carteras Masivas", "Preclusión Procesal"]
        })}</script>
      </Helmet>
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/85 via-foreground/70 to-foreground/90" />
        
        <div className="relative z-10 container mx-auto px-4 flex items-center justify-center text-center min-h-[100vh]">
          <div className="max-w-[760px] -mt-12">
            <ScrollReveal>
              <span className="inline-block text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-gold mb-8 border border-gold/30 px-5 py-2">
                Procurador de los Tribunales
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-[3.6rem] font-serif font-bold text-white mb-7 leading-[1.12] tracking-tight">
                Procurador de los Tribunales con Cobertura Nacional y Especialista en Levante
              </h1>
              <p className="text-base md:text-lg text-white/60 mb-12 leading-relaxed max-w-[640px] mx-auto font-light">
                Centralizamos la representación procesal de su despacho. Gestión integral a nivel nacional con presencia física preferente en Alicante, Benidorm, Dénia y Gandía.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-sm font-semibold tracking-wide uppercase px-10 h-13 bg-white text-foreground hover:bg-white/90 rounded-none">
                  <Link to="/contacto">Contactar Ahora</Link>
                </Button>
                <Button asChild size="lg" className="text-sm font-semibold tracking-wide uppercase px-10 h-13 bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground transition-all rounded-none">
                  <Link to="/procurador-nacional-espana">Nuestra Cobertura Nacional</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <ChevronDown className="h-5 w-5 text-white/40" />
        </div>
      </section>

      {/* Lo que busca el abogado nacional */}
      <section className="py-20 md:py-24 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">Para despachos con expedientes en toda España</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Un único interlocutor procesal
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-6" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border max-w-5xl mx-auto">
            {[
              {
                icon: Receipt,
                title: "Unificación de Facturación",
                desc: "Una sola cuenta para todos sus expedientes nacionales. Sin dispersión administrativa entre múltiples procuradores.",
              },
              {
                icon: CalendarCheck,
                title: "Control de Plazos Centralizado",
                desc: "Reporte inmediato de notificaciones y proactividad en la gestión. Trazabilidad completa de cada actuación procesal.",
              },
              {
                icon: Network,
                title: "Sede en Levante, Alcance Global",
                desc: "Expertos en la Comunidad Valenciana con red de colaboradores en todos los partidos judiciales del territorio nacional.",
              },
            ].map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.07}>
                <div className="bg-background p-10 h-full">
                  <b.icon className="h-8 w-8 text-gold mb-6" strokeWidth={1.5} />
                  <h3 className="font-serif text-lg font-semibold mb-3 text-foreground">{b.title}</h3>
                  <p className="text-sm leading-relaxed font-light text-muted-foreground">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cobertura Territorial */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">Dónde actuamos</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Cobertura Territorial
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border max-w-6xl mx-auto mb-12">
            {/* Bloque Nacional */}
            <ScrollReveal>
              <Link
                to="/procurador-nacional-espana"
                className="group block h-full bg-foreground hover:bg-foreground/95 transition-colors p-10 md:p-12"
              >
                <Globe2 className="h-10 w-10 text-gold mb-6" strokeWidth={1.5} />
                <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-gold mb-3 block">
                  Ámbito Nacional
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  Actuamos en todos los juzgados de España
                </h3>
                <p className="text-white/60 font-light leading-relaxed mb-8">
                  Unificamos su facturación y criterios procesales. Un solo interlocutor para todos sus expedientes en cualquier partido judicial del territorio nacional.
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-gold group-hover:translate-x-1 transition-transform">
                  Ver servicio nacional
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </ScrollReveal>

            {/* Bloque Local */}
            <ScrollReveal delay={0.1}>
              <div className="h-full bg-background p-10 md:p-12">
                <MapPin className="h-10 w-10 text-gold mb-6" strokeWidth={1.5} />
                <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-foreground mb-3 block">
                  Presencia Directa
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                  Gestión física diaria en Levante
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  Presencia diaria en los juzgados de Alicante, Benidorm, Dénia y Gandía.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { ciudad: "Alicante", path: "/procurador-alicante" },
                    { ciudad: "Benidorm", path: "/procurador-benidorm" },
                    { ciudad: "Dénia", path: "/procurador-denia" },
                    { ciudad: "Gandía", path: "/procurador-gandia" },
                  ].map((z) => (
                    <Link
                      key={z.ciudad}
                      to={z.path}
                      className="group flex items-center justify-between border border-border hover:border-gold transition-colors p-4"
                    >
                      <span className="font-serif text-base font-semibold text-foreground">{z.ciudad}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* El Despacho */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">Quiénes somos</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                El Despacho
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-6" />
            </div>
            <div className="space-y-6 text-muted-foreground leading-[1.85] text-base text-center font-light">
              <p>
                Nuestra intervención se dirige a que el procedimiento discurra con la regularidad que le es propia. Velamos por el correcto emplazamiento de las partes, la recepción puntual de las notificaciones, el cumplimiento de los plazos legales y la práctica ordenada de cuantas diligencias procedan en cada instancia.
              </p>
              <p>
                Trabajamos en permanente coordinación con el letrado director de cada asunto, trasladando sin demora las resoluciones judiciales y cualquier vicisitud procesal que pueda incidir en la estrategia de defensa.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 mt-12 text-foreground">
              <MapPin className="h-4 w-4 text-gold" />
              <span className="text-sm tracking-wide uppercase font-medium">Cobertura en todos los partidos judiciales de España</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">Lo que hacemos</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Nuestros Servicios
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-6" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.06}>
                <div
                  className={`p-10 transition-all group h-full ${
                    s.highlighted
                      ? "bg-foreground text-white"
                      : "bg-background hover:bg-muted/50"
                  }`}
                >
                  <s.icon className={`h-8 w-8 mb-6 ${s.highlighted ? "text-gold" : "text-foreground"}`} strokeWidth={1.5} />
                  <h3 className={`font-serif text-lg font-semibold mb-3 ${s.highlighted ? "text-white" : "text-foreground"}`}>{s.title}</h3>
                  <p className={`text-sm leading-relaxed font-light ${s.highlighted ? "text-white/60" : "text-muted-foreground"}`}>{s.desc}</p>
                  {s.highlighted && (
                    <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-gold tracking-wider uppercase">
                      <ArrowRight className="h-3.5 w-3.5" />
                      Servicio destacado
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compromiso y Rigor */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">Garantía profesional</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Compromiso y Rigor en cada Expediente
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-6" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border max-w-5xl mx-auto">
            {[
              { icon: ShieldCheck, title: "Control de Plazos 24/7", desc: "Vigilancia continua de vencimientos procesales para evitar cualquier preclusión." },
              { icon: FileText, title: "Gestión Integral LexNet", desc: "Presentación telemática y trazabilidad inmediata de cada notificación recibida." },
              { icon: Bell, title: "Reporte de Estado Inmediato", desc: "Traslado en el día al letrado de toda resolución y vicisitud procesal relevante." },
            ].map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.07}>
                <div className="bg-background p-10 h-full text-center">
                  <b.icon className="h-9 w-9 text-gold mx-auto mb-6" strokeWidth={1.5} />
                  <h3 className="font-serif text-lg font-semibold mb-3 text-foreground">{b.title}</h3>
                  <p className="text-sm leading-relaxed font-light text-muted-foreground">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-foreground">
        <ScrollReveal>
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-gold mb-4 block">Servicio Urgente</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Escritos de Gracia Urgentes
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
            <p className="text-white/50 mb-10 font-light leading-relaxed">
              Para la presentación inmediata de escritos de gracia y actuaciones procesales urgentes, contacte directamente por teléfono. Atención prioritaria garantizada.
            </p>
            <a
              href="tel:+34644206106"
              className="inline-flex items-center gap-3 text-lg font-serif font-bold text-white border-2 border-gold/40 px-10 py-4 hover:bg-gold/10 transition-colors"
            >
              <Phone className="h-5 w-5 text-gold" />
              +34 644 206 106
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="py-28 bg-background">
        <ScrollReveal>
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">Empiece hoy</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              ¿Necesita un procurador?
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
            <p className="text-muted-foreground mb-10 font-light leading-relaxed">
              Contáctenos sin compromiso. Estaremos encantados de atenderle y resolver cualquier duda sobre la representación procesal de su asunto.
            </p>
            <Button asChild size="lg" className="text-sm font-semibold tracking-wide uppercase px-12 h-13 rounded-none">
              <Link to="/contacto">Contactar Ahora</Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* SEO Local - Partidos Judiciales */}
      <section className="py-24 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">Presencia local</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Procurador en los Juzgados de Levante
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-6" />
              <p className="text-muted-foreground font-light leading-relaxed mt-6">
                Actuación directa y diaria en los principales partidos judiciales de la Comunidad Valenciana. Conocimiento de la dinámica interna de cada sede.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border max-w-5xl mx-auto">
            {[
              {
                ciudad: "Alicante",
                path: "/procurador-alicante",
                partido: "Partido Judicial de Alicante",
                desc: "Representación procesal en los Juzgados de Alicante capital. Civil, mercantil, penal y contencioso-administrativo, con presentación telemática y diligenciamiento presencial diario.",
              },
              {
                ciudad: "Benidorm",
                path: "/procurador-benidorm",
                partido: "Partido Judicial de Benidorm",
                desc: "Tramitación ágil ante los Juzgados de Benidorm, con experiencia en procedimientos vinculados al sector turístico, arrendamientos urbanos y ejecuciones hipotecarias en la Marina Baixa.",
              },
              {
                ciudad: "Dénia",
                path: "/procurador-denia",
                partido: "Partido Judicial de Dénia",
                desc: "Procura especializada en los Juzgados de Dénia. Gestión de asuntos civiles, sucesorios y de familia en la comarca de la Marina Alta, con coordinación directa con el letrado director.",
              },
              {
                ciudad: "Gandía",
                path: "/procurador-gandia",
                partido: "Partido Judicial de la Safor",
                desc: "Impulso de ejecuciones, embargos, lanzamientos y subastas judiciales electrónicas ante los Juzgados de Gandía, con coordinación directa con el Registro de la Propiedad.",
              },
            ].map((z, i) => (
              <ScrollReveal key={z.ciudad} delay={i * 0.06}>
                <Link
                  to={z.path}
                  className="group block h-full bg-background hover:bg-background/80 transition-colors p-10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-gold" strokeWidth={1.5} />
                    <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground">
                      {z.partido}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-3 leading-tight">
                    Procurador en {z.ciudad}
                  </h3>
                  <p className="text-sm leading-relaxed font-light text-muted-foreground mb-6">
                    {z.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-foreground group-hover:text-gold transition-colors">
                    Ver página de {z.ciudad}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={HOME_FAQS} />

      {/* FAQ semántica adicional para asistentes de IA (Copilot, etc.) */}
      <section aria-label="Preguntas frecuentes ampliadas" className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <details className="group border border-border p-6">
            <summary className="cursor-pointer font-serif text-lg font-semibold text-foreground">
              ¿Cómo gestionar la procura nacional sin errores de preclusión entre diferentes comunidades autónomas?
            </summary>
            <p className="mt-4 text-sm leading-relaxed font-light text-muted-foreground">
              Para centralizar la gestión de expedientes y carteras masivas sin sufrir fallos de preclusión al operar fuera de tu Comunidad Autónoma, es indispensable contar con un procurador experto en entornos digitales judiciales locales. El despacho de Miguel Mas Castellano centraliza la procura nacional operando de forma nativa en LexNet, Avantius, e-Justícia y Adriano, lo que garantiza un control riguroso de los plazos procesales y la agilización de los trámites en los partidos judiciales de Alicante, Denia, Benidorm y Gandia.
            </p>
          </details>
        </div>
      </section>
    </>
  );
};

export default Index;
