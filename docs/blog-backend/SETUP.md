# Blog auto-publish setup (Telegram → Supabase → instant blog)

You post in a Telegram channel → it appears on `layaunghub.com/my/blog/` in a few
seconds, **with no rebuild or deploy**. This is a one-time setup (~15 min).

Architecture: Telegram calls a webhook (`/api/telegram`) → the post is parsed,
a branded share card is generated, and everything is saved to Supabase. The blog
pages read Supabase live on each visit.

---

## 1. Supabase (the database)

1. Go to **https://supabase.com** → sign in with GitHub → **New project**.
   - Name: `layaung-blog` · pick a strong DB password (save it) · region: Singapore.
   - Wait ~2 min for it to provision.
2. Left sidebar → **SQL Editor** → **New query** → paste the entire contents of
   [`schema.sql`](./schema.sql) → **Run**. This creates the `posts` table, the
   public-read policy, and the `blog` storage bucket.
3. Left sidebar → **Settings** (gear) → **API**. Copy these three values:
   - **Project URL** → `SUPABASE_URL`
   - **anon / public** key → `SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ secret — never expose in the browser)

---

## 2. Telegram (the input)

1. In Telegram, message **@BotFather** → `/newbot` → give it a name + username
   (e.g. `layaung_blog_bot`). BotFather replies with a **bot token** → `TELEGRAM_BOT_TOKEN`.
2. Create a **new Channel** (this is where you'll post). Make it private if you like.
3. Channel → **Manage** → **Administrators** → add your bot as an admin (needs
   "Post messages"). This lets Telegram forward your channel posts to the webhook.
4. Make up a long random string for `TELEGRAM_WEBHOOK_SECRET` (e.g. from a password
   generator). You'll use the same value in step 3 and 4.
5. Find your **channel id** (`TELEGRAM_ALLOWED_CHAT_ID`): post any message in the
   channel, then open in a browser (replace `<TOKEN>`):
   `https://api.telegram.org/bot<TOKEN>/getUpdates`
   Look for `"chat":{"id":-1001234567890,...}` — that negative number is the id.

---

## 3. Environment variables

**Local** (for testing + the seed script): copy `.env.example` → `.env` and fill
in all the values from steps 1–2.

**Vercel** (production): Project → **Settings → Environment Variables** → add the
same 6 keys (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
`TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_SECRET`, `TELEGRAM_ALLOWED_CHAT_ID`).
Also confirm **Settings → General → Node.js Version = 22.x** (the repo pins this).

Deploy the site (push to the branch — Vercel builds automatically).

---

## 4. Point Telegram at the webhook

Once deployed, register the webhook (replace `<TOKEN>` and `<SECRET>`):

```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://layaunghub.com/api/telegram&secret_token=<SECRET>
```

Open that URL in a browser once. You should see `{"ok":true,...}`. Telegram will
now POST every channel post to your site, and the site verifies `<SECRET>`.

---

## 5. Seed the first post (optional)

To load the existing "GED RLA Essay" article into the DB (with the same URL):

```bash
nvm use 22          # if your default node is older
npm run seed        # reads .env, generates the OG card, inserts the post
```

Visit `http://localhost:4321/my/blog/` (via `npm run dev`) to confirm it shows.

---

## 6. How to post (authoring convention)

Full guide + an AI reformatting prompt: [`POST-FORMAT.md`](./POST-FORMAT.md).
Just post normally in your Telegram channel. Formatting rules:

| In your Telegram message        | Becomes on the blog            |
| ------------------------------- | ------------------------------ |
| **First line**                  | The post **title**             |
| First paragraph after the title | The **excerpt / lead**         |
| A line like `## ခေါင်းစဉ်`       | A **section heading**          |
| Lines starting `- ` or `• `      | A **bullet list**              |
| Blank line                      | New paragraph                  |
| A line of only `#GED #RLA` tags | **Tags** (shown as pills)      |
| An attached **photo**           | The post **cover image**       |

Every post also gets an auto-generated purple share card (logo + title) used when
the link is shared on Facebook/Telegram/Messenger.

**Example post:**

```
GED စာမေးပွဲ ဘယ်နှစ်ကြိမ် ဖြေလို့ရလဲ?

GED မှာ retake စနစ် ဘယ်လိုအလုပ်လုပ်လဲ ရှင်းပြပါမယ်။

## Retake စနစ်
ဘာသာရပ်တစ်ခု မအောင်ရင် အဲဒီဘာသာကိုပဲ ပြန်ဖြေရုံပါ။

- ပထမ ၂ ကြိမ် ပြန်ဖြေခ လျှော့စျေးရှိ
- တစ်နှစ်ပတ်လုံး ဖြေနိုင်

#GED #Retake #StudyTips
```

---

## Troubleshooting

- **Webhook returns 403** → the `secret_token` in the setWebhook URL doesn't match
  `TELEGRAM_WEBHOOK_SECRET`. Re-run setWebhook with the exact same secret.
- **Post doesn't appear** → check Vercel → your project → the `/api/telegram`
  function **Logs**. Also confirm `TELEGRAM_ALLOWED_CHAT_ID` matches your channel.
- **Check webhook status**: `https://api.telegram.org/bot<TOKEN>/getWebhookInfo`
- **Remove webhook** (e.g. to pause): `https://api.telegram.org/bot<TOKEN>/deleteWebhook`
