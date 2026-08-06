# Remove Burmese localization + add Blog tab

**Date:** 2026-08-06
**Status:** Approved

## Goal
Collapse the bilingual site (English `/` + Burmese `/my/`) to a **single English-only
site**, and surface the existing Supabase-backed blog (currently only at `/my/blog/`) as a
**Blog tab** at `/blog/`.

Scope is **URL localization only**. The *product* remains bilingual GED/IGCSE prep for
Myanmar students — Hero/Features/SEO copy describing "bilingual lessons" is product truth and
is **not** changed. Blog post bodies stay exactly as stored in Supabase (Burmese).

## Decisions
- Blog chrome + dates: **English** (new `blog.ts`, dates like `July 11, 2026`).
- Old `/my/*` URLs: **301 redirect** to English equivalents via wildcard.
- Locale plumbing: **delete `i18n.ts`** entirely; components import content directly.

## Changes

### Delete the Burmese locale
- `src/pages/my/` (all 8 files).
- `src/data/content.my.ts`, `guides.my.ts`, `quiz.my.ts`, `blog.my.ts`.
- `astro.config.mjs`: remove the `i18n` block and `sitemap({ i18n })` option.
  Keep `NotoSansMyanmar` font in `includeFiles` (OG cards render Burmese post titles).

### Collapse locale plumbing
- Delete `src/data/i18n.ts`. Consumers (~16 files) import `content`/`guides`/`quiz`
  directly, e.g. `import { ui, nav } from '../data/content'`.
- Strip `Astro.currentLocale`, `switchHref`, and `/my/`-base logic from `Nav`, `Footer`,
  `GuidePage`, `QuizPage`. `BlogPost.astro` uses English content (was hardcoded `'my'`).

### Nav
- Remove the language switcher (`EN` / `မြန်မာ` pill).
- Always render the **Blog** link (`ui.nav.blog` = `'Blog'`) → `/blog/`.

### Add the English blog (mirror of the Burmese one)
- New `src/pages/blog/index.astro`, `blog/[slug].astro`, `blog/rss.xml.ts`
  (base `/`, `prerender = false`, same Supabase reads).
- New `src/data/blog.ts` — English chrome copy.
- `blog-db.ts`: `dateLabel` → English formatting; drop `burmeseDate` if unused.
  Post bodies unchanged.

### BaseLayout / SEO
- Remove hreflang alternates (`en`/`my`/`x-default`), the `noAlternates` prop,
  `og:locale:alternate`, `myHref`, and locale conditionals. `inLanguage: 'en'`.
- Fix RSS `<link>` `/my/blog/rss.xml` → `/blog/rss.xml`.
- `content.ts`: drop `localeAlternate`. Keep `nameMy` / Burmese `alternateName` /
  `knowsLanguage` (product description, not URL localization).

### Redirects
- Wildcard **301**: `/my/(.*)` → `/$1` (via `vercel.json` or Astro `redirects`).

### Cleanup
- Check `site.webmanifest` for `/my/` or `lang` localization refs.
- `llms.txt` / `robots.txt` need no change (no `/my/` URLs; "bilingual" = product).

## Verification
`npm run build` succeeds → `npm run preview` → check `/`, `/blog`, a post, and that a
`/my/*` URL 301s to its English equivalent.
