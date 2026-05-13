import { getMOMs } from "@/app/actions/queries";
import { createMOM, deleteMOM } from "@/app/actions/mutations";

export const revalidate = 0;

export default async function AdminMOMPage() {
  const momList = await getMOMs();

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none text-on-surface">Archive Registry</h1>
          <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-[0.3em] opacity-40 italic">Historical District Protocol & Meeting Documentation</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 rounded-2xl bg-secondary/5 border border-secondary/10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Registry Synchronized</span>
          </div>
        </div>
      </header>

      {/* Create MOM Form */}
      <section className="bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white p-12 shadow-2xl shadow-primary/5">
        <div className="flex items-center gap-5 mb-12">
           <div className="w-14 h-14 rounded-[1.25rem] bg-secondary/10 flex items-center justify-center text-secondary shadow-inner">
              <span className="material-symbols-outlined text-3xl">description</span>
           </div>
           <div>
              <h2 className="text-2xl font-black uppercase tracking-tight leading-none text-on-surface">Commit to Archive</h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em] opacity-40 mt-2 italic">Persist District Meeting Data to the Immutable Core</p>
           </div>
        </div>

        <form action={createMOM} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Meeting Designation</label>
              <input 
                name="title" 
                type="text" 
                placeholder="e.g. DISTRICT COUNCIL MEETING #04" 
                required
                className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-secondary/10 focus:outline-none transition-all placeholder:opacity-20"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Chronology Signal (Date)</label>
              <input 
                name="meetingDate" 
                type="date" 
                required
                className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-secondary/10 focus:outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Documentation Link (PDF/Cloud Storage)</label>
            <input 
              name="fileUrl" 
              type="url" 
              placeholder="https://storage.district3192.org/mom-04.pdf" 
              className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-secondary/10 focus:outline-none transition-all placeholder:opacity-20"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Summary Payload (Brief)</label>
            <textarea 
              name="content" 
              rows={4}
              placeholder="Enter meeting summary or key decisions..." 
              className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-6 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-secondary/10 focus:outline-none transition-all resize-none placeholder:opacity-20"
            ></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="bg-secondary text-white font-black uppercase tracking-[0.2em] text-[11px] px-16 py-6 rounded-[1.5rem] shadow-2xl shadow-secondary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
            >
              <span className="material-symbols-outlined text-xl">save</span>
              Commit to Registry
            </button>
          </div>
        </form>
      </section>

      {/* MOM Archive Table */}
      <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] border border-white shadow-2xl overflow-hidden shadow-primary/5">
        <div className="px-12 py-10 border-b border-outline/5 bg-surface-container-lowest flex items-center justify-between">
           <h2 className="text-xl font-black text-on-surface uppercase tracking-tight">Archived Protocols</h2>
           <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-40 italic">{momList.length} Records Persisted</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Chronology</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Designation</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Access Protocol</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {momList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-32 text-center text-[10px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">No district records committed to archive</td>
                </tr>
              ) : (
                momList.map((mom, idx) => (
                  <tr key={idx} className="hover:bg-primary/5 transition-all group border-l-4 border-transparent hover:border-secondary">
                    <td className="py-8 px-12">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-black text-on-surface-variant uppercase tracking-wide">{new Date(mom.meetingDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        <span className="text-[10px] font-bold text-on-surface-variant/40 lowercase italic tracking-widest">SEQ_{idx.toString().padStart(3, '0')}</span>
                      </div>
                    </td>
                    <td className="py-8 px-12">
                      <div className="max-w-md">
                        <p className="text-base font-black text-on-surface tracking-tight uppercase leading-none group-hover:text-secondary transition-colors">{mom.title}</p>
                        {mom.content && <p className="text-[11px] text-on-surface-variant mt-2 font-bold line-clamp-1 opacity-40 italic lowercase tracking-wide">{mom.content}</p>}
                      </div>
                    </td>
                    <td className="py-8 px-12">
                      {mom.fileUrl ? (
                        <a href={mom.fileUrl} target="_blank" className="inline-flex items-center gap-3 px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary hover:text-white transition-all shadow-sm">
                          <span className="material-symbols-outlined text-base">cloud_download</span>
                          EXTRACT_DATA
                        </a>
                      ) : (
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-20 italic">No File Linked</span>
                      )}
                    </td>
                    <td className="py-8 px-12 text-right">
                      <div className="flex items-center justify-end gap-3 translate-x-8 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                        <form action={deleteMOM.bind(null, mom.id)}>
                          <button type="submit" className="w-12 h-12 rounded-2xl bg-white border border-outline/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-xl hover:shadow-red-500/20">
                            <span className="material-symbols-outlined text-xl">delete_forever</span>
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
      </div>
    </div>
  );
}

