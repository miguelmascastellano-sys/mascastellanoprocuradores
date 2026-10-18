import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import AvisoLegal from "@/pages/AvisoLegal";

export const Route = createFileRoute("/_public/aviso-legal")({
  head: () => publicPageHead("/aviso-legal"),
  component: AvisoLegal,
});
