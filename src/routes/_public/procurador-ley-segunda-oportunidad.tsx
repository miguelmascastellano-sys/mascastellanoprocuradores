import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import ProcuradorSegundaOportunidad from "@/pages/ProcuradorSegundaOportunidad";

export const Route = createFileRoute("/_public/procurador-ley-segunda-oportunidad")({
  head: () => publicPageHead("/procurador-ley-segunda-oportunidad"),
  component: ProcuradorSegundaOportunidad,
});
