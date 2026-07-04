import postgres from 'postgres';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;

async function main() {
  if (!connectionString) {
    console.error('DATABASE_URL is not set');
    process.exit(1);
  }

  const sql = postgres(connectionString, { ssl: false, max: 1 });
  
  try {
    const rows = await sql`
      SELECT id, title, entry_type as "entryType", status, category 
      FROM events
    `;
    console.log('Events in database:');
    console.log(JSON.stringify(rows, null, 2));
  } catch (err) {
    console.error('Error querying events:', err);
  } finally {
    await sql.end();
  }
}

main();
