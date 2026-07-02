import { getDb } from '@/lib/db';
import { auth } from '@/lib/mockAuth';
import { users, clubs, events, moms, feeds } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export const revalidate = 0;

async function getClubContext() {
  const { userId } = await auth();
  if (!userId) {
    return { user: null, club: null, clubId: null };
  }
  const db = getDb();
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  // Fallback for testing: use first available club
  const clubId = user?.clubId ?? null;
  const club = clubId
    ? await db.query.clubs.findFirst({ where: eq(clubs.id, clubId) })
    : await db.query.clubs.findFirst();
  return { user, club, clubId: club?.id ?? null };
}

export default async function ClubAdminDashboard() {
  const { club, clubId } = await getClubContext();
  const db = getDb();

  const [memberCount, eventCount, momCount, feedCount] = await Promise.all([
    clubId ? db.select().from(users).where(eq(users.clubId, clubId)).then(r => r.length) : Promise.resolve(0),
    clubId ? db.select().from(events).where(and(eq(events.clubId, clubId), eq(events.status, 'upcoming'))).then(r => r.length) : Promise.resolve(0),
    clubId ? db.select().from(moms).where(eq(moms.clubId, clubId)).then(r => r.length) : Promise.resolve(0),
    db.select().from(feeds).then(r => r.length),
  ]);

  const stats = [
    { label: 'Club Members',   value: memberCount, icon: 'group',       color: 'text-blue-400',   bg: 'bg-blue-500/5 border-blue-500/10'   },
    { label: 'Active Events',  value: eventCount,  icon: 'event',       color: 'text-green-400',  bg: 'bg-green-500/5 border-green-500/10' },
    { label: 'Meeting Minutes',value: momCount,    icon: 'description', color: 'text-yellow-400', bg: 'bg-yellow-500/5 border-yellow-500/10' },
    { label: 'News Posts',     value: feedCount,   icon: 'article',     color: 'text-purple-400', bg: 'bg-purple-500/5 border-purple-500/10' },
  ];

  return (
    <div className="space-y-14 pb-24">
      {/* Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.4em] font-sans">Club Command Center</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
          {club?.name ?? 'Your'} <span className="text-purple-400">Portal</span>
        </h1>
        <p className="text-text-muted text-sm opacity-60 flex items-center gap-3 font-sans">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          Manage your club's content, members, and activities.
        </p>
      </header>

      {/* Club Info Banner */}
      {club && (
        <section className="glass-panel p-8 border border-purple-500/10 flex flex-wrap gap-8">
          <div className="flex items-center gap-6 flex-1 min-w-64">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-400 text-3xl">shield_person</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white font-display uppercase tracking-tight">{club.name}</p>
              <p className="text-[10px] text-purple-400/60 font-bold uppercase tracking-[0.3em] font-sans mt-1">
                {club.city && `${club.city} · `}{club.zone && `Zone ${club.zone}`}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 items-center">
            {club.presidentName && (
              <div>
                <p className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-sans">President</p>
                <p className="text-sm font-bold text-white uppercase">{club.presidentName}</p>
              </div>
            )}
            {club.meetingDayTime && (
              <div>
                <p className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-sans">Meeting</p>
                <p className="text-sm font-bold text-white uppercase">{club.meetingDayTime}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`glass-panel p-8 border ${s.bg} flex flex-col gap-4`}>
            <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center`}>
              <span className={`material-symbols-outlined ${s.color} text-2xl`}>{s.icon}</span>
            </div>
            <div>
              <p className={`text-4xl font-black font-display ${s.color}`}>{s.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mt-1 font-sans">{s.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="glass-panel p-10 border border-purple-500/10">
        <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-white mb-8">
          Quick <span className="text-purple-400">Actions</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: '/club-admin/events',  icon: 'add_circle',  label: 'New Event',    color: 'text-green-400'  },
            { href: '/club-admin/news',    icon: 'edit_note',   label: 'Write Post',   color: 'text-blue-400'   },
            { href: '/club-admin/mom',     icon: 'note_add',    label: 'Add Minutes',  color: 'text-yellow-400' },
            { href: '/club-admin/members', icon: 'person_add',  label: 'Add Member',   color: 'text-purple-400' },
          ].map(a => (
            <a key={a.href} href={a.href}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 hover:bg-purple-500/5 transition-all group">
              <span className={`material-symbols-outlined text-3xl ${a.color} group-hover:scale-110 transition-transform`}>{a.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white/70 transition-colors font-sans">{a.label}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
