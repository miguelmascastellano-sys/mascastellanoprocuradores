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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
