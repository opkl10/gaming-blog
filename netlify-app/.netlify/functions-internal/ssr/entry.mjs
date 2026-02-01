import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BsG6ZKaW.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/pages/add.astro.mjs');
const _page2 = () => import('./pages/admin/pages/delete/_id_.astro.mjs');
const _page3 = () => import('./pages/admin/pages/edit/_id_.astro.mjs');
const _page4 = () => import('./pages/admin/pages.astro.mjs');
const _page5 = () => import('./pages/admin/posts/add.astro.mjs');
const _page6 = () => import('./pages/admin/posts/delete/_id_.astro.mjs');
const _page7 = () => import('./pages/admin/posts/edit/_id_.astro.mjs');
const _page8 = () => import('./pages/admin/posts.astro.mjs');
const _page9 = () => import('./pages/admin.astro.mjs');
const _page10 = () => import('./pages/login.astro.mjs');
const _page11 = () => import('./pages/logout.astro.mjs');
const _page12 = () => import('./pages/page/_slug_.astro.mjs');
const _page13 = () => import('./pages/post/_slug_.astro.mjs');
const _page14 = () => import('./pages/posts.astro.mjs');
const _page15 = () => import('./pages/register.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/pages/add.astro", _page1],
    ["src/pages/admin/pages/delete/[id].astro", _page2],
    ["src/pages/admin/pages/edit/[id].astro", _page3],
    ["src/pages/admin/pages/index.astro", _page4],
    ["src/pages/admin/posts/add.astro", _page5],
    ["src/pages/admin/posts/delete/[id].astro", _page6],
    ["src/pages/admin/posts/edit/[id].astro", _page7],
    ["src/pages/admin/posts/index.astro", _page8],
    ["src/pages/admin/index.astro", _page9],
    ["src/pages/login.astro", _page10],
    ["src/pages/logout.astro", _page11],
    ["src/pages/page/[slug].astro", _page12],
    ["src/pages/post/[slug].astro", _page13],
    ["src/pages/posts/index.astro", _page14],
    ["src/pages/register.astro", _page15],
    ["src/pages/index.astro", _page16]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
