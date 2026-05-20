import { getClubs } from '@/app/actions/queries';
import { deleteClub } from '@/app/actions/mutations';
import NewClubButton from '@/components/admin/NewClubButton';

export const revalidate = 0;

export default async function AdminClubsPage() {
  const clubs = await getClubs();

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Organization Control</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            Club <span className="text-primary">Registry</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Management system for all district club chapters.
          </p>
        </div>
        <NewClubButton />
      </header>

      {/* Clubs Table */}
      <section className="glass-panel overflow-hidden">
        <div className="px-10 py-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display">Active <span className="text-primary">Chapters</span></h2>
            <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.4em] opacity-40 mt-2 font-sans">District network monitoring</p>
          </div>
          <div className="text-[10px] font-bold text-primary bg-primary/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-primary/10 font-sans">{clubs.length} Chapters Active</div>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5">
                <th className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 font-sans">Club Identity</th>
                <th className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 text-center font-sans">Chartered</th>
                <th className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 text-center font-sans">Zone</th>
                <th className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 text-right font-sans">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clubs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-40 text-center text-[10px] font-bold text-text-muted/20 uppercase tracking-[0.5em] font-sans">
                    No active chapters — click "New Club" to add one
                  </td>
                </tr>
              ) : clubs.map((club: any, idx: number) => (
                <tr key={idx} className="hover:bg-white/5 transition-all group cursor-pointer border-l-4 border-transparent hover:border-primary">
                  <td className="py-8 px-10">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl transition-transform group-hover:scale-110 overflow-hidden bg-primary">
                        {club.logoUrl ? <img src={club.logoUrl} alt="" className="w-full h-full object-cover" /> : club.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white tracking-tight uppercase leading-none font-display group-hover:text-primary transition-colors">{club.name}</p>
                        <p className="text-[9px] text-text-muted mt-2 font-bold uppercase tracking-[0.2em] opacity-40 font-sans">
                          {club.city ? `${club.city} • ${club.zone || 'District Wide'}` : 'PROTOCOL: DISTRICT 3192'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-8 px-10 text-center text-sm font-bold text-white uppercase tracking-tighter font-sans">
                    {club.charterDate ? new Date(club.charterDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'PENDING'}
                  </td>
                  <td className="py-8 px-10 text-center">
                    <span className="text-[9px] font-bold text-primary bg-primary/5 px-5 py-1.5 rounded-full uppercase tracking-[0.2em] border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all font-sans">
                      {club.zone || 'General'}
                    </span>
                  </td>
                  <td className="py-8 px-10 text-right">
                    <div className="flex items-center justify-end gap-4 translate-x-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                      <form action={deleteClub.bind(null, club.id)}>
                        <button type="submit" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-xl flex items-center justify-center">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </form>
                    </div>
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
