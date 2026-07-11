// Burmese (Unicode) blog — La Yaung Hub's Facebook posts, re-authored as clean,
// readable articles (better typography + SEO than text trapped in an image).
// Served under /my/blog/. Adding a post = prepend an entry to `posts` (newest
// first); the body reuses the shared Block model from guides.ts.

import type { Block } from './guides';

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD) — used for <time> + BlogPosting datePublished. */
  date: string;
  /** Burmese display date. */
  dateLabel: string;
  tags: string[];
  excerpt: string;
  /** Optional cover image path (public/…). When omitted, a designed cover
   *  (dark brand panel with the eyebrow + title) is rendered instead. */
  cover?: string;
  coverEyebrow: string;
  /** Link back to the original Facebook post. */
  fbUrl: string;
  body: Block[];
}

// UI copy for the blog index + post chrome (Burmese only).
export const blog = {
  meta: {
    title: 'ဆောင်းပါးများ — GED အကြံပြုချက်များ | La Yaung Hub',
    description: 'GED, RLA Essay, စာမေးပွဲပြင်ဆင်နည်းနှင့် ပညာရေးဆိုင်ရာ အကြံပြုချက်များ — La Yaung Hub ၏ Facebook ပို့စ်များကို ဖတ်ရလွယ်ကူအောင် ပြန်လည်ရေးသားထားသည်။',
  },
  eyebrow: 'ဆောင်းပါးများ',
  heading: 'GED အကြံပြုချက်များနှင့် ဆောင်းပါးများ',
  intro: 'La Yaung Hub ၏ Facebook စာမျက်နှာမှ ပညာရေးဆိုင်ရာ ပို့စ်များကို ဖတ်ရလွယ်ကူပြီး စနစ်တကျ ဖွဲ့စည်းထားသည့် ဆောင်းပါးများအဖြစ် ပြန်လည်တင်ဆက်ထားပါသည်။',
  home: 'ပင်မ',
  readMore: 'ဆက်ဖတ်ရန်',
  onFacebook: 'Facebook တွင် မူရင်းပို့စ် ကြည့်ရန်',
  relatedHeading: 'နောက်ထပ် ဆောင်းပါးများ',
  emptyRelated: 'ဆောင်းပါးအားလုံး ကြည့်ရန်',
};

