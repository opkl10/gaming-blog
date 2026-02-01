import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_DKJ617YC.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_CciNajKb.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Add = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "\u05E4\u05D5\u05E1\u05D8 \u05D7\u05D3\u05E9" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="admin-content"> <h1>פוסט חדש</h1> <div id="form-error" class="alert alert-error" style="display:none"></div> <form id="post-form" class="editor-form"> <div class="form-group"> <label for="title">כותרת *</label> <input type="text" id="title" name="title" required> </div> <div class="form-group"> <label for="slug">קישור (slug)</label> <input type="text" id="slug" name="slug" placeholder="ינוצר אוטומטית"> </div> <div class="form-group"> <label for="excerpt">תקציר</label> <textarea id="excerpt" name="excerpt" rows="3"></textarea> </div> <div class="form-group"> <label for="content">תוכן</label> <textarea id="content" name="content" rows="14"></textarea> </div> <div class="form-group"> <label for="featured_image">כתובת תמונת כותרת</label> <input type="url" id="featured_image" name="featured_image" placeholder="https://..."> </div> <div class="form-group"> <label for="meta_description">תיאור SEO</label> <input type="text" id="meta_description" name="meta_description"> </div> <div class="form-group"> <label><input type="checkbox" name="is_published" value="1"> מפורסם</label> </div> <button type="submit" class="btn btn-primary">שמור פוסט</button> <a href="/admin/posts" class="btn btn-secondary">ביטול</a> </form> </div>  ` })}`;
}, "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/posts/add.astro", void 0);

const $$file = "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/posts/add.astro";
const $$url = "/admin/posts/add";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Add,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
