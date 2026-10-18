import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import Servicios from "@/pages/Servicios";

export const Route = createFileRoute("/_public/servicios")({
  head: () => publicPageHead("/servicios"),
  component: Servicios,
});
