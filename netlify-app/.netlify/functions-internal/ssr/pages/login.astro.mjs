import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DKJ617YC.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_ggQqbi-y.mjs';
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u05D4\u05EA\u05D7\u05D1\u05E8\u05D5\u05EA", "description": "\u05D4\u05EA\u05D7\u05D1\u05E8\u05D5\u05EA \u05DC\u05D1\u05DC\u05D5\u05D2" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="auth-form"> <div class="container narrow"> <h1>התחברות</h1> <div id="auth-error" class="alert alert-error" style="display:none"></div> <form id="login-form"> <div class="form-group"> <label for="email">אימייל</label> <input type="email" id="email" name="email" required> </div> <div class="form-group"> <label for="password">סיסמה</label> <input type="password" id="password" name="password" required> </div> <button type="submit" class="btn btn-primary">התחבר</button> </form> <p class="auth-link"><a href="/register">אין לך חשבון? הירשם</a></p> </div> </section>  ` })}`;
}, "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/login.astro", void 0);

const $$file = "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
