import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
export function getDb() {
  if (process.env.NODE_ENV === 'development') {
    const sqlite = new Database('local.sqlite');
    return drizzleSqlite(sqlite, { schema }) as any;
  }

  // ── Vercel Deployment Fallback ──────────
  // Cloudflare D1 bindings (env.DB) are not supported on Vercel Edge/Node environments natively.
  // We throw an error so the try-catch blocks in queries.ts can gracefully return []
  // preventing the entire UI from crashing on Vercel.
  throw new Error('Database not configured for Vercel. Cloudflare D1 requires Cloudflare Pages.');
}


  // ── Build time (static generation): throw error to trigger graceful fallbacks ──
  // During `next build`, pages with revalidate/dynamic will attempt to call getDb().
  // We throw an error so the try-catch blocks in queries.ts can gracefully return []
  // and allow the build to succeed. Real data loads at runtime.
  console.warn('getDb(): No DB binding found — throwing error for build time fallback.');
  throw new Error('No DB binding found');
}
