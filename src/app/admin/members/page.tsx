import { getUsers, getClubs } from '@/app/actions/queries';
import { deleteUser, createMember } from '@/app/actions/mutations';
import Image from 'next/image';

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
        
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
          <div className="relative group w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-all">search</span>
            <input 
              type="text" 
              placeholder="Search members..." 
              className="w-full glass-panel py-5 pl-16 pr-8 text-[11px] font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 tracking-[0.3em] uppercase font-sans" 
            />
          </div>
          <button className="glass-panel text-white font-bold text-[10px] uppercase tracking-[0.4em] px-8 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group shrink-0 font-sans">
            <span className="material-symbols-outlined text-xl">filter_list</span>
            Filters
          </button>
        </div>
      </header>

      {/* Initialize Member Terminal */}
      <section className="glass-panel p-10 lg:p-14 relative overflow-hidden">
        <div className="flex items-center gap-8 mb-12">
           <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <span className="material-symbols-outlined text-3xl">person_add</span>
           </div>
           <div>
              <h2 className="text-3xl font-bold font-display uppercase tracking-tight leading-none text-white">Add New <span className="text-primary">Member</span></h2>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] opacity-40 mt-3 font-sans">Manual member registration protocol</p>
           </div>
        </div>

        <form action={createMember} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Email Address</label>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="member@rotaract3192.org" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">First Name</label>
              <input 
                name="firstName" 
                type="text" 
                required 
                placeholder="Enter first name..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Last Name</label>
              <input 
                name="lastName" 
                type="text" 
                placeholder="Enter last name..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Role Classification</label>
              <div className="relative">
                <select name="role" className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer font-sans">
                  <option value="member" className="bg-slate-900">District Member</option>
                  <option value="club_president" className="bg-slate-900">Club President</option>
                  <option value="club_secretary" className="bg-slate-900">Club Secretary</option>
                  <option value="district_core" className="bg-slate-900">District Core</option>
                  <option value="district_admin" className="bg-slate-900">District Admin</option>
                </select>
                <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Club Affiliation</label>
              <div className="relative">
                <select name="clubId" className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer font-sans">
                  <option value="" className="bg-slate-900">District 3192 (Universal)</option>
                  {clubs.map((club: any) => (
                    <option key={club.id} value={club.id} className="bg-slate-900">{club.name.toUpperCase()}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
              </div>
            </div>
            <div className="flex items-end">
              <button 
                type="submit"
                className="w-full bg-primary text-white font-bold uppercase tracking-[0.4em] text-[11px] py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group font-sans"
              >
                <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">verified_user</span>
                Authorize Member
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Node Registry Terminal */}
      <section className="glass-panel overflow-hidden relative">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Identity</th>
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Affiliation</th>
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Classification</th>
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">XP Metrics</th>
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] text-right font-sans">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 whitespace-nowrap">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-32 text-center text-xs font-bold uppercase tracking-[0.5em] opacity-20 font-sans">
                    No members identified in registry
                  </td>
                </tr>
              ) : (
                members.map((member, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-all duration-500 group/row cursor-default border-l-4 border-transparent hover:border-primary">
                    <td className="py-8 px-10">
                      <div className="flex items-center gap-6">
                         <div className="relative shrink-0">
                            <img src={member.profile_pic_url} className="w-14 h-14 rounded-2xl object-cover border border-white/10 shadow-xl group-hover/row:scale-110 transition-transform duration-700 grayscale group-hover/row:grayscale-0" alt={member.name} />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-slate-900 rounded-full shadow-xl"></div>
                         </div>
                         <div className="flex flex-col gap-1">
                            <p className="text-xl font-bold text-white font-display uppercase tracking-tight group-hover/row:text-primary transition-colors leading-none">{member.name}</p>
                            <p className="text-[10px] text-text-muted font-bold lowercase opacity-40 tracking-widest font-sans">{member.email}</p>
                         </div>
                      </div>
                    </td>
                    <td className="py-8 px-10">
                      <span className="text-[11px] font-bold text-text-muted tracking-[0.2em] uppercase opacity-60 group-hover/row:opacity-100 transition-opacity font-sans">{member.club_name.toUpperCase()}</span>
                    </td>
                    <td className="py-8 px-10">
                      <span className={`px-5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] border transition-all shadow-inner font-sans
                        ${member.role === 'district_core' ? 'bg-primary/5 text-primary border-primary/20' : 
                          member.role.includes('pres') ? 'bg-blue-500/5 text-blue-400 border-blue-500/20' : 'bg-white/5 text-text-muted border-white/10 opacity-60 group-hover/row:opacity-100'}`}>
                        {member.role.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-8 px-10">
                      <div className="space-y-3">
                          <div className="flex items-center justify-between gap-4">
                             <p className="text-xl font-bold text-white leading-none tracking-tight font-display tabular-nums">{member.points.toLocaleString()}</p>
                             <p className="text-[9px] font-bold text-primary opacity-40 uppercase tracking-[0.2em] font-sans">XP</p>
                          </div>
                          <div className="w-28 h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
                             <div className="h-full bg-primary/40 group-hover/row:bg-primary transition-all duration-1000" style={{ width: `${Math.min(100, member.points / 10)}%` }}></div>
                          </div>
                      </div>
                    </td>
                    <td className="py-8 px-10 text-right">
                      <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover/row:opacity-100 transition-all group-hover/row:translate-x-0">
                        <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xl">
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <form action={deleteUser.bind(null, member.id)}>
                          <button type="submit" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-xl flex items-center justify-center group/del">
                            <span className="material-symbols-outlined text-lg group-hover/del:scale-110 transition-transform">person_remove</span>
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
        
        <div className="bg-white/5 border-t border-white/5 px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.4em] opacity-30 font-sans">Showing 1 — {members.length} of {members.length} total members</p>
          <div className="flex items-center gap-4">
             <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-[9px] font-bold text-text-muted uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-white/10 transition-all opacity-40 hover:opacity-100 font-sans">
               <span className="material-symbols-outlined text-base">west</span> Previous
             </button>
             <button className="px-8 py-3 rounded-xl bg-primary text-white border border-primary/20 text-[9px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 font-sans">
               Next <span className="material-symbols-outlined text-base">east</span>
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}
