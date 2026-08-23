create table if not exists ai_settings (
  id integer primary key check (id = 1),
  base_url text not null default '',
  model text not null default '',
  api_key_cipher text not null default '',
  api_key_last4 text not null default '',
  updated_at timestamptz not null default now(),
  updated_by text not null default ''
);
insert into ai_settings (id) values (1) on conflict do nothing;
