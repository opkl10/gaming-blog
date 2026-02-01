import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DKJ617YC.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_ggQqbi-y.mjs';
export { renderers } from '../renderers.mjs';

const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u05D4\u05E8\u05E9\u05DE\u05D4", "description": "\u05D4\u05E8\u05E9\u05DE\u05D4 \u05DC\u05D1\u05DC\u05D5\u05D2" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="auth-form"> <div class="container narrow"> <h1>הרשמה</h1> <div id="auth-error" class="alert alert-error" style="display:none"></div> <div id="auth-success" class="alert alert-success" style="display:none"></div> <form id="register-form"> <div class="form-group"> <label for="email">אימייל</label> <input type="email" id="email" name="email" required> </div> <div class="form-group"> <label for="password">סיסמה (לפחות 6 תווים)</label> <input type="password" id="password" name="password" required minlength="6"> </div> <div class="form-group"> <label for="username">שם משתמש (אופציונלי)</label> <input type="text" id="username" name="username"> </div> <button type="submit" class="btn btn-primary">הירשם</button> </form> <p class="auth-link"><a href="/login">כבר יש לך חשבון? התחבר</a></p> </div> </section>  ` })}`;
}, "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/register.astro", void 0);

const $$file = "/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
