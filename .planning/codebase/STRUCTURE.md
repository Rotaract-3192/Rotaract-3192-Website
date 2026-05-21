# Codebase Structure

**Analysis Date:** 2026-05-21

## Directory Layout

```
Rotaract-District-3192-Website/
├── src/
│   ├── app/                    # Next.js App Router - routing and pages
│   │   ├── (portal)/           # Portal grouping (shared layout for members)
│   │   │   ├── dashboard/      # Member dashboard
│   │   │   ├── clubs/          # Club directory and profiles
│   │   │   ├── events/         # Event portal
│   │   │   ├── lms/            # Learning management system
│   │   │   ├── leaderboard/    # Points/leaderboard
│   │   │   ├── mentorship/     # Mentorship program
│   │   │   ├── mom/            # Member of the Month
│   │   │   ├── newsletter/     # Newsletter archive
│   │   │   ├── jobs/           # Job board
│   │   │   ├── about/          # About page
│   │   │   ├── news/           # News/announcements
│   │   │   ├── resources/      # Resource library
│   │   │   ├── hall-of-fame/   # Hall of fame
│   │   │   ├── privacy/        # Privacy policy
│   │   │   ├── terms/          # Terms of service
│   │   │   ├── cookies/        # Cookie policy
│   │   │   └── profile/        # User profile
│   │   ├── admin/              # District admin panel
│   │   │   ├── events/         # Event management
│   │   │   ├── clubs/          # Club management
│   │   │   ├── members/        # Member management
│   │   │   ├── leaderboard/    # Leaderboard administration
│   │   │   ├── jobs/           # Job management
│   │   │   ├── lms/            # LMS administration
│   │   │   ├── mom/            # MOM administration
│   │   │   ├── feeds/          # Feed management
│   │   │   ├── announcements/  # Announcement management
│   │   │   ├── campaigns/      # Campaign management
│   │   │   ├── newsletter/     # Newsletter management
│   │   │   ├── resources/      # Resource management
│   │   │   ├── president/      # President-level management
│   │   │   ├── audit/          # Audit logs
│   │   │   └── lms/
│   │   ├── club-admin/         # Club admin panel
│   │   │   ├── events/         # Club event management
│   │   │   ├── members/        # Club member management
│   │   │   ├── news/           # Club news
│   │   │   └── mom/            # Club MOM
│   │   ├── sign-in/            # Clerk sign-in page
│   │   ├── sign-up/            # Clerk sign-up page
│   │   ├── layout.tsx          # Root layout with providers
│   │   └── loading.tsx         # Loading UI
│   ├── components/             # Reusable React components
│   │   ├── admin/              # Admin-specific components
│   │   │   ├── AwardPointsPanel.tsx
│   │   │   ├── NewClubButton.tsx
│   │   │   ├── NewEventButton.tsx
│   │   │   ├── NewMemberButton.tsx
│   │   │   └── NewMOMButton.tsx
│   │   ├── club-admin/         # Club admin components
│   │   ├── ui/                 # Basic UI components
│   │   │   ├── button.tsx
│   │   │   ├── background-paths.tsx
│   │   │   └── etheral-shadow.tsx
│   │   ├── AdminSidebar.tsx    # Admin sidebar navigation
│   │   ├── MemberSidebar.tsx   # Member sidebar navigation
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   ├── Footer.tsx          # Footer
│   │   ├── ClubCard.tsx        # Club display card
│   │   ├── ClubListItem.tsx    # Club list item
│   │   ├── EventCard.tsx       # Event display card
│   │   ├── PermissionAssigner.tsx
│   │   ├── SlidePanel.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── WaveBackground.tsx
│   │   ├── ParticleWaves.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── SmoothScroll.tsx
│   │   ├── RippleProvider.tsx
│   │   └── PageTransition.tsx
│   ├── layouts/                # Shared layouts
│   ├── lib/                    # Utility libraries
│   │   ├── db/
│   │   │   ├── index.ts        # Database connection setup
│   │   │   └── schema.ts       # Drizzle ORM schema
│   │   ├── permissions.ts      # Role/permission utilities
│   │   ├── mockAuth.ts         # Mock auth (development)
│   │   ├── mockAuthClient.tsx  # Clerk provider wrapper
│   │   ├── ai.ts               # AI integration (OpenAI)
│   │   └── utils.ts            # General utilities
│   ├── assets/                 # Static assets
│   │   └── animations/         # Lottie JSON animations
│   ├── styles/                 # Global styles
│   │   └── global.css          # Tailwind CSS with theme
│   └── mock/                   # Mock data (Phase 1)
├── public/                     # Static files served as-is
├── drizzle/                    # Drizzle ORM migrations
├── scripts/                    # Build/utility scripts
├── .opencode/                  # Opencode configuration
├── .stitch/                    # Stitch design system files
├── .vscode/                    # VS Code settings
├── .planning/                  # Planning documents (roadmaps, analysis)
├── .env.local                  # Environment variables (NOT committed)
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── drizzle.config.ts           # Drizzle ORM config
├── next.config.ts              # Next.js config
├── postcss.config.mjs          # PostCSS config
└── README.md                   # Project readme
```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router - defines all routes, pages, and layouts
- Contains: `.tsx` page files, layout files, route groups, server actions
- Structure: URL path = directory structure (e.g., `src/app/(portal)/clubs/` → `/clubs` route)

**`src/app/(portal)/`:**
- Purpose: Grouped route for member portal UI (shared navbar/sidebar/footer)
- Contains: All member-facing pages (dashboard, clubs, events, profile, etc.)
- Parent layout shared across all portal routes

