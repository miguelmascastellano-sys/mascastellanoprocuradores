import { Link } from "@/lib/router-compat";

export interface RelatedPage { label: string; path: string }

export default function RelatedPages({ links }: { links: RelatedPage[] }) {
  return (
    <nav aria-label="Páginas relacionadas" className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8">Páginas relacionadas</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {links.map((link) => (
            <li key={link.path} className="bg-background">
              <Link to={link.path} className="block h-full p-6 font-serif text-base font-semibold text-foreground hover:text-gold hover:bg-muted/50 transition-colors">{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}