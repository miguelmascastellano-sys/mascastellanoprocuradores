import { createFileRoute } from "@tanstack/react-router";
import ProcuradorDerechoBancario from "@/pages/ProcuradorDerechoBancario";

export const Route = createFileRoute("/_public/procurador-derecho-bancario")({
  component: ProcuradorDerechoBancario,
});
