import { createFileRoute } from "@tanstack/react-router";
import SubastasJudicialesAlicante from "@/pages/SubastasJudicialesAlicante";

export const Route = createFileRoute("/_public/subastas-judiciales-alicante")({
  component: SubastasJudicialesAlicante,
});
