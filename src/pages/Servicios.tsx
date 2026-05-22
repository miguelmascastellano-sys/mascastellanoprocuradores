import { Scale, FileText, Building, BookOpen, RefreshCw, Clock, MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScrollReveal from "@/components/ScrollReveal";
import SeoHead from "@/components/SeoHead";

const services = [
  {
    icon: Scale,
    title: "Representación Procesal",
    summary: "Representación técnica ante Juzgados y Tribunales de todos los órdenes jurisdiccionales.",
    details: "Comparecemos en nombre y representación de las partes ante Juzgados y Tribunales de todos los órdenes jurisdiccionales, asegurando su personación conforme a Derecho y la correcta constitución de la relación jurídico-procesal.",
  },
  {
    icon: FileText,
    title: "Gestión Integral de Expedientes",
    summary: "Seguimiento completo de cada procedimiento hasta su conclusión.",
    details: "Asumimos el seguimiento de cada procedimiento desde la admisión a trámite hasta su conclusión por sentencia firme o resolución equivalente, verificando el estado de las actuaciones y el impulso procesal de oficio o a instancia de parte.",
  },
  {
    icon: Clock,
    title: "Control de Plazos y Señalamientos",
    summary: "Control riguroso de plazos procesales perentorios e improrrogables.",
    details: "Llevamos un control riguroso de los plazos procesales —perentorios e improrrogables— y de los señalamientos de vistas, audiencias previas, comparecencias y demás actuaciones sujetas a término, previniendo cualquier situación de preclusión o indefensión.",
  },
  {
    icon: Building,
    title: "Presentación y Diligenciamiento de Escritos",
    summary: "Presentación telemática vía LexNET y presencial de escritos y demandas.",
    details: "Efectuamos la presentación de escritos, demandas, recursos y documentos tanto por vía telemática —a través de LexNET— como de forma presencial cuando la naturaleza del trámite lo requiera, acreditando su recepción en tiempo y forma.",
  },
  {
    icon: BookOpen,
    title: "Coordinación con los Letrados",
    summary: "Comunicación directa y fluida con el abogado director de cada asunto.",
    details: "Mantenemos comunicación directa y fluida con el abogado director de cada asunto, dando traslado inmediato de las resoluciones judiciales notificadas y de cualquier circunstancia relevante para el ejercicio del derecho de defensa.",
  },
  {
    icon: RefreshCw,
    title: "Sustituciones Procesales",
    summary: "Sustituciones profesionales en vistas, audiencias y comparecencias en toda España.",
    details: "Realizamos sustituciones de otros procuradores en vistas, comparecencias, audiencias y demás actuaciones que requieran presencia profesional, garantizando el previo estudio del asunto y la debida coordinación con el compañero sustituido y con el letrado interviniente.",
    highlighted: true,
  },
];

const Servicios = () => {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="w-12 h-px bg-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Nuestros Servicios
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Soluciones procesales integrales con la máxima profesionalidad y dedicación.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6 text-primary font-semibold">
              <MapPin className="h-5 w-5" />
              <span>Cobertura en todos los partidos judiciales de España</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Sustituciones highlight */}
      <section className="py-16 bg-primary/5 border-y border-primary/20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <ScrollReveal>
            <RefreshCw className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
              Sustituciones Procesales
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
              Realizamos sustituciones de otros procuradores en vistas, comparecencias, audiencias y demás actuaciones que requieran presencia profesional, garantizando el previo estudio del asunto y la debida coordinación con el compañero sustituido y con el letrado interviniente.
            </p>
            <div className="inline-flex items-center gap-2 text-primary font-semibold">
              <MapPin className="h-4 w-4" />
              Disponibilidad en todos los partidos judiciales de España
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.06}>
                <AccordionItem
                  value={`service-${i}`}
                  className={`border rounded-lg px-6 ${
                    s.highlighted
                      ? "bg-primary/5 border-primary/50"
                      : "bg-card border-border data-[state=open]:border-primary/50"
                  }`}
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex items-center gap-4 text-left">
                      <s.icon className="h-8 w-8 text-primary shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-lg font-semibold text-foreground">{s.title}</h3>
                          {s.highlighted && (
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-sans">
                              Destacado
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{s.summary}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6 pl-12">
                    {s.details}
                  </AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary">
        <ScrollReveal>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              ¿Necesita alguno de nuestros servicios?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              No dude en contactarnos. Le atenderemos de forma personalizada y sin compromiso.
            </p>
            <a
              href="/contacto"
              className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Solicitar Información
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
};

export default Servicios;
