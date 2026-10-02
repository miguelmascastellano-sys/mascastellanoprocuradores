import { createFileRoute } from "@tanstack/react-router";
import ProcuradorNacionalEspana from "@/pages/ProcuradorNacionalEspana";

export const Route = createFileRoute("/_public/procurador-nacional-espana")({
  component: ProcuradorNacionalEspana,
});
