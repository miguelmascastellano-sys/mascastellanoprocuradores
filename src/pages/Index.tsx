import { Link } from "react-router-dom";
import { Scale, FileText, Building, BookOpen, Award, Users, Briefcase, MapPin, ArrowRight, RefreshCw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import heroBg from "@/assets/hero-bg.jpg";


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

const stats = [
  { icon: Award, value: "+25", label: "Años de Experiencia" },
  { icon: Briefcase, value: "+5.000", label: "Casos Gestionados" },
  { icon: Users, value: "+2.000", label: "Clientes Satisfechos" },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-[680px]">
            <ScrollReveal>
              <div className="w-16 h-px bg-primary mb-8" />
              <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-serif font-bold text-foreground mb-6 leading-[1.15]">
                La tranquilidad de un procedimiento bien llevado.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                Procuración pensada para facilitar tu trabajo: control riguroso de plazos, seguimiento continuo de expedientes y comunicación proactiva con tu despacho.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-5">
                <Button asChild size="lg" className="text-base font-semibold px-10 h-12">
                  <Link to="/contacto">Contactar Ahora</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 h-12">
                  <Link to="/servicios">Nuestros Servicios</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground tracking-wide">
                Disponibilidad&ensp;·&ensp;Agilidad&ensp;·&ensp;Fiabilidad
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* El Despacho */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="w-12 h-px bg-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                El Despacho
              </h2>
            </div>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg text-center">
              <p>
                Nuestra intervención se dirige a que el procedimiento discurra con la regularidad que le es propia. Velamos por el correcto emplazamiento de las partes, la recepción puntual de las notificaciones, el cumplimiento de los plazos legales y la práctica ordenada de cuantas diligencias procedan en cada instancia.
              </p>
              <p>
                Trabajamos en permanente coordinación con el letrado director de cada asunto, trasladando sin demora las resoluciones judiciales y cualquier vicisitud procesal que pueda incidir en la estrategia de defensa. El conocimiento directo del funcionamiento de las oficinas judiciales y de los criterios de cada órgano nos permite anticipar incidencias y resolver con inmediatez las cuestiones de trámite.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 mt-10 text-primary font-semibold">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">Cobertura en todos los partidos judiciales de España</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="w-12 h-px bg-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Nuestros Servicios
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Ofrecemos una amplia gama de servicios procesales con la máxima profesionalidad
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.08}>
                <div
                  className={`border rounded-lg p-8 transition-colors group h-full ${
                    s.highlighted
                      ? "bg-primary/5 border-primary shadow-lg"
                      : "bg-card border-border hover:border-primary/50"
                  }`}
                >
                  <s.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  {s.highlighted && (
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      <ArrowRight className="h-4 w-4" />
                      Servicio destacado
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1}>
                <div className="text-center">
                  <s.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">{s.value}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <ScrollReveal>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              ¿Necesita un procurador?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Contáctenos sin compromiso. Estaremos encantados de atenderle y resolver cualquier duda.
            </p>
            <Button asChild size="lg" className="text-base font-semibold px-10">
              <Link to="/contacto">Contactar Ahora</Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
};

export default Index;
