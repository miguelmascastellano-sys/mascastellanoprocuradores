import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import { supabase } from "@/integrations/supabase/client";
import type { Post } from "@/hooks/usePosts";

export const Route = createFileRoute("/_public/blog/$slug")({
  loader: async ({ params, context }) => {
    const post = await context.queryClient.ensureQueryData({
      queryKey: ["posts", "slug", params.slug],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", params.slug)
          .eq("status", "published")
          .maybeSingle();
        if (error) throw error;
        return data as Post | null;
      },
    });
    if (!post) throw notFound();
    return post;
  },
  component: BlogPost,
});
