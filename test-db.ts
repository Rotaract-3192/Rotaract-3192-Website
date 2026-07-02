import postgres from 'postgres';

const tenants = [
  'default',
  'default-project',
  'supabase',
  'postgres',
  'rotaract3192',
  'rotaract',
  'external',
  'project',
  'supabase-demo',
  'supabase_project',
  'supabase-project',
  'aaroha',
  'aaroha-life'
];

const configs = [
  {
    label: "Port 5432, Tenant: your-tenant-id",
    url: "postgresql://postgres.your-tenant-id:babe728a8ce40f6a996084f51e06a6a0ee6d6e338c5629f75bef216ec93e9463@db.rotaract3192.org:5432/postgres"
  },
  {
    label: "Port 6543, Tenant: your-tenant-id",
    url: "postgresql://postgres.your-tenant-id:babe728a8ce40f6a996084f51e06a6a0ee6d6e338c5629f75bef216ec93e9463@db.rotaract3192.org:6543/postgres"
  }
];

async function testConnection(connectionString: string, sslOption: any, label: string) {
  console.log(`\nTesting connection using: ${label}...`);
  const sql = postgres(connectionString, {
    ssl: sslOption,
    connect_timeout: 5,
  });

  try {
    const result = await sql`SELECT 1 as success`;
    console.log(`✅ Success for ${label}:`, result);
    return true;
  } catch (err: any) {
    console.error(`❌ Failed for ${label}:`, err.message || err);
    return false;
  } finally {
    await sql.end();
  }
}

async function run() {
  for (const config of configs) {
    await testConnection(config.url, (config as any).ssl, config.label);
  }
}

run();
