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

## Benefits

- ✅ **Simple**: No custom abstractions to learn
- ✅ **Standard**: Uses Vue Router exactly as intended  
- ✅ **Modular**: Features cleanly separated
- ✅ **Readable**: Direct route configuration
- ✅ **Maintainable**: Easy to modify and extend
