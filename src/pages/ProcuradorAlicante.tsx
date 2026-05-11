import LandingZona from "@/components/LandingZona";

const ProcuradorAlicante = () => (
  <LandingZona
    ciudad="Alicante"
    partidoJudicial="Partido Judicial de Alicante"
    zonaCorta="Alicante capital"
    juzgadosLabel="Juzgados de Benalúa y Audiencia Provincial de Alicante"
    h1="Procurador de los Tribunales en Alicante"
    heroSubtitulo="Brindamos soporte procesal en todos los partidos judiciales de Alicante capital. Nos especializamos en ser el brazo derecho del abogado en la capital, garantizando que cada notificación y escrito se gestione con la máxima celeridad en la Audiencia Provincial y juzgados de instancia."
    serviciosTitulo="Tu colaborador de confianza en los Juzgados de Benalúa"
    serviciosPriority={["lexnet", "comunicacion", "representacion", "plazos", "ejecuciones", "lanzamientos"]}
    autoridadTexto="Operamos a diario en la Ciudad de la Justicia de Benalúa y en la Audiencia Provincial de Alicante. Esta presencia continua nos permite traslado inmediato de notificaciones vía LexNET, gestiones presenciales el mismo día y tramitación ágil de exhortos y mandamientos en los registros de la capital."
    abogadosTexto="Si su despacho está fuera de Alicante capital, asumimos la representación procesal con disponibilidad total: descarga inmediata de notificaciones LexNET, presencia física diaria en sede judicial y comunicación directa con el letrado director ante cualquier resolución relevante."
    faqs={[
      {
        q: "¿Trabajan en todos los juzgados de Alicante capital?",
        a: "Sí. Asumimos representación procesal ante los Juzgados de Primera Instancia, Instrucción, Mercantil, Social y Contencioso-Administrativo ubicados en la Ciudad de la Justicia de Benalúa, así como ante la Audiencia Provincial de Alicante.",
      },
      {
        q: "¿Cuánto tardan en trasladar una notificación recibida por LexNET?",
        a: "Las notificaciones se descargan y trasladan al letrado director dentro de la misma jornada laboral, con resumen del contenido y cómputo del plazo aplicable.",
      },
      {
        q: "¿Pueden realizar gestiones presenciales urgentes en Benalúa?",
        a: "Sí. Acudimos diariamente a la sede judicial, lo que permite presentar escritos en papel, retirar mandamientos, consultar expedientes físicos y atender cualquier requerimiento presencial sin demora.",
      },
      {
        q: "¿Tramitan exhortos y mandamientos ante registros de la capital?",
        a: "Tramitamos exhortos procedentes de otros partidos judiciales y mandamientos dirigidos al Registro de la Propiedad, Registro Mercantil y Registro Civil de Alicante con seguimiento hasta su efectiva diligenciación.",
      },
    ]}
    direccion="Alicante capital (placeholder)"
    seoTitle="Procurador en Alicante | Representación en Audiencia Provincial | Mas Castellano"
    seoDescription="Servicios de procura en Alicante capital. Gestión proactiva de expedientes, control de plazos y presencia diaria en los juzgados de Benalúa y la Audiencia Provincial."
    canonical="https://mascastellanoprocuradores.com/procurador-alicante"
  />
);

export default ProcuradorAlicante;
