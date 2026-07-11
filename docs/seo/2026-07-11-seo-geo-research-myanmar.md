# SEO + GEO Research: Myanmar / Burmese Exam-Prep Search — La Yaung Hub

*Deep research report · 2026-07-11 · 100 research agents, 16 claims verified by 3-vote adversarial fact-check, merged with a local technical audit of layaunghub.com.*

---

## 1. How Myanmar students & parents actually search

**Verified findings:**

- **Demand is real and growing.** Both students *and parents* in Myanmar are increasingly considering the GED, and many online + campus GED centers have emerged to meet it. ([edge.com.mm](https://www.edge.com.mm/article/ged-course.html), 3-0)
- **The dominant keyword pattern is "Burglish"** — Burmese-script sentences embedding English key terms. The top-ranking Burmese GED directory writes exactly this way: `…GED Approved Test Center တွေမှာ Register လုပ်ပြီး ဖြေဆိုလို့ရပါတယ်` — English terms "GED Course", "Register", "Test Center" inside Burmese sentences. ([edge.com.mm](https://www.edge.com.mm/article/ged-course.html), 3-0)
- **Burmese-script *question-style* queries matter.** KMD — the strongest local competitor — deliberately writes its FAQ headings as natural Burmese search questions: **"GED ဆိုတာ ဘာလဲ?"** ("What is GED?"), "GED Exam ထူးခြားချက်ကဘာလဲ?". ([kmd.edu.mm/ged](https://kmd.edu.mm/ged), 3-0)
- **English + geo-modifier is a parallel battlefield.** Nexquizzer runs a dedicated page exact-matching **"GED online class Myanmar"** in its H1 and 10+ headings/sentences. ([nexquizzer.com](https://nexquizzer.com/ged/ged-online-classes-myanmar), 2-1)
- **Platforms: Facebook and TikTok are discovery surfaces, not just social.** TikTok had **16.65M users 18+ in Myanmar (early 2024)**, nearly matching Facebook's reach. ([DataReportal](https://datareportal.com/reports/digital-2024-myanmar), 3-0) Facebook pages are widely used in Myanmar and should be optimized for local search visibility. ([Ranktracker](https://www.ranktracker.com/blog/a-complete-guide-for-doing-seo-in-myanmar/), 3-0)

**Directional (not fully verified):** local GED centers are often discovered via their Facebook pages rather than websites; Google is dominant for web search while FB/TikTok/YouTube dominate discovery. Treat as likely but unproven.

## 2. Competitor landscape

| Competitor | Position | SEO behavior |
|---|---|---|
| **KMD College** (kmd.edu.mm/ged) | **Pearson Authorized GED test centers in Yangon + Mandalay** — an authority signal a prep app can't match (3-0) | Bilingual page; Burmese question-style FAQ headings (3-0) |
| **BEAM Education Foundation** (Thailand) | Online GED targeting Myanmar youth, incl. migrant/marginalized communities (3-0) | Likely English-medium instruction (unverified) → **bilingual instruction is an open gap** |
| **GTS Learning Center** (Yangon) | Campus GED prep, fully bilingual site (3-0) | Same bilingual positioning La Yaung targets |
| **Nexquizzer** | Online quiz platform | Aggressive exact-match English keyword pages (2-1) |
| **~30 more institutions** | One Yangon directory article alone lists 30 GED schools incl. Crown Education, STI, KBTC (3-0) | Mostly Facebook-first |

**Implication:** the niche is crowded for *"GED class Yangon"*-type local queries, but La Yaung's differentiators — **app + bilingual instruction + free tier** — map to underserved queries: *GED အွန်လိုင်းသင်တန်း*, *learn GED in Burmese*, *GED app*, *free GED practice Myanmar*.

## 3. Technical SEO for Burmese content

- **Unicode only.** Myanmar mandated Unicode as the national digital-text standard in 2019. Write all Burmese content in Unicode (never Zawgyi). ([marketingmyanmar.com](https://marketingmyanmar.com/burmese-language-seo-zawgyi-vs-unicode-and-what-it-means-for-search/), 3-0) Zawgyi still exists in the wild (Google maintains conversion tooling — [google/myanmar-tools](https://github.com/google/myanmar-tools), 3-0) but modern keyboards default to Unicode; do not author in Zawgyi.
- **Separate language pages, not mixed.** Best practice for bilingual Myanmar sites: separate Burmese and English pages, `<html lang="my">` on Burmese pages, connected with `hreflang` tags. ([marketingmyanmar.com](https://marketingmyanmar.com/burmese-language-seo-zawgyi-vs-unicode-and-what-it-means-for-search/), 3-0)
- **Optimize the Facebook page** as a search asset (3-0).

## 4. GEO — getting cited by ChatGPT / Gemini / Claude / Perplexity

- **Keep perspective:** all LLMs combined drive **<1% of web traffic vs Google's ~41%** — GEO complements, never replaces, classic SEO. ([Ahrefs](https://ahrefs.com/blog/llm-citations/), 3-0)
- **But the traffic converts:** AI-citation visitors convert **~185% higher** than organic (cases up to 23×) — disproportionately valuable for a waitlist page. ([Ahrefs](https://ahrefs.com/blog/llm-citations/), 2-1)
- **Formats that earn LLM citations:** structured **comparison/pricing tables**, **free tools**, **step-by-step guides**, **glossary/definition pages**, help docs, original research with sample sizes; practical pages (homepages, product pages, free tools) get the most AI-referred traffic. (2-1)
- **Caution:** AI engines skew heavily toward high-authority domains, so a new site should expect citations to follow — not precede — authority building (directional; the strong version of this claim was refuted as overgeneralized).

## 5. Current site audit (layaunghub.com)

**Already strong:** AI-crawler-friendly robots.txt (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…), a good `llms.txt`, JSON-LD @graph (EducationalOrganization, WebSite, FAQPage, Service+Offers), sitemap, canonical, OG/Twitter.

**Gaps:** the only Burmese text on the page is `လရောင်`; `lang="en"` only, no `/my/` page, no hreflang; single page (nothing can rank for informational queries); English-only title/meta.

## 6. Prioritized action plan

### P0 — Foundation (do first)
1. **Create `/my/` — a full Burmese (Unicode) version of the landing page.** `<html lang="my">`, Burmese title/meta/OG, `hreflang` pair `my` ⟷ `en` + `x-default`. Astro i18n routing handles this statically.
2. **Burmese FAQ section written as real search questions** (the KMD pattern): "GED ဆိုတာ ဘာလဲ?", "GED စာမေးပွဲ ဘယ်မှာဖြေရမလဲ?", "GED အွန်လိုင်းသင်တန်း ဘယ်လိုတက်ရမလဲ?", "IGCSE နဲ့ GED ဘာကွာလဲ?" — mirrored into FAQPage JSON-LD in both languages.
3. **Burglish keyword integration** on both pages: "GED သင်တန်း", "GED Online Class", "GED Test Center Myanmar" appearing naturally in headings/body.
4. **Register Google Search Console + Bing Webmaster; create/verify the Google Business Profile; optimize the Facebook page** (consistent name/desc/link, education category).

### P1 — Content engine (4–8 weeks)
5. **Three informational pages** (each in en + my):
   - *What is the GED?* — definition-style guide (LLM-citable glossary format)
   - *GED vs IGCSE vs Matriculation (တက္ကသိုလ်ဝင်တန်း)* — **comparison table** (the single most LLM-quoted format)
   - *GED cost in Myanmar* — **pricing table** (test fees + typical tuition 50k–150k MMK vs La Yaung pricing)
6. **A free tool**: GED readiness mini-quiz or score calculator — earns backlinks and AI citations, feeds the waitlist.
7. **TikTok + Facebook exam-tip content** targeting in-app search ("GED tips", Burmese study content) — 16.65M TikTok users is too large a discovery surface to skip.

### P2 — Authority (ongoing)
8. **Backlinks from Myanmar education directories** — starting with the edge.com.mm GED directory that already ranks; study-abroad blogs (myanmarstudyabroad.org covers GED); teacher/tuition-center partnerships (also the brief's research plan #5).
9. Keep `llms.txt` and structured data current as pricing/tracks evolve; add the comparison tables to the pages AI crawlers already fetch.
10. **Measure:** GSC query report (watch Burmese vs English impressions), GA4 referrals from chatgpt.com/perplexity.ai/gemini, waitlist `_source` attribution.

---
*Sources: 22 fetched; strongest primaries: kmd.edu.mm/ged, beamedu.org, gtslearningcenter.com, ged.com/en/policies/myanmar, github.com/google/myanmar-tools. 16 claims confirmed, 8 refuted (overreach), 1 unverified.*
