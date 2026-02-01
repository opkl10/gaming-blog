import { f as createComponent, h as addAttribute, l as renderHead, n as renderSlot, r as renderTemplate, i as createAstro } from './astro/server_DKJ617YC.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title = "\u05D1\u05DC\u05D5\u05D2 \u05DE\u05E9\u05D7\u05E7\u05D9 \u05DE\u05D7\u05E9\u05D1", description = "\u05D1\u05DC\u05D5\u05D2 \u05DE\u05E9\u05D7\u05E7\u05D9 \u05DE\u05D7\u05E9\u05D1" } = Astro2.props;
  const siteName = "\u05D1\u05DC\u05D5\u05D2 \u05DE\u05E9\u05D7\u05E7\u05D9 \u05DE\u05D7\u05E9\u05D1";
  return renderTemplate`<html lang="he" dir="rtl"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title !== siteName ? `${title} | ${siteName}` : title}</title><meta name="description"${addAttribute(description, "content")}><link rel="stylesheet" href="/styles.css">${renderHead()}</head> <body> <header class="site-header"> <div class="container"> <a href="/" class="logo">${siteName}</a> <nav class="main-nav"> <a href="/">ראשי</a> <a href="/posts">פוסטים</a> <a href="/login" id="nav-login">התחברות</a> <a href="/register" id="nav-register">הרשמה</a> <a href="/admin" id="nav-admin" style="display:none">פאנל ניהול</a> <a href="#" id="nav-logout" style="display:none">התנתק</a> </nav> </div> </header> <main class="main-content"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="site-footer"> <div class="container"> <p>© ${(/* @__PURE__ */ new Date()).getFullYear()} ${siteName}. כל הזכויות שמורות.</p> </div> </footer>  ${renderSlot($$result, $$slots["scripts"])} </body></html>`;
}, "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
