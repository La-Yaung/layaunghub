// Pure text → structured-post parsing + slug generation. No IO (no Supabase,
// no OG rendering) so it's trivially unit-testable and reused by both the
// Telegram webhook and the seed script.
import { customAlphabet } from 'nanoid';
import type { Block } from '../data/guides';

const nano = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 6);

/** ASCII slug from any latin words in the title, else "post"; + short id. */
export function slugify(title: string): string {
  const ascii = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 40)
    .replace(/^-|-$/g, '');
  return `${ascii || 'post'}-${nano()}`;
}

export interface ParsedPost {
  title: string;
  excerpt: string;
  tags: string[];
  body: Block[];
}

const HASHTAG_ONLY = /^\s*(#[\p{L}\p{N}_]+\s*)+$/u;

/**
 * Parse a Telegram-authored post into structured content. Convention:
 *   line 1        → title
 *   #hash #tags   → tags (any hashtag-only line, removed from body)
 *   "## heading"  → section heading
 *   "- " / "• "   → list items (consecutive lines grouped)
 *   blank line    → paragraph break
 * The first paragraph becomes the excerpt (and is not repeated in the body).
 */
export function parseTelegramPost(raw: string): ParsedPost {
  const lines = raw.replace(/\r/g, '').split('\n');
  let title = '';
  const tags: string[] = [];
  const blocks: Block[] = [];
  let para: string[] = [];
  let list: string[] = [];

  const flushPara = () => { if (para.length) { blocks.push({ type: 'p', text: para.join(' ').trim() }); para = []; } };
  const flushList = () => { if (list.length) { blocks.push({ type: 'ul', items: list.slice() }); list = []; } };
  const flush = () => { flushList(); flushPara(); };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!title) { if (line) title = line; continue; }

    if (!line) { flush(); continue; }
    if (HASHTAG_ONLY.test(line)) {
      for (const m of line.matchAll(/#([\p{L}\p{N}_]+)/gu)) tags.push(m[1]);
      continue;
    }
    if (/^-{3,}$/.test(line)) { flush(); continue; } // divider → ignore
    if (line.startsWith('## ')) { flush(); blocks.push({ type: 'h2', text: line.slice(3).trim() }); continue; }
    if (/^([-•*])\s+/.test(line)) { flushPara(); list.push(line.replace(/^([-•*])\s+/, '').trim()); continue; }
    // ordinary paragraph line
    flushList();
    para.push(line);
  }
  flush();

  // First paragraph → excerpt, removed from the body so it isn't shown twice.
  let excerpt = '';
  const firstP = blocks.findIndex((b) => b.type === 'p');
  if (firstP !== -1) {
    excerpt = (blocks[firstP] as { text: string }).text;
    blocks.splice(firstP, 1);
  }

  return { title: title || 'Untitled', excerpt, tags, body: blocks };
}
