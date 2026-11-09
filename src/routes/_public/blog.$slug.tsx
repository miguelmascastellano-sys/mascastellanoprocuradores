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
  head: ({ params, loaderData: post }) => {
    if (!post) return {};
    const baseTitle = (post.seo_title ?? post.title).replace(/\s*\|\s*M[aá]s Castellano.*$/i, "");
    const branded = `${baseTitle} | Más Castellano`;
    const title = branded.length <= 60 ? branded : baseTitle;
    const description = post.seo_description ?? post.excerpt ?? "";
    const url = `https://mascastellanoprocuradores.com/blog/${params.slug}`;
    const image = post.cover_image_url?.startsWith("https://") ? post.cover_image_url : undefined;
    return {
      meta: [
        { title }, { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: post.og_description ?? description },
        { property: "og:url", content: url }, { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: post.og_description ?? description },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: BlogPost,
});
