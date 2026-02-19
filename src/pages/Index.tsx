import { Link } from "react-router-dom";
import { Scale, FileText, Building, BookOpen, Award, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const services = [
  { icon: Scale, title: "Representación Procesal", desc: "Representación técnica ante juzgados y tribunales en todas las jurisdicciones." },
  { icon: FileText, title: "Notificaciones Judiciales", desc: "Gestión eficiente y entrega puntual de todas las notificaciones procesales." },
  { icon: Building, title: "Gestiones Administrativas", desc: "Trámites y gestiones ante organismos públicos y administraciones." },
  { icon: BookOpen, title: "Asesoría Legal", desc: "Consultoría y asesoramiento jurídico integral para su tranquilidad." },
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
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="w-16 h-px bg-primary mx-auto mb-8" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
            Castellano<br />
            <span className="text-primary">Procuradores</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light">
            Tradición, rigor y compromiso en la representación procesal. 
            Su confianza, nuestra responsabilidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base font-semibold px-8">
              <Link to="/contacto">Solicitar Consulta</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8">
              <Link to="/servicios">Nuestros Servicios</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-12 h-px bg-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ofrecemos una amplia gama de servicios procesales con la máxima profesionalidad
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-card border border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors group"
              >
                <s.icon className="h-10 w-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">{s.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="w-12 h-px bg-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Rigor Profesional", desc: "Cada caso recibe una atención meticulosa y un seguimiento exhaustivo." },
              { title: "Compromiso Total", desc: "Nos involucramos plenamente en la defensa de sus intereses." },
              { title: "Cercanía y Confianza", desc: "Comunicación directa y transparente en todo momento." },
            ].map((v) => (
              <div key={v.title} className="p-6">
                <div className="w-8 h-px bg-primary mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
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
      </section>
    </>
  );
};

export default Index;
