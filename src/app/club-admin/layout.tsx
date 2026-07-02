import { getDb } from '@/lib/db';
import { auth } from '@/lib/mockAuth';
import { users, clubs } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { hasClubPanel, isMasterAdmin } from '@/lib/permissions';
import ClubAdminLayoutClient from './ClubAdminLayoutClient';

export const revalidate = 0;

export default async function ClubAdminLayout({ children }: { children: React.ReactNode }) {
  const { userId, permissionBits } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Require either Master Admin (permissionBits === 1) or Club Panel (permissionBits & 2)
  if (!isMasterAdmin(permissionBits) && !hasClubPanel(permissionBits)) {
    redirect("/dashboard");
  }

  const db = getDb();
  const user = await db.query.users.findFirst({ 
    where: eq(users.id, userId) 
  });
  
  const clubId = user?.clubId ?? null;
  // Non-district admins must be associated with a club to manage it
  if (!isMasterAdmin(permissionBits) && !clubId) {
    redirect("/dashboard");
  }

  const club = clubId
    ? await db.query.clubs.findFirst({ where: eq(clubs.id, clubId) })
    : await db.query.clubs.findFirst(); // Fallback for district admin overview

  return (
    <ClubAdminLayoutClient clubName={club?.name || "Club Portal"}>
      {children}
    </ClubAdminLayoutClient>
  );
}
