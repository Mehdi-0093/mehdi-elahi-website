# Mehdi Elahi — Personal Website

Personal site and academic portfolio for **Mehdi Elahi**, Ph.D. researcher in
Computer Engineering (SoC performance, hardware verification, edge-AI).

- **Phase 1 (this repo):** a polished portfolio — Hero, About, Skills,
  Experience, Projects, Education, Publications, Events, and a Supabase-backed
  contact form — plus the database foundation for Phase 2.
- **Phase 2 (planned):** login-gated webinars and online classes (Supabase Auth
  + Storage). The schema and storage buckets are already designed in
  [`supabase/migrations`](supabase/migrations).

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- [Supabase](https://supabase.com) — Postgres, Auth, Storage
- [Resend](https://resend.com) — contact-form email
- React Hook Form + Zod, lucide-react
- Deployed on [Vercel](https://vercel.com)

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in values (optional for the portfolio)
npm run dev                         # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

> The site runs without any environment variables — the contact form simply
> degrades gracefully (it won't persist messages or send email until Supabase
> and Resend are configured).

## Environment variables

See [`.env.local.example`](.env.local.example). Set the same variables in your
Vercel project settings for production.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key for saving contact messages |
| `RESEND_API_KEY` | Resend API key for email notifications |
| `CONTACT_NOTIFICATION_EMAIL` | Inbox that receives contact submissions |
| `CONTACT_FROM_EMAIL` | (Optional) verified sender address |

## Editing content

All CV content lives in plain TypeScript files in [`data/`](data) — edit these
to update the site (no database needed):

`profile.ts` · `skills.ts` · `experience.ts` · `projects.ts` · `education.ts`
· `publications.ts` · `events.ts` · `navigation.ts` · `site.ts`

The downloadable CV is [`public/Mehdi_Elahi__CV.pdf`](public/Mehdi_Elahi__CV.pdf).

## Project structure

```
app/         Routes, layout, metadata, SEO (sitemap/robots/OG), /api/contact
components/  Navbar, Footer, sections/, ui/ primitives, Reveal, icons
data/        CV content (typed)
lib/         supabase clients, resend helper, zod validations, cn()
supabase/    SQL migrations (Phase 1 + Phase 2 foundation)
```

## Database

See [`supabase/README.md`](supabase/README.md) for creating a project and
applying the migrations.

## Deployment

Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new),
or run `vercel` with the Vercel CLI. Add the environment variables above in the
Vercel project settings, then redeploy.
