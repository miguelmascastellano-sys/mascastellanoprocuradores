import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Scale, FileText, BarChart3, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

  const navItems = [
    { label: "Posts", path: "/admin/posts", icon: FileText },
    { label: "Estadísticas", path: "/admin/stats", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r border-border flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <Link to="/admin/posts" className="flex items-center gap-3">
            <Scale className="h-6 w-6 text-foreground" strokeWidth={1.5} />
            <div>
              <span className="text-sm font-serif font-bold text-foreground">Admin</span>
              <span className="block text-[10px] text-muted-foreground">Mas Castellano</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                location.pathname.startsWith(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 space-y-2 border-t border-border">
          <Button asChild variant="outline" size="sm" className="w-full justify-start gap-2">
            <Link to="/admin/posts/new"><Plus className="h-4 w-4" />Nuevo Post</Link>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground" onClick={signOut}>
            <LogOut className="h-4 w-4" />Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
