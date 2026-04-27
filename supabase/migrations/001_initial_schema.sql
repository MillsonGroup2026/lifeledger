-- LifeLedger Initial Schema (idempotent — safe to re-run)

-- Drop existing policies first
drop policy if exists "household_select" on households;
drop policy if exists "members_select" on household_members;
drop policy if exists "profiles_select" on user_profiles;
drop policy if exists "profiles_insert" on user_profiles;
drop policy if exists "profiles_update" on user_profiles;
drop policy if exists "accounts_all" on accounts;
drop policy if exists "transactions_all" on transactions;
drop policy if exists "balance_snapshots_all" on balance_snapshots;
drop policy if exists "budgets_all" on budgets;
drop policy if exists "goals_all" on goals;
drop policy if exists "policies_all" on policies;
drop policy if exists "recurring_all" on recurring_transactions;
drop policy if exists "income_all" on income_items;
drop policy if exists "fixed_expenses_all" on fixed_expenses;
drop policy if exists "market_read" on market_snapshots;

-- Enable RLS
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;

-- HOUSEHOLDS
create table if not exists households (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);
alter table households enable row level security;

-- HOUSEHOLD MEMBERS
create table if not exists household_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  household_id uuid not null references households(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'member')),
  nickname text,
  created_at timestamptz default now(),
  unique (user_id, household_id)
);
alter table household_members enable row level security;

-- USER PROFILES
create table if not exists user_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  household_id uuid not null references households(id) on delete cascade,
  age integer,
  location text,
  marital_status text,
  dependents integer default 0,
  employment_type text,
  financial_literacy text,
  income_range text,
  primary_income_source text,
  debt_types text[],
  credit_score_range text,
  general_health text,
  is_smoker boolean default false,
  has_employer_insurance boolean default false,
  health_risk_tolerance text,
  primary_financial_goal text,
  investment_risk_appetite text,
  time_horizon_years integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id)
);
alter table user_profiles enable row level security;

-- ACCOUNTS
create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  plaid_item_id text,
  plaid_account_id text unique,
  institution_name text not null,
  name text not null,
  type text not null,
  owner text not null default 'joint' check (owner in ('N', 'P', 'joint')),
  is_liquid boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz default now()
);
alter table accounts enable row level security;

-- TRANSACTIONS
create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id) on delete cascade,
  plaid_transaction_id text unique,
  date date not null,
  amount numeric(12,2) not null,
  merchant_name text,
  category text,
  subcategory text,
  is_recurring boolean default false,
  is_fixed boolean default false,
  is_reviewed boolean default false,
  needs_review boolean default false,
  manual_note text,
  created_at timestamptz default now()
);
alter table transactions enable row level security;
create index if not exists idx_transactions_account_date on transactions(account_id, date desc);

-- BALANCE SNAPSHOTS
create table if not exists balance_snapshots (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id) on delete cascade,
  snapshot_date date not null,
  balance numeric(12,2) not null default 0,
  contributions_mtd numeric(12,2) not null default 0,
  created_at timestamptz default now(),
  unique (account_id, snapshot_date)
);
alter table balance_snapshots enable row level security;

-- BUDGETS
create table if not exists budgets (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  category text not null,
  subcategory text not null,
  person text not null default 'joint',
  monthly_amount numeric(10,2) not null default 0,
  updated_at timestamptz default now(),
  unique (household_id, category, subcategory, person)
);
alter table budgets enable row level security;

-- GOALS
create table if not exists goals (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  name text not null,
  category text not null default 'other',
  target_amount numeric(12,2) not null,
  current_amount numeric(12,2) not null default 0,
  target_date date not null,
  monthly_contribution_needed numeric(10,2),
  notes text,
  created_at timestamptz default now()
);
alter table goals enable row level security;

-- POLICIES
create table if not exists policies (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  provider text not null,
  type text not null,
  premium_monthly numeric(10,2),
  coverage_summary text,
  renewal_date date,
  notes text,
  created_at timestamptz default now()
);
alter table policies enable row level security;

-- RECURRING TRANSACTIONS
create table if not exists recurring_transactions (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  merchant_name text not null,
  category text,
  avg_amount numeric(10,2) not null,
  frequency text not null default 'monthly',
  is_fixed boolean default false,
  last_seen date,
  action_flag text default 'review' check (action_flag in ('keep', 'cancel', 'review'))
);
alter table recurring_transactions enable row level security;

-- MARKET SNAPSHOTS
create table if not exists market_snapshots (
  id uuid primary key default gen_random_uuid(),
  symbol text not null,
  date date not null,
  close_price numeric(12,4) not null,
  ytd_return numeric(8,4),
  created_at timestamptz default now(),
  unique (symbol, date)
);

-- INCOME ITEMS
create table if not exists income_items (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  name text not null,
  owner text not null default 'joint',
  type text not null default 'salary',
  annual_amount numeric(12,2) not null default 0,
  tax_rate numeric(5,2),
  notes text,
  is_active boolean default true,
  updated_at timestamptz default now()
);
alter table income_items enable row level security;

-- FIXED EXPENSES
create table if not exists fixed_expenses (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  name text not null,
  category text not null,
  monthly_amount numeric(10,2) not null,
  owner text not null default 'joint',
  is_active boolean default true,
  updated_at timestamptz default now()
);
alter table fixed_expenses enable row level security;

-- RLS POLICIES (household-scoped)

-- Helper function: get current user's household
create or replace function get_household_id()
returns uuid language sql security definer
as $$
  select household_id from household_members where user_id = auth.uid() limit 1;
$$;

-- Households: members can read their own
create policy "household_select" on households for select
  using (id = get_household_id());

-- Household members: view own household members
create policy "members_select" on household_members for select
  using (household_id = get_household_id());

-- User profiles: view/edit own
create policy "profiles_select" on user_profiles for select
  using (household_id = get_household_id());
create policy "profiles_insert" on user_profiles for insert
  with check (user_id = auth.uid());
create policy "profiles_update" on user_profiles for update
  using (user_id = auth.uid());

-- Accounts
create policy "accounts_all" on accounts for all
  using (household_id = get_household_id())
  with check (household_id = get_household_id());

-- Transactions (via account's household)
create policy "transactions_all" on transactions for all
  using (account_id in (select id from accounts where household_id = get_household_id()))
  with check (account_id in (select id from accounts where household_id = get_household_id()));

-- Balance snapshots
create policy "balance_snapshots_all" on balance_snapshots for all
  using (account_id in (select id from accounts where household_id = get_household_id()));

-- Budgets
create policy "budgets_all" on budgets for all
  using (household_id = get_household_id())
  with check (household_id = get_household_id());

-- Goals
create policy "goals_all" on goals for all
  using (household_id = get_household_id())
  with check (household_id = get_household_id());

-- Policies
create policy "policies_all" on policies for all
  using (household_id = get_household_id())
  with check (household_id = get_household_id());

-- Recurring transactions
create policy "recurring_all" on recurring_transactions for all
  using (household_id = get_household_id())
  with check (household_id = get_household_id());

-- Income items
create policy "income_all" on income_items for all
  using (household_id = get_household_id())
  with check (household_id = get_household_id());

-- Fixed expenses
create policy "fixed_expenses_all" on fixed_expenses for all
  using (household_id = get_household_id())
  with check (household_id = get_household_id());

-- Market snapshots: public read
create policy "market_read" on market_snapshots for select using (true);
