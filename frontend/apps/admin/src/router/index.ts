import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { mergeRouteGroups } from "./helpers";
import {
  couponRoutes,
  dashboardRoutes,
  statsRoutes,
  userRoutes,
} from "./routes";

/**
 * Creates the main application routes with the dashboard layout
 */
const createAppRoutes = (): RouteRecordRaw[] => {
  const allChildRoutes = mergeRouteGroups(
    dashboardRoutes,
    couponRoutes,
    userRoutes,
    statsRoutes,
  );

  return [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/",
      component: DashboardLayout,
      children: allChildRoutes as RouteRecordRaw[],
    },
  ];
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: createAppRoutes(),
});

export default router;
