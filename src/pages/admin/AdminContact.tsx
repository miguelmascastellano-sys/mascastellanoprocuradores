import { useState } from "react";
import { Link } from "react-router-dom";
import { useContactMessages } from "@/hooks/useContactMessages";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Mail, ChevronLeft, ChevronRight } from "lucide-react";

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  new: { label: "Nuevo", variant: "default" },
  read: { label: "Leído", variant: "secondary" },
  replied: { label: "Respondido", variant: "outline" },
  spam: { label: "Spam", variant: "destructive" },
};

const statusFilters = [
  { value: "all", label: "Todos" },
  { value: "new", label: "Nuevos" },
  { value: "read", label: "Leídos" },
  { value: "replied", label: "Respondidos" },
  { value: "spam", label: "Spam" },
];

const AdminContact = () => {
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading } = useContactMessages({ status, search, page, pageSize });
  const messages = data?.messages ?? [];
  const total = data?.count ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground flex items-center gap-3">
            <Mail className="h-6 w-6" /> Mensajes de Contacto
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{total} mensaje{total !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {statusFilters.map((f) => (
            <Button
              key={f.value}
              variant={status === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => { setStatus(f.value); setPage(1); }}
            >
              {f.label}
            </Button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, email o asunto..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No se encontraron mensajes.</div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="px-4 py-3 font-medium">Fecha</th>
                  <th className="px-4 py-3 font-medium">Nombre</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Asunto</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => {
                  const st = statusLabels[msg.status] ?? statusLabels.new;
                  return (
                    <tr
                      key={msg.id}
                      className={`border-t border-border hover:bg-muted/30 transition-colors cursor-pointer ${msg.status === "new" ? "font-semibold" : ""}`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Link to={`/admin/contact/${msg.id}`} className="block">
                          {new Date(msg.created_at).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/admin/contact/${msg.id}`} className="block">{msg.name}</Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/admin/contact/${msg.id}`} className="block text-muted-foreground">{msg.email}</Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/admin/contact/${msg.id}`} className="block">{msg.subject || "—"}</Link>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={st.variant}>{st.label}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-muted-foreground">Página {page} de {totalPages}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContact;
