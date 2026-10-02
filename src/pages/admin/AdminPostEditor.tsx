import { useState, useEffect } from "react";
import { useParams, useNavigate } from "@/lib/router-compat";
import { usePostById } from "@/hooks/usePosts";
import { useCreatePost, useUpdatePost, usePublishPost } from "@/hooks/usePostMutations";
import { usePostViewCount } from "@/hooks/usePostStats";
import { renderMarkdown } from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Send, Eye, BarChart3 } from "lucide-react";

const AdminPostEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { data: existing } = usePostById(isNew ? undefined : id);
  const viewCount = usePostViewCount(isNew ? undefined : id);
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const publishPost = usePublishPost();

  const [tab, setTab] = useState<"content" | "seo">("content");
  const [showPreview, setShowPreview] = useState(true);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content_markdown: "",
    cover_image_url: "",
    seo_title: "",
    seo_description: "",
    seo_canonical_url: "",
    seo_robots: "index,follow",
    og_title: "",
    og_description: "",
    og_image_url: "",
    twitter_card: "summary_large_image",
    schema_json_ld: "",
  });

  useEffect(() => {
    if (existing) {
      setForm({
        title: existing.title,
        slug: existing.slug,
        excerpt: existing.excerpt ?? "",
        content_markdown: existing.content_markdown,
        cover_image_url: existing.cover_image_url ?? "",
        seo_title: existing.seo_title ?? "",
        seo_description: existing.seo_description ?? "",
        seo_canonical_url: existing.seo_canonical_url ?? "",
        seo_robots: existing.seo_robots ?? "index,follow",
        og_title: existing.og_title ?? "",
        og_description: existing.og_description ?? "",
        og_image_url: existing.og_image_url ?? "",
        twitter_card: existing.twitter_card ?? "summary_large_image",
        schema_json_ld: existing.schema_json_ld ? JSON.stringify(existing.schema_json_ld, null, 2) : "",
      });
    }
  }, [existing]);

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error("El título es obligatorio"); return; }
    
    const payload = {
      title: form.title,
      content_markdown: form.content_markdown,
      ...(form.slug ? { slug: form.slug } : {}),
      ...(form.excerpt ? { excerpt: form.excerpt } : {}),
      ...(form.cover_image_url ? { cover_image_url: form.cover_image_url } : {}),
      ...(form.seo_title ? { seo_title: form.seo_title } : {}),
      ...(form.seo_description ? { seo_description: form.seo_description } : {}),
      ...(form.seo_canonical_url ? { seo_canonical_url: form.seo_canonical_url } : {}),
      ...(form.seo_robots ? { seo_robots: form.seo_robots } : {}),
      ...(form.og_title ? { og_title: form.og_title } : {}),
      ...(form.og_description ? { og_description: form.og_description } : {}),
      ...(form.og_image_url ? { og_image_url: form.og_image_url } : {}),
      ...(form.twitter_card ? { twitter_card: form.twitter_card } : {}),
      ...(form.schema_json_ld ? { schema_json_ld: JSON.parse(form.schema_json_ld) } : {}),
    };

    try {
      if (isNew) {
        const data = await createPost.mutateAsync(payload);
        toast.success("Post creado");
        navigate(`/admin/posts/${data.id}`, { replace: true });
      } else {
        await updatePost.mutateAsync({ id: id!, ...payload });
        toast.success("Post guardado");
      }
    } catch (err: any) {
      toast.error(err.message || "Error al guardar");
    }
  };

  const handlePublish = async () => {
    if (isNew) { toast.error("Guarda el post primero"); return; }
    try {
      await publishPost.mutateAsync(id!);
      toast.success("Post publicado");
    } catch (err: any) {
      toast.error(err.message || "Error al publicar");
    }
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-foreground">
          {isNew ? "Nuevo Post" : "Editar Post"}
        </h1>
        <div className="flex gap-2">
          {!isNew && viewCount.data !== undefined && (
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground px-3 py-1.5 bg-muted rounded-md">
              <BarChart3 className="h-3.5 w-3.5" />
              {viewCount.data} visitas (30d)
            </span>
          )}
          <Button variant="outline" onClick={handleSave} disabled={createPost.isPending || updatePost.isPending}>
            <Save className="h-4 w-4 mr-2" />{createPost.isPending || updatePost.isPending ? "Guardando..." : "Guardar Draft"}
          </Button>
          <Button onClick={handlePublish} disabled={isNew || publishPost.isPending}>
            <Send className="h-4 w-4 mr-2" />Publicar
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-muted p-1 rounded-md w-fit">
        <button onClick={() => setTab("content")} className={`px-4 py-2 text-sm font-medium rounded transition-colors ${tab === "content" ? "bg-background shadow-xs text-foreground" : "text-muted-foreground"}`}>
          Contenido
        </button>
        <button onClick={() => setTab("seo")} className={`px-4 py-2 text-sm font-medium rounded transition-colors ${tab === "seo" ? "bg-background shadow-xs text-foreground" : "text-muted-foreground"}`}>
          SEO
        </button>
      </div>

      {tab === "content" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Título</Label>
              <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Título del artículo" />
            </div>
            <div>
              <Label>Slug (auto si vacío)</Label>
              <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="mi-articulo" />
            </div>
          </div>
          <div>
            <Label>Extracto</Label>
            <Textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} placeholder="Breve descripción..." />
          </div>
          <div>
            <Label>Imagen de portada (URL)</Label>
            <Input value={form.cover_image_url} onChange={(e) => set("cover_image_url", e.target.value)} placeholder="https://..." />
          </div>

          {/* Markdown Editor with preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Contenido (Markdown)</Label>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <Eye className="h-3.5 w-3.5" />{showPreview ? "Ocultar" : "Mostrar"} preview
              </button>
            </div>
            <div className={showPreview ? "grid grid-cols-2 gap-4" : ""}>
              <Textarea
                value={form.content_markdown}
                onChange={(e) => set("content_markdown", e.target.value)}
                rows={20}
                className="font-mono text-sm"
                placeholder="Escribe en Markdown..."
              />
              {showPreview && (
                <div className="border border-border rounded-md p-4 overflow-auto max-h-[520px] bg-background prose prose-neutral max-w-none text-sm [&_h2]:font-serif [&_h2]:text-foreground [&_h3]:font-serif [&_h3]:text-foreground [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-primary [&_a]:underline">
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(form.content_markdown) }} />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 max-w-2xl">
          <div>
            <Label>SEO Title</Label>
            <Input value={form.seo_title} onChange={(e) => set("seo_title", e.target.value)} placeholder="Título para buscadores" />
            <p className="text-xs text-muted-foreground mt-1">{(form.seo_title || form.title).length}/60 caracteres</p>
          </div>
          <div>
            <Label>SEO Description</Label>
            <Textarea value={form.seo_description} onChange={(e) => set("seo_description", e.target.value)} rows={2} placeholder="Descripción para buscadores" />
            <p className="text-xs text-muted-foreground mt-1">{(form.seo_description || form.excerpt).length}/160 caracteres</p>
          </div>
          <div>
            <Label>Canonical URL</Label>
            <Input value={form.seo_canonical_url} onChange={(e) => set("seo_canonical_url", e.target.value)} placeholder="/blog/mi-articulo" />
          </div>
          <div>
            <Label>Robots</Label>
            <Input value={form.seo_robots} onChange={(e) => set("seo_robots", e.target.value)} placeholder="index,follow" />
          </div>
          <hr className="border-border" />
          <h3 className="text-sm font-semibold text-foreground">Open Graph</h3>
          <div>
            <Label>OG Title</Label>
            <Input value={form.og_title} onChange={(e) => set("og_title", e.target.value)} placeholder="Título para redes sociales" />
          </div>
          <div>
            <Label>OG Description</Label>
            <Textarea value={form.og_description} onChange={(e) => set("og_description", e.target.value)} rows={2} placeholder="Descripción para redes sociales" />
          </div>
          <div>
            <Label>OG Image URL</Label>
            <Input value={form.og_image_url} onChange={(e) => set("og_image_url", e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <Label>Twitter Card</Label>
            <Input value={form.twitter_card} onChange={(e) => set("twitter_card", e.target.value)} placeholder="summary_large_image" />
          </div>
          <hr className="border-border" />
          <div>
            <Label>JSON-LD Override (JSON)</Label>
            <Textarea value={form.schema_json_ld} onChange={(e) => set("schema_json_ld", e.target.value)} rows={6} className="font-mono text-sm" placeholder='{"@context": "https://schema.org", ...}' />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPostEditor;
