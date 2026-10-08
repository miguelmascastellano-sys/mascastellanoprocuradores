import { Outlet } from "@/lib/router-compat";
import Navbar from "./Navbar";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import MobileCallButton from "./MobileCallButton";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <Breadcrumbs />
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileCallButton />
    </div>
  );
};

export default Layout;
