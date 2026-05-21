import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
// Handle template variables that haven't been resolved yet
const isValidUrl = connectionString && 
  connectionString.startsWith('postgresql://') && 
  !connectionString.includes('${');

// Lazy initialization to avoid build-time errors
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getDbInstance() {
  if (!dbInstance) {
    if (!isValidUrl) {
      throw new Error(`DATABASE_URL is not set or invalid. Current value: "${connectionString}". Please set it in your deployment platform settings.`);
    }
    const client = postgres(connectionString!, { prepare: false });
    dbInstance = drizzle(client, { schema });
  }
  return dbInstance;
}

export function getDb() {
  if (process.env.NODE_ENV === 'development' && !isValidUrl) {
    // In development, allow fallback to local env vars
    const client = postgres({ prepare: false });
    return drizzle(client, { schema });
  }
  return getDbInstance();
}
