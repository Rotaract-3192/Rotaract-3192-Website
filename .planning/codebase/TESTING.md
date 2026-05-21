# Testing Patterns

**Analysis Date:** 2026-05-21

## Test Framework

**Runner:**
- Not detected - No Jest, Vitest, or other test runner configured
- Status: Testing infrastructure not implemented (Phase 1/2 concern)

**Assertion Library:**
- Not detected - No testing library configured

**Run Commands:**
```bash
# NOT AVAILABLE - No test infrastructure
npm test              # Not configured
npm run test:watch   # Not configured
npm run test:coverage # Not configured
```

**Related Configuration Files:**
- No `jest.config.ts`, `vitest.config.ts`, or equivalent found
- No test-related dev dependencies in `package.json`
- No test scripts in package.json

## Test File Organization

**Location:**
- Not established - No test files found in codebase
- Recommendation: Co-located tests with components (Next.js convention)
  - `src/components/Navbar.tsx` → `src/components/Navbar.test.tsx`
  - `src/app/actions/queries.ts` → `src/app/actions/queries.test.ts`

**Naming:**
- Proposed: `.test.ts` or `.test.tsx` suffix (not yet used)
- Alternative: `.spec.ts` or `.spec.tsx`

**Structure (proposed):**
```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Navbar.test.tsx          # Co-located test
│   ├── ClubCard.tsx
│   └── ClubCard.test.tsx
├── app/
│   └── actions/
│       ├── queries.ts
│       ├── queries.test.ts       # Co-located test
│       ├── mutations.ts
│       └── mutations.test.ts
└── lib/
    ├── permissions.ts
    └── permissions.test.ts
```

## Test Types

**Unit Tests:**
- Scope: Individual functions and components
- Recommended subjects:
  - `src/lib/permissions.ts` - Permission/role functions (deterministic, easy to test)
  - `src/components/ui/` - Button and UI components (isolated)
  - Utility functions in `src/lib/`
- Approach: Test single function behavior with various inputs

**Integration Tests:**
- Scope: Server Actions with database interactions
- Recommended subjects:
  - `src/app/actions/queries.ts` - Database read operations
  - `src/app/actions/mutations.ts` - Database write operations
  - Multi-component workflows (e.g., create club → verify in list)
- Approach: Mock database or use test database

**E2E Tests:**
- Status: Not currently implemented
- Framework: Playwright, Cypress recommended for Next.js
- Recommended scenarios:
  - User sign-up and authentication flow
  - Create club and event workflows
  - Admin panel permission enforcement
  - Club admin workflows

## Testing Candidates (Priority Order)

**High Priority (Core Logic):**
1. **`src/lib/permissions.ts`** - Permission system
   - Test: `isMasterAdmin(1)` → true
   - Test: `hasClubPanel(2)` → true
   - Test: `isClubPresident(3)` → true
   - Test: Role label mapping
   - Why: Core to authorization logic, affects access control

2. **`src/app/actions/queries.ts`** - Database queries
   - Test: `getClubs()` returns clubs
   - Test: Error handling returns empty array
   - Test: `getUpcomingEvents(limit)` respects limit
   - Why: Data integrity, affects all data display

3. **`src/app/actions/mutations.ts`** - Create/update/delete operations
   - Test: `createClub(data)` creates and returns club
   - Test: `updateUserPermissions()` modifies permissions
   - Test: Error handling in mutations
   - Why: Data modification, critical for data consistency

**Medium Priority (Components):**
4. **`src/components/ui/button.tsx`** - Basic UI component
   - Test: Renders button with text
   - Test: Handles click events
   - Why: Foundational UI component

5. **`src/components/AdminSidebar.tsx`** - Navigation
   - Test: Renders menu items
   - Test: Highlights active route
   - Why: Core navigation logic

6. **`src/components/PermissionAssigner.tsx`** - Complex UI
   - Test: Renders permission options
   - Test: Handles permission selection
   - Test: Submits with correct permission bits
   - Why: Complex permission UI, error-prone

**Low Priority (Non-Critical):**
7. **Layout and page components** - Mostly presentational
8. **Animation components** - Visual testing harder to automate

## Recommended Testing Setup

**Framework Choice: Vitest + React Testing Library**

**Why:**
- Vitest: Fast, TypeScript-native, Vite integration
- React Testing Library: Test behavior not implementation, aligns with modern practices
- Both have excellent Next.js support

