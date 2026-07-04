import postgres from 'postgres';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;
console.log('Database URL:', connectionString);

async function main() {
  if (!connectionString) {
    console.error('DATABASE_URL is not set in .env.local');
    process.exit(1);
  }

  console.log('Attempting to connect to PostgreSQL...');
  const sql = postgres(connectionString, { ssl: false, max: 1 });
  
  try {
    const [row] = await sql`SELECT NOW()`;
    console.log('✅ Successfully connected to database!');
    console.log('Query result (SELECT NOW()):', row);

    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    console.log('Tables in public schema:');
    if (tables.length === 0) {
      console.log('  (No tables found)');
    } else {
      tables.forEach(t => console.log(`  - ${t.table_name}`));
    }
  } catch (err) {
    console.error('❌ Database connection failed:');
    console.error(err);
  } finally {
    await sql.end();
  }
}

main();
