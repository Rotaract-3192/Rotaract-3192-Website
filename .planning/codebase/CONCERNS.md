# Codebase Concerns

**Analysis Date:** 2026-05-21

## Critical Issues

### Missing Test Infrastructure
- **Issue:** Zero testing setup despite TypeScript and 14 database tables
- **Files:** Entire codebase lacks `.test.ts` or `.spec.ts` files
- **Impact:** 
  - Permission logic changes could silently break authorization
  - Database mutations have no verification
  - Components untested before deployment
  - High regression risk as codebase grows
- **Fix approach:** 
  - Install Vitest + React Testing Library
  - Priority: Test permission system (security-critical)
  - Create `.test.tsx` files co-located with source
  - Establish CI pipeline to run tests on commits

**Priority: HIGH** - Security and stability risk

---

## Tech Debt

### Authentication System Mixing
- **Issue:** Dual authentication approach - Clerk Auth + mock auth system
- **Files:** 
  - `src/app/layout.tsx` - Uses ClerkProvider
  - `src/lib/mockAuthClient.tsx` - Mock wrapper
  - `src/lib/mockAuth.ts` - Fallback mock implementation
- **Impact:** Unclear which auth system is active in production
- **Fix approach:** 
  - Decide: Keep only Clerk Auth for production
  - Move mock auth to development-only imports
  - Document auth flow clearly

**Priority: MEDIUM** - Maintenance burden

### Unfinished Database Migrations
- **Issue:** `drizzle/` directory has migration files but migration strategy unclear
- **Files:** `drizzle/` (migration artifacts)
- **Impact:** Database schema sync may fail, rollback unclear
- **Fix approach:** 
  - Document migration process in README
  - Create `scripts/migrate.sh` for consistent migrations
  - Use `drizzle-kit push:pg` in CI/CD

**Priority: MEDIUM** - Deployment risk

### Inconsistent Error Handling
- **Issue:** All database errors return empty results or null; no user-facing error messages
- **Files:** 
  - `src/app/actions/queries.ts` - Returns `[]` on error
  - `src/app/actions/mutations.ts` - Returns null or error object inconsistently
- **Impact:** Users unaware when operations fail; debugging difficult
- **Fix approach:** 
  - Create error wrapper with consistent format
  - Return typed result: `{ success: boolean, data?, error? }`
  - Add user-facing error messages in UI

**Priority: MEDIUM** - User experience

---

## Fragile Areas

### Permission System Fragility
- **Issue:** 2-bit permission bitmask is brittle; difficult to extend beyond 4 roles
- **Files:** `src/lib/permissions.ts`, `src/lib/db/schema.ts` (permissionBits field)
- **Why fragile:** 
  - Adding new role requires bit calculation changes
  - No validation of invalid bit values
  - Hard-coded role interpretations scattered across code
- **Safe modification:** 
  - Test all permission functions before changes
  - Use constants for all bit values
  - Consider migration to role strings: `enum Role { Master, ClubAdmin, President, Member }`
- **Test coverage:** Needs 100% coverage on `permissions.ts`

**Priority: HIGH** - Affects authorization

### Large Mutation File
- **Issue:** `src/app/actions/mutations.ts` is 40.3 KB (very large)
- **Files:** `src/app/actions/mutations.ts`
- **Why fragile:** 
  - Single file handles all create/update/delete operations
  - Hard to locate specific mutation
  - Difficult to test isolated mutations
  - Changes affect entire file
- **Safe modification:** 
  - Split by feature: `mutations/club.ts`, `mutations/event.ts`, etc.
  - Create index.ts to re-export all
  - One feature per file
- **Test coverage:** Currently untested, high regression risk

**Priority: MEDIUM** - Maintainability

### Large Query File
- **Issue:** `src/app/actions/queries.ts` is 11.8 KB with many queries
- **Files:** `src/app/actions/queries.ts`
- **Why fragile:** 
  - Growing query count makes file unwieldy
  - Pattern consistency hard to enforce across file
  - Changes risk breaking multiple queries
- **Safe modification:** 
  - Consider splitting: `queries/club.ts`, `queries/event.ts` later
  - Add JSDoc comments to all queries
  - Test all query variants
