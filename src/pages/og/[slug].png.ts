// Per-guide Open Graph cards (1200×630 PNG), generated at build time for each
// known guide slug via the shared renderer (src/lib/og.ts) — the same designed
// card the blog uses. Guide pages reference these as their og:/twitter: image
// so shared links show a branded card instead of the generic site image.
import type { APIRoute } from 'astro';
import { guideOrder, guides, type GuideSlug } from '../../data/guides';
import { renderOgPng } from '../../lib/og';

export function getStaticPaths() {
  return guideOrder.map((slug) => ({ params: { slug } }));
}

export const GET: APIRoute = async ({ params }) => {
  const guide = guides[params.slug as GuideSlug];
  if (!guide) return new Response('Not found', { status: 404 });
  const png = await renderOgPng({ eyebrow: guide.eyebrow, title: guide.h1 });
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
