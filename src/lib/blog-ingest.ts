// Shared blog ingestion — used by the Telegram webhook and the seed script.
// Turns a plain-text post (+ optional cover image) into a structured DB row:
// parses text → content blocks, generates a branded OG card, uploads cover +
// OG to Supabase Storage, and inserts the row. Runs server-side (service-role
// key), never in the browser.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { renderOgPng } from './og';
import { env } from './blog-db';
import { slugify, type ParsedPost } from './blog-parse';

let admin: SupabaseClient | null = null;
/** Service-role client (bypasses RLS) for inserts + Storage uploads. */
export function serviceDb(): SupabaseClient {
  const url = env('SUPABASE_URL');
  const key = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set');
  admin ??= createClient(url, key, { auth: { persistSession: false } });
  return admin;
}

export interface IngestInput extends ParsedPost {
  slug?: string;
  eyebrow?: string;
  fbUrl?: string;
  source?: string;
  cover?: { buffer: Buffer; contentType: string };
}

/** Generate OG, upload assets, insert the post. Returns the created slug. */
export async function ingestPost(input: IngestInput): Promise<{ slug: string }> {
  const c = serviceDb();
  const slug = input.slug ?? slugify(input.title);
  const eyebrow = input.eyebrow || 'GED Guide';

  // Cover (optional) — the original photo, self-hosted so FB links can't expire.
  let coverUrl: string | null = null;
  if (input.cover) {
    const ext = input.cover.contentType.includes('png') ? 'png' : 'jpg';
    const path = `covers/${slug}.${ext}`;
    await c.storage.from('blog').upload(path, input.cover.buffer, { contentType: input.cover.contentType, upsert: true });
    coverUrl = c.storage.from('blog').getPublicUrl(path).data.publicUrl;
  }

  // Branded share card — rendered once, stored, referenced by og:image. Never
  // let a rendering hiccup (fonts, wasm, memory) block publishing: on failure
  // the post still goes live and falls back to the site's default OG image.
  let ogUrl: string | null = null;
  try {
    const ogPng = await renderOgPng({ eyebrow, title: input.title });
    const ogPath = `og/${slug}.png`;
    await c.storage.from('blog').upload(ogPath, ogPng, { contentType: 'image/png', upsert: true });
    ogUrl = c.storage.from('blog').getPublicUrl(ogPath).data.publicUrl;
  } catch (err) {
    console.error('[ingest] OG render failed, publishing without a custom card:', err);
  }

  const { error } = await c.from('posts').upsert(
    {
      slug,
      title: input.title,
      excerpt: input.excerpt,
      body: input.body,
      tags: input.tags,
      cover_url: coverUrl,
      og_url: ogUrl,
      eyebrow,
      fb_url: input.fbUrl ?? null,
      source: input.source ?? 'telegram',
      published: true,
    },
    { onConflict: 'slug' }
  );
  if (error) throw new Error(`insert failed: ${error.message}`);
  return { slug };
}
