# Coding Conventions

**Analysis Date:** 2026-05-21

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `Navbar.tsx`, `ClubCard.tsx`, `AdminSidebar.tsx`)
- Utilities: camelCase (e.g., `permissions.ts`, `mockAuth.ts`, `utils.ts`)
- Pages: lowercase with `page.tsx` suffix (e.g., `src/app/(portal)/dashboard/page.tsx`)
- Styles: camelCase or kebab-case (`.glass-nav`, `.fluid-shadow` in `global.css`)

**Functions:**
- Queries: getXxx format (e.g., `getClubs()`, `getEvents()`, `getCourses()` in `src/app/actions/queries.ts`)
- Mutations: createXxx, updateXxx, deleteXxx (e.g., `createClub()`, `updateEvent()` in `src/app/actions/mutations.ts`)
- Utilities: camelCase verbs (e.g., `isMasterAdmin()`, `hasClubPanel()` in `src/lib/permissions.ts`)
- Handlers: onXxx or handleXxx pattern (typical React convention)

**Variables:**
- Local/module scope: camelCase (e.g., `connectionString`, `eventDate`, `maxAttendees`)
- Constants: UPPER_SNAKE_CASE (e.g., `PERM_MASTER_ADMIN`, `PERM_CLUB_PANEL` in `src/lib/permissions.ts`)
- boolean variables: isXxx, hasXxx prefix (e.g., `isSignatureProject`, `isClubPresident()`)

**Types & Interfaces:**
- Type names: PascalCase (implied, not explicit in codebase - see `exports` pattern)
- Database fields: camelCase in TypeScript, snake_case in SQL (e.g., `firstName` → `first_name`)

## Code Style

**Formatting:**
- Tool: None configured (no prettier config found)
- Indentation: Appears to be 2 spaces (based on file samples)
- Line length: No strict limit detected
- Semicolons: Used (TypeScript standard)

**Linting:**
- Tool: ESLint (configured via `eslint-config-next`)
- Config: `eslint-config-next` for Next.js rules
- Run: `npm run lint src`
- Rules: Next.js recommended rules (images, links, etc.)

## Import Organization

**Order (observed pattern in `src/app/actions/queries.ts` and `mutations.ts`):**
1. `'use server'` directive (Server Actions)
2. External library imports (React, Next.js)
3. Internal absolute imports using `@/` path alias
4. Database imports from `@/lib/db`

**Example from `src/app/actions/queries.ts`:**
```typescript
'use server';

import { getDb } from '@/lib/db';
import { clubs, events, jobs, ... } from '@/lib/db/schema';
import { desc, eq, and, ne, sql, count } from 'drizzle-orm';
```

**Path Aliases:**
- Configured in `tsconfig.json`: `@/*` → `./src/*`
- Usage: `import { getDb } from '@/lib/db'` instead of relative paths
- Benefit: Cleaner, more maintainable imports regardless of file depth

## Error Handling

**Patterns in queries and mutations:**
- Try-catch blocks wrapping database operations
- Log errors to console with descriptive context
- Return sensible defaults:
  - Query errors: Return empty array `[]`
  - Mutation errors: Return `null` or error object
  - Connection errors: Throw in production with meaningful message

**Example from `src/app/actions/queries.ts`:**
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

**Database errors in `src/lib/db/index.ts`:**
```typescript
if (!process.env.DATABASE_URL && process.env.NODE_ENV !== 'production') {
  throw new Error('DATABASE_URL is not set...');
}
```

## Logging

**Framework:** None - uses native `console.error()` and `console.log()`

**Patterns:**
- Errors: `console.error('Failed to [operation]:', error)` in query/mutation catch blocks
- Info: Not extensively used (development/debugging only)
- No structured logging detected
- No external logging service integration

**Where logging occurs:**
- `src/app/actions/queries.ts` - All query failures logged
- `src/app/actions/mutations.ts` - Mutation failures logged
- `src/lib/db/index.ts` - Connection errors logged

## Comments

**When to Comment:**
- Complex business logic (permission checks, data transformations)
- Non-obvious parameter meanings or constraints
- Workarounds or temporary solutions marked with TODO/FIXME (see concerns)

**JSDoc/TSDoc:**
- Not extensively used in codebase
- Functions lack documentation comments
- Could improve with JSDoc for public APIs

