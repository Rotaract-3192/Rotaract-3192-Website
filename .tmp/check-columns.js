import postgres from 'postgres';

const url = "postgresql://postgres.your-tenant-id:babe728a8ce40f6a996084f51e06a6a0ee6d6e338c5629f75bef216ec93e9463@db.rotaract3192.org:5432/postgres";

async function run() {
  const sql = postgres(url, { ssl: false });
  try {
    console.log("Checking columns of 'clubs' table...");
    const columns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'clubs';
    `;
    console.log("Existing columns in remote 'clubs' table:");
    console.log(columns);
  } catch (err) {
    console.error("❌ Failed to query columns:", err.message || err);
  } finally {
    await sql.end();
  }
}

run();
