import { createFileRoute } from "@tanstack/react-router";
import ServicioLanding from "@/components/ServicioLanding";
import { pricePage } from "@/data/coverage-pages";

export const Route = createFileRoute("/_public/precio-procurador-alicante")({
  head: () => ({
    meta: [
      { title: pricePage.seoTitle },
      { name: "description", content: pricePage.seoDescription },
      { property: "og:title", content: pricePage.seoTitle },
      { property: "og:description", content: pricePage.seoDescription },
      { property: "og:url", content: pricePage.canonical },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: pricePage.seoTitle },
      { name: "twitter:description", content: pricePage.seoDescription },
    ],
    links: [{ rel: "canonical", href: pricePage.canonical }],
  }),
  component: () => <ServicioLanding {...pricePage} routeMetadata />,
});
