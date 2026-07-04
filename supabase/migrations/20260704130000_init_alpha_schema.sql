-- ============================================================
-- MY NEW BODY — Schéma Alpha (appliqué le 2026-07-04 via MCP)
-- Tables : alpha_applications, profiles, check_ins, daily_programs
-- RLS activé partout. Écritures sensibles via service role (Edge Functions).
-- Ordre : tables → fonction helper → RLS → triggers
-- (la fonction SQL référence profiles, elle doit être créée après les tables)
-- ============================================================

-- ── 1. TABLES ──
create table if not exists public.alpha_applications (
  id uuid primary key default gen_random_uuid(),
  prenom text not null check (char_length(trim(prenom)) between 2 and 100),
  email text not null unique check (char_length(email) <= 254),
  objectif text not null check (char_length(objectif) <= 100),
  niveau text not null check (char_length(niveau) <= 50),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  prenom text not null default '',
  objectif text,
  niveau text,
  is_alpha_tester boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.check_ins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  checkin_date date not null default current_date,
  sommeil smallint not null check (sommeil between 1 and 5),
  energie smallint not null check (energie between 1 and 5),
  stress smallint not null check (stress between 1 and 5),
  douleurs smallint not null check (douleurs between 1 and 5),
  humeur smallint not null check (humeur between 1 and 5),
  nutrition_hier text check (nutrition_hier in ('leger', 'equilibre', 'copieux', 'irregulier')),
  notes text check (char_length(notes) <= 1000),
  created_at timestamptz not null default now(),
  unique (user_id, checkin_date)
);

create index if not exists idx_check_ins_user_date on public.check_ins (user_id, checkin_date desc);

create table if not exists public.daily_programs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  check_in_id uuid not null references public.check_ins(id) on delete cascade,
  program_date date not null,
  physique jsonb not null,
  nutrition jsonb not null,
  mental jsonb not null,
  resume text,
  alerte text,
  model text,
  created_at timestamptz not null default now(),
  unique (user_id, program_date)
);

create index if not exists idx_daily_programs_user_date on public.daily_programs (user_id, program_date desc);

-- ── 2. FONCTION HELPER (SECURITY DEFINER pour éviter la récursion RLS) ──
create or replace function public.is_alpha_tester()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select coalesce(
    (select is_alpha_tester from profiles where id = auth.uid()),
    false
  );
$$;

-- ── 3. RLS ──
alter table public.alpha_applications enable row level security;
-- Aucune policy anon/authenticated sur alpha_applications : service role uniquement.

alter table public.profiles enable row level security;
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
  on public.profiles for select
  using (auth.uid() = id);
-- Pas de policy insert/update : géré par triggers + service role uniquement.

alter table public.check_ins enable row level security;
drop policy if exists check_ins_select_own on public.check_ins;
create policy check_ins_select_own
  on public.check_ins for select
  using (auth.uid() = user_id);
drop policy if exists check_ins_insert_own on public.check_ins;
create policy check_ins_insert_own
  on public.check_ins for insert
  with check (auth.uid() = user_id and is_alpha_tester());

alter table public.daily_programs enable row level security;
drop policy if exists daily_programs_select_own on public.daily_programs;
create policy daily_programs_select_own
  on public.daily_programs for select
  using (auth.uid() = user_id);
-- Insertion daily_programs via service role uniquement (Edge Function).

-- ── 4. TRIGGERS ──

-- À la création d'un compte : créer le profil, hérité de la candidature si elle existe.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  app record;
begin
  select * into app from alpha_applications where email = new.email limit 1;
  insert into profiles (id, prenom, objectif, niveau, is_alpha_tester)
  values (
    new.id,
    coalesce(app.prenom, split_part(new.email, '@', 1)),
    app.objectif,
    app.niveau,
    coalesce(app.status = 'approved', false)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Quand une candidature change de statut : synchroniser le profil si le compte existe.
create or replace function public.sync_alpha_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update profiles
  set is_alpha_tester = (new.status = 'approved'),
      updated_at = now()
  where id = (select id from auth.users where email = new.email limit 1);
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_application_status_change on public.alpha_applications;
create trigger on_application_status_change
  before update of status on public.alpha_applications
  for each row execute function public.sync_alpha_status();
