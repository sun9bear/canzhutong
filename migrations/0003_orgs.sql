create table if not exists orgs (
  id text primary key,
  name text not null,
  short_name text not null,
  kind text not null,
  level text not null,
  region_code text not null,
  region_name text not null,
  address text not null default '',
  postcode text not null default '',
  phones text not null default '',
  hotline text not null default '12385',
  website text not null default '',
  hours text not null default '',
  notes text not null default '',
  source_name text not null,
  source_url text not null default '',
  verified_at text not null default ''
);

create index if not exists orgs_region_idx on orgs (region_code);
create index if not exists orgs_kind_idx on orgs (kind);
create index if not exists orgs_level_idx on orgs (level);
