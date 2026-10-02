import { createFileRoute } from "@tanstack/react-router";
import PoliticaPrivacidad from "@/pages/PoliticaPrivacidad";

export const Route = createFileRoute("/_public/politica-privacidad")({
  component: PoliticaPrivacidad,
});
