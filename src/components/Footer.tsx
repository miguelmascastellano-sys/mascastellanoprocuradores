import { Link } from "@/lib/router-compat";
import { Scale, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & description */}
          <div>
            <Link to="/" className="flex flex-col leading-none mb-6" aria-label="Más Castellano Procurador — Miguel Mas Castellano, inicio">
              <span className="font-serif text-[22px] sm:text-[26px] font-semibold tracking-tight text-white">
                Miguel Más Castellano
              </span>
              <span className="mt-1 text-[10px] sm:text-[11px] tracking-[0.42em] uppercase text-gold font-medium">
                Procurador
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed font-light">
              Más Castellano Procurador, despacho de Miguel Mas Castellano: su socio estratégico para la procura en toda España.
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

          {/* Áreas de actuación */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/60 mb-6">Presencia Judicial</h4>
            <div className="space-y-3">
              {[
                { label: "Procurador en Alicante", path: "/procurador-alicante" },
                { label: "Desahucios en Alicante", path: "/desahucios-alicante" },
                { label: "Subastas Judiciales Alicante", path: "/subastas-judiciales-alicante" },
                { label: "Ejecuciones Judiciales Alicante", path: "/ejecuciones-judiciales-alicante" },
                { label: "Procurador Ejecuciones Judiciales", path: "/procurador-ejecuciones-judiciales" },
                { label: "Procurador Derecho Bancario", path: "/procurador-derecho-bancario" },
                { label: "Ley de Segunda Oportunidad", path: "/procurador-ley-segunda-oportunidad" },
                { label: "Procurador en Benidorm", path: "/procurador-benidorm" },
                { label: "Procurador en Dénia", path: "/procurador-denia" },
                { label: "Procurador en Gandía", path: "/procurador-gandia" },
                { label: "Cobertura Nacional España", path: "/procurador-nacional-espana" },
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
                <a href="mailto:miguel.mas@icopal.org" className="hover:text-white transition-colors">miguel.mas@icopal.org</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/30 tracking-wide">
            © {new Date().getFullYear()} Más Castellano Procurador. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-[11px] text-white/30">
            <Link to="/aviso-legal" className="hover:text-white/60 transition-colors">Aviso Legal</Link>
            <Link to="/politica-privacidad" className="hover:text-white/60 transition-colors">Política de Privacidad</Link>
            <Link to="/politica-cookies" className="hover:text-white/60 transition-colors">Política de Cookies</Link>
            <a href="/sitemap.xml" className="hover:text-white/60 transition-colors" target="_blank" rel="noopener noreferrer">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
