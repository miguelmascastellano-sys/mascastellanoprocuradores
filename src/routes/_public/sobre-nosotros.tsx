import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import SobreNosotros from "@/pages/SobreNosotros";

export const Route = createFileRoute("/_public/sobre-nosotros")({
  head: () => publicPageHead("/sobre-nosotros"),
  component: SobreNosotros,
});
