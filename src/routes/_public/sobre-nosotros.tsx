import { createFileRoute } from "@tanstack/react-router";
import SobreNosotros from "@/pages/SobreNosotros";

export const Route = createFileRoute("/_public/sobre-nosotros")({
  component: SobreNosotros,
});
