import type { AppRouteRecord } from "../types";
import { createPageMeta, createRoute } from "../helpers";
import StatsView from "@/views/StatsView.vue";

export const statsRoutes: AppRouteRecord[] = [
    createRoute(
        "stats",
        "Statistics",
        StatsView,
        createPageMeta("Statistics Overview", { showToolbar: false }),
    ),
];
