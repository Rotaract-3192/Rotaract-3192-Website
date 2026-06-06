import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const connectionString = process.env.DATABASE_URL;
console.log('Database URL:', connectionString);

if (!connectionString) {
  console.error('DATABASE_URL is not set in .env.local');
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString,
  ssl: false,
});

async function main() {
  try {
    console.log('Attempting to connect to PostgreSQL database...');
    const client = await pool.connect();
    console.log('✅ Successfully connected to database!');
    
    // Check if we can run a simple query
    const res = await client.query('SELECT NOW()');
    console.log('Query result (SELECT NOW()):', res.rows[0]);

    // Check existing tables
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Tables in public schema:');
    if (tablesRes.rows.length === 0) {
      console.log('  (No tables found)');
    } else {
      tablesRes.rows.forEach(row => {
        console.log(`  - ${row.table_name}`);
      });
    }

    client.release();
  } catch (err) {
    console.error('❌ Database connection failed:');
    console.error(err);
  } finally {
    await pool.end();
  }
}

main();
