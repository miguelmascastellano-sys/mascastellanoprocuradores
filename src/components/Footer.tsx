import { Link } from "react-router-dom";
import { Scale, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-7 w-7 text-primary" />
              <div>
              <span className="text-lg font-serif font-bold text-foreground">Mas Castellano</span>
                <span className="block text-xs text-primary tracking-[0.2em] uppercase">Procurador</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Despacho de procuradores con amplia experiencia en representación procesal, 
              comprometidos con la excelencia y la defensa de los intereses de nuestros clientes.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-lg text-primary mb-4">Enlaces</h4>
            <div className="space-y-2">
              {[
                { label: "Inicio", path: "/" },
                { label: "Sobre Nosotros", path: "/sobre-nosotros" },
                { label: "Servicios", path: "/servicios" },
                { label: "Contacto", path: "/contacto" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-primary mb-4">Contacto</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>Calle Principal 123, Madrid, España</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+34 912 345 678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>info@castellanoprocuradores.es</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Castellano Procuradores. Todos los derechos reservados. | Aviso Legal | Política de Privacidad
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