- **Test coverage:** Currently untested

**Priority: LOW** - Not yet unmaintainable

---

## Known Bugs & Gaps

### Missing Error Boundary
- **Issue:** No error boundary components for React error handling
- **Files:** `src/app/layout.tsx` - Should have `error.tsx` and `loading.tsx`
- **Impact:** App crashes on component errors instead of showing fallback
- **Fix approach:** 
  - Create `src/app/error.tsx` for global error boundary
  - Create feature-specific error boundaries in `src/app/(portal)/error.tsx`, etc.

**Priority: MEDIUM** - Stability

### Incomplete Resource Pages
- **Issue:** Several pages exist but likely unfinished
- **Files:** 
  - `src/app/(portal)/resources/` - Page exists
  - `src/app/(portal)/privacy/` - Privacy policy
  - `src/app/(portal)/terms/` - Terms of service
- **Impact:** Static content may be placeholder/stub
- **Fix approach:** Add content or link to external documents

**Priority: LOW** - Non-critical content

### No Logging in Mutation Success
- **Issue:** Only errors logged; successful mutations silent
- **Files:** `src/app/actions/mutations.ts`
- **Impact:** Difficult to debug or audit operations
- **Fix approach:** Add success logging with operation type and affected entity

**Priority: MEDIUM** - Observability

---

## Performance Bottlenecks

### No Database Query Optimization
- **Issue:** Queries lack indexing hints, pagination, or result limits
- **Files:** `src/app/actions/queries.ts`
- **Problem:**
  - `getEvents()` returns all events (could be thousands)
  - `getClubs()` returns all clubs without limit
  - `getFeedItems()` unbounded query
- **Improvement path:** 
  - Add pagination: `limit(20)` + offset for list views
  - Use `.limit()` for all unbounded queries
  - Add database indexes on common filters (status, clubId, eventDate)
- **Verify:** Monitor query times with `EXPLAIN ANALYZE`

**Priority: MEDIUM** - Data growth risk

### No Caching Layer
- **Issue:** Every request queries database fresh
- **Files:** All Server Action queries
- **Problem:** Database hit for every page load
- **Improvement path:** 
  - Use Next.js `unstable_cache()` for data queries
  - Add Redis cache for frequently accessed data (clubs, events)
  - Consider stale-while-revalidate pattern
- **Verify:** Monitor database connection pool usage

**Priority: LOW** - Not yet critical at current scale

### Image Loading
- **Issue:** Multiple external image domains configured but no optimization
- **Files:** `next.config.ts` (4 remote domains)
- **Problem:** No image compression, lazy loading, or sizing
- **Improvement path:** 
  - Use Next.js `<Image>` component with `width` and `height`
  - Add `sizes` prop for responsive images
  - Consider image CDN or optimization service

**Priority: LOW** - UI concerns

---

## Security Considerations

### Permission Validation Gaps
- **Issue:** Permissions checked inconsistently across mutations
- **Files:** `src/app/actions/mutations.ts` - Some mutations check permissions, others don't
- **Risk:** Unauthorized users could perform restricted operations
- **Current mitigation:** Clerk Auth session check (implicit)
- **Recommendations:** 
  - Create `requireRole()` wrapper for all mutations
  - Document which mutations require which roles
  - Add integration tests for permission enforcement
  - Audit all mutations for access control

**Priority: HIGH** - Security

### Environment Variable Exposure
- **Issue:** DATABASE_URL in `.env.local` is critical secret
- **Files:** `.env.local` (not in repo, good)
- **Risk:** If deployed to client, credentials exposed
- **Current mitigation:** `.env.local` in `.gitignore`
- **Recommendations:** 
  - Never ship `process.env.DATABASE_URL` to client
  - Use server-only imports in Server Actions
  - Add `'use server'` to all mutations (already done)

**Priority: MEDIUM** - Deployment config

### Open URLs/Routes
- **Issue:** Redirect logic unclear for unauthorized access
- **Files:** Sign-in/sign-up routes, admin routes
- **Risk:** Users can access forbidden routes (depends on Clerk)
- **Current mitigation:** Clerk Auth provides route protection
- **Recommendations:** 
  - Add middleware to check permissions at route level
  - Create `src/middleware.ts` to enforce access control
  - Test unauthorized access scenarios

