import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import SobreNosotros from "./pages/SobreNosotros";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";
import PoliticaCookies from "./pages/PoliticaCookies";
import AvisoLegal from "./pages/AvisoLegal";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ProcuradorDenia from "./pages/ProcuradorDenia";
import ProcuradorGandia from "./pages/ProcuradorGandia";
import ProcuradorBenidorm from "./pages/ProcuradorBenidorm";
import ProcuradorAlicante from "./pages/ProcuradorAlicante";
import ProcuradorNacionalEspana from "./pages/ProcuradorNacionalEspana";

import CookieBanner from "./components/CookieBanner";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminPostEditor from "./pages/admin/AdminPostEditor";
import AdminStats from "./pages/admin/AdminStats";
import AdminContact from "./pages/admin/AdminContact";
import AdminContactDetail from "./pages/admin/AdminContactDetail";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CookieBanner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/sobre-nosotros" element={<SobreNosotros />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/procurador-denia" element={<ProcuradorDenia />} />
              <Route path="/procurador-gandia" element={<ProcuradorGandia />} />
              <Route path="/procurador-benidorm" element={<ProcuradorBenidorm />} />
              <Route path="/procurador-alicante" element={<ProcuradorAlicante />} />
              <Route path="/procurador-nacional-espana" element={<ProcuradorNacionalEspana />} />
              <Route path="/procurador-nacional" element={<Navigate to="/procurador-nacional-espana" replace />} />
              <Route path="/politica-cookies" element={<PoliticaCookies />} />
              <Route path="/aviso-legal" element={<AvisoLegal />} />
              <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
            </Route>
            {/* Admin routes (no Layout wrapper) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminPosts />} />
              <Route path="posts" element={<AdminPosts />} />
              <Route path="posts/new" element={<AdminPostEditor />} />
              <Route path="posts/:id" element={<AdminPostEditor />} />
              <Route path="contact" element={<AdminContact />} />
              <Route path="contact/:id" element={<AdminContactDetail />} />
              <Route path="stats" element={<AdminStats />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
