import { Link, useLocation } from "@/lib/router-compat";
import { ChevronRight } from "lucide-react";

const SITE = "https://mascastellanoprocuradores.com";

// Etiquetas visibles de cada página (editar aquí al crear páginas nuevas).
const LABELS: Record<string, string> = {
  "/servicios": "Servicios",
  "/sobre-nosotros": "El despacho",
  "/contacto": "Contacto",
  "/blog": "Blog",
  "/procurador-alicante": "Procurador en Alicante",
  "/procurador-benidorm": "Procurador en Benidorm",
  "/procurador-denia": "Procuradores en Dénia",
  "/procurador-gandia": "Procurador en Gandía",
  "/procurador-nacional-espana": "Procurador nacional",
  "/procurador-comunidad-valenciana": "Comunidad Valenciana",
  "/procurador-provincia-alicante": "Provincia de Alicante",
  "/procurador-elche": "Procurador en Elche",
  "/precio-procurador-alicante": "Aranceles en Alicante",
  "/desahucios-alicante": "Desahucios en Alicante",
  "/subastas-judiciales-alicante": "Subastas judiciales en Alicante",
  "/ejecuciones-judiciales-alicante": "Ejecuciones judiciales en Alicante",
  "/procurador-ejecuciones-judiciales": "Procurador para ejecuciones judiciales",
  "/gestionar-ejecuciones-con-procurador": "Gestionar ejecuciones con procurador",
  "/procurador-derecho-bancario": "Procurador en derecho bancario",
  "/procurador-ley-segunda-oportunidad": "Ley de Segunda Oportunidad",
  "/aviso-legal": "Aviso legal",
  "/politica-privacidad": "Política de privacidad",
  "/politica-cookies": "Política de cookies",
};

// Página "padre" intermedia para servicios y zonas.
const PARENT: Record<string, string> = {
  "/procurador-elche": "/procurador-provincia-alicante",
  "/precio-procurador-alicante": "/procurador-alicante",
  "/desahucios-alicante": "/servicios",
  "/subastas-judiciales-alicante": "/servicios",
  "/ejecuciones-judiciales-alicante": "/servicios",
  "/procurador-ejecuciones-judiciales": "/servicios",
  "/gestionar-ejecuciones-con-procurador": "/servicios",
  "/procurador-derecho-bancario": "/servicios",
  "/procurador-ley-segunda-oportunidad": "/servicios",
};

const humanize = (slug: string) => {
  const s = decodeURIComponent(slug).replace(/-/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export function buildCrumbs(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/" || path.startsWith("/admin")) return null;
  const crumbs: { name: string; path: string }[] = [{ name: "Inicio", path: "/" }];
  if (path.startsWith("/blog/")) {
    crumbs.push({ name: "Blog", path: "/blog" });
    crumbs.push({ name: humanize(path.slice(6)), path });
    return crumbs;
  }
  if (!LABELS[path]) return null;
  const parent = PARENT[path];
  if (parent) crumbs.push({ name: LABELS[parent] ?? "", path: parent });
  crumbs.push({ name: LABELS[path], path });
  return crumbs;
}

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const crumbs = buildCrumbs(pathname);
  if (!crumbs) return null;
  return (
    <nav aria-label="Migas de pan" className="bg-background border-b border-border">
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${SITE}${c.path === "/" ? "/" : c.path}`,
        })),
      })}</script>
      <ol className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        {crumbs.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
            {i === crumbs.length - 1 ? (
              <span aria-current="page" className="text-foreground line-clamp-1">{c.name}</span>
            ) : (
              <Link to={c.path} className="hover:text-gold transition-colors">{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
