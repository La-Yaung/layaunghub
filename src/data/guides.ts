// Informational guide pages (the "content engine" from the SEO plan). Each
// guide is bilingual — this English set is mirrored 1:1 in `guides.my.ts`.
// Rendered by `GuidePage.astro`; picked per-locale via `getGuides()` in i18n.ts.
//
// The content leads with the exact phrases Myanmar students search for and uses
// comparison/pricing TABLES — the format LLM answer engines quote most often.

import type { IconName } from './content';

export type GuideSlug = 'what-is-ged' | 'ged-vs-igcse' | 'ged-cost';

export interface FaqItem {
  q: string;
  a: string;
}

// A small block model: enough structure for definition prose, lists, tables
// and callouts, without pulling in a full CMS or Markdown pipeline.
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; caption?: string; columns: string[]; rows: string[][] }
  | { type: 'callout'; icon?: IconName; title: string; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string };

export interface Guide {
  slug: GuideSlug;
  icon: IconName;
  eyebrow: string;
  h1: string;
  lead: string;
  updated: string;
  readingTime: string;
  blocks: Block[];
  faqHeading: string;
  faqs: FaqItem[];
  relatedHeading: string;
  /** Short label used on related-guide cards and in the footer. */
  navLabel: string;
  cta: { title: string; body: string };
  meta: { title: string; description: string };
}

// Render order — also drives the "related guides" cross-links and footer list.
export const guideOrder: GuideSlug[] = ['what-is-ged', 'ged-vs-igcse', 'ged-cost'];

