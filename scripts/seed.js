import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
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

  const seedFilePath = path.resolve(__dirname, '../seed.sql');
  if (!fs.existsSync(seedFilePath)) {
    console.error('seed.sql not found at project root');
    process.exit(1);
  }

  console.log('🔌 Connecting to database for seeding...');
  const sql = postgres(connectionString, { ssl: false, max: 1 });

  try {
    console.log('📖 Reading seed.sql...');
    const seedSql = fs.readFileSync(seedFilePath, 'utf8');

    console.log('🌱 Seeding database...');
    // We execute the SQL commands. Since postgres-js supports multiple statements in unsafe() 
    // when we pass them as a single block of raw SQL:
    await sql.unsafe(seedSql);
    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await sql.end();
  }
}

main();
