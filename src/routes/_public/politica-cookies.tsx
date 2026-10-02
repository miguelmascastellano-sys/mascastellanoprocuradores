import { createFileRoute } from "@tanstack/react-router";
import PoliticaCookies from "@/pages/PoliticaCookies";

export const Route = createFileRoute("/_public/politica-cookies")({
  component: PoliticaCookies,
});
