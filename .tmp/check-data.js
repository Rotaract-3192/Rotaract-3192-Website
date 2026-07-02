import postgres from 'postgres';

const url = "postgresql://postgres.your-tenant-id:babe728a8ce40f6a996084f51e06a6a0ee6d6e338c5629f75bef216ec93e9463@db.rotaract3192.org:5432/postgres";

async function run() {
  const sql = postgres(url, { ssl: false });
  try {
    const tables = ['clubs', 'users', 'events', 'campaigns'];
    for (const table of tables) {
      try {
        const countRes = await sql`SELECT COUNT(*) as count FROM ${sql(table)}`;
        console.log(`Table '${table}': ${countRes[0].count} rows`);
      } catch (err) {
        console.log(`Table '${table}': does not exist or error (${err.message})`);
      }
    }
  } catch (err) {
    console.error("❌ Failed to query database:", err.message || err);
  } finally {
    await sql.end();
  }
}

run();
