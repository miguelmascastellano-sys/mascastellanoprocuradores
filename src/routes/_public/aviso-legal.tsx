import { createFileRoute } from "@tanstack/react-router";
import AvisoLegal from "@/pages/AvisoLegal";

export const Route = createFileRoute("/_public/aviso-legal")({
  component: AvisoLegal,
});
