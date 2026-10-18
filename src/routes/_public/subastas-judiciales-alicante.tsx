import { createFileRoute } from "@tanstack/react-router";
import { publicPageHead } from "@/data/page-metadata";
import SubastasJudicialesAlicante from "@/pages/SubastasJudicialesAlicante";

export const Route = createFileRoute("/_public/subastas-judiciales-alicante")({
  head: () => publicPageHead("/subastas-judiciales-alicante"),
  component: SubastasJudicialesAlicante,
});
