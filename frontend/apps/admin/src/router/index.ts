import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import DashboardView from "@/views/DashboardView.vue";
import CouponsView from "@/views/CouponsView.vue";
import UsersView from "@/views/UsersView.vue";
import StatsView from "@/views/StatsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/",
      component: DashboardLayout,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: DashboardView,
        },
        {
          path: "coupons",
          name: "Coupons",
          component: CouponsView,
        },
        {
          path: "users",
          name: "Users",
          component: UsersView,
        },
        {
          path: "stats",
          name: "Statistics",
          component: StatsView,
        },
      ],
    },
  ],
});

export default router;
