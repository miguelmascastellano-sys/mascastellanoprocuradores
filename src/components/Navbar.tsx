import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const AbstractLogo = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Columna izquierda */}
    <rect x="6" y="8" width="3.5" height="20" rx="1" fill="currentColor" opacity="0.9" />
    {/* Columna derecha */}
    <rect x="26.5" y="8" width="3.5" height="20" rx="1" fill="currentColor" opacity="0.9" />
    {/* Dintel superior */}
    <rect x="4" y="5" width="28" height="3.5" rx="1" fill="currentColor" />
    {/* Base */}
    <rect x="2" y="28" width="32" height="3" rx="1" fill="currentColor" opacity="0.7" />
    {/* Rombo central — símbolo de equilibrio */}
    <path
      d="M18 12 L23 18 L18 24 L13 18 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      opacity="0.6"
    />
  </svg>
);

const navItems = [
  { label: "El Despacho", path: "/sobre-nosotros" },
  { label: "Servicios", path: "/servicios" },
  { label: "Blog", path: "/blog" },
  { label: "Contacto", path: "/contacto" },
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
          <Link to="/" className="flex items-center gap-3 group">
            <AbstractLogo className="h-9 w-9 text-foreground transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-wide text-foreground leading-tight">
                Más Castellano
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
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
