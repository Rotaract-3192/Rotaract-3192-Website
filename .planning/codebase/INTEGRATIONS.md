# External Integrations

**Analysis Date:** 2026-05-21

## APIs & External Services

**Authentication:**
- Clerk Auth - OAuth and user management
  - SDK/Client: `@clerk/nextjs` 7.2.3
  - Provider: `ClerkProvider` in `src/app/layout.tsx`
  - Mock implementation: `src/lib/mockAuthClient.tsx`

**Image Hosting:**
- Google User Content (lh3.googleusercontent.com) - User avatars
- UI Avatars (ui-avatars.com) - Fallback avatars
- Unsplash (images.unsplash.com) - Stock images
- Placeholder service (placehold.co) - Placeholder images

## Data Storage

**Databases:**
- PostgreSQL
  - Connection: `DATABASE_URL` environment variable
  - Client: `postgres` (3.4.9)
  - ORM: Drizzle ORM (0.45.2)
  - Schema: `src/lib/db/schema.ts`
  - Connection setup: `src/lib/db/index.ts`

**File Storage:**
- Local filesystem (during development)
- Production storage: Not yet configured (Phase 2 planned)

**Caching:**
- None detected (could leverage React server components for request caching)

## Authentication & Identity

**Auth Provider:**
- Clerk Auth
  - Implementation: `@clerk/nextjs` wrapper with mock auth client
  - Integration file: `src/lib/mockAuthClient.tsx`
  - Provider wrapper: `src/app/layout.tsx`
  - Mock implementation: `src/lib/mockAuth.ts`

**User Model:**
- Clerk user integration with local `users` table (see `src/lib/db/schema.ts`)
- User fields: id, email, firstName, lastName, role, permissionBits, clubId, bio, avatarUrl, points

## Monitoring & Observability

**Error Tracking:**
- None detected (console.error used in query/mutation files)

**Logs:**
- Console logging in `src/app/actions/queries.ts` and `src/app/actions/mutations.ts`
- Query failures logged to console with error context

## CI/CD & Deployment

**Hosting:**
- Not yet configured (Phase 2 planned)
- Development: `npm run dev` (Next.js dev server on localhost)
- Build: `npm run build`
- Start: `npm run start` (Next.js production server)

**CI Pipeline:**
- None detected
- Git repository configured (see `.git/` and git status)

## Environment Configuration

**Required env vars:**
- `DATABASE_URL` - PostgreSQL connection string
  - Format: `postgresql://[user[:password]@][host][:port][/database]`
  - Error handling: Throws error in `src/lib/db/index.ts` if not set in production

**Secrets location:**
- `.env.local` file (NOT committed, listed in `.gitignore`)
- Development fallback: Local environment variables

## Webhooks & Callbacks

**Incoming:**
- Sign-in callback: `src/app/sign-in/[[...sign-in]]/` (Clerk managed)
- Sign-up callback: `src/app/sign-up/[[...sign-up]]/` (Clerk managed)

**Outgoing:**
- None detected

## Database Schema Integration Points

**Core Tables:**
- `users` - User accounts with Clerk integration
- `clubs` - Club management
- `events` - Event data with AI scoring
- `event_registrations` - Event attendance tracking
- `campaigns` - Fundraising campaigns
- `courses` - LMS courses
- `feeds` - Feed/news content
- `moms` - Member of the Month records
- `announcements` - District announcements
- `jobs` - Job board
- `newsletters` - Newsletter archive
- `service_hours` - Service hour tracking
- `cold_storage_files` - Archive/historical files
- `audit_logs` - System audit trail
- `past_leaders` - Historical leadership records
- `point_transactions` - Points ledger

See `src/lib/db/schema.ts` for complete schema definition.

## AI Integration

**Feature:**
- OpenAI/AI-powered event scoring and analysis
- Implementation: `src/lib/ai.ts` (6.3 KB)
- Usage: Events can have `aiScore` and `aiAnalysis` fields
- Status: Phase 1 (mock/basic implementation)

---

*Integration audit: 2026-05-21*
