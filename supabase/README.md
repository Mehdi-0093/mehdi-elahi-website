# Supabase setup

This folder holds the database schema for the site.

- `migrations/0001_contact_messages.sql` — **Phase 1 (live)**. The table the
  contact form writes to.
- `migrations/0002_phase2_classes_webinars.sql` — **Phase 2 foundation**.
  Profiles, courses, lessons, webinars, materials, enrollments, registrations,
  RLS policies, and private storage buckets. Safe to apply now; the UI is built
  later.

## 1. Create a project

Create a free project at <https://supabase.com/dashboard>. Then, from
**Project Settings → API**, copy into your `.env.local` (see `.env.local.example`):

- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (server-only, keep secret)

## 2. Apply the migrations

**Option A — Dashboard (simplest):** open **SQL Editor**, paste the contents of
each file in `migrations/` (in order) and run.

**Option B — Supabase CLI:**

```bash
npm i -g supabase
supabase link --project-ref <your-project-ref>
supabase db push
```

## 3. Verify

In **Table Editor** you should see `contact_messages` (Phase 1) and the Phase 2
tables. Submitting the contact form should add a row to `contact_messages`.
