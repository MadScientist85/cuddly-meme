create table "public"."chats" (
    "id" text not null,
    "user_id" uuid null,
    "payload" jsonb
);

CREATE UNIQUE INDEX chats_pkey ON public.chats USING btree (id);

alter table "public"."chats" add constraint "chats_pkey" PRIMARY KEY using index "chats_pkey";

-- RLS
alter table "public"."chats" enable row level security;

create policy "Allow public read for shared chats"
on "public"."chats"
as permissive
for select
to public
using (((payload ->> 'sharePath'::text) IS NOT NULL));

create policy "Allow anonymous access"
on "public"."chats"
as permissive
for all
to public
using ((user_id = '00000000-0000-0000-0000-000000000000'::uuid))
with check ((user_id = '00000000-0000-0000-0000-000000000000'::uuid));
