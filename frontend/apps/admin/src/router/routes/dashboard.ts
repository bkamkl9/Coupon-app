import type { RouteRecordRaw } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";

export const dashboardRoutes: RouteRecordRaw[] = [
    {
        path: "dashboard",
        name: "Dashboard",
        component: DashboardView,
        meta: {
            showToolbar: false,
            title: "Dashboard Overview",
        },
    },
];
