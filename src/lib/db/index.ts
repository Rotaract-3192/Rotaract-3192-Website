import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export function getDb() {
  // In production (Cloudflare), bindings are on process.env.DB
  let dbBinding = process.env.DB;

  if (!dbBinding) {
    try {
      const ctx = getCloudflareContext();
      dbBinding = (ctx.env as any).DB;
    } catch (e) {
      // ignore
    }
  }
  
  if (dbBinding) {
    return drizzleD1(dbBinding as any, { schema });
  }

  // Local development fallback using better-sqlite3
  if (process.env.NODE_ENV === 'development') {
    // We point to a local sqlite file. 
    // You can also point to .wrangler/state/v3/d1/... if you want to share data with wrangler
    const sqlite = new Database('local.sqlite');
    return drizzleSqlite(sqlite, { schema });
  }

  throw new Error("DB binding is not available and no local fallback found.");
}
