# Migration Plan: DigitalOcean → Cloudflare

> **Date:** May 21, 2026
> **Current:** Next.js 16.2.3, React 19, PostgreSQL (local + DigitalOcean), Drizzle ORM, Clerk Auth, local filesystem uploads
> **Target:** Cloudflare Pages + D1 + R2 + Clerk

---

## Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [Migration Strategy Decision](#2-migration-strategy-decision)
3. [Estimated Effort & Timeline](#3-estimated-effort--timeline)
4. [Phase 1: Cloudflare Account & Project Setup](#4-phase-1-cloudflare-account--project-setup)
5. [Phase 2: Database Migration — PostgreSQL → D1 (SQLite)](#5-phase-2-database-migration--postgresql--d1-sqlite)
6. [Phase 3: File Storage — Local FS → R2](#6-phase-3-file-storage--local-fs--r2)
7. [Phase 4: Hosting & Deployment — Cloudflare Pages](#7-phase-4-hosting--deployment--cloudflare-pages)
8. [Phase 5: Environment & Auth Configuration](#8-phase-5-environment--auth-configuration)
9. [Phase 6: Testing & Domain Setup](#9-phase-6-testing--domain-setup)
10. [Rollback Plan](#10-rollback-plan)
11. [Appendix: Schema Migration Reference](#11-appendix-schema-migration-reference)

---

## 1. Architecture Overview

### Current Architecture (DigitalOcean)

```
┌──────────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│    Next.js 16 SSR    │────▶│  PostgreSQL (DO)  │     │  Clerk Auth     │
│  (Node.js runtime)   │     │  Drizzle ORM      │     │  (External)     │
│                      │     │  pg-core schema   │     │                 │
│  File uploads:       │     │  postgres driver  │     │                 │
│  public/uploads/     │     └──────────────────┘     └─────────────────┘
└──────────────────────┘
```

### Target Architecture (Cloudflare)

```
┌─────────────────────────────────────────────────────┐
│  Cloudflare Pages (Edge SSR + Static Assets)        │
│  ┌───────────────────────────────────────────────┐  │
│  │  Next.js 16 with @cloudflare/next-on-pages    │  │
│  │  Pages Functions for SSR/API routes           │  │
│  └───────────────────────────────────────────────┘  │
│           │                    │                      │
│           ▼                    ▼                      │
│  ┌────────────────┐  ┌──────────────────┐  ┌────────┐│
│  │  Cloudflare D1  │  │  Cloudflare R2   │  │ Clerk  ││
│  │  (SQLite via    │  │ (S3-compatible   │  │ Auth   ││
│  │   Drizzle/d1)   │  │  file storage)   │  │        ││
│  └────────────────┘  └──────────────────┘  └────────┘│
└─────────────────────────────────────────────────────┘
```

### Key Differences

| Component | Current (DO) | Target (Cloudflare) | Impact |
|-----------|-------------|-------------------|--------|
| **Runtime** | Node.js (full) | Cloudflare Workers (V8 isolates) | No `fs`, `net`, `child_process` |
| **Database** | PostgreSQL | D1 (SQLite) | Schema rewrite, type changes |
| **ORM Driver** | `postgres-js` | `@cloudflare/d1` + Drizzle | New driver package |
| **ORM Dialect** | `drizzle-orm/pg-core` | `drizzle-orm/sqlite-core` | Full schema file rewrite |
| **File Storage** | `public/uploads/` (local FS) | R2 (S3-compatible) | Upload mutations rewrite |
| **Auth** | Clerk (standalone) | Clerk (same) | No change needed |
| **Deployment** | `next build` + DO | `npx @cloudflare/next-on-pages` | New build pipeline |
| **Node Version** | >= 22.12.0 | Workers runtime (Node-ish) | Some APIs unavailable |

---

## 2. Migration Strategy Decision

### Recommended Approach: **Full Cloudflare Native**

| Layer | Service | Why |
|-------|---------|-----|
| **Hosting** | Cloudflare Pages | Native Next.js support via `@cloudflare/next-on-pages`, free tier generous |
| **Database** | Cloudflare D1 | Fully managed, global replication, 10GB free, Drizzle supports it natively |
| **File Storage** | Cloudflare R2 | 10GB free, S3-compatible, no egress fees |
| **Auth** | Clerk (keep) | Already works everywhere, no migration needed |

### Why Not Hybrid (Hyperdrive + External PG)?

Hyperdrive proxies to an external PostgreSQL. That still requires a PG provider (Neon, Supabase, etc.), adds latency, cost, and complexity. Since we're moving *away* from DO, going full native avoids Oracle-style lock-in.

### Key Trade-offs of D1 (SQLite)

| Pro | Con |
|-----|-----|
| Zero-config, auto-scaling | No stored procedures |
| Free tier: 10GB, 5M reads/day | No `FOREIGN KEY` enforcement |
| Global replication | No full-text search built-in |
| Drizzle ORM support | Timestamp handling differs from PG |
| Atomic transactions | `real` → `numeric` conversion needed |

---

## 3. Estimated Effort & Timeline

| Phase | Effort | Risk | Dependencies |
|-------|--------|------|-------------|
| **P1:** Account & Setup | 30 min | Low | None |
| **P2:** Database (schema rewrite + queries) | **4-6 hours** | **High** | P1 done |
| **P3:** File Storage (R2) | 1 hour | Medium | P1 done |
| **P4:** Hosting (Pages config) | 1 hour | Medium | P2, P3 done |
| **P5:** Environment & Auth | 30 min | Low | P4 done |
| **P6:** Testing & Domain | 1 hour | Low | P5 done |
| **Total** | **~8-10 hours** | | |

### Recommended Execution Order

```
P1 ──▶ P2 ──▶ P3 ──▶ P4 ──▶ P5 ──▶ P6
       │              │
       ▼              ▼
   (biggest          (deploy
    risk)             after P2+P3)
```

---

## 4. Phase 1: Cloudflare Account & Project Setup

### 4.1 Prerequisites
- Cloudflare account (cloudflare.com)
- Wrangler CLI installed: `npm install -g wrangler`
- Authenticated: `wrangler login`

### 4.2 Create D1 Database

```bash
# Create the database
wrangler d1 create rotaract-district-3192-db

# Output will give you:
# - database_id: <UUID>
# - database_name: rotaract-district-3192-db
```

### 4.3 Create R2 Bucket

```bash
# Create bucket for file uploads
wrangler r2 bucket create rotaract-uploads
```

### 4.4 Create the Wrangler Config

Create `wrangler.toml` in project root:

```toml
name = "rotaract-district-3192"
pages_build_output_dir = ".vercel/output/static"  # next-on-pages output

compatibility_date = "2026-05-01"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB"
database_name = "rotaract-district-3192-db"
database_id = "<uuid-from-step-2>"

[[r2_buckets]]
binding = "R2"
bucket_name = "rotaract-uploads"
```

### 4.5 Install New Dependencies

```bash
npm uninstall postgres
npm install @cloudflare/next-on-pages @cloudflare/workers-types
npm install drizzle-orm@latest @cloudflare/d1
npm install -D @opennextjs/cloudflare  # for Next.js compatibility
```

### 4.6 Files Created/Modified
| File | Action |
|------|--------|
| `wrangler.toml` | **NEW** — Cloudflare binding configuration |
| `package.json` | **MODIFY** — Remove `postgres`, add cloudflare deps |
| `.env.local` | **MODIFY** — Add Cloudflare env vars |

---

## 5. Phase 2: Database Migration — PostgreSQL → D1 (SQLite)

### 5.1 Overview

This is the **highest risk, most time-consuming phase**. Every table definition in `src/lib/db/schema.ts` must be rewritten from PostgreSQL column types to SQLite-compatible types.

### 5.2 Schema File Rewrite

**Current:** `src/lib/db/schema.ts` — uses `pgTable` from `drizzle-orm/pg-core`
**Target:** `src/lib/db/schema.ts` — uses `sqliteTable` from `drizzle-orm/sqlite-core`

**Type Mapping Reference:**

| PostgreSQL | SQLite (D1) | Notes |
|-----------|-------------|-------|
| `text('name')` | `text('name')` | Same — no change |
| `integer('count')` | `integer('count')` | Same — no change |
| `real('amount')` | `numeric('amount', { precision: 10, scale: 2 })` or `real('amount')` | SQLite `real` is 64-bit float; Drizzle supports `numeric` |
| `boolean('flag')` | `integer('flag', { mode: 'boolean' })` | SQLite has no boolean — use integer 0/1 |
| `timestamp('ts')` | `text('ts')` **or** `integer('ts', { mode: 'timestamp' })` | SQLite has no native timestamp. Use TEXT (ISO string) or INTEGER (unix epoch) |
| `timestamp('ts').defaultNow()` | `text('ts').default(sql\`(datetime('now'))\`)` | Must use SQLite datetime function |
| `.primaryKey()` | `.primaryKey()` | Same |
| `.unique()` | `.unique()` | Same |
| `.notNull()` | `.notNull()` | Same |
| `.default(0)` | `.default(0)` | Same (for integers) |

### 5.3 Schema Rewrite Example

**Before (PostgreSQL):**
```typescript
import { pgTable, text, integer, real, boolean, timestamp } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  eventDate: timestamp('event_date'),
  isSignatureProject: boolean('is_signature_project').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});
```

**After (SQLite / D1):**
```typescript
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const events = sqliteTable('events', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  eventDate: text('event_date'),  // ISO datetime string
  isSignatureProject: integer('is_signature_project', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
});
```

### 5.4 Complete Schema Rewrite Required

All 14 tables need updating. Here's the full mapping:

| Table | PG Types | SQLite Types | Special Handling |
|-------|----------|-------------|-----------------|
| `users` | text, integer, timestamp | text, integer, text | `points` stays integer; `created_at` → text |
| `clubs` | text, timestamp | text, text | No changes needed (all text + timestamps→text) |
| `events` | text, integer, real, boolean, timestamp | text, integer, real, integer(boolean), text | `boolean` → `integer { mode: 'boolean' }` |
| `eventRegistrations` | text, timestamp | text, text | Simple |
| `campaigns` | text, real, timestamp | text, real, text | `real` works in SQLite |
| `courses` | text, integer, timestamp | text, integer, text | Simple |
| `feeds` | text, timestamp | text, text | Simple |
| `jobs` | text, timestamp | text, text | Simple |
| `moms` | text, timestamp | text, text | Simple |
| `newsletters` | text, timestamp | text, text | Simple |
| `announcements` | text, timestamp | text, text | Simple |
| `coldStorageFiles` | text, integer, boolean, timestamp | text, integer, integer(boolean), text | `boolean` → `integer { mode: 'boolean' }` |
| `userAchievements` | text, timestamp | text, text | Simple |
| `mentorshipApplications` | text, timestamp | text, text | Simple |
| `courseModules` | text, integer, timestamp | text, integer, text | `duration` stays integer |
| `serviceHours` | text, real, timestamp | text, real, text | `real` works |
| `auditLogs` | text, timestamp | text, text | Simple |
| `pastLeaders` | text, timestamp | text, text | Simple |
| `pointTransactions` | text, integer, timestamp | text, integer, text | Simple |
| `attendance` | text, timestamp | text, text | Simple |

**Critical:** There is **no direct equivalent** for `defaultNow()` in SQLite. Every `timestamp('field').defaultNow()` must become `text('field').default(sql\`(datetime('now'))\`)`.

### 5.5 Driver & Connection Rewrite

**Current** (`src/lib/db/index.ts`):
```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });
export function getDb() { return db; }
```

**Target** (`src/lib/db/index.ts`):
```typescript
import { drizzle } from 'drizzle-orm/d1';
import type { DrizzleD1Database } from 'drizzle-orm/d1';

let dbInstance: DrizzleD1Database<typeof schema> | null = null;

export function getDb(dbBinding?: D1Database) {
  if (!dbInstance) {
    if (!dbBinding && typeof process !== 'undefined' && process.env.DB) {
      // @ts-expect-error - Cloudflare Pages passes DB binding to functions
      dbInstance = drizzle(process.env.DB as unknown as D1Database, { schema });
    } else if (dbBinding) {
      dbInstance = drizzle(dbBinding, { schema });
    } else {
      throw new Error('D1 database binding not available');
    }
  }
  return dbInstance;
}
```

### 5.6 Query Impact Assessment

Drizzle ORM abstracts most query differences. **No changes needed** in:
- `queries.ts` (65+ server actions) — Drizzle's query builder works the same
- Mutations — `insert()`, `update()`, `delete()` are driver-agnostic

**Exceptions to check:**
- Any raw SQL via `sql\`...\`` template literals — use SQLite syntax
- `count()` aggregate — works the same
- `now()` → `datetime('now')` in any raw queries
- `gen_random_uuid()` → need to generate UUIDs in JS instead

### 5.7 Migration Strategy

There are two approaches:

**Option A: Push (faster, for development)**
```bash
npx drizzle-kit push
```
This creates tables directly from the schema. Good for dev/iteration.

**Option B: Generate + Migrate (safer, for production)**
```bash
npx drizzle-kit generate  # generates SQL migration files
wrangler d1 execute rotaract-district-3192-db --file=./drizzle/migrations/0000_xxx.sql
```

**Recommendation:** Use Option B for production. The generated SQL can be reviewed before execution.

### 5.8 Data Migration

If there is existing data in PostgreSQL that needs to move:

1. Export from PostgreSQL:
```bash
pg_dump --data-only --column-inserts -h localhost -U postgres -d postgres > data_dump.sql
```

2. Transform SQL for D1 compatibility:
   - Remove PostgreSQL-specific syntax (`::type` casts, `SERIAL`, etc.)
   - Convert timestamp formats to ISO 8601 strings
   - Convert boolean values (`true/false` → `1/0`)

3. Import to D1:
```bash
wrangler d1 execute rotaract-district-3192-db --file=./transformed_data.sql
```

### 5.9 Files Modified in Phase 2

| File | Action | Risk |
|------|--------|------|
| `src/lib/db/schema.ts` | **REWRITE** — 14 tables, all column types | **High** |
| `src/lib/db/index.ts` | **REWRITE** — postgres-js → D1 driver | Medium |
| `drizzle.config.ts` | **MODIFY** — dialect to `sqlite`, schema output | Low |
| `src/app/actions/*.ts` | **INSPECT** — check for raw SQL or PG-specific usage | Low |

---

## 6. Phase 3: File Storage — Local FS → R2

### 6.1 Current Problem

File uploads use:
```typescript
const { writeFile, mkdir } = await import('fs/promises');
const uploadDir = join(process.cwd(), 'public', 'uploads');
await mkdir(uploadDir, { recursive: true });
await writeFile(filepath, buffer);
imageUrl = `/uploads/${filename}`;
```

This **will not work** on Cloudflare Workers (no filesystem).

### 6.2 Solution: Cloudflare R2

All file upload operations must be rewritten to use the S3 API.

### 6.3 Install R2 Dependencies

```bash
npm install @aws-sdk/s3-request-presigner @aws-sdk/client-s3
```

### 6.4 Create R2 Client Helper

Create `src/lib/r2.ts`:

```typescript
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const R2_ENDPOINT = `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

const s3 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = 'rotaract-uploads';

export async function uploadFile(key: string, body: Buffer | Uint8Array, contentType: string) {
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  }));
  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

export async function deleteFile(key: string) {
  await s3.send(new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key,
  }));
}

export async function getSignedFileUrl(key: string, expiresIn = 3600) {
  return await getSignedUrl(s3, new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  }), { expiresIn });
}
```

### 6.5 Rewrite Upload Mutations in mutations.ts

Every place that uses `fs/promises` to write files must be rewritten to use R2:

**Current pattern** (in mutations.ts):
```typescript
const { writeFile, mkdir } = await import('fs/promises');
// ... write to public/uploads/
```

**Target pattern**:
```typescript
import { uploadFile } from '@/lib/r2';
const fileUrl = await uploadFile(`events/${Date.now()}-${fileName}`, buffer, mimeType);
```

### 6.6 Files Modified in Phase 3

| File | Action |
|------|--------|
| `src/lib/r2.ts` | **NEW** — R2 client helper |
| `src/app/actions/mutations.ts` | **MODIFY** — All file upload paths |
| `src/app/actions/queries.ts` | **INSPECT** — May reference local file paths |

---

## 7. Phase 4: Hosting & Deployment — Cloudflare Pages

### 7.1 Build Configuration

The standard Next.js build (`next build`) produces a Node.js server bundle. For Cloudflare Pages, we need `@cloudflare/next-on-pages`:

Update `package.json` scripts:

```json
{
  "scripts": {
    "pages:build": "npx @cloudflare/next-on-pages",
    "pages:dev": "npx wrangler pages dev",
    "pages:deploy": "npx wrangler pages deploy",
    "deploy": "npm run pages:build && npm run pages:deploy"
  }
}
```

### 7.2 Next.js Config Adjustment

Add to `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  // ... existing config ...
  
  // Required for Cloudflare Pages compatibility
  output: 'export',  // static export needed, or use @cloudflare/next-on-pages
  
  // If using @cloudflare/next-on-pages:
  experimental: {
    // next-on-pages specific config
  }
};
```

**Important:** Next.js 16 + Cloudflare Pages has compatibility constraints:
- Middleware → rewrite as Pages Functions
- `cookies()`, `headers()` — available in Pages Functions
- `Image Optimization` — needs Cloudflare Image Resizing or disable
- `ISR` (Incremental Static Regeneration) — needs careful config

### 7.3 Routing & Functions

Cloudflare Pages Functions replace Next.js API routes and middleware:

- Each `api/` route becomes a Pages Function at `/functions/api/[[path]].ts`
- `@cloudflare/next-on-pages` handles this automatically in most cases

### 7.4 Environment Variables

Set these in Cloudflare Pages Dashboard → Settings → Environment Variables:

| Variable | Source | Notes |
|----------|--------|-------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk | Same as now |
| `CLERK_SECRET_KEY` | Clerk | Same as now |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Config | Same |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Config | Same |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Config | Same |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Config | Same |
| `R2_ACCOUNT_ID` | Cloudflare R2 | From R2 dashboard |
| `R2_ACCESS_KEY_ID` | Cloudflare R2 | Generated R2 token |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2 | Generated R2 token |
| `R2_PUBLIC_URL` | Config | Public R2 domain or custom domain |

**Do NOT add `DATABASE_URL`** — D1 is accessed via the `DB` binding, not a connection string.

### 7.5 Files Modified in Phase 4

| File | Action |
|------|--------|
| `package.json` | **MODIFY** — Add pages build/deploy scripts |
| `next.config.ts` | **MODIFY** — Add cloudflare compatibility |
| `wrangler.toml` | **VERIFY** — Bindings correct |

---

## 8. Phase 5: Environment & Auth Configuration

### 8.1 Authentication (Clerk)

Clerk works on Cloudflare Pages without changes. However:
- Webhook handlers need Pages Functions
- Make sure `CLERK_SECRET_KEY` is set in Cloudflare environment variables
- Clerk's webhook endpoints need to be configured for the new domain

### 8.2 D1 Binding in Pages Functions

For Pages Functions to access D1, the binding must be in `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "rotaract-district-3192-db"
database_id = "<uuid>"
```

### 8.3 Local Development

Use Wrangler for local dev with D1:

```bash
wrangler pages dev -- npm run dev
```

Or for full local simulation:
```bash
npx @cloudflare/next-on-pages
npx wrangler pages dev .vercel/output/static
```

---

## 9. Phase 6: Testing & Domain Setup

### 9.1 Test Checklist

- [ ] Local build with `npx @cloudflare/next-on-pages` succeeds
- [ ] Pages dev server runs locally
- [ ] All 43 routes load
- [ ] Database reads work (queries return data)
- [ ] Database writes work (mutations persist)
- [ ] File uploads go to R2 (not local filesystem)
- [ ] Clerk authentication works (sign-in/sign-up)
- [ ] Admin routes protected properly
- [ ] All 3 critical security fixes verified
- [ ] Error boundaries render correctly

### 9.2 Domain Setup

1. Go to Cloudflare Dashboard → Pages → Your Project → Custom Domain
2. Add domain (e.g., `rotaract3192.org`)
3. Cloudflare automatically provisions SSL

### 9.3 Go Live Checklist

- [ ] Preview deployment (`*.pages.dev`) fully tested
- [ ] Production domain DNS configured
- [ ] SSL certificate active
- [ ] Database migrations applied to production D1
- [ ] R2 bucket with public access configured
- [ ] Clerk webhook URLs updated to production domain
- [ ] Environment variables set in production
- [ ] Load test basic pages

---

## 10. Rollback Plan

### If something breaks during migration:

1. **Keep the existing DigitalOcean deployment running** during the entire migration
2. Use the preview domain (`*.pages.dev`) for testing — don't switch DNS until verified
3. If critical:
   - `git revert` the schema/driver changes
   - Redeploy to DigitalOcean (current `next build` still works)
   - Switch DNS back

### Data Safety:
- D1 is **not a drop-in replacement** for PostgreSQL
- Keep a PostgreSQL backup until the D1 migration is stable for 2+ weeks
- Run both databases in parallel during testing

---

## 11. Appendix: Schema Migration Reference

### Full Type Mapping Table

```typescript
// drizzle-orm/pg-core (CURRENT)
import { pgTable, text, integer, real, boolean, timestamp } from 'drizzle-orm/pg-core';

// drizzle-orm/sqlite-core (TARGET)
import { sqliteTable, text, integer, real, numeric } from 'drizzle-orm/sqlite-core';
```

| pg-core Import | sqlite-core Import | Notes |
|---------------|-------------------|-------|
| `pgTable` | `sqliteTable` | Main table builder |
| `text` | `text` | Identical |
| `integer` | `integer` | Identical |
| `real` | `real` | Both 64-bit float |
| `boolean` | — | Use `integer('col', { mode: 'boolean' })` |
| `timestamp` | — | Use `text('col')` with ISO 8601 string |
| — | `numeric` | Optional, if you need exact precision |
| `defaultNow()` | `default(sql\`(datetime('now'))\`)` | SQLite has no native `now()` |

### Example: Full Table Migration

**Current** (16 lines, PostgreSQL):
```typescript
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  role: text('role').default('member'),
  permissionBits: integer('permission_bits').default(0),
  clubId: text('club_id'),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  points: integer('points').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
```

**Target** (16 lines, SQLite/D1):
```typescript
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  role: text('role').default('member'),
  permissionBits: integer('permission_bits').default(0),
  clubId: text('club_id'),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  points: integer('points').default(0),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').default(sql`(datetime('now'))`),
});
```

---

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Schema rewrite introduces bugs | **High** | Review generated SQL before applying; run existing test suite after migration |
| Missing PG-specific feature in D1 | Medium | Inventory all queries for PG-specific SQL (dates, casts, functions) |
| `next-on-pages` compatibility gaps | Medium | Check compatibility matrix before starting; have fallback |
| R2 upload URLs broken in templates | Medium | Search all templates for `/uploads/` URL references and update |
| Data loss during migration | **High** | Keep PostgreSQL backup for 2+ weeks; run D1 as read-only first |
| Build fails on Cloudflare | Medium | Iterate on preview deployment before production DNS switch |

---

## Quick Start Commands

```bash
# 1. Login
wrangler login

# 2. Create database
wrangler d1 create rotaract-district-3192-db

# 3. Create R2 bucket
wrangler r2 bucket create rotaract-uploads

# 4. Install deps
npm uninstall postgres
npm install @cloudflare/next-on-pages drizzle-orm@latest
npm install -D @cloudflare/workers-types

# 5. Rewrite schema (Phase 2)
#    Edit: src/lib/db/schema.ts
#    Edit: src/lib/db/index.ts
#    Edit: drizzle.config.ts

# 6. Generate and apply migrations
npx drizzle-kit generate
wrangler d1 execute rotaract-district-3192-db --file=./drizzle/migrations/0000_xxx.sql

# 7. Build for Pages
npx @cloudflare/next-on-pages

# 8. Preview locally
npx wrangler pages dev .vercel/output/static

# 9. Deploy
npx wrangler pages deploy
```
