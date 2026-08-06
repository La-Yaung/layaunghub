# GEO / AI-Search Analysis — La Yaung Hub

_Generated: 2026-08-06 · Scope: `layaunghub.com` (audited against the repo source, which is the source of truth for rendered HTML)._

> **Framing (per Google Search Central):** optimizing for AI search — AI Overviews, AI Mode, ChatGPT, Perplexity — **is still SEO**. Every finding below is an SEO fundamental applied to AI-search surfaces, not a separate discipline. Where community "GEO" lore contradicts Google's primary source (e.g. `llms.txt`, mention-farming, AI-rephrasing), this report defers to Google.

---

## 1. GEO Readiness Score: **71 / 100**

| Criterion | Weight | Score | Notes |
|-----------|:------:|:-----:|-------|
| Citability | 25% | 20/25 | Front-loaded "X is…" definitions, quotable stats (50k–150k MMK, four GED modules). Passages run long; tighten to 134–167-word self-contained blocks. |
| Structural readability | 20% | 18/20 | Clean H1→H2→H3, question-based H2s, 5 tables, 4 lists, 20 FAQ Q&As. Excellent. |
| Multi-modal | 15% | 4.5/15 | Only **1 image** across 3 guides; no diagrams, charts, or video. Biggest on-page gap. |
| Authority & brand | 20% | 9/20 | Strong Org schema + cited facts, but **no named author/Person**, **dates not machine-readable in guide schema**, and **no off-site entity presence**. |
| Technical accessibility | 20% | 19/20 | Static/SSR HTML, AI crawlers allowed, clean canonicals + sitemap, `llms.txt` present. Near-perfect. |

**Read:** the site is built right at the HTML/technical layer — the ceiling now is **authority signals (on- and off-site)** and **multi-modal**, not crawlability.

---

## 2. Platform Breakdown

| Surface | Score | Why |
|---------|:-----:|-----|
| **Google AI Overviews** | 78/100 | Strongly ranking-correlated. Good schema, structure, and definitions feed it well — depends on classic rankings holding. |
| **Google AI Mode** (Gemini 3.5 Flash) | 68/100 | Broader pool weighted to freshness + entity authority. Content is fresh (dated Jul 2026) but entity authority is thin. |
| **ChatGPT** | 52/100 | Draws heavily on Wikipedia (47.9%) + Reddit (11.3%). La Yaung has **no Wikipedia/Wikidata entity and no Reddit footprint** → low citation odds. |
| **Perplexity** | 48/100 | Reddit-dominant (46.7%). Same community-presence gap as ChatGPT. |

Only ~11% of domains are cited by both ChatGPT and Google AIO for the same query — the off-site work (§5) is what unlocks the ChatGPT/Perplexity column.

---

## 3. AI Crawler Access Status ✅

`robots.txt` explicitly **allows** the crawlers that matter for AI-search visibility:

| Crawler | Status |
|---------|:------:|
| GPTBot, OAI-SearchBot, ChatGPT-User (OpenAI) | ✅ Allow |
| ClaudeBot, anthropic-ai, Claude-Web (Anthropic) | ✅ Allow |
| PerplexityBot | ✅ Allow |
| Google-Extended (Gemini/AIO) | ✅ Allow |
| Applebot / Applebot-Extended | ✅ Allow |
| CCBot, Amazonbot, meta-externalagent | ✅ Allow |

`Sitemap: https://layaunghub.com/sitemap-index.xml` is declared. **No action needed** — this is a strength. (Bytespider/ByteDance is not listed; the global `User-agent: * Allow: /` covers it, which is fine.)

---

## 4. `llms.txt` Status — present, low weight

`/llms.txt` exists and is well-structured (title, description, sections, key facts, links). Keep it — it's harmless and tidy. **But** per primary-source evidence (Mueller, Illyes, SE Ranking 300k-domain study, OtterlyAI server-log audit), `llms.txt` is **not currently a citation lever** for any major AI-search system. Do not invest further here expecting ranking/citation lift. One upkeep note: it still lists IGCSE and Myanmar Grade 10–12 as first-class — accurate as "coming soon," so no change needed.

---

## 5. Brand Mention / Entity Presence — the highest-leverage gap

Brand mentions correlate **~3× more strongly with AI visibility than backlinks** (Ahrefs, 75k brands). Current off-site entity signals for "La Yaung Hub":

