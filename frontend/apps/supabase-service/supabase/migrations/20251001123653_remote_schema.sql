drop trigger if exists "check_favourite_count_update" on "public"."Coupons";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_favourite_count(p_coupon_id uuid, p_action text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  if p_action not in ('increment', 'decrement') then
    raise exception 'Invalid action. Must be "increment" or "decrement".';
  end if;

  if p_action = 'increment' then
    update "public"."Coupons"
    set favourite_count = favourite_count + 1
    where id = p_coupon_id;
  elsif p_action = 'decrement' then
    update "public"."Coupons"
    set favourite_count = greatest(favourite_count - 1, 0)
    where id = p_coupon_id;
  end if;
end;
$function$
;


