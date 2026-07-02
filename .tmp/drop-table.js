import postgres from 'postgres';

const url = "postgresql://postgres.your-tenant-id:babe728a8ce40f6a996084f51e06a6a0ee6d6e338c5629f75bef216ec93e9463@db.rotaract3192.org:5432/postgres";

async function run() {
  console.log("Connecting to database to drop conflicting tables...");
  const sql = postgres(url, { ssl: false });
  try {
    console.log("Running: DROP TABLE IF EXISTS clubs CASCADE;");
    await sql`DROP TABLE IF EXISTS clubs CASCADE`;
    console.log("✅ Table 'clubs' dropped successfully!");
  } catch (err) {
    console.error("❌ Failed to drop table:", err.message || err);
  } finally {
    await sql.end();
  }
}

run();
