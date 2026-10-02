import { Link } from "@/lib/router-compat";
import { useAllPosts } from "@/hooks/usePosts";
import { usePublishPost, useArchivePost } from "@/hooks/usePostMutations";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Eye, Archive, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  draft: "bg-yellow-100 text-yellow-800",
  published: "bg-green-100 text-green-800",
  archived: "bg-muted text-muted-foreground",
};

const AdminPosts = () => {
  const { data: posts, isLoading } = useAllPosts();
  const publishPost = usePublishPost();
  const archivePost = useArchivePost();
  const [filter, setFilter] = useState<string>("all");

  const filtered = posts?.filter((p) => filter === "all" || p.status === filter) ?? [];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Posts</h1>
          <p className="text-sm text-muted-foreground mt-1">{posts?.length ?? 0} artículos en total</p>
        </div>
        <Button asChild><Link to="/admin/posts/new"><Plus className="h-4 w-4 mr-2" />Nuevo Post</Link></Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["all", "draft", "published", "archived"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              filter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {s === "all" ? "Todos" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />)}
        </div>
      ) : (
        <div className="bg-background border border-border rounded-lg overflow-hidden">
          {filtered.map((post) => (
            <div key={post.id} className="flex items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">{post.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {post.published_at ? new Date(post.published_at).toLocaleDateString("es-ES") : "Sin publicar"} · /{post.slug}
                </p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${statusColors[post.status]}`}>
                {post.status}
              </span>
              <div className="flex gap-1.5 shrink-0">
                <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                  <Link to={`/admin/posts/${post.id}`}><Edit className="h-3.5 w-3.5" /></Link>
                </Button>
                {post.status === "published" && (
                  <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                    <Link to={`/blog/${post.slug}`} target="_blank"><Eye className="h-3.5 w-3.5" /></Link>
                  </Button>
                )}
                {post.status === "draft" && (
                  <Button
                    variant="ghost" size="icon" className="h-8 w-8 text-green-600"
                    onClick={() => publishPost.mutate(post.id, { onSuccess: () => toast.success("Post publicado") })}
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                )}
                {post.status === "published" && (
                  <Button
                    variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"
                    onClick={() => archivePost.mutate(post.id, { onSuccess: () => toast.success("Post archivado") })}
                  >
                    <Archive className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No hay posts con este filtro.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPosts;
