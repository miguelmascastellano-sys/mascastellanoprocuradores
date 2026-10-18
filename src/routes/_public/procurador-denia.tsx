import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import ProcuradorDenia from "@/pages/ProcuradorDenia";

export const Route = createFileRoute("/_public/procurador-denia")({
  head: () => publicPageHead("/procurador-denia"),
  component: ProcuradorDenia,
});
