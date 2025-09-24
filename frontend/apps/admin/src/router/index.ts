import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import DashboardView from "@/views/DashboardView.vue";
import CouponsView from "@/views/Coupons/CouponsIndexView.vue";
import UsersView from "@/views/UsersView.vue";
import StatsView from "@/views/StatsView.vue";
import AddCouponView from "@/views/Coupons/AddCouponView.vue";
import BrowseCouponView from "@/views/Coupons/BrowseCouponView.vue";
import { GoBackMeta } from "./commonMeta";

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
          meta: {
            showToolbar: false,
            title: "Dashboard Overview",
          },
        },
        {
          path: "coupons",
          name: "Coupons",
          component: CouponsView,
          children: [
            {
              path: "add",
              name: "Add Coupon",
              component: AddCouponView,
              meta: GoBackMeta("/coupons", "Add new coupon"),
            },
            {
              path: "",
              name: "Browse Coupons",
              component: BrowseCouponView,
              meta: {
                showToolbar: true,
                title: "Coupons Management",
                toolbarActions: [
                  {
                    label: "Add Coupon",
                    icon: "i-heroicons-plus",
                    action: "add",
                    to: "/coupons/add",
                  },
                ],
              },
            },
          ],
        },
        {
          path: "users",
          name: "Users",
          component: UsersView,
          meta: {
            showToolbar: false,
            title: "Users Management",
          },
        },
        {
          path: "stats",
          name: "Statistics",
          component: StatsView,
          meta: {
            showToolbar: false,
            title: "Users Management",
          },
        },
      ],
    },
  ],
});

export default router;
