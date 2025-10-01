alter table "public"."Coupons" add column "favourite_count" bigint not null default '0'::bigint;

create policy "allow delete for auth user"
on "public"."Coupons"
as permissive
for delete
to authenticated
using (true);



