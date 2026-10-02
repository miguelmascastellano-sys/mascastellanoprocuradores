import { createFileRoute } from "@tanstack/react-router";
import Servicios from "@/pages/Servicios";

export const Route = createFileRoute("/_public/servicios")({
  component: Servicios,
});
