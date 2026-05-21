# Technology Stack

**Analysis Date:** 2026-05-21

## Languages

**Primary:**
- TypeScript 5.9.3 - All frontend and configuration files
- JSX/TSX - React components and page files throughout `src/components/` and `src/app/`

**Secondary:**
- JavaScript - Legacy scripts (`strip-bg.js`, `generate-seed.js`)
- SQL - Database migrations in `drizzle/`

## Runtime

**Environment:**
- Node.js >=22.12.0 (see `package.json` engines field)

**Package Manager:**
- npm (lockfile: `package-lock.json` present)

## Frameworks

**Core:**
- Next.js 16.2.3 - Full-stack React framework for routing, rendering, and server actions
- React 19.2.5 - UI component library
- React DOM 19.2.5 - DOM rendering

**Styling:**
- Tailwind CSS 4.2.2 - Utility-first CSS framework
- @tailwindcss/postcss 4.2.2 - PostCSS plugin for Tailwind
- PostCSS 8.5.9 - CSS transformation tool

**Authentication:**
- @clerk/nextjs 7.2.3 - Auth provider integration (uses `ClerkProvider` in `src/app/layout.tsx`)
- @clerk/themes 2.4.57 - Clerk UI theme customization

**Animations & Motion:**
- GSAP 3.15.0 - Animation library (GreenSock Animation Platform)
- @gsap/react 2.1.2 - React integration for GSAP
- Framer Motion 12.38.0 - React animation library
- Lottie React 2.4.1 - Lottie animation player for React

**UI & Components:**
- Radix UI - Headless component library (via `@radix-ui/react-slot 1.2.4`)
- class-variance-authority 0.7.1 - CVA utility for component variants
- clsx 2.1.1 - Classname utility
- tailwind-merge 3.5.0 - Merge Tailwind classes safely

**Database & ORM:**
- Drizzle ORM 0.45.2 - TypeScript ORM for database queries
- postgres 3.4.9 - PostgreSQL client library
- drizzle-kit 0.31.10 (dev) - Schema migration and introspection

**Utilities:**
- date-fns 4.1.0 - Date manipulation and formatting
- Lenis 1.3.23 - Smooth scrolling library
- lucide-react 1.8.0 - React icon library

**Development Tools:**
- ESLint 9.39.4 - JavaScript linting
- eslint-config-next 16.2.6 - Next.js ESLint configuration
- tsx 4.21.0 - TypeScript executor for Node scripts
- dotenv 17.4.2 (dev) - Environment variable loader

**Type Definitions:**
- @types/node 25.5.2 - Node.js type definitions
- @types/react 19.2.14 - React type definitions
- @types/react-dom 19.2.3 - React DOM type definitions
- @types/gsap 1.20.2 - GSAP type definitions

## Configuration

**Environment:**
- Configuration via `.env.local` file (see `.env.local` in root)
- Key var: `DATABASE_URL` - PostgreSQL connection string (used in `src/lib/db/index.ts`)
- See `drizzle.config.ts` for database configuration loading

**Build:**
- `next.config.ts` - Next.js configuration (image domains, experimental features)
- `tsconfig.json` - TypeScript compiler options (path aliases via `@/*` → `./src/*`)
- `postcss.config.mjs` - PostCSS configuration for Tailwind
- `tailwindcss.config.*` - Tailwind CSS configuration

## Platform Requirements

**Development:**
- Node.js >=22.12.0
- npm for dependency management
- PostgreSQL database (connection via `DATABASE_URL`)

**Production:**
- Node.js >=22.12.0 runtime
- PostgreSQL database
- Can be deployed as standard Next.js application

## Key Dependencies Overview

**Critical Path:**
1. Next.js 16.2.3 - Application framework
2. React 19.2.5 - UI rendering
3. Tailwind CSS 4.2.2 - Styling system
4. TypeScript 5.9.3 - Type safety
5. Drizzle ORM 0.45.2 - Database abstraction

**External Integrations:**
- Clerk Auth (OAuth provider) - `@clerk/nextjs` integration in `src/app/layout.tsx`
- PostgreSQL database - via `postgres` client and Drizzle ORM

---

*Stack analysis: 2026-05-21*
