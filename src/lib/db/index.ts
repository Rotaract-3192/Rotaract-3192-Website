import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export type AppDb = ReturnType<typeof drizzle<typeof schema>>;

let dbInstance: AppDb | null = null;
let sqlInstance: ReturnType<typeof postgres> | null = null;

export function getDb(): AppDb {
  if (dbInstance) return dbInstance;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      'DATABASE_URL environment variable is not set. ' +
      'Add it to .env.local for development or to your DigitalOcean App Platform environment variables for production.'
    );
  }

  const isLocalhost = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');
  const isProduction = process.env.NODE_ENV === 'production';
  const isPgBouncer = connectionString.includes(':6543');

  console.log('🔌 Connecting to PostgreSQL via postgres-js...');

  sqlInstance = postgres(connectionString, {
    ssl: (isProduction && !isLocalhost && process.env.DB_DISABLE_SSL !== 'true') ? { rejectUnauthorized: false } : false,
    max: 10,
    idle_timeout: 30,
    connect_timeout: isProduction ? 10 : 2,
    // PgBouncer transaction mode: prepared statements must be disabled
    prepare: !isPgBouncer,
  });

  dbInstance = drizzle(sqlInstance, { schema });
  return dbInstance;
}

// For direct SQL queries when needed (e.g., for raw queries, health checks)
export function getSql() {
  getDb(); // ensure connection is initialized
  return sqlInstance!;
}
