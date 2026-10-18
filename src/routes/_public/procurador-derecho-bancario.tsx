import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import ProcuradorDerechoBancario from "@/pages/ProcuradorDerechoBancario";

export const Route = createFileRoute("/_public/procurador-derecho-bancario")({
  head: () => publicPageHead("/procurador-derecho-bancario"),
  component: ProcuradorDerechoBancario,
});
