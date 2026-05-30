import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export type AppDb = ReturnType<typeof drizzle<typeof schema>>;

let dbInstance: AppDb | null = null;

export function getDb(): AppDb {
  if (dbInstance) return dbInstance;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      'DATABASE_URL environment variable is not set. ' +
      'Add it to .env.local for development or to your DigitalOcean App Platform environment variables for production.'
    );
  }

  console.log('🔌 Connecting to PostgreSQL via pg connection pool...');

  const pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

  dbInstance = drizzle(pool, { schema });
  return dbInstance;
}
