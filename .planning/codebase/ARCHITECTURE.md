# Architecture

**Analysis Date:** 2026-05-21

## Pattern Overview

**Overall:** Next.js 16 Full-Stack Application with Server Actions (App Router)

**Key Characteristics:**
- Server-side rendering (SSR) with React Server Components by default
- Client-side interactivity via interactive components
- Server Actions for mutations (`'use server'` directive)
- Type-safe database queries via Drizzle ORM
- Role-based access control via permission bitmasks
- Modular component-based UI architecture

## Layers

**Routing Layer (App Router):**
- Purpose: URL-based navigation and page routing
- Location: `src/app/`
- Contains: Route handlers, page components, layouts
- Entry points: `src/app/layout.tsx` (root layout), `src/app/(portal)/*`, `src/app/admin/*`, `src/app/club-admin/*`
- Pattern: Next.js App Router with grouped routes `(portal)` for portal UI

**Page & Feature Layer:**
- Purpose: Feature-specific page components and business logic
- Location: `src/app/(portal)/**/*.tsx`, `src/app/admin/**/*.tsx`, `src/app/club-admin/**/*.tsx`
- Contains: Feature routes like dashboard, clubs, events, leaderboard, LMS
- Depends on: Components, Server Actions, Database

**Component Layer:**
- Purpose: Reusable UI building blocks
- Location: `src/components/`
- Contains:
  - Shared components: `Navbar.tsx`, `Footer.tsx`, `AdminSidebar.tsx`, `MemberSidebar.tsx`
  - UI components: `src/components/ui/` (button, background-paths, etheral-shadow)
  - Admin components: `src/components/admin/` (AwardPointsPanel, NewEventButton, etc.)
  - Club admin components: `src/components/club-admin/`
  - Data components: `ClubCard.tsx`, `EventCard.tsx`, `LoadingScreen.tsx`, `WaveBackground.tsx`
- Depends on: Utility functions, styling

**Server Action Layer:**
- Purpose: Server-side business logic and database mutations/queries
- Location: `src/app/actions/`
- Contains:
  - `queries.ts` (11.8 KB) - Database SELECT queries
  - `mutations.ts` (40.3 KB) - Database INSERT/UPDATE/DELETE operations
- Pattern: `'use server'` directive enables calling from client components
- Depends on: Database connection, Clerk Auth

**Database Layer:**
- Purpose: Data persistence and retrieval
- Location: `src/lib/db/`
- Contains:
  - `index.ts` - Database connection setup via Drizzle ORM
  - `schema.ts` - Table definitions via Drizzle ORM
- Pattern: PostgreSQL + Drizzle ORM for type-safe queries
- Connection: `src/lib/db/index.ts` reads `DATABASE_URL` environment variable

**Authentication & Authorization Layer:**
- Purpose: User identity and role-based access control
- Location: `src/lib/`
- Contains:
  - `mockAuthClient.tsx` - Clerk provider wrapper
  - `mockAuth.ts` - Mock auth implementation for development
  - `permissions.ts` - Permission bitmask utilities
- Pattern: Clerk Auth integration with 2-bit permission system

**Styling Layer:**
- Purpose: Global and component styles
- Location: `src/styles/global.css`
- Contains: Tailwind CSS variables, animations, utility classes
- Pattern: Tailwind v4 with custom theme variables

**Assets & Animations:**
- Purpose: Static assets and animation definitions
- Location: `src/assets/animations/` - Lottie animation JSON files
- Usage: Lottie React integration for complex animations

## Data Flow

**Read Flow (getClubs → Component Display):**

1. Page component (e.g., `src/app/(portal)/clubs/page.tsx`) renders
2. Server Action called: `getClubs()` from `src/app/actions/queries.ts`
3. Query executes: `getDb().select().from(clubs)` via Drizzle ORM
4. Database returns club records
5. Component receives data and renders UI (Navbar → ClubList → ClubCard)

**Create Flow (New Club):**

1. Admin component (e.g., `src/components/admin/NewClubButton.tsx`) dispatches action
2. Server Action called: `createClub()` from `src/app/actions/mutations.ts`
3. Validation and permission check (via `permissionBits`)
4. Insert operation: `db.insert(clubs).values({...})`
5. Return new club ID
6. UI updates (revalidation or client-side update)

