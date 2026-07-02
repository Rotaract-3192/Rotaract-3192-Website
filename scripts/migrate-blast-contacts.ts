/**
 * Migration: create blast_contacts table
 * Run with:  npx tsx scripts/migrate-blast-contacts.ts
 */
import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function run() {
  console.log('Running migration: blast_contacts...');
  await sql`
    CREATE TABLE IF NOT EXISTS blast_contacts (
      id          TEXT PRIMARY KEY,
      email       TEXT NOT NULL UNIQUE,
      name        TEXT,
      label       TEXT,
      added_by    TEXT,
      is_active   BOOLEAN NOT NULL DEFAULT TRUE,
      created_at  TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;
  console.log('✓ blast_contacts table ready.');
  await sql.end();
}

run().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