export const posts: BlogPost[] = [
  {
    slug: 'ged-rla-essay-tips',
    title: 'GED RLA Essay မှာ အမှတ်ကောင်းကောင်းရဖို့ ဘာတွေ သိထားရမလဲ?',
    date: '2026-07-11',
    dateLabel: '၂၀၂၆ ဇူလိုင် ၁၁',
    tags: ['GED', 'RLA', 'Essay'],
    excerpt: 'GED ရဲ့ အင်္ဂလိပ်စာ Essay မှာ ကျောင်းသားအများစု မှားတတ်ပြီး အမှတ်လျော့စေတဲ့ အချက်တစ်ခုကို ရှင်းပြထားပါတယ် — Opinion ထက် Analysis က ဘာကြောင့် ပိုအရေးကြီးလဲ။',
    coverEyebrow: 'GED Guide',
    fbUrl: 'https://web.facebook.com/layaunghub/posts/pfbid036aWkmNZMQ2XNeH8Fqh2Zt8sYbuvd3rpaCr4AdcwtrRH4HhTwfmTyuYvvhEzHSttql',
    body: [
      { type: 'p', text: 'GED ရဲ့ Reasoning Through Language Arts (RLA) ဘာသာရပ်မှာ စာဖတ်နားလည်မှု အပိုင်းအပြင် ၄၅ မိနစ်အတွင်း Essay (Extended Response) တစ်ပုဒ် ရေးရတဲ့ အပိုင်းလည်း ပါဝင်ပါတယ်။ ဒီ Essay အပိုင်းက အမှတ်အများကြီး ပါတဲ့အတွက် ကောင်းကောင်း ပြင်ဆင်ထားသင့်ပါတယ်။' },

      { type: 'h2', text: 'အများစု မှားတတ်တဲ့ အချက်' },
      { type: 'p', text: 'ဒီအပိုင်းမှာ ကျောင်းသားအများစု လုပ်မိတတ်တဲ့ အမှားတစ်ခုက ကိုယ့်ရဲ့ အမြင်၊ အတွေးအခေါ်နဲ့ ခံစားချက်တွေကို အခြေခံပြီး ရေးသားလိုက်တာပါ။ ဒီအချက်ကို လူတော်တော်များများက နားလည်မှုလွဲနေတတ်ပါတယ်။' },
      { type: 'p', text: 'တကယ်တော့ GED Essay က ကိုယ့်ရဲ့ ထင်မြင်ချက်ကို ဖော်ပြတဲ့ Essay မဟုတ်ပါဘူး။' },

      { type: 'h2', text: 'GED Essay က တကယ်တော့ ဘာလဲ?' },
      { type: 'p', text: 'စာမေးပွဲမှာ အကြောင်းအရာတစ်ခုနဲ့ ပတ်သက်ပြီး မတူညီတဲ့ အယူအဆကို တင်ပြထားတဲ့ Argument နှစ်ခု ပေးထားပါတယ်။ သင့်အလုပ်က “ဘယ်ဟာကို ပိုသဘောကျတယ်” လို့ ရွေးဖို့ မဟုတ်ဘဲ — ဘယ် Argument က Evidence, Facts, Data နဲ့ Reasoning တွေကို ပိုအသုံးပြုပြီး စာဖတ်သူကို ပိုခိုင်မာစွာ ဆွဲဆောင်ထားသလဲ ဆိုတာကို ခွဲခြမ်းစိတ်ဖြာပြီး ရေးသားဖို့ ဖြစ်ပါတယ်။' },

      { type: 'h2', text: 'ဘယ်လို ချဉ်းကပ်ရေးသားရမလဲ' },
      { type: 'ul', items: [
        'ကိုယ့်ရဲ့ ကိုယ်ပိုင် ထင်မြင်ချက် (Personal Opinion) ကို အဓိကမထားပါနဲ့။',
        'ပေးထားတဲ့ Passage ထဲက အထောက်အထားတွေကိုသာ ကိုးကားပါ။',
        'ဘယ်ဘက်က အယူအဆက ပိုပြီး ဆွဲဆောင်မှုရှိလဲ၊ ဘာကြောင့်လဲ ဆိုတာကို စာအပေါ်မှာပဲ အခြေခံ၍ သုံးသပ်ပါ။',
        'Evidence နဲ့ Reasoning ကို အသုံးပြုပြီး နှစ်ဖက်ကို နှိုင်းယှဉ်ရေးသားပါ။',
      ] },

      { type: 'callout', icon: 'target', title: 'အဓိက မှတ်သားစရာ', text: 'Essay မှာ အမှတ်ကောင်းကောင်းရဖို့ Opinion (ကိုယ်ပိုင်အမြင်) ထက် Analysis (သုံးသပ်ခွဲခြမ်းမှု) က ပိုအရေးကြီးပါတယ်။ ဒီအချက်ကို နားလည်ပြီး လေ့ကျင့်ထားရင် RLA Essay အပိုင်းမှာ အမှတ်ပိုရဖို့ အခွင့်အရေး များလာပါလိမ့်မယ်။' },

      { type: 'p', text: 'GED အကြောင်း အခြေခံကနေ စတင်လေ့လာချင်ရင် ကျွန်တော်တို့ရဲ့ “GED ဆိုတာ ဘာလဲ” လမ်းညွှန်နဲ့ “GED ဘယ်လောက် ကုန်လဲ” ဆောင်းပါးတွေကို ဖတ်ကြည့်ပါ။ ကိုယ်တိုင် ဘယ်လောက် အဆင်သင့်ဖြစ်ပြီလဲ သိချင်ရင်တော့ အခမဲ့ GED အဆင်သင့်ဖြစ်မှု စစ်ဆေးချက်ကို ဖြေကြည့်နိုင်ပါတယ်။' },
    ],
  },
];
