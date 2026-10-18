import { createFileRoute } from "@tanstack/react-router";
import ServicioLanding from "@/components/ServicioLanding";
import { elchePage } from "@/data/coverage-pages";

export const Route = createFileRoute("/_public/procurador-elche")({
  head: () => ({
    meta: [
      { title: elchePage.seoTitle },
      { name: "description", content: elchePage.seoDescription },
      { property: "og:title", content: elchePage.seoTitle },
      { property: "og:description", content: elchePage.seoDescription },
      { property: "og:url", content: elchePage.canonical },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: elchePage.canonical }],
  }),
  component: () => <ServicioLanding {...elchePage} routeMetadata />,
});
