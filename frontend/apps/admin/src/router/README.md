# Router Architecture

A simple and modular router configuration for the admin application.

## Structure

```
router/
├── index.ts          # Main router configuration (34 lines)
├── routes/           # Route modules organized by feature
│   ├── index.ts      # Exports all route modules
│   ├── dashboard.ts  # Dashboard routes
│   ├── coupons.ts    # Coupon management routes
│   ├── users.ts      # User management routes
│   └── stats.ts      # Statistics routes
└── README.md         # This file
```

## Key Features

### 📁 **Simple Modular Organization**
- Each feature has its own route file
- Standard Vue Router configuration
- No unnecessary abstractions
- Easy to understand and modify

### 🎯 **Direct Route Definitions**
- Uses standard `RouteRecordRaw` types
- No custom helper functions
- Clear, readable route objects
- Standard Vue Router patterns

### 🔒 **Authentication Guards**
- Centralized authentication logic in router
- Automatic session restoration on app load
- Protected routes with `meta: { requiresAuth: true }`
- Smart redirects for authenticated/unauthenticated users

## Route File Structure

Each route file exports an array of `RouteRecordRaw` objects:

```typescript
import type { RouteRecordRaw } from "vue-router";
import MyView from "@/views/MyView.vue";

export const myRoutes: RouteRecordRaw[] = [
    {
        path: "my-path",
        name: "My Route",
        component: MyView,
        meta: {
            showToolbar: false,
            title: "My Page Title",
        },
    },
];
```

## Adding New Features

1. **Create a route file** in `routes/` directory:
   ```typescript
   // routes/products.ts
   import type { RouteRecordRaw } from "vue-router";
   import ProductsView from "@/views/ProductsView.vue";

   export const productRoutes: RouteRecordRaw[] = [
       {
           path: "products",
           name: "Products",
           component: ProductsView,
           meta: {
               showToolbar: true,
               title: "Product Management",
               toolbarActions: [
                   {
                       label: "Add Product",
                       icon: "i-heroicons-plus",
                       to: "/products/add",
                   },
               ],
           },
       },
   ];
   ```

2. **Export from routes/index.ts**:
   ```typescript
   export { productRoutes } from "./products";
   ```

3. **Add to main router**:
   ```typescript
   // index.ts
   import { productRoutes } from "./routes";
   
   const routes: RouteRecordRaw[] = [
       // ... existing routes
       {
           path: "/",
           component: DashboardLayout,
           children: [
               ...dashboardRoutes,
               ...couponRoutes,
               ...userRoutes,
               ...statsRoutes,
               ...productRoutes,  // Add new routes
           ],
       },
   ];
   ```

## Meta Configuration

Standard meta properties for toolbar configuration:

```typescript
meta: {
    showToolbar: boolean,           // Show/hide toolbar
    title: string,                  // Page title
    toolbarActions?: [              // Optional toolbar buttons
        {
            label: string,          // Button text
            icon: string,           // Icon class
            to?: string,           // Navigation target
            action?: string,       // Action identifier
        }
    ]
}
```

## Authentication & Navigation Guards

### How It Works

The router includes a `beforeEach` navigation guard that:

1. **Checks Session**: Automatically restores user session on first load
2. **Protects Routes**: Redirects unauthenticated users to `/login`
3. **Smart Redirects**: Sends authenticated users away from `/login` to `/dashboard`

```typescript
router.beforeEach(async (to, from, next) => {
  // Check session on first load
  if (authMachine.currentState.value === "IDLE") {
    await authMachine.IDLE.checkSession();
  }

  const isAuthenticated = authMachine.currentState.value === "AUTHENTICATED";
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});
```

### Protected Routes

Mark routes as requiring authentication:

```typescript
{
  path: "/",
  component: DashboardLayout,
  meta: { requiresAuth: true },  // This protects all child routes
  children: [
    // All dashboard routes require authentication
  ],
}
```

### Public Routes

Routes without `requiresAuth: true` are accessible to everyone:

```typescript
{
  path: "/login",
  name: "Login",
  component: LoginView,
  // No meta.requiresAuth - public route
}
```

## Current Implementation

The router is currently implemented with the following routes:

### Public Routes
- **Login** (`/login`): Authentication page

### Protected Routes (require authentication)
All routes under `/` use the `DashboardLayout` and require authentication:

- **Dashboard** (`/dashboard`): Main overview page
- **Coupons** (`/coupons`): Coupon management with nested routes:
  - `/coupons` - Browse all coupons with add/statistics actions
  - `/coupons/add` - Add new coupon form
  - `/coupons/edit/:id` - Edit existing coupon form  
  - `/coupons/statistics` - Coupon analytics dashboard
- **Users** (`/users`): User management interface
- **Stats** (`/stats`): Overall statistics and analytics

### Route Features
- **Nested Routes**: Coupon routes use child routes for better organization
- **Dynamic Routes**: Edit coupon uses `:id` parameter
- **Lazy Loading**: Edit coupon view is loaded on-demand
- **Toolbar Configuration**: Each route defines its toolbar title and actions
- **Back Navigation**: Child routes include back buttons in toolbar

## Benefits

- ✅ **Simple**: No custom abstractions to learn
- ✅ **Standard**: Uses Vue Router exactly as intended  
- ✅ **Modular**: Features cleanly separated
- ✅ **Readable**: Direct route configuration
- ✅ **Maintainable**: Easy to modify and extend
- ✅ **Secure**: Centralized authentication logic
- ✅ **User-Friendly**: Automatic redirects and session restoration
