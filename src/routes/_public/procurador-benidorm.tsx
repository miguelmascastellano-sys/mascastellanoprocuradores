import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import ProcuradorBenidorm from "@/pages/ProcuradorBenidorm";

export const Route = createFileRoute("/_public/procurador-benidorm")({
  head: () => publicPageHead("/procurador-benidorm"),
  component: ProcuradorBenidorm,
});
