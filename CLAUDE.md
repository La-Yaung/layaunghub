# CLAUDE.md

This project's agent guidance lives in **[AGENTS.md](AGENTS.md)** — read it first.

@AGENTS.md

## TL;DR for Claude Code
- **Astro 5 + Tailwind v4 + Lineicons**, static site, deploys to Vercel (`layaunghub.com`).
- **Edit copy in `src/data/content.ts`**, not in component markup.
- **No inline `style=`; use token utilities** (`text-content-primary`, `bg-surface-brand`,
  `text-17`, `leading-160`, `bg-app`, …). All values live in `tokens/tokens.css`; `global.css` is
  reference-only (`@theme inline` + `@utility`). Add new values to `tokens.css`, never inline.
- **Verify every change with `npm run build`** (no test suite); then preview/screenshot.
- ⚠️ Never put `*/` inside a CSS comment in `global.css` — it breaks the Tailwind parse.
- Theme is locked dark (`<html data-theme="dark">`); the light token map exists for a future toggle.
