import type { RouteRecordRaw } from "vue-router";
import StatsView from "@/views/StatsView.vue";

export const statsRoutes: RouteRecordRaw[] = [
    {
        path: "stats",
        name: "Statistics",
        component: StatsView,
        meta: {
            showToolbar: false,
            title: "Statistics Overview",
        },
    },
];
