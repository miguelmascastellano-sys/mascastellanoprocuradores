import ServicioLanding from "@/components/ServicioLanding";

const GestionarEjecucionesProcurador = () => (
  <ServicioLanding
    national
    schemaType="Service"
    badge="Despachos, fondos y servicers"
    h1="Cómo gestionar ejecuciones judiciales con un procurador"
    heroSubtitulo="Guía práctica para despachos, abogados, fondos y servicers que necesitan gestionar ejecuciones con procuradores: qué hace el procurador en cada fase, cómo se reportan los estados y cómo asignar expedientes en bloque. Llame al 644 206 106 o escriba por WhatsApp."
    intro="Gestionar ejecuciones con procuradores no consiste solo en presentar la demanda ejecutiva. Una cartera de ejecuciones avanza cuando alguien vigila cada plazo, contesta cada resolución y empuja al juzgado cuando el expediente se para. Esta página explica cómo trabajamos esa función para despachos y gestores de cartera con asuntos en Alicante, Benidorm, Dénia, Gandía y el resto de España."
    sections={[
      {
        h2: "Qué hace el procurador en cada fase de la ejecución",
        paragraphs: [
          "El procurador representa al ejecutante ante el juzgado durante todo el procedimiento de ejecución regulado en el Libro III de la Ley de Enjuiciamiento Civil (LEC). Su trabajo cambia según la fase, pero el objetivo es siempre el mismo: que el expediente no se detenga.",
          "En cada etapa se informa al letrado director de la resolución recibida, del plazo que abre y de la siguiente actuación recomendada.",
        ],
        bullets: [
          "Demanda ejecutiva: presentación telemática de la demanda firmada por el letrado, con el título ejecutivo y los documentos exigidos por los artículos 549 y 550 LEC, y seguimiento hasta el auto que despacha ejecución.",
          "Requerimiento de pago: impulso de la notificación al ejecutado y, si no se localiza, solicitud de averiguación de domicilio para evitar paralizaciones.",
          "Averiguación patrimonial: petición al juzgado de la investigación de bienes del artículo 590 LEC (cuentas, nóminas, vehículos, inmuebles, devoluciones tributarias).",
          "Embargos: solicitud y diligenciado de los embargos de cuentas, salarios e inmuebles, retirada de mandamientos y presentación en el Registro de la Propiedad.",
          "Subasta: impulso del avalúo, la certificación de dominio y cargas y la publicación en el Portal de Subastas del BOE; seguimiento de pujas, adjudicación y decreto.",
          "Lanzamiento: solicitud de la fecha de lanzamiento y coordinación con la comisión judicial para la entrega de la posesión al adjudicatario.",
        ],
      },
      {
        h2: "Ejecución dineraria vs. hipotecaria: plazos y trámites",
        paragraphs: [
          "La ejecución dineraria ordinaria persigue el patrimonio general del deudor. Tras el despacho de ejecución se requiere de pago (cuando procede), se investigan bienes y se embargan los que permitan cubrir principal, intereses y costas. El ejecutado puede oponerse en diez días por los motivos tasados de los artículos 556 y siguientes LEC.",
          "La ejecución hipotecaria, regulada en los artículos 681 a 698 LEC, se dirige directamente contra el inmueble hipotecado. Exige requerimiento de pago al deudor y, en su caso, al hipotecante no deudor y al tercer poseedor; solicitud de la certificación de cargas; y subasta del bien. La oposición está más limitada, aunque el control de cláusulas abusivas obliga a revisar el título con especial cuidado.",
          "Los plazos reales dependen de la carga de cada juzgado y de si hay oposición, por lo que no damos tiempos garantizados. Lo que sí controlamos es que ninguna actuación nuestra se retrase: cada escrito se presenta en plazo y cada resolución se traslada el mismo día.",
        ],
      },
      {
        h2: "Cómo trabajamos con su despacho",
        paragraphs: [
          "Interlocutor único: un solo procurador responsable de todos sus expedientes, aunque estén repartidos entre varios partidos judiciales. Usted no tiene que coordinar a distintas personas en cada ciudad.",
          "Estados semanales: además del traslado diario de notificaciones, enviamos un estado por expediente con fase, última resolución, próximos vencimientos y bloqueos detectados. El formato se adapta a su sistema interno.",
          "Control de plazos en LexNET: cada notificación se descarga, se registra y se calcula su vencimiento conforme a los artículos 133 y 151 LEC, con aviso preventivo al letrado antes de que venza el plazo. También operamos en Avantius, e-Justícia y Adriano cuando el juzgado lo exige.",
        ],
      },
      {
        h2: "Cartera de ejecuciones: cómo asignarnos expedientes en bloque",
        paragraphs: [
          "Para fondos, servicers y despachos con volumen, la asignación en bloque evita gestionar cada asunto por separado. El proceso habitual es sencillo:",
        ],
        bullets: [
          "Nos envía un listado con número de procedimiento, juzgado, partes y fase actual de cada expediente.",
          "Revisamos la situación de cada asunto y señalamos los que requieren actuación urgente.",
          "Se otorgan los apoderamientos (apud acta o notariales) y, si hay cambio de procurador, se presenta la personación.",
          "Cuando hay cesión de crédito, tramitamos la sucesión procesal del artículo 17 LEC.",
          "Desde ese momento recibe estados periódicos de toda la cartera con un mismo formato.",
        ],
      },
    ]}
    steps={[
      { title: "Envío del listado", desc: "Expedientes, juzgados y fase de cada ejecución." },
      { title: "Revisión inicial", desc: "Detectamos urgencias y plazos abiertos." },
      { title: "Personación", desc: "Apoderamientos, cambio de procurador o sucesión procesal." },
      { title: "Seguimiento", desc: "Traslado diario y estado semanal por expediente." },
    ]}
    faqs={[
      { q: "¿Pueden asumir ejecuciones ya iniciadas por otro procurador?", a: "Sí. Se presenta escrito de personación con el nuevo apoderamiento y, desde ese momento, asumimos el seguimiento. Revisamos primero el expediente para detectar plazos abiertos." },
      { q: "¿Trabajan con fondos y servicers tras una cesión de crédito?", a: "Sí. Tramitamos la sucesión procesal del artículo 17 LEC para que el cesionario ocupe la posición del ejecutante y la ejecución continúe sin perder lo actuado." },
      { q: "¿Cómo reciben los estados de cada expediente?", a: "Trasladamos las notificaciones el mismo día y enviamos un estado semanal por expediente con fase, última resolución y próximos vencimientos, en el formato que necesite su despacho." },
      { q: "¿Actúan en ejecuciones fuera de la provincia de Alicante?", a: "Sí. Actuamos directamente en Alicante, Benidorm, Dénia y Gandía, y en el resto de España mediante una red de procuradores colaboradores, siempre con un único interlocutor para su despacho." },
      { q: "¿Cuánto cuesta gestionar una cartera de ejecuciones?", a: "Los derechos del procurador se rigen por el arancel (Real Decreto 434/2024; régimen transitorio cuando proceda) y dependen de la cuantía y de las actuaciones. Para carteras preparamos un presupuesto global; solicítelo sin compromiso al 644 206 106." },
      { q: "¿Qué necesitan para empezar?", a: "Un listado de expedientes con juzgado, número de procedimiento y fase, y el poder para pleitos o apoderamiento apud acta. Con eso podemos revisar la cartera y personarnos." },
    ]}
    faqClose="¿Quiere asignarnos una cartera de ejecuciones? Llame al 644 206 106 o escriba por WhatsApp."
    related={[
      { label: "Procurador para ejecuciones judiciales", path: "/procurador-ejecuciones-judiciales" },
      { label: "Procurador nacional en España", path: "/procurador-nacional-espana" },
      { label: "Procurador en derecho bancario", path: "/procurador-derecho-bancario" },
      { label: "Subastas judiciales en Alicante", path: "/subastas-judiciales-alicante" },
    ]}
    seoTitle="Gestionar ejecuciones con procurador | Despachos y servicers"
    seoDescription="Cómo gestionar ejecuciones judiciales con procurador: fases, estados semanales, control de plazos en LexNET y carteras en bloque. ☎ 644 206 106."
    canonical="https://mascastellanoprocuradores.com/gestionar-ejecuciones-con-procurador"
    schemaName="Gestión de ejecuciones judiciales con procurador — Más Castellano Procurador"
    schemaDescription="Servicio de procura para despachos, fondos y servicers: impulso de ejecuciones dinerarias e hipotecarias, estados semanales y control de plazos en LexNET."
  />
);

export default GestionarEjecucionesProcurador;
