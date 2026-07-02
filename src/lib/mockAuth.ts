import { auth as clerkAuth, currentUser as clerkCurrentUser } from '@clerk/nextjs/server';
import { getDb } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

// Server-side auth resolving from Clerk sessions and mapping to local DB user roles
export async function auth() {
  const { userId, sessionClaims, redirectToSignIn } = await clerkAuth();

  if (userId) {
    try {
      const db = getDb();
      let user = await db.query.users.findFirst({ where: eq(users.id, userId) });
      
      // Auto-upgrade thejaswinps@gmail.com to super admin if they are already in the DB
      if (user && user.email.toLowerCase() === 'thejaswinps@gmail.com' && (user.permissionBits !== 1 || user.role !== 'district_admin')) {
        await db.update(users)
          .set({ permissionBits: 1, role: 'district_admin' })
          .where(eq(users.id, userId));
        user = { ...user, permissionBits: 1, role: 'district_admin' };
      }

      if (user) {
        return {
          userId: user.id,
          permissionBits: user.permissionBits ?? 0,
          sessionClaims: sessionClaims || {
            email: user.email,
            metadata: { role: user.role || 'member' }
          },
          protect: async () => {},
          redirectToSignIn
        };
      } else {
        // Automatically provision user in local DB if they exist in Clerk but not in DB
        const clerkUser = await clerkCurrentUser();
        if (clerkUser) {
          const email = clerkUser.emailAddresses[0]?.emailAddress || '';
          const firstName = clerkUser.firstName || '';
          const lastName = clerkUser.lastName || '';
          const avatarUrl = clerkUser.imageUrl || '';
          
          const isSuperAdmin = email.toLowerCase() === 'thejaswinps@gmail.com';
          const role = isSuperAdmin ? 'district_admin' : 'member';
          const permissionBits = isSuperAdmin ? 1 : 0;
          
          await db.insert(users).values({
            id: userId,
            email,
            firstName,
            lastName,
            role,
            permissionBits,
            avatarUrl,
          });
          
          return {
            userId,
            permissionBits,
            sessionClaims: sessionClaims || {
              email,
              metadata: { role }
            },
            protect: async () => {},
            redirectToSignIn
          };
        }
      }
    } catch (error) {
      console.error('Clerk auth failed to fetch user from DB:', error);
    }
  }

  // Fallback defaults (Unauthenticated / Guest)
  return {
    userId: null,
    permissionBits: 0,
    sessionClaims: null,
    protect: async () => {},
    redirectToSignIn
  };
}

export async function currentUser() {
  const clerkUser = await clerkCurrentUser();
  if (!clerkUser) return null;

  try {
    const db = getDb();
    let user = await db.query.users.findFirst({ where: eq(users.id, clerkUser.id) });
    
    // Auto-upgrade thejaswinps@gmail.com to super admin if they are already in the DB
    if (user && user.email.toLowerCase() === 'thejaswinps@gmail.com' && (user.permissionBits !== 1 || user.role !== 'district_admin')) {
      await db.update(users)
        .set({ permissionBits: 1, role: 'district_admin' })
        .where(eq(users.id, user.id));
      user = { ...user, permissionBits: 1, role: 'district_admin' };
    }

    if (user) {
      return {
        id: user.id,
        firstName: user.firstName || clerkUser.firstName || 'User',
        lastName: user.lastName || clerkUser.lastName || '',
        permissionBits: user.permissionBits ?? 0,
        emailAddresses: [{ emailAddress: user.email }],
        imageUrl: user.avatarUrl || clerkUser.imageUrl,
        publicMetadata: { role: user.role || 'member' }
      };
    }
  } catch (e) {}

  const isSuperAdmin = clerkUser.emailAddresses[0]?.emailAddress?.toLowerCase() === 'thejaswinps@gmail.com';
  return {
    id: clerkUser.id,
    firstName: clerkUser.firstName || 'User',
    lastName: clerkUser.lastName || '',
    permissionBits: isSuperAdmin ? 1 : 0,
    emailAddresses: clerkUser.emailAddresses,
    imageUrl: clerkUser.imageUrl,
    publicMetadata: { role: isSuperAdmin ? 'district_admin' : 'member' }
  };
}

