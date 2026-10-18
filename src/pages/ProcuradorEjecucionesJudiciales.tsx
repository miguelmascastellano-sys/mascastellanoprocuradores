import ServicioLanding from "@/components/ServicioLanding";

const ProcuradorEjecucionesJudiciales = () => (
  <ServicioLanding
    national
    badge="Ejecuciones Judiciales"
    h1="Procurador para ejecuciones judiciales en Alicante y toda España"
    heroSubtitulo="Gestión de ejecuciones dinerarias e hipotecarias de principio a fin: demanda ejecutiva, embargos, averiguación patrimonial, subasta y lanzamiento. Presencia directa en Alicante, Benidorm, Dénia y Gandía, y cobertura nacional."
    intro="Una sentencia o un título ejecutivo solo sirven si se ejecutan bien. El procurador es quien impulsa la ejecución en el juzgado, vigila los plazos y mantiene al letrado informado de cada paso, desde el despacho de ejecución hasta el cobro o la entrega del bien."
    sections={[
      {
        h2: "Qué hace el procurador en una ejecución",
        paragraphs: [
          "En la ejecución, el procurador representa al ejecutante ante el juzgado. Presenta la demanda ejecutiva que firma el letrado, recibe las notificaciones y pide en cada momento la actuación que permite avanzar: requerimientos, embargos, mandamientos, avalúos y subasta.",
          "Su valor está en el impulso. Una ejecución sin seguimiento se detiene; con un procurador atento, cada resolución se contesta en plazo y cada oficio se diligencia sin esperas.",
        ],
      },
      {
        h2: "Ejecución de títulos judiciales y no judiciales",
        paragraphs: [
          "Tramitamos la ejecución de sentencias, autos, decretos aprobando costas, laudos y acuerdos de mediación (títulos judiciales), así como la de escrituras públicas, pólizas intervenidas y otros títulos no judiciales previstos en la Ley de Enjuiciamiento Civil.",
          "También gestionamos la ejecución tras un proceso monitorio sin oposición y la reclamación de intereses y costas posteriores.",
        ],
      },
      {
        h2: "Ejecución hipotecaria",
        paragraphs: [
          "En la ejecución sobre bienes hipotecados, el procurador solicita la certificación de dominio y cargas, practica los requerimientos al deudor y a terceros poseedores, notifica a los acreedores posteriores y prepara el expediente para la subasta.",
          "Coordinamos con el letrado la respuesta a posibles oposiciones y el control de los plazos que fija la ley en este procedimiento especial.",
        ],
      },
      {
        h2: "Embargos y averiguación patrimonial",
        paragraphs: [
          "Solicitamos la averiguación patrimonial a través del Punto Neutro Judicial y, con su resultado, pedimos el embargo de los bienes más eficaces para el cobro:",
        ],
        bullets: [
          "Cuentas bancarias y saldos.",
          "Salarios, pensiones y otros ingresos, dentro de los límites legales.",
          "Inmuebles, mediante anotación preventiva en el Registro.",
          "Vehículos, con anotación en la DGT y, en su caso, precinto.",
          "Devoluciones tributarias y créditos frente a terceros.",
        ],
      },
      {
        h2: "Anotación de embargo y coordinación con el Registro de la Propiedad",
        paragraphs: [
          "Retiramos y presentamos los mandamientos de anotación de embargo, seguimos su calificación y solicitamos las prórrogas necesarias para que la anotación no caduque. Si el Registro suspende la anotación, informamos al letrado del defecto para subsanarlo cuanto antes.",
        ],
      },
      {
        h2: "Subasta judicial electrónica en el portal del BOE",
        paragraphs: [
          "Pedimos el avalúo y la convocatoria de la subasta, revisamos el edicto publicado en el Portal de Subastas del BOE y controlamos el periodo de pujas. Tras el cierre, solicitamos la aprobación del remate o la adjudicación al ejecutante según proceda.",
        ],
      },
      {
        h2: "Adjudicación, posesión y lanzamiento",
        paragraphs: [
          "Con el decreto de adjudicación, gestionamos el testimonio para su inscripción, los mandamientos de cancelación de cargas y la solicitud de posesión. Si el inmueble está ocupado, pedimos el lanzamiento y asistimos a la diligencia con la comisión judicial.",
        ],
      },
      {
        h2: "Ejecuciones en volumen para despachos, entidades y gestoras de cartera",
        paragraphs: [
          "Para carteras con muchos expedientes ofrecemos un servicio organizado: un único interlocutor, control centralizado de plazos y reporting periódico del estado de cada ejecución.",
        ],
        bullets: [
          "Informes de estado por expediente y por fase procesal.",
          "Control de plazos y alertas de vencimientos.",
          "Facturación unificada por cartera o por cliente.",
          "Red de colaboradores para actuaciones fuera de la Comunidad Valenciana.",
        ],
      },
    ]}
    steps={[
      { title: "Recepción del expediente", desc: "Recibimos el título, la documentación y las instrucciones del letrado, y revisamos qué falta antes de presentar." },
      { title: "Presentación telemática", desc: "Presentamos los escritos por LexNET, Avantius, e-Justícia o Adriano, según el territorio del juzgado." },
      { title: "Impulso y seguimiento", desc: "Vigilamos plazos, contestamos requerimientos y pedimos las actuaciones que hacen avanzar la ejecución." },
      { title: "Informe al letrado", desc: "Trasladamos cada resolución con un resumen claro del estado y de la siguiente actuación recomendada." },
    ]}
    faqs={[
      { q: "¿Es obligatorio el procurador en una ejecución?", a: "Por regla general, sí: la ejecución sigue el régimen de postulación del proceso del que deriva. Hay excepciones, como determinadas ejecuciones de cuantía reducida. Su letrado le confirmará si es preceptivo en su caso." },
      { q: "¿Cuánto tarda una ejecución dineraria?", a: "Depende del juzgado, del patrimonio del deudor y de si hay oposición. El impulso constante del procurador evita tiempos muertos, pero no podemos garantizar plazos que dependen del órgano judicial." },
      { q: "¿Qué bienes se pueden embargar?", a: "Cuentas, salarios y pensiones por encima de los límites legales, inmuebles, vehículos, créditos y devoluciones tributarias, entre otros. La averiguación patrimonial permite saber qué bienes existen antes de pedir el embargo." },
      { q: "¿Pueden gestionar ejecuciones fuera de Alicante?", a: "Sí. Actuamos directamente en Alicante, Benidorm, Dénia y Gandía, y en el resto de España mediante una red de procuradores colaboradores, con un único interlocutor para el despacho." },
      { q: "¿Cómo me informan del estado de cada ejecución?", a: "Trasladamos cada notificación al letrado el mismo día y, para carteras, enviamos informes periódicos por expediente. Así el despacho sabe siempre en qué fase está cada asunto." },
    ]}
    faqClose="¿Tiene una ejecución pendiente de impulsar? Llame al 644 206 106 o escriba por WhatsApp."
    related={[
      { label: "Gestionar ejecuciones con procurador (despachos y servicers)", path: "/gestionar-ejecuciones-con-procurador" },
      { label: "Procurador en derecho bancario", path: "/procurador-derecho-bancario" },
      { label: "Subastas judiciales", path: "/subastas-judiciales-alicante" },
    ]}
    seoTitle="Procurador Ejecuciones Judiciales | Alicante y España"
    seoDescription="Gestión integral de ejecuciones dinerarias e hipotecarias: demanda ejecutiva, embargos, averiguación patrimonial, subasta y lanzamiento. Cobertura nacional."
    canonical="https://mascastellanoprocuradores.com/procurador-ejecuciones-judiciales"
    schemaName="Procurador para ejecuciones judiciales - Miguel Mas Castellano"
    schemaDescription="Gestión procesal de ejecuciones dinerarias e hipotecarias, embargos, subastas y lanzamientos en Alicante y toda España."
  />
);

export default ProcuradorEjecucionesJudiciales;
