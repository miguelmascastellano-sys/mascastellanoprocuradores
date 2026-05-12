import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Scale, ChevronDown } from "lucide-react";

const navItems = [
  { label: "El Despacho", path: "/sobre-nosotros" },
  { label: "Servicios", path: "/servicios" },
  { label: "Blog", path: "/blog" },
  { label: "Contacto", path: "/contacto" },
];

const zonas = [
  { label: "Dénia · Marina Alta", path: "/procurador-denia" },
  { label: "Gandía · La Safor", path: "/procurador-gandia" },
  { label: "Benidorm · Marina Baixa", path: "/procurador-benidorm" },
  { label: "Alicante · Capital", path: "/procurador-alicante" },
  { label: "Servicio Nacional · España", path: "/procurador-nacional" },
  { label: "Cobertura Nacional · España", path: "/procurador-nacional-espana" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showSolid = scrolled || !isHome;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <Scale className="h-7 w-7 text-foreground" strokeWidth={1.5} />
            <div>
              <span className="text-xl font-serif font-bold tracking-wide text-foreground">
                Más Castellano
              </span>
              <span className="block text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                Procurador
              </span>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[11px] font-medium tracking-[0.2em] uppercase transition-colors ${
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors ${
                  zonas.some((z) => z.path === location.pathname)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Zonas de Actuación <ChevronDown className="h-3 w-3" />
              </button>
              <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-background border border-border min-w-[240px] py-2 shadow-lg">
                  {zonas.map((z) => (
                    <Link
                      key={z.path}
                      to={z.path}
                      className={`block px-5 py-3 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors ${
                        location.pathname === z.path
                          ? "text-foreground bg-muted/40"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      }`}
                    >
                      {z.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menú"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-border/20 bg-background/98 backdrop-blur-md -mx-4 px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors ${
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-border/30">
              <p className="px-0 py-2 text-[10px] tracking-[0.3em] uppercase text-gold">Zonas de Actuación</p>
              {zonas.map((z) => (
                <Link
                  key={z.path}
                  to={z.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors ${
                    location.pathname === z.path
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {z.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
