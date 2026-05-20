import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../src/lib/db/schema';

dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not set in .env.local');
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

async function testConnection() {
  try {
    console.log('Verifying table schemas in DB...');
    
    // Check if tables can be queried
    const clubsCount = await db.select().from(schema.clubs);
    console.log(`- clubs: ${clubsCount.length} records`);

    const usersCount = await db.select().from(schema.users);
    console.log(`- users: ${usersCount.length} records`);

    const eventsCount = await db.select().from(schema.events);
    console.log(`- events: ${eventsCount.length} records`);

    const leadersCount = await db.select().from(schema.pastLeaders);
    console.log(`- pastLeaders: ${leadersCount.length} records`);

    console.log('All checked tables are initialized and queried successfully!');
  } catch (error: any) {
    console.error('Error querying tables:', error.message || error);
  } finally {
    await client.end();
  }
}

testConnection();
