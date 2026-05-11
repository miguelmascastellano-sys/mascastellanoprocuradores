import LandingZona from "@/components/LandingZona";

const ProcuradorGandia = () => (
  <LandingZona
    ciudad="Gandía"
    partidoJudicial="Partido Judicial de la Safor"
    zonaCorta="la Safor"
    juzgadosLabel="Juzgados de Gandía"
    heroSubtitulo="Tramitación procesal eficiente, presencia diaria en sede judicial y soporte técnico continuado para letrados de toda España."
    autoridadTexto="Mantenemos asistencia regular a los Juzgados de Gandía, conociendo de primera mano sus criterios de tramitación y dinámica de señalamientos. Esa cercanía permite anticipar incidencias y resolverlas en sede, sin demoras."
    abogadosTexto="Para despachos foráneos al partido de la Safor, ofrecemos una procura técnica orientada a la protección de plazos y a la depuración procesal del expediente, con informes estructurados tras cada hito relevante del procedimiento."
    faqs={[
      {
        q: "¿Cubren todo el partido judicial de la Safor?",
        a: "Sí. Asumimos la representación procesal en todos los órganos del partido judicial de Gandía, así como en la Audiencia Provincial de Valencia para los asuntos elevados en apelación.",
      },
      {
        q: "¿Cómo gestionan los plazos cuando el letrado está en otra ciudad?",
        a: "Tras cada notificación se emite aviso al letrado con cómputo de plazo y propuesta de fecha límite interna. Establecemos recordatorios automáticos para evitar cualquier riesgo de preclusión.",
      },
      {
        q: "¿Pueden presentar escritos de término el mismo día?",
        a: "Sí. Recibido el escrito en formato definitivo durante la jornada, garantizamos su presentación dentro del plazo, incluida su entrada por LexNET en horario de gracia cuando proceda.",
      },
    ]}
    direccion="C/ del Procurador, s/n (placeholder)"
    seoTitle="Procurador en Gandía | La Safor — Más Castellano Procuradores"
    seoDescription="Procurador en Gandía y partido judicial de la Safor. Representación procesal, LexNET, embargos, lanzamientos y control de plazos para abogados de toda España."
    canonical="https://mascastellanoprocuradores.com/procurador-gandia"
  />
);

export default ProcuradorGandia;