**Priority: MEDIUM** - Access control

---

## Scaling Limits

### Database Connection Pool
- **Issue:** Single database connection configured
- **Files:** `src/lib/db/index.ts` - Creates one `postgres()` client
- **Current capacity:** ~5-10 concurrent connections
- **Limit:** Hits when connection pool exhausted under load
- **Scaling path:** 
  - Enable connection pooling in `postgres()` client options
  - Use managed connection pool (PgBouncer, etc.)
  - Set `prepare: false` already done (good)

**Priority: MEDIUM** - Future-proofing

### Single Drizzle Instance
- **Issue:** Single `db` instance shared across all requests
- **Files:** `src/lib/db/index.ts`
- **Problem:** Not ideal for serverless (each request gets new instance)
- **Scaling path:** 
  - Create new client per request (if using serverless)
  - Document connection strategy for deployment

**Priority: LOW** - Depends on deployment target

---

## Dependencies at Risk

### Clerk Auth Version Lock
- **Issue:** `@clerk/nextjs` pinned to 7.2.3
- **Risk:** Security updates may lag
- **Current mitigation:** Package monitor needed
- **Migration plan:** Test and upgrade quarterly

**Priority: MEDIUM** - Maintenance

### Drizzle ORM Early Stage
- **Issue:** Drizzle ORM 0.45.2 is rapidly evolving
- **Risk:** Breaking API changes between versions
- **Current mitigation:** Already at recent version
- **Migration plan:** Monitor releases, test upgrades in staging

**Priority: LOW** - Currently stable

---

## Missing Critical Features

### No Audit Trail UI
- **Issue:** `audit_logs` table in schema but no UI to view logs
- **Files:** `src/lib/db/schema.ts` has auditLogs table
- **Problem:** Admins can't review system actions
- **Fix approach:** 
  - Create `src/app/admin/audit/page.tsx`
  - Query `auditLogs` table with filtering
  - Add pagination and search

**Priority: MEDIUM** - Admin visibility

### No API Documentation
- **Issue:** Server Actions not documented for frontend developers
- **Files:** All of `src/app/actions/`
- **Problem:** Developers unclear on query/mutation parameters
- **Fix approach:** 
  - Add JSDoc comments to all functions with @param, @returns
  - Consider OpenAPI schema generation

**Priority: MEDIUM** - Developer experience

---

## Test Coverage Gaps

### Zero Test Coverage
- **Issue:** No tests exist for any code
- **Files:** Entire `src/` directory
- **Risk:** 
  - Permission logic changes could break authorization silently
  - Database schema changes could cause runtime errors
  - UI component changes could break layouts
- **Priority: HIGH** - See Testing.md for comprehensive plan

### Untested Permission System
- **Files:** `src/lib/permissions.ts`
- **What's not tested:** 
  - Bit math correctness
  - Role label accuracy
  - Badge class CSS consistency
- **Risk:** Very high - permission system is security-critical
- **Priority: CRITICAL** - Must test before production

### Untested Database Operations
- **Files:** `src/app/actions/queries.ts`, `src/app/actions/mutations.ts`
- **What's not tested:** 
  - Error handling
  - Transaction consistency
  - Permission checks in mutations
- **Risk:** Data corruption, unauthorized modifications
- **Priority: HIGH** - Critical path testing

---

## Recommendations Summary

| Issue | Priority | Effort | Impact | Category |
|-------|----------|--------|--------|----------|
| Add test infrastructure | HIGH | 3-4h setup + ongoing | Prevents regressions | Quality |
| Test permission system | CRITICAL | 4-6h | Ensures security | Testing |
| Permission validation in mutations | HIGH | 4h | Prevents unauthorized access | Security |
| Split mutations file | MEDIUM | 8h | Improves maintainability | Architecture |
| Add pagination to queries | MEDIUM | 6h | Prevents performance degradation | Performance |
| Create error boundary | MEDIUM | 3h | Improves stability | Quality |
| Middleware for access control | MEDIUM | 4h | Clarifies authorization | Security |
| Add JSDoc to functions | LOW | 6h | Improves DX | Documentation |

---

*Concerns audit: 2026-05-21*
