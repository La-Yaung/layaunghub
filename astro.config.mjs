// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Canonical production URL — powers sitemap, canonical tags & absolute OG URLs.
  site: 'https://layaunghub.com',
  trailingSlash: 'ignore',
  // Bilingual routing: / = English, /my/ = Burmese (Unicode).
  // `Astro.currentLocale` drives which content set components render.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'my'],
    routing: { prefixDefaultLocale: false },
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
