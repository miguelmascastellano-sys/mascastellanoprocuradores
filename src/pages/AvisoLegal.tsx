import ScrollReveal from "@/components/ScrollReveal";
import SeoHead from "@/components/SeoHead";

const AvisoLegal = () => {
  return (
    <main className="min-h-screen bg-background">
      <SeoHead
        title="Aviso Legal | Mas Castellano Procurador"
        description="Aviso legal del sitio web de Mas Castellano, Procurador de los Tribunales. Datos identificativos del titular conforme a la LSSI-CE."
        canonical="https://mascastellanoprocuradores.com/aviso-legal"
      />
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
              Aviso Legal
            </h1>
          </ScrollReveal>

          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6 leading-relaxed">
            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Datos identificativos
              </h2>
              <p>
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
                Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa a los usuarios
                de los datos del titular del sitio web:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li><strong>Denominación:</strong> Mas Castellano — Procurador de los Tribunales</li>
                <li><strong>Correo electrónico:</strong> <li><strong>Correo electrónico:</strong> miguel.mas@icopal.org</li></li>
                <li><strong>Teléfono:</strong> +34 644 206 106</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Objeto
              </h2>
              <p>
                El presente sitio web tiene como finalidad ofrecer información sobre los servicios
                profesionales de procuraduría que presta el titular, así como facilitar la comunicación
                con los usuarios interesados.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Propiedad intelectual e industrial
              </h2>
              <p>
                Todos los contenidos del sitio web, incluyendo textos, imágenes, diseño gráfico,
                logotipos, iconos y código fuente, están protegidos por las leyes de propiedad
                intelectual e industrial. Queda prohibida su reproducción, distribución, comunicación
                pública o transformación sin la autorización expresa del titular.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Condiciones de uso
              </h2>
              <p>
                El usuario se compromete a hacer un uso adecuado de los contenidos y servicios ofrecidos
                a través de este sitio web, absteniéndose de emplearlos para actividades ilícitas,
                contrarias a la buena fe o al orden público.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Responsabilidad
              </h2>
              <p>
                El titular no se hace responsable de los daños y perjuicios que puedan derivarse del
                uso de la información contenida en este sitio web, ni de los posibles errores u
                omisiones en los contenidos. Asimismo, no garantiza la disponibilidad y continuidad
                del funcionamiento del sitio web.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Legislación aplicable y jurisdicción
              </h2>
              <p>
                El presente aviso legal se rige por la legislación española. Para cualquier controversia
                que pudiera derivarse del acceso o uso de este sitio web, las partes se someten a los
                Juzgados y Tribunales de Madrid.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <p className="text-xs text-muted-foreground/60 mt-12 border-t border-border pt-6">
                Última actualización: febrero de 2026
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AvisoLegal;
