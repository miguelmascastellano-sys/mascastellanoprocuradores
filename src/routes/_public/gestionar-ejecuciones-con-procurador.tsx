import { createFileRoute } from "@tanstack/react-router";
import GestionarEjecucionesProcurador from "@/pages/GestionarEjecucionesProcurador";

export const Route = createFileRoute("/_public/gestionar-ejecuciones-con-procurador")({
  component: GestionarEjecucionesProcurador,
});
