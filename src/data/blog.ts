// Blog UI copy (English). Posts themselves live in Supabase and are read at
// request time (see src/lib/blog-db.ts); new posts (e.g. ingested from
// Telegram) appear with no rebuild. Post authoring convention + schema:
// docs/blog-backend/.

// UI copy for the blog index + post chrome.
export const blog = {
  meta: {
    title: 'Blog — GED tips & study guides | La Yaung Hub',
    description:
      'GED tips, RLA essay guidance, exam-prep strategy and study notes from La Yaung Hub — our Facebook posts, rewritten as easy-to-read articles.',
  },
  eyebrow: 'Blog',
  heading: 'GED tips, guides & study notes',
  intro:
    'Educational posts from the La Yaung Hub Facebook page, rewritten and organised as clear, easy-to-read articles.',
  empty: 'Posts coming soon.',
  home: 'Home',
  readMore: 'Read more',
  onFacebook: 'View the original post on Facebook',
  share: 'Share this post',
  copyLink: 'Copy link',
  copied: 'Copied!',
  relatedHeading: 'More posts',
  emptyRelated: 'View all posts',
};
