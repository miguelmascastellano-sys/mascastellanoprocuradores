import ServicioLanding from "@/components/ServicioLanding";

const ProcuradorSegundaOportunidad = () => (
  <ServicioLanding
    national
    badge="Ley de Segunda Oportunidad"
    h1="Procurador para la Ley de Segunda Oportunidad y el concurso de persona física en Alicante"
    heroSubtitulo="Representación procesal del deudor o del acreedor en concursos de persona física y en la exoneración del pasivo insatisfecho ante lo Mercantil de Alicante. Servicio para despachos."
    intro="En el concurso de persona física el procurador representa al deudor o al acreedor ante el juzgado: presenta la solicitud y los escritos, recibe las resoluciones y controla los plazos. La estrategia y el asesoramiento (buena fe, viabilidad, plan de pagos) corresponden al letrado director del asunto."
    sections={[
      {
        h2: "Por qué el procurador es obligatorio",
        paragraphs: [
          "El art. 6.2 del Texto Refundido de la Ley Concursal (TRLC) exige que la solicitud de concurso se presente por medio de procurador, con la firma de este y de abogado. Para solicitar el concurso se necesita un poder especial, otorgado ante notario o apud acta, de forma presencial o electrónica.",
          "Además, el art. 510 TRLC establece que «el concursado actuará siempre representado por procurador y asistido de letrado». Para los acreedores, el art. 512 TRLC regula su personación. En el procedimiento especial para microempresas, el art. 687.6 TRLC también exige abogado y procurador al deudor.",
        ],
      },
      {
        h2: "La exoneración del pasivo insatisfecho tras la Ley 16/2022",
        paragraphs: [
          "Puede solicitar la exoneración la persona natural, sea o no empresaria, que sea deudora de buena fe. La ley prevé dos vías (art. 486 TRLC):",
        ],
        bullets: [
          "Exoneración con sujeción a un plan de pagos, sin liquidación previa de la masa activa.",
          "Exoneración tras la liquidación de la masa activa.",
        ],
      },
      {
        h2: "Qué juzgado tramita el concurso en la provincia de Alicante",
        paragraphs: [
          "Desde la LO 7/2022, los concursos de cualquier persona física corresponden a lo mercantil (art. 44 TRLC). Tras la LO 1/2025, el órgano competente es la Sección de lo Mercantil del Tribunal de Instancia de Alicante, con sede en Alicante y una plaza desplazada en Elche.",
          "El partido se determina por el centro de intereses principales del deudor (art. 45 TRLC). Los deudores de Gandía, que pertenece a la provincia de Valencia, tramitan su concurso ante la Sección de lo Mercantil del Tribunal de Instancia de Valencia.",
        ],
      },
      {
        h2: "Concurso sin masa",
        paragraphs: [
          "Cuando concurren los supuestos del art. 37 bis TRLC, el juez declara el concurso sin masa y se publica el auto. Los acreedores que representen al menos el 5 % del pasivo pueden solicitar el nombramiento de un administrador concursal (arts. 37 ter y 37 quater). Si nadie lo solicita, el deudor puede pedir la exoneración del pasivo insatisfecho.",
        ],
      },
      {
        h2: "Plan de pagos o liquidación: qué hace el procurador",
        paragraphs: ["En cualquiera de las dos vías, el procurador se ocupa de la parte procesal:"],
        bullets: [
          "Presentación de la solicitud y de los escritos posteriores.",
          "Aportación del poder especial.",
          "Traslado inmediato de las resoluciones al letrado.",
          "Control de los plazos procesales.",
          "Mandamientos y edictos (arts. 553 y 556 TRLC).",
          "Seguimiento del procedimiento hasta la exoneración.",
        ],
      },
      {
        h2: "Autónomos: procedimiento especial para microempresas",
        paragraphs: [
          "El procedimiento especial para microempresas se tramita de forma telemática mediante formularios oficiales. Aun así, el deudor necesita abogado y procurador (art. 687.6 TRLC).",
        ],
      },
      {
        h2: "Para acreedores y servicers",
        paragraphs: ["Siempre en coordinación con su letrado, intervenimos en defensa de los acreedores:"],
        bullets: [
          "Personación en el concurso (art. 512 TRLC).",
          "Seguimiento de la suspensión de ejecuciones al declararse el concurso (arts. 142 y 143 TRLC).",
          "Oposición a la exoneración y solicitud de revocación (art. 493 TRLC).",
        ],
      },
    ]}
    steps={[
      { title: "Recepción del encargo", desc: "El despacho nos remite la documentación y el poder especial o la cita para otorgarlo apud acta." },
      { title: "Presentación", desc: "Presentamos la solicitud y los escritos por LexNET ante la Sección de lo Mercantil competente." },
      { title: "Seguimiento", desc: "Revisamos la documentación procesal, le indicamos los plazos procesales en curso y coordinamos con su letrado la siguiente actuación." },
      { title: "Hasta la exoneración", desc: "Damos traslado de cada resolución y seguimos el procedimiento hasta el auto de exoneración." },
    ]}
    related={[
      { label: "Procurador ejecuciones judiciales", path: "/procurador-ejecuciones-judiciales" },
      { label: "Procurador derecho bancario", path: "/procurador-derecho-bancario" },
      { label: "Procurador en Alicante", path: "/procurador-alicante" },
    ]}
    faqs={[
      { q: "¿Es obligatorio el procurador en la Ley de Segunda Oportunidad?", a: "Sí. Los arts. 6.2 y 510 del TRLC exigen la representación por procurador, también en el procedimiento especial para microempresas (art. 687.6 TRLC)." },
      { q: "¿Qué poder necesita el procurador?", a: "Un poder especial para solicitar el concurso, otorgado ante notario o apud acta (art. 6.2 TRLC)." },
      { q: "¿Qué juzgado lleva el concurso de una persona física en Alicante?", a: "La Sección de lo Mercantil del Tribunal de Instancia de Alicante (o la de Valencia en el caso de Gandía), según el centro de intereses principales del deudor." },
      { q: "¿Qué deudas no se exoneran?", a: "Las previstas en el art. 489 TRLC: responsabilidad civil extracontractual por muerte o daños personales y la derivada de delito, alimentos, ciertos salarios, multas penales y sanciones muy graves, costas de la propia solicitud y deudas con garantía real dentro del privilegio, entre otras." },
      { q: "¿Se exoneran las deudas con Hacienda y Seguridad Social?", a: "Según el art. 489 TRLC, hasta 10.000 € por cada organismo (los primeros 5.000 € íntegramente y el 50 % del resto), solo en la primera exoneración. Su letrado confirmará el criterio judicial actual." },
      { q: "¿Cuánto dura el plan de pagos?", a: "Tres años con carácter general; cinco si no se realiza la vivienda habitual o si los pagos dependen de la evolución de la renta (art. 497 TRLC)." },
    ]}
    faqClose="Si su despacho tramita un concurso de persona física en Alicante, llame al 644 206 106 o escriba por WhatsApp."
    seoTitle="Procurador Ley Segunda Oportunidad Alicante | Concurso Persona Física"
    seoDescription="Procurador para concursos de persona física y exoneración del pasivo (Ley 16/2022) ante lo Mercantil de Alicante. Servicio para despachos. ☎️ 644 206 106."
    canonical="https://mascastellanoprocuradores.com/procurador-ley-segunda-oportunidad"
    schemaName="Procurador Ley de Segunda Oportunidad en Alicante"
    schemaDescription="Representación procesal en concursos de persona física y exoneración del pasivo insatisfecho ante la Sección de lo Mercantil del Tribunal de Instancia de Alicante."
  />
);

export default ProcuradorSegundaOportunidad;
