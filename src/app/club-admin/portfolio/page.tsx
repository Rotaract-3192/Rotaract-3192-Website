import { getDb } from '@/lib/db';
import { auth } from '@/lib/mockAuth';
import { users, clubs } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import PortfolioForm from './PortfolioForm';

export const revalidate = 0;

async function getClubContext() {
  const { userId } = await auth();
  if (!userId) return null;
  const db = getDb();
  
  const user = await db.query.users.findFirst({ 
    where: eq(users.id, userId) 
  });
  
  const clubId = user?.clubId ?? null;
  const club = clubId
    ? await db.query.clubs.findFirst({ where: eq(clubs.id, clubId) })
    : await db.query.clubs.findFirst(); // Fallback for development/testing

  return club;
}

export default async function ClubPortfolioPage() {
  const club = await getClubContext();

  if (!club) {
    notFound();
  }

  return <PortfolioForm club={club} />;
}
