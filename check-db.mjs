import postgres from 'postgres';

const dbUrl = 'postgresql://doadmin:AVNS_QLkNNVusxeosHnmNRqV@db-postgresql-blr1-16184-do-user-35542688-0.k.db.ondigitalocean.com:25060/defaultdb?sslmode=require';
const sql = postgres(dbUrl, { prepare: false });

async function checkDatabase() {
  try {
    console.log('Testing database connection...');
    const result = await sql`SELECT 1 as ok`;
    console.log('✓ Connection successful');
    
    // List all tables
    const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`;
    console.log('\nTables in database:');
    tables.forEach(t => console.log('  -', t.table_name));
    
    // Check users table
    try {
      const userCount = await sql`SELECT COUNT(*) as count FROM users`;
      console.log('\nUsers count:', userCount[0].count);
    } catch (e) {
      console.log('\nUsers table error:', e.message);
    }
    
    // Check clubs table
    try {
      const clubCount = await sql`SELECT COUNT(*) as count FROM clubs`;
      console.log('Clubs count:', clubCount[0].count);
    } catch (e) {
      console.log('Clubs table error:', e.message);
    }
    
    await sql.end();
    console.log('\n✓ Database check complete');
  } catch (error) {
    console.error('✗ Database error:', error.message);
    await sql.end();
  }
}

checkDatabase();
