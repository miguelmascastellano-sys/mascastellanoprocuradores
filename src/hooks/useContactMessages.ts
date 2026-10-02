import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ContactStatus = "new" | "read" | "replied" | "spam";

export interface ContactMessage {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  admin_notes: string | null;
  ip: string | null;
  user_agent: string | null;
  referrer: string | null;
  page_path: string | null;
  replied_at: string | null;
}

interface UseContactMessagesOptions {
  status?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export function useContactMessages({
  status,
  search,
  page = 1,
  pageSize = 20,
}: UseContactMessagesOptions = {}) {
  return useQuery({
    queryKey: ["contact-messages", status, search, page, pageSize],
    queryFn: async () => {
      let query = supabase
        .from("contact_messages")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (status && status !== "all") {
        query = query.eq("status", status);
      }

      if (search) {
        query = query.or(
          `name.ilike.%${search}%,email.ilike.%${search}%,subject.ilike.%${search}%`
        );
      }

      const { data, error, count } = await query;
      if (error) throw error;
      return { messages: (data ?? []) as ContactMessage[], count: count ?? 0 };
    },
  });
}

export function useContactMessage(id: string | undefined) {
  return useQuery({
    queryKey: ["contact-message", id],
    queryFn: async () => {
      if (!id) throw new Error("No id");
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as ContactMessage;
    },
    enabled: !!id,
  });
}

export function useContactMutations() {
  const qc = useQueryClient();

  const updateStatus = useMutation({
    mutationFn: async ({
      id,
      status,
      replied_at,
    }: {
      id: string;
      status: ContactStatus;
      replied_at?: string;
    }) => {
      const update: { status: ContactStatus; replied_at?: string } = { status };
      if (replied_at) update.replied_at = replied_at;
      const { error } = await supabase
        .from("contact_messages")
        .update(update)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contact-messages"] });
      qc.invalidateQueries({ queryKey: ["contact-message"] });
    },
  });

  const updateNotes = useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: string }) => {
      const { error } = await supabase
        .from("contact_messages")
        .update({ admin_notes: notes })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contact-message"] });
    },
  });

  const deleteMessage = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contact-messages"] });
    },
  });

  return { updateStatus, updateNotes, deleteMessage };
}
