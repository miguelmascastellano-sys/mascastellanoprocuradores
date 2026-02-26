import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useContactMessage, useContactMutations, type ContactStatus } from "@/hooks/useContactMessages";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Eye, MessageSquareReply, ShieldAlert, Trash2, ExternalLink } from "lucide-react";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  new: { label: "Nuevo", variant: "default" },
  read: { label: "Leído", variant: "secondary" },
  replied: { label: "Respondido", variant: "outline" },
  spam: { label: "Spam", variant: "destructive" },
};

const AdminContactDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: msg, isLoading } = useContactMessage(id);
  const { updateStatus, updateNotes, deleteMessage } = useContactMutations();
  const { toast } = useToast();
  const [notes, setNotes] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!msg) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Mensaje no encontrado.
        <Link to="/admin/contact" className="block mt-4 text-primary underline">Volver al listado</Link>
      </div>
    );
  }

  const currentNotes = notes ?? msg.admin_notes ?? "";
  const st = statusConfig[msg.status] ?? statusConfig.new;

  const handleStatus = async (status: ContactStatus) => {
    try {
      await updateStatus.mutateAsync({
        id: msg.id,
        status,
        replied_at: status === "replied" ? new Date().toISOString() : undefined,
      });
      toast({ title: "Estado actualizado" });
    } catch {
      toast({ title: "Error al actualizar", variant: "destructive" });
    }
  };

  const handleSaveNotes = async () => {
    try {
      await updateNotes.mutateAsync({ id: msg.id, notes: currentNotes });
      toast({ title: "Notas guardadas" });
    } catch {
      toast({ title: "Error al guardar notas", variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!confirm("¿Seguro que quieres eliminar este mensaje?")) return;
    try {
      await deleteMessage.mutateAsync(msg.id);
      toast({ title: "Mensaje eliminado" });
      window.history.back();
    } catch {
      toast({ title: "Error al eliminar", variant: "destructive" });
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-3xl">
      <Link to="/admin/contact" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Volver al listado
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-serif font-bold text-foreground">{msg.subject || "Sin asunto"}</h1>
        <Badge variant={st.variant}>{st.label}</Badge>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div>
          <span className="text-muted-foreground">Nombre:</span>
          <span className="ml-2 font-medium">{msg.name}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Email:</span>
          <a href={`mailto:${msg.email}`} className="ml-2 font-medium text-primary hover:underline">{msg.email}</a>
        </div>
        {msg.phone && (
          <div>
            <span className="text-muted-foreground">Teléfono:</span>
            <span className="ml-2 font-medium">{msg.phone}</span>
          </div>
        )}
        <div>
          <span className="text-muted-foreground">Fecha:</span>
          <span className="ml-2">{new Date(msg.created_at).toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}</span>
        </div>
        {msg.replied_at && (
          <div>
            <span className="text-muted-foreground">Respondido:</span>
            <span className="ml-2">{new Date(msg.replied_at).toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}</span>
          </div>
        )}
      </div>

      {/* Message */}
      <div className="bg-muted/30 border border-border rounded-lg p-6 mb-6">
        <p className="whitespace-pre-wrap text-foreground">{msg.message}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        {msg.status !== "read" && (
          <Button variant="outline" size="sm" onClick={() => handleStatus("read")}>
            <Eye className="h-4 w-4 mr-1" /> Marcar como leído
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={() => handleStatus("replied")}>
          <MessageSquareReply className="h-4 w-4 mr-1" /> Marcar como respondido
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
        >
          <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Tu consulta")}`}>
            <ExternalLink className="h-4 w-4 mr-1" /> Responder por email
          </a>
        </Button>
        {msg.status !== "spam" && (
          <Button variant="outline" size="sm" onClick={() => handleStatus("spam")} className="text-destructive">
            <ShieldAlert className="h-4 w-4 mr-1" /> Marcar como spam
          </Button>
        )}
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 mr-1" /> Eliminar
        </Button>
      </div>

      {/* Admin notes */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Notas internas</h3>
        <Textarea
          value={currentNotes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Añade notas internas sobre este mensaje..."
          rows={4}
        />
        <Button size="sm" className="mt-2" onClick={handleSaveNotes} disabled={updateNotes.isPending}>
          Guardar notas
        </Button>
      </div>
    </div>
  );
};

export default AdminContactDetail;
