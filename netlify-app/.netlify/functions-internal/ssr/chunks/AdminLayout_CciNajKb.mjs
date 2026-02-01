import { f as createComponent, l as renderHead, n as renderSlot, r as renderTemplate, i as createAstro } from './astro/server_DKJ617YC.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title = "\u05E4\u05D0\u05E0\u05DC \u05E0\u05D9\u05D4\u05D5\u05DC" } = Astro2.props;
  return renderTemplate`<html lang="he" dir="rtl"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} | פאנל ניהול</title><link rel="stylesheet" href="/styles.css">${renderHead()}</head> <body class="admin-body"> <header class="site-header"> <div class="container"> <a href="/admin" class="logo">פאנל ניהול · בלוג משחקי מחשב</a> <nav class="main-nav"> <a href="/">צפה באתר</a> <a href="/admin">דשבורד</a> <a href="/admin/pages">עמודים</a> <a href="/admin/posts">פוסטים</a> <span id="admin-user"></span> <a href="/logout">התנתק</a> </nav> </div> </header> <main class="admin-main"> <div class="container" id="admin-content"> <p>טוען...</p> </div> </main>  ${renderSlot($$result, $$slots["scripts"])} </body></html>`;
}, "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
