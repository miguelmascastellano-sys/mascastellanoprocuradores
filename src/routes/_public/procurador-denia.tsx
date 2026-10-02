import { createFileRoute } from "@tanstack/react-router";
import ProcuradorDenia from "@/pages/ProcuradorDenia";

export const Route = createFileRoute("/_public/procurador-denia")({
  component: ProcuradorDenia,
});
