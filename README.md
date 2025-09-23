# Coupon App - Local Development Setup

This project is configured for local development with Supabase, including only the essential services: **Database**, **Auth**, and **Cron Jobs**.

## Prerequisites

- Docker (for running Supabase locally)
- Node.js 18+ (handled by dev container)

## Getting Started

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

If not using dev container:

```bash
# Install Supabase CLI
npm install -g supabase

# Start Supabase services
npm run dev
# or
supabase start
```

## Available Services

- **Database**: PostgreSQL with pg_cron extension for scheduled jobs
  - Port: 54322
  - Access: `postgresql://postgres:postgres@localhost:54322/postgres`

- **Auth**: User authentication and authorization
  - Configured for email/password and OAuth providers

- **Supabase Studio**: Web interface for managing your database
  - URL: http://localhost:54323

- **API Gateway**: REST and GraphQL APIs
  - URL: http://localhost:54321

- **Storage**: File storage and management
  - Enabled with image transformation

- **Realtime**: WebSocket connections for real-time updates
  - Enabled for live data synchronization

- **Analytics**: Usage analytics and monitoring
  - Port: 54327

- **Email Testing**: Inbucket for testing email functionality
  - Port: 54324

## Docker Networking Fix

This setup implements the solution for [Supabase CLI issue #1939](https://github.com/supabase/cli/issues/1939) where `supabase start` fails in dev containers without `network_mode: "host"`. The fix includes:

- Docker Compose configuration for proper container networking
- Custom bridge network for service communication
- Proper port forwarding and host mapping
- Environment variables for Docker socket access

## Cron Jobs

The project includes pg_cron extension for scheduling database tasks:

- Check `supabase/migrations/20240101000000_enable_cron.sql` for examples
- Add your scheduled jobs in migration files
- Jobs run directly in PostgreSQL

## Useful Commands

```bash
# Start Supabase
npm run dev

# Stop Supabase
npm run supabase:stop

# Check status
npm run supabase:status

# Reset database (WARNING: deletes all data)
npm run supabase:reset

# Create new migration
npm run supabase:migration:new my_migration_name

# Generate TypeScript types
npm run supabase:gen:types
```

## Environment URLs

- Supabase Studio: http://localhost:54323
- API URL: http://localhost:54321
- Database: postgresql://postgres:postgres@localhost:54322/postgres

## Next Steps

1. Design your database schema in `supabase/migrations/`
2. Set up authentication flows in your frontend
3. Configure cron jobs for automated tasks
4. Use Supabase Studio to manage data and test queries
