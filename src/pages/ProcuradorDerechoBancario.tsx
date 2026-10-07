import ServicioLanding from "@/components/ServicioLanding";

const ProcuradorDerechoBancario = () => (
  <ServicioLanding
    national
    badge="Derecho Bancario"
    h1="Procurador en procedimientos de derecho bancario"
    heroSubtitulo="Representación procesal en ejecuciones hipotecarias, monitorios, cesiones de crédito y reclamaciones bancarias. Para despachos, entidades y fondos, con presencia en Alicante y cobertura en toda España."
    intro="Los procedimientos bancarios exigen volumen, orden y plazos bien controlados, tanto si se reclama una deuda como si se defiende a un consumidor. Como procurador, represento a su cliente ante el juzgado siempre en coordinación con el letrado director, que es quien dirige la estrategia y presta el asesoramiento jurídico."
    sections={[
      {
        h2: "Para entidades financieras, fondos y servicers",
        paragraphs: [
          "Gestionamos la parte procesal de la recuperación judicial de deuda, con un interlocutor único y seguimiento por expediente:",
        ],
        bullets: [
          "Ejecuciones hipotecarias, desde la demanda hasta la adjudicación.",
          "Procesos monitorios y juicios cambiarios.",
          "Sucesión procesal tras la cesión de un crédito o de una cartera.",
          "Recobro judicial en volumen, con reporting y control de plazos.",
          "Subastas judiciales electrónicas y toma de posesión.",
        ],
      },
      {
        h2: "Para despachos que defienden a consumidores",
        paragraphs: [
          "Representamos a los clientes de despachos que reclaman frente a entidades financieras, presentando escritos y siguiendo cada procedimiento hasta su ejecución:",
        ],
        bullets: [
          "Cláusulas suelo.",
          "Gastos hipotecarios.",
          "Tarjetas revolving y créditos con intereses usurarios.",
          "IRPH.",
          "Oposición a ejecuciones hipotecarias.",
        ],
      },
      {
        h2: "El papel del procurador junto al letrado",
        paragraphs: [
          "El procurador es el representante procesal: presenta los escritos, recibe las notificaciones y vela por los plazos. No sustituye al abogado ni presta asesoramiento jurídico; trabaja coordinado con el letrado director para que el procedimiento avance sin incidencias.",
          "Esta separación de funciones es una garantía para el cliente: el letrado decide la estrategia y el procurador asegura que cada actuación llegue al juzgado en tiempo y forma.",
        ],
      },
      {
        h2: "Presentación telemática y cobertura nacional",
        paragraphs: [
          "Trabajamos con LexNET y los sistemas autonómicos (Avantius, e-Justícia.cat, JustiziaSip y Vereda), lo que permite actuar en juzgados de distintos territorios desde un mismo despacho. En Alicante, Benidorm, Dénia y Gandía actuamos directamente; en el resto de España, con colaboradores coordinados por nosotros.",
        ],
      },
    ]}
    faqs={[
      { q: "¿Qué es la sucesión procesal tras una cesión de crédito?", a: "Es el trámite por el que el nuevo titular del crédito sustituye al anterior como parte en el procedimiento. El procurador presenta la solicitud con la documentación de la cesión y sigue el trámite de audiencia hasta que el juzgado la acuerda." },
      { q: "¿Trabajan tanto para entidades como para consumidores?", a: "Sí, en asuntos distintos y siempre a través del letrado que dirige cada caso. Antes de aceptar un encargo comprobamos que no existe conflicto con otros expedientes." },
      { q: "¿El procurador asesora sobre si una cláusula es abusiva?", a: "No. Esa valoración corresponde al abogado. El procurador se ocupa de la representación procesal: escritos, notificaciones, plazos y actuaciones ante el juzgado." },
      { q: "¿Pueden asumir carteras con muchos expedientes?", a: "Sí. Organizamos el trabajo con control centralizado de plazos, informes periódicos de estado y facturación unificada por cartera." },
      { q: "¿Es necesario procurador en un proceso monitorio?", a: "Para presentar la petición inicial no es preceptivo. Sí lo es, por regla general, si hay oposición y el asunto pasa a juicio de cierta cuantía, y en la ejecución posterior." },
    ]}
    faqClose="¿Tiene un procedimiento bancario en marcha? Llame al 644 206 106 o escriba por WhatsApp."
    related={[
      { label: "Procurador para ejecuciones judiciales", path: "/procurador-ejecuciones-judiciales" },
      { label: "Subastas judiciales", path: "/subastas-judiciales-alicante" },
      { label: "Cobertura nacional", path: "/procurador-nacional-espana" },
    ]}
    seoTitle="Procurador Derecho Bancario | Alicante y Cobertura Nacional"
    seoDescription="Procurador en derecho bancario: ejecuciones, monitorios y cesiones de crédito para entidades, y cláusulas suelo, gastos, revolving e IRPH para despachos. ☎️ 644 206 106."
    canonical="https://mascastellanoprocuradores.com/procurador-derecho-bancario"
    schemaName="Procurador en derecho bancario - Miguel Mas Castellano"
    schemaDescription="Representación procesal en ejecuciones hipotecarias, monitorios, sucesión procesal y reclamaciones bancarias en Alicante y toda España."
  />
);

export default ProcuradorDerechoBancario;
