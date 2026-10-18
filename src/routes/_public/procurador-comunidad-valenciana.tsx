import { createFileRoute } from "@tanstack/react-router";
import ServicioLanding from "@/components/ServicioLanding";
import { communityPage } from "@/data/coverage-pages";

export const Route = createFileRoute("/_public/procurador-comunidad-valenciana")({
  head: () => ({
    meta: [
      { title: communityPage.seoTitle },
      { name: "description", content: communityPage.seoDescription },
      { property: "og:title", content: communityPage.seoTitle },
      { property: "og:description", content: communityPage.seoDescription },
      { property: "og:url", content: communityPage.canonical },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: communityPage.canonical }],
  }),
  component: () => <ServicioLanding {...communityPage} routeMetadata />,
});
