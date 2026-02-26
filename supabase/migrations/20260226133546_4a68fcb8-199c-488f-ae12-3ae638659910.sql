
-- Table: contact_messages
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  admin_notes text,
  ip text,
  user_agent text,
  referrer text,
  page_path text,
  replied_at timestamptz
);

-- Indexes
CREATE INDEX idx_contact_messages_status_created ON public.contact_messages (status, created_at DESC);
CREATE INDEX idx_contact_messages_email ON public.contact_messages (lower(email));

-- Validation trigger for status
CREATE OR REPLACE FUNCTION public.validate_contact_status()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  IF NEW.status NOT IN ('new', 'read', 'replied', 'spam') THEN
    RAISE EXCEPTION 'Invalid contact status: %', NEW.status;
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_contact_status
  BEFORE INSERT OR UPDATE ON public.contact_messages
  FOR EACH ROW EXECUTE FUNCTION public.validate_contact_status();

-- RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public can insert (limited columns enforced by edge function)
CREATE POLICY "Public can insert contact messages"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admin/editor can read all
CREATE POLICY "Admin/editor can read contact messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (public.is_admin_or_editor(auth.uid()));

-- Admin/editor can update
CREATE POLICY "Admin/editor can update contact messages"
  ON public.contact_messages
  FOR UPDATE
  TO authenticated
  USING (public.is_admin_or_editor(auth.uid()))
  WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- Admin/editor can delete
CREATE POLICY "Admin/editor can delete contact messages"
  ON public.contact_messages
  FOR DELETE
  TO authenticated
  USING (public.is_admin_or_editor(auth.uid()));
