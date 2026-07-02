import postgres from 'postgres';

const urls = [
  {
    label: "Direct - PW: babe728...",
    url: "postgresql://postgres:babe728a8ce40f6a996084f51e06a6a0ee6d6e338c5629f75bef216ec93e9463@db.rotaract3192.org:5432/postgres"
  },
  {
    label: "Direct - PW: 66780...",
    url: "postgresql://postgres:66780d40a75f4778527ad23d83155cc60d0c4216e4adf6df78934b46c40a1f27@db.rotaract3192.org:5432/postgres"
  }
];

async function test(url, label) {
  console.log(`Testing ${label}...`);
  const sql = postgres(url, { ssl: false, connect_timeout: 5 });
  try {
    const res = await sql`SELECT 1 as success`;
    console.log(`✅ ${label} SUCCEEDED!`, res);
    return true;
  } catch (err) {
    console.log(`❌ ${label} FAILED:`, err.message || err);
    return false;
  } finally {
    await sql.end();
  }
}

async function run() {
  for (const item of urls) {
    await test(item.url, item.label);
  }
}

run();
