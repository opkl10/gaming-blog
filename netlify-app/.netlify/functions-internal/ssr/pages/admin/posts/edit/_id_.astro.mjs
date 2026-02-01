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
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "עריכת פוסט" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<div id="admin-content"> <h1>עריכת פוסט</h1> <div id="form-error" class="alert alert-error" style="display:none"></div> <form id="post-form" class="editor-form"> <input type="hidden" id="id"', '> <div class="form-group"> <label for="title">כותרת *</label> <input type="text" id="title" name="title" required> </div> <div class="form-group"> <label for="slug">קישור (slug)</label> <input type="text" id="slug" name="slug"> </div> <div class="form-group"> <label for="excerpt">תקציר</label> <textarea id="excerpt" name="excerpt" rows="3"></textarea> </div> <div class="form-group"> <label for="content">תוכן</label> <textarea id="content" name="content" rows="14"></textarea> </div> <div class="form-group"> <label for="featured_image">כתובת תמונת כותרת</label> <input type="url" id="featured_image" name="featured_image"> </div> <div class="form-group"> <label for="meta_description">תיאור SEO</label> <input type="text" id="meta_description" name="meta_description"> </div> <div class="form-group"> <label><input type="checkbox" name="is_published" value="1"> מפורסם</label> </div> <button type="submit" class="btn btn-primary">שמור שינויים</button> <a href="/admin/posts" class="btn btn-secondary">ביטול</a> </form> </div> <script>(function(){', `
    import { requireAdmin } from '@/scripts/admin-auth.js';
    import { createClient } from '@supabase/supabase-js';
    const supabase = createClient(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.PUBLIC_SUPABASE_ANON_KEY);
    requireAdmin(async () => {
      const { data: post } = await supabase.from('posts').select('*').eq('id', id).single();
      if (!post) { document.getElementById('admin-content').innerHTML = '<p>פוסט לא נמצא.</p>'; return; }
      document.getElementById('title').value = post.title;
      document.getElementById('slug').value = post.slug;
      document.getElementById('excerpt').value = post.excerpt || '';
      document.getElementById('content').value = post.content || '';
      document.getElementById('featured_image').value = post.featured_image || '';
      document.getElementById('meta_description').value = post.meta_description || '';
      document.querySelector('[name="is_published"]').checked = post.is_published;
      document.getElementById('post-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const errEl = document.getElementById('form-error');
        errEl.style.display = 'none';
        const is_published = document.querySelector('[name="is_published"]').checked;
        const published_at = is_published ? (post.published_at || new Date().toISOString()) : null;
        const { error } = await supabase.from('posts').update({
          title: document.getElementById('title').value.trim(),
          slug: document.getElementById('slug').value.trim(),
          excerpt: document.getElementById('excerpt').value.trim(),
          content: document.getElementById('content').value,
          featured_image: document.getElementById('featured_image').value.trim() || null,
          meta_description: document.getElementById('meta_description').value.trim(),
          is_published,
          published_at,
          updated_at: new Date().toISOString()
        }).eq('id', id);
        if (error) { errEl.textContent = error.message; errEl.style.display = 'block'; return; }
        window.location.href = '/admin/posts';
      });
    });
  })();</script> `])), maybeRenderHead(), addAttribute(id, "value"), defineScriptVars({ id })) })}`;
}, "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/posts/edit/[id].astro", void 0);
const $$file = "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/posts/edit/[id].astro";
const $$url = "/admin/posts/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
