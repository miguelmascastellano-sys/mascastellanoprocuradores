import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import GestionarEjecucionesProcurador from "@/pages/GestionarEjecucionesProcurador";

export const Route = createFileRoute("/_public/gestionar-ejecuciones-con-procurador")({
  head: () => publicPageHead("/gestionar-ejecuciones-con-procurador"),
  component: GestionarEjecucionesProcurador,
});
