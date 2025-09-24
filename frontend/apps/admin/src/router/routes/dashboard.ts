import type { AppRouteRecord } from "../types";
import { createPageMeta, createRoute } from "../helpers";
import DashboardView from "@/views/DashboardView.vue";

export const dashboardRoutes: AppRouteRecord[] = [
    createRoute(
        "dashboard",
        "Dashboard",
        DashboardView,
        createPageMeta("Dashboard Overview", { showToolbar: false }),
    ),
];
