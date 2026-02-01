-- Gaming Blog - Supabase (PostgreSQL) Schema
-- הרץ ב-Supabase Dashboard: SQL Editor → New query → הדבק והרץ

-- טבלת פרופילים (מקושרת ל-auth.users של Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  username TEXT UNIQUE,
  display_name TEXT,
  role TEXT NOT NULL DEFAULT 'author' CHECK (role IN ('admin', 'editor', 'author')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- עמודים
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- פוסטים
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- אינדקסים
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_published ON public.pages(is_published);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(is_published);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON public.posts(published_at DESC);

-- הגדרות אתר (שורה אחת)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL DEFAULT 'בלוג משחקי מחשב',
  tagline TEXT DEFAULT '',
  logo_url TEXT,
  accent_color TEXT DEFAULT '#00d4aa',
  accent_hover TEXT DEFAULT '#00f0c0',
  ad_code TEXT,
  footer_text TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- שורת ברירת מחדל (אם הטבלה ריקה)
INSERT INTO public.site_settings (site_name)
SELECT 'בלוג משחקי מחשב' WHERE NOT EXISTS (SELECT 1 FROM public.site_settings LIMIT 1);

-- טריגר: יצירת פרופיל אוטומטי אחרי הרשמה
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, display_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    CASE WHEN (SELECT COUNT(*) FROM public.profiles) = 0 THEN 'admin' ELSE 'author' END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- מחיקת policies קיימים (כדי שאפשר להריץ את הסקריפט שוב בלי שגיאה)
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public read published pages" ON public.pages;
DROP POLICY IF EXISTS "Admins and editors manage pages" ON public.pages;
DROP POLICY IF EXISTS "Public read published posts" ON public.posts;
DROP POLICY IF EXISTS "Admins and editors manage posts" ON public.posts;
DROP POLICY IF EXISTS "Authors can insert own posts" ON public.posts;
DROP POLICY IF EXISTS "Authors can update own posts" ON public.posts;

-- profiles: קריאה לעצמך, עדכון לעצמך (בלי policy שמפנה לאותה טבלה – מונע 500)
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- pages: כולם קוראים עמודים מפורסמים
CREATE POLICY "Public read published pages" ON public.pages FOR SELECT USING (is_published = true);
CREATE POLICY "Admins and editors manage pages" ON public.pages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('admin', 'editor'))
);

-- posts: כולם קוראים פוסטים מפורסמים
CREATE POLICY "Public read published posts" ON public.posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admins and editors manage posts" ON public.posts FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('admin', 'editor'))
);
CREATE POLICY "Authors can insert own posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own posts" ON public.posts FOR UPDATE USING (auth.uid() = author_id);

-- site_settings: כולם קוראים, רק אדמין/עורך מעדכנים
DROP POLICY IF EXISTS "Public read site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins manage site settings" ON public.site_settings;
CREATE POLICY "Public read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage site settings" ON public.site_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role IN ('admin', 'editor'))
);

-- אפשרות: להפוך את המשתמש הראשון לאדמין (אם הטריגר לא מספיק)
-- UPDATE public.profiles SET role = 'admin' WHERE user_id = 'YOUR-USER-UUID' LIMIT 1;
