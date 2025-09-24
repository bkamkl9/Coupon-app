import { computed, toRefs } from "vue";
import authMachine from "@/machines/authMachine";
import type { Session, User } from "@supabase/supabase-js";

export function useAuth() {
    // Reactive state from the auth machine
    const { user, session, loading, error } = toRefs(authMachine.reactive);
    const currentState = computed(() => authMachine.currentState.value);

    // Computed helpers
    const isAuthenticated = computed(() =>
        authMachine.global.isAuthenticated()
    );
    const isLoading = computed(() => authMachine.global.isLoading());

    // Auth actions
    const signIn = async (email: string, password: string) => {
        return await authMachine.IDLE.signIn(email, password);
    };

    const signUp = async (
        email: string,
        password: string,
        metadata?: Record<string, any>,
    ) => {
        return await authMachine.IDLE.signUp(email, password, metadata);
    };

    const signOut = async () => {
        return await authMachine.AUTHENTICATED.signOut();
    };

    const updateProfile = async (updates: Partial<User>) => {
        return await authMachine.AUTHENTICATED.updateProfile(updates);
    };

    const initialize = async () => {
        return await authMachine.IDLE.initialize();
    };

    const clearError = () => {
        authMachine.ERROR.clearError();
    };

    const getCurrentUser = () => {
        return authMachine.global.getCurrentUser();
    };

    const getCurrentSession = () => {
        return authMachine.global.getCurrentSession();
    };

    // Return all auth-related functionality
    return {
        // State
        user,
        session,
        loading,
        error,
        currentState,
        isAuthenticated,
        isLoading,

        // Actions
        signIn,
        signUp,
        signOut,
        updateProfile,
        initialize,
        clearError,
        getCurrentUser,
        getCurrentSession,

        // Direct access to machine for advanced usage
        authMachine,
    };
}

export default useAuth;