**Observed pattern:**
- Minimal inline comments
- Code clarity preferred over comments
- Permission system well-commented (`src/lib/permissions.ts` has header explaining bits)

## Function Design

**Size:**
- Observed range: Small to medium (getClubs ~ 8 lines, updateEvent ~ 30 lines)
- Pattern: Single responsibility principle observed
- Server Actions tend toward single operations per function

**Parameters:**
- Query functions: Often no parameters or optional `limit` parameter
- Mutation functions: Spread of data parameter + optional metadata
- Callbacks/handlers: Event or context parameter

**Return Values:**
- Query functions: Return array of records or empty array on error
- Mutation functions: Return modified record, new ID, or error object
- All async (Promise-based)

**Example patterns:**
```typescript
// Query - returns array
export async function getClubs() { return [...]; }

// Query with options - returns array with limit
export async function getUpcomingEvents(limit = 5) { 
  return [...].limit(limit);
}

// Mutation - returns object
export async function createClub(data) { 
  return await db.insert(clubs).values(data).returning();
}
```

## Module Design

**Exports:**
- Database schema: Named exports of table objects (e.g., `export const users = pgTable(...)`)
- Query/Mutation files: Named exports of async functions (e.g., `export async function getClubs()`)
- Permission utilities: Named exports of functions and constants
- No default exports observed

**Barrel Files:**
- Not used for re-exporting groups
- Direct imports from specific modules preferred (e.g., `from '@/lib/db'`)

**File organization:**
- `queries.ts` - All read operations grouped together
- `mutations.ts` - All write operations grouped together
- Clean separation of concerns

## React Component Patterns

**Component Structure:**
- Functional components (hooks-based)
- `'use client'` directive for interactive components (when needed)
- Props: Inline interfaces (TypeScript)
- State: `useState` for local state
- Effects: `useEffect` for side effects

**Example pattern (implied from directory structure):**
```typescript
// src/components/ClubCard.tsx
'use client';

import { Club } from '@/lib/db/schema';

interface ClubCardProps {
  club: Club;
  onSelect?: (id: string) => void;
}

export function ClubCard({ club, onSelect }: ClubCardProps) {
  return (
    <div className="...">
      {/* Component JSX */}
    </div>
  );
}
```

## Database & Drizzle ORM Conventions

**Schema Definition:**
- Tables defined with `pgTable()` from drizzle-orm
- Column types: `text()`, `integer()`, `real()`, `boolean()`, `timestamp()`
- Constraints: `.notNull()`, `.unique()`, `.default()`, `.primaryKey()`
- Timestamps: `.defaultNow()` for auto-populated timestamps

**Query Patterns:**
```typescript
// Select all
getDb().select().from(clubs)

// With conditions
getDb().select().from(events).where(eq(events.status, 'upcoming'))

// With ordering and limit
getDb().select().from(events).orderBy(desc(events.eventDate)).limit(5)

// With joins (inferred from schema relations)
// Not explicitly shown, but pgTable supports relations
```

**Mutation Patterns:**
```typescript
// Insert
db.insert(clubs).values({...}).returning()

// Update
db.update(users).set({...}).where(eq(users.id, id)).returning()

// Delete
db.delete(events).where(eq(events.id, id))
```

## Styling Conventions

**Tailwind CSS:**
- v4 with custom theme in `src/styles/global.css`
- Custom CSS variables: `--color-primary`, `--color-surface`, etc.
- Utility classes: `glass-nav`, `fluid-shadow`, `fade-in-up`
- Animations: Stagger pattern with `.stagger-1`, `.stagger-2`, etc.

**Class Organization (observed):**
```html
<div className="flex items-center gap-4 rounded-lg bg-surface-container p-4 fluid-shadow">
  <!-- Layout, spacing, background, styling, effects -->
</div>
```

**Animation Classes:**
- `.fade-in-up` - Fade in from bottom
- `.stagger-1` through `.stagger-4` - Cascading animation delays
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth, custom)

## Type Safety

**TypeScript Setup:**
- Strict mode enabled in `tsconfig.json`
- `noImplicitAny: false` - Allows implicit any (relaxed)
- Database types auto-generated from schema via Drizzle
- Component props: Inline interfaces

---

*Convention analysis: 2026-05-21*
