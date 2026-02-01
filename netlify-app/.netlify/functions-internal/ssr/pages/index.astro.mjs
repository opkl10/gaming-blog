import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DKJ617YC.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_ggQqbi-y.mjs';
import { s as supabase } from '../chunks/supabase_kd6x0J5X.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let posts = [];
  let pages = [];
  try {
    const res = await supabase.from("posts").select("id, title, slug, excerpt, content, featured_image, published_at").eq("is_published", true).order("published_at", { ascending: false }).limit(6);
    posts = res.data || [];
    const pagesRes = await supabase.from("pages").select("title, slug").eq("is_published", true);
    pages = pagesRes.data || [];
  } catch (_) {
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u05E8\u05D0\u05E9\u05D9", "description": "\u05D1\u05DC\u05D5\u05D2 \u05DE\u05E9\u05D7\u05E7\u05D9 \u05DE\u05D7\u05E9\u05D1" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="hero"> <div class="container"> <h1>ברוכים הבאים לבלוג משחקי המחשב</h1> <p>ביקורות, טיפים וחדשות מהעולם של משחקי המחשב</p> </div> </section> <section class="recent-posts"> <div class="container"> <h2>פוסטים אחרונים</h2> <div class="posts-grid"> ${posts.map((post) => renderTemplate`<article class="post-card"> ${post.featured_image && renderTemplate`<a${addAttribute(`/post/${post.slug}`, "href")} class="post-image"> <img${addAttribute(post.featured_image, "src")}${addAttribute(post.title, "alt")}> </a>`} <div class="post-body"> <h3><a${addAttribute(`/post/${post.slug}`, "href")}>${post.title}</a></h3> <p class="post-meta">${post.published_at ? new Date(post.published_at).toLocaleString("he-IL") : ""}</p> <p class="post-excerpt"> ${post.excerpt || (post.content || "").replace(/<[^>]*>/g, "").slice(0, 120)}...
</p> <a${addAttribute(`/post/${post.slug}`, "href")} class="read-more">קרא עוד</a> </div> </article>`)} </div> ${posts.length === 0 && renderTemplate`<p class="no-posts">עדיין אין פוסטים.</p>`} <p class="all-posts-link"><a href="/posts">כל הפוסטים</a></p> </div> </section> ${pages.length > 0 && renderTemplate`<section class="pages-list"> <div class="container"> <h2>עמודים</h2> <ul> ${pages.map((p) => renderTemplate`<li><a${addAttribute(`/page/${p.slug}`, "href")}>${p.title}</a></li>`)} </ul> </div> </section>`}` })}`;
}, "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/index.astro", void 0);

const $$file = "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
