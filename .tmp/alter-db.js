import postgres from 'postgres';

const url = "postgresql://postgres.your-tenant-id:babe728a8ce40f6a996084f51e06a6a0ee6d6e338c5629f75bef216ec93e9463@db.rotaract3192.org:5432/postgres";

async function run() {
  console.log("Connecting to database to perform schema update...");
  const sql = postgres(url, { ssl: false });
  try {
    console.log("Running: ALTER TABLE clubs ADD COLUMN IF NOT EXISTS description text;");
    await sql`ALTER TABLE clubs ADD COLUMN IF NOT EXISTS description text`;
    console.log("✅ Column 'description' added successfully (or already exists)!");
  } catch (err) {
    console.error("❌ Failed to alter table:", err.message || err);
  } finally {
    await sql.end();
  }
}

run();
