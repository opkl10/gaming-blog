import { f as createComponent, j as renderComponent, r as renderTemplate, i as createAstro, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_DKJ617YC.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_ggQqbi-y.mjs';
import { s as supabase } from '../../chunks/supabase_kd6x0J5X.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const { data: page } = await supabase.from("pages").select("*").eq("slug", slug).eq("is_published", true).single();
  if (!page) {
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": page.title, "description": page.meta_description || "" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="single-page"> <div class="container"> <h1>${page.title}</h1> <div class="page-content prose">${unescapeHTML(page.content || "")}</div> </div> </article> ` })}`;
}, "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/page/[slug].astro", void 0);

const $$file = "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/page/[slug].astro";
const $$url = "/page/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
