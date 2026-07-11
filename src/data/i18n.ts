// Locale switch for the bilingual site: `/` (en) and `/my/` (my, Burmese Unicode).
// Components call `getContent(Astro.currentLocale)` and render one content set —
// both modules export the same named shapes, so the pages stay in lockstep.

import * as en from './content';
import * as my from './content.my';
import { guides as guidesEn } from './guides';
import { guides as guidesMy } from './guides.my';
import { quiz as quizEn } from './quiz';
import { quiz as quizMy } from './quiz.my';

export type Locale = 'en' | 'my';

export function getContent(locale: string | undefined) {
  return locale === 'my' ? my : en;
}

// Bilingual guide set (the informational content pages), same shape per locale.
export function getGuides(locale: string | undefined) {
  return locale === 'my' ? guidesMy : guidesEn;
}

// Bilingual GED readiness quiz (the free interactive tool).
export function getQuiz(locale: string | undefined) {
  return locale === 'my' ? quizMy : quizEn;
}
