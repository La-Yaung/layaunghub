// Supabase-backed data layer for the Burmese blog. The blog routes are
// server-rendered (prerender = false), so these run per request and read the
// live `posts` table — new posts (e.g. ingested from Telegram) appear with no
// rebuild. Reads use the anon key + a public-read RLS policy on published rows.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Block } from '../data/guides';

// Env is read from import.meta.env (Astro dev/.env) with a process.env fallback
// (Vercel serverless runtime), so the same code works locally and deployed.
export function env(key: string): string | undefined {
  return (import.meta.env as Record<string, string | undefined>)[key] ?? process.env[key];
}

export const SUPABASE_URL = env('SUPABASE_URL');
const SUPABASE_ANON_KEY = env('SUPABASE_ANON_KEY');

let client: SupabaseClient | null = null;
/** Read-only client (anon key). Returns null if env is not configured. */
export function db(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  client ??= createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });
  return client;
}

// Shape stored in Postgres (snake_case columns → mapped to BlogPost below).
interface PostRow {
  slug: string;
  title: string;
  excerpt: string;
  body: Block[];
  tags: string[] | null;
  cover_url: string | null;
  og_url: string | null;
  eyebrow: string | null;
  fb_url: string | null;
  published_at: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  tags: string[];
  excerpt: string;
  cover?: string;
  ogUrl?: string;
  coverEyebrow: string;
  fbUrl?: string;
  body: Block[];
}

const MM_DIGITS = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];
const MM_MONTHS = ['ဇန်နဝါရီ', 'ဖေဖော်ဝါရီ', 'မတ်', 'ဧပြီ', 'မေ', 'ဇွန်', 'ဇူလိုင်', 'ဩဂုတ်', 'စက်တင်ဘာ', 'အောက်တိုဘာ', 'နိုဝင်ဘာ', 'ဒီဇင်ဘာ'];
const toMyDigits = (n: number | string) => String(n).replace(/\d/g, (d) => MM_DIGITS[+d]);

/** "2026-07-11" → "၂၀၂၆ ဇူလိုင် ၁၁" */
export function burmeseDate(iso: string): string {
  const d = new Date(iso);
  return `${toMyDigits(d.getUTCFullYear())} ${MM_MONTHS[d.getUTCMonth()]} ${toMyDigits(d.getUTCDate())}`;
}

function mapRow(r: PostRow): BlogPost {
  return {
    slug: r.slug,
    title: r.title,
    date: r.published_at.slice(0, 10),
    dateLabel: burmeseDate(r.published_at),
    tags: r.tags ?? [],
    excerpt: r.excerpt,
    cover: r.cover_url ?? undefined,
    ogUrl: r.og_url ?? undefined,
    coverEyebrow: r.eyebrow || 'GED Guide',
    fbUrl: r.fb_url ?? undefined,
    body: r.body ?? [],
  };
}

const COLS = 'slug,title,excerpt,body,tags,cover_url,og_url,eyebrow,fb_url,published_at';

/** All published posts, newest first. Empty array if DB is unconfigured/unreachable. */
export async function getPosts(): Promise<BlogPost[]> {
  const c = db();
  if (!c) return [];
  const { data, error } = await c
    .from('posts')
    .select(COLS)
    .eq('published', true)
    .order('published_at', { ascending: false });
  if (error || !data) return [];
  return (data as PostRow[]).map(mapRow);
}

/** One published post by slug, or null. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const c = db();
  if (!c) return null;
  const { data, error } = await c
    .from('posts')
    .select(COLS)
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  if (error || !data) return null;
  return mapRow(data as PostRow);
}
