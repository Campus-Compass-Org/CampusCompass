-- clubs table with column mames "001", "002", etc. 
-- note that we have to make sure to enclose these in quotes
-- things like SELECT statements have issues differentiating between numeric values and column names 

create table if not exists clubs (
  id serial primary key,
  club_name text not null,
  link text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists clubs_name_uidx on clubs (club_name);

-- adds 132 numeric-named columns: e.g. "1", "2", "3", etc. to the clubs table

do $$
begin
  for i in 1..132 loop
    execute format(
      'alter table clubs add column if not exists "%s" numeric;',
      i::text   
    );
  end loop;
end $$;

do $$
begin
  for i in 1..132 loop
    execute format(
      'alter table clubs
         add constraint if not exists "chk_%s_range"
         check ("%1$s" is null or ("%1$s" >= 0 and "%1$s" <= 2));',
      i::text
    );
  end loop;
end $$;

-- auto-update updated_at with TRIGGER
-- ensures each time we change a tag, we know when it's been updated

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists trg_clubs_updated_at on clubs;
create trigger trg_clubs_updated_at
before update on clubs
for each row execute function set_updated_at();

-- tag_dictionary table  maps numeric columns from club table to the name of the tag and is_identity flag
-- tag_label would be the name of the tag, e.g. "Leadership"
-- is_identity is a T/F value for whether the column is an identity attribute or interest tag

create table if not exists tag_dictionary (
  tag_number   int  primary key,  
  tag_label    text not null,            
  is_identity  boolean not null default false
);

-- creating a unique index on tags (this takes into account whether it's an identity or interest)
-- since things like journalism can be an identity (major) or an interest
drop index if exists tag_dictionary_label_uidx;
create unique index if not exists tag_dictionary_label_isid_uidx
  on tag_dictionary (lower(tag_label), is_identity); 

