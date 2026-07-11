// Free GED readiness self-assessment (the "free tool" from the SEO plan).
// A short, honest self-check — not a scored exam — that gives a readiness band
// plus a subject-specific tip and feeds the waitlist. Bilingual: this English
// set is mirrored 1:1 in `quiz.my.ts`; picked per-locale via getQuiz() in i18n.ts.

import type { IconName } from './content';

export interface QuizOption {
  label: string;
  /** 0–3; higher = more ready. The subject question is non-scoring (points 0). */
  points: number;
}

export interface QuizQuestion {
  /** 'subject' marks the non-scoring question whose answer picks the tip. */
  id: string;
  scoring: boolean;
  question: string;
  options: QuizOption[];
}

export interface QuizBand {
  /** Lower bound of the score percentage (0–100) for this band. */
  min: number;
  icon: IconName;
  title: string;
  body: string;
}

export interface Quiz {
  eyebrow: string;
  h1: string;
  lead: string;
  intro: string;
  homeLabel: string;
  startNote: string;
  seeResult: string;
  incomplete: string;
  questions: QuizQuestion[];
  resultKicker: string;
  scoreLabel: string;
  tipHeading: string;
  /** One tip per subject-question option, in the same order. */
  subjectTips: string[];
  retake: string;
  bands: QuizBand[];
  navLabel: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  cta: { title: string; body: string };
  meta: { title: string; description: string };
}

export const quiz: Quiz = {
  eyebrow: 'Free tool',
  h1: 'GED readiness quiz: are you ready to sit the test?',
  lead: 'A quick, honest self-check for Myanmar students. Answer six questions and get a readiness score, a tip for your hardest subject, and your best next step — free, no sign-up.',
  intro: 'This is a self-assessment, not the real GED exam. It looks at how far along your preparation is — study time, English comfort, practice tests and knowing your weak spots — and turns it into a readiness band with clear advice. It takes about a minute.',
  homeLabel: 'Home',
  startNote: 'Six quick questions · about 1 minute · nothing to install',
  seeResult: 'See my result',
  incomplete: 'Please answer every question to see your result.',
  questions: [
    {
      id: 'subject',
      scoring: false,
      question: 'Which GED subject do you find hardest?',
      options: [
        { label: 'Mathematical Reasoning', points: 0 },
        { label: 'Reasoning Through Language Arts (RLA)', points: 0 },
        { label: 'Science', points: 0 },
        { label: 'Social Studies', points: 0 },
      ],
    },
    {
      id: 'progress',
      scoring: true,
      question: 'How far along is your GED preparation?',
      options: [
        { label: 'I haven’t started yet', points: 0 },
        { label: 'I’m just beginning', points: 1 },
        { label: 'A few months in', points: 2 },
        { label: 'Studying consistently for 6+ months', points: 3 },
      ],
    },
    {
      id: 'english',
      scoring: true,
      question: 'How comfortable are you reading and answering in English?',
      options: [
        { label: 'I struggle a lot', points: 0 },
        { label: 'I manage with a dictionary', points: 1 },
        { label: 'Fairly comfortable', points: 2 },
        { label: 'Very comfortable', points: 3 },
      ],
    },
    {
      id: 'practice',
      scoring: true,
      question: 'Have you done timed, full-length practice tests?',
      options: [
        { label: 'Never', points: 0 },
        { label: 'Once or twice', points: 1 },
        { label: 'A few', points: 2 },
        { label: 'Regularly', points: 3 },
      ],
    },
    {
      id: 'gaps',
      scoring: true,
      question: 'Do you know which topics are your weakest?',
      options: [
        { label: 'No idea', points: 0 },
        { label: 'Vaguely', points: 1 },
        { label: 'Mostly', points: 2 },
        { label: 'Yes, precisely', points: 3 },
      ],
    },
    {
      id: 'timeline',
      scoring: true,
      question: 'When do you want to sit the GED?',
      options: [
        { label: 'Not sure yet', points: 0 },
        { label: 'Sometime within a year', points: 1 },
        { label: 'In the next 3–6 months', points: 2 },
        { label: 'Very soon / already booked', points: 3 },
      ],
    },
  ],
  resultKicker: 'Your readiness',
  scoreLabel: 'Readiness score',
  tipHeading: 'Tip for your hardest subject',
  subjectTips: [
    'For Mathematical Reasoning, practise with the on-screen calculator early and drill the formula sheet — most lost marks come from setup, not arithmetic. Learn each concept in Burmese first, then redo it in English.',
    'For RLA, read a short English passage every day and practise writing one evidence-based paragraph. The extended-response essay rewards structure over vocabulary, so plan before you write.',
    'For Science, focus on reading graphs, tables and short passages rather than memorising facts — most questions test whether you can reason from the data in front of you.',
    'For Social Studies, get comfortable with charts, maps and source extracts. You don’t need to memorise US history; you need to interpret documents and data quickly.',
  ],
  retake: 'Retake the quiz',
  bands: [
    { min: 0, icon: 'play', title: 'Just getting started', body: 'You’re near the beginning — which is a great place to build good habits. Start with one subject, learn each concept in Burmese first, then practise it in English. La Yaung Hub’s free plan gives you the first lesson of every topic, so you can begin today without spending anything.' },
    { min: 34, icon: 'compass', title: 'Building your foundation', body: 'You’ve made real progress. The next step is structure: study one subject at a time, add timed practice, and start tracking which topics are weakest so every session counts. Bilingual lessons plus gap analysis will move you up fastest.' },
    { min: 61, icon: 'target', title: 'Almost exam-ready', body: 'You’re close. Tighten up with full-length timed practice tests and focus your remaining time on your weakest topics rather than reviewing what you already know. A little targeted work should get you over the line.' },
    { min: 84, icon: 'trend', title: 'You’re exam-ready', body: 'Strong readiness across the board. Keep your timing sharp with a few more full practice tests, confirm the test fee and booking on ged.com, and go for it. Use any remaining study time to shore up your single weakest subject.' },
  ],
  navLabel: 'Free GED readiness quiz',
  faqHeading: 'About this quiz',
  faqs: [
    { q: 'Is this the real GED test?', a: 'No. This is a free self-assessment that estimates how ready you are, based on your study progress, English comfort, practice-test experience and how well you know your weak topics. The real GED is four separate subject tests taken at an approved test centre or online.' },
    { q: 'How is the GED readiness score calculated?', a: 'Your answers to five readiness questions each score from 0 to 3, and the total is turned into a percentage that maps to one of four bands — from “Just getting started” to “You’re exam-ready”. It’s a guide to your next step, not an official GED score.' },
    { q: 'Is the GED readiness quiz free?', a: 'Yes, completely free with no sign-up. You can also start preparing for free: La Yaung Hub’s free plan includes the first lesson of every GED topic in Burmese and English.' },
  ],
  cta: { title: 'Turn your result into a study plan', body: 'La Yaung Hub maps your GED prep from where you are now to exam-ready — bilingual lessons, hands-on practice and real teacher feedback. Join the waitlist for early access.' },
  meta: {
    title: 'Free GED Readiness Quiz for Myanmar Students | La Yaung Hub',
    description: 'Take a free GED readiness quiz: six quick questions give you a readiness score, a tip for your hardest subject and your best next step. No sign-up — for Myanmar students.',
  },
};
