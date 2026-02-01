import { f as createComponent, j as renderComponent, r as renderTemplate, i as createAstro, k as defineScriptVars, h as addAttribute, m as maybeRenderHead } from '../../../../chunks/astro/server_DKJ617YC.mjs';
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
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "עריכת עמוד" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<div id="admin-content"> <h1>עריכת עמוד</h1> <div id="form-error" class="alert alert-error" style="display:none"></div> <form id="page-form" class="editor-form"> <input type="hidden" id="id"', '> <div class="form-group"> <label for="title">כותרת *</label> <input type="text" id="title" name="title" required> </div> <div class="form-group"> <label for="slug">קישור (slug)</label> <input type="text" id="slug" name="slug"> </div> <div class="form-group"> <label for="content">תוכן</label> <textarea id="content" name="content" rows="12"></textarea> </div> <div class="form-group"> <label for="meta_description">תיאור SEO</label> <input type="text" id="meta_description" name="meta_description"> </div> <div class="form-group"> <label><input type="checkbox" name="is_published" value="1"> מפורסם</label> </div> <button type="submit" class="btn btn-primary">שמור שינויים</button> <a href="/admin/pages" class="btn btn-secondary">ביטול</a> </form> </div> <script>(function(){', `
    import { requireAdmin } from '@/scripts/admin-auth.js';
    import { createClient } from '@supabase/supabase-js';
    const supabase = createClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_ANON_KEY);
    requireAdmin(async () => {
      const { data: page } = await supabase.from('pages').select('*').eq('id', id).single();
      if (!page) { document.getElementById('admin-content').innerHTML = '<p>עמוד לא נמצא.</p>'; return; }
      document.getElementById('title').value = page.title;
      document.getElementById('slug').value = page.slug;
      document.getElementById('content').value = page.content || '';
      document.getElementById('meta_description').value = page.meta_description || '';
      document.querySelector('[name="is_published"]').checked = page.is_published;
      document.getElementById('page-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const errEl = document.getElementById('form-error');
        errEl.style.display = 'none';
        const { error } = await supabase.from('pages').update({
          title: document.getElementById('title').value.trim(),
          slug: document.getElementById('slug').value.trim(),
          content: document.getElementById('content').value,
          meta_description: document.getElementById('meta_description').value.trim(),
          is_published: document.querySelector('[name="is_published"]').checked,
          updated_at: new Date().toISOString()
        }).eq('id', id);
        if (error) { errEl.textContent = error.message; errEl.style.display = 'block'; return; }
        window.location.href = '/admin/pages';
      });
    });
  })();</script> `])), maybeRenderHead(), addAttribute(id, "value"), defineScriptVars({ id })) })}`;
}, "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/pages/edit/[id].astro", void 0);
const $$file = "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/pages/edit/[id].astro";
const $$url = "/admin/pages/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
