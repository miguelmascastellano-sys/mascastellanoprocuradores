import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 inset-x-0 z-50 p-4"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-card border border-border rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-sm text-muted-foreground flex-1 leading-relaxed">
                Utilizamos cookies propias y de terceros para mejorar su experiencia de navegación y analizar el tráfico del sitio.
                Puede aceptar todas las cookies o rechazarlas. Para más información, consulte nuestra{" "}
                <a href="/politica-cookies" className="text-primary underline hover:text-primary/80">
                  Política de Cookies
                </a>.
              </p>
              <div className="flex gap-3 shrink-0">
                <Button variant="outline" size="sm" onClick={reject}>
                  Rechazar
                </Button>
                <Button size="sm" onClick={accept}>
                  Aceptar
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
