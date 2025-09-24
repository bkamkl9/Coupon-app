# Router Architecture

This directory contains a scalable and modular router configuration for the
admin application.

## Structure

```
router/
├── index.ts          # Main router configuration
├── types.ts          # TypeScript interfaces and types
├── helpers.ts        # Route creation helper functions
├── commonMeta.ts     # Legacy meta helpers (deprecated)
├── routes/           # Route modules organized by feature
│   ├── index.ts      # Exports all route modules
│   ├── dashboard.ts  # Dashboard routes
│   ├── coupons.ts    # Coupon management routes
│   ├── users.ts      # User management routes
│   └── stats.ts      # Statistics routes
└── README.md         # This file
```

## Key Features

### 🔧 Helper Functions

- **`createRoute()`** - Creates standardized route objects
- **`createRouteGroup()`** - Creates nested route structures
- **`createPageMeta()`** - Standardized page meta configuration
- **`createGoBackMeta()`** - Go-back navigation meta
- **`createCrudMeta()`** - CRUD-style toolbar configuration
- **`mergeRouteGroups()`** - Combines multiple route arrays

### 📁 Modular Organization

Routes are organized by feature area:

- Each feature has its own route file
- Easy to add new features without touching existing code
- Clear separation of concerns

### 🎯 Type Safety

- TypeScript interfaces for all route configurations
- Enhanced meta types with proper typing
- Better IDE support and autocompletion

## Usage Examples

### Creating a Simple Route

```typescript
import { createPageMeta, createRoute } from "../helpers";

const route = createRoute(
    "users",
    "Users",
    UsersView,
    createPageMeta("Users Management", { showToolbar: false }),
);
```

### Creating a Route with Toolbar Actions

```typescript
import { createCrudMeta } from "../helpers";

const meta = createCrudMeta("Coupons Management", "/coupons/add", [
    {
        label: "Export",
        icon: "i-heroicons-arrow-down-tray",
        action: "export",
    },
]);
```

### Creating Nested Routes

```typescript
import { createRouteGroup } from "../helpers";

const couponRoutes = createRouteGroup(
    "coupons",
    "Coupons",
    CouponsView,
    childRoutes,
);
```

## Adding New Features

1. Create a new route file in `routes/` directory
2. Export your routes array
3. Add the export to `routes/index.ts`
4. Import and include in main router (`index.ts`)

Example:

```typescript
// routes/products.ts
export const productRoutes: AppRouteRecord[] = [
    createRoute(
        "products",
        "Products",
        ProductsView,
        createPageMeta("Product Management"),
    ),
];

// routes/index.ts
export { productRoutes } from "./products";

// index.ts
import { productRoutes } from "./routes";
// Add to mergeRouteGroups call
```

## Migration Notes

- `commonMeta.ts` is deprecated but kept for backward compatibility
- Use the new helper functions in `helpers.ts` for new development
- Existing routes have been migrated to the new structure
