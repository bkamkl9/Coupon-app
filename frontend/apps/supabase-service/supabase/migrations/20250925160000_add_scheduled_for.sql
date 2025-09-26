-- Add scheduled_for column to Coupons table
ALTER TABLE "public"."Coupons" 
ADD COLUMN "scheduled_for" timestamp with time zone DEFAULT NULL;

COMMENT ON COLUMN "public"."Coupons"."scheduled_for" IS 'When the coupon should become active (for scheduled status)';

-- Add created_at column if it doesn't exist (for proper timestamp tracking)
ALTER TABLE "public"."Coupons" 
ADD COLUMN IF NOT EXISTS "created_at" timestamp with time zone DEFAULT NOW();

COMMENT ON COLUMN "public"."Coupons"."created_at" IS 'When the coupon was created';
