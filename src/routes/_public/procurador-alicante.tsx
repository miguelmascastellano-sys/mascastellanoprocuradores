import { createFileRoute } from "@tanstack/react-router";
import ProcuradorAlicante from "@/pages/ProcuradorAlicante";

export const Route = createFileRoute("/_public/procurador-alicante")({
  component: ProcuradorAlicante,
});
