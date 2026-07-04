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
    console.log('🧹 Clearing all test and dummy data from the database...');
    
    // Truncate tables with cascade to clear all foreign key relations
    await sql`
      TRUNCATE TABLE 
        announcements, 
        attendance, 
        audit_logs, 
        campaigns, 
        clubs, 
        cold_storage_files, 
        course_modules, 
        courses, 
        event_registrations, 
        events, 
        feeds, 
        jobs, 
        mentorship_applications, 
        moms, 
        newsletters, 
        past_leaders, 
        point_transactions, 
        service_hours, 
        user_achievements, 
        users 
      CASCADE
    `;

    console.log('👤 Pre-seeding Super Admin user (thejaswinps@gmail.com)...');
    await sql`
      INSERT INTO users (id, email, first_name, last_name, role, permission_bits, created_at, updated_at)
      VALUES (
        'super_admin_temp_id',
        'thejaswinps@gmail.com',
        'Super',
        'Admin',
        'district_admin',
        1,
        NOW(),
        NOW()
      )
      ON CONFLICT (email) DO UPDATE SET 
        role = 'district_admin',
        permission_bits = 1
    `;

    console.log('✅ All test data cleared. Super Admin seeded successfully!');
  } catch (error) {
    console.error('❌ Failed to reset database:', error);
  } finally {
    await sql.end();
  }
}

main();
