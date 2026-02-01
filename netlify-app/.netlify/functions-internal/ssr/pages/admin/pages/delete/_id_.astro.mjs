import { f as createComponent, j as renderComponent, r as renderTemplate, i as createAstro, m as maybeRenderHead, k as defineScriptVars } from '../../../../chunks/astro/server_DKJ617YC.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../../../chunks/AdminLayout_CciNajKb.mjs';
export { renderers } from '../../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "מוחק" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" <script>(function(){", "\n    import { requireAdmin } from '@/scripts/admin-auth.js';\n    import { createClient } from '@supabase/supabase-js';\n    const supabase = createClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_ANON_KEY);\n    requireAdmin(async () => {\n      await supabase.from('pages').delete().eq('id', id);\n      window.location.href = '/admin/pages';\n    });\n  })();</script> ", '<div id="admin-content"><p>מוחק...</p></div> '])), defineScriptVars({ id }), maybeRenderHead()) })}`;
}, "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/pages/delete/[id].astro", void 0);
const $$file = "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/pages/delete/[id].astro";
const $$url = "/admin/pages/delete/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
