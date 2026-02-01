import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  vite: {
    resolve: {
      alias: { '@': join(__dirname, 'src') },
    },
    define: {
      'import.meta.env.PUBLIC_SUPABASE_URL': JSON.stringify(process.env.PUBLIC_SUPABASE_URL || ''),
      'import.meta.env.PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(process.env.PUBLIC_SUPABASE_ANON_KEY || ''),
    },
  },
});
