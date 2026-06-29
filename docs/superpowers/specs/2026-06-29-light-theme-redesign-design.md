# Light Theme Redesign — La Yaung Hub

**Date:** 2026-06-29
**Status:** Draft for review
**Owner:** Hare Om

## Goal

Convert the site from the locked dark "moonlit-blue" theme to a **full light theme with a
white background** across every section, while keeping the gold brand accent legible and
premium and preserving a sense of "glow" via a daytime motif.

This is a permanent theme change (not a toggle). The dark token map is retained in
`tokens.css` for possible future use but is no longer the active theme.

## Decisions (locked with the user)

1. **Direction:** Full light theme — white background everywhere.
2. **Gold accent:** Deepen it. Use `gold-700`/`gold-800` for text & button labels on white so it
   passes contrast; keep bright `gold-400/500` only for fills, halos and glows.
3. **Atmosphere:** Replace the moonlight motif (starfield + moon glow) with a **daytime motif** —
   soft warm gold halos / gentle light rays on white. No literal stars.
4. **Transformation section:** Reframe so it works on a light page. It stays the emotional
   "before → after" beat but the panel is light; the "by moonlight" side becomes the warm/golden
   highlighted card rather than a glowing-on-black card.
5. **Scope/pace:** Full rebuild in one pass (tokens → gradients → atmosphere → components).
6. **Stars:** Remove the literal starfield entirely; carry the "glow" with warm gold halo gradients.
7. **Footer anchor:** Keep the **Footer** as a deeper/darker "anchor" band for contrast — the rest of
   the page is white. (One intentional darker moment so the white page doesn't feel flat.)

## Non-goals (YAGNI)

- No light/dark toggle UI.
- No new content/copy changes in `content.ts` (words stay; only styling changes).
- No tokenizing of spacing/radius/shadow arbitraries (out of scope).
- No change to the gold brand hue family itself — only *which* shade is used where.

## Constraints (from AGENTS.md / CLAUDE.md)

- **No inline `style=`** (except the existing noise data-URI in `Background.astro`).
- **All literal values live in `tokens/tokens.css`.** `global.css` stays reference-only
  (`@theme inline` + `@utility`, `var()` refs + keyframes only). Components reference utilities.
- Never write `*/` inside a `global.css` comment.
- Verify with `npm run build` (no test suite) + visual check of `dist/`.

## Current-state findings (why this is a real sweep, not a one-liner)

- `BaseLayout.astro:103` forces `<html data-theme="dark">`. The default `:root` in `tokens.css`
  is **already a light semantic map** (white surfaces, `neutral-950` text, `gold-800` brand text).
- The "moonlight" look is **hardcoded dark** and does NOT flip with the theme attribute:
  - Background/scene gradients in `tokens.css`: `--gradient-app`, `--gradient-screen`,
    `--gradient-phone-a/-b`, `--gradient-shift`, `--gradient-cta-card`, `--gradient-card-feature`,
    `--gradient-panel-soft(-25)`, the `--gradient-glow-*` halos, `--gradient-moon`, `--gradient-moonbeam`.
  - **Glass** primitives are white-alpha (`--glass-3..25`) — invisible on white. Used in:
    Hero, Transformation, Curriculum, Footer, HowItWorks, Pricing, WaitlistForm, Features.
  - **Starfield**: 90 light dots built by the script in `BaseLayout.astro`; `bg-glow-moon` in
    `Background.astro`. Both designed for a dark sky.
  - **Dark-tuned text primitives** (`text-neutral-300..700`, `text-gold-200`) used in nearly every
    component — these are blue-grays chosen to read on dark.

## Approach

**Token-first rebuild.** Do the work in `tokens.css` (single source of truth) so the system stays
coherent, then sweep components to use **semantic** tokens (which flip) instead of dark-only
**primitives** wherever a primitive is the reason something looks wrong on white.

### 1. Theme flip
- `BaseLayout.astro`: change `data-theme="dark"` → `data-theme="light"` (explicit light lock so OS
  dark-mode preference can't override the brand on a light-only site).
- Update `site.themeColor` / `<meta name="theme-color">` to a light value.

### 2. Rebuild hardcoded gradients in `tokens.css` (daytime versions)
- `--gradient-app`: soft white → warm cream with a high warm-gold "sunrise" halo (replaces the
  moon-from-the-dark radial).
- `--gradient-glow-hero/-moon/-spot/-cta`: warm gold halos tuned for white (lower alpha, no dark base).
- `--gradient-screen`, `--gradient-phone-a/-b`: light device/screen surfaces.
- `--gradient-shift`: light "dawn" sweep (pale → warm) instead of dark → blue.
- `--gradient-cta-card`, `--gradient-card-feature`, `--gradient-premium`, `--gradient-panel-soft(-25)`,
  `--gradient-banner-gold`: light card surfaces with gold warmth.
- `--gradient-moon`/`--gradient-moonbeam`: keep gold but ensure they read on light.
- Gold text gradient `--gradient-gold-text`: shift toward `gold-600/700` so gold *text* stays legible.

### 3. Deepen gold usage
- Primary gold **text**/labels → `content-brand` (already `gold-800`) or `gold-700`.
- Gold **fills** (buttons, tabs, tiles, halos) keep `gold-400/500` gradients.
- Audit button label contrast: gold-fill buttons keep dark `neutral-950` label (already
  `content-on-brand`); ghost/gold-text buttons use deepened gold.

### 4. Daytime atmosphere (replace starfield + moon glow)
- `BaseLayout.astro` script: **remove the 90-star generator** (and the `#ly-stars` host usage) —
  no literal stars. Rely on soft warm gold halo gradients for the "glow."
- `Background.astro`: remove the `#ly-stars` layer + swap `bg-glow-moon` for a warm daytime halo;
  keep the (very subtle) grain.

### 5. Reframe the Transformation section
- `Transformation.astro`: panel uses a light "dawn" surface (`bg-shift` rebuilt light). The
  "In the dark" card becomes a muted/neutral light card; the "By moonlight" card becomes the warm
  gold-highlighted card. Text colors move from light-on-dark primitives to semantic content tokens.
  The moon + moonbeam stay gold but tuned for light. Copy in `content.ts` is unchanged.

### 6. Component sweep
For each component, replace dark-only primitives with semantic/light equivalents:
- `bg-glass-*` / `border-glass-*` → light card surfaces (`bg-surface-secondary/-tertiary`,
  `border-border-subtle/-strong`) or, where a translucent look is wanted, new **light glass**
  values (dark-alpha) added to `tokens.css`.
- `text-neutral-300..700` → `text-content-secondary/-tertiary` (semantic, flips) or appropriate
  light neutral.
- `text-gold-200` → deepened gold (`text-content-brand` / `gold-700`).
- Verify each section's contrast on white.

Components to sweep (all use dark-only styling): Nav, Hero, Problem, Transformation, HowItWorks,
Features, Curriculum, Pricing, Faq, FinalCTA, Footer, WaitlistForm, Background.

**Footer is the exception:** keep it as a deep dark "anchor" band. It retains a dark surface +
light-on-dark text (its current treatment largely works); just ensure it reads as an intentional
contrast band against the white page above it, and that its waitlist/links still pass contrast.

### 7. Form success/error inline colors
- `BaseLayout.astro` `showSuccess`/`showError` build inline-styled chips with hardcoded colors and a
  `dark` flag from `form.dataset.theme`. Update so the light theme path renders readable success/error
  states on white. (These inline styles are inside the client `<script>` string, which is the
  sanctioned exception — but values should still match the token palette.)

## Risks / tradeoffs

- **Loss of "night-sky glow" distinctiveness.** Acknowledged with the user; accepted.
- **Large diff** — most components change. Mitigated by doing token work first so component edits are
  mostly find-and-replace of primitives → semantic tokens, verified section by section.
- **Contrast regressions** — gold-on-white and pale text are the main hazards. Mitigated by deepening
  gold and using semantic content tokens; spot-check each section visually + against WCAG AA for body text.
- **`data-theme="dark"` map left in place** — fine; it's dormant and documented.

## Verification

1. `npm run build` succeeds (watch for Tailwind parse warnings / `*/`-in-comment).
2. `npm run preview` (or screenshot `dist/`) and visually check **every** section on white:
   Nav → Hero → Problem → Transformation → HowItWorks → Features → Curriculum → Pricing → Faq →
   FinalCTA → Footer.
3. Confirm: no element relies on a dark background to be visible; gold text is legible; buttons have
   adequate contrast; the form success/error states read on white.
4. Grep check: no new inline `style=` in components; no literal hex added outside `tokens.css`.

## Resolved questions

- **Stars:** Removed entirely; glow carried by warm gold halo gradients. ✓
- **Darker anchor:** Footer stays dark as the single intentional contrast band; everything else white. ✓
