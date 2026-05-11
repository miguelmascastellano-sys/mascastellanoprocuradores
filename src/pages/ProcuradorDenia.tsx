import LandingZona from "@/components/LandingZona";

const ProcuradorDenia = () => (
  <LandingZona
    ciudad="Dénia"
    partidoJudicial="Partido Judicial de la Marina Alta"
    zonaCorta="Marina Alta"
    juzgadosLabel="Juzgados de Dénia"
    heroSubtitulo="Agilidad procesal, gestión de plazos y representación técnica para abogados y despachos nacionales."
    autoridadTexto="Acudimos cada jornada a los Juzgados de Dénia, lo que garantiza el impulso inmediato de cada actuación, la presentación puntual de escritos y el seguimiento directo de todo señalamiento en la Marina Alta."
    abogadosTexto="Si su despacho está fuera de la provincia de Alicante, asumimos la representación procesal en Dénia con plena seguridad jurídica: control riguroso de plazos, comunicación proactiva tras cada notificación y reporte inmediato de toda resolución relevante."
    faqs={[
      {
        q: "¿En qué partidos judiciales asumen la procura?",
        a: "Nuestra sede está en Dénia y operamos con preferencia en todo el partido judicial de la Marina Alta. Coordinamos también actuaciones en partidos limítrofes mediante red de procuradores colaboradores.",
      },
      {
        q: "¿Cuál es el plazo habitual de presentación de escritos?",
        a: "Los escritos no urgentes se presentan en el mismo día de su recepción siempre que lleguen antes de las 17:00. Para escritos de gracia o término, atendemos comunicación telefónica inmediata.",
      },
      {
        q: "¿Pueden recibir y trasladar notificaciones LexNET el mismo día?",
        a: "Sí. Las notificaciones recibidas por LexNET se descargan, registran y trasladan al letrado director dentro de la jornada laboral, con resumen del contenido y plazos derivados.",
      },
    ]}
    direccion="C/ del Procurador, s/n (placeholder)"
    seoTitle="Procurador en Dénia | Marina Alta — Más Castellano Procuradores"
    seoDescription="Procurador de los Tribunales en Dénia y Marina Alta. Representación procesal, LexNET, ejecuciones, lanzamientos y control de plazos para abogados y particulares."
    canonical="https://mascastellanoprocuradores.com/procurador-denia"
  />
);

export default ProcuradorDenia;
