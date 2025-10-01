set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.enforce_favourite_count_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  -- Ensure only favourite_count is updated
  if (
    (new.id          is distinct from old.id) or
    (new.status      is distinct from old.status) or
    (new.title       is distinct from old.title) or
    (new.description is distinct from old.description) or
    (new.link        is distinct from old.link) or
    (new.code        is distinct from old.code) or
    (new.image_url   is distinct from old.image_url) or
    (new.currency    is distinct from old.currency) or
    (new.price       is distinct from old.price) or
    (new.scheduled_for is distinct from old.scheduled_for) or
    (new.created_at  is distinct from old.created_at)
  ) then
    raise exception 'Only favourite_count can be updated by anon user';
  end if;

  -- Ensure favourite_count changes by +1 or -1
  if abs(new.favourite_count - old.favourite_count) != 1 then
    raise exception 'favourite_count must change by exactly +1 or -1';
  end if;

  -- Ensure it never goes below 0
  if new.favourite_count < 0 then
    raise exception 'favourite_count cannot be negative';
  end if;

  return new;
end;
$function$
;

CREATE TRIGGER check_favourite_count_update BEFORE UPDATE ON public."Coupons" FOR EACH ROW WHEN ((CURRENT_USER = 'anon'::name)) EXECUTE FUNCTION enforce_favourite_count_update();


