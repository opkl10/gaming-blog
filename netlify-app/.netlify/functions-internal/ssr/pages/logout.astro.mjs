import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DKJ617YC.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_ggQqbi-y.mjs';
export { renderers } from '../renderers.mjs';

const $$Logout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u05DE\u05EA\u05E0\u05EA\u05E7" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> <p>מתנתק...</p> </div>  ` })}`;
}, "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/logout.astro", void 0);

const $$file = "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/logout.astro";
const $$url = "/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Logout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
