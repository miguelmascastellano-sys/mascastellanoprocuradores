import { createFileRoute } from "@tanstack/react-router";
import ProcuradorSegundaOportunidad from "@/pages/ProcuradorSegundaOportunidad";

export const Route = createFileRoute("/_public/procurador-ley-segunda-oportunidad")({
  component: ProcuradorSegundaOportunidad,
});
