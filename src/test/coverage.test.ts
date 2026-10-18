import { describe, expect, it } from "vitest";
import { coverageAreas } from "@/data/coverage";
import { professional } from "@/data/professional";

describe("Confirmed professional coverage", () => {
  it("includes the five requested cities", () => {
    expect(coverageAreas.filter((area) => area["@type"] === "City").map((area) => area.name)).toEqual(["Alicante", "Elche", "Benidorm", "Dénia", "Gandía"]);
  });
  it("includes the province, autonomous community and country", () => {
    expect(coverageAreas.filter((area) => area["@type"] !== "City")).toEqual([
      { "@type": "AdministrativeArea", name: "Provincia de Alicante" },
      { "@type": "AdministrativeArea", name: "Comunidad Valenciana" },
      { "@type": "Country", name: "España" },
    ]);
  });
  it("keeps the professional identified as ICOPAL member 660", () => {
    expect(professional.collegeNumber).toBe("660");
    expect(professional.college).toBe("Ilustre Colegio de Procuradores de Alicante (ICOPAL)");
  });
});