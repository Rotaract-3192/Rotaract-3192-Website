import { cookies } from 'next/headers';
import { getDb } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

// Server-side mock auth resolving from cookies for interactive local dev testing
export async function auth() {
  let userId: string | null = null;
  try {
    const cookieStore = await cookies();
    userId = cookieStore.get('mock_user_id')?.value || null;
  } catch (e) {
    // cookies() can throw in some static generation contexts
  }

  if (userId) {
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
  }

  // Fallback defaults (Unauthenticated / Guest)
  return {
    userId: null,
    permissionBits: 0,
    sessionClaims: null,
    protect: async () => {},
    redirectToSignIn: () => {}
  };
}

export async function currentUser() {
  let userId: string | null = null;
  try {
    const cookieStore = await cookies();
    userId = cookieStore.get('mock_user_id')?.value || null;
  } catch (e) {}

  if (userId) {
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
  }

  return null;
}
