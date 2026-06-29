# Light Theme Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert La Yaung Hub from the locked dark "moonlit-blue" theme to a full light/white theme with a deepened gold accent, a daytime glow motif (no stars), a reframed Transformation section, and the Footer retained as the single dark anchor band.

**Architecture:** Token-first. Rebuild the hardcoded dark gradients and flip the active theme in `tokens/tokens.css` + `BaseLayout.astro` (the single source of truth), then sweep each component to use semantic tokens (which flip light/dark) instead of dark-only primitives. The Footer keeps the dark look by carrying its own `data-theme="dark"` subtree, reusing the existing dark semantic map.

**Tech Stack:** Astro 5, Tailwind CSS v4, two-tier CSS-custom-property design tokens, inline Lineicons. Static build to `dist/`.

## Global Constraints

- No inline `style=` attributes in components (only sanctioned exception: the noise data-URI in `Background.astro` and the inline-styled strings inside the `BaseLayout.astro` client `<script>`).
- All literal values (hex/px/gradient) live in `tokens/tokens.css`. `global.css` stays reference-only (`@theme inline` + `@utility`, `var()` refs + keyframes only). Components reference utilities only.
- Never write the sequence `*/` inside a `global.css` comment.
- Node 20+. Verification = `npm run build` succeeds (no test suite) + visual check of `dist/` via `npm run preview` or a headless screenshot.
- Do not change copy in `src/data/content.ts` (words stay; styling only).
- Keep gold as the brand hue; only change *which shade* is used where (deepen for text on white).
- Do not commit/push unless the user asks. (Repo rule in AGENTS.md overrides the skill's commit steps — each task below describes a commit, but get user confirmation before actually committing.)

## File Structure

- `tokens/tokens.css` — rebuild the hardcoded dark gradients as daytime versions; gold-text gradient deepened. (Largest change.)
- `src/layouts/BaseLayout.astro` — flip `data-theme` to light; remove starfield generator; update `theme-color`; fix form success/error inline colors for light.
- `src/components/Background.astro` — remove `#ly-stars` layer; swap moon glow for a warm daytime halo.
- `src/components/Footer.astro` — add `data-theme="dark"` to its root so it stays the dark anchor.
- `src/components/Transformation.astro` — reframe panel/cards for a light "dawn" surface.
- `src/components/{Nav,Hero,Problem,HowItWorks,Features,Curriculum,Pricing,Faq,FinalCTA,WaitlistForm}.astro` — sweep dark-only primitives → semantic/light tokens.

## Token reference — primitives available (do not invent new hex unless added here)

Gold: `gold-50 #FFF9E8 … gold-400 #FFD66B, gold-500 #FFD15E, gold-600 #F0A93A, gold-700 #CC861F, gold-800 #9C6618, gold-900 #6E460F`.
Neutral: `neutral-0 #FFFFFF, -50 #EDF1FF, -100 #DBE2F5, -200 #BEC8E6, -700 #5C6890, -950 #0A1330`.
Semantic light (active `:root`): `surface-primary=neutral-0`, `surface-secondary=neutral-50`, `surface-tertiary=neutral-100`, `content-primary=neutral-950`, `content-secondary=neutral-700`, `content-tertiary=neutral-600`, `content-brand=gold-800`, `border-subtle=neutral-200`, `border-strong=neutral-300`, `border-interactive=gold-400`.

---

### Task 1: Rebuild hardcoded gradients as daytime versions in `tokens.css`

**Files:**
- Modify: `tokens/tokens.css:95-120` (the `/* Gradients */` block)

**Interfaces:**
- Produces: same gradient variable NAMES (`--gradient-app`, `--gradient-glow-*`, `--gradient-screen`, `--gradient-phone-a/-b`, `--gradient-shift`, `--gradient-cta-card`, `--gradient-card-feature`, `--gradient-premium`, `--gradient-panel-soft(-25)`, `--gradient-banner-gold`, `--gradient-moon`, `--gradient-moonbeam`, `--gradient-gold-text`) with new light values. All component utilities (`bg-app`, `bg-glow-*`, `bg-screen`, `bg-phone-*`, `bg-shift`, `bg-cta-card`, `bg-card-feature`, `bg-premium`, `bg-panel-soft*`, `bg-banner-gold`, `bg-moon`, `bg-moonbeam`, `text-gold`) keep working unchanged.

- [ ] **Step 1: Replace the daytime-affected gradient values.** In `tokens/tokens.css`, change these lines (keep every other gradient as-is):

```css
  --gradient-gold-text:linear-gradient(100deg, #E0A53A, #CC861F 45%, #9C6618);
  --gradient-icon-soft:linear-gradient(135deg, rgba(240,169,58,0.20), rgba(240,169,58,0.06));
  --gradient-card-feature:linear-gradient(135deg, rgba(255,244,216,0.85), rgba(255,255,255,0.6));
  --gradient-banner-gold:linear-gradient(100deg, rgba(240,169,58,0.12), rgba(240,169,58,0.03));
  --gradient-premium:linear-gradient(165deg, rgba(255,214,107,0.22), rgba(255,247,230,0.65));
  --gradient-cta-card:linear-gradient(150deg, #FFFDF8 0%, #FFF4D8 58%, #FFE7B5 100%);
  --gradient-panel-soft:linear-gradient(180deg, rgba(255,244,216,0.5), rgba(255,255,255,0.32));
  --gradient-panel-soft-25:linear-gradient(180deg, rgba(255,244,216,0.5), rgba(255,255,255,0.4));
  /* "Light from above" — warm sunrise halo breaking into a clear white sky */
  --gradient-app:radial-gradient(120% 85% at 50% -12%, #FFF3D6 0%, #FFFBF2 34%, #FFFFFF 62%, #FCFDFF 84%);
  --gradient-screen:radial-gradient(120% 90% at 30% 20%, #FFFDF8, #FFF3D6 70%);
  --gradient-glow-hero:radial-gradient(circle, rgba(240,169,58,0.20), rgba(240,169,58,0.05) 55%, transparent 72%);
  --gradient-glow-moon:radial-gradient(circle, rgba(240,169,58,0.18), rgba(240,169,58,0.05) 45%, transparent 70%);
  --gradient-glow-spot:radial-gradient(circle at 75% 30%, rgba(240,169,58,0.26), transparent 45%);
  --gradient-glow-cta:radial-gradient(circle at 80% 0%, rgba(240,169,58,0.14), transparent 45%);
  --gradient-phone-a:linear-gradient(180deg, #FFFFFF, #FFF8E9);
  --gradient-phone-b:linear-gradient(180deg, #FFFDF8, #FFF1D2);
  /* "The shift" — a light dawn sweep from white into warm gold */
  --gradient-shift:linear-gradient(105deg, #FFFFFF 0%, #FFF6E2 50%, #FFE7B5 100%);
  --gradient-moonbeam:linear-gradient(90deg, rgba(240,169,58,0), #F0A93A);
```

Leave `--gradient-gold`, `--gradient-gold-bar`, `--gradient-gold-tab`, `--gradient-gold-tile`, and `--gradient-moon` unchanged (they are gold-on-gold fills/discs that read fine on white).

- [ ] **Step 2: Build to verify the token file still parses.**

Run: `npm run build`
Expected: build succeeds, no Tailwind "Unexpected token" warning.

- [ ] **Step 3: Commit.**

```bash
git add tokens/tokens.css
git commit -m "feat(theme): rebuild hardcoded gradients as daytime/light versions"
```

---

### Task 2: Flip the active theme to light + update theme-color

**Files:**
- Modify: `src/layouts/BaseLayout.astro:103` (the `<html>` tag) and the `theme-color` source
- Modify (if needed): `src/data/content.ts` `site.themeColor`

**Interfaces:**
- Consumes: the light semantic map already present as default `:root` in `tokens.css`.
- Produces: page now renders with light semantic tokens globally; the dark map remains available via `[data-theme="dark"]` for the Footer subtree (Task 5).

- [ ] **Step 1: Change the html theme lock.** In `src/layouts/BaseLayout.astro`, change `<html lang="en" data-theme="dark">` to `<html lang="en" data-theme="light">` and update the adjacent comment to read that light is now the active brand map and the dark map is used for the Footer anchor.

- [ ] **Step 2: Update theme-color.** Inspect `site.themeColor` in `src/data/content.ts`. If it is a dark hex, change it to a light brand value `#FFFBF2` (warm white). This is content/config, allowed.

- [ ] **Step 3: Build + screenshot.**

Run: `npm run build && npm run preview` (then screenshot `http://localhost:4321` headless, full page).
Expected: build succeeds. Page background is now light (warm-white sunrise halo at top). Most text/cards will still look dark-tuned and wrong — that is expected; later tasks fix them. Confirm the page is NOT a black background anymore.

- [ ] **Step 4: Commit.**

```bash
git add src/layouts/BaseLayout.astro src/data/content.ts
git commit -m "feat(theme): activate light theme as the brand default"
```

---

### Task 3: Remove the starfield (daytime — no literal stars)

**Files:**
- Modify: `src/components/Background.astro` (remove the `#ly-stars` div; keep grain; moon-glow halo stays but now resolves to the warm daytime halo from Task 1)
- Modify: `src/layouts/BaseLayout.astro` (remove the `buildStars()` function + its call)

**Interfaces:**
- Consumes: nothing new.
- Produces: no `#ly-stars` element and no star-generation script remain. The "glow" is carried entirely by `--gradient-glow-*` halos.

- [ ] **Step 1: Remove the stars host in `Background.astro`.** Delete the line `<div id="ly-stars" class="absolute inset-0 pointer-events-none z-0"></div>`. Keep the grain `<div>` and the moon-glow `<div ... class="... bg-glow-moon">` (it now renders a soft warm halo).

- [ ] **Step 2: Remove the starfield script in `BaseLayout.astro`.** Delete the entire `// ===== Starfield ===` `buildStars()` function (the `function buildStars() { … }` block) and the `buildStars();` call near the bottom of the `<script>`. Leave `initReveal();` and the form `addEventListener` lines intact.

- [ ] **Step 3: Build + screenshot.**

Run: `npm run build && npm run preview` (screenshot).
Expected: build succeeds; no console errors; no star dots anywhere; the hero still has a soft warm halo. Grep check: `grep -rn "ly-stars\|buildStars" src/` returns nothing.

- [ ] **Step 4: Commit.**

```bash
git add src/components/Background.astro src/layouts/BaseLayout.astro
git commit -m "feat(theme): remove starfield in favor of daytime gold halos"
```

---

### Task 4: Component sweep — primitive → semantic token mapping (per section, in page order)

Sweep these components **one at a time, building + screenshotting after each** so contrast regressions are caught per section. Apply this mapping in each file (find the dark-only utility, replace with the light/semantic one):

| Dark-only utility (find) | Light replacement (use) |
|---|---|
| `bg-glass-3 / -5 / -6 / -7 / -8` (card fill) | `bg-surface-secondary` (or `bg-surface-tertiary` for a slightly deeper card) |
| `bg-glass-9 / -10 / -12 / -18 / -20 / -25` | `bg-surface-tertiary` |
| `border-glass-3..25` | `border-border-subtle` (or `border-border-strong` for emphasis) |
| `text-neutral-300 / -400 / -500` | `text-content-secondary` |
| `text-neutral-600 / -650 / -700` | `text-content-tertiary` |
| `text-neutral-50 / -100 / -200` (was primary light text) | `text-content-primary` |
| `text-gold-200` | `text-content-brand` (gold-800) |
| ghost/outline button gold text | `text-content-brand` |
| any `text-white` body text | `text-content-primary` |

Keep gold FILL surfaces (`bg-gold`, `bg-surface-brand`, `bg-gold-bar/-tab/-tile`, `bg-premium`, `bg-banner-gold`, `bg-cta-card`) and their dark on-brand labels (`text-content-on-brand` = neutral-950) as-is — they read on white.

Use `grep -n "glass-\|text-neutral-\|text-gold-200\|text-white" src/components/<File>.astro` to locate every occurrence in the file before editing.

#### Task 4a: Nav

**Files:** Modify `src/components/Nav.astro`

- [ ] **Step 1:** Grep the file for dark-only utilities; apply the mapping table. Pay attention to the sticky nav background (a `bg-glass-*` blur bar): set it to a translucent light bar — `bg-surface-primary/80` with `border-border-subtle`.
- [ ] **Step 2: Build + screenshot.** Run `npm run build && npm run preview`. Expected: build succeeds; nav bar reads as a light translucent bar; logo + links legible; gold CTA button still gold with dark label.
- [ ] **Step 3: Commit.** `git add src/components/Nav.astro && git commit -m "feat(theme): light Nav"`

#### Task 4b: Hero

**Files:** Modify `src/components/Hero.astro`

- [ ] **Step 1:** Apply mapping. Hero uses glass cards + neutral text + likely `bg-phone-*`/`bg-screen` (now light). Ensure headline uses `text-content-primary`, sub-copy `text-content-secondary`, eyebrow/gold uses `text-content-brand`. Phone mock screens now light — verify their inner text contrasts.
- [ ] **Step 2: Build + screenshot.** Expected: hero headline dark on white, gold accent legible (deepened), phone mock readable, CTA button gold.
- [ ] **Step 3: Commit.** `git add src/components/Hero.astro && git commit -m "feat(theme): light Hero"`

#### Task 4c: Problem

**Files:** Modify `src/components/Problem.astro`

- [ ] **Step 1:** Apply mapping (this file uses neutral text primitives). Problem "pain point" cards → `bg-surface-secondary` + `border-border-subtle`, text → content tokens.
- [ ] **Step 2: Build + screenshot.** Expected: cards visible on white with subtle borders; text legible.
- [ ] **Step 3: Commit.** `git add src/components/Problem.astro && git commit -m "feat(theme): light Problem"`

#### Task 4d: HowItWorks

**Files:** Modify `src/components/HowItWorks.astro`

- [ ] **Step 1:** Apply mapping (glass + neutral). Step number tiles: keep gold tile fills; surrounding cards → light surfaces.
- [ ] **Step 2: Build + screenshot.** Expected: numbered steps legible; gold tiles pop on white.
- [ ] **Step 3: Commit.** `git add src/components/HowItWorks.astro && git commit -m "feat(theme): light HowItWorks"`

#### Task 4e: Features

**Files:** Modify `src/components/Features.astro`

- [ ] **Step 1:** Apply mapping. Feature cards use `bg-card-feature` (now light from Task 1) + glass + neutral text → content tokens. Icon soft backgrounds (`bg-icon-soft`) now light-warm.
- [ ] **Step 2: Build + screenshot.** Expected: feature cards visible with warm tint; icons + titles legible.
- [ ] **Step 3: Commit.** `git add src/components/Features.astro && git commit -m "feat(theme): light Features"`

#### Task 4f: Curriculum (incl. Subjects)

**Files:** Modify `src/components/Curriculum.astro`

- [ ] **Step 1:** Apply mapping (glass + neutral, `text-gold-200`). Track tabs (`bg-gold-tab`) stay gold; subject tiles → light surfaces with subtle borders.
- [ ] **Step 2: Build + screenshot.** Expected: track switcher legible; subject grid readable on white.
- [ ] **Step 3: Commit.** `git add src/components/Curriculum.astro && git commit -m "feat(theme): light Curriculum"`

#### Task 4g: Pricing

**Files:** Modify `src/components/Pricing.astro`

- [ ] **Step 1:** Apply mapping. Free card → `bg-surface-secondary`; Premium card uses `bg-premium`/`bg-cta-card` (now light) — keep it as the highlighted warm card; ensure its text uses `text-content-primary/-secondary` (NOT light-on-dark) now that the card is light. Check the price stat + feature checkmarks contrast.
- [ ] **Step 2: Build + screenshot.** Expected: both pricing cards legible; Premium still visually elevated via warm gold tint + border-interactive.
- [ ] **Step 3: Commit.** `git add src/components/Pricing.astro && git commit -m "feat(theme): light Pricing"`

#### Task 4h: Faq

**Files:** Modify `src/components/Faq.astro`

- [ ] **Step 1:** Apply mapping. `<details>` rows → `border-border-subtle`, question text `text-content-primary`, answer `text-content-secondary`.
- [ ] **Step 2: Build + screenshot.** Expected: FAQ accordions legible; dividers visible on white.
- [ ] **Step 3: Commit.** `git add src/components/Faq.astro && git commit -m "feat(theme): light Faq"`

#### Task 4i: FinalCTA

**Files:** Modify `src/components/FinalCTA.astro`

- [ ] **Step 1:** Apply mapping. FinalCTA uses `bg-cta-card` (now light) + neutral text + a `WaitlistForm`. Convert headline/sub-copy to content tokens. NOTE: the waitlist form here passes `data-theme` — see Task 6 for the form-state colors.
- [ ] **Step 2: Build + screenshot.** Expected: CTA band reads as a warm light card with legible headline + gold button.
- [ ] **Step 3: Commit.** `git add src/components/FinalCTA.astro && git commit -m "feat(theme): light FinalCTA"`

#### Task 4j: WaitlistForm

**Files:** Modify `src/components/WaitlistForm.astro`

- [ ] **Step 1:** Apply mapping. The email input uses glass bg + light border → `bg-surface-primary` + `border-border-strong` + `text-content-primary` + placeholder `text-content-tertiary`. Submit button stays gold fill with dark label.
- [ ] **Step 2: Build + screenshot.** Expected: input field visible on white (clear border), typed text dark, button gold. (Both hero + final-CTA instances.)
- [ ] **Step 3: Commit.** `git add src/components/WaitlistForm.astro && git commit -m "feat(theme): light WaitlistForm"`

---

### Task 5: Reframe the Transformation section + lock Footer as the dark anchor

**Files:**
- Modify: `src/components/Transformation.astro`
- Modify: `src/components/Footer.astro`

**Interfaces:**
- Consumes: `--gradient-shift` (now a light dawn sweep from Task 1), `[data-theme="dark"]` map (existing) for the Footer subtree.
- Produces: Transformation renders on a light dawn panel; Footer renders dark via its own subtree theme.

- [ ] **Step 1: Reframe Transformation cards.** In `src/components/Transformation.astro`:
  - The panel already uses `bg-shift` (now light) — keep it.
  - "In the dark" card: change `border-glass-8 bg-glass-3` → `border-border-subtle bg-surface-secondary`; the heading `text-neutral-400` → `text-content-tertiary`; the items `text-neutral-500` / `text-neutral-600` markers → `text-content-tertiary` / `text-content-secondary`. Make it read as the muted/neutral side.
  - "By moonlight" card: keep `border-border-interactive/[0.35] bg-surface-brand/[0.08]` (warm highlighted card on light works); change `text-gold-200` heading → `text-content-brand`; items `text-neutral-200` → `text-content-primary`; keep `text-content-brand` markers.
  - The eyebrow `text-gold-200` → `text-content-brand`; `text-neutral-400` decorative → `text-content-tertiary`.
  - Keep the gold `bg-moon` disc + `bg-moonbeam` (now tuned for light) and the gold heading span (`text-gold`).
- [ ] **Step 2: Build + screenshot Transformation.** Expected: light dawn panel, neutral "in the dark" card vs warm gold "by moonlight" card, gold moon + beam visible, all text legible. The emotional before/after contrast still reads.
- [ ] **Step 3: Lock the Footer dark.** In `src/components/Footer.astro`, add `data-theme="dark"` to the root `<footer>` element so its descendants resolve the dark semantic map. Verify the footer's existing classes (glass/neutral/gold-200) now read correctly on dark again; leave them as-is where they do. Ensure the boundary between the white page and the dark footer is a clean edge (no leftover light border bleeding).
- [ ] **Step 4: Build + screenshot Footer.** Expected: footer is a dark anchor band at the bottom of an otherwise white page; footer links, waitlist text, and gold accents legible on dark.
- [ ] **Step 5: Commit.**

```bash
git add src/components/Transformation.astro src/components/Footer.astro
git commit -m "feat(theme): reframe Transformation for light + lock Footer as dark anchor"
```

---

### Task 6: Fix the form success/error inline colors for the light theme

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (the `showSuccess` and `showError` functions in the client `<script>`)

**Interfaces:**
- Consumes: `form.dataset.theme` ('dark' for the footer/dark form instance, otherwise light).
- Produces: success/error chips that read on a white background for the light form instances; the dark Footer form instance keeps its dark-readable chip.

- [ ] **Step 1: Update `showSuccess` light branch.** The function already branches on `dark`. The light branch currently uses `#BFE9CF` text on `rgba(58,209,122,0.1)` — too pale on white. Change the light (non-dark) branch to readable values: text `#14773F` (green-700), background `rgba(34,183,101,0.12)`, border `rgba(34,183,101,0.35)`. Keep the dark branch as-is.

```js
form.innerHTML = '<div style="display:flex; align-items:center; gap:10px; font-family:Hanken Grotesk; font-size:15.5px; color:' + (dark ? '#0A1030' : '#14773F') + '; font-weight:600; background:' + (dark ? 'rgba(10,16,48,0.12)' : 'rgba(34,183,101,0.12)') + '; border:1px solid ' + (dark ? 'rgba(10,16,48,0.25)' : 'rgba(34,183,101,0.35)') + '; padding:15px 20px; border-radius:14px; width:100%;"><span>✓</span><span>You’re on the list! We’ll email ' + safe + ' when the beta opens.</span></div>';
```

- [ ] **Step 2: Update `showError` color.** The error text is `#FFB4B4` (designed for dark). For a light page change it to `#B91C1C` (red-700):

```js
msg.style.cssText = 'flex-basis:100%; font-family:Hanken Grotesk; font-size:13.5px; color:#B91C1C; margin-top:2px;';
```

(If the error must also serve the dark Footer form, this red-700 still reads acceptably on the dark footer; acceptable tradeoff.)

- [ ] **Step 3: Build + manual check.** Run `npm run build && npm run preview`. Submit the hero form with a test email to a throwaway/non-live target if possible, OR temporarily force `showSuccess`/`showError` to confirm rendering. Expected: success chip is green-on-white and legible; error chip red-on-white and legible. **Do not submit real data to the live Formspree endpoint.**
- [ ] **Step 4: Commit.**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat(theme): light-readable form success/error states"
```

---

### Task 7: Full-page verification pass

**Files:** none (verification only; fixes go back into the relevant component/token file)

- [ ] **Step 1: Production build.** Run `npm run build`. Expected: succeeds with no Tailwind parse warnings.
- [ ] **Step 2: Full-page screenshot.** Run `npm run preview`; capture a full-page screenshot (headless, both desktop ~1280px and mobile ~390px widths).
- [ ] **Step 3: Section-by-section contrast review.** Walk Nav → Hero → Problem → Transformation → HowItWorks → Features → Curriculum → Pricing → Faq → FinalCTA → Footer. For each confirm: (a) nothing relies on a dark background to be visible, (b) gold text is legible (deepened, passes ~AA for body-sized text), (c) buttons have adequate contrast, (d) borders/dividers are visible on white. Note any failures and fix them in the owning file (token value in `tokens.css`, or class in the component), then re-build.
- [ ] **Step 4: Hygiene greps.**
  - `grep -rn 'style="' src/components | grep -v Background.astro` → expect no new inline styles.
  - `grep -rn '#[0-9A-Fa-f]\{3,6\}' src/components` → expect no raw hex in components (Background data-URI aside).
  - `grep -rn 'ly-stars\|buildStars' src/` → expect nothing.
- [ ] **Step 5: Commit any fixes.**

```bash
git add -A
git commit -m "fix(theme): light-theme contrast + hygiene cleanup"
```

---

## Self-Review

**Spec coverage:**
- Theme flip → Task 2. ✓
- Rebuild hardcoded gradients → Task 1. ✓
- Deepen gold → Task 1 (gold-text gradient) + Task 4 mapping (`text-gold-200`→`content-brand`). ✓
- Daytime atmosphere / remove stars → Task 3. ✓
- Reframe Transformation → Task 5. ✓
- Component sweep (all 13) → Task 4 (a–j) + Transformation/Footer in Task 5 + Background in Task 3. ✓
- Footer dark anchor → Task 5. ✓
- Form inline states → Task 6. ✓
- Verification → Task 7 (+ per-task builds). ✓

**Placeholder scan:** Token values, mapping table, and inline-script edits are concrete. Component-sweep steps reference an explicit mapping table + grep rather than re-pasting each file (the actual class swaps are mechanical applications of the table, verified visually per section) — acceptable for a styling sweep with no test harness.

**Type/name consistency:** Gradient variable names unchanged (only values change), so all `bg-*`/`text-gold` utilities keep resolving. `data-theme="dark"` reuses the existing dark map block in `tokens.css` (lines 149-172). `form.dataset.theme` branch names match `BaseLayout.astro`.

**Verification model:** Each task ends with `npm run build` + visual check (no unit tests exist — substituted per AGENTS.md).
