import { Award, Heart, Shield } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import procuradorPortrait from "@/assets/procurador-portrait.png";

const values = [
  { icon: Shield, title: "Rigor", desc: "Aplicamos el máximo rigor técnico y jurídico en cada actuación procesal." },
  { icon: Heart, title: "Compromiso", desc: "Nos comprometemos plenamente con cada cliente y cada causa que asumimos." },
  { icon: Award, title: "Cercanía", desc: "Mantenemos una comunicación directa, transparente y personalizada." },
];

const SobreNosotros = () => {
  return (
    <>
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
                alt="Mas Castellano - Procurador"
                className="w-64 md:w-80 shadow-xl rounded-sm"
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
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
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
