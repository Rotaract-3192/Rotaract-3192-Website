import postgres from 'postgres';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const connectionString = process.env.DATABASE_URL;

async function main() {
  if (!connectionString) {
    console.error('DATABASE_URL is not set');
    process.exit(1);
  }

  const sql = postgres(connectionString, { ssl: false, max: 1 });

  try {
    console.log('Inserting test admin user...');
    await sql`
      INSERT INTO users (id, email, first_name, last_name, role, permission_bits, created_at, updated_at)
      VALUES (
        'test_admin_user_id',
        'thejaswinps@gmail.com',
        'Test',
        'Admin',
        'district_admin',
        1,
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO NOTHING
    `;

    console.log('Inserting default settings...');
    const settings = [
      { key: 'stats_members_override', value: '2133' },
      { key: 'stats_clubs_override', value: '84' },
      { key: 'stats_projects_override', value: '142' }, // dynamic override default
      { key: 'stats_chartered_clubs_override', value: '12' }, // dynamic override default
      { key: 'resource_link_url', value: 'https://drive.google.com/drive/folders/1BamhCLMTs0RHH0TBTartmTxHqAFRhbE3?usp=sharing' },
      { key: 'resource_video_url', value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { key: 'default_event_ticket_link', value: 'https://rotasphere.rotaract3192.org' },
      { key: 'featured_announcement_id', value: '' },
    ];

    for (const setting of settings) {
      await sql`
        INSERT INTO district_settings (key, value, updated_at)
        VALUES (${setting.key}, ${setting.value}, NOW())
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
      `;
    }

    console.log('✅ Settings and admin user seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding settings failed:', error);
  } finally {
    await sql.end();
  }
}

main();
