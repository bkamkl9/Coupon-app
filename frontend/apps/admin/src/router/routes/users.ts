import type { RouteRecordRaw } from "vue-router";
import UsersView from "@/views/UsersView.vue";

export const userRoutes: RouteRecordRaw[] = [
    {
        path: "users",
        name: "Users",
        component: UsersView,
        meta: {
            showToolbar: false,
            title: "Users Management",
        },
    },
];
