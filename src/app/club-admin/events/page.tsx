import { getDb } from '@/lib/db';
import { auth } from '@/lib/mockAuth';
import { users, clubs, events } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { deleteEvent } from '@/app/actions/mutations';
import NewClubEventButton from '@/components/club-admin/NewClubEventButton';

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
    : await db.query.clubs.findFirst();
  return { club, clubId: club?.id ?? null };
}

export default async function ClubEventsPage() {
  const { club, clubId } = await getClubContext();
  const db = getDb();

  const clubEvents = clubId
    ? await db.query.events.findMany({ where: eq(events.clubId, clubId) })
    : [];

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
          <p className="text-white/40 text-sm font-sans">{clubEvents.length} events · {club?.name ?? 'Your Club'}</p>
        </div>
        <NewClubEventButton clubId={clubId} />
      </header>

      {/* Events List */}
      <section className="glass-panel overflow-hidden border border-purple-500/10">
        <div className="px-8 py-6 border-b border-purple-500/10 bg-purple-500/5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-display uppercase">All <span className="text-purple-400">Events</span></h2>
          <span className="text-[10px] font-bold text-purple-400 bg-purple-500/5 px-4 py-1.5 rounded-full border border-purple-500/10 font-sans">{clubEvents.length} Events</span>
        </div>
        <div className="divide-y divide-white/5">
          {clubEvents.length === 0 ? (
            <div className="py-24 text-center text-xs text-white/20 uppercase tracking-widest font-sans">
              No events yet — click "New Event" to create one
            </div>
          ) : clubEvents.map((ev, i) => (
            <div key={i} className="flex items-center justify-between px-8 py-6 hover:bg-white/5 transition-all group border-l-4 border-transparent hover:border-purple-500">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-purple-400">event</span>
                </div>
                <div>
                  <p className="font-bold text-white uppercase font-display group-hover:text-purple-400 transition-colors">{ev.title}</p>
                  <p className="text-[10px] text-white/30 font-sans mt-1">
                    {ev.eventDate
                      ? new Date(ev.eventDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                      : 'Date TBD'}
                    {ev.location && ` · ${ev.location}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border font-sans ${
                  ev.status === 'upcoming'  ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                  ev.status === 'completed' ? 'bg-white/5 text-white/30 border-white/10' :
                  'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                }`}>{ev.status}</span>
                <form action={deleteEvent.bind(null, ev.id)}>
                  <button type="submit"
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
