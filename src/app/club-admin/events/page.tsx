import { getDb } from '@/lib/db';
import { auth } from '@/lib/mockAuth';
import { users, clubs, events } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import ClubEventsManagerClient from './ClubEventsManagerClient';

export const revalidate = 0;

async function getClubContext() {
  const { userId } = await auth();
  if (!userId) {
    return { club: null, clubId: null };
  }
  const db = getDb();
  const u = await db.query.users.findFirst({ where: eq(users.id, userId) });
  const club = u?.clubId
    ? await db.query.clubs.findFirst({ where: eq(clubs.id, u.clubId) })
    : null;
  return { club, clubId: club?.id ?? null };
}

export default async function ClubEventsPage() {
  const { club, clubId } = await getClubContext();
  const db = getDb();

  const clubEvents = clubId
    ? await db.select().from(events).where(eq(events.clubId, clubId)).orderBy(desc(events.eventDate))
    : [];

  const clubList = club ? [club] : [];

  return (
    <div className="space-y-14 pb-24">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.4em] font-sans">Event Management</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white font-display uppercase leading-none">
            Club <span className="text-purple-400">Events</span>
          </h1>
          <p className="text-white/40 text-sm font-sans">{clubEvents.filter(e => e.status !== 'trash').length} events · {club?.name ?? 'Your Club'}</p>
        </div>
      </header>

      {/* Main Manager Client */}
      <ClubEventsManagerClient initialEvents={clubEvents as any} clubs={clubList} />
    </div>
  );
}