**`src/app/admin/`:**
- Purpose: District admin control panel
- Contains: Admin pages for managing clubs, members, events, campaigns, etc.
- Access: Master admin only (`PERM_MASTER_ADMIN`)

**`src/app/club-admin/`:**
- Purpose: Club-level administration
- Contains: Pages for managing club-specific members, events, news
- Access: Club admin and club presidents (`PERM_CLUB_PANEL`)

**`src/components/`:**
- Purpose: Reusable UI components and layout elements
- Contains: Button components, card components, sidebars, navigation
- Organized by: Scope (admin, club-admin, ui) or component name

**`src/lib/db/`:**
- Purpose: Database abstraction layer
- Contains: Drizzle ORM schema and connection configuration
- Key file: `schema.ts` - 14 PostgreSQL tables defined

**`src/lib/`:**
- Purpose: Shared utility and library functions
- Key files:
  - `permissions.ts` - 2-bit bitmask permission system
  - `mockAuthClient.tsx` - Clerk Auth provider
  - `ai.ts` - AI/OpenAI integration

**`src/app/actions/`:**
- Purpose: Server-side business logic (Server Actions)
- Contains:
  - `queries.ts` - Database SELECT operations
  - `mutations.ts` - Database INSERT/UPDATE/DELETE operations
- Pattern: `'use server'` directive makes functions callable from client

**`src/styles/`:**
- Purpose: Global styling
- Contains: `global.css` with Tailwind configuration and custom utilities

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx` - Root layout, Clerk provider, metadata, fonts
- `src/app/(portal)/dashboard/page.tsx` - Member portal dashboard
- `src/app/admin/` - Admin dashboard (assumed, see admin routes)
- `src/app/sign-in/[[...sign-in]]/` - Sign-in page (Clerk managed)

**Configuration:**
- `tsconfig.json` - TypeScript config with `@/*` path alias
- `next.config.ts` - Image domains, experimental features
- `drizzle.config.ts` - Database connection and migrations
- `.env.local` - Environment variables (DATABASE_URL, API keys)

**Core Logic:**
- `src/app/actions/queries.ts` - All database read operations
- `src/app/actions/mutations.ts` - All database write operations
- `src/lib/db/schema.ts` - Database schema (14 tables)
- `src/lib/permissions.ts` - Permission/role system

**Testing:**
- Not detected (no test files found)
- Consider adding: `__tests__/`, `.test.ts`, `.spec.ts` files

**Styling:**
- `src/styles/global.css` - Global CSS + Tailwind theme variables
- `tailwindcss.config.*` - Tailwind configuration (not found, may be in `next.config.ts`)

## Naming Conventions

**Files:**
- Components: PascalCase (`Navbar.tsx`, `ClubCard.tsx`, `AdminSidebar.tsx`)
- Pages: lowercase directory with `page.tsx` (`src/app/(portal)/dashboard/page.tsx`)
- Utilities/libraries: camelCase (`schema.ts`, `permissions.ts`, `mockAuth.ts`)
- Styles: snake_case in CSS classes (`.glass-nav`, `.fluid-shadow`)

**Directories:**
- Pages/routes: lowercase with hyphens (`dashboard`, `club-admin`, `sign-in`)
- Grouping: parentheses `(portal)`, `(auth)`
- Dynamic routes: brackets `[slug]`, `[courseId]`

**Components:**
- React components: PascalCase file + export name
- Props files: Not a convention used (inline interfaces)

**Database:**
- Tables: Plural snake_case (`users`, `clubs`, `event_registrations`)
- Columns: camelCase in TypeScript, snake_case in SQL (`firstName` → `first_name`)

## Where to Add New Code

**New Feature:**
- Primary code: Create folder in `src/app/(portal)/[feature]/page.tsx` or `src/app/admin/[feature]/page.tsx`
- Components: Add to `src/components/` with appropriate subfolder (admin, club-admin, ui, or root)
- Server actions: Add query or mutation to `src/app/actions/queries.ts` or `mutations.ts`

**New Component/Module:**
- Shared components: `src/components/[ComponentName].tsx`
- Admin-specific: `src/components/admin/[ComponentName].tsx`
- Club admin-specific: `src/components/club-admin/[ComponentName].tsx`
- UI components: `src/components/ui/[component].tsx`

**Database Table/Entity:**
- Schema: Add table definition to `src/lib/db/schema.ts`
- Queries: Add select queries to `src/app/actions/queries.ts`
- Mutations: Add insert/update/delete to `src/app/actions/mutations.ts`
- Migration: Run `drizzle-kit push:pg` to sync schema

**Utilities:**
- Helpers: `src/lib/[feature].ts` (e.g., `src/lib/permissions.ts`)
- Constants: Consider `src/lib/constants.ts` (not found currently)
- Hooks: Consider `src/lib/hooks/` for custom React hooks

## Special Directories

**`.next/`:**
- Purpose: Next.js build output
- Generated: Yes (created during `npm run build`)
- Committed: No (in `.gitignore`)

**`node_modules/`:**
- Purpose: Installed npm dependencies
- Generated: Yes (created by `npm install`)
- Committed: No (in `.gitignore`)

**`drizzle/`:**
- Purpose: Drizzle ORM migration files
- Generated: Partially (created by `drizzle-kit generate:pg`)
- Committed: Yes (version controlled)

**`.planning/`:**
- Purpose: Project planning documents and codebase analysis
- Generated: By planning tools (roadmaps, architecture docs)
- Committed: Yes (reference documents)

**`public/`:**
- Purpose: Static assets served directly (images, videos, fonts)
- Contains: `favicon.svg`, `waves.mp4`, and other public files
- Access: `/` path in application

---

*Structure analysis: 2026-05-21*
