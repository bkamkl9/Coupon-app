# Admin Dashboard

A Vue 3 admin dashboard for managing coupons, users, and analytics in the Coupon App. Built with modern technologies and focused on developer experience.

## 🚀 Tech Stack

- **Framework**: Vue 3 with TypeScript
- **UI Components**: Nuxt UI (@nuxt/ui)
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **State Management**: XMachineVue (finite state machines)
- **Routing**: Vue Router with authentication guards
- **Backend**: Supabase (auth, database, storage, real-time)
- **Form Validation**: Zod schemas

## ✨ Features

### 🔐 Authentication
- Email/password login with Supabase Auth
- Automatic session restoration
- Protected routes with navigation guards
- Smart redirects for authenticated/unauthenticated users

### 📋 Coupon Management
- **CRUD Operations**: Create, read, update, delete coupons
- **Status Management**: Set coupons as active, scheduled, hidden, or inactive
- **Scheduling**: Schedule coupons for future activation

### 👥 User Management
- View all registered users
- User activity monitoring
- Authentication status tracking

### 📊 Analytics Dashboard
- Coupon statistics and metrics
- Usage analytics
- Performance monitoring

### 🎨 UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface using Nuxt UI
- **Dark/Light Mode**: Theme switching support
- **Accessibility**: ARIA labels and keyboard navigation
- **Loading States**: Skeleton loaders and progress indicators

## 🏗️ Architecture

### Directory Structure
```
src/
├── components/           # Reusable Vue components
│   ├── CouponEditor.vue # Coupon form component
│   └── CouponsTable.vue # Data table for coupons
├── composables/         # Vue composables
│   └── useSupabase.ts   # Supabase client composable
├── layouts/             # Layout components
│   └── DashboardLayout.vue # Main dashboard layout
├── machines/            # State machines
│   ├── authMachine.ts   # Authentication state machine
│   └── README.md        # State machine documentation
├── router/              # Routing configuration
│   ├── index.ts         # Main router setup
│   ├── routes/          # Route definitions by feature
│   └── README.md        # Router documentation
├── types/               # TypeScript type definitions
│   └── db.ts           # Supabase database types
├── views/               # Page components
│   ├── Coupons/        # Coupon-related pages
│   ├── DashboardView.vue
│   ├── LoginView.vue
│   ├── StatsView.vue
│   └── UsersView.vue
├── App.vue             # Root component
├── main.ts             # Application entry point
└── style.css           # Global styles
```

### State Management with XMachineVue
The app uses finite state machines for predictable state management:
- **Authentication Machine**: Handles login/logout states
- **Reactive State**: Automatic UI updates with Vue's reactivity
- **Type Safety**: Full TypeScript support for states and events

### Router with Authentication
- **Modular Routes**: Feature-based route organization
- **Auth Guards**: Automatic protection of authenticated routes
- **Session Restoration**: Automatic login on app reload
- **Smart Redirects**: Context-aware navigation

## 🛠️ Development

### Prerequisites
- Node.js 20.19.0+ or 22.12.0+
- pnpm 8.0.0+
- Running Supabase instance (see main project README)

### Setup

```bash
# Navigate to admin app
cd frontend/apps/admin

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

```bash
# Development server with hot reload
pnpm dev

# Type checking
pnpm type-check

# Build for production
pnpm build

# Build only (skip type checking)
pnpm build-only

# Preview production build
pnpm preview

# Format code with Prettier
pnpm format
```

### Environment Setup

The app connects to your local Supabase instance automatically. Ensure Supabase is running:

```bash
# From the frontend directory
pnpm supabase:start
```

No additional environment variables needed for local development.

## 🏭 Production Build

### Building
```bash
# Build the application
pnpm build

# The built files will be in the `dist/` directory
```

### Deployment
The admin dashboard is a static SPA that can be deployed to any static hosting service:

- **Vercel**: Zero-config deployment
- **Netlify**: Drag and drop the `dist/` folder
- **AWS S3 + CloudFront**: Static website hosting
- **GitHub Pages**: Using GitHub Actions

### Environment Variables for Production
Set these in your hosting provider's environment settings:

```bash
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

## 🎨 UI Components

The app uses Nuxt UI components for a consistent, accessible interface:

- **Forms**: UForm, UInput, UTextarea, USelect
- **Data Display**: UTable, UCard, UBadge
- **Navigation**: UButton, UDropdown, UModal
- **Layout**: UContainer, UDivider, USeparator
- **Feedback**: UAlert, UNotification, UProgress

### Custom Components
- **CouponEditor**: Form for creating/editing coupons
- **CouponsTable**: Data table with sorting, filtering, and pagination
- **DashboardLayout**: Main layout with navigation and header

## 🔧 Configuration

### Vite Configuration
- **Auto-imports**: Automatically import Vue APIs and components
- **Path Aliases**: `@/` for `src/` directory
- **TypeScript**: Full type checking and intellisense
- **Dev Tools**: Vue DevTools integration

### Tailwind CSS
- **Version**: v4 (latest)
- **Components**: Nuxt UI component styles
- **Utilities**: Custom utility classes
- **Responsive**: Mobile-first responsive design

### TypeScript
- **Strict Mode**: Enabled for better type safety
- **Auto-generated Types**: Database types from Supabase
- **Vue SFC Support**: Full `.vue` file type checking

## 🧪 Testing

Currently no tests are set up, but the architecture supports:
- **Unit Tests**: Vitest for component testing
- **E2E Tests**: Playwright for end-to-end testing
- **State Machine Tests**: Testing state transitions

## 📱 Responsive Design

The admin dashboard is fully responsive:
- **Desktop**: Full-featured interface with sidebar navigation
- **Tablet**: Collapsible sidebar with touch-friendly controls
- **Mobile**: Bottom navigation with optimized layouts

## 🔍 Code Quality

- **ESLint**: Code linting and style consistency
- **Prettier**: Automatic code formatting
- **TypeScript**: Type safety and better developer experience
- **Vue 3 Composition API**: Modern, maintainable component patterns

## 🤝 Contributing

1. Follow the existing code patterns and architecture
2. Use TypeScript for all new code
3. Follow the component structure in `src/components/`
4. Add new routes to the appropriate files in `src/router/routes/`
5. Use the existing state machines for complex state management
6. Test your changes in both development and production builds

## 📚 Related Documentation

- [Router Architecture](src/router/README.md)
- [Authentication Machine](src/machines/README.md)
- [Main Project README](../../../README.md)
