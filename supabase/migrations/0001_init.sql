-- Errands — schema iniziale
-- Fase 7 userà questo file come base; qui viene versionato già in Fase 2
-- per avere il progetto Supabase pronto quando serve.

create extension if not exists "uuid-ossp";

-- ============================================================
-- profiles
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  is_pro boolean not null default false,
  notifications_enabled boolean not null default true,
  location_notifications_enabled boolean not null default true,
  deadline_notifications_enabled boolean not null default true,
  smart_suggestions_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- ============================================================
-- places
-- ============================================================
create table if not exists public.places (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  address text not null,
  latitude double precision not null,
  longitude double precision not null,
  google_place_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.places enable row level security;

create policy "places_all_own" on public.places
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
-- errands
-- ============================================================
create table if not exists public.errands (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'pending' check (status in ('pending','completed','cancelled')),
  priority text not null default 'normal' check (priority in ('low','normal','high')),
  due_date date,
  due_time time,
  location_id uuid references public.places(id) on delete set null,
  place_name text,
  address text,
  latitude double precision,
  longitude double precision,
  estimated_duration interval,
  notes text,
  is_recurring boolean not null default false,
  recurrence_rule text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

alter table public.errands enable row level security;

create policy "errands_all_own" on public.errands
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists errands_user_status_idx on public.errands (user_id, status);
create index if not exists errands_due_date_idx on public.errands (due_date);

-- ============================================================
-- suggestions
-- ============================================================
create table if not exists public.suggestions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  errand_id uuid references public.errands(id) on delete cascade,
  type text not null check (type in ('nearby','closing_soon','route_opportunity','overdue','planning')),
  payload jsonb not null default '{}'::jsonb,
  shown_at timestamptz,
  dismissed_at timestamptz,
  opened_at timestamptz
);

alter table public.suggestions enable row level security;

create policy "suggestions_all_own" on public.suggestions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
-- routes
-- ============================================================
create table if not exists public.routes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  origin jsonb not null,
  destination jsonb not null,
  errand_ids uuid[] not null default '{}',
  waypoints jsonb,
  distance_meters int,
  duration_seconds int,
  extra_duration_seconds int,
  status text not null default 'planned' check (status in ('planned','active','completed')),
  created_at timestamptz not null default now()
);

alter table public.routes enable row level security;

create policy "routes_all_own" on public.routes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
-- trigger: crea automaticamente il profilo alla registrazione
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
