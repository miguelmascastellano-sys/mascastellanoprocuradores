import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import Contacto from "@/pages/Contacto";

export const Route = createFileRoute("/_public/contacto")({
  head: () => publicPageHead("/contacto"),
  component: Contacto,
});
