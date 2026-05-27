import { getDb } from '@/lib/db';
import { auth } from '@/lib/mockAuth';
import { users, clubs } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import ClubAdminLayoutClient from './ClubAdminLayoutClient';

export const revalidate = 0;

export default async function ClubAdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  const db = getDb();
  
  const user = await db.query.users.findFirst({ 
    where: eq(users.id, userId) 
  });
  
  const clubId = user?.clubId ?? null;
  const club = clubId
    ? await db.query.clubs.findFirst({ where: eq(clubs.id, clubId) })
    : await db.query.clubs.findFirst();

  return (
    <ClubAdminLayoutClient clubName={club?.name || "Club Portal"}>
      {children}
    </ClubAdminLayoutClient>
  );
}
