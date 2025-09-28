-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule a job to activate scheduled coupons every 5 minutes
-- This will change coupons from 'scheduled' to 'active' when their scheduled_for time has passed
SELECT cron.schedule(
    'activate-scheduled-coupons',  -- job name
    '* * * * *',                 -- cron expression: every minute
    $$
    UPDATE "public"."Coupons" 
    SET "status" = 'active'
    WHERE "status" = 'scheduled' 
      AND "scheduled_for" IS NOT NULL 
      AND "scheduled_for" <= NOW();
    $$
);

-- Add a comment to document the job
COMMENT ON EXTENSION pg_cron IS 'Scheduled job to activate coupons when their scheduled time arrives';