**State Management:**
- Server State: Managed by Drizzle ORM queries in Server Actions
- Client State: React component state (useState) for UI interactivity
- Auth State: Managed by Clerk Auth via ClerkProvider

## Key Abstractions

**Permission Model:**
- Purpose: Role-based access control with 2-bit bitmask
- Location: `src/lib/permissions.ts`
- Bits:
  - `PERM_MASTER_ADMIN = 1` (0b01) - District admin, full access
  - `PERM_CLUB_PANEL = 2` (0b10) - Club admin or club president
  - Combined `3` (0b11) - Club President (has both bits)
- Functions: `isMasterAdmin()`, `hasClubPanel()`, `isClubPresident()`, `getRoleLabel()`, etc.
- Pattern: Used in mutations to enforce authorization

**Entity Models:**
- `User` - Portal member with role and permissions
- `Club` - Rotaract club entity with leadership
- `Event` - Club or district event
- `EventRegistration` - User attendance tracking
- `Campaign` - Fundraising campaign
- `Course` - LMS course content
- `ServiceHours` - Volunteer tracking
- See `src/lib/db/schema.ts` for complete schema

**Component Patterns:**
- **Sidebar components**: `AdminSidebar.tsx`, `MemberSidebar.tsx` - Context-aware navigation
- **Card components**: `ClubCard.tsx`, `EventCard.tsx` - Data display with actions
- **Modal/Panel components**: `PermissionAssigner.tsx`, `SlidePanel.tsx` - Complex interactions
- **Provider components**: `RippleProvider.tsx`, `SmoothScroll.tsx`, `PageTransition.tsx` - Context/behavior

## Entry Points

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: Application startup
- Responsibilities: Clerk provider setup, global styles, metadata, font loading, HTML structure

**Portal Dashboard:**
- Location: `src/app/(portal)/dashboard/page.tsx`
- Triggers: User navigates to `/dashboard` (logged-in experience)
- Responsibilities: Main portal interface, statistics, quick actions

**Admin Dashboard:**
- Location: `src/app/admin/` (implied admin page)
- Triggers: Master admin navigates to `/admin`
- Responsibilities: District administration, user management, system-wide controls

**Club Admin Panel:**
- Location: `src/app/club-admin/` (implied club admin page)
- Triggers: Club admin navigates to `/club-admin`
- Responsibilities: Club-specific management (members, events, news)

**Sign-in/Sign-up:**
- Location: `src/app/sign-in/[[...sign-in]]`, `src/app/sign-up/[[...sign-up]]`
- Triggers: Clerk auth flow
- Responsibilities: User authentication via Clerk

## Error Handling

**Strategy:** Try-catch in Server Actions with console logging and fallback returns

**Patterns:**
- Query errors: Log to console, return empty array (`[]`)
  ```typescript
  export async function getClubs() {
    try {
      return await getDb().select().from(clubs);
    } catch (error) {
      console.error('Failed to fetch clubs:', error);
      return [];
    }
  }
  ```
- Mutation errors: Log, return null or error object
- Database connection errors: Throw in production if `DATABASE_URL` not set

## Cross-Cutting Concerns

**Logging:**
- Approach: Console.error in query/mutation functions
- Pattern: Log errors with descriptive messages
- Files: `src/app/actions/queries.ts`, `src/app/actions/mutations.ts`

**Validation:**
- Approach: Drizzle ORM schema constraints (notNull, unique, etc.)
- Permission validation: Manual checks in mutations using permission functions
- No centralized validation framework detected

**Authentication:**
- Approach: Clerk Auth via `@clerk/nextjs`
- Pattern: `ClerkProvider` wraps entire app in `src/app/layout.tsx`
- Permission check: Uses `permissionBits` from user record in `src/lib/db/schema.ts`

## Performance Considerations

**Data Fetching:**
- Server Actions minimize client-side logic
- Drizzle ORM queries execute directly on database
- No detected caching layer (candidate for optimization)

**Rendering:**
- React Server Components by default (efficient initial load)
- Interactive components marked with `'use client'`
- GSAP/Framer Motion for hardware-accelerated animations

**Image Optimization:**
- Next.js Image component configured with remote patterns in `next.config.ts`
- Allowed domains: lh3.googleusercontent.com, ui-avatars.com, placehold.co, images.unsplash.com

---

*Architecture analysis: 2026-05-21*
