# La Yaung Hub

> **La Yaung · လရောင်** ("moonlight") — interactive, bilingual exam-prep for Myanmar students.
> Marketing site for the La Yaung Hub platform: short video lessons + hands-on practice mapped to
> the real **GED**, **IGCSE (Cambridge)** and **Myanmar Grade 10–12** syllabus, with teacher feedback.

Built with **Astro 5** (static, zero-JS-by-default) + **Tailwind CSS v4** (semantic design tokens) +
**Lineicons**. Single landing page, SEO- and AI-discoverability-loaded, deployed to **Vercel** at
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
├── pages/index.astro          # assembles the one landing page
├── layouts/BaseLayout.astro   # <head> SEO, Open Graph, JSON-LD, + the client <script>
│                              # (starfield, scroll-reveal, Formspree AJAX submit)
├── components/                # one .astro per section
│   ├── Nav · Hero · Problem · HowItWorks · Features
│   ├── Curriculum · Pricing · Faq · FinalCTA · Footer
│   ├── Background.astro        # starfield host, grain, moon glow
│   ├── WaitlistForm.astro      # the email/early-access form (used twice)
│   └── Icon.astro              # renders an inline Lineicons SVG by name
├── data/
│   ├── content.ts             # ALL copy, nav, FAQ, SEO config, Formspree endpoint
│   └── icons.ts               # the 19 Lineicons used (extracted, currentColor)
└── styles/global.css          # Tailwind import + @theme design tokens + keyframes

public/                        # static assets served as-is
├── assets/layaung-logo.png    # brand logo (also favicons / og-image derive from it)
├── og-image.png · favicon-32.png · apple-touch-icon.png · icon-{192,512}.png
├── robots.txt · llms.txt · site.webmanifest

tokens/                        # standalone two-tier design-token system (W3C DTCG)
└── design-tokens.json · tokens.css · tailwind-theme.css · README.md
```

## Content & design tokens

- **Edit copy, not markup.** Headlines, cards, the FAQ, nav links and SEO strings all live in
  [`src/data/content.ts`](src/data/content.ts). Components only render that data.
- **Colors/spacing/type** are semantic tokens defined in [`src/styles/global.css`](src/styles/global.css)
  `@theme` (e.g. `--color-accent`, `--color-ink`, `--color-muted`). Components use Tailwind utilities
  that reference them (`text-ink`, `bg-accent`, `border-accent/30`). A fuller **two-tier
  (primitive → semantic) light/dark token system** lives in [`tokens/`](tokens/README.md).

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

## Deployment

Push to a Git repo and import into **Vercel** — it auto-detects Astro, runs `astro build`, and serves
`dist/`. No adapter needed (fully static). Then point the `layaunghub.com` domain at the project.

## License

See [LICENSE](LICENSE).
