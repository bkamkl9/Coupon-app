import type { AppRouteRecord, RouteMeta, ToolbarAction } from "./types";

/**
 * Creates a standardized go-back meta configuration
 */
export const createGoBackMeta = (path: string, title: string): RouteMeta => ({
    showToolbar: true,
    title,
    toolbarActions: [
        {
            label: "Back",
            icon: "i-heroicons-arrow-left",
            to: path,
        },
    ],
});

/**
 * Creates a standardized page meta configuration
 */
export const createPageMeta = (
    title: string,
    options: {
        showToolbar?: boolean;
        toolbarActions?: ToolbarAction[];
        requiresAuth?: boolean;
        roles?: string[];
    } = {},
): RouteMeta => ({
    showToolbar: false,
    title,
    ...options,
});

/**
 * Creates a CRUD-style toolbar meta configuration
 */
export const createCrudMeta = (
    title: string,
    addRoute?: string,
    additionalActions: ToolbarAction[] = [],
): RouteMeta => {
    const actions: ToolbarAction[] = [...additionalActions];

    if (addRoute) {
        actions.unshift({
            label: "Add",
            icon: "i-heroicons-plus",
            action: "add",
            to: addRoute,
        });
    }

    return {
        showToolbar: true,
        title,
        toolbarActions: actions,
    };
};

/**
 * Creates a route with default settings
 */
export const createRoute = (
    path: string,
    name: string,
    component: any,
    meta?: RouteMeta,
    children?: AppRouteRecord[],
): AppRouteRecord => ({
    path,
    name,
    component,
    meta,
    children,
});

/**
 * Creates a nested route group with a common parent
 */
export const createRouteGroup = (
    basePath: string,
    name: string,
    component: any,
    children: AppRouteRecord[],
    meta?: RouteMeta,
): AppRouteRecord => ({
    path: basePath,
    name,
    component,
    meta,
    children,
});

/**
 * Merges multiple route groups into a flat array
 */
export const mergeRouteGroups = (
    ...groups: AppRouteRecord[][]
): AppRouteRecord[] => {
    return groups.flat();
};
