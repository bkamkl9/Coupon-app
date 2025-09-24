import type { AppRouteRecord } from "../types";
import { createPageMeta, createRoute } from "../helpers";
import UsersView from "@/views/UsersView.vue";

export const userRoutes: AppRouteRecord[] = [
    createRoute(
        "users",
        "Users",
        UsersView,
        createPageMeta("Users Management", { showToolbar: false }),
    ),
];
