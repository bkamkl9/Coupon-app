import type { RouteRecordRaw } from "vue-router";

export interface ToolbarAction {
    label: string;
    icon: string;
    action?: string;
    to?: string;
    onClick?: () => void;
}

export interface RouteMeta {
    showToolbar?: boolean;
    title?: string;
    toolbarActions?: ToolbarAction[];
    requiresAuth?: boolean;
    roles?: string[];
}

export interface AppRouteRecord
    extends Omit<RouteRecordRaw, "meta" | "children"> {
    meta?: RouteMeta;
    children?: AppRouteRecord[];
}

export interface RouteGroup {
    name: string;
    routes: AppRouteRecord[];
}
