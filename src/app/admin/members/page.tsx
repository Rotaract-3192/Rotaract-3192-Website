import { getUsers, getClubs } from '@/app/actions/queries';
import { deleteUser, createMember } from '@/app/actions/mutations';

export const revalidate = 0;

export default async function AdminMembersPage() {
  const [rawMembers, clubs] = await Promise.all([
    getUsers(),
    getClubs()
  ]);

  const members = rawMembers.map((m: any) => ({
    ...m,
    name: `${m.firstName || ''} ${m.lastName || ''}`.trim() || 'District Member',
    profile_pic_url: m.avatarUrl || `https://ui-avatars.com/api/?name=${m.firstName}+${m.lastName}&background=random`,
    club_name: clubs.find((c: any) => c.id === m.clubId)?.name || m.clubId || 'District 3192',
    email: m.email || '',
    role: m.role || 'member',
    points: m.points || 0,
  }));

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tight leading-none text-on-surface">Node Directory</h1>
          <p className="text-xs text-on-surface-variant font-medium opacity-60 italic">{members.length} Unique Identifiers Recognized</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/40 group-focus-within:text-primary transition-colors">search</span>
            <input type="text" placeholder="Identify Node..." className="bg-surface-container-low border border-outline/10 rounded-xl py-3 pl-12 pr-6 text-xs font-bold text-on-surface focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all w-64" />
          </div>
          <button className="bg-white text-on-surface border border-outline/10 font-bold text-xs px-6 py-3 rounded-xl shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filters
          </button>
        </div>
      </header>

      {/* Add Member Form */}
      <section className="bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white p-10 shadow-2xl shadow-primary/5">
        <div className="flex items-center gap-4 mb-10">
           <div className="w-12 h-12 rounded-[1.25rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <span className="material-symbols-outlined text-2xl">person_add</span>
           </div>
           <div>
              <h2 className="text-xl font-black uppercase tracking-tight leading-none text-on-surface">Initialize New Node</h2>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest opacity-40 mt-1.5 italic">Manual Member Registration Protocol</p>
           </div>
        </div>

        <form action={createMember} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-2 opacity-60">Authentication Identifier (Email)</label>
            <input 
              name="email" 
              type="email" 
              placeholder="node@district3192.org" 
              required
              className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20"
            />
          </div>
          <div className="space-y-2.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-2 opacity-60">Primary Label (First Name)</label>
            <input 
              name="firstName" 
              type="text" 
              placeholder="Enter first name..." 
              required
              className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20"
            />
          </div>
          <div className="space-y-2.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-2 opacity-60">Secondary Label (Last Name)</label>
            <input 
              name="lastName" 
              type="text" 
              placeholder="Enter last name..." 
              className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20"
            />
          </div>
          <div className="space-y-2.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-2 opacity-60">Protocol Role Classification</label>
            <select 
              name="role"
              className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="member">District Member</option>
              <option value="club_president">Club President</option>
              <option value="club_secretary">Club Secretary</option>
              <option value="district_core">District Core</option>
              <option value="district_admin">District Admin</option>
            </select>
          </div>
          <div className="space-y-2.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-2 opacity-60">Origin Node Selection</label>
            <select 
              name="clubId"
              className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">District 3192 (Universal)</option>
              {clubs.map((club: any) => (
                <option key={club.id} value={club.id}>{club.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button 
              type="submit"
              className="w-full bg-primary text-white font-black uppercase tracking-[0.2em] text-[11px] py-6 rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined text-lg">verified_user</span>
              Authorize New Node
            </button>
          </div>
        </form>
      </section>

      {/* Members Table */}
      <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] border border-white shadow-2xl overflow-hidden shadow-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="py-8 px-10 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Identity Signature</th>
                <th className="py-8 px-10 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Origin Node</th>
                <th className="py-8 px-10 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Classification</th>
                <th className="py-8 px-10 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Pulse Metrics</th>
                <th className="py-8 px-10 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5 whitespace-nowrap">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-32 text-center text-[10px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">Cluster Depleted. No nodes identified.</td>
                </tr>
              ) : (
                members.map((member, idx) => (
                  <tr key={idx} className="hover:bg-primary/5 transition-all group border-l-4 border-transparent hover:border-primary">
                    <td className="py-8 px-10">
                      <div className="flex items-center gap-5">
                         <div className="relative">
                            <img src={member.profile_pic_url} className="w-14 h-14 rounded-[1.25rem] object-cover border border-outline/10 shadow-sm" alt={member.name} />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full shadow-lg"></div>
                         </div>
                         <div className="flex flex-col gap-0.5">
                            <p className="text-lg font-black text-on-surface tracking-tight uppercase leading-none group-hover:text-primary transition-colors">{member.name}</p>
                            <p className="text-[10px] text-on-surface-variant font-bold lowercase opacity-40 italic tracking-wide">{member.email}</p>
                         </div>
                      </div>
                    </td>
                    <td className="py-8 px-10">
                      <span className="text-[11px] font-black text-on-surface-variant tracking-widest uppercase opacity-60">{member.club_name}</span>
                    </td>
                    <td className="py-8 px-10">
                      <span className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all shadow-sm
                        ${member.role === 'district_core' ? 'bg-primary/5 text-primary border-primary/20' : 
                          member.role.includes('pres') ? 'bg-secondary/5 text-secondary border-secondary/20' : 'bg-surface-container-low text-on-surface-variant border-outline/10 opacity-60 group-hover:opacity-100'}`}>
                        {member.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-8 px-10">
                      <div className="space-y-2">
                          <div className="flex items-center justify-between gap-4">
                             <p className="text-sm font-black text-on-surface leading-none tracking-tighter">{member.points.toLocaleString()}</p>
                             <p className="text-[9px] font-black text-on-surface-variant opacity-30 uppercase tracking-widest">XP</p>
                          </div>
                          <div className="w-24 h-1.5 bg-surface-container-low rounded-full overflow-hidden shadow-inner">
                             <div className="h-full bg-primary/40 group-hover:bg-primary transition-all duration-700" style={{ width: `${Math.min(100, member.points / 10)}%` }}></div>
                          </div>
                      </div>
                    </td>
                    <td className="py-8 px-10 text-right">
                      <div className="flex items-center justify-end gap-3 translate-x-8 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                        <button className="w-12 h-12 rounded-2xl bg-white border border-outline/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xl hover:shadow-primary/20">
                          <span className="material-symbols-outlined text-xl">edit_square</span>
                        </button>
                        <form action={deleteUser.bind(null, member.id)}>
                          <button type="submit" className="w-12 h-12 rounded-2xl bg-white border border-outline/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-xl hover:shadow-red-500/20">
                            <span className="material-symbols-outlined text-xl">person_remove</span>
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
        
        <div className="bg-surface-container-low/30 border-t border-outline/5 px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[11px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-30 italic">Fragmentation Synchronized: 1 - {members.length} of Total Cluster Nodes</p>
          <div className="flex items-center gap-6">
             <button className="px-8 py-3 rounded-2xl bg-white border border-outline/10 text-[11px] font-black text-on-surface-variant uppercase tracking-widest flex items-center gap-3 hover:bg-surface transition-all opacity-40 hover:opacity-100">
               <span className="material-symbols-outlined text-lg">west</span> PREV_NODE
             </button>
             <button className="px-8 py-3 rounded-2xl bg-white border border-outline/10 text-[11px] font-black text-on-surface uppercase tracking-widest flex items-center gap-3 hover:bg-surface transition-all shadow-2xl shadow-primary/5">
               NEXT_NODE <span className="material-symbols-outlined text-lg">east</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

