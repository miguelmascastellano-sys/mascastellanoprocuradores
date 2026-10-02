import { createMiddleware } from "@tanstack/react-start";

/**
 * Function middleware that forwards the current Supabase session's access
 * token to server functions as an Authorization header, mirroring how
 * supabase.functions.invoke used to attach it automatically.
 */
export const attachSupabaseAuth = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    let token: string | undefined;
    if (typeof window !== "undefined") {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase.auth.getSession();
      token = data.session?.access_token;
    }
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
);
