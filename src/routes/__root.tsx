import { useEffect } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouter,
} from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieBanner from "@/components/CookieBanner";
import NotFound from "@/pages/NotFound";
import { reportLovableError } from "@/lib/lovable-error-reporting";

import appCss from "../styles.css?url";

const SITE_URL = "https://mascastellanoprocuradores.com";
const DEFAULT_TITLE = "Procurador en Dénia, Alicante y Benidorm | Miguel Mas";
const DEFAULT_DESCRIPTION =
  "Miguel Mas Castellano, procurador en Dénia, Alicante y Benidorm. Representación judicial, escritos, embargos y ejecuciones. Llame al 644 206 106.";

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Miguel Más Castellano Procurador",
      alternateName: ["Más Castellano Procurador", "Miguel Mas Procuradores"],
      url: `${SITE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/og-image.jpg`,
      email: "miguel.mas@icopal.org",
      telephone: "+34644206106",
      areaServed: "ES",
      sameAs: [],
    },
    {
      "@type": "LegalService",
      "@id": `${SITE_URL}/#legalservice`,
      name: "Miguel Más Castellano Procurador de los Tribunales",
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/og-image.jpg`,
      logo: `${SITE_URL}/logo.png`,
      description:
        "Procurador de los Tribunales especializado en representación procesal en Dénia, Alicante, Benidorm y Gandía. Control de plazos, escritos y ejecuciones ante Juzgados y Tribunales.",
      telephone: "+34644206106",
      email: "miguel.mas@icopal.org",
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Plaça Jaume I, 23",
        addressLocality: "Dénia",
        addressRegion: "Alicante",
        postalCode: "03700",
        addressCountry: "ES",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 38.8407,
        longitude: 0.1056,
      },
      areaServed: [
        { "@type": "City", name: "Dénia" },
        { "@type": "City", name: "Alicante" },
        { "@type": "City", name: "Benidorm" },
        { "@type": "City", name: "Gandía" },
      ],
      provider: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Miguel Más Castellano Procurador",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "es-ES",
    },
  ],
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: DEFAULT_TITLE },
      { name: "description", content: DEFAULT_DESCRIPTION },
      { name: "author", content: "Más Castellano Procurador" },
      { name: "application-name", content: "Más Castellano Procurador" },
      { name: "apple-mobile-web-app-title", content: "Más Castellano Procurador" },
      { name: "google-site-verification", content: "xiMq15Yxyb4T5dVWZyofL8-gMCatGGSyqeWcPO2QsQM" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_ES" },
      { property: "og:site_name", content: "Más Castellano Procurador" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:title", content: DEFAULT_TITLE },
      { property: "og:description", content: DEFAULT_DESCRIPTION },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:secure_url", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Más Castellano Procurador de los Tribunales" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: DEFAULT_TITLE },
      { name: "twitter:description", content: DEFAULT_DESCRIPTION },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
      { name: "twitter:image:alt", content: "Más Castellano Procurador de los Tribunales" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/favicon.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon.png" },
      { rel: "shortcut icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON_LD }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: RootErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CookieBanner />
          <Outlet />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

function RootErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  const router = useRouter();
  const err = error instanceof Error ? error : new Error(String(error));

  useEffect(() => {
    console.error(err);
    reportLovableError(err, { boundary: "tanstack_root_error_component" });
  }, [err]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold">Esta página no se ha cargado</h1>
        <p className="text-muted-foreground">
          Algo ha fallado por nuestra parte. Puede reintentarlo o volver al inicio.
        </p>
        <div className="flex gap-2 justify-center">
          <button
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
            onClick={() => {
              void router.invalidate();
              reset();
            }}
          >
            Reintentar
          </button>
          <a className="px-4 py-2 rounded-md border border-border" href="/">
            Ir al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
