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
  // Bilingual routing: / = English, /my/ = Burmese (Unicode).
  // `Astro.currentLocale` drives which content set components render.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'my'],
    // Astro 6+ wants these set explicitly. English (default) is unprefixed at
    // "/", Burmese at "/my/"; never redirect the bare default locale.
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', my: 'my-MM' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
