import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import Index from "@/pages/Index";

export const Route = createFileRoute("/_public/")({
  head: () => publicPageHead("/"),
  component: Index,
});
