import postgres from 'postgres';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function trySupabase(port) {
  console.log(`Trying supabase.aaroha.life:${port}...`);
  const password = process.env.POSTGRES_PASSWORD || 'your-super-secret-and-long-postgres-password';
  const connectionUrl = `postgresql://postgres:${password}@supabase.aaroha.life:${port}/postgres`;
  
  const sql = postgres(connectionUrl, {
    connect_timeout: 5,
  });

  try {
    const dbs = await sql`SELECT datname FROM pg_database WHERE datistemplate = false;`;
    console.log(`  ✅ SUCCESS! Databases found on supabase.aaroha.life:${port}:`);
    dbs.forEach(db => console.log(`   - ${db.datname}`));
    return true;
  } catch (err) {
    console.log(`  ❌ Failed: ${err.message}`);
    return false;
  } finally {
    await sql.end();
  }
}

async function run() {
  await trySupabase(5432);
  await trySupabase(6543);
  await trySupabase(5434);
}

run();
