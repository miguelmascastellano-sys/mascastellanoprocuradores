/** Datos públicos confirmados del profesional; no añadir años de ejercicio sin verificarlos. */
export const professional = {
  name: "Miguel Mas Castellano",
  phone: "644 206 106",
  phoneLink: "+34644206106",
  email: "miguel.mas@icopal.org",
  college: "Ilustre Colegio de Procuradores de Alicante (ICOPAL)",
  collegeNumber: "660",
  experienceYears: null as number | null,
  judicialDistricts: ["Dénia", "Alicante", "Benidorm", "Gandía"],
} as const;
