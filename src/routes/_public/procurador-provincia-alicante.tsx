import { createFileRoute } from "@tanstack/react-router";
import ServicioLanding from "@/components/ServicioLanding";
import { provincePage } from "@/data/coverage-pages";

export const Route = createFileRoute("/_public/procurador-provincia-alicante")({
  head: () => ({
    meta: [
      { title: provincePage.seoTitle },
      { name: "description", content: provincePage.seoDescription },
      { property: "og:title", content: provincePage.seoTitle },
      { property: "og:description", content: provincePage.seoDescription },
      { property: "og:url", content: provincePage.canonical },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: provincePage.seoTitle },
      { name: "twitter:description", content: provincePage.seoDescription },
    ],
    links: [{ rel: "canonical", href: provincePage.canonical }],
  }),
  component: () => <ServicioLanding {...provincePage} routeMetadata />,
});
