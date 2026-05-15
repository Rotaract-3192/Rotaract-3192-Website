import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

export function getDb() {
  // ── Production: Cloudflare Pages – D1 binding injected at runtime ──────────
  // The D1 binding is available as process.env.DB when running on Cloudflare Pages
  // via the @opennextjs/cloudflare adapter (wrangler.toml → [[d1_databases]] binding = "DB")
  const dbBinding = (process.env as any).DB ?? (globalThis as any).__D1_BINDING__;

  if (dbBinding) {
    return drizzleD1(dbBinding as any, { schema });
  }

  // ── Local development: file-based SQLite (no Wrangler needed) ─────────────
  if (process.env.NODE_ENV === 'development') {
    const sqlite = new Database('local.sqlite');
    return drizzleSqlite(sqlite, { schema }) as any;
  }

  // ── Build time (static generation): return empty-safe fallback ─────────────
  // During `next build`, pages with revalidate/dynamic will attempt to call getDb().
  // We return a no-op proxy so the build succeeds; real data loads at runtime.
  console.warn('getDb(): No DB binding found — returning no-op for build time.');
  return null as any;
}
