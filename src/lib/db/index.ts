import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

let dbInstance: any = null;

export function getDb(dbBinding?: any) {
  if (dbInstance) return dbInstance;

  // Resolve D1 database binding (production/Cloudflare Pages runtime)
  const binding = dbBinding || (typeof process !== 'undefined' ? (process.env as any).DB : undefined);

  if (binding) {
    dbInstance = drizzle(binding, { schema });
    return dbInstance;
  }

  // Local Next.js development: always connect to Cloudflare D1 via HTTP API
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const databaseId = process.env.CLOUDFLARE_DATABASE_ID || "72db2940-7b3d-4121-b656-5c56df5c3f7e";
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      throw new Error(
        '\n\n❌ Cloudflare D1 credentials are missing!\n' +
        'Add the following to your .env.local file:\n\n' +
        '  CLOUDFLARE_ACCOUNT_ID=your_account_id\n' +
        '  CLOUDFLARE_API_TOKEN=your_api_token_with_d1_edit_permissions\n' +
        '  CLOUDFLARE_DATABASE_ID=72db2940-7b3d-4121-b656-5c56df5c3f7e  (optional, already set as default)\n\n' +
        'Find your Account ID at: https://dash.cloudflare.com/\n' +
        'Create an API token at: https://dash.cloudflare.com/profile/api-tokens\n' +
        '(Use the "D1 Edit" permission template)\n'
      );
    }

    // Helper to get native Node.js require without triggering Edge compilation static analysis errors
    const getNativeRequire = () => {
      if (typeof globalThis !== 'undefined' && (globalThis as any)['eval']) {
        try {
          return (globalThis as any)['eval']('require');
        } catch {
          return null;
        }
      }
      return null;
    };

    const req = getNativeRequire();

    if (req) {
      console.log('🔌 Connecting to Cloudflare D1 database via HTTP API...');
      try {
        const { drizzle: drizzleProxy } = req('drizzle-orm/sqlite-proxy');
        dbInstance = drizzleProxy(async (sql: string, params: any[], method: string) => {
          try {
            const response = await fetch(
              `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/raw`,
              {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${apiToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sql, params }),
              }
            );

            if (!response.ok) {
              const errText = await response.text();
              throw new Error(`D1 HTTP Error ${response.status}: ${errText}`);
            }

            const data = await response.json() as any;
            if (!data.success) {
              throw new Error(`D1 query failed: ${JSON.stringify(data.errors)}`);
            }

            const result = data.result?.[0];
            const rawRows = result?.rows || [];

            if (method === 'get') {
              return { rows: rawRows[0] || null };
            }
            return { rows: rawRows };
          } catch (error) {
            console.error('Cloudflare D1 HTTP Query failed:', error);
            return { rows: [] };
          }
        }, { schema });
        return dbInstance;
      } catch (e) {
        console.error('Failed to initialize Drizzle sqlite-proxy for D1 HTTP connection:', e);
      }
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
