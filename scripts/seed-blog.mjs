// One-time seed: insert the first blog post (the GED RLA Essay article) into
// Supabase, generating + uploading its OG share card. Keeps the same slug the
// static version used so /my/blog/ged-rla-essay-tips/ stays stable.
//
// Run from the project root with your Supabase service credentials:
//   node --env-file=.env scripts/seed-blog.mjs
// (.env must contain SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.)
//
// Self-contained on purpose — it imports og.ts with an explicit extension so it
// runs under plain Node without the Vite resolver.
import { createClient } from '@supabase/supabase-js';
import { renderOgPng } from '../src/lib/og.ts';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Run: node --env-file=.env scripts/seed-blog.mjs');
  process.exit(1);
}

const post = {
  slug: 'ged-rla-essay-tips',
  title: 'GED RLA Essay မှာ အမှတ်ကောင်းကောင်းရဖို့ ဘာတွေ သိထားရမလဲ?',
  excerpt:
    'GED ရဲ့ အင်္ဂလိပ်စာ Essay မှာ ကျောင်းသားအများစု မှားတတ်ပြီး အမှတ်လျော့စေတဲ့ အချက်တစ်ခုကို ရှင်းပြထားပါတယ် — Opinion ထက် Analysis က ဘာကြောင့် ပိုအရေးကြီးလဲ။',
  tags: ['GED', 'RLA', 'Essay'],
  eyebrow: 'GED Guide',
  fb_url:
    'https://web.facebook.com/layaunghub/posts/pfbid036aWkmNZMQ2XNeH8Fqh2Zt8sYbuvd3rpaCr4AdcwtrRH4HhTwfmTyuYvvhEzHSttql',
  published_at: '2026-07-11T00:00:00Z',
  source: 'manual',
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
};

const supabase = createClient(url, key, { auth: { persistSession: false } });

console.log('Rendering OG card…');
const ogPng = await renderOgPng({ eyebrow: post.eyebrow, title: post.title });
const ogPath = `og/${post.slug}.png`;
const up = await supabase.storage.from('blog').upload(ogPath, ogPng, { contentType: 'image/png', upsert: true });
if (up.error) { console.error('OG upload failed:', up.error.message); process.exit(1); }
const ogUrl = supabase.storage.from('blog').getPublicUrl(ogPath).data.publicUrl;
console.log('OG uploaded →', ogUrl);

const { error } = await supabase.from('posts').upsert(
  {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    body: post.body,
    tags: post.tags,
    og_url: ogUrl,
    eyebrow: post.eyebrow,
    fb_url: post.fb_url,
    source: post.source,
    published: true,
    published_at: post.published_at,
  },
  { onConflict: 'slug' }
);
if (error) { console.error('Insert failed:', error.message); process.exit(1); }
console.log('✅ Seeded post:', post.slug);
