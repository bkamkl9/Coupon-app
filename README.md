# Coupon App

A full-stack coupon management platform built with Vue 3, Supabase, and modern web technologies. The application consists of an admin dashboard for managing coupons and a mobile app for browsing deals.

## 🏗️ Architecture

This is a **monorepo** using **pnpm workspaces** and **Turbo** for efficient development and builds:

```
Coupon App/
├── frontend/                 # Frontend monorepo
│   ├── apps/
│   │   ├── admin/           # Vue 3 + Nuxt UI admin dashboard
│   │   ├── mobile/          # Vue 3 + Capacitor mobile app
│   │   └── supabase-service/ # Supabase configuration & migrations
│   └── packages/            # Shared packages (future)
└── README.md               # This file
```

## 🚀 Tech Stack

### Frontend
- **Framework**: Vue 3 with TypeScript
- **Admin UI**: Nuxt UI components + Tailwind CSS v4
- **Mobile**: Capacitor for native app compilation
- **State Management**: XMachineVue (finite state machines)
- **Routing**: Vue Router with auth guards
- **Build Tool**: Vite with Turbo for monorepo orchestration

### Backend
- **Database**: PostgreSQL with Supabase
- **Authentication**: Supabase Auth (email/password)
- **API**: Supabase auto-generated REST API
- **Real-time**: Supabase Realtime for live updates
- **Storage**: Supabase Storage for image uploads
- **Cron Jobs**: pg_cron for scheduled tasks

### DevOps
- **Package Manager**: pnpm with workspaces
- **Monorepo Tool**: Turbo for task orchestration
- **Containerization**: Docker with dev container support
- **Local Development**: Supabase CLI for local backend

## 📱 Applications

### Admin Dashboard (`frontend/apps/admin/`)
- **Purpose**: Manage coupons, users, and view analytics
- **Tech**: Vue 3 + Nuxt UI + Supabase
- **Features**:
  - Coupon CRUD operations with scheduling
  - User management and authentication
  - Statistics and analytics dashboard
  - Real-time updates
  - Image upload for coupon images

### Mobile App (`frontend/apps/mobile/`)
- **Purpose**: Browse and discover coupons
- **Tech**: Vue 3 + Capacitor + Tailwind CSS
- **Features**:
  - Browse active coupons
  - Search and filter functionality
  - Native Android app compilation
  - Responsive design

## 🛠️ Prerequisites

- **Node.js** 20.19.0+ or 22.12.0+
- **pnpm** 8.0.0+ (package manager)
- **Docker** (for running Supabase locally)
- **Android Studio** (for mobile app development)

## 🏃‍♂️ Quick Start

### Using Dev Container (Recommended)

1. Open this project in VS Code
2. Click "Reopen in Container" when prompted (or use Command Palette: "Dev Containers: Reopen in Container")
3. The dev container will automatically:
   - Install Supabase CLI globally
   - Set up proper Docker networking to avoid the [network_mode: "host" issue](https://github.com/supabase/cli/issues/1939)
   - Configure Docker Compose for container communication
   - Initialize the Supabase project with proper settings
   - Set up port forwarding for all Supabase services

**Note**: This setup fixes the common Docker networking issue where `supabase start` fails in dev containers without using `network_mode: "host"`.

### Manual Setup

```bash
# Clone and navigate to project
cd "Coupon app container"

# Install dependencies (from root)
pnpm install

# Start Supabase services
cd frontend
pnpm supabase:start

# Start development servers (in separate terminals)
# Admin dashboard
cd frontend/apps/admin
pnpm dev

# Mobile app
cd frontend/apps/mobile  
pnpm dev
```

## 🌐 Available Services (Development)

When you run `pnpm supabase:start`, the following services become available:

- **Supabase Studio**: Web interface for managing your database
  - URL: http://localhost:54323
  - Use this to view data, run queries, and manage the database

- **API Gateway**: REST and GraphQL APIs
  - URL: http://localhost:54321
  - Auto-generated APIs for your database tables

- **Database**: PostgreSQL with pg_cron extension
  - Port: 54322
  - Access: `postgresql://postgres:postgres@localhost:54322/postgres`

- **Auth**: User authentication and authorization
  - Built-in email/password authentication
  - Configurable for OAuth providers

- **Storage**: File storage and management
  - Image upload and transformation capabilities
  - Used for coupon images

- **Realtime**: WebSocket connections for real-time updates
  - Live data synchronization across clients

- **Email Testing**: Inbucket for testing email functionality
  - Port: 54324
  - View test emails during development

## 🗄️ Database Schema

The application uses a simple but effective schema:

```sql
-- Coupons table
CREATE TABLE Coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  code TEXT NOT NULL,
  link TEXT NOT NULL,
  price BIGINT NOT NULL,
  currency TEXT NOT NULL,
  image_url TEXT,
  status coupon_status DEFAULT 'hidden',
  scheduled_for TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Coupon status enum
CREATE TYPE coupon_status AS ENUM (
  'active',     -- Visible and available to users
  'scheduled',  -- Scheduled for future activation  
  'hidden',     -- Hidden from public view
  'in_active'   -- Disabled/expired
);
```

## 🔧 Development Commands

### Monorepo Management
```bash
# Install all dependencies
pnpm install

# Run all apps in development mode
cd frontend && pnpm turbo:dev

# Build all apps
cd frontend && pnpm turbo:build

# Lint all apps
cd frontend && pnpm turbo:lint

# Type check all apps
cd frontend && pnpm turbo:type-check
```

### Supabase Management
```bash
# Start Supabase services
cd frontend && pnpm supabase:start

# Stop Supabase services  
cd frontend && pnpm supabase:stop

# Check service status
cd frontend && pnpm supabase:status

# Generate TypeScript types from database
cd frontend && pnpm supabase:gen:types
```

### Mobile Development
```bash
# Build and sync Android app
cd frontend && pnpm mobile:build:android

# Sync Capacitor files only
cd frontend/apps/mobile && pnpm sync_android
```

## 🚀 Production Deployment

### Admin Dashboard
- Build: `cd frontend/apps/admin && pnpm build`
- Deploy the `dist/` folder to any static hosting service
- Configure environment variables for production Supabase project

### Mobile App
- Build: `cd frontend/apps/mobile && pnpm build`
- Sync: `npx cap sync android`
- Open in Android Studio: `npx cap open android`
- Build APK/AAB through Android Studio

### Database
- Create production Supabase project
- Run migrations: `supabase db push`
- Configure production environment variables

## 🏗️ Project Structure Details

### Admin App Features
- **Authentication**: Login/logout with session management
- **Coupon Management**: Create, edit, delete, and schedule coupons
- **Status Management**: Set coupons as active, scheduled, hidden, or inactive
- **Image Upload**: Upload and manage coupon images
- **User Management**: View and manage registered users
- **Analytics**: View coupon statistics and usage data
- **Real-time Updates**: Live data synchronization

### Mobile App Features
- **Coupon Browser**: View all active coupons
- **Search & Filter**: Find coupons by title, category, or price
- **Responsive Design**: Works on all mobile devices
- **Native Features**: Camera, notifications (future)

## 📚 Documentation

- **Admin Router**: [frontend/apps/admin/src/router/README.md](frontend/apps/admin/src/router/README.md)
- **Auth Machine**: [frontend/apps/admin/src/machines/README.md](frontend/apps/admin/src/machines/README.md)
- **Admin App**: [frontend/apps/admin/README.md](frontend/apps/admin/README.md)
- **Mobile App**: [frontend/apps/mobile/README.md](frontend/apps/mobile/README.md)
