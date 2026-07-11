# La Yaung Hub — SEO/GEO Round 2 + Burmese Typography (deep research)

*Date: 2026-07-11. Follow-up to `2026-07-11-seo-geo-research-myanmar.md`. Sources fetched: 15;
50 claims extracted, 22 confirmed via 3-vote adversarial verification, 3 killed. Claims flagged
**[weakened]** were partly refuted — treat with caution.*

---

## TL;DR

1. **The Burmese clipping is a CSS/line-height problem, not a font-quality problem.** Keep
   **Noto Sans Myanmar** (best weight range + Google-hosted + correctly shaped) and fix the CSS:
   raise line-height for all Burmese text, kill synthetic italic, and give the tight display
   headings room. Padauk is a fine alternative aesthetically but ships **only Regular/Bold**
   (its "range of weights" was strongly refuted), so it's worse for a multi-weight marketing site.
2. **The biggest SEO/GEO lever you're missing is content velocity + answer-first formatting.**
   50% of content cited in AI answers is < 13 weeks old — a steady stream of fresh, question-shaped,
   stat-backed pages is what earns AI Overview / ChatGPT / Perplexity citations. (The blog now being
   built is exactly the right vehicle.)

---

## PART A — Next-level SEO & GEO

### A1. Content freshness & velocity (highest impact)
- **50% of content cited in AI answers is less than 13 weeks old** — content velocity and regular
  updates directly drive citation rates. [frase]
- Publish/refresh on a cadence; date-stamp and genuinely update the GED guides each term. A blog
  gives you the velocity surface.

### A2. GEO formatting — how to get cited by ChatGPT / AI Overviews / Perplexity
- **Answer-first:** put the direct answer to the page's main question in the **first 40–60 words**,
  with self-contained H2 sections readable in isolation — AI engines extract single passages. [frase, geoptie]
- **Cite authoritative sources, add expert quotations, and include statistics** — these correlate
  with materially higher AI-citation frequency. **[weakened]** the specific "+40% (Princeton)" figure
  was refuted, but the three tactics themselves survived verification. [geoptie]
- **Fact density:** aim for ~1 cited statistic per 150–200 words (≈15–20 data points in a 3,000-word
  piece). [geoptie]
- **Target conversational + "vs" queries:** AI queries average ~23 words vs ~4 for classic search;
  comparison and question phrasing win. Your *GED vs IGCSE vs matriculation* page is the model. [frase]
- **Schema** (Article/FAQ/HowTo) isn't a ranking factor by itself but helps AI resolve ambiguity —
  you already have it; keep it accurate. [frase]

### A3. Query strategy — go mid-funnel
- Google now answers pure informational questions directly with **AI Overviews**, and education sites
  relying only on top-of-funnel info content are seeing **unrecoverable traffic losses**. [ahrefs]
- Shift some content to **mid-funnel decision-support** queries, e.g. *"Is the GED or matriculation
  better for a Myanmar student who wants to study abroad?"*, *"Can I get into university with a GED
  in Myanmar?"* — these build brand and move searchers toward a decision. [ahrefs]

### A4. Multilingual SEO (bilingual Burmese specifics)
- **Do Burmese keyword research from scratch** — don't translate an English keyword list; intent and
  phrasing don't map across languages. [gatilab]
- **Never ship unreviewed machine translation** — Google explicitly penalizes it; the March 2024 core
  update flagged bulk-translated sites. Your `/my/` copy is human-written, which is the right call. [gatilab]
- **Hreflang must be bidirectional** (each page references itself + every alternate) with **x-default**;
  for 50+ pages, **sitemap-based hreflang** is more maintainable than head tags. You already emit both;
  as the blog grows past ~50 URLs, lean on the sitemap alternates. [gatilab]
- **Subfolders (`/my/`) consolidate domain authority** vs subdomains/ccTLDs — you're already correct. [gatilab]
- Check **Google Search Console → International Targeting** weekly during rollout; it surfaces hreflang
  errors within ~48h. [gatilab]

### A5. Authority & backlinks (Myanmar education niche)
- Education naturally attracts high-quality links (.edu/.gov, nonprofits, research, **local news**,
  press, **student success stories**) — lean into news angles and partnerships. [ahrefs]
- Build presence on **authority platforms (Wikipedia, Reddit, Quora, industry pubs)** and earn links
  from high-authority domains — both strengthen AI-citation likelihood. [geoptie]

