import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import PoliticaPrivacidad from "@/pages/PoliticaPrivacidad";

export const Route = createFileRoute("/_public/politica-privacidad")({
  head: () => publicPageHead("/politica-privacidad"),
  component: PoliticaPrivacidad,
});
