import { f as createComponent, j as renderComponent, r as renderTemplate, i as createAstro, m as maybeRenderHead, h as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_DKJ617YC.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_ggQqbi-y.mjs';
import { s as supabase } from '../../chunks/supabase_kd6x0J5X.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const { data: post } = await supabase.from("posts").select("*").eq("slug", slug).eq("is_published", true).single();
  if (!post) {
    return Astro2.redirect("/posts");
  }
  const description = post.meta_description || (post.excerpt || "").slice(0, 160);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": post.title, "description": description }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="single-post"> <div class="container"> ${post.featured_image && renderTemplate`<div class="post-featured-image"> <img${addAttribute(post.featured_image, "src")}${addAttribute(post.title, "alt")}> </div>`} <header class="post-header"> <h1>${post.title}</h1> <p class="post-meta"> ${post.published_at ? new Date(post.published_at).toLocaleString("he-IL") : ""} </p> </header> <div class="post-content prose">${unescapeHTML(post.content || "")}</div> </div> </article> ` })}`;
}, "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/post/[slug].astro", void 0);

const $$file = "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/post/[slug].astro";
const $$url = "/post/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
