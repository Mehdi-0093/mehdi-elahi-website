-- 0002_phase2_classes_webinars.sql
-- Foundation for Phase 2 (webinars + online classes). Designed now so the
-- database is ready; the UI/features are built in Phase 2.
-- Access model: free accounts (Supabase Auth) required to view materials.

-- ---------------------------------------------------------------------------
-- Profiles (1:1 with auth.users) — free accounts
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  full_name  text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create a profile row on signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Courses & lessons
-- ---------------------------------------------------------------------------
create table if not exists public.courses (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  description  text,
  cover_path   text,
  is_published boolean not null default false,
  created_at   timestamptz not null default now()
);

alter table public.courses enable row level security;

create policy "Published courses viewable by authenticated users"
  on public.courses for select to authenticated using (is_published = true);

create table if not exists public.lessons (
  id               uuid primary key default gen_random_uuid(),
  course_id        uuid not null references public.courses (id) on delete cascade,
  title            text not null,
  description      text,
  position         int not null default 0,
  video_path       text,
  duration_seconds int,
  created_at       timestamptz not null default now()
);

alter table public.lessons enable row level security;

-- Lessons are viewable only to users enrolled in a published course.
create policy "Lessons viewable by enrolled users"
  on public.lessons for select to authenticated using (
    exists (
      select 1
      from public.enrollments e
      join public.courses c on c.id = e.course_id
      where e.course_id = lessons.course_id
        and e.user_id = auth.uid()
        and c.is_published = true
    )
  );

-- ---------------------------------------------------------------------------
-- Webinars
-- ---------------------------------------------------------------------------
create table if not exists public.webinars (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  title          text not null,
  description    text,
  scheduled_at   timestamptz,
  recording_path text,
  is_published   boolean not null default false,
  created_at     timestamptz not null default now()
);

alter table public.webinars enable row level security;

create policy "Published webinars viewable by authenticated users"
  on public.webinars for select to authenticated using (is_published = true);

-- ---------------------------------------------------------------------------
-- Materials (files attached to a lesson OR a webinar)
-- ---------------------------------------------------------------------------
create table if not exists public.materials (
  id         uuid primary key default gen_random_uuid(),
  lesson_id  uuid references public.lessons (id) on delete cascade,
  webinar_id uuid references public.webinars (id) on delete cascade,
  title      text not null,
  file_path  text not null,
  kind       text,
  created_at timestamptz not null default now(),
  constraint materials_one_parent check (
    (lesson_id is not null and webinar_id is null) or
    (lesson_id is null and webinar_id is not null)
  )
);

alter table public.materials enable row level security;

-- ---------------------------------------------------------------------------
-- Enrollments & webinar registrations
-- ---------------------------------------------------------------------------
create table if not exists public.enrollments (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  course_id  uuid not null references public.courses (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);

alter table public.enrollments enable row level security;

create policy "Users view own enrollments"
  on public.enrollments for select to authenticated using (auth.uid() = user_id);
create policy "Users can enroll themselves"
  on public.enrollments for insert to authenticated with check (auth.uid() = user_id);

create table if not exists public.webinar_registrations (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  webinar_id uuid not null references public.webinars (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, webinar_id)
);

alter table public.webinar_registrations enable row level security;

create policy "Users view own registrations"
  on public.webinar_registrations for select to authenticated using (auth.uid() = user_id);
create policy "Users can register themselves"
  on public.webinar_registrations for insert to authenticated with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Private storage buckets (access via server-generated signed URLs in Phase 2)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('class-materials', 'class-materials', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('webinar-recordings', 'webinar-recordings', false)
on conflict (id) do nothing;
