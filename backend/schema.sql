create table users (
  id text primary key,
  name text not null,
  email text not null unique,
  password_hash text not null,
  password_salt text not null,
  created_at timestamptz not null default now()
);

create table courses (
  slug text primary key,
  title text not null,
  access_type text not null check (access_type in ('included', 'premium'))
);

create table enrollments (
  id text primary key,
  user_id text not null references users(id),
  course_slug text not null references courses(slug),
  status text not null check (status in ('active', 'cancelled', 'expired')),
  purchased_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, course_slug)
);

create table lesson_progress (
  id text primary key,
  user_id text not null references users(id),
  course_slug text not null references courses(slug),
  module_number integer not null,
  lesson_id integer not null,
  completed_at timestamptz not null default now(),
  unique (user_id, course_slug, module_number, lesson_id)
);

create table module_progress (
  id text primary key,
  user_id text not null references users(id),
  course_slug text not null references courses(slug),
  module_number integer not null,
  passed_at timestamptz not null default now(),
  unique (user_id, course_slug, module_number)
);
