// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Canonical production URL — powers sitemap, canonical tags & absolute OG URLs.
  site: 'https://layaunghub.com',
  trailingSlash: 'ignore',
  // Output stays 'static' — the whole marketing site, guides and quiz prerender
  // to the CDN. Only the DB-backed blog routes + Telegram webhook opt into
  // on-demand rendering via `export const prerender = false`, served by the
  // Vercel adapter as serverless functions.
  adapter: vercel({
    // The OG-card renderer reads these at runtime via computed paths, which
    // Vercel's dependency tracer can't see — force them into the function bundle.
    includeFiles: [
      'node_modules/@expo-google-fonts/poppins/700Bold/Poppins_700Bold.ttf',
      'node_modules/@expo-google-fonts/noto-sans-myanmar/700Bold/NotoSansMyanmar_700Bold.ttf',
      'node_modules/harfbuzzjs/dist/harfbuzz.wasm',
      'public/assets/layaung-logo.png',
    ],
  }),
  // Legacy Burmese URLs (/my/*) 301 → their English equivalents. Handled by a
  // wildcard redirect in vercel.json (covers trailing slashes + nested blog
  // slugs, which Astro's static `redirects` map can't express here).
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
