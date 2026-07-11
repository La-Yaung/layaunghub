# Post format (for Telegram → blog)

How to write a Telegram channel post so it becomes a clean, well-structured blog
article. Keep it **plain text** — no `**bold**` / `_italic_` / links inside the
body. Burmese stays Burmese; keep English exam terms (GED, RLA, IGCSE, Essay…)
in English.

## The rules

| Line in your post              | Becomes                       |
| ------------------------------ | ----------------------------- |
| **First line**                 | The **title**                 |
| First paragraph after the title| The **lead / excerpt**        |
| `## ...`                       | A **section heading**         |
| `- ...` (or `• ...`)           | A **bullet point**            |
| Blank line                     | New **paragraph**             |
| Last line of `#tags`           | The **tags** (pills)          |
| (attach a photo in Telegram)   | The **cover image**           |

## Prompt to hand any AI to reformat a Facebook post

```
Restructure my Facebook post below into a clean blog post for my Telegram-to-website
publishing bot. Follow this EXACT format (plain text, no markdown bold/italic):

- Line 1: a short, search-friendly TITLE (a question works well), in Burmese.
- Then one punchy summary sentence (this becomes the lead).
- Break the content into 2–4 sections, each starting with "## " then a Burmese heading.
- Use "- " bullet lines for lists of tips/steps.
- Separate paragraphs with a blank line. Keep paragraphs short (2–3 sentences).
- Keep all Burmese text natural (Unicode), but keep English exam terms (GED, RLA,
  IGCSE, Essay, Retake…) in English.
- End with ONE line of 3–5 relevant hashtags, e.g. "#GED #RLA #StudyTips".
- Do NOT use bold, italics, emojis-as-headings, or links inside the body.
- Output ONLY the finished post text, ready to paste into Telegram — nothing else.

Here is my Facebook post:
<<< paste your Facebook post here >>>
```

## Example of correct output

```
GED RLA Essay မှာ အမှတ်ကောင်းကောင်းရဖို့ ဘာတွေ သိထားရမလဲ?

GED ရဲ့ Essay အပိုင်းမှာ ကျောင်းသားအများစု မှားတတ်တဲ့ အချက်တစ်ခုကို ရှင်းပြပါမယ်။

## အများစု မှားတတ်တဲ့ အချက်
ကိုယ့်ရဲ့ ထင်မြင်ချက်ကို အခြေခံပြီး ရေးလိုက်တာက အမှားပါ။

## ဘယ်လို ရေးရမလဲ
- Personal Opinion ကို အဓိကမထားပါနဲ့။
- Passage ထဲက Evidence ကိုသာ ကိုးကားပါ။
- Argument နှစ်ခုကို နှိုင်းယှဉ်ပြီး သုံးသပ်ပါ။

#GED #RLA #Essay #StudyTips
```

The first line becomes the page title + the purple share-card headline; each `##`
line becomes a styled section heading; the `- ` lines become a bullet list; the
hashtags become tag pills.
