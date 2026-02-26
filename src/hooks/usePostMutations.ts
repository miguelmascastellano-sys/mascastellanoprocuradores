import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Post } from "./usePosts";

function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let suffix = 1;
  while (true) {
    let query = supabase.from("posts").select("id").eq("slug", slug);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query;
    if (!data || data.length === 0) return slug;
    suffix++;
    slug = `${baseSlug}-${suffix}`;
  }
}

type PostInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  content_markdown: string;
  cover_image_url?: string;
  status?: string;
  seo_title?: string;
  seo_description?: string;
  seo_canonical_url?: string;
  seo_robots?: string;
  og_title?: string;
  og_description?: string;
  og_image_url?: string;
  twitter_card?: string;
  schema_json_ld?: unknown;
};

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: PostInput) => {
      const baseSlug = input.slug || slugify(input.title);
      const slug = await ensureUniqueSlug(baseSlug);
      const { data, error } = await supabase
        .from("posts")
        .insert({ ...input, slug } as any)
        .select()
        .single();
      if (error) throw error;
      return data as Post;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: PostInput & { id: string }) => {
      let slug = input.slug;
      if (slug) {
        slug = await ensureUniqueSlug(slug, id);
      }
      const updateData = slug ? { ...input, slug } : input;
      const { data, error } = await supabase
        .from("posts")
        .update(updateData as any)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as Post;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}

export function usePublishPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("posts")
        .update({ status: "published", published_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}

export function useArchivePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("posts")
        .update({ status: "archived" })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}
