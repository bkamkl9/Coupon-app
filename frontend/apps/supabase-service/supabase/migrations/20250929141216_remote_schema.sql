create policy "anon users can fetch active coupons"
on "public"."Coupons"
as permissive
for select
to anon
using ((status = 'active'::coupon_status));



