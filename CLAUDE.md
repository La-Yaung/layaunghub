# CLAUDE.md

This project's agent guidance lives in **[AGENTS.md](AGENTS.md)** — read it first.

@AGENTS.md

## TL;DR for Claude Code
- **Astro 5 + Tailwind v4 + Lineicons**, static single-page site, deploys to Vercel (`layaunghub.com`).
  Dark **"moonlit-blue"** theme; **gold (`--color-gold-*`) is the brand accent — don't change it.**
- **Edit copy in `src/data/content.ts`**, not in component markup. It also holds nav, FAQ, SEO config
  (`site`), `FORMSPREE_ENDPOINT`, `site.gaId` (Google Analytics), and the `transformation` data.
- **No inline `style=`; use token utilities** (`text-content-primary`, `bg-surface-brand`,
  `text-17`, `leading-160`, `bg-app`, `bg-shift`, `bg-moonbeam`, …). **All values live in
  `tokens/tokens.css`**; `global.css` is reference-only (`@theme inline` + `@utility`). Add new values
  to `tokens.css`, never inline.
- Page sections (in `src/pages/index.astro`): Nav → Hero → Problem → **Transformation** (dark→light
  moonbeam interstitial) → HowItWorks → Features → Curriculum (incl. Subjects) → Pricing → Faq →
  FinalCTA → Footer.
- **Verify every change with `npm run build`** (no test suite); then preview/screenshot.
- ⚠️ Never put `*/` inside a CSS comment in `global.css` — it breaks the Tailwind parse.
- Theme is locked dark (`<html data-theme="dark">`); the light token map exists for a future toggle.
