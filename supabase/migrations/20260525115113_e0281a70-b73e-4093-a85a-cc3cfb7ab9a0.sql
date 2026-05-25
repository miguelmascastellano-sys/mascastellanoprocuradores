
-- 1) Split user_roles ALL policy into explicit per-command policies
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

CREATE POLICY "Admins can insert roles"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update roles"
ON public.user_roles FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete roles"
ON public.user_roles FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 2) Replace permissive insert on post_views with a SECURITY DEFINER RPC
DROP POLICY IF EXISTS "Anyone can insert views for published posts" ON public.post_views;

CREATE OR REPLACE FUNCTION public.record_post_view(
  _post_id uuid,
  _session_id text DEFAULT NULL,
  _path text DEFAULT NULL,
  _referrer text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ua text;
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.posts
    WHERE id = _post_id AND status = 'published'
  ) THEN
    RETURN;
  END IF;

  v_ua := current_setting('request.headers', true)::json->>'user-agent';

  INSERT INTO public.post_views (post_id, session_id, path, referrer, user_agent)
  VALUES (
    _post_id,
    NULLIF(left(coalesce(_session_id, ''), 100), ''),
    NULLIF(left(coalesce(_path, ''), 500), ''),
    NULLIF(left(coalesce(_referrer, ''), 500), ''),
    NULLIF(left(coalesce(v_ua, ''), 500), '')
  );
END;
$$;

REVOKE ALL ON FUNCTION public.record_post_view(uuid, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.record_post_view(uuid, text, text, text) TO anon, authenticated;

-- 3) Tighten contact_messages public insert policy with length validation
DROP POLICY IF EXISTS "Public can insert contact messages" ON public.contact_messages;

CREATE POLICY "Public can insert contact messages"
ON public.contact_messages FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 2 AND 100
  AND char_length(email) BETWEEN 5 AND 255
  AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(message) BETWEEN 10 AND 5000
  AND (subject IS NULL OR char_length(subject) <= 200)
  AND (phone IS NULL OR char_length(phone) <= 30)
  AND status = 'new'
);

-- 4) Lock down execute on internal RLS helper functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_admin_or_editor(uuid) FROM PUBLIC, anon, authenticated;
