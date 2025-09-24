import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import {
  couponRoutes,
  dashboardRoutes,
  statsRoutes,
  userRoutes,
} from "./routes";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    component: DashboardLayout,
    children: [
      ...dashboardRoutes,
      ...couponRoutes,
      ...userRoutes,
      ...statsRoutes,
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
