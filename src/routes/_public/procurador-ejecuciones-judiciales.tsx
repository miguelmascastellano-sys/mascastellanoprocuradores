import { createFileRoute } from "@tanstack/react-router";
import ProcuradorEjecucionesJudiciales from "@/pages/ProcuradorEjecucionesJudiciales";

export const Route = createFileRoute("/_public/procurador-ejecuciones-judiciales")({
  component: ProcuradorEjecucionesJudiciales,
});
