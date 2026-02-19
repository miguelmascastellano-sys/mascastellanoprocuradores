import { Scale, FileText, Building, BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const services = [
  {
    icon: Scale,
    title: "Representación Procesal",
    summary: "Representación técnica ante juzgados y tribunales de todas las jurisdicciones.",
    details: "Asumimos la representación procesal de nuestros clientes en todo tipo de procedimientos judiciales: civiles, penales, contencioso-administrativos, laborales y mercantiles. Garantizamos la correcta tramitación de todos los actos procesales, el cumplimiento de plazos y la defensa eficaz de sus intereses en cada instancia judicial.",
  },
  {
    icon: FileText,
    title: "Notificaciones Judiciales",
    summary: "Gestión y entrega puntual de notificaciones y comunicaciones procesales.",
    details: "Nos encargamos de la recepción, gestión y traslado de todas las notificaciones judiciales, resoluciones y comunicaciones emanadas de los órganos jurisdiccionales. Nuestro sistema de seguimiento garantiza que cada notificación sea atendida con la máxima diligencia y dentro de los plazos establecidos.",
  },
  {
    icon: Building,
    title: "Gestiones Administrativas",
    summary: "Trámites ante organismos públicos y administraciones del Estado.",
    details: "Realizamos todo tipo de gestiones y trámites ante organismos públicos, registros, notarías y administraciones del Estado. Desde la obtención de certificados y documentos oficiales hasta la presentación de escritos y solicitudes, nos ocupamos de que cada gestión se realice con eficiencia y rigor.",
  },
  {
    icon: BookOpen,
    title: "Asesoría Legal",
    summary: "Consultoría y asesoramiento jurídico integral para particulares y empresas.",
    details: "Ofrecemos un servicio de asesoramiento legal completo, orientando a nuestros clientes sobre las mejores estrategias procesales. Analizamos cada caso de forma individualizada, proporcionando un diagnóstico claro y recomendaciones fundamentadas para la toma de decisiones informadas.",
  },
];

const Servicios = () => {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="w-12 h-px bg-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Nuestros Servicios
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Soluciones procesales integrales con la máxima profesionalidad y dedicación.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {services.map((s, i) => (
              <AccordionItem
                key={s.title}
                value={`service-${i}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <s.icon className="h-8 w-8 text-primary shrink-0" />
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground">{s.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{s.summary}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 pl-12">
                  {s.details}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary">
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
      </section>
    </>
  );
};

export default Servicios;
