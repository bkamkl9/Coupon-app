CREATE TYPE "public"."coupon_status" AS ENUM (
    'active',
    'scheduled',
    'hidden',
    'in_active'
);


ALTER TYPE "public"."coupon_status" OWNER TO "postgres";


COMMENT ON TYPE "public"."coupon_status" IS 'indicates_coupon_status';



CREATE TABLE IF NOT EXISTS "public"."Coupons" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "status" "public"."coupon_status" DEFAULT 'hidden'::"public"."coupon_status" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "link" "text" NOT NULL,
    "code" "text" NOT NULL,
    "image_url" "text",
    "currency" "text" NOT NULL,
    "price" bigint NOT NULL
);


ALTER TABLE "public"."Coupons" OWNER TO "postgres";


ALTER TABLE ONLY "public"."Coupons"
    ADD CONSTRAINT "Coupons_pkey" PRIMARY KEY ("id");



ALTER TABLE "public"."Coupons" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Enable insert for authenticated users only" ON "public"."Coupons" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable read access for all users" ON "public"."Coupons" FOR SELECT USING (true);



CREATE POLICY "Enable update for authenticated user" ON "public"."Coupons" FOR UPDATE TO "authenticated" USING (true);





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";









































































































































































































GRANT ALL ON TABLE "public"."Coupons" TO "anon";
GRANT ALL ON TABLE "public"."Coupons" TO "authenticated";
GRANT ALL ON TABLE "public"."Coupons" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
