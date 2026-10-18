import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import ProcuradorAlicante from "@/pages/ProcuradorAlicante";

export const Route = createFileRoute("/_public/procurador-alicante")({
  head: () => publicPageHead("/procurador-alicante"),
  component: ProcuradorAlicante,
});
