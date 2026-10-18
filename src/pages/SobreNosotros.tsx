import { Award, Heart, Shield } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SeoHead from "@/components/SeoHead";
import { professional } from "@/data/professional";
import procuradorPortrait from "@/assets/procurador-portrait.png";
import { Helmet } from "@/lib/helmet";

const trajectory = [
  { title: "Miguel Mas Castellano, procurador de los tribunales", paragraphs: [
    "Más Castellano es la marca profesional de Miguel Mas Castellano, procurador de los tribunales. La actividad de esta web se dedica exclusivamente a la representación procesal y a la gestión de actuaciones judiciales. El servicio se dirige a abogados, despachos, empresas y particulares que necesitan un interlocutor para seguir su expediente con orden y claridad. La dirección jurídica del procedimiento corresponde al letrado; la procura organiza y realiza los trámites que le son propios.",
    "La trayectoria se explica a través de esa forma de trabajar, sin atribuir años de ejercicio, resultados o titulaciones no acreditados. El conocimiento de cada asunto se construye revisando sus antecedentes y manteniendo la continuidad de las comunicaciones. La confianza no se basa en promesas de éxito judicial, sino en que el cliente y su abogado sepan qué actuación se ha realizado, cuál está pendiente y qué documentación se necesita para continuar."
  ] },
  { title: "Colegiación ICOPAL y responsabilidad profesional", paragraphs: [
    "Miguel Mas Castellano está colegiado con el número 660 en el Ilustre Colegio de Procuradores de Alicante, ICOPAL. La identificación profesional permite al cliente conocer quién asume la representación. Antes de aceptar un encargo se comprueba su objeto, la documentación del poder y la disponibilidad para atenderlo. También se revisan posibles incompatibilidades con otros asuntos, evitando confundir la coordinación de expedientes con una intervención indiscriminada para cualquier parte.",
    "La representación se formaliza mediante el apoderamiento adecuado al procedimiento. Los datos del cliente y las instrucciones del abogado se utilizan para la finalidad profesional del encargo, con atención a la confidencialidad. En la primera consulta conviene compartir solo la información necesaria y acordar el canal para remitir la documentación sensible. Un mensaje inicial no sustituye la aceptación del asunto ni acredita por sí mismo el poder para actuar."
  ] },
  { title: "Una forma de trabajo centrada en el expediente", paragraphs: [
    "El inicio del trabajo exige identificar órgano, número de procedimiento, fase y posibles vencimientos. Se revisa la resolución que origina cada plazo y se ordenan escritos y anexos antes de presentar. Los justificantes se conservan vinculados al expediente. Si aparece un requerimiento de subsanación o una incidencia en la presentación, se comunica al abogado para que pueda valorar la respuesta. Esta trazabilidad facilita reconstruir lo ocurrido sin depender de mensajes aislados.",
    "Las notificaciones se trasladan al letrado director con la información necesaria para situarlas en el procedimiento. El seguimiento distingue los trámites realizados de los que dependen del órgano judicial, de un registro o de otra parte. En ejecuciones, embargos y subastas se comprueba la fase concreta antes de transmitir instrucciones. El procurador impulsa las actuaciones que procedan, pero no garantiza tiempos de resolución, cobros o decisiones que corresponden al tribunal."
  ] },
  { title: "Cercanía territorial y colaboración con despachos", paragraphs: [
    "La actuación directa se concentra en Alicante, Benidorm, Dénia y Gandía. Para otras sedes de la provincia de Alicante, la Comunidad Valenciana o el resto de España se revisa el encargo y se coordina la colaboración necesaria. Esa cobertura no implica disponer de oficinas en todas las localidades. El abogado conoce el alcance de la intervención y puede consultar qué gestiones requieren presencia local o una organización específica.",
    "Los presupuestos identifican las fases de intervención y separan derechos profesionales, impuestos y posibles gastos de terceros. Cuando el expediente cambia de alcance, se aclara qué actuaciones adicionales deben contemplarse. Para consultar disponibilidad, Miguel Mas Castellano atiende en el 644 206 106, por WhatsApp y en el correo profesional indicado en Contacto. El objetivo es la tranquilidad de un procedimiento bien llevado, con comunicación directa, criterio profesional y respeto a las funciones del abogado."
  ] },
];

const values = [
  { icon: Shield, title: "Rigor", desc: "Aplicamos el máximo rigor técnico y jurídico en cada actuación procesal." },
  { icon: Heart, title: "Compromiso", desc: "Nos comprometemos plenamente con cada cliente y cada causa que asumimos." },
  { icon: Award, title: "Cercanía", desc: "Mantenemos una comunicación directa, transparente y personalizada." },
];

const SobreNosotros = () => {
  return (
    <>
      <SeoHead
        title="El despacho | Más Castellano Procurador"
        description="Conozca a Miguel Mas Castellano, procurador ICOPAL nº 660. Más Castellano: representación, control de plazos y atención directa a cada expediente."
        canonical="https://mascastellanoprocuradores.com/sobre-nosotros"
      />
      <Helmet><script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org", "@type": "Person",
        "@id": "https://mascastellanoprocuradores.com/sobre-nosotros#miguel-mas",
        name: professional.name, jobTitle: "Procurador de los Tribunales",
        url: "https://mascastellanoprocuradores.com/sobre-nosotros",
        telephone: professional.phoneLink, email: professional.email,
        memberOf: { "@type": "Organization", name: professional.college },
        identifier: { "@type": "PropertyValue", propertyID: "Número de colegiado ICOPAL", value: professional.collegeNumber },
        worksFor: { "@id": "https://mascastellanoprocuradores.com/#organization" },
      })}</script></Helmet>
      {/* Hero */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="w-12 h-px bg-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              El Despacho
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Conozca nuestra forma de trabajo y los valores que nos definen.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* About with photo */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <ScrollReveal className="lg:col-span-2 flex justify-center">
              <img
                src={procuradorPortrait}
                alt="Procurador de los Tribunales Mas Castellano en Alicante y Levante"
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full max-w-sm shadow-xl rounded-sm"
              />
            </ScrollReveal>
            <ScrollReveal className="lg:col-span-3" delay={0.15}>
              <div className="w-12 h-px bg-primary mb-4" />
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Nuestra Forma de Trabajo</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Nuestra intervención se dirige a que el procedimiento discurra con la regularidad que le es propia. Velamos por el correcto emplazamiento de las partes, la recepción puntual de las notificaciones, el cumplimiento de los plazos legales y la práctica ordenada de cuantas diligencias procedan en cada instancia.
                </p>
                <p>
                  Trabajamos en permanente coordinación con el letrado director de cada asunto, trasladando sin demora las resoluciones judiciales y cualquier vicisitud procesal que pueda incidir en la estrategia de defensa. El conocimiento directo del funcionamiento de las oficinas judiciales y de los criterios de cada órgano nos permite anticipar incidencias y resolver con inmediatez las cuestiones de trámite.
                </p>
                <p className="text-base">
                  Despacho: {professional.address}. Nº Col. {professional.collegeNumber} — ICOPAL.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl space-y-12">
          {trajectory.map((item) => <ScrollReveal key={item.title}>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">{item.title}</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">{item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </ScrollReveal>)}
        </div>
      </section>
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="w-12 h-px bg-primary mx-auto mb-4" />
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Nuestros Valores</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="text-center p-6">
                  <v.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SobreNosotros;
