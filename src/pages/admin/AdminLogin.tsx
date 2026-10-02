import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "@/lib/router-compat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const { user, isAdmin, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div>;
  if (user && isAdmin) return <Navigate to="/admin/posts" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      toast.error("Credenciales incorrectas");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Scale className="h-10 w-10 mx-auto text-foreground mb-4" strokeWidth={1.5} />
          <h1 className="text-2xl font-serif font-bold text-foreground">Panel de Administración</h1>
          <p className="text-sm text-muted-foreground mt-2">Inicia sesión para gestionar el blog</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Entrando..." : "Iniciar Sesión"}
          </Button>
        </form>
        {user && !isAdmin && (
          <p className="text-sm text-destructive text-center mt-4">No tienes permisos de administrador.</p>
        )}
      </div>
    </main>
  );
};

export default AdminLogin;
