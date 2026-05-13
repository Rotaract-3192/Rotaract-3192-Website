import { getClubs } from '@/app/actions/queries';
import { createClub, deleteClub } from '@/app/actions/mutations';

export const revalidate = 0;

export default async function AdminClubsPage() {
  const clubs = await getClubs();

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tight leading-none text-on-surface">Club Registry</h1>
          <p className="text-xs text-on-surface-variant font-medium opacity-60 italic">District Node Hierarchy Management</p>
        </div>
      </header>

      {/* Initialize Club Form */}
      <section className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white p-10 shadow-2xl shadow-primary/5">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <span className="material-symbols-outlined">hub</span>
           </div>
           <div>
              <h2 className="text-xl font-black uppercase tracking-tight leading-none text-on-surface">Initialize Node</h2>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest opacity-40 mt-1">ESTABLISH NEW CLUSTER ENTRY</p>
           </div>
        </div>

        <form action={createClub} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-4">Cluster Designation (Club Name)</label>
              <input 
                name="name" 
                type="text" 
                placeholder="Rotaract Club of Bangalore" 
                required
                className="w-full bg-surface-container-low border border-outline/10 rounded-2xl py-4 px-6 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-4">Geographic Signal (City)</label>
              <input 
                name="city" 
                type="text" 
                placeholder="Bangalore" 
                className="w-full bg-surface-container-low border border-outline/10 rounded-2xl py-4 px-6 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-4">Charter Initialization Date</label>
              <input 
                name="charterDate" 
                type="date" 
                className="w-full bg-surface-container-low border border-outline/10 rounded-2xl py-4 px-6 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-4">Identity Tint (Theme Color)</label>
              <div className="relative group">
                <input 
                  name="themeColor" 
                  type="color" 
                  defaultValue="#E91E63"
                  className="w-full h-14 bg-surface-container-low border border-outline/10 rounded-2xl p-1 cursor-pointer focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all" 
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-20">
                  <span className="material-symbols-outlined text-sm">palette</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              className="bg-primary text-white font-black uppercase tracking-widest text-[10px] px-12 py-5 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              Finalize Initialization
            </button>
          </div>
        </form>
      </section>

      {/* Clubs Table */}
      <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] border border-white shadow-2xl overflow-hidden shadow-primary/5">
        <div className="px-10 py-8 border-b border-outline/5 bg-surface-container-lowest">
           <h2 className="text-xl font-black text-on-surface uppercase tracking-tight">Active Cluster Nodes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="py-6 px-10 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Identity</th>
                <th className="py-6 px-10 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Chronology</th>
                <th className="py-6 px-10 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Coordinates</th>
                <th className="py-6 px-10 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {clubs.map((club, idx) => (
                <tr key={idx} className="hover:bg-primary/5 transition-all group">
                  <td className="py-6 px-10">
                    <div className="flex items-center gap-4">
                       <div 
                         className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-on-surface/5"
                         style={{ backgroundColor: club.themeColor || '#E91E63' }}
                       >
                         {club.name.charAt(0)}
                       </div>
                       <div>
                         <p className="text-sm font-black text-on-surface tracking-tight uppercase leading-none">{club.name}</p>
                         <p className="text-[9px] text-on-surface-variant mt-1.5 font-bold uppercase tracking-widest opacity-40 italic">ID: {club.id.substring(0, 8)}</p>
                       </div>
                    </div>
                  </td>
                  <td className="py-6 px-10 text-xs font-bold text-on-surface-variant lowercase italic tracking-wide">
                    {club.charterDate ? new Date(club.charterDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-6 px-10">
                    <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest bg-surface-container-low px-3 py-1 rounded-full border border-outline/5 group-hover:bg-white group-hover:border-primary/10 transition-all">
                      {club.city || 'GLOBAL'}
                    </span>
                  </td>
                  <td className="py-6 px-10 text-right">
                    <form action={deleteClub.bind(null, club.id)}>
                      <button type="submit" className="w-10 h-10 rounded-xl bg-white border border-outline/10 text-error flex items-center justify-center hover:bg-error hover:text-white transition-all shadow-sm">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {clubs.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-20 text-center text-on-surface-variant opacity-40 text-sm font-bold uppercase tracking-widest italic">No recognized cluster nodes found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
