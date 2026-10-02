import { createFileRoute } from "@tanstack/react-router";
import EjecucionesJudicialesAlicante from "@/pages/EjecucionesJudicialesAlicante";

export const Route = createFileRoute("/_public/ejecuciones-judiciales-alicante")({
  component: EjecucionesJudicialesAlicante,
});
