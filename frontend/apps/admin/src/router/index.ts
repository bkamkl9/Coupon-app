import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import LoginView from "@/views/LoginView.vue";
import { authMachine } from "@/machines/authMachine";
import { couponRoutes, statsRoutes } from "./routes";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      ...couponRoutes,
      ...statsRoutes,
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard to check authentication
router.beforeEach(async (to, from, next) => {
  // Check session on first load
  if (authMachine.currentState.value === "IDLE") {
    await authMachine.IDLE.checkSession();
  }

  const isAuthenticated = authMachine.currentState.value === "AUTHENTICATED";
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    // Redirect to login if auth is required but user is not authenticated
    next("/login");
  } else if (to.path === "/login" && isAuthenticated) {
    // Redirect to dashboard if user is already authenticated and tries to access login
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
