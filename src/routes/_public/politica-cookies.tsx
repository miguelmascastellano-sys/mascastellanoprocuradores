import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import PoliticaCookies from "@/pages/PoliticaCookies";

export const Route = createFileRoute("/_public/politica-cookies")({
  head: () => publicPageHead("/politica-cookies"),
  component: PoliticaCookies,
});
