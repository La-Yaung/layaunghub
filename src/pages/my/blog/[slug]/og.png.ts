// Per-post Open Graph share card: /my/blog/<slug>/og.png (1200×630).
// Generated at build time so FB/Telegram/Twitter show the post's own title
// and the La Yaung logo instead of the generic site image.
import type { APIRoute } from 'astro';
import { posts } from '../../../../data/blog.my';
import { renderOgPng } from '../../../../lib/og';

export function getStaticPaths() {
  return posts.map((post) => ({ params: { slug: post.slug }, props: { post } }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgPng({ eyebrow: props.post.coverEyebrow, title: props.post.title });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
