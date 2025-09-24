import type { AppRouteRecord } from "../types";
import {
    createCrudMeta,
    createGoBackMeta,
    createRoute,
    createRouteGroup,
} from "../helpers";
import { ROUTE_NAMES, ROUTE_PATHS } from "../constants";
import CouponsView from "@/views/Coupons/CouponsIndexView.vue";
import AddCouponView from "@/views/Coupons/AddCouponView.vue";
import BrowseCouponView from "@/views/Coupons/BrowseCouponView.vue";

const couponChildRoutes: AppRouteRecord[] = [
    createRoute(
        "add",
        ROUTE_NAMES.ADD_COUPON,
        AddCouponView,
        createGoBackMeta(ROUTE_PATHS.COUPONS.INDEX, "Add new coupon"),
    ),
    createRoute(
        "",
        ROUTE_NAMES.BROWSE_COUPONS,
        BrowseCouponView,
        createCrudMeta("Coupons Management", ROUTE_PATHS.COUPONS.ADD),
    ),
];

export const couponRoutes: AppRouteRecord[] = [
    createRouteGroup(
        "coupons",
        ROUTE_NAMES.COUPONS,
        CouponsView,
        couponChildRoutes,
    ),
];
