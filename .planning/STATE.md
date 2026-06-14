# Project State

## Current Position
- **Active Phase:** 01-supabase-migration
- **Status:** Planning

## Tech Stack
- **Framework:** Next.js 16 (standalone output)
- **ORM:** Drizzle ORM with `node-postgres` + `pg` driver
- **Auth:** Clerk (`@clerk/nextjs`)
- **Storage:** AWS S3 SDK (R2-compatible endpoint)
- **Database:** PostgreSQL (currently DigitalOcean Managed Database)

## Key Decisions
1. Clerk remains the auth provider — Supabase Auth will NOT replace it
2. S3/R2 remains the file storage — Supabase Storage will NOT replace it
3. The primary goal is moving the PostgreSQL connection to Supabase's PostgreSQL, with optional Supabase JS client for Realtime/API features
4. Drizzle ORM schema stays intact — migration is purely driver-level + connection config

## Current Database
- **Driver:** `drizzle-orm/node-postgres` with `pg.Pool`
- **Connection:** `DATABASE_URL` env var pointing to PostgreSQL
- **Tables:** 20 tables (users, clubs, events, event_registrations, campaigns, courses, course_modules, feeds, jobs, moms, newsletters, announcements, cold_storage_files, user_achievements, mentorship_applications, service_hours, audit_logs, past_leaders, point_transactions, attendance)

## Target Architecture
- **Driver:** `drizzle-orm/postgres-js` with `postgres` package
- **Connection:** Supabase PostgreSQL connection string (port 5432 or 6543 for PgBouncer)
- **Client SDK:** `@supabase/supabase-js` for optional Realtime subscriptions and REST API
- **Host:** Self-hosted Supabase on DigitalOcean

## Blockers
- None. Ready to plan and execute.
