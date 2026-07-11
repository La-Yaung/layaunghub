// RSS feed for the Burmese blog (/my/blog/rss.xml). Besides normal feed
// readers, this is the hook for social automation: RSS→Telegram/IFTTT bots can
// auto-announce every new post.
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { posts, blog } from '../../../data/blog.my';

export const GET: APIRoute = (context) => {
  const site = context.site ?? new URL('https://layaunghub.com');
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
