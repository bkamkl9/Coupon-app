import type { RouteRecordRaw } from "vue-router";
import CouponsView from "@/views/Coupons/CouponsIndexView.vue";
import AddCouponView from "@/views/Coupons/AddCouponView.vue";
import BrowseCouponView from "@/views/Coupons/BrowseCouponView.vue";
import CouponStatisticsView from "@/views/Coupons/CouponStatisticsView.vue";

export const couponRoutes: RouteRecordRaw[] = [
    {
        path: "coupons",
        name: "Coupons",
        component: CouponsView,
        children: [
            {
                path: "statistics",
                name: "Coupon Statistics",
                component: CouponStatisticsView,
                meta: {
                    showToolbar: true,
                    title: "Coupon Statistics",
                    toolbarActions: [
                        {
                            label: "Back",
                            icon: "i-heroicons-arrow-left",
                            to: "/coupons",
                        },
                    ],
                },
            },
            {
                path: "add",
                name: "Add Coupon",
                component: AddCouponView,
                meta: {
                    showToolbar: true,
                    title: "Add new coupon",
                    toolbarActions: [
                        {
                            label: "Back",
                            icon: "i-heroicons-arrow-left",
                            to: "/coupons",
                        },
                    ],
                },
            },
            {
                path: "edit/:id",
                name: "Edit Coupon",
                component: () => import("@/views/Coupons/EditCouponView.vue"),
                meta: {
                    showToolbar: true,
                    title: "Edit coupon",
                    toolbarActions: [
                        {
                            label: "Back",
                            icon: "i-heroicons-arrow-left",
                            to: "/coupons",
                        },
                    ],
                },
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
];
