
-- Fix WARN 1: Set search_path on validate_post_status
CREATE OR REPLACE FUNCTION public.validate_post_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF NEW.status NOT IN ('draft', 'published', 'archived') THEN
    RAISE EXCEPTION 'Invalid post status: %', NEW.status;
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

-- Fix WARN 2: Restrict post_views insert to only published posts
DROP POLICY "Anyone can insert views" ON public.post_views;
CREATE POLICY "Anyone can insert views for published posts" ON public.post_views
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.posts
      WHERE posts.id = post_id AND posts.status = 'published'
    )
  );
