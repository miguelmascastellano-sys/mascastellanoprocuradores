import { Award, Heart, Shield, User } from "lucide-react";

const team = [
  { name: "Carlos Castellano", role: "Procurador Titular", desc: "Más de 25 años de experiencia en representación procesal ante todas las jurisdicciones." },
  { name: "María López", role: "Procuradora Asociada", desc: "Especialista en derecho civil y mercantil con amplia trayectoria profesional." },
  { name: "Javier Martínez", role: "Procurador Asociado", desc: "Experto en procedimientos contencioso-administrativos y gestiones ante la administración." },
];

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
          <div className="w-12 h-px bg-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Sobre Nosotros
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Conoce la historia, el equipo y los valores que definen a Castellano Procuradores.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="w-12 h-px bg-primary mb-4" />
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Nuestra Historia</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Castellano Procuradores nace de la vocación por el servicio jurídico y la tradición familiar 
              en el ámbito de la procuraduría. Desde nuestros inicios hace más de 25 años, hemos mantenido 
              un compromiso inquebrantable con la excelencia profesional.
            </p>
            <p>
              A lo largo de nuestra trayectoria, hemos representado a miles de clientes ante juzgados y 
              tribunales de toda España, construyendo una reputación basada en la confianza, el rigor 
              y la dedicación.
            </p>
            <p>
              Hoy, nuestro despacho combina la experiencia acumulada durante décadas con las herramientas 
              tecnológicas más avanzadas, garantizando un servicio ágil y eficaz.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-12 h-px bg-primary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Nuestro Equipo</h2>
            <p className="text-muted-foreground">Profesionales comprometidos con su causa</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((m) => (
              <div key={m.name} className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{m.name}</h3>
                <p className="text-primary text-sm mb-3">{m.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-12 h-px bg-primary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Nuestros Valores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6">
                <v.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SobreNosotros;
