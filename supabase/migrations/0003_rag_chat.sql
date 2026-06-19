-- 0003_rag_chat.sql
-- RAG knowledge base, chat sessions, leads, and helper function.
-- Requires pgvector extension — enable it first in your Supabase dashboard
-- under Database → Extensions, or uncomment the line below if you have
-- superuser access.
-- create extension if not exists vector;

-- ── Documents ──────────────────────────────────────────────────────────────
create table if not exists public.rag_documents (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null    default now(),
  title       text        not null,
  authors     text[]      default '{}',
  year        integer,
  venue       text,
  doi         text,
  abstract    text,
  file_path   text,
  file_size   integer,
  page_count  integer,
  status      text        not null default 'pending'
                check (status in ('pending', 'processing', 'ready', 'error')),
  error_msg   text,
  chunk_count integer      not null default 0,
  metadata    jsonb        not null default '{}'
);

create index if not exists rag_documents_status_idx
  on public.rag_documents (status);

-- ── Chunks (with embeddings) ───────────────────────────────────────────────
create table if not exists public.rag_chunks (
  id            uuid        primary key default gen_random_uuid(),
  created_at    timestamptz not null    default now(),
  document_id   uuid        not null    references public.rag_documents (id) on delete cascade,
  chunk_index   integer     not null,
  content       text        not null,
  token_count   integer,
  section_title text,
  page_number   integer,
  embedding     vector(1536),
  metadata      jsonb       not null    default '{}'
);

-- IVFFlat index for fast approximate nearest-neighbour search.
-- Tune `lists` after the first few hundred documents (lists ≈ sqrt(rows)).
create index if not exists rag_chunks_embedding_idx
  on public.rag_chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 50);

create index if not exists rag_chunks_document_id_idx
  on public.rag_chunks (document_id);

-- ── Chat sessions ──────────────────────────────────────────────────────────
create table if not exists public.chat_sessions (
  id           uuid        primary key default gen_random_uuid(),
  created_at   timestamptz not null    default now(),
  updated_at   timestamptz not null    default now(),
  session_key  text        not null    unique,
  user_ip      text,
  user_agent   text,
  page_url     text,
  memory       jsonb       not null    default '{}',
  metadata     jsonb       not null    default '{}'
);

create index if not exists chat_sessions_key_idx
  on public.chat_sessions (session_key);

create index if not exists chat_sessions_updated_idx
  on public.chat_sessions (updated_at desc);

-- ── Chat messages ──────────────────────────────────────────────────────────
create table if not exists public.chat_messages (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null    default now(),
  session_id  uuid        not null    references public.chat_sessions (id) on delete cascade,
  role        text        not null    check (role in ('user', 'assistant', 'tool')),
  content     text        not null,
  sources     jsonb,
  tool_calls  jsonb,
  tokens_used integer,
  latency_ms  integer,
  metadata    jsonb       not null    default '{}'
);

create index if not exists chat_messages_session_idx
  on public.chat_messages (session_id, created_at);

-- ── Leads captured via chatbot ─────────────────────────────────────────────
create table if not exists public.chat_leads (
  id                 uuid        primary key default gen_random_uuid(),
  created_at         timestamptz not null    default now(),
  session_id         uuid        references public.chat_sessions (id),
  name               text,
  email              text,
  organization       text,
  message            text,
  research_interests text[]      default '{}',
  status             text        not null default 'new'
                     check (status in ('new', 'contacted', 'archived')),
  metadata           jsonb       not null default '{}'
);

create index if not exists chat_leads_status_idx
  on public.chat_leads (status, created_at desc);

-- ── RLS: all tables private; service-role key (used by API routes) bypasses RLS ──
alter table public.rag_documents  enable row level security;
alter table public.rag_chunks     enable row level security;
alter table public.chat_sessions  enable row level security;
alter table public.chat_messages  enable row level security;
alter table public.chat_leads     enable row level security;

-- ── Similarity search helper (called via Supabase RPC) ────────────────────
create or replace function match_chunks(
  query_embedding vector(1536),
  match_threshold float    default 0.35,
  match_count     int      default 8
)
returns table (
  id            uuid,
  document_id   uuid,
  content       text,
  section_title text,
  page_number   int,
  similarity    float,
  doc_title     text,
  doc_year      int,
  doc_authors   text[]
)
language sql stable
as $$
  select
    rc.id,
    rc.document_id,
    rc.content,
    rc.section_title,
    rc.page_number,
    1 - (rc.embedding <=> query_embedding)  as similarity,
    rd.title                                as doc_title,
    rd.year                                 as doc_year,
    rd.authors                              as doc_authors
  from public.rag_chunks rc
  join public.rag_documents rd on rd.id = rc.document_id
  where
    rd.status = 'ready'
    and 1 - (rc.embedding <=> query_embedding) > match_threshold
  order by rc.embedding <=> query_embedding
  limit match_count;
$$;
