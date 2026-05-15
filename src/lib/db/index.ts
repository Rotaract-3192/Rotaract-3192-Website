import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export function getDb() {
  // ── Production: Cloudflare Pages – D1 binding injected at runtime ──────────
  // OpenNext injects bindings into the Cloudflare Context rather than process.env
  let dbBinding = null;
  try {
    const { env } = getCloudflareContext();
    dbBinding = env?.DB;
  } catch (e) {
    // Fallback for non-opennext environments (e.g. local scripts)
    dbBinding = (process.env as any).DB ?? (globalThis as any).__D1_BINDING__;
  }

  if (dbBinding) {
    return drizzleD1(dbBinding as any, { schema });
  }

  // ── Local development: file-based SQLite (no Wrangler needed) ─────────────
  if (process.env.NODE_ENV === 'development') {
    const sqlite = new Database('local.sqlite');
    return drizzleSqlite(sqlite, { schema }) as any;
  }

  // ── Build time (static generation): throw error to trigger graceful fallbacks ──
  // During `next build`, pages with revalidate/dynamic will attempt to call getDb().
  // We throw an error so the try-catch blocks in queries.ts can gracefully return []
  // and allow the build to succeed. Real data loads at runtime.
  console.warn('getDb(): No DB binding found — throwing error for build time fallback.');
  throw new Error('No DB binding found');
}