export const guides: Record<GuideSlug, Guide> = {
  'what-is-ged': {
    slug: 'what-is-ged',
    icon: 'help',
    eyebrow: 'GED Guide',
    h1: 'What is the GED? A complete guide for Myanmar students',
    lead: 'The GED is a US high-school equivalency qualification made up of four subject tests. Here’s what it is, how it’s recognised, and how Myanmar students can prepare for it — in Burmese and English.',
    updated: 'Updated July 2026',
    readingTime: '6 min read',
    blocks: [
      { type: 'h2', text: 'What does GED stand for?' },
      { type: 'p', text: 'GED stands for General Educational Development. It is a group of four tests that, when passed, certify that you have US high-school-level academic skills. A GED credential is widely treated as equivalent to a US high-school diploma, which is why it has become a popular route for Myanmar students who left school early or who want an internationally recognised qualification without repeating years of study.' },
      { type: 'p', text: 'The GED is created and awarded by GED Testing Service in the United States. You do not have to attend a specific school to earn it — you prepare on your own or with a course, then sit the tests at an approved test centre or online.' },

      { type: 'h2', text: 'The four GED subjects' },
      { type: 'p', text: 'The GED is made up of four independent subject tests. You can prepare for and take them one at a time, in any order, rather than all at once.' },
      {
        type: 'table',
        caption: 'The four GED test modules',
        columns: ['GED subject', 'What it covers'],
        rows: [
          ['Mathematical Reasoning', 'Number operations, algebra, geometry, data and graphs — with an on-screen calculator for most questions.'],
          ['Reasoning Through Language Arts (RLA)', 'Reading comprehension, grammar and writing an evidence-based essay.'],
          ['Science', 'Life science, physical science and Earth/space science, focused on reasoning with data rather than memorising facts.'],
          ['Social Studies', 'Civics and government, US and world history, economics and geography.'],
        ],
      },

      { type: 'h2', text: 'Is the GED recognised?' },
      { type: 'p', text: 'Yes. The GED is accepted by thousands of universities, colleges and employers as equivalent to a US high-school diploma. For Myanmar students, that makes it a practical bridge to higher education — many international and online universities accept a GED for admission, and it is a recognised credential when applying for work or further study abroad.' },
      { type: 'p', text: 'As always, check the specific admission requirements of the university or programme you are aiming for, since some ask for GED scores at a particular level.' },

      { type: 'h2', text: 'How is the GED scored?' },
      { type: 'p', text: 'Each of the four tests is scored from 100 to 200. You need at least 145 on each subject to pass. Higher tiers signal readiness for college-level work: 165–174 is “College Ready”, and 175–200 is “College Ready + Credit”, which some US colleges accept for course credit. Because each subject is scored and passed separately, you only need to retake the ones you have not yet cleared.' },

      { type: 'h2', text: 'Who is the GED for in Myanmar?' },
      { type: 'ul', items: [
        'Students who left school before finishing and want a recognised high-school-level qualification.',
        'Students aiming for international or online universities that accept the GED.',
        'Learners who prefer a flexible route they can take one subject at a time, year-round.',
        'Anyone who wants an English-language credential but needs to learn the concepts in Burmese first.',
      ] },

      { type: 'h2', text: 'How to prepare for the GED in Myanmar' },
      { type: 'p', text: 'The biggest hurdle for Burmese-speaking students is that most GED material assumes fluent English. The most effective approach is bilingual: understand each concept in Burmese, then practise it in the English exam language so the test itself feels familiar.' },
      { type: 'p', text: 'La Yaung Hub is built around that idea. Every GED topic follows the same loop — watch a short bilingual lesson, practise with nine interactive activity types, and track your gaps so each study session targets your weakest area. The first lesson of every topic is free forever.' },
      { type: 'callout', icon: 'moon', title: 'Study the GED in Burmese and English', text: 'La Yaung Hub explains every GED concept in Burmese first, then in English — with real teacher feedback on your written work. Join the waitlist for early access.' },
    ],
    faqHeading: 'GED questions, answered',
    faqs: [
      { q: 'What is the GED, and is it recognised?', a: 'The GED (General Educational Development) is a US high-school equivalency qualification made up of four tests — Mathematical Reasoning, Science, Social Studies, and Reasoning Through Language Arts. It is widely accepted by universities and employers as equivalent to a US high-school diploma, making it a popular route for Myanmar students who want an internationally recognised credential.' },
      { q: 'How many subjects are in the GED?', a: 'Four: Mathematical Reasoning, Reasoning Through Language Arts (RLA), Science and Social Studies. You can prepare for and take them one subject at a time, in any order.' },
      { q: 'What is a passing GED score?', a: 'Each GED test is scored from 100 to 200, and you need at least 145 to pass that subject. Scores of 165–174 are labelled “College Ready” and 175–200 “College Ready + Credit”. You pass each subject separately, so you only retake the ones you have not yet cleared.' },
      { q: 'Can I take the GED in Myanmar, in Burmese?', a: 'The GED itself is written in English, but you can learn everything you need in Burmese. La Yaung Hub is fully bilingual — every concept is explained in Burmese first, then in the English exam language — so Myanmar students can prepare for GED Math, Science, Social Studies and RLA online, at their own pace.' },
    ],
    relatedHeading: 'Keep reading',
    navLabel: 'What is the GED?',
    cta: { title: 'Ready to start your GED?', body: 'Join the La Yaung Hub waitlist for early access — bilingual GED lessons, hands-on practice and real teacher feedback.' },
    meta: {
      title: 'What is the GED? A Guide for Myanmar Students | La Yaung Hub',
      description: 'What the GED is, its four subjects, how it is scored and recognised, and how Myanmar students can prepare in Burmese and English. A clear, complete GED guide.',
    },
  },

  'ged-vs-igcse': {
    slug: 'ged-vs-igcse',
    icon: 'compass',
    eyebrow: 'Compare',
    h1: 'GED vs IGCSE vs Matriculation: which is right for you?',
    lead: 'Myanmar students weighing up their options usually compare three routes: the American GED, the British IGCSE, and the Myanmar matriculation exam (တက္ကသိုလ်ဝင်တန်း). Here’s how they differ and how to choose.',
    updated: 'Updated July 2026',
    readingTime: '7 min read',
    blocks: [
      { type: 'p', text: 'The GED, IGCSE and Myanmar matriculation exam all certify high-school-level education, but they come from different systems and suit different goals. This table gives you the quick comparison; the sections below explain each in plain language.' },
      {
        type: 'table',
        caption: 'GED vs IGCSE vs Myanmar matriculation at a glance',
        columns: ['', 'GED', 'IGCSE', 'Matriculation (တက္ကသိုလ်ဝင်တန်း)'],
        rows: [
          ['Awarding body', 'GED Testing Service (USA)', 'Cambridge / Pearson (UK)', 'Myanmar Board of Examinations'],
          ['Recognised as', 'US high-school equivalency', 'International secondary certificate', 'Myanmar high-school completion'],
          ['Structure', 'Four fixed subject tests', 'Choose subjects individually', 'Fixed national subjects'],
          ['Language', 'English', 'English', 'Burmese (some English)'],
          ['When you sit it', 'Year-round, one subject at a time', 'Fixed exam sessions (around June & November)', 'Once a year (around March)'],
          ['Typical age', '16+ (varies by region)', 'Around 16', 'Around 16–17'],
          ['Best for', 'A fast, flexible international route', 'Per-subject depth in the UK system', 'Continuing inside Myanmar’s university system'],
        ],
      },

      { type: 'h2', text: 'What is the GED?' },
      { type: 'p', text: 'The GED is a US high-school equivalency qualification made up of four tests — Mathematical Reasoning, RLA, Science and Social Studies. You can take the subjects one at a time, year-round, which makes it the most flexible of the three. It is a strong fit for students who want an internationally recognised credential quickly.' },

      { type: 'h2', text: 'What is the IGCSE?' },
      { type: 'p', text: 'The IGCSE (International General Certificate of Secondary Education) is a British, Cambridge- or Pearson-assessed qualification taken subject by subject, usually around age 16. You choose which subjects to sit — for example Maths, the sciences, English and economics — and take formal exams in set sessions. IGCSE is valued for its subject depth and is a common step towards A-Levels and UK-style universities.' },

      { type: 'h2', text: 'What is the Myanmar matriculation exam?' },
      { type: 'p', text: 'The matriculation exam (တက္ကသိုလ်ဝင်တန်း) is Myanmar’s national high-school completion exam, run by the Board of Examinations and taken once a year. It is mainly in Burmese and covers a fixed set of national-curriculum subjects. Your result determines university placement inside Myanmar, so it remains the default route for students planning to study locally.' },

      { type: 'h2', text: 'Which should Myanmar students choose?' },
      { type: 'ul', items: [
        'Choose the GED if you want a flexible, internationally recognised route you can complete year-round and mostly online.',
        'Choose the IGCSE if you want per-subject depth and are aiming for A-Levels or a UK-style university.',
        'Choose matriculation if you plan to continue into a Myanmar university through the national system.',
        'Not sure yet? The GED’s year-round, one-subject-at-a-time structure lets you start without committing to a fixed exam calendar.',
      ] },
      { type: 'callout', icon: 'target', title: 'Preparing for the GED?', text: 'La Yaung Hub offers full bilingual GED preparation now, with IGCSE and the Myanmar Grade 10–12 curriculum coming soon. Join the waitlist to be first in.' },
    ],
    faqHeading: 'Common questions',
    faqs: [
      { q: 'What is the difference between the GED and IGCSE?', a: 'The IGCSE is a Cambridge- or Pearson-assessed, subject-by-subject qualification usually taken around age 16 in fixed exam sessions. The GED is a US equivalency test of four broad subjects that can be taken year-round, one subject at a time. The GED is faster and more flexible; the IGCSE offers more per-subject depth.' },
      { q: 'Is the GED easier than the IGCSE?', a: 'They are different rather than simply easier or harder. The GED tests four broad subjects and is designed to be taken flexibly by older students and adult learners, while the IGCSE goes deeper into each chosen subject with formal written exams. Many Myanmar students find the GED faster to complete because they sit one subject at a time, year-round.' },
      { q: 'Is the GED accepted by universities?', a: 'Yes — thousands of universities and colleges accept the GED as equivalent to a US high-school diploma, including many international and online universities that Myanmar students apply to. Always confirm the specific score requirements of the programme you are targeting.' },
      { q: 'Can I switch from matriculation to the GED?', a: 'Yes. Because the GED is independent of the Myanmar national system and can be taken year-round, students often switch to it for a more flexible, internationally recognised route. You prepare for the four GED subjects and sit them when you are ready, without waiting for the annual matriculation session.' },
    ],
    relatedHeading: 'Keep reading',
    navLabel: 'GED vs IGCSE vs Matriculation',
    cta: { title: 'Focused on the GED?', body: 'La Yaung Hub’s bilingual GED course is open for early access. Join the waitlist and start when the beta opens.' },
    meta: {
      title: 'GED vs IGCSE vs Matriculation: Which to Choose | La Yaung Hub',
      description: 'A clear comparison of the GED, IGCSE and Myanmar matriculation (တက္ကသိုလ်ဝင်တန်း) — awarding body, structure, language, timing and which route fits Myanmar students.',
    },
  },

  'ged-cost': {
    slug: 'ged-cost',
    icon: 'coins',
    eyebrow: 'Cost',
    h1: 'How much does the GED cost in Myanmar?',
    lead: 'The real cost of the GED has two parts: the official test fees and the money you spend preparing. Here’s a breakdown for Myanmar students — and how to keep preparation affordable.',
    updated: 'Updated July 2026',
    readingTime: '5 min read',
    blocks: [
      { type: 'h2', text: 'GED test fees' },
      { type: 'p', text: 'The GED is charged per subject, so your total test fee depends on how many of the four subjects you sit. Fees are set by GED Testing Service (through Pearson VUE) and are usually charged in US dollars, so the amount in kyat moves with the exchange rate.' },
      {
        type: 'table',
        caption: 'Approximate GED test fees',
        columns: ['Item', 'Typical cost'],
        rows: [
          ['GED test — per subject', 'Around US$30 per module'],
          ['GED test — all four subjects', 'Around US$120 in total'],
          ['Retake (per subject)', 'Often discounted for the first retake'],
        ],
      },
      { type: 'p', text: 'Treat these as a guide, not a quote: the exact fee is set by GED Testing Service and Pearson VUE, varies by test centre and delivery method (test centre vs online proctoring), and changes with the US-dollar exchange rate. Always check ged.com for the current price before you book.' },

      { type: 'h2', text: 'Preparation costs' },
      { type: 'p', text: 'For most students the bigger cost is preparation, not the exam itself. Here is how the common options compare.' },
      {
        type: 'table',
        caption: 'What GED preparation typically costs in Myanmar',
        columns: ['Option', 'Typical cost', 'Notes'],
        rows: [
          ['Private tutoring', '50,000–150,000 MMK per subject / month', 'The most personal, but the most expensive — and often English-only.'],
          ['Self-study books', 'Varies', 'Cheap, but usually English-only with no feedback or progress tracking.'],
          ['Online courses', 'Varies', 'Convenient, but few are bilingual or mapped to the GED blueprint.'],
          ['La Yaung Hub — Free', '0 MMK, forever', 'First lesson of every topic, all nine activity types, bilingual lessons and progress tracking.'],
          ['La Yaung Hub — Premium', 'Early-bird beta pricing', 'Every lesson unlocked plus real teacher feedback, at a fraction of tutoring cost.'],
        ],
      },

      { type: 'h2', text: 'How to prepare for the GED affordably' },
      { type: 'ul', items: [
        'Start free: cover the first lesson of every topic before you spend anything.',
        'Study one subject at a time so you only pay test fees for what you’re ready to sit.',
        'Learn the concepts in Burmese first — you waste less time re-reading English explanations.',
        'Use gap analysis to focus on your weakest topics instead of paying for hours you don’t need.',
      ] },
      { type: 'callout', icon: 'coins', title: 'Prepare for the GED from 0 MMK', text: 'La Yaung Hub’s free plan gives you the first lesson of every GED topic — bilingual, with all nine practice types. Upgrade to Premium only when you’re ready.' },
    ],
    faqHeading: 'Cost questions, answered',
    faqs: [
      { q: 'How much does GED preparation cost on La Yaung?', a: 'The first lesson of every topic is free forever, including all nine practice activity types. Private tutoring in Myanmar typically costs 50,000–150,000 MMK per subject each month; La Yaung’s Premium plan unlocks every lesson and teacher feedback for a fraction of that, with lifetime early-bird pricing for beta members.' },
      { q: 'How much is the GED test fee in Myanmar?', a: 'The GED is charged per subject — roughly US$30 per module, or about US$120 for all four — but the exact amount is set by GED Testing Service and Pearson VUE and moves with the US-dollar exchange rate. Check ged.com for the current fee before booking.' },
      { q: 'Is there a free way to study for the GED?', a: 'Yes. La Yaung Hub’s free plan includes the first lesson of every GED topic, all nine interactive activity types, bilingual lessons and basic progress tracking — so you can start preparing for 0 MMK before deciding whether to upgrade.' },
      { q: 'How much does private GED tutoring cost in Myanmar?', a: 'Private tutoring in Myanmar typically costs 50,000–150,000 MMK per subject each month, which is out of reach for many families. That gap is exactly why La Yaung Hub offers bilingual GED preparation with a free tier and affordable early-bird Premium pricing.' },
    ],
    relatedHeading: 'Keep reading',
    navLabel: 'How much does the GED cost?',
    cta: { title: 'Start preparing for free', body: 'The first lesson of every GED topic is free on La Yaung Hub. Join the waitlist for early access to the full bilingual course.' },
    meta: {
      title: 'How Much Does the GED Cost in Myanmar? | La Yaung Hub',
      description: 'A breakdown of GED costs for Myanmar students — official test fees plus preparation options from private tutoring (50k–150k MMK) to free bilingual study on La Yaung Hub.',
    },
  },
};
