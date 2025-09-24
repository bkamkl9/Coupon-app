/**
 * Route path constants for better maintainability and to avoid magic strings
 */
export const ROUTE_PATHS = {
    ROOT: "/",
    DASHBOARD: "/dashboard",
    COUPONS: {
        INDEX: "/coupons",
        ADD: "/coupons/add",
        EDIT: (id: string) => `/coupons/edit/${id}`,
        VIEW: (id: string) => `/coupons/view/${id}`,
    },
    USERS: {
        INDEX: "/users",
        ADD: "/users/add",
        EDIT: (id: string) => `/users/edit/${id}`,
        VIEW: (id: string) => `/users/view/${id}`,
    },
    STATS: "/stats",
} as const;

/**
 * Route name constants
 */
export const ROUTE_NAMES = {
    DASHBOARD: "Dashboard",
    COUPONS: "Coupons",
    BROWSE_COUPONS: "Browse Coupons",
    ADD_COUPON: "Add Coupon",
    EDIT_COUPON: "Edit Coupon",
    USERS: "Users",
    STATISTICS: "Statistics",
} as const;
