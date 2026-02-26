
-- 1. Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. Helper: check if user is admin or editor
CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'editor')
  )
$$;

-- 5. RLS on user_roles
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- 6. Posts table
CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content_markdown text NOT NULL DEFAULT '',
  cover_image_url text,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  -- SEO fields
  seo_title text,
  seo_description text,
  seo_canonical_url text,
  seo_robots text DEFAULT 'index,follow',
  og_title text,
  og_description text,
  og_image_url text,
  twitter_card text DEFAULT 'summary_large_image',
  schema_json_ld jsonb
);
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Validation trigger for status
CREATE OR REPLACE FUNCTION public.validate_post_status()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.status NOT IN ('draft', 'published', 'archived') THEN
    RAISE EXCEPTION 'Invalid post status: %', NEW.status;
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_post_status
  BEFORE INSERT OR UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.validate_post_status();

-- 7. Posts RLS policies
CREATE POLICY "Public can read published posts" ON public.posts
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admin/editor full access" ON public.posts
  FOR ALL TO authenticated
  USING (public.is_admin_or_editor(auth.uid()))
  WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- 8. Post views table
CREATE TABLE public.post_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  viewed_at timestamptz NOT NULL DEFAULT now(),
  session_id text,
  referrer text,
  path text,
  user_agent text
);
ALTER TABLE public.post_views ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX idx_post_views_post_viewed ON public.post_views(post_id, viewed_at);
CREATE INDEX idx_post_views_viewed ON public.post_views(viewed_at);
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_posts_status ON public.posts(status);

-- 9. Post views RLS
CREATE POLICY "Anyone can insert views" ON public.post_views
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin/editor can read views" ON public.post_views
  FOR SELECT TO authenticated
  USING (public.is_admin_or_editor(auth.uid()));

-- 10. Seed data
INSERT INTO public.posts (title, slug, excerpt, content_markdown, status, published_at, seo_description) VALUES
(
  '¿Qué es un procurador y cuándo lo necesitas?',
  'que-es-un-procurador-y-cuando-lo-necesitas',
  'El procurador de los tribunales es una figura clave en cualquier procedimiento judicial. Descubre en qué casos es obligatorio y cómo puede beneficiarte contar con uno.',
  E'El procurador de los tribunales es el profesional del Derecho que ostenta la representación técnica de las partes ante los Juzgados y Tribunales. Su intervención es obligatoria en la inmensa mayoría de los procedimientos judiciales en España, tal y como establece la Ley de Enjuiciamiento Civil.\n\nA diferencia del abogado, cuya función es la defensa y el asesoramiento jurídico, el procurador se encarga de la representación procesal: recibe las notificaciones judiciales, presenta escritos y documentos, controla los plazos y asegura que el procedimiento avance con la regularidad debida.\n\nLa intervención del procurador es preceptiva en procedimientos civiles cuya cuantía supere los 2.000 euros, en todos los procedimientos penales (salvo faltas), en la jurisdicción contencioso-administrativa y en la social cuando así lo requiera la ley.\n\nContar con un procurador experimentado aporta seguridad jurídica al procedimiento. El control riguroso de los plazos procesales evita situaciones de indefensión o preclusión que podrían comprometer el resultado del litigio.\n\nAdemás, el procurador actúa como enlace permanente entre el órgano judicial y el abogado director, trasladando sin demora las resoluciones y cualquier incidencia procesal.',
  'published',
  now(),
  'Descubre qué es un procurador de los tribunales, cuándo es obligatorio y cómo puede ayudarte en tu procedimiento judicial.'
),
(
  'Plazos procesales: por qué su control es decisivo',
  'plazos-procesales-importancia-control',
  'El incumplimiento de un plazo procesal puede suponer la pérdida del derecho a recurrir o la declaración de caducidad.',
  E'En el ámbito judicial, los plazos procesales son períodos de tiempo legalmente establecidos dentro de los cuales las partes deben realizar determinadas actuaciones.\n\nLa Ley de Enjuiciamiento Civil distingue entre plazos prorrogables e improrrogables. Estos últimos son especialmente críticos: una vez transcurridos, se produce la preclusión.\n\nEl procurador, como receptor de las notificaciones judiciales, es el primer eslabón en la cadena de control de plazos.\n\nUn sistema eficaz de control de plazos incluye la identificación de cada resolución notificada, el cálculo del plazo aplicable según el tipo de actuación, el registro en agenda con alertas anticipadas.\n\nEn nuestro despacho, cada expediente cuenta con un seguimiento individualizado que garantiza que ningún plazo quede desatendido.',
  'published',
  now(),
  'Conoce la importancia del control de plazos procesales y cómo un procurador profesional garantiza el cumplimiento.'
),
(
  'LexNET: todo sobre las notificaciones electrónicas judiciales',
  'lexnet-notificaciones-electronicas-judiciales',
  'LexNET es el sistema oficial de comunicaciones judiciales telemáticas en España.',
  E'LexNET es la plataforma de intercambio seguro de información entre los órganos judiciales y los profesionales de la justicia.\n\nEl sistema permite recibir notificaciones, presentar escritos y demandas, adjuntar documentos y consultar el estado de los procedimientos.\n\nPara el procurador, LexNET es una herramienta de trabajo diaria.\n\nEsta particularidad hace imprescindible una revisión constante del buzón de LexNET.\n\nEn nuestro despacho, la gestión de LexNET se realiza de forma sistemática.',
  'published',
  now(),
  'Guía completa sobre LexNET, el sistema de notificaciones electrónicas judiciales.'
),
(
  'Diferencias entre abogado y procurador: funciones y competencias',
  'diferencias-abogado-procurador',
  'Aunque ambos son profesionales del Derecho, abogado y procurador desempeñan funciones distintas y complementarias.',
  E'Una de las dudas más habituales entre quienes se enfrentan por primera vez a un procedimiento judicial es la diferencia entre abogado y procurador.\n\nEl abogado es el profesional encargado de la defensa jurídica: estudia el caso, diseña la estrategia procesal, redacta los escritos.\n\nEl procurador ostenta la representación procesal de la parte ante el órgano judicial.\n\nEsta división de funciones responde a una lógica de eficiencia y seguridad jurídica.\n\nLa coordinación entre ambos profesionales es esencial para el buen resultado del procedimiento.',
  'published',
  now(),
  'Conoce las diferencias entre abogado y procurador: funciones, competencias y cómo se complementan.'
),
(
  'Cómo elegir un procurador de confianza',
  'como-elegir-procurador-de-confianza',
  'Elegir un buen procurador es fundamental para que tu procedimiento judicial transcurra sin incidencias.',
  E'La elección del procurador es una decisión que puede influir significativamente en el desarrollo de un procedimiento judicial.\n\nEl primer criterio a valorar es la experiencia y especialización.\n\nLa comunicación es otro factor determinante.\n\nLa capacidad de gestión también es relevante.\n\nFinalmente, la disponibilidad y la cercanía son valores que no deben subestimarse.',
  'published',
  now(),
  'Guía práctica para elegir un procurador de confianza.'
),
(
  'Borrador: Nuevo artículo sobre costas procesales',
  'borrador-costas-procesales',
  'Este es un artículo en borrador sobre costas procesales.',
  E'Las costas procesales son los gastos derivados de un procedimiento judicial.\n\nEste artículo está en fase de redacción.',
  'draft',
  NULL,
  'Artículo sobre costas procesales (borrador).'
);
