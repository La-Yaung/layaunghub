// Telegram → blog webhook. Set as the bot's webhook URL; Telegram POSTs an
// update here whenever you publish to the connected channel. We verify the
// secret token, parse the message, and ingest it as a live blog post (no
// rebuild). See docs/blog-backend/SETUP.md.
export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from '../../lib/blog-db';
import { parseTelegramPost } from '../../lib/blog-parse';
import { ingestPost } from '../../lib/blog-ingest';

const ok = (body: unknown = { ok: true }) => new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });

async function downloadPhoto(fileId: string, token: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  try {
    const info = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`).then((r) => r.json());
    const filePath: string | undefined = info?.result?.file_path;
    if (!filePath) return null;
    const buf = Buffer.from(await fetch(`https://api.telegram.org/file/bot${token}/${filePath}`).then((r) => r.arrayBuffer()));
    const contentType = /\.png$/i.test(filePath) ? 'image/png' : 'image/jpeg';
    return { buffer: buf, contentType };
  } catch {
    return null;
  }
}

export const POST: APIRoute = async ({ request }) => {
  const token = env('TELEGRAM_BOT_TOKEN');
  const secret = env('TELEGRAM_WEBHOOK_SECRET');
  const allowedChat = env('TELEGRAM_ALLOWED_CHAT_ID');

  // Telegram echoes our secret in this header — reject anything that doesn't match.
  if (!token || !secret || request.headers.get('x-telegram-bot-api-secret-token') !== secret) {
    return new Response('forbidden', { status: 403 });
  }

  let update: any;
  try {
    update = await request.json();
  } catch {
    return ok(); // ack malformed payloads so Telegram doesn't retry forever
  }

  // Accept posts to a channel or messages to the bot; ignore edits/other updates.
  const post = update.channel_post ?? update.message;
  if (!post) return ok();

  // Optional allow-list: only ingest from the configured channel/chat.
  if (allowedChat && String(post.chat?.id) !== String(allowedChat)) return ok();

  const text: string = post.text ?? post.caption ?? '';
  if (!text.trim()) return ok(); // photo with no caption → nothing to publish

  try {
    const parsed = parseTelegramPost(text);
    let cover: { buffer: Buffer; contentType: string } | undefined;
    if (Array.isArray(post.photo) && post.photo.length) {
      const largest = post.photo[post.photo.length - 1];
      cover = (await downloadPhoto(largest.file_id, token)) ?? undefined;
    }
    const { slug } = await ingestPost({ ...parsed, cover, source: 'telegram' });
    return ok({ ok: true, slug });
  } catch (err) {
    console.error('[telegram] ingest failed:', err);
    // 200 so Telegram doesn't hammer retries; the error is logged for us.
    return ok({ ok: false, error: String(err) });
  }
};
