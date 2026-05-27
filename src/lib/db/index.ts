import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

let dbInstance: any = null;

export function getDb(dbBinding?: any) {
  if (dbInstance) return dbInstance;

  // Resolve D1 database binding
  const binding = dbBinding || (typeof process !== 'undefined' ? (process.env as any).DB : undefined);

  if (binding) {
    dbInstance = drizzle(binding, { schema });
    return dbInstance;
  }

  // Check if we are running in local Next.js development (Node.js runtime)
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('🔌 Connecting to local SQLite database (local.sqlite) for development...');
    try {
      // Use eval('require') to prevent Webpack/Turbopack/esbuild from bundling better-sqlite3 into the Worker environment
      const Database = eval('require')('better-sqlite3');
      const { drizzle: drizzleBetterSqlite3 } = eval('require')('drizzle-orm/better-sqlite3');
      const client = new Database('local.sqlite');
      dbInstance = drizzleBetterSqlite3(client, { schema });
      return dbInstance;
    } catch (e) {
      console.error('Failed to load better-sqlite3 for local development:', e);
    }
  }

  // Fallback mock database instance for Next.js build-time static page pre-rendering
  if (typeof process !== 'undefined' && process.env.NEXT_PHASE === 'phase-production-build') {
    console.warn('⚠️ D1 database binding not found during build. Using a mock fallback database.');
    
    const createMockChain = (targetVal: any = []): any => {
      const chain: any = () => chain;
      chain.then = (resolve: any) => resolve(targetVal);
      return new Proxy(chain, {
        get(target, prop) {
          if (prop === 'then') {
            return (resolve: any) => resolve(targetVal);
          }
          if (prop === 'query') {
            return new Proxy({}, {
              get() {
                return {
                  findMany: async () => [],
                  findFirst: async () => null,
                };
              }
            });
          }
          return () => createMockChain(targetVal);
        }
      });
    };

    return createMockChain([]);
  }

  throw new Error('D1 database binding not available. Ensure process.env.DB is bound.');
}
