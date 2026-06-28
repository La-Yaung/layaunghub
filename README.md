# La Yaung Hub

> **La Yaung · လရောင်** ("moonlight") — interactive, bilingual exam-prep for Myanmar students.
> Marketing site for the La Yaung Hub platform: short video lessons + hands-on practice mapped to
> the real **GED**, **IGCSE (Cambridge)** and **Myanmar Grade 10–12** syllabus, with teacher feedback.

Built with **Astro 5** (static, zero-JS-by-default) + **Tailwind CSS v4** driven by a **two-tier
design-token system**, with **Lineicons**. A dark, "moonlit-blue" themed single landing page —
SEO- and AI-discoverability-loaded, with Google Analytics — deployed to **Vercel** at
[layaunghub.com](https://layaunghub.com).

## Quick start

```bash
npm install
npm run dev       # local dev server (http://localhost:4321)
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

Requires **Node 20+**.

## Project structure

```
src/
├── pages/index.astro          # assembles the one landing page (section order)
├── layouts/BaseLayout.astro   # <head> SEO, Open Graph, JSON-LD, Google Analytics,
│                              # + the client <script> (starfield, scroll-reveal, Formspree AJAX)
├── components/                # one .astro per section, in page order:
│   ├── Nav · Hero · Problem · Transformation · HowItWorks · Features
│   ├── Curriculum · Pricing · Faq · FinalCTA · Footer
│   ├── Transformation.astro    # emotional "dark → light" interstitial (moonbeam, before/after)
│   ├── Curriculum.astro        # 3 tracks + a per-track Subjects showcase
│   ├── Background.astro        # starfield host, grain, top moon glow
│   ├── WaitlistForm.astro      # the email/early-access form (used twice)
│   └── Icon.astro              # renders an inline Lineicons SVG by name
├── data/
│   ├── content.ts             # ALL copy, nav, FAQ, SEO config, Formspree endpoint, GA id, transformation
│   └── icons.ts               # the 19 Lineicons used (extracted, currentColor)
└── styles/global.css          # Tailwind import + tokens.css import + @theme inline / @utility wiring
                               # (REFERENCE-ONLY — no literal values; keyframes live here too)

public/                        # static assets served as-is
├── assets/layaung-logo.png    # brand logo (also favicons / og-image derive from it)
├── og-image.png · favicon-32.png · apple-touch-icon.png · icon-{192,512}.png
├── robots.txt · llms.txt · site.webmanifest

tokens/                        # the design-token source of truth
├── tokens.css                 # ALL token VALUES — primitives + semantic light/dark (CSS vars)
├── design-tokens.json         # same, exported as W3C DTCG JSON (for Figma/Style Dictionary)
├── tailwind-theme.css         # reference mapping snippet · README.md
```

## Content & design tokens

- **Edit copy, not markup.** Headlines, cards, the FAQ, nav links and SEO strings all live in
  [`src/data/content.ts`](src/data/content.ts). Components only render that data.
- **Two-tier design tokens.** **All token VALUES live in [`tokens/tokens.css`](tokens/README.md)** —
  *primitives* (`--color-gold-400`, `--fs-17`, `--lh-160`, `--glass-6`, `--gradient-*`) → *semantic
  aliases* that flip light/dark (`--surface-*`, `--content-*`, `--border-*`, `--feedback-*`).
  [`src/styles/global.css`](src/styles/global.css) is **reference-only**: it imports `tokens.css` and
  maps the vars to Tailwind utilities via `@theme inline` / `@utility` — **no literal values**.
  Components use only token utilities (`text-content-primary`, `bg-surface-brand`, `text-17`,
  `leading-160`, `bg-app`…). **To change any value, edit `tokens.css`.**
- **Theme.** Locked to the dark "moonlit-blue" map via `<html data-theme="dark">`. **Gold is the brand
  accent** (`--color-gold-*` — don't change it); the light map ships in `tokens.css` for a future toggle.
- The token set is also exported as **W3C DTCG JSON** (`tokens/design-tokens.json`) for Figma /
  Style Dictionary. See [`tokens/README.md`](tokens/README.md) for the full architecture.

## SEO & discoverability

- Per-page meta, canonical, **Open Graph** + **Twitter** cards, `theme-color`, web manifest.
- **JSON-LD** structured data: `Organization`/`EducationalOrganization`, `WebSite`, `WebPage`,
  `FAQPage`, and a `Service` with Free/Premium offers (in `BaseLayout.astro`).
- `@astrojs/sitemap` → `sitemap-index.xml`; `public/robots.txt` explicitly allows AI crawlers
  (GPTBot, Google-Extended, ClaudeBot, PerplexityBot…); `public/llms.txt` summarizes the product.
- After deploy, submit `https://layaunghub.com/sitemap-index.xml` in Google Search Console.

## Waitlist form

Both forms POST to **Formspree** (`FORMSPREE_ENDPOINT` in `content.ts`). They work without JS
(native POST) and, with JS, submit via AJAX to keep the inline success animation. A hidden
`_source` field tags hero vs final-CTA submissions.

## Analytics

**Google Analytics 4** is wired into `BaseLayout.astro` via the `gtag.js` snippet. The measurement
ID lives in `site.gaId` in [`src/data/content.ts`](src/data/content.ts) (`G-7PZ1NYMGS0`) — change it
there, or clear it to disable analytics entirely.

## Deployment

Push to a Git repo and import into **Vercel** — it auto-detects Astro, runs `astro build`, and serves
`dist/`. No adapter needed (fully static). Then point the `layaunghub.com` domain at the project.

## License

See [LICENSE](LICENSE).
