import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, ArrowRight } from "lucide-react";

// Para añadir o editar artículos, simplemente modifica este array.
export const ARTICULOS_ACTUALIDAD = [
  {
    id: "denia-lexnet",
    titulo: "El criterio de los Juzgados de Dénia ante los fallos de notificación de LexNet.",
    fecha: "28 de mayo de 2026",
    extracto:
      "Los problemas de conectividad en las plataformas de notificación judicial siguen siendo el quebradero de cabeza de los despachos en la Marina Alta. Analizamos cómo blindar tus plazos...",
    contenido:
      "En el día a día de los Juzgados de Dénia (del número 1 al 5 y el de Violencia sobre la Mujer), el tiempo es el recurso más escaso para un abogado. Con la saturación habitual de las oficinas judiciales, confiar ciegamente en que LexNet o los avisos de cortesía van a llegar a tiempo a tu bandeja de entrada es jugar a la ruleta rusa con la responsabilidad civil del despacho. Cuando un tribunal de la provincia de Alicante notifica un requerimiento con un plazo perentorio, el reloj no se detiene si tu ordenador falla. El criterio jurisprudencial es claro: el desconocimiento del fallo técnico o la falta de acceso por negligencia no suspende los plazos de preclusión. Contar con un procurador nativo en Dénia, que realiza un control ciego y presencial cuando es necesario, es la única garantía real. Monitorizamos el estado del expediente directamente en la sede para que el letrado se dedique en exclusiva a la defensa jurídica de su cliente. Si llevas asuntos en los partidos judiciales de Alicante, Dénia o Benidorm, no dejes tu estrategia a merced de un error de pantalla.",
  },
  {
    id: "benidorm-ejecuciones",
    titulo: "Gestión de plazos y ejecuciones en los saturados Juzgados de Benidorm.",
    fecha: "21 de mayo de 2026",
    extracto:
      "El volumen de litigiosidad en la Marina Baixa exige una agilidad procesal extrema. Analizamos cómo acelerar las ejecuciones de sentencias y blindar los plazos en la zona...",
    contenido:
      "Los Juzgados de Benidorm (situados en la zona de Els Tolls) manejan una carga de trabajo singular en toda la provincia de Alicante. La enorme actividad comercial, hostelera y el factor de la población flotante internacional hacen que los procedimientos civiles —especialmente las reclamaciones de cantidad, impagos, monitorios y ejecuciones hipotecarias o de sentencias— requieran una atención diaria y quirúrgica. Para un despacho de abogados que lleva asuntos en Benidorm, el verdadero cuello de botella no suele estar en la demanda inicial, sino en la fase de ejecución y en el goteo constante de notificaciones que exigen respuesta inmediata. Un día de retraso en la aportación de datos de localización o en la subsanación de una tasa puede paralizar un expediente durante meses. Como procurador con cobertura técnica unificada en Alicante, Dénia y Benidorm, conozco al detalle el ritmo e idiosincrasia de los tribunales de la Marina Baixa. Mi labor se centra en desatascar la burocracia procesal: desde el control ciego de plazos en las plataformas autonómicas hasta el impulso activo de las ejecuciones. Si tu despacho gestiona carteras de litigiosidad en los partidos judiciales de Benidorm o Gandía, necesitas un aliado sobre el terreno.",
  },
  {
    id: "marina-alta-derechos",
    titulo: "Cómo evitar la pérdida de derechos en un desahucio o divorcio en la Marina Alta.",
    fecha: "14 de mayo de 2026",
    extracto:
      "Un simple error de un día en el calendario judicial puede echar por tierra meses de trabajo en un procedimiento civil o de familia. Descubre por qué la representación es clave...",
    contenido:
      "Ya hablemos de un divorcio contencioso, una reclamación de cantidad o un procedimiento de desahucio por falta de pago, los trámites en la costa de Alicante tienen una particularidad: la dispersión geográfica y la carga de trabajo de sus partidos judiciales. Muchos ciudadanos de a pie se preguntan por qué es obligatoria la figura del procurador en la mayoría de estos pleitos. La respuesta corta es: para que tu caso no se cierre antes de que el juez lo lea. El derecho procesal español no perdona los despistes. Si el juzgado solicita una subsanación de poder o la presentación de un documento original, y se pasa el plazo, el procedimiento se archiva. Centralizar la representación procesal en las zonas de Alicante, Dénia, Benidorm y Gandía nos permite conocer de primera mano el funcionamiento interno de cada secretaría judicial. Esta cercanía y especialización técnica es lo que asegura que tanto particulares como grandes carteras de litigiosidad mantengan sus derechos intactos de principio a fin, blindando cada notificación frente a cualquier imprevisto de calendario.",
  },
];

const ActualidadSection = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const activo = ARTICULOS_ACTUALIDAD.find((a) => a.id === openId) ?? null;

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] tracking-[0.42em] uppercase text-gold font-medium">
            Actualidad
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mt-4 leading-tight">
            Actualidad y Consejos Procesales
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            Reflexiones y análisis prácticos sobre el día a día de la procura en los partidos
            judiciales de Alicante, Dénia, Benidorm y Gandía.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICULOS_ACTUALIDAD.map((art) => (
            <article
              key={art.id}
              className="group flex flex-col border border-border bg-card p-8 hover:border-gold/60 transition-colors"
            >
              <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
                <Calendar className="h-3.5 w-3.5 text-gold" />
                <span>{art.fecha}</span>
              </div>
              <h3 className="font-serif text-xl md:text-[22px] font-semibold text-foreground leading-snug mb-4">
                {art.titulo}
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8 flex-1">
                {art.extracto}
              </p>
              <button
                type="button"
                onClick={() => setOpenId(art.id)}
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-foreground hover:text-gold transition-colors self-start"
              >
                Leer artículo completo
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </article>
          ))}
        </div>
      </div>

      <Dialog open={!!activo} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {activo && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
                  <Calendar className="h-3.5 w-3.5 text-gold" />
                  <span>{activo.fecha}</span>
                </div>
                <DialogTitle className="font-serif text-2xl md:text-3xl font-semibold text-foreground leading-tight text-left">
                  {activo.titulo}
                </DialogTitle>
              </DialogHeader>
              <p className="mt-4 text-base text-foreground/80 font-light leading-[1.8] whitespace-pre-line">
                {activo.contenido}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ActualidadSection;
