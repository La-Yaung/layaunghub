// Dynamic sitemap for the DB-backed blog. The static @astrojs/sitemap only
// covers prerendered routes, so blog posts (server-rendered from Supabase) are
// invisible to it. This endpoint lists every published post with its lastmod,
// so search engines + AI crawlers can discover posts directly. Referenced from
// robots.txt as a second `Sitemap:` line.
export const prerender = false;

import type { APIRoute } from 'astro';
import { getPosts } from '../lib/blog-db';

export const GET: APIRoute = async (context) => {
  const site = context.site ?? new URL('https://layaunghub.com');
  const posts = await getPosts();

  const urls = posts
    .map((p) => {
      const loc = new URL(`/blog/${p.slug}/`, site).toString();
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${p.date}</lastmod>\n    <changefreq>monthly</changefreq>\n  </url>`;
    })
    .join('\n');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Short cache so newly ingested posts surface quickly.
      'Cache-Control': 'public, max-age=600',
    },
  });
};
