import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/procurador-nacional")({
  beforeLoad: () => {
    throw redirect({ to: "/procurador-nacional-espana", statusCode: 301 });
  },
});
