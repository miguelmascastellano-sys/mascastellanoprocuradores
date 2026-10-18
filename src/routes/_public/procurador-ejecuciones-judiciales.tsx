import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import ProcuradorEjecucionesJudiciales from "@/pages/ProcuradorEjecucionesJudiciales";

export const Route = createFileRoute("/_public/procurador-ejecuciones-judiciales")({
  head: () => publicPageHead("/procurador-ejecuciones-judiciales"),
  component: ProcuradorEjecucionesJudiciales,
});
