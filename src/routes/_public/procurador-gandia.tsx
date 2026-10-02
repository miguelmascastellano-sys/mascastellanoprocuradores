import { createFileRoute } from "@tanstack/react-router";
import ProcuradorGandia from "@/pages/ProcuradorGandia";

export const Route = createFileRoute("/_public/procurador-gandia")({
  component: ProcuradorGandia,
});
