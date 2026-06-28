# CLAUDE.md

This project's agent guidance lives in **[AGENTS.md](AGENTS.md)** — read it first.

@AGENTS.md

## TL;DR for Claude Code
- **Astro 5 + Tailwind v4 + Lineicons**, static site, deploys to Vercel (`layaunghub.com`).
- **Edit copy in `src/data/content.ts`**, not in component markup.
- **No inline `style=`; use semantic token utilities** (`text-ink`, `bg-accent`, …) defined in
  `src/styles/global.css` `@theme`.
- **Verify every change with `npm run build`** (no test suite); then preview/screenshot.
- ⚠️ Never put `*/` inside a CSS comment in `global.css` — it breaks the Tailwind parse.
- A formal two-tier light/dark token system is available in `tokens/` (not yet wired in).
