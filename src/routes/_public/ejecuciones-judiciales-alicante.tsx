import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import EjecucionesJudicialesAlicante from "@/pages/EjecucionesJudicialesAlicante";

export const Route = createFileRoute("/_public/ejecuciones-judiciales-alicante")({
  head: () => publicPageHead("/ejecuciones-judiciales-alicante"),
  component: EjecucionesJudicialesAlicante,
});
