export const publicMetadata: Record<string, { title: string; description: string }> = {
  "/aviso-legal": {
    "title": "Aviso Legal | Mas Castellano Procurador",
    "description": "Aviso legal del sitio web de Mas Castellano, Procurador de los Tribunales. Datos identificativos del titular conforme a la LSSI-CE."
  },
  "/blog": {
    "title": "Blog de procuraduría | Más Castellano",
    "description": "Más Castellano: artículos de procuraduría en Dénia, Alicante y Benidorm. Guías de representación judicial, plazos, notificaciones y ejecuciones."
  },
  "/contacto": {
    "title": "Contacto | Más Castellano Procurador",
    "description": "Contacte con Más Castellano, procurador en Alicante, Benidorm, Dénia y Gandía. Teléfono, WhatsApp y formulario. Cobertura nacional. 644 206 106."
  },
  "/desahucios-alicante": {
    "title": "Procurador Desahucios Alicante | Lanzamientos",
    "description": "Procurador para desahucios en Alicante: juicio verbal por impago, lanzamientos y recuperación de la posesión en los Juzgados de Benalúa. 644 206 106."
  },
  "/ejecuciones-judiciales-alicante": {
    "title": "Ejecuciones judiciales en Alicante | Procurador en el Tribunal de Instancia",
    "description": "Procurador para ejecuciones judiciales en Alicante: ejecución de sentencias, embargos, hipotecarias y vía de apremio en el Tribunal de Instancia de Alicante. ☎️ 644 206 106."
  },
  "/gestionar-ejecuciones-con-procurador": {
    "title": "Gestionar ejecuciones con procurador | Despachos y servicers",
    "description": "Cómo gestionar ejecuciones judiciales con procurador: fases, estados semanales, control de plazos en LexNET y carteras en bloque. ☎ 644 206 106."
  },
  "/": {
    "title": "Procuradores en Dénia, Alicante y Benidorm | Más Castellano",
    "description": "Procuradores en Dénia, Alicante y Benidorm: Miguel Mas Castellano, procurador de los tribunales. Ejecuciones, embargos y escritos. ☎ 644 206 106."
  },
  "/politica-cookies": {
    "title": "Política de Cookies | Mas Castellano Procurador",
    "description": "Información sobre el uso de cookies en el sitio web de Mas Castellano Procurador conforme a la LSSI-CE y al RGPD."
  },
  "/politica-privacidad": {
    "title": "Política de Privacidad | Mas Castellano Procurador",
    "description": "Política de privacidad y tratamiento de datos personales del sitio web de Mas Castellano Procurador, conforme al RGPD y la LOPDGDD."
  },
  "/procurador-alicante": {
    "title": "Procurador en Alicante | Procuradores de los Tribunales",
    "description": "Procurador en Alicante para desahucios, ejecuciones y subastas. Procuradores en Alicante con presencia en Benalúa y Audiencia. ☎ 644 206 106."
  },
  "/procurador-benidorm": {
    "title": "Procuradores en Benidorm | Procurador de los Tribunales",
    "description": "Procuradores en Benidorm: procurador de los tribunales para ejecuciones, desahucios y subastas en los Juzgados de la Marina Baixa. ☎ 644 206 106."
  },
  "/procurador-denia": {
    "title": "Procuradores en Dénia | Procurador Más Castellano",
    "description": "Procuradores en Dénia y Marina Alta: Más Castellano. Representación, ejecuciones, desahucios y control de plazos con LexNET. 644 206 106."
  },
  "/procurador-derecho-bancario": {
    "title": "Procurador Derecho Bancario | Alicante y Cobertura Nacional",
    "description": "Procurador en derecho bancario: ejecuciones, monitorios, cesiones de crédito y reclamaciones bancarias. Alicante y cobertura nacional. 644 206 106."
  },
  "/procurador-ejecuciones-judiciales": {
    "title": "Procurador Ejecuciones Judiciales | Alicante y España",
    "description": "Gestión integral de ejecuciones dinerarias e hipotecarias: demanda ejecutiva, embargos, averiguación patrimonial, subasta y lanzamiento. Cobertura nacional."
  },
  "/procurador-gandia": {
    "title": "Procuradores en Gandía | Procurador de los Tribunales",
    "description": "Procuradores en Gandía: ejecuciones, embargos y subastas ante los Juzgados de la Safor. Más Castellano, atención a despachos. 644 206 106."
  },
  "/procurador-ley-segunda-oportunidad": {
    "title": "Procurador Ley Segunda Oportunidad Alicante | Concurso Persona Física",
    "description": "Procurador para concursos de persona física y exoneración del pasivo (Ley 16/2022) ante lo Mercantil de Alicante. Servicio para despachos. ☎️ 644 206 106."
  },
  "/procurador-nacional-espana": {
    "title": "Procurador Nacional en España | Todos los Juzgados",
    "description": "Procurador nacional para despachos: un único interlocutor en todos los juzgados de España con LexNet, Avantius, e-Justícia y Adriano. ☎ 644 206 106."
  },
  "/servicios": {
    "title": "Servicios de Procurador | Representación Procesal y Gestión Integral | Mas Castellano",
    "description": "Servicios profesionales de procurador: representación procesal, gestión LexNET, control de plazos, presentación de escritos y sustituciones en toda España."
  },
  "/sobre-nosotros": {
    "title": "El despacho | Más Castellano Procurador",
    "description": "Conozca a Miguel Mas Castellano, procurador ICOPAL nº 660. Más Castellano: representación, control de plazos y atención directa a cada expediente."
  },
  "/subastas-judiciales-alicante": {
    "title": "Procurador Subastas Judiciales Alicante | BOE",
    "description": "Procurador para subastas judiciales electrónicas en Alicante: depósito, puja en el BOE, adjudicación y posesión. Acreedores e inversores. 644 206 106."
  }
};

export function publicPageHead(path: string) {
  const page = publicMetadata[path];
  if (!page) return {};
  return {
    meta: [
      { title: page.title },
      { name: 'description', content: page.description },
      { property: 'og:title', content: page.title },
      { property: 'og:description', content: page.description },
      { property: 'og:url', content: `https://mascastellanoprocuradores.com${path}` },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
    links: [{ rel: 'canonical', href: `https://mascastellanoprocuradores.com${path}` }],
  };
}
