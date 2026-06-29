// Single source of truth for site metadata + page content.
// Used by the layout (SEO/structured data) and section components.

export const site = {
  name: 'La Yaung Hub',
  shortName: 'La Yaung',
  nameMy: 'လရောင်',
  url: 'https://layaunghub.com',
  // Keep <= ~60 chars for the SERP title.
  title: 'La Yaung Hub — Bilingual GED Exam Prep for Myanmar',
  // Keep ~150–160 chars for the SERP description.
  description:
    'Interactive, bilingual GED exam prep for Myanmar students — video lessons, hands-on practice and real teacher feedback. IGCSE & Myanmar tracks coming soon.',
  tagline: 'Interactive, bilingual exam prep — lighting the way for Myanmar students.',
  locale: 'en_US',
  localeAlternate: 'my_MM',
  email: 'hlaminnaing@layaunghub.com',
  ogImage: '/og-image.png',
  themeColor: '#FFFBF2',
  gaId: 'G-7PZ1NYMGS0', // Google Analytics 4 measurement ID
  // Keywords are not used for ranking by Google, but help some engines/LLMs
  // and our own internal copy. They mirror the visible, factual content below.
  keywords: [
    'GED Myanmar',
    'GED prep Myanmar',
    'GED in Burmese',
    'IGCSE Myanmar',
    'IGCSE Cambridge prep',
    'bilingual exam prep',
    'online tutoring Myanmar',
    'Myanmar Grade 10-12',
    'matriculation exam prep',
    'La Yaung',
    'လရောင်',
  ],
  social: {
    facebook: 'https://web.facebook.com/layaunghub/',
    telegram: 'https://t.me/layaunghub',
    tiktok: 'https://www.tiktok.com/@layaunghub',
  },
};

// Formspree endpoint for the "early access" waitlist form.
// Submissions appear in the Formspree dashboard for this form.
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqevbnyd';

// Emotional "dark → light" interstitial — the transformation La Yaung promises.
export const transformation = {
  dark: [
    'Alone with English-only PDFs',
    'Months of study, never sure you’re ready',
    'Tutoring at 50,000–150,000 MMK a month',
  ],
  light: [
    'Bilingual lessons that finally click',
    'A clear map from where you are to exam-ready',
    'Free to start — the first lesson is always on us',
  ],
};

