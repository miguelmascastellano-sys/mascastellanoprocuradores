import { createFileRoute } from "@tanstack/react-router";
import ProcuradorBenidorm from "@/pages/ProcuradorBenidorm";

export const Route = createFileRoute("/_public/procurador-benidorm")({
  component: ProcuradorBenidorm,
});
