import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { o as NOOP_MIDDLEWARE_HEADER, p as decodeKey } from './chunks/astro/server_DKJ617YC.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.B3rhWLzC.js"}],"styles":[],"routeData":{"route":"/admin/pages/add","isIndex":false,"type":"page","pattern":"^\\/admin\\/pages\\/add\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"pages","dynamic":false,"spread":false}],[{"content":"add","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/pages/add.astro","pathname":"/admin/pages/add","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DYnGhKQT.js"}],"styles":[],"routeData":{"route":"/admin/pages/delete/[id]","isIndex":false,"type":"page","pattern":"^\\/admin\\/pages\\/delete\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"pages","dynamic":false,"spread":false}],[{"content":"delete","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/admin/pages/delete/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DYnGhKQT.js"}],"styles":[],"routeData":{"route":"/admin/pages/edit/[id]","isIndex":false,"type":"page","pattern":"^\\/admin\\/pages\\/edit\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"pages","dynamic":false,"spread":false}],[{"content":"edit","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/admin/pages/edit/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CRgn8u1M.js"}],"styles":[],"routeData":{"route":"/admin/pages","isIndex":true,"type":"page","pattern":"^\\/admin\\/pages\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"pages","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/pages/index.astro","pathname":"/admin/pages","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DWDExulv.js"}],"styles":[],"routeData":{"route":"/admin/posts/add","isIndex":false,"type":"page","pattern":"^\\/admin\\/posts\\/add\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"posts","dynamic":false,"spread":false}],[{"content":"add","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/posts/add.astro","pathname":"/admin/posts/add","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DYnGhKQT.js"}],"styles":[],"routeData":{"route":"/admin/posts/delete/[id]","isIndex":false,"type":"page","pattern":"^\\/admin\\/posts\\/delete\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"posts","dynamic":false,"spread":false}],[{"content":"delete","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/admin/posts/delete/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DYnGhKQT.js"}],"styles":[],"routeData":{"route":"/admin/posts/edit/[id]","isIndex":false,"type":"page","pattern":"^\\/admin\\/posts\\/edit\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"posts","dynamic":false,"spread":false}],[{"content":"edit","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/admin/posts/edit/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted._i55g2BG.js"}],"styles":[],"routeData":{"route":"/admin/posts","isIndex":true,"type":"page","pattern":"^\\/admin\\/posts\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/posts/index.astro","pathname":"/admin/posts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.D2TroVQK.js"}],"styles":[],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DJEfQNRg.js"}],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.ERn_KHal.js"}],"styles":[],"routeData":{"route":"/logout","isIndex":false,"type":"page","pattern":"^\\/logout\\/?$","segments":[[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/logout.astro","pathname":"/logout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DvzlY7C8.js"}],"styles":[],"routeData":{"route":"/page/[slug]","isIndex":false,"type":"page","pattern":"^\\/page\\/([^/]+?)\\/?$","segments":[[{"content":"page","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/page/[slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DvzlY7C8.js"}],"styles":[],"routeData":{"route":"/post/[slug]","isIndex":false,"type":"page","pattern":"^\\/post\\/([^/]+?)\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/post/[slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DvzlY7C8.js"}],"styles":[],"routeData":{"route":"/posts","isIndex":true,"type":"page","pattern":"^\\/posts\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/index.astro","pathname":"/posts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.ChBfGEu0.js"}],"styles":[],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DvzlY7C8.js"}],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/pages/add.astro",{"propagation":"none","containsHead":true}],["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/pages/delete/[id].astro",{"propagation":"none","containsHead":true}],["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/pages/edit/[id].astro",{"propagation":"none","containsHead":true}],["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/posts/add.astro",{"propagation":"none","containsHead":true}],["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/posts/delete/[id].astro",{"propagation":"none","containsHead":true}],["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/posts/edit/[id].astro",{"propagation":"none","containsHead":true}],["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/admin/posts/index.astro",{"propagation":"none","containsHead":true}],["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/login.astro",{"propagation":"none","containsHead":true}],["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/logout.astro",{"propagation":"none","containsHead":true}],["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/page/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/post/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/posts/index.astro",{"propagation":"none","containsHead":true}],["/Users/omerokon/Desktop/bf6/gaming-blog/netlify-app/src/pages/register.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/admin/pages/add@_@astro":"pages/admin/pages/add.astro.mjs","\u0000@astro-page:src/pages/admin/pages/delete/[id]@_@astro":"pages/admin/pages/delete/_id_.astro.mjs","\u0000@astro-page:src/pages/admin/pages/edit/[id]@_@astro":"pages/admin/pages/edit/_id_.astro.mjs","\u0000@astro-page:src/pages/admin/pages/index@_@astro":"pages/admin/pages.astro.mjs","\u0000@astro-page:src/pages/admin/posts/add@_@astro":"pages/admin/posts/add.astro.mjs","\u0000@astro-page:src/pages/admin/posts/delete/[id]@_@astro":"pages/admin/posts/delete/_id_.astro.mjs","\u0000@astro-page:src/pages/admin/posts/edit/[id]@_@astro":"pages/admin/posts/edit/_id_.astro.mjs","\u0000@astro-page:src/pages/admin/posts/index@_@astro":"pages/admin/posts.astro.mjs","\u0000@astro-page:src/pages/admin/index@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/logout@_@astro":"pages/logout.astro.mjs","\u0000@astro-page:src/pages/page/[slug]@_@astro":"pages/page/_slug_.astro.mjs","\u0000@astro-page:src/pages/post/[slug]@_@astro":"pages/post/_slug_.astro.mjs","\u0000@astro-page:src/pages/posts/index@_@astro":"pages/posts.astro.mjs","\u0000@astro-page:src/pages/register@_@astro":"pages/register.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BsG6ZKaW.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.CRgn8u1M.js","/astro/hoisted.js?q=1":"_astro/hoisted.B3rhWLzC.js","/astro/hoisted.js?q=2":"_astro/hoisted.DWDExulv.js","/astro/hoisted.js?q=3":"_astro/hoisted._i55g2BG.js","/astro/hoisted.js?q=4":"_astro/hoisted.D2TroVQK.js","/astro/hoisted.js?q=5":"_astro/hoisted.DJEfQNRg.js","/astro/hoisted.js?q=6":"_astro/hoisted.ERn_KHal.js","/astro/hoisted.js?q=7":"_astro/hoisted.ChBfGEu0.js","/astro/hoisted.js?q=8":"_astro/hoisted.DYnGhKQT.js","/astro/hoisted.js?q=9":"_astro/hoisted.DvzlY7C8.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/styles.css","/_astro/hoisted.B3rhWLzC.js","/_astro/hoisted.CRgn8u1M.js","/_astro/hoisted.ChBfGEu0.js","/_astro/hoisted.D2TroVQK.js","/_astro/hoisted.DJEfQNRg.js","/_astro/hoisted.DWDExulv.js","/_astro/hoisted.DYnGhKQT.js","/_astro/hoisted.DvzlY7C8.js","/_astro/hoisted.ERn_KHal.js","/_astro/hoisted._i55g2BG.js","/_astro/index.qSrGhBJl.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"DlSU61CfHbjXAndxk4Fa0BA4/p7INPeTH0C88DzrCr0=","experimentalEnvGetSecretEnabled":false});

export { manifest };