export const nav = [
  { href: '#problem', label: 'Why La Yaung' },
  { href: '#features', label: 'Features' },
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export type IconName =
  | 'globe' | 'coins' | 'compass' | 'help' | 'play' | 'target' | 'trend'
  | 'video' | 'map' | 'note' | 'pen' | 'bars' | 'translate' | 'bulb' | 'moon'
  | 'mail' | 'facebook' | 'telegram' | 'tiktok';

export const problems: { icon: IconName; title: string; body: string }[] = [
  { icon: 'globe', title: 'English-only resources', body: 'Most prep material assumes fluent English, leaving Burmese-speaking students stuck before they even start.' },
  { icon: 'coins', title: 'Tutoring is expensive', body: 'Private tutors charge 50k–150k MMK per subject each month — a barrier for the families who need it most.' },
  { icon: 'compass', title: 'Nothing maps to the syllabus', body: 'Scattered videos and PDFs rarely line up with what Cambridge or GED actually examines.' },
  { icon: 'help', title: 'No way to feel exam-ready', body: 'Students study for months with no honest signal of whether they’re actually prepared to pass.' },
];

export const activities = [
  'Multiple choice', 'True / False', 'Ordering', 'Flashcards', 'Fill the blanks',
  'Mark the words', 'Math input', 'Matching', 'Short answer',
];

export const steps: { n: string; icon: IconName; title: string; body: string }[] = [
  { n: '01', icon: 'play', title: 'Watch the lesson', body: 'Start with a short, clear video and a plain-language explanation of every key concept — in Burmese and English.' },
  { n: '02', icon: 'target', title: 'Practice by doing', body: 'Turn the lesson into action with nine interactive activity types, then get real teacher feedback on your written work.' },
  { n: '03', icon: 'trend', title: 'Track your gaps', body: 'See exactly what you’ve mastered and what needs work, so every study session targets your next weakest spot.' },
];

export const features: { icon: IconName; title: string; body: string }[] = [
  { icon: 'video', title: 'Video lessons & explanations', body: 'Short teacher-led videos with written explanations and key concepts for every topic.' },
  { icon: 'map', title: 'Guided chapter roadmap', body: 'A clear path that unlocks chapter by chapter, so you always know what comes next.' },
  { icon: 'note', title: 'Notes, glossary & formulas', body: 'Built-in summaries, definitions and formula sheets — downloadable as PDF for offline study.' },
  { icon: 'pen', title: 'Real teacher feedback', body: 'Written answers are reviewed by qualified teachers — not just an auto-grader marking boxes.' },
  { icon: 'bars', title: 'Gap analysis & progress', body: 'Streaks, study time and per-subject mastery show exactly what to study next.' },
  { icon: 'translate', title: 'Fully bilingual', body: 'Learn in Burmese and English side by side — concepts first, exam-language second.' },
];

// `status` drives the launch focus: GED is live now; IGCSE and the Myanmar
// curriculum are built but not yet uploaded, so they render as "Coming soon".
export const curriculum: { tag: string; title: string; body: string; status: 'available' | 'soon'; points: string[]; subjects: string[] }[] = [
  { tag: 'GED', title: 'US High-School Equivalency', body: 'All four GED modules, built around the official test blueprint.', status: 'available', points: ['Math, Science, Social Studies, RLA', 'Timed practice tests', 'Readiness scoring'], subjects: ['Mathematical Reasoning', 'Reasoning Through Language Arts', 'Science', 'Social Studies'] },
  { tag: 'IGCSE · CAMBRIDGE', title: 'International GCSE', body: 'Core subjects aligned to Cambridge assessment objectives, with exam-style practice.', status: 'soon', points: ['Maths, Science, Language Arts', 'Past-paper-style questions', 'Grade-boundary tracking'], subjects: ['Mathematics', 'Add-Maths', 'Physics', 'Chemistry', 'Biology', 'English', 'Economics', 'Accounting'] },
  { tag: 'GRADES 10–12', title: 'Myanmar National Curriculum', body: 'Local-curriculum support in Burmese for the matriculation years.', status: 'soon', points: ['Aligned to national textbooks', 'Bilingual explanations', 'Matric exam preparation'], subjects: ['Myanmar', 'English', 'Maths', 'Physics', 'Chemistry', 'Biology', 'Economics'] },
];

export const freePlan = ['First lesson of every topic', 'All 9 activity types', 'Bilingual lessons', 'Basic progress tracking'];
export const proPlan = ['Every lesson, fully unlocked', 'Teacher feedback on written work', 'Full gap analysis & study plan', 'Lifetime early-bird pricing'];

// FAQ — visible content + FAQPage structured data. Written to match the real
// questions students search for, so the page can rank and be cited by AI engines.
export const faqs: { q: string; a: string }[] = [
  {
    q: 'What is the GED, and is it recognised?',
    a: 'The GED (General Educational Development) is a US high-school equivalency qualification made up of four tests — Mathematical Reasoning, Science, Social Studies, and Reasoning Through Language Arts (RLA). It is widely accepted by universities and employers as equivalent to a US high-school diploma, which makes it a popular route for Myanmar students who want an internationally recognised credential.',
  },
  {
    q: 'Can I prepare for the GED in Myanmar, in Burmese?',
    a: 'Yes. La Yaung Hub is built for Burmese-speaking students: every lesson is fully bilingual, explaining each concept in Burmese first and then in the English exam language. You can study GED Math, Science, Social Studies and RLA online from anywhere in Myanmar, at your own pace.',
  },
  {
    q: 'How much does GED preparation cost on La Yaung?',
    a: 'The first lesson of every topic is free forever, including all nine practice activity types. Private tutoring in Myanmar typically costs 50,000–150,000 MMK per subject each month; La Yaung’s Premium plan unlocks every lesson and teacher feedback for a fraction of that, with lifetime early-bird pricing for beta members.',
  },
  {
    q: 'What is the difference between the GED and IGCSE?',
    a: 'IGCSE (International General Certificate of Secondary Education) is a Cambridge-assessed, subject-by-subject qualification usually taken around age 16, with formal exam sessions. The GED is a US equivalency test of four broad subjects that can be taken year-round. La Yaung Hub is launching with full GED preparation now; IGCSE and the Myanmar Grade 10–12 curriculum are coming soon, so you’ll be able to choose the route that fits your goals.',
  },
  {
    q: 'How long does it take to prepare for the GED?',
    a: 'It depends on your starting level, but many students prepare in three to six months of consistent study. La Yaung’s gap analysis shows exactly which topics you have mastered and which still need work, so every study session targets your weakest area and you can see when you are genuinely exam-ready.',
  },
  {
    q: 'Does La Yaung give real teacher feedback or just auto-grading?',
    a: 'Both. Interactive activities are marked instantly, while your written answers are reviewed by qualified teachers — not just an auto-grader checking boxes. That feedback is the part of private tutoring most online courses leave out.',
  },
];
