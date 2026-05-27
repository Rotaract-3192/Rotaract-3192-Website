import { createRequire } from 'module';
(globalThis as any).require = createRequire(import.meta.url);

process.env.NODE_ENV = 'development';

import { getDb } from '../../../../../src/lib/db/index';
import { users, pointTransactions } from '../../../../../src/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

async function test() {
  console.log('--- Database Point System Test ---');
  const db = getDb();

  // 1. Fetch current users and points
  const allUsers = await db.select().from(users);
  console.log(`Found ${allUsers.length} users in database.`);
  
  if (allUsers.length === 0) {
    console.log('No users found. Creating a test user...');
    await db.insert(users).values({
      id: 'test_admin_user_id',
      email: 'testadmin@example.com',
      firstName: 'Test',
      lastName: 'Admin',
      role: 'district_admin',
      permissionBits: 1,
      points: 0,
    });
  }

  // Pick a user to test (prefer test_admin_user_id)
  const testUser = await db.query.users.findFirst({
    where: eq(users.id, 'test_admin_user_id')
  }) || allUsers[0];

  console.log(`Selected User for test: ${testUser.firstName} ${testUser.lastName} (${testUser.id})`);
  console.log(`Current Points: ${testUser.points}`);

  // 2. Perform point award simulation (+5 points)
  const pointsAwarded = 5;
  const transactionId = crypto.randomUUID();

  console.log(`Awarding +${pointsAwarded} points...`);
  
  await db.insert(pointTransactions).values({
    id: transactionId,
    userId: testUser.id,
    points: pointsAwarded,
    reason: 'Created Event/Project: Test Verification Event',
    category: 'event_creation',
    eventId: 'test_event_id',
    awardedBy: 'system',
    createdAt: new Date(),
  });

  await db
    .update(users)
    .set({ points: sql`${users.points} + ${pointsAwarded}` })
    .where(eq(users.id, testUser.id));

  // 3. Fetch updated user and check points
  const updatedUser = await db.query.users.findFirst({
    where: eq(users.id, testUser.id)
  });

  console.log(`Updated Points: ${updatedUser?.points}`);
  
  if (updatedUser && updatedUser.points === (testUser.points || 0) + pointsAwarded) {
    console.log('Success: User points updated correctly!');
  } else {
    console.error('Error: User points did not match expected value.');
  }

  // 4. Verify transaction was logged
  const loggedTx = await db.query.pointTransactions.findFirst({
    where: eq(pointTransactions.id, transactionId)
  });

  if (loggedTx) {
    console.log('Success: Point transaction log recorded!');
  } else {
    console.error('Error: Point transaction log was not found.');
  }

  // Clean up test data
  await db.delete(pointTransactions).where(eq(pointTransactions.id, transactionId));
  await db
    .update(users)
    .set({ points: testUser.points })
    .where(eq(users.id, testUser.id));
  
  console.log('Cleaned up test data. Test finished.');
}

test().catch(console.error);
