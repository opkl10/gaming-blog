# פריסה: GitHub → Netlify + Supabase

מדריך לחיבור הבלוג ל־GitHub, פריסה ב־Netlify וחיבור ל־Supabase (מסד נתונים + התחברות).

---

## סקירה

- **Netlify** – מארח את האתר (גרסת Astro ב־`netlify-app/`).
- **Supabase** – מסד נתונים (PostgreSQL) והתחברות (Auth).
- **GitHub** – המקור: דחיפה ל־repo מפעילה בנייה ופריסה אוטומטית ב־Netlify.

---

## 1. Supabase – יצירת פרויקט ומסד נתונים

1. היכנס ל־[supabase.com](https://supabase.com) וצור חשבון.
2. **New Project** – בחר ארגון, שם פרויקט, סיסמת DB (שמור אותה).
3. חכה לסיום יצירת הפרויקט.
4. **SQL Editor** → **New query** – הדבק את כל התוכן של הקובץ:
   ```
   gaming-blog/supabase/schema.sql
   ```
   והרץ (**Run**).
5. **Settings** → **API** – העתק:
   - **Project URL** (למשל `https://xxxx.supabase.co`)
   - **anon public** key (תחת Project API keys).

המשתמש הראשון שנרשם באתר יקבל אוטומטית תפקיד **admin** (בזכות הטריגר ב־schema).

---

## 2. GitHub – העלאת הקוד

1. צור repo חדש ב־GitHub (למשל `gaming-blog`).
2. בתיקיית הפרויקט המקומית:

```bash
cd gaming-blog
git init
git add .
git commit -m "Initial commit - PHP + Netlify/Supabase"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gaming-blog.git
git push -u origin main
```

אם הפרויקט כבר תחת `bf6`, אפשר ליצור תת־תיקייה או repo נפרד רק עבור `gaming-blog` ו־`netlify-app/` – העיקר ש־Netlify יבנה מתוך `netlify-app/` (ראה שלב 3).

---

## 3. Netlify – חיבור ל־GitHub ופריסה

1. היכנס ל־[netlify.com](https://netlify.com) וצור חשבון (או התחבר עם GitHub).
2. **Add new site** → **Import an existing project** → **GitHub**.
3. בחר את ה־repo (למשל `gaming-blog`).
4. **Build settings** – התאם כך:
   - **Base directory:** `netlify-app`
   - **Build command:** `npm run build`
   - **Publish directory:** `netlify-app/dist`
5. **Environment variables** → **Add variables** / **Add env vars**:
   - `PUBLIC_SUPABASE_URL` = ה־Project URL מ־Supabase
   - `PUBLIC_SUPABASE_ANON_KEY` = ה־anon key מ־Supabase
6. **Deploy site**.

אחרי הבנייה, Netlify ייתן לך כתובת כמו `https://random-name.netlify.app`. אפשר להגדיר דומיין מותאם ב־**Domain settings**.

---

## 4. Supabase – הגדרת כתובת האתר (Auth)

כדי שההתחברות וההרשמה יעבדו מכתובת Netlify:

1. ב־Supabase: **Authentication** → **URL Configuration**.
2. ב־**Site URL** הזן את כתובת האתר ב־Netlify, למשל:
   - `https://random-name.netlify.app`
   - או הדומיין שלך: `https://yourdomain.com`
3. ב־**Redirect URLs** הוסף:
   - `https://random-name.netlify.app/**`
   - (או את הדומיין שלך עם `/**`).

שמור את ההגדרות.

---

## 5. בדיקה

1. גלוש לכתובת האתר ב־Netlify.
2. **הרשמה** – צור משתמש חדש (המשתמש הראשון יהפוך ל־admin).
3. **התחברות** – התחבר עם האימייל והסיסמה.
4. **פאנל ניהול** – `/admin` – צור עמוד ופוסט ובדוק שהם מופיעים באתר.

---

## מבנה הריפו (רלוונטי ל־Netlify)

```
gaming-blog/
├── netlify-app/          ← Netlify בונה מכאן (Base directory: netlify-app)
│   ├── src/
│   ├── public/
│   ├── astro.config.mjs
│   ├── package.json
│   └── netlify.toml
├── supabase/
│   └── schema.sql        ← להרצה ב־Supabase SQL Editor
├── public/                ← גרסת PHP (לא בשימוש ב־Netlify)
├── admin/
├── config.php
└── ...
```

אם ה־repo מכיל רק את `netlify-app/` (למשל repo נפרד), אז ב־Netlify:
- **Base directory** – ריק או `.`
- **Publish directory** – `dist`

---

## משתני סביבה (סיכום)

| משתנה | איפה מגדירים | ערך |
|--------|----------------|------|
| `PUBLIC_SUPABASE_URL` | Netlify → Site settings → Environment variables | Project URL מ־Supabase |
| `PUBLIC_SUPABASE_ANON_KEY` | Netlify → Site settings → Environment variables | anon key מ־Supabase |

אין להעלות את המפתחות ל־Git. רק ב־Netlify (ובמקום פיתוח מקומי ב־`.env` אם צריך).

---

## פיתוח מקומי (Netlify + Supabase)

```bash
cd gaming-blog/netlify-app
npm install
```

צור קובץ `.env` (לא לעשות commit):

```
PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

הרץ:

```bash
npm run dev
```

ואז גלוש ל־`http://localhost:4321` ובדוק התחברות וניהול תוכן.
