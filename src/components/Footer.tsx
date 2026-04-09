import { Link } from "react-router-dom";
import { Scale, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Logo & description */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Scale className="h-6 w-6 text-white/80" strokeWidth={1.5} />
              <div>
                <span className="text-lg font-serif font-bold text-white">Más Castellano</span>
                <span className="block text-[10px] text-white/40 tracking-[0.25em] uppercase">Procurador</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-light">
              Despacho de procuradores con amplia experiencia en representación procesal, 
              comprometidos con la excelencia y la defensa de los intereses de nuestros clientes.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/60 mb-6">Enlaces</h4>
            <div className="space-y-3">
              {[
                { label: "Inicio", path: "/" },
                { label: "Sobre Nosotros", path: "/sobre-nosotros" },
                { label: "Servicios", path: "/servicios" },
                { label: "Blog", path: "/blog" },
                { label: "Contacto", path: "/contacto" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-sm text-white/40 hover:text-white transition-colors font-light"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/60 mb-6">Contacto</h4>
            <div className="space-y-4 text-sm text-white/40 font-light">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-white/30 shrink-0" />
                <a href="tel:+34644206106" className="hover:text-white transition-colors">+34 644 206 106</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/30 shrink-0" />
                <a href="mailto:migel.mas@icopal.org" className="hover:text-white transition-colors">migel.mas@icopal.org</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/30 tracking-wide">
            © {new Date().getFullYear()} Castellano Procuradores. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-[11px] text-white/30">
            <Link to="/aviso-legal" className="hover:text-white/60 transition-colors">Aviso Legal</Link>
            <Link to="/politica-privacidad" className="hover:text-white/60 transition-colors">Política de Privacidad</Link>
            <Link to="/politica-cookies" className="hover:text-white/60 transition-colors">Política de Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
