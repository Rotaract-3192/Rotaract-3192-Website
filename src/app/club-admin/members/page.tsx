import { getDb } from '@/lib/db';
import { auth } from '@/lib/mockAuth';
import { users, clubs } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { deleteUser } from '@/app/actions/mutations';
import NewClubMemberButton from '@/components/club-admin/NewClubMemberButton';

export const revalidate = 0;

async function getClubContext() {
  const { userId } = await auth();
  const db = getDb();
  const u = await db.query.users.findFirst({ where: eq(users.id, userId) });
  const club = u?.clubId
    ? await db.query.clubs.findFirst({ where: eq(clubs.id, u.clubId) })
    : await db.query.clubs.findFirst();
  return { club, clubId: club?.id ?? null };
}

export default async function ClubMembersPage() {
  const { club, clubId } = await getClubContext();
  const db = getDb();

  const clubMembers = clubId
    ? await db.query.users.findMany({ where: eq(users.clubId, clubId) })
    : [];


  return (
    <div className="space-y-14 pb-24">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.4em] font-sans">Club Members</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white font-display uppercase leading-none">
          Member <span className="text-purple-400">Registry</span>
        </h1>
        <p className="text-white/40 text-sm font-sans">{clubMembers.length} members · {club?.name ?? 'Your Club'}</p>
        <NewClubMemberButton clubId={clubId} />
      </header>

      {/* Members Table */}
      <section className="glass-panel overflow-hidden border border-purple-500/10">
        <div className="px-8 py-6 border-b border-purple-500/10 bg-purple-500/5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-display uppercase">Active <span className="text-purple-400">Members</span></h2>
          <span className="text-[10px] font-bold text-purple-400 bg-purple-500/5 px-4 py-1.5 rounded-full border border-purple-500/10 font-sans">{clubMembers.length} Total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5">
                <th className="py-4 px-8 text-[9px] font-black text-purple-400/60 uppercase tracking-[0.4em] font-sans">Member</th>
                <th className="py-4 px-8 text-[9px] font-black text-purple-400/60 uppercase tracking-[0.4em] font-sans">Role</th>
                <th className="py-4 px-8 text-[9px] font-black text-purple-400/60 uppercase tracking-[0.4em] font-sans">XP</th>
                <th className="py-4 px-8 text-[9px] font-black text-purple-400/60 uppercase tracking-[0.4em] text-right font-sans">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clubMembers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-24 text-center text-xs text-white/20 uppercase tracking-widest font-sans">
                    No members yet — add your first member above
                  </td>
                </tr>
              ) : clubMembers.map((m, i) => (
                <tr key={i} className="hover:bg-white/5 transition-all group border-l-4 border-transparent hover:border-purple-500">
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-4">
                      <img
                        src={m.avatarUrl || `https://ui-avatars.com/api/?name=${m.firstName}+${m.lastName}&background=random`}
                        className="w-10 h-10 rounded-xl object-cover border border-white/10"
                        alt=""
                      />
                      <div>
                        <p className="font-bold text-white uppercase font-display group-hover:text-purple-400 transition-colors">
                          {m.firstName} {m.lastName}
                        </p>
                        <p className="text-[10px] text-white/30 font-sans">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-sans">
                      {(m.role ?? 'member').replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-5 px-8">
                    <span className="text-lg font-bold text-white font-display">{m.points ?? 0}</span>
                  </td>
                  <td className="py-5 px-8 text-right">
                    <form action={deleteUser.bind(null, m.id)}>
                      <button type="submit"
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center ml-auto">
                        <span className="material-symbols-outlined text-sm">person_remove</span>
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
