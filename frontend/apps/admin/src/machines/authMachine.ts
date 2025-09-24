import { createMachine } from "xmachinevue";
import type { User } from "@supabase/supabase-js";
import getSupabaseClient from "@/composables/useSupabase";

const supabase = getSupabaseClient();

export const authMachine = createMachine("auth", {
    initial: "IDLE",

    reactive: {
        user: null as User | null,
        loading: false,
        error: null as string | null,
    },

    states: {
        IDLE: {
            async signIn(email: string, password: string) {
                this.$reactive.loading = true;
                this.$reactive.error = null;

                try {
                    const { data, error } = await supabase.auth
                        .signInWithPassword({
                            email,
                            password,
                        });

                    if (error) {
                        this.$reactive.error = error.message;
                        return { success: false };
                    }

                    this.$reactive.user = data.user;
                    this.$changeState("AUTHENTICATED");
                    return { success: true };
                } catch (error) {
                    this.$reactive.error = "Login failed";
                    return { success: false };
                } finally {
                    this.$reactive.loading = false;
                }
            },

            async checkSession() {
                this.$reactive.loading = true;

                try {
                    const { data: { session } } = await supabase.auth
                        .getSession();
                    if (session) {
                        this.$reactive.user = session.user;
                        this.$changeState("AUTHENTICATED");
                    }
                } catch (error) {
                    console.error("Session check failed:", error);
                } finally {
                    this.$reactive.loading = false;
                }
            },
        },

        AUTHENTICATED: {
            async signOut() {
                this.$reactive.loading = true;

                try {
                    await supabase.auth.signOut();
                    this.$reactive.user = null;
                    this.$reactive.error = null;
                    this.$changeState("IDLE");
                    return { success: true };
                } catch (error) {
                    this.$reactive.error = "Logout failed";
                    return { success: false };
                } finally {
                    this.$reactive.loading = false;
                }
            },
        },
    },

    global: {
        clearError() {
            this.$reactive.error = null;
        },
    },
});

export default authMachine;
