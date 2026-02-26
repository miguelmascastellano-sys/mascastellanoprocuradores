import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function usePostViewsStats(days: number = 30) {
  return useQuery({
    queryKey: ["stats", "views", days],
    queryFn: async () => {
      const since = new Date();
      since.setDate(since.getDate() - days);
      
      const { data, error } = await supabase
        .from("post_views")
        .select("viewed_at, post_id")
        .gte("viewed_at", since.toISOString());
      if (error) throw error;
      return data;
    },
  });
}

export function useTopPosts(days: number = 30) {
  return useQuery({
    queryKey: ["stats", "top-posts", days],
    queryFn: async () => {
      const since = new Date();
      since.setDate(since.getDate() - days);
      
      // Get views with post info
      const { data: views, error: viewsError } = await supabase
        .from("post_views")
        .select("post_id")
        .gte("viewed_at", since.toISOString());
      if (viewsError) throw viewsError;

      // Count by post_id
      const counts: Record<string, number> = {};
      views?.forEach((v) => {
        counts[v.post_id] = (counts[v.post_id] || 0) + 1;
      });

      // Get post titles
      const postIds = Object.keys(counts);
      if (postIds.length === 0) return [];

      const { data: posts, error: postsError } = await supabase
        .from("posts")
        .select("id, title, slug")
        .in("id", postIds);
      if (postsError) throw postsError;

      return posts
        ?.map((p) => ({ ...p, views: counts[p.id] || 0 }))
        .sort((a, b) => b.views - a.views) ?? [];
    },
  });
}

export function usePostViewCount(postId: string | undefined, days: number = 30) {
  return useQuery({
    queryKey: ["stats", "post-views", postId, days],
    queryFn: async () => {
      if (!postId) return 0;
      const since = new Date();
      since.setDate(since.getDate() - days);
      const { count, error } = await supabase
        .from("post_views")
        .select("id", { count: "exact", head: true })
        .eq("post_id", postId)
        .gte("viewed_at", since.toISOString());
      if (error) throw error;
      return count ?? 0;
    },
    enabled: !!postId,
  });
}

export function trackView(postId: string, slug: string) {
  const sessionId = getOrCreateSessionId();
  return supabase.from("post_views").insert({
    post_id: postId,
    session_id: sessionId,
    referrer: document.referrer || null,
    path: `/blog/${slug}`,
    user_agent: navigator.userAgent,
  });
}

function getOrCreateSessionId(): string {
  const key = "blog_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}
