-- 0001_contact_messages.sql
-- Contact form submissions (Phase 1 — live).

create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null,
  email      text not null,
  subject    text,
  message    text not null,
  status     text not null default 'new'
);

-- Enable RLS. Inserts and reads happen server-side via the service-role key
-- (which bypasses RLS), so messages stay private by default — no public
-- policies are granted.
alter table public.contact_messages enable row level security;

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);
