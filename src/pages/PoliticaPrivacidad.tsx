import ScrollReveal from "@/components/ScrollReveal";

const PoliticaPrivacidad = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
              Política de Privacidad
            </h1>
          </ScrollReveal>

          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6 leading-relaxed">
            <ScrollReveal>
              <p>
                De conformidad con el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo
                (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales
                y garantía de los derechos digitales (LOPDGDD), le informamos sobre el tratamiento de
                sus datos personales.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Responsable del tratamiento
              </h2>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li><strong>Responsable:</strong> Mas Castellano — Procurador de los Tribunales</li>
                <li><strong>Correo electrónico:</strong> miguel.mas@icopal.org</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Finalidad del tratamiento
              </h2>
              <p>Los datos personales que nos facilite serán tratados con las siguientes finalidades:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Gestionar las consultas y solicitudes recibidas a través del formulario de contacto.</li>
                <li>Mantener la comunicación necesaria para la prestación de nuestros servicios profesionales.</li>
                <li>Enviar información relacionada con nuestros servicios, siempre que haya dado su consentimiento.</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Base legal del tratamiento
              </h2>
              <p>
                La base legal para el tratamiento de sus datos es el consentimiento del interesado
                (artículo 6.1.a del RGPD) y, en su caso, la ejecución de un contrato o la aplicación
                de medidas precontractuales (artículo 6.1.b del RGPD).
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Conservación de los datos
              </h2>
              <p>
                Los datos personales se conservarán mientras exista una relación contractual o profesional
                y, una vez finalizada, durante los plazos legalmente establecidos para atender posibles
                responsabilidades derivadas del tratamiento.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Destinatarios de los datos
              </h2>
              <p>
                No se cederán datos a terceros, salvo obligación legal. No se realizan transferencias
                internacionales de datos fuera del Espacio Económico Europeo.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Derechos del interesado
              </h2>
              <p>Usted tiene derecho a:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li><strong>Acceso:</strong> conocer si se están tratando sus datos y obtener una copia de los mismos.</li>
                <li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
                <li><strong>Supresión:</strong> solicitar la eliminación de sus datos cuando ya no sean necesarios.</li>
                <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos en determinadas circunstancias.</li>
                <li><strong>Limitación:</strong> solicitar la limitación del tratamiento en ciertos supuestos.</li>
                <li><strong>Portabilidad:</strong> recibir sus datos en un formato estructurado y de uso común.</li>
              </ul>
              <p className="mt-3">
                Para ejercer estos derechos, puede dirigirse a{" "}
                <strong>miguel.mas@icopal.org</strong>, adjuntando una copia de su documento
                de identidad.
              </p>
              <p className="mt-3">
                Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de
                Protección de Datos (AEPD) si considera que sus derechos no han sido debidamente
                atendidos.
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

export default PoliticaPrivacidad;