### A6. Technical hygiene first
- Before advanced tactics: fix 404s, add internal links to orphan pages, clean URL structure, remove
  duplicate content. [ahrefs] (You're in good shape; re-audit as the blog adds pages.)

---

## PART B — Burmese (Myanmar Unicode) typography

### B1. Why it clips (root cause — confirmed)
- Clipping happens when the CSS **line-height (virtual area) is smaller than the font's content-area**
  (defined by the font's **ascender + descender** metrics), so `line-height: 1` commonly clips/overflows. [iamvdo]
- A font's rendered box height comes from its **ascent/descent ratio, not the `font-size` value** — the
  *same* font-size renders taller in fonts with big ascenders/descenders. Burmese fonts have tall metrics
  to fit stacked vowels/medials/tone marks, so tight Latin-tuned leadings clip them. [iamvdo]
- ~95% of fonts have `line-height: normal` > 1; forcing it below that clips. [iamvdo]
- A Burmese syllable is **multiple code points stacked in a precise arrangement**; when the line-box is
  too short (or shaping fails) you get misplaced diacritics and clipped characters. [1stopasia]

### B2. Font choice — recommendation: **keep Noto Sans Myanmar**, fix the CSS
- **Noto Sans Myanmar** — Google-hosted, **9 weights (100–900)**, full Unicode Myanmar, correct shaping.
  Best fit for a multi-weight marketing site. *(You already load 400/500/600/700.)*
- **Padauk** (SIL, OFL) — full Unicode 16.0 Myanmar, correct OpenType vowel/medial shaping, 40+
  languages. **But [weakened]: it ships essentially Regular + Bold only** — its "range of weights" claim
  was strongly refuted (0-3). Good for a traditional/textbook look; weak for varied display weights. [fonts.google/Padauk]
- **Pyidaungsu / Myanmar Text** — Wikipedia's production Myanmar stack actually *leads* with these over
  Noto, but they are **not on Google Fonts** (Pyidaungsu is the govt font; Myanmar Text is a Windows
  system font) → you'd have to self-host Pyidaungsu for consistent cross-platform rendering. [wikipedia]
- Note: Wikipedia sets Myanmar `line-height: 100%` — but that's dense body text in Pyidaungsu, whose
  metrics differ; for a marketing site with large gradient headings, **more** leading is correct. [wikipedia]
- **Verdict:** the font isn't the problem. Keep Noto Sans Myanmar. Offer Padauk only if you want a
  different aesthetic and can live with 2 weights.

### B3. The fix (CSS best practices — confirmed)
- **Scope a Burmese font stack + spacing via `:lang(my)` / `html[lang="my"]`** — the confirmed per-script
  approach (Wikipedia uses a `.script-myanmar` class exactly this way). [wikipedia, developerux]
- **Raise line-height for Burmese.** Complex scripts need more leading than Latin (~1.8 vs ~1.5 rule of
  thumb); use `:lang()` to bump it. [developerux]
- **Give tight display headings room** — `leading-100`–`leading-106` is the direct cause of clipped
  Burmese headings and gradient-clipped highlight words. Raise to ~1.4–1.5 for `html[lang="my"]` headings.
- **`font-style: normal` for Burmese** — Burmese has no italic; synthetic slant distorts and clips
  (e.g. the `italic text-gold` highlight in `Problem.astro`).
- **Avoid negative/tight letter-spacing on Burmese** — it collides stacked marks.
- Native `text-box: trim-both` (font-metric trimming) is coming but **not yet universal** — use
  line-height now, not JS cropping. [smashing/native-trim]
- Keep `display=swap` on the Google Fonts link (already set) for load performance.

### B4. Concrete patch (proposed, scoped to `html[lang="my"]`)
```css
/* All Burmese text: lead with Noto Sans Myanmar, taller line-height, no italic */
html[lang="my"] {
  font-family: 'Noto Sans Myanmar', 'Poppins', system-ui, sans-serif;
  line-height: 1.7;
}
html[lang="my"] em, html[lang="my"] i, html[lang="my"] .italic { font-style: normal; }

/* Display headings: enough room for stacked marks + gradient-clip highlights */
html[lang="my"] h1, html[lang="my"] h2, html[lang="my"] h3 {
  line-height: 1.5;            /* was 1.4 */
  letter-spacing: normal;      /* undo tracking-snug etc. */
}
```
Applies only on `/my/`; English rendering is untouched. (Values live in tokens; utilities reference them.)

---

## Prioritized action list

**Do now (cheap, high impact)**
1. Ship the Burmese `:lang(my)` typography fix (B4) — fixes the visible clipping. *(code)*
2. Rewrite guide/blog intros **answer-first** (direct answer in first 40–60 words). *(content)*
3. Add 1 cited stat / 150–200 words + an expert quote to each guide; keep dates fresh. *(content)*

**Do soon**
4. Publish the blog on a cadence (content velocity for AI citation). *(the in-progress blog)*
5. Add 2–3 **mid-funnel** comparison/decision pages (GED vs matriculation for study-abroad, etc.). *(content)*
6. Weekly GSC International Targeting check; keep sitemap hreflang as the blog scales past ~50 URLs. *(ops)*

**Ongoing**
7. Backlinks: Myanmar education directories, local-news angles, student success stories, Reddit/Quora presence. *(offsite)*

---

### Sources
- geoptie.com/blog/generative-engine-optimization *(GEO tactics; "+40%" figure weakened)*
- frase.io/blog/what-is-generative-engine-optimization-geo *(answer-first, freshness, query length)*
- ahrefs.com/blog/education-seo *(mid-funnel, AI-Overview traffic loss, education backlinks)*
- gatilab.com/seo-translation *(multilingual keyword research, hreflang, MT penalty)*
- iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align *(line-height vs content-area)*
- 1stopasia.com/blog/burmese-production-guardrails-script-rendering *(Burmese shaping/clipping)*
- en.wikipedia.org/wiki/Template:Script/styles_myanmar.css *(production Myanmar font stack + :lang scoping)*
- fonts.google.com/specimen/Padauk *(Padauk coverage; weight-range claim refuted)*
- developerux.com/2025/03/07/typography-challenges-in-multilingual-design *(per-lang line-height)*
- seek-oss.github.io/capsize, eightshapes cropping *(font-metric trimming background)*
