/** Ámbito del servicio; no implica disponer de oficina en cada localidad. */
export const coverageAreas = [
  ...["Alicante", "Elche", "Benidorm", "Dénia", "Gandía"].map((name) => ({ "@type": "City", name })),
  { "@type": "AdministrativeArea", name: "Provincia de Alicante" },
  { "@type": "AdministrativeArea", name: "Comunidad Valenciana" },
  { "@type": "Country", name: "España" },
];

export const coverageLinks = [
  { label: "Comunidad Valenciana", path: "/procurador-comunidad-valenciana" },
  { label: "Provincia de Alicante", path: "/procurador-provincia-alicante" },
  { label: "Procurador en Elche", path: "/procurador-elche" },
];