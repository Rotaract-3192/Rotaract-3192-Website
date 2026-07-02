import postgres from 'postgres';

const url = "postgresql://postgres.your-tenant-id:babe728a8ce40f6a996084f51e06a6a0ee6d6e338c5629f75bef216ec93e9463@db.rotaract3192.org:5432/postgres";

async function run() {
  console.log("Resetting 'public' schema on remote database...");
  const sql = postgres(url, { ssl: false });
  try {
    console.log("Recreating schema public...");
    await sql`DROP SCHEMA IF EXISTS public CASCADE`;
    await sql`CREATE SCHEMA public`;
    await sql`GRANT ALL ON SCHEMA public TO postgres`;
    await sql`GRANT ALL ON SCHEMA public TO public`;
    console.log("✅ Database 'public' schema reset successfully!");
  } catch (err) {
    console.error("❌ Failed to reset schema:", err.message || err);
  } finally {
    await sql.end();
  }
}

run();
