# Rotaract District 3192 | Web Portal

A premium web portal for Rotaract District 3192, built with Next.js and PostgreSQL.

## Technical Stack

- **Frontend:** Next.js 16 (React 19)
- **Styling:** Tailwind CSS v4
- **Backend:** Next.js Server Actions
- **Database:** PostgreSQL (DigitalOcean Managed Database)
- **ORM:** Drizzle ORM
- **Auth:** Clerk
- **Storage:** S3-compatible object storage
- **Deployment:** DigitalOcean App Platform

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Database

```bash
# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Push schema to database
npm run db:push
```

## Deployment

This app is configured for DigitalOcean App Platform. See `.do/app.yaml` for the deployment spec.

Set environment variables in the DO App Platform dashboard:
- `DATABASE_URL` - PostgreSQL connection string
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key

---
*Created for Rotaract District 3192 — Harnessing the power of youth leadership.*

## Docker

```bash
docker compose up -d --build
```

The application will be available on port 3000.

Configure your reverse proxy (Nginx Proxy Manager) to forward to the container on the shared Docker network.
