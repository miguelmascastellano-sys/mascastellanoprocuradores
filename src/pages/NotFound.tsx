import { Link, useLocation } from "@/lib/router-compat";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: ruta inexistente:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Página no encontrada | Mas Castellano Procurador</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="La página solicitada no existe." />
      </Helmet>
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="mb-4 font-serif text-4xl font-bold text-foreground">404</h1>
          <p className="mb-6 text-lg text-muted-foreground">
            La página que busca no existe o ha sido trasladada.
          </p>
          <Link to="/" className="text-primary underline hover:text-primary/90">
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
