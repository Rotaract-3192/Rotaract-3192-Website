import { getClubs } from '@/app/actions/queries';
import { createClub, deleteClub } from '@/app/actions/mutations';
import Image from 'next/image';

export const revalidate = 0;

export default async function AdminClubsPage() {
  const clubs = await getClubs();

  return (
    <div className="space-y-16 pb-24">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Hierarchy Control</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Club <span className="text-primary not-italic">Registry.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            District Node Hierarchy Management Protocol
          </p>
        </div>
      </header>

      {/* Initialize Club Form */}
      <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
        <div className="flex items-center gap-8 mb-12">
           <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
              <span className="material-symbols-outlined text-4xl">hub</span>
           </div>
           <div>
              <h2 className="text-3xl font-black font-display uppercase tracking-tight leading-none text-on-surface italic">Initialize <span className="text-primary not-italic">Node.</span></h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.3em] opacity-40 mt-3 italic">Establish New Cluster Entry Protocol</p>
           </div>
        </div>

        <form action={createClub} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="space-y-4 lg:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Cluster Designation (Club Name)</label>
              <input 
                name="name" 
                type="text" 
                placeholder="MISSION NODE NAME" 
                required
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Geographic Signal (City)</label>
              <input 
                name="city" 
                type="text" 
                placeholder="SECTOR CITY" 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Charter Initialization</label>
              <input 
                name="charterDate" 
                type="date" 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all uppercase tracking-widest"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Identity Tint (Theme)</label>
              <div className="relative group">
                <input 
                  name="themeColor" 
                  type="color" 
                  defaultValue="#E91E63"
                  className="w-full h-[72px] bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] p-4 cursor-pointer shadow-inner focus:border-primary/50 outline-none transition-all" 
                />
                <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none opacity-40">
                  <span className="material-symbols-outlined text-primary">palette</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              className="bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] px-16 py-6 rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group"
            >
              <span className="material-symbols-outlined text-xl group-hover:rotate-45 transition-transform">add_circle</span>
              Finalize Initialization
            </button>
          </div>
        </form>
      </section>

      {/* Clubs Grid */}
      <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] border border-outline-variant/30 shadow-ambient overflow-hidden">
        <div className="px-12 py-10 border-b border-outline-variant/30 bg-surface-container-high/30 flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">Active Cluster <span className="text-primary not-italic">Nodes.</span></h2>
              <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-[0.4em] opacity-40 mt-2 italic">LIVE NETWORK MONITORING</p>
           </div>
           <div className="text-[10px] font-black text-primary bg-primary/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-primary/10 italic">{clubs.length} Nodes Synchronized</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-high/20">
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 italic">Node Identity</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 italic text-center">Chronology</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 italic text-center">Coordinates</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 text-right italic">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {clubs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-40 text-center text-[11px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">No active nodes detected in network</td>
                </tr>
              ) : (
                clubs.map((club, idx) => (
                  <tr key={idx} className="hover:bg-white transition-all group cursor-pointer border-l-4 border-transparent hover:border-primary">
                    <td className="py-10 px-12">
                      <div className="flex items-center gap-6">
                         <div 
                           className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl shadow-xl transition-transform group-hover:scale-110"
                           style={{ backgroundColor: club.themeColor || '#E91E63' }}
                         >
                           {club.name.charAt(0)}
                         </div>
                         <div>
                           <p className="text-xl font-black text-on-surface tracking-tight uppercase leading-none font-display italic group-hover:text-primary transition-colors">{club.name}</p>
                           <p className="text-[9px] text-on-surface-variant mt-2 font-black uppercase tracking-[0.2em] opacity-40 italic">ID: {club.id.substring(0, 8)}</p>
                         </div>
                      </div>
                    </td>
                    <td className="py-10 px-12 text-center text-sm font-black text-on-surface uppercase tracking-tighter italic">
                      {club.charterDate ? new Date(club.charterDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'PROTOCOL_PENDING'}
                    </td>
                    <td className="py-10 px-12 text-center">
                      <span className="text-[10px] font-black text-primary bg-primary/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-primary/10 italic group-hover:bg-primary group-hover:text-white transition-all">
                        {club.city || 'GLOBAL_NODE'}
                      </span>
                    </td>
                    <td className="py-10 px-12 text-right">
                      <div className="flex items-center justify-end gap-4 translate-x-10 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                        <form action={deleteClub.bind(null, club.id)}>
                          <button type="submit" className="w-14 h-14 rounded-2xl bg-surface-container-high border border-outline-variant/30 text-error/30 hover:bg-error hover:text-white hover:border-error transition-all shadow-xl hover:shadow-error/20 flex items-center justify-center group/del">
                            <span className="material-symbols-outlined text-xl group-hover/del:scale-110 transition-transform">delete</span>
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
