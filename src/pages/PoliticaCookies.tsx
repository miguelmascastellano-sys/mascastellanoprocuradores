import ScrollReveal from "@/components/ScrollReveal";

const PoliticaCookies = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
              Política de Cookies
            </h1>
          </ScrollReveal>

          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6 leading-relaxed">
            <ScrollReveal>
              <p>
                En cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la
                información y de comercio electrónico (LSSI-CE), y del Reglamento (UE) 2016/679 (RGPD),
                le informamos sobre el uso de cookies en este sitio web.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                ¿Qué son las cookies?
              </h2>
              <p>
                Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo
                (ordenador, tablet o móvil) cuando los visita. Permiten que el sitio recuerde sus acciones
                y preferencias durante un período de tiempo, para que no tenga que volver a configurarlas
                cada vez que regrese o navegue entre las distintas páginas.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Tipos de cookies que utilizamos
              </h2>

              <h3 className="text-lg font-serif font-medium text-foreground mt-4 mb-2">
                Cookies técnicas (necesarias)
              </h3>
              <p>
                Son aquellas imprescindibles para el correcto funcionamiento del sitio web. Permiten la
                navegación y el uso de las diferentes opciones o servicios que ofrece. Sin estas cookies,
                determinadas funcionalidades no podrían estar disponibles.
              </p>

              <h3 className="text-lg font-serif font-medium text-foreground mt-4 mb-2">
                Cookies de preferencias
              </h3>
              <p>
                Permiten recordar información para que el usuario acceda al servicio con determinadas
                características que pueden diferenciar su experiencia de la de otros usuarios, como el
                idioma, el número de resultados por página, etc.
              </p>

              <h3 className="text-lg font-serif font-medium text-foreground mt-4 mb-2">
                Cookies analíticas
              </h3>
              <p>
                Permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico
                de la utilización que hacen los usuarios del servicio ofertado. Para ello se analiza su
                navegación en nuestro sitio web con el fin de mejorar la oferta de productos o servicios
                que le ofrecemos.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Gestión de cookies
              </h2>
              <p>
                Al acceder a nuestro sitio web por primera vez, se le mostrará un banner informativo
                sobre el uso de cookies, donde podrá aceptarlas o rechazarlas. Su elección será recordada
                para futuras visitas.
              </p>
              <p className="mt-3">
                Además, puede configurar su navegador para permitir, bloquear o eliminar las cookies
                instaladas en su equipo mediante la configuración de las opciones del navegador:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>
                  <strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios
                </li>
                <li>
                  <strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio
                </li>
                <li>
                  <strong>Safari:</strong> Preferencias → Privacidad → Cookies y datos de sitios web
                </li>
                <li>
                  <strong>Microsoft Edge:</strong> Configuración → Cookies y permisos del sitio
                </li>
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Actualización de la política
              </h2>
              <p>
                Esta Política de Cookies puede actualizarse periódicamente para reflejar cambios en las
                cookies que utilizamos o por motivos operativos, legales o reglamentarios. Le recomendamos
                que revise esta página regularmente para estar informado sobre el uso de cookies.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Contacto
              </h2>
              <p>
                Si tiene alguna pregunta sobre nuestra Política de Cookies, puede ponerse en contacto con
                nosotros a través de la página de{" "}
                <a href="/contacto" className="text-primary underline hover:text-primary/80">
                  Contacto
                </a>.
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

export default PoliticaCookies;
