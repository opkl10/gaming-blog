import { f as createComponent, j as renderComponent, r as renderTemplate, i as createAstro, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DKJ617YC.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_ggQqbi-y.mjs';
import { s as supabase } from '../chunks/supabase_kd6x0J5X.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const page = Number(Astro2.url.searchParams.get("p") || 1);
  const perPage = 9;
  const from = (page - 1) * perPage;
  let posts = [];
  let count = 0;
  try {
    const res = await supabase.from("posts").select("id, title, slug, excerpt, content, featured_image, published_at", { count: "exact" }).eq("is_published", true).order("published_at", { ascending: false }).range(from, from + perPage - 1);
    posts = res.data || [];
    count = res.count ?? 0;
  } catch (_) {
  }
  const totalPages = count ? Math.ceil(count / perPage) : 0;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u05E4\u05D5\u05E1\u05D8\u05D9\u05DD", "description": "\u05DB\u05DC \u05D4\u05E4\u05D5\u05E1\u05D8\u05D9\u05DD" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="posts-archive"> <div class="container"> <h1>כל הפוסטים</h1> <div class="posts-grid"> ${(posts || []).map((post) => renderTemplate`<article class="post-card"> ${post.featured_image && renderTemplate`<a${addAttribute(`/post/${post.slug}`, "href")} class="post-image"> <img${addAttribute(post.featured_image, "src")}${addAttribute(post.title, "alt")}> </a>`} <div class="post-body"> <h3><a${addAttribute(`/post/${post.slug}`, "href")}>${post.title}</a></h3> <p class="post-meta">${post.published_at ? new Date(post.published_at).toLocaleString("he-IL") : ""}</p> <p class="post-excerpt"> ${post.excerpt || (post.content || "").replace(/<[^>]*>/g, "").slice(0, 120)}...
</p> <a${addAttribute(`/post/${post.slug}`, "href")} class="read-more">קרא עוד</a> </div> </article>`)} </div> ${(!posts || posts.length === 0) && renderTemplate`<p class="no-posts">אין פוסטים עדיין.</p>`} ${totalPages > 1 && renderTemplate`<nav class="pagination"> ${Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => renderTemplate`<a${addAttribute(`/posts?p=${p}`, "href")}${addAttribute(p === page ? "current" : "", "class")}>${p}</a>`)} </nav>`} </div> </section> ` })}`;
}, "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/posts/index.astro", void 0);

const $$file = "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/posts/index.astro";
const $$url = "/posts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
