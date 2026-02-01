import { f as createComponent, j as renderComponent, r as renderTemplate } from '../../chunks/astro/server_DKJ617YC.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CciNajKb.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "\u05E4\u05D5\u05E1\u05D8\u05D9\u05DD" })}`;
}, "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/posts/index.astro", void 0);

const $$file = "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/posts/index.astro";
const $$url = "/admin/posts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
