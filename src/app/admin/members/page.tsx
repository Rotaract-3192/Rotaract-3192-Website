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
    <div className="space-y-16 pb-24">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Identity Management</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Node <span className="text-primary not-italic">Directory.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            {members.length} Unique identifiers recognized in the global cluster.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
          <div className="relative group w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-all">search</span>
            <input 
              type="text" 
              placeholder="IDENTIFY_NODE..." 
              className="w-full bg-surface-container-low/70 backdrop-blur-3xl border border-outline-variant/30 rounded-2xl py-5 pl-16 pr-8 text-[11px] font-black text-on-surface focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 tracking-[0.3em] uppercase shadow-ambient" 
            />
          </div>
          <button className="bg-surface-container-low/70 backdrop-blur-3xl text-on-surface border border-outline-variant/30 font-black text-[10px] uppercase tracking-[0.4em] px-8 py-5 rounded-2xl shadow-ambient hover:scale-105 active:scale-95 transition-all flex items-center gap-4 italic group shrink-0">
            <span className="material-symbols-outlined text-xl">filter_list</span>
            FILTERS
          </button>
        </div>
      </header>

      {/* Initialize Member Terminal */}
      <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[4rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
        <div className="flex items-center gap-8 mb-12">
           <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
              <span className="material-symbols-outlined text-4xl">person_add</span>
           </div>
           <div>
              <h2 className="text-3xl font-black font-display uppercase tracking-tight leading-none text-on-surface italic">Initialize New <span className="text-primary not-italic">Node.</span></h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.3em] opacity-40 mt-3 italic">MANUAL MEMBER REGISTRATION PROTOCOL</p>
           </div>
        </div>

        <form action={createMember} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Authentication Identifier (Email)</label>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="NODE@DISTRICT3192.ORG" 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" 
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Primary Label (First Name)</label>
              <input 
                name="firstName" 
                type="text" 
                required 
                placeholder="FIRST NAME" 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" 
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Secondary Label (Last Name)</label>
              <input 
                name="lastName" 
                type="text" 
                placeholder="LAST NAME" 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" 
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Protocol Role Classification</label>
              <div className="relative">
                <select name="role" className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer">
                  <option value="member">DISTRICT_MEMBER</option>
                  <option value="club_president">CLUB_PRESIDENT</option>
                  <option value="club_secretary">CLUB_SECRETARY</option>
                  <option value="district_core">DISTRICT_CORE</option>
                  <option value="district_admin">DISTRICT_ADMIN</option>
                </select>
                <span className="material-symbols-outlined absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Origin Node Selection</label>
              <div className="relative">
                <select name="clubId" className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer">
                  <option value="">DISTRICT_3192 (UNIVERSAL)</option>
                  {clubs.map((club: any) => (
                    <option key={club.id} value={club.id}>{club.name.toUpperCase()}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
              </div>
            </div>
            <div className="flex items-end">
              <button 
                type="submit"
                className="w-full bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] py-7 rounded-[2rem] shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group"
              >
                <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">verified_user</span>
                Authorize New Node
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Node Registry Terminal */}
      <div className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[4rem] border border-outline-variant/30 shadow-ambient overflow-hidden relative group">
        <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)]"></div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/50">
                <th className="py-8 px-12 text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">Identity Signature</th>
                <th className="py-8 px-12 text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">Origin Node</th>
                <th className="py-8 px-12 text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">Classification</th>
                <th className="py-8 px-12 text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">Pulse Metrics</th>
                <th className="py-8 px-12 text-[10px] font-black text-primary uppercase tracking-[0.4em] italic text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 whitespace-nowrap">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-32 text-center text-xs font-black uppercase tracking-[0.5em] opacity-20 italic">
                    CLUSTER DEPLETED • NO NODES IDENTIFIED
                  </td>
                </tr>
              ) : (
                members.map((member, idx) => (
                  <tr key={idx} className="hover:bg-white transition-all duration-500 group/row cursor-default">
                    <td className="py-10 px-12">
                      <div className="flex items-center gap-8">
                         <div className="relative shrink-0">
                            <img src={member.profile_pic_url} className="w-16 h-16 rounded-[1.5rem] object-cover border border-outline-variant/30 shadow-xl group-hover/row:scale-110 transition-transform duration-700 grayscale group-hover/row:grayscale-0" alt={member.name} />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-[6px] border-white rounded-full shadow-xl"></div>
                         </div>
                         <div className="flex flex-col gap-1">
                            <p className="text-xl font-black text-on-surface font-display uppercase tracking-tighter group-hover/row:text-primary transition-colors italic leading-none">{member.name}</p>
                            <p className="text-[10px] text-on-surface-variant font-black lowercase opacity-40 italic tracking-widest">{member.email}</p>
                         </div>
                      </div>
                    </td>
                    <td className="py-10 px-12">
                      <span className="text-[11px] font-black text-on-surface-variant tracking-[0.3em] uppercase opacity-60 group-hover/row:opacity-100 transition-opacity italic">{member.club_name.toUpperCase()}</span>
                    </td>
                    <td className="py-10 px-12">
                      <span className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] border transition-all italic shadow-inner
                        ${member.role === 'district_core' ? 'bg-primary/5 text-primary border-primary/20 shadow-primary/5' : 
                          member.role.includes('pres') ? 'bg-secondary/5 text-secondary border-secondary/20 shadow-secondary/5' : 'bg-surface-container-high text-on-surface-variant border-outline-variant/30 opacity-60 group-hover/row:opacity-100'}`}>
                        {member.role.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-10 px-12">
                      <div className="space-y-4">
                          <div className="flex items-center justify-between gap-6">
                             <p className="text-xl font-black text-on-surface leading-none tracking-tighter font-display tabular-nums italic">{member.points.toLocaleString()}</p>
                             <p className="text-[9px] font-black text-primary opacity-40 uppercase tracking-[0.3em] italic">XP_METRIC</p>
                          </div>
                          <div className="w-32 h-2 bg-surface-container-high rounded-full overflow-hidden shadow-inner p-[1px]">
                             <div className="h-full bg-primary/40 group-hover/row:bg-primary transition-all duration-1000 shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.3)]" style={{ width: `${Math.min(100, member.points / 10)}%` }}></div>
                          </div>
                      </div>
                    </td>
                    <td className="py-10 px-12 text-right">
                      <div className="flex items-center justify-end gap-4 translate-x-12 opacity-0 group-hover/row:opacity-100 transition-all group-hover/row:translate-x-0">
                        <button className="w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant/30 text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-xl">
                          <span className="material-symbols-outlined text-xl">edit_square</span>
                        </button>
                        <form action={deleteUser.bind(null, member.id)}>
                          <button type="submit" className="w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant/30 text-error/30 hover:bg-error hover:text-white hover:border-error transition-all shadow-xl hover:shadow-error/20 flex items-center justify-center group/del">
                            <span className="material-symbols-outlined text-xl group-hover/del:scale-110 transition-transform">person_remove</span>
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
        
        <div className="bg-surface-container-high/30 border-t border-outline-variant/30 px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[11px] font-black text-on-surface-variant uppercase tracking-[0.5em] opacity-30 italic">FRAGMENTATION SYNCHRONIZED: 1 — {members.length} OF TOTAL CLUSTER NODES</p>
          <div className="flex items-center gap-6">
             <button className="px-10 py-4 rounded-2xl bg-surface-container-high border border-outline-variant/30 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] flex items-center gap-4 hover:bg-white transition-all opacity-40 hover:opacity-100 italic">
               <span className="material-symbols-outlined text-lg">west</span> PREV_NODE
             </button>
             <button className="px-10 py-4 rounded-2xl bg-primary text-white border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20 italic">
               NEXT_NODE <span className="material-symbols-outlined text-lg">east</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