**Installation (proposed):**
```bash
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/jest-dom
```

**Configuration file (proposed `vitest.config.ts`):**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Package.json scripts (proposed):**
```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage"
  }
}
```

## Example Test Patterns (Proposed)

**Unit Test - Permission Function:**
```typescript
// src/lib/permissions.test.ts
import { describe, it, expect } from 'vitest';
import { isMasterAdmin, hasClubPanel, isClubPresident, getRoleLabel } from '@/lib/permissions';

describe('permissions', () => {
  describe('isMasterAdmin', () => {
    it('returns true for PERM_MASTER_ADMIN (1)', () => {
      expect(isMasterAdmin(1)).toBe(true);
    });
    
    it('returns false for non-admin (0)', () => {
      expect(isMasterAdmin(0)).toBe(false);
    });
    
    it('returns true for combined admin (3)', () => {
      expect(isMasterAdmin(3)).toBe(true);
    });
  });

  describe('getRoleLabel', () => {
    it('returns "Master Admin" for bits 1', () => {
      expect(getRoleLabel(1)).toBe('Master Admin');
    });
    
    it('returns "Club President" for bits 3', () => {
      expect(getRoleLabel(3)).toBe('Club President');
    });
    
    it('returns "Member" for bits 0', () => {
      expect(getRoleLabel(0)).toBe('Member');
    });
  });
});
```

**Component Test - UI Component:**
```typescript
// src/components/ui/button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from '@/components/ui/button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalled();
  });
});
```

**Integration Test - Server Action (with mocking):**
```typescript
// src/app/actions/queries.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getClubs } from '@/app/actions/queries';
import * as dbModule from '@/lib/db';

// Mock the database module
vi.mock('@/lib/db', () => ({
  getDb: vi.fn(),
}));

describe('queries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getClubs', () => {
    it('returns clubs from database', async () => {
      const mockClubs = [
        { id: '1', name: 'Club 1', slug: 'club-1' },
        { id: '2', name: 'Club 2', slug: 'club-2' },
      ];
      
      const mockDb = {
        select: vi.fn().mockReturnThis(),
        from: vi.fn().mockResolvedValue(mockClubs),
      };
      
      vi.mocked(dbModule.getDb).mockReturnValue(mockDb as any);
      
      const result = await getClubs();
      expect(result).toEqual(mockClubs);
    });

    it('returns empty array on error', async () => {
      vi.mocked(dbModule.getDb).mockImplementation(() => {
        throw new Error('DB Error');
      });
      
      const result = await getClubs();
      expect(result).toEqual([]);
    });
  });
});
```

## Coverage Goals

**Recommended Targets:**
- Statements: 70%+
- Branches: 60%+
- Functions: 70%+
- Lines: 70%+

**Critical Must-Cover:**
- `src/lib/permissions.ts` - 100% (permission logic is security-critical)
- `src/app/actions/queries.ts` - 80%+ (data retrieval)
- `src/app/actions/mutations.ts` - 80%+ (data modification)

**View Coverage:**
```bash
npm run test:coverage
# Generates coverage/ directory with HTML report
open coverage/index.html
```

## Testing Best Practices for This Codebase

1. **Test Permission Logic Thoroughly:** Permission system uses bitmasks - exhaustive testing essential

2. **Mock Database for Unit Tests:** Avoid hitting real DB in tests; use Drizzle ORM mocks

3. **Test Error Paths:** All Server Actions have try-catch; verify error handling returns expected defaults

4. **Component Isolation:** Test components in isolation; use Testing Library queries to test behavior not implementation

5. **Keep Tests Simple:** Given no existing test pattern, establish clear examples for future contributors

6. **Test Data Consistency:** Verify mutations reflect in queries (using in-memory or test DB)

---

*Testing analysis: 2026-05-21*

## CRITICAL GAP: Testing Not Implemented

**Current State:** Zero test infrastructure
- No test runner, no test files, no testing libraries
- Risk: High - Changes could break critical functionality without detection

**Recommended Action:** 
- High priority Phase 2 task: Implement Vitest + React Testing Library
- Start with permission system (most security-critical)
- Add server action tests next (data integrity)
- Component tests can follow

**Estimated Effort:**
- Setup: 2-3 hours
- Initial test suite (coverage focused areas): 8-12 hours
- Ongoing: ~10% of development time
