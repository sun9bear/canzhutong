create table if not exists policies (
  id text primary key,
  title text not null,
  short_title text not null,
  level text not null,
  region_code text not null,
  region_name text not null,
  category text not null,
  disability_types text not null,
  summary text not null,
  key_points text not null,
  eligibility text not null default '',
  how_to_apply text not null default '',
  body text not null,
  source_name text not null,
  source_url text not null default '',
  doc_no text not null default '',
  issued_at text not null default '',
  effective_at text not null default '',
  status text not null default '现行有效',
  keywords text not null default '',
  related_ids text not null default ''
);

create index if not exists policies_region_idx on policies (region_code);
create index if not exists policies_category_idx on policies (category);
create index if not exists policies_level_idx on policies (level);

create table if not exists user_profiles (
  user_id text primary key,
  display_name text not null default '',
  region_code text not null default '',
  disability_types text not null default '[]',
  disability_grade text not null default '',
  age_group text not null default '',
  employment_status text not null default '',
  education text not null default '',
  living_situation text not null default '',
  needs text not null default '[]',
  extra_notes text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists bookmarks (
  user_id text not null,
  policy_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, policy_id)
);

create table if not exists advice_reports (
  id serial primary key,
  user_id text not null,
  content text not null,
  citations text not null default '[]',
  created_at timestamptz not null default now()
);

create index if not exists advice_reports_user_idx on advice_reports (user_id);
