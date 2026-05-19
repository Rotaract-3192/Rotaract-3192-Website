import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = connectionString 
  ? postgres(connectionString, { prepare: false })
  : postgres({ prepare: false }); // Fallback if no string, postgres will try local env vars

const db = drizzle(client, { schema });

export function getDb() {
  if (!process.env.DATABASE_URL && process.env.NODE_ENV !== 'development') {
    throw new Error('DATABASE_URL is not set. Please set it in Digital Ocean App Platform settings.');
  }
  return db;
}
