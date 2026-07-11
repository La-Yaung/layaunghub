// RSS feed for the Burmese blog (/my/blog/rss.xml), server-rendered from the DB.
// Besides feed readers, this is the hook for RSS→Telegram/IFTTT auto-announce.
export const prerender = false;

import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { blog } from '../../../data/blog.my';
import { getPosts } from '../../../lib/blog-db';

export const GET: APIRoute = async (context) => {
  const site = context.site ?? new URL('https://layaunghub.com');
  const posts = await getPosts();
  return rss({
    title: blog.meta.title,
    description: blog.meta.description,
    site: new URL('/my/blog/', site),
    items: posts.map((post) => ({
      title: post.title,
      description: post.excerpt,
      link: new URL(`/my/blog/${post.slug}/`, site).toString(),
      pubDate: new Date(post.date),
      categories: post.tags,
    })),
    customData: '<language>my</language>',
  });
};
