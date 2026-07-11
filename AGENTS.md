# AGENTS.md — La Yaung Hub

Guidance for AI coding agents working in this repo. Humans: see [README.md](README.md).

## What this is
A single-page **Astro 5** marketing site (static, zero-JS-by-default) for *La Yaung Hub* —
bilingual GED/IGCSE exam prep for Myanmar students. Light **cool** theme that mirrors the app's
Figma design system: **purple `#5F4BF1` is the brand primary** (monochrome purple, **Poppins** type,
`#F8F9FC` surface, white cards, pill buttons). Styling is **Tailwind CSS v4** driven by a **two-tier design-token system**;
icons are inline **Lineicons**. Google Analytics (GA4) is wired in. Deploys static to **Vercel**
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
  problems/steps/features/curriculum(+subjects)/pricing arrays, the `transformation` (dark→light)
  data, all SEO strings (`site` object), `FORMSPREE_ENDPOINT`, and `site.gaId` (Google Analytics).
  **Change words here, not in component markup.**
- **Sections** are one `.astro` file each in `src/components/`, ordered Nav → Hero → Problem →
  **Transformation** → HowItWorks → Features → Curriculum → Pricing → Faq → FinalCTA → Footer. They
  render `content.ts` data via `.map()`. `Transformation.astro` is the emotional "dark → light"
  interstitial (moonbeam + before/after); `Curriculum.astro` includes the per-track Subjects showcase.
- **`src/layouts/BaseLayout.astro`** owns the `<head>` (meta, Open Graph, Twitter, JSON-LD structured
  data, **Google Analytics** gtag snippet keyed on `site.gaId`) and the single client `<script>`
  (starfield, scroll-reveal, Formspree AJAX submit).
- **`src/pages/index.astro`** just imports + orders the sections inside the `bg-app` page wrapper.

## Conventions (follow these)
- **No inline `style=` attributes.** Express everything as Tailwind utility classes. The *only*
  allowed exception is the noise-texture data-URI in `Background.astro`.
- **Use the design tokens, not raw values.** All token VALUES live in
  [`tokens/tokens.css`](tokens/tokens.css) (the single source of truth, two-tier: primitives →
  semantic light/dark). [`src/styles/global.css`](src/styles/global.css) is **reference-only** —
  it just maps those vars to Tailwind utilities via `@theme inline` + `@utility`. **Never put a
  literal value (hex/px/gradient) in global.css or a component;** add it to `tokens.css` and
  reference it. The token utilities:
  - **Color (semantic):** `text-content-primary/-secondary/-tertiary/-brand/-on-brand`,
    `bg-surface-primary/-secondary/-tertiary/-brand`, `border-border-subtle/-strong/-interactive`,
    `text-success-text` (+ warning/error/info). Fine-hierarchy primitives: `text-neutral-{100..700}`,
    `text-gold-200`, `border-deep`. Glass: `bg-glass-{3..25}` / `border-glass-{3..25}`.
  - **Type:** `text-{9..46}` (px scale; `-5` = half-px, e.g. `text-12-5`), fluid `text-display-{sm,md,lg,xl}`,
    `text-lead`, `text-stat`, `text-body`, `text-body-lg`.
  - **Line-height:** `leading-{100..165}` (×100). **Tracking:** `tracking-{snug,loose,looser,loosest,caps,caps-lg,caps-xl}`.
  - **Gradients:** `bg-gold`, `text-gold`, `bg-app`, `bg-glow-{hero,moon,spot,cta}`, `bg-moon`,
    `bg-screen`, `bg-phone-{a,b}`, `bg-gold-{bar,tab,tile}`, `bg-icon-soft`, `bg-card-feature`,
    `bg-banner-gold`, `bg-premium`, `bg-cta-card`, `bg-panel-soft(-25)`, `bg-shift` (dark→light panel),
    `bg-moonbeam`. Support accent: `text-support`/`bg-support`/`border-support` (subtle blue).
  - Theme is light via `<html data-theme="light">`; the dark token map now only skins the Footer
    (`data-theme="dark"`). The brand is monochrome purple — `--surface-brand` / `--content-brand` /
    `--border-interactive` all resolve to `--color-primary-*`, and the `bg-gold`/`text-gold` utility
    names now render **purple** gradients (values in `tokens.css`; names kept to avoid churn).
  - Spacing/radius/sizing/shadows are still Tailwind arbitraries (`rounded-[18px]`, `gap-[18px]`,
    `shadow-[...]`) — a deliberate escape hatch; tokenize only if asked.
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

## Design tokens (one wired two-tier system)
- **Values:** [`tokens/tokens.css`](tokens/README.md) — primitives (`--color-gold-400`, `--fs-17`,
  `--lh-160`, `--ls-caps`, `--glass-6`, `--gradient-*`, `--motion-*`) + semantic aliases that flip
  light/dark (`--surface-*`, `--content-*`, `--border-*`, `--feedback-*`). Also exported as W3C DTCG
  JSON in `tokens/design-tokens.json`.
- **Wiring:** `src/styles/global.css` imports `tokens.css` and exposes everything as utilities via
  `@theme inline` / `@utility`. It holds **no literal values** — only `var()` references + keyframes.
- Components reference utilities only. Adding/altering a value = edit `tokens.css`, nothing else.

## Waitlist form
Posts to Formspree (`FORMSPREE_ENDPOINT` in `content.ts`). Works without JS (native POST); the
client script enhances it with `fetch` + `FormData` to keep the inline success state. Hidden
`_source` field distinguishes hero vs final-CTA. Don't submit real test data to the live endpoint.

## Don't
- Don't reintroduce inline styles or raw hex colors in components.
- Don't edit generated output (`dist/`) or `src/data/icons.ts` by hand (regenerate it).
- Don't commit or push unless the user asks.
