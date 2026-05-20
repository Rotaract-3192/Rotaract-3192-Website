import { getUsers, getClubs } from '@/app/actions/queries';
import { deleteUser } from '@/app/actions/mutations';
import PermissionAssigner from '@/components/PermissionAssigner';
import NewMemberButton from '@/components/admin/NewMemberButton';

export const revalidate = 0;

export default async function AdminMembersPage() {
  const [rawMembers, clubs] = await Promise.all([getUsers(), getClubs()]);

  const members = rawMembers.map((m: any) => ({
    ...m,
    name: `${m.firstName || ''} ${m.lastName || ''}`.trim() || 'District Member',
    profile_pic_url: m.avatarUrl || `https://ui-avatars.com/api/?name=${m.firstName}+${m.lastName}&background=random`,
    club_name: clubs.find((c: any) => c.id === m.clubId)?.name || 'District 3192',
    email: m.email || '',
    role: m.role || 'member',
    points: m.points || 0,
    permissionBits: m.permissionBits ?? 0,
  }));

  const clubOptions = clubs.map((c: any) => ({ id: c.id, name: c.name }));

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Identity Management</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            Member <span className="text-primary">Directory</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {members.length} unique members recognized in the district network.
          </p>
        </div>
        <NewMemberButton clubs={clubOptions} />
      </header>

      {/* Members Table */}
      <section className="glass-panel overflow-hidden relative">
        <div className="px-10 py-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display">Member <span className="text-primary">Registry</span></h2>
            <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.4em] opacity-40 mt-1 font-sans">Manage roles &amp; permissions</p>
          </div>
          <div className="text-[10px] font-bold text-primary bg-primary/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-primary/10 font-sans">{members.length} Members</div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="py-5 px-8 text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Identity</th>
                <th className="py-5 px-8 text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Club</th>
                <th className="py-5 px-8 text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">XP</th>
                <th className="py-5 px-8 text-[10px] font-bold text-primary uppercase tracking-[0.4em] text-right font-sans">Permissions &amp; Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 whitespace-nowrap">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-32 text-center text-xs font-bold uppercase tracking-[0.5em] opacity-20 font-sans">
                    No members in registry
                  </td>
                </tr>
              ) : (
                members.map((member: any, idx: number) => (
                  <tr key={idx} className="hover:bg-white/5 transition-all group/row cursor-default border-l-4 border-transparent hover:border-primary">
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-5">
                        <img src={member.profile_pic_url} className="w-12 h-12 rounded-xl object-cover border border-white/10 grayscale group-hover/row:grayscale-0 transition-all" alt={member.name} />
                        <div>
                          <p className="text-base font-bold text-white font-display uppercase tracking-tight group-hover/row:text-primary transition-colors">{member.name}</p>
                          <p className="text-[10px] text-text-muted opacity-40 tracking-widest font-sans">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <span className="text-[11px] font-bold text-text-muted tracking-[0.2em] uppercase opacity-60 font-sans">{member.club_name}</span>
                    </td>
                    <td className="py-6 px-8">
                      <p className="text-lg font-bold text-white font-display tabular-nums">{member.points.toLocaleString()} <span className="text-[9px] text-primary opacity-40 font-sans">XP</span></p>
                    </td>
                    <td className="py-6 px-8 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <PermissionAssigner
                          userId={member.id}
                          currentBits={member.permissionBits}
                          currentClubId={member.clubId ?? null}
                          clubs={clubOptions}
                        />
                        <form action={deleteUser.bind(null, member.id)}>
                          <button type="submit" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all flex items-center justify-center">
                            <span className="material-symbols-outlined text-base">person_remove</span>
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
