import { getDb } from '@/lib/db';
import { auth } from '@/lib/mockAuth';
import { users, clubs, moms } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { deleteMOM } from '@/app/actions/mutations';
import NewClubMOMButton from '@/components/club-admin/NewClubMOMButton';

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

export default async function ClubMOMPage() {
  const { club, clubId } = await getClubContext();
  const db = getDb();
  const momList = clubId
    ? await db.query.moms.findMany({ where: eq(moms.clubId, clubId) })
    : [];

  return (
    <div className="space-y-14 pb-24">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.4em] font-sans">Minutes Archive</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white font-display uppercase leading-none">
            Meeting <span className="text-purple-400">Minutes</span>
          </h1>
          <p className="text-white/40 text-sm font-sans">{momList.length} records · {club?.name ?? 'Your Club'}</p>
        </div>
        <NewClubMOMButton clubId={clubId} />
      </header>

      {/* MOMs Table */}
      <section className="glass-panel overflow-hidden border border-purple-500/10">
        <div className="px-8 py-6 border-b border-purple-500/10 bg-purple-500/5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-display uppercase">Meeting <span className="text-purple-400">Logs</span></h2>
          <span className="text-[10px] font-bold text-purple-400 bg-purple-500/5 px-4 py-1.5 rounded-full border border-purple-500/10 font-sans">{momList.length} Records</span>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5">
              <th className="py-4 px-8 text-[9px] font-black text-purple-400/60 uppercase tracking-[0.4em] font-sans">Date</th>
              <th className="py-4 px-8 text-[9px] font-black text-purple-400/60 uppercase tracking-[0.4em] font-sans">Title</th>
              <th className="py-4 px-8 text-[9px] font-black text-purple-400/60 uppercase tracking-[0.4em] text-center font-sans">Document</th>
              <th className="py-4 px-8 text-[9px] font-black text-purple-400/60 uppercase tracking-[0.4em] text-right font-sans">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {momList.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-24 text-center text-xs text-white/20 uppercase tracking-widest font-sans">
                  No minutes yet — click "Archive Minutes" to add one
                </td>
              </tr>
            ) : momList.map((mom, i) => (
              <tr key={i} className="hover:bg-white/5 transition-all group border-l-4 border-transparent hover:border-purple-500">
                <td className="py-5 px-8">
                  <span className="text-sm font-bold text-white uppercase font-sans">
                    {new Date(mom.meetingDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </td>
                <td className="py-5 px-8">
                  <span className="font-bold text-white uppercase font-display group-hover:text-purple-400 transition-colors">{mom.title}</span>
                </td>
                <td className="py-5 px-8 text-center">
                  {mom.fileUrl ? (
                    <a href={mom.fileUrl} target="_blank"
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.3em] bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500 hover:text-white transition-all font-sans">
                      <span className="material-symbols-outlined text-sm">cloud_download</span>
                      Download
                    </a>
                  ) : (
                    <span className="text-[9px] text-white/20 uppercase font-sans">N/A</span>
                  )}
                </td>
                <td className="py-5 px-8 text-right">
                  <form action={deleteMOM.bind(null, mom.id)}>
                    <button type="submit"
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center ml-auto">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
