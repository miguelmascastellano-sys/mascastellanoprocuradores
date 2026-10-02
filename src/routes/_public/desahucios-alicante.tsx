import { createFileRoute } from "@tanstack/react-router";
import DesahuciosAlicante from "@/pages/DesahuciosAlicante";

export const Route = createFileRoute("/_public/desahucios-alicante")({
  component: DesahuciosAlicante,
});
