import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import DesahuciosAlicante from "@/pages/DesahuciosAlicante";

export const Route = createFileRoute("/_public/desahucios-alicante")({
  head: () => publicPageHead("/desahucios-alicante"),
  component: DesahuciosAlicante,
});
