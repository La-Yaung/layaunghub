# La Yaung Hub — Design Tokens

A two-tier, theme-able token system. Brand: bilingual GED/IGCSE EdTech for
Myanmar students. Tone: calm, premium, "moonlight." Target: **WCAG 2.1 AA**.

## Files
| File | What it is |
|------|------------|
| `design-tokens.json` | Source of truth, **W3C DTCG** format (primitives + semantic light/dark). Feed this to Style Dictionary / Tokens Studio / Figma Variables. |
| `tokens.css` | The same tokens as CSS custom properties — primitives + semantic that flip on `[data-theme="dark"]` and `prefers-color-scheme`. Framework-agnostic. |
| `tailwind-theme.css` | Tailwind v4 `@theme inline` that turns the semantic vars into utilities (`bg-surface-primary`, `text-content-primary`, …). |

## Architecture (two tiers)
1. **Primitive / global** — raw palette & scales. Named by *what they are*:
   `color-gold-400`, `color-indigo-700`, `color-neutral-50`, `spacing-md`,
   `radius-lg`, `font-size-3xl`. Never referenced directly in components.
2. **Semantic / alias** — named by *intent*, and they reference primitives:
   `surface-primary`, `content-secondary`, `border-interactive`,
   `feedback-error-bg`. Components use **only these**. Swapping a brand color
   = editing one primitive; every semantic alias follows.

## Naming convention (kebab-case)
`{category}-{role}-{variant}` →
`surface-primary`, `content-on-brand`, `border-subtle`,
`feedback-success-text`, `spacing-lg`, `radius-xl`, `font-size-2xl`.

## Light / dark
Light is the default on `:root`. Dark applies when `<html data-theme="dark">`
**or** the OS prefers dark (and no explicit light theme is set). Toggle in JS:

```js
document.documentElement.dataset.theme =
  localStorage.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
```

## Usage
```html
<!-- Tailwind utilities (auto light/dark) -->
<div class="bg-surface-secondary text-content-primary border border-border-subtle rounded-lg p-lg">
  <span class="text-content-brand">La Yaung</span>
  <p class="text-content-secondary">…</p>
  <button class="bg-surface-brand text-content-on-brand rounded-md px-lg py-sm">Get Early Access</button>
</div>

<!-- or plain CSS -->
<style>
  .card { background: var(--surface-secondary); color: var(--content-primary);
          border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);
          padding: var(--spacing-lg); }
</style>
```

## Relationship to the current site
The live site (`src/styles/global.css`) ships a **single-tier** semantic set
(`--color-accent`, `--color-ink`, `--color-muted`, …) that maps onto this same
palette — `accent` = `gold-400`, `ink` = `neutral-50`, `bg` = `neutral-950`.
This `tokens/` system is the **formalized, light/dark-ready superset**. To adopt
it fully, replace `global.css`'s `@theme` with `@import "../../tokens/tokens.css"`
+ `tailwind-theme.css` and migrate utility names (`text-ink` → `text-content-primary`,
`bg-accent` → `bg-surface-brand`, etc.).
