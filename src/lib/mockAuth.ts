import { cookies } from 'next/headers';
import { getDb } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

// Server-side mock auth resolving from cookies for interactive local dev testing
export async function auth() {
  let userId = 'test_admin_user_id';
  try {
    const cookieStore = await cookies();
    userId = cookieStore.get('mock_user_id')?.value || 'test_admin_user_id';
  } catch (e) {
    // cookies() can throw in some static generation contexts
  }

  try {
    const db = getDb();
    const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
    if (user) {
      return {
        userId: user.id,
        permissionBits: user.permissionBits || 0,
        sessionClaims: {
          email: user.email,
          metadata: { role: user.role || 'member' }
        },
        protect: async () => {},
        redirectToSignIn: () => {}
      };
    }
  } catch (error) {
    console.error('Mock auth failed to fetch user from DB:', error);
  }

  // Fallback defaults
  return {
    userId: "test_admin_user_id",
    permissionBits: 1, // 01 = Master Admin
    sessionClaims: {
      email: "thejaswinps@gmail.com",
      metadata: { role: "district_admin" }
    },
    protect: async () => {},
    redirectToSignIn: () => {}
  };
}

export async function currentUser() {
  let userId = 'test_admin_user_id';
  try {
    const cookieStore = await cookies();
    userId = cookieStore.get('mock_user_id')?.value || 'test_admin_user_id';
  } catch (e) {}

  try {
    const db = getDb();
    const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
    if (user) {
      return {
        id: user.id,
        firstName: user.firstName || 'Test',
        lastName: user.lastName || 'User',
        permissionBits: user.permissionBits || 0,
        emailAddresses: [{ emailAddress: user.email }],
        imageUrl: user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName || 'User')}`,
        publicMetadata: { role: user.role || 'member' }
      };
    }
  } catch (e) {}

  return {
    id: "test_admin_user_id",
    firstName: "Test",
    lastName: "Admin",
    permissionBits: 1,
    emailAddresses: [{ emailAddress: "thejaswinps@gmail.com" }],
    imageUrl: "https://ui-avatars.com/api/?name=Test+Admin",
    publicMetadata: { role: "district_admin" }
  };
}
