import { getAnnouncements } from "@/app/actions/queries";
import { createAnnouncement, deleteAnnouncement } from "@/app/actions/mutations";

export const revalidate = 0;

export default async function AdminAnnouncementsPage() {
  const announcementsList = await getAnnouncements();

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none text-on-surface">Broadcast Control</h1>
          <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-[0.3em] opacity-40 italic">Global District Signal Transmission Protocol</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Signal Buffer Active</span>
          </div>
        </div>
      </header>

      {/* Create Announcement Form */}
      <section className="bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white p-12 shadow-2xl shadow-primary/5">
        <div className="flex items-center gap-5 mb-12">
           <div className="w-14 h-14 rounded-[1.25rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <span className="material-symbols-outlined text-3xl">campaign</span>
           </div>
           <div>
              <h2 className="text-2xl font-black uppercase tracking-tight leading-none text-on-surface">Initialize Broadcast</h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em] opacity-40 mt-2 italic">Transmit Critical Data to All Connected Nodes</p>
           </div>
        </div>

        <form action={createAnnouncement} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Signal Designation (Title)</label>
              <input 
                name="title" 
                type="text" 
                placeholder="e.g. DISTRICT ASSEMBLY 2024" 
                required
                className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Signal Priority & Classification</label>
              <div className="relative">
                <select 
                  name="type"
                  className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="info">PROTOCOL_INFO (STANDARD)</option>
                  <option value="alert">PROTOCOL_ALERT (CRITICAL)</option>
                  <option value="success">PROTOCOL_SYNC (SUCCESS)</option>
                </select>
                <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-on-surface/20 pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Signal Payload (Transmission Content)</label>
            <textarea 
              name="content" 
              rows={5}
              placeholder="Enter the transmission payload..." 
              required
              className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-6 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all resize-none placeholder:opacity-20"
            ></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="bg-primary text-white font-black uppercase tracking-[0.2em] text-[11px] px-16 py-6 rounded-[1.5rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
            >
              <span className="material-symbols-outlined text-xl">send</span>
              Execute Broadcast
            </button>
          </div>
        </form>
      </section>

      {/* Active Broadcasts List */}
      <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] border border-white shadow-2xl overflow-hidden shadow-primary/5">
        <div className="px-12 py-10 border-b border-outline/5 bg-surface-container-lowest flex items-center justify-between">
           <h2 className="text-xl font-black text-on-surface uppercase tracking-tight">Transmission Buffer</h2>
           <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-40 italic">{announcementsList.length} Signals Active</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Temporal Marker</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Signal Payload</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Classification</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {announcementsList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-32 text-center text-[10px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">No active signals in broadcast buffer</td>
                </tr>
              ) : (
                announcementsList.map((ann, idx) => (
                  <tr key={idx} className="hover:bg-primary/5 transition-all group border-l-4 border-transparent hover:border-primary">
                    <td className="py-8 px-12">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-black text-on-surface-variant uppercase tracking-wide">{new Date(ann.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        <span className="text-[10px] font-bold text-on-surface-variant/40 lowercase italic">{new Date(ann.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </td>
                    <td className="py-8 px-12">
                      <div className="max-w-md">
                        <p className="text-base font-black text-on-surface tracking-tight uppercase leading-none group-hover:text-primary transition-colors">{ann.title}</p>
                        <p className="text-[11px] text-on-surface-variant mt-2 font-bold line-clamp-1 opacity-40 italic lowercase tracking-wide">{ann.content}</p>
                      </div>
                    </td>
                    <td className="py-8 px-12">
                      <span className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border transition-all shadow-sm
                        ${ann.type === 'alert' ? 'bg-red-50 text-red-600 border-red-100 shadow-red-500/5' : 
                          ann.type === 'success' ? 'bg-green-50 text-green-600 border-green-100 shadow-green-500/5' : 'bg-primary/5 text-primary border-primary/10 shadow-primary/5'}`}>
                        {ann.type}
                      </span>
                    </td>
                    <td className="py-8 px-12 text-right">
                      <div className="flex items-center justify-end gap-3 translate-x-8 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                        <form action={deleteAnnouncement.bind(null, ann.id)}>
                          <button type="submit" className="w-12 h-12 rounded-2xl bg-white border border-outline/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-xl hover:shadow-red-500/20">
                            <span className="material-symbols-outlined text-xl">delete_sweep</span>
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