| Signal | Status | Priority |
|--------|:------:|:--------:|
| Wikipedia / Wikidata entity | ❌ none | High (ChatGPT top source) |
| Reddit presence | ❌ none | High (Perplexity #1, 46.7%) |
| YouTube mentions | ⚠️ channel? | High (strongest correlation, ~0.737) |
| LinkedIn presence | ⚠️ unverified | Moderate |
| `sameAs` in schema | ✅ FB/IG/Telegram/TikTok | — |

The Organization JSON-LD already declares `sameAs` for Facebook/Instagram/Telegram/TikTok — good entity plumbing. The missing pieces are **Wikidata, Reddit, and YouTube**, which is where ChatGPT/Perplexity actually pull from.

---

## 6. Passage-Level Citability

**What's working:** guides lead with a definition in the first 40–60 words — e.g. _"GED stands for General Educational Development. It is a group of four tests that…"_ — which lands in the first-30%-of-page zone that produces ~44% of AI citations. Quotable, specific facts are present (four modules by name; "50,000–150,000 MMK per subject each month").

**What to improve:** several answer paragraphs exceed the **134–167-word** citation sweet spot and bundle multiple ideas. For each question-H2, add a tight, self-contained lead answer (one extractable block) before expanding. Apply the same to **blog posts** — open each with a one-sentence direct answer, since the bodies are strong but bury the takeaway.

---

## 7. Server-Side Rendering Check ✅

- Landing page, guides, and quiz **prerender to static HTML** (Astro `output: 'static'`) — AI crawlers (which do **not** run JavaScript) get the full content.
- Blog index/posts are `prerender = false` but **server-rendered to HTML** per request (Supabase read on the server), so crawlers still receive complete markup — not a client-only shell.
- **No JS-dependency risk for content.** This is a top-tier technical foundation.

---

## 8. Schema Recommendations

Current JSON-LD graph is strong: `Organization`/`EducationalOrganization`, `WebSite`, `WebPage`, `FAQPage`, `Article`/`BlogPosting`, `BreadcrumbList`, `Service`. Gaps:

1. **Guide `Article` nodes carry no `datePublished`/`dateModified`.** The pages *display* "Updated July 2026," but the value isn't passed into the schema (guide pages pass `articleHeadline` only). Add ISO dates to `guides.ts` and pass them → machine-readable freshness (a top AI-Mode signal). _Blog posts already do this correctly._
2. **No `author` `Person`.** Articles attribute authorship to the Organization. Add a named author (a real La Yaung teacher) with `Person` + `sameAs` (LinkedIn) and a visible byline → E-E-A-T "who."
3. **Visible dates aren't `<time datetime>`.** `GuidePage` renders "Updated July 2026" as plain text; wrap in `<time datetime="2026-07-01">` to match the schema.

---

## 9. Content Reformatting Suggestions

1. **Front-load blog posts** with a 1–2 sentence direct answer ("What is the GED? …") mirroring the guide pattern.
2. **Split long guide answers** into a 134–167-word lead block + expansion under each question-H2.
3. **Add a "Key facts" callout** near the top of each guide (cost, # of subjects, recognition) — self-contained and highly extractable.
4. **Add multi-modal** (see §10): a GED score-band chart, a GED-vs-IGCSE comparison graphic, and one embedded YouTube lesson clip.
5. **Blog freshness:** posts show dates — keep a visible "Updated" line and refresh top posts on a cadence (see §10).

---

## 10. Top 5 Highest-Impact Changes

1. **Machine-readable dates on guides** _(quick, in-repo)_ — add `datePublished`/`dateModified` (ISO) to `guides.ts`, pass to `BaseLayout`, and wrap the visible label in `<time>`. Directly boosts AI-Mode/AIO freshness scoring. **I can implement this now.**
2. **Named author + `Person` schema** _(quick, in-repo)_ — real teacher byline + credentials + LinkedIn `sameAs`. Closes the E-E-A-T "who" gap that all four platforms weigh.
3. **Off-site entity presence** _(off-site, highest ceiling)_ — create a **Wikidata** item, answer relevant **Reddit** threads (r/GED, Myanmar student subs), and mention lessons on **YouTube**. This is what moves the ChatGPT/Perplexity columns.
4. **Multi-modal** _(content)_ — add ≥2 diagrams/charts per guide and embed one YouTube lesson; multi-modal pages see **156% higher** AI selection.
5. **Passage tightening** _(content)_ — one self-contained 134–167-word answer at the top of every question-H2 and every blog post.

---

## Appendix — Notes from this session's changes

- The site was just collapsed from bilingual (EN + `/my/`) to **English-only** with `/my/* → English` 301s. GEO impact: equity is preserved via redirects; the English pages (the AI-citable surface) are unchanged. Blog post **bodies remain Burmese** on English chrome — good for **Burmese-language** AI queries, which have far less competition.
- **No RSL 1.0** licensing file (emerging Dec-2025 standard). Optional; low priority for a marketing site.
- These changes are **not yet deployed** — re-run this audit against production after deploy to confirm live crawler/schema behavior.
