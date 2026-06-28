# AGENTS.md — La Yaung Hub

Guidance for AI coding agents working in this repo. Humans: see [README.md](README.md).

## What this is
A single-page **Astro 5** marketing site (static, zero-JS-by-default) for *La Yaung Hub* —
bilingual GED/IGCSE exam prep for Myanmar students. Styling is **Tailwind CSS v4** with
**semantic design tokens**; icons are inline **Lineicons**. Deploys static to **Vercel**
(`layaunghub.com`). No backend except a Formspree-backed waitlist form.

## Commands
```bash
npm run dev       # dev server
npm run build     # production build → dist/  (ALWAYS run this to verify changes)
npm run preview   # serve dist/ locally
```
Node 20+. There are no unit tests; **verification = `npm run build` succeeds + visual check**
(screenshot `dist/` via a headless browser, or `npm run preview`).

## Architecture & where to edit
- **Copy/data lives in [`src/data/content.ts`](src/data/content.ts)** — headlines, nav, FAQ,
  problems/steps/features/curriculum/pricing arrays, all SEO strings (`site` object), and
  `FORMSPREE_ENDPOINT`. **Change words here, not in component markup.**
- **Sections** are one `.astro` file each in `src/components/` (Nav, Hero, Problem, HowItWorks,
  Features, Curriculum, Pricing, Faq, FinalCTA, Footer). They render `content.ts` data via `.map()`.
- **`src/layouts/BaseLayout.astro`** owns the `<head>` (meta, Open Graph, Twitter, JSON-LD
  structured data) and the single client `<script>` (starfield, scroll-reveal, Formspree AJAX submit).
- **`src/pages/index.astro`** just imports + orders the sections inside the page background wrapper.

## Conventions (follow these)
- **No inline `style=` attributes.** Express everything as Tailwind utility classes. The *only*
  allowed exception is the noise-texture data-URI in `Background.astro`.
- **Use semantic color tokens, not raw hex.** Tokens are defined in
  [`src/styles/global.css`](src/styles/global.css) `@theme`: `accent`, `accent-light/-mid/-deep`,
  `ink`, `ink-soft`, `ink-muted`, `muted`, `muted-2`, `faint`, `faint-2`, `faint-3`, `bg`, `bg-2/-3`,
  `panel`, `deep`, `success`. Use `text-ink`, `bg-accent`, `border-accent/30`, etc. Custom utilities:
  `text-gold` (gradient text), `bg-gold` (gradient fill), `bg-panel-soft`. Reach for an arbitrary
  value (`text-[#D6DBF6]`, `rounded-[18px]`, `text-[clamp(...)]`) only for genuinely one-off values.
- **Icons:** `<Icon name="globe" size={24} class="text-accent" />`. Names are the keys in
  [`src/data/icons.ts`](src/data/icons.ts) (extracted from the `lineicons` package as `currentColor`
  SVGs). To add an icon: pick a Lineicons file, add it to the generator/map, then reference by name.
- **Animations** use token-backed utilities `animate-float/-glow/-twinkle/-rise` (keyframes in global.css).
- Keep markup **semantic & accessible**: real `header/nav/section/footer`, ordered `h1→h3`,
  `<label>`+`aria` on inputs, `<details>` for the FAQ.

## Gotchas (these have bitten before)
- ⚠️ **Never write the sequence `*/` inside a CSS comment in `global.css`** (e.g. `bg-*/text-*`).
  It closes the comment early and breaks the Tailwind v4 parse. Build will warn `Unexpected token`.
- The brand logo source (`~/Downloads/15 moon.png`, 2601×2601) exceeds the design-MCP 256 KiB read
  cap, so it can't be fetched through the MCP — it's already committed at `public/assets/layaung-logo.png`
  (512×512) with favicons/og-image derived from it.
- After changing `content.ts` SEO strings, the JSON-LD + meta update automatically (they read `site`).

## Design tokens (two systems, know the difference)
1. **Live, single-tier** semantic tokens in `src/styles/global.css` `@theme` — what every component
   currently uses (`text-ink`, `bg-accent`…). Dark-only.
2. **Formal, two-tier** primitive→semantic system with **light/dark** in [`tokens/`](tokens/README.md)
   (W3C DTCG JSON + CSS + a Tailwind `@theme inline` mapping). Standalone reference; not yet wired
   into the build. If asked to "use the token system / add light mode", migrate global.css to import
   `tokens/tokens.css` + `tokens/tailwind-theme.css` and rename utilities
   (`text-ink → text-content-primary`, `bg-accent → bg-surface-brand`, …).

## Waitlist form
Posts to Formspree (`FORMSPREE_ENDPOINT` in `content.ts`). Works without JS (native POST); the
client script enhances it with `fetch` + `FormData` to keep the inline success state. Hidden
`_source` field distinguishes hero vs final-CTA. Don't submit real test data to the live endpoint.

## Don't
- Don't reintroduce inline styles or raw hex colors in components.
- Don't edit generated output (`dist/`) or `src/data/icons.ts` by hand (regenerate it).
- Don't commit or push unless the user asks.
