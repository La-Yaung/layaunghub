-- La Yaung Hub — blog backend schema.
-- Run this once in your Supabase project: Dashboard → SQL Editor → paste → Run.

-- 1) Posts table -------------------------------------------------------------
create table if not exists public.posts (
  id            bigint generated always as identity primary key,
  slug          text unique not null,
  title         text not null,
  excerpt       text not null default '',
  body          jsonb not null default '[]'::jsonb,   -- array of content blocks
  tags          text[] not null default '{}',
  cover_url     text,                                  -- Storage public URL (optional)
  og_url        text,                                  -- generated share card URL
  eyebrow       text default 'GED Guide',
  fb_url        text,                                  -- link to the original FB post
  source        text default 'manual',                 -- 'manual' | 'telegram'
  published     boolean not null default true,
  published_at  timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

create index if not exists posts_published_at_idx
  on public.posts (published_at desc) where published;

-- 2) Row-level security: anyone may READ published posts; writes need the
--    service-role key (used only by the server-side webhook + seed script,
--    which bypasses RLS). No public insert/update/delete policy is defined.
alter table public.posts enable row level security;

drop policy if exists "public read published posts" on public.posts;
create policy "public read published posts"
  on public.posts for select
  using (published = true);

-- 3) Storage bucket for cover images + OG share cards (public read) ----------
insert into storage.buckets (id, name, public)
values ('blog', 'blog', true)
on conflict (id) do nothing;
