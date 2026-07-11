// Burmese (Unicode) blog — UI copy only. Posts themselves live in Supabase and
// are read at request time (see src/lib/blog-db.ts); new posts (e.g. ingested
// from Telegram) appear with no rebuild. Post authoring convention + schema:
// docs/blog-backend/.

// UI copy for the blog index + post chrome (Burmese only).
export const blog = {
  meta: {
    title: 'ဆောင်းပါးများ — GED အကြံပြုချက်များ | La Yaung Hub',
    description: 'GED, RLA Essay, စာမေးပွဲပြင်ဆင်နည်းနှင့် ပညာရေးဆိုင်ရာ အကြံပြုချက်များ — La Yaung Hub ၏ Facebook ပို့စ်များကို ဖတ်ရလွယ်ကူအောင် ပြန်လည်ရေးသားထားသည်။',
  },
  eyebrow: 'ဆောင်းပါးများ',
  heading: 'GED အကြံပြုချက်များနှင့် ဆောင်းပါးများ',
  intro: 'La Yaung Hub ၏ Facebook စာမျက်နှာမှ ပညာရေးဆိုင်ရာ ပို့စ်များကို ဖတ်ရလွယ်ကူပြီး စနစ်တကျ ဖွဲ့စည်းထားသည့် ဆောင်းပါးများအဖြစ် ပြန်လည်တင်ဆက်ထားပါသည်။',
  empty: 'ဆောင်းပါးများ မကြာမီ တင်ပါတော့မည်။',
  home: 'ပင်မ',
  readMore: 'ဆက်ဖတ်ရန်',
  onFacebook: 'Facebook တွင် မူရင်းပို့စ် ကြည့်ရန်',
  relatedHeading: 'နောက်ထပ် ဆောင်းပါးများ',
  emptyRelated: 'ဆောင်းပါးအားလုံး ကြည့်ရန်',
};
