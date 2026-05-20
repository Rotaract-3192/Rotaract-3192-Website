import { getMOMs, getClubs } from "@/app/actions/queries";
import { deleteMOM } from "@/app/actions/mutations";
import NewMOMButton from '@/components/admin/NewMOMButton';

export const revalidate = 0;

export default async function AdminMOMPage() {
  const [momList, clubs] = await Promise.all([getMOMs(), getClubs()]);

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Minutes Repository</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            Meeting <span className="text-primary">Minutes</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Archive and manage district meeting documentation and records.
          </p>
        </div>
        <NewMOMButton clubs={clubs} />
      </header>


      {/* Archived Protocols Table */}
      <section className="glass-panel overflow-hidden">
        <div className="px-10 py-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display">Meeting <span className="text-primary">Logs</span></h2>
              <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.4em] opacity-40 mt-2 font-sans">Historical District Records</p>
           </div>
           <div className="text-[10px] font-bold text-primary bg-primary/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-primary/10 font-sans">{momList.length} Records Saved</div>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Date</th>
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Meeting Title</th>
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] text-center font-sans">Access</th>
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] text-right font-sans">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {momList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-40 text-center text-[10px] font-bold text-text-muted/20 uppercase tracking-[0.5em] font-sans">No meeting records found in archive</td>
                </tr>
              ) : (
                momList.map((mom, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-all group cursor-default border-l-4 border-transparent hover:border-primary">
                    <td className="py-8 px-10">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold text-white uppercase tracking-widest font-sans">{new Date(mom.meetingDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        <span className="text-[9px] font-bold text-text-muted opacity-20 uppercase tracking-[0.2em] font-sans">Index: {idx.toString().padStart(3, '0')}</span>
                      </div>
                    </td>
                    <td className="py-8 px-10">
                      <p className="text-lg font-bold text-white uppercase tracking-tight font-display group-hover:text-primary transition-colors leading-none">{mom.title}</p>
                    </td>
                    <td className="py-8 px-10 text-center">
                      {mom.fileUrl ? (
                        <a href={mom.fileUrl} target="_blank" className="inline-flex items-center gap-3 px-5 py-2 rounded-xl text-[9px] font-bold uppercase tracking-[0.3em] bg-primary/5 text-primary border border-primary/10 hover:bg-primary hover:text-white transition-all font-sans">
                          <span className="material-symbols-outlined text-base">cloud_download</span>
                          Download
                        </a>
                      ) : (
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-20 font-sans">N/A</span>
                      )}
                    </td>
                    <td className="py-8 px-10 text-right">
                      <div className="flex items-center justify-end gap-4 translate-x-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                        <form action={deleteMOM.bind(null, mom.id)}>
                          <button type="submit" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all group/del">
                            <span className="material-symbols-outlined text-lg group-hover/del:scale-110 transition-transform">delete</span>
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
