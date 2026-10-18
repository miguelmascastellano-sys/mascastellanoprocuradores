import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import ProcuradorGandia from "@/pages/ProcuradorGandia";

export const Route = createFileRoute("/_public/procurador-gandia")({
  head: () => publicPageHead("/procurador-gandia"),
  component: ProcuradorGandia,
});
