import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import ProcuradorNacionalEspana from "@/pages/ProcuradorNacionalEspana";

export const Route = createFileRoute("/_public/procurador-nacional-espana")({
  head: () => publicPageHead("/procurador-nacional-espana"),
  component: ProcuradorNacionalEspana,
});
