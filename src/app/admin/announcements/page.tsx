import { getAnnouncements } from "@/app/actions/queries";
import { createAnnouncement, deleteAnnouncement } from "@/app/actions/mutations";
import Image from 'next/image';

export const revalidate = 0;

export default async function AdminAnnouncementsPage() {
  const announcementsList = await getAnnouncements();

  return (
    <div className="space-y-16 pb-24">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Signal Comms</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Broadcast <span className="text-primary not-italic">Control.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            Global District Signal Transmission Protocol: ONLINE
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-surface-container-low/50 backdrop-blur-xl px-8 py-4 rounded-[2rem] border border-outline-variant/30">
          <span className="material-symbols-outlined text-primary text-xl">broadcast_on_personal</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface">Signal Buffer Active</span>
        </div>
      </header>

      {/* Create Announcement Form */}
      <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
        <div className="flex items-center gap-8 mb-12">
           <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
              <span className="material-symbols-outlined text-4xl">campaign</span>
           </div>
           <div>
              <h2 className="text-3xl font-black font-display uppercase tracking-tight leading-none text-on-surface italic">Initialize <span className="text-primary not-italic">Broadcast.</span></h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.3em] opacity-40 mt-3 italic">Transmit Critical Data to All Connected Nodes</p>
           </div>
        </div>

        <form action={createAnnouncement} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Signal Designation (Title)</label>
              <input 
                name="title" 
                type="text" 
                placeholder="MISSION TITLE" 
                required
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Classification</label>
              <div className="relative">
                <select 
                  name="type"
                  className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer"
                >
                  <option value="info" className="bg-surface">PROTOCOL_INFO (STANDARD)</option>
                  <option value="alert" className="bg-surface">PROTOCOL_ALERT (CRITICAL)</option>
                  <option value="success" className="bg-surface">PROTOCOL_SYNC (SUCCESS)</option>
                </select>
                <span className="material-symbols-outlined absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Transmission Payload</label>
            <textarea 
              name="content" 
              rows={5}
              placeholder="Enter the transmission payload and critical data points..." 
              required
              className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2.5rem] py-8 px-10 text-sm font-medium text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all resize-none italic leading-relaxed placeholder:text-on-surface-variant/20"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              className="bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] px-16 py-6 rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group"
            >
              <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">send</span>
              Execute Broadcast
            </button>
          </div>
        </form>
      </section>

      {/* Active Broadcasts List */}
      <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] border border-outline-variant/30 shadow-ambient overflow-hidden">
        <div className="px-12 py-10 border-b border-outline-variant/30 bg-surface-container-high/30 flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">Transmission <span className="text-primary not-italic">Buffer.</span></h2>
              <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-[0.4em] opacity-40 mt-2 italic">LIVE SIGNAL MONITORING</p>
           </div>
           <div className="text-[10px] font-black text-primary bg-primary/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-primary/10 italic">{announcementsList.length} Signals Syncing</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-high/20">
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 italic">Temporal Marker</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 italic">Payload Designation</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 italic text-center">Status</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 text-right italic">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {announcementsList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-40 text-center text-[11px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">No active signals detected in buffer</td>
                </tr>
              ) : (
                announcementsList.map((ann, idx) => (
                  <tr key={idx} className="hover:bg-white transition-all group cursor-pointer border-l-4 border-transparent hover:border-primary">
                    <td className="py-10 px-12">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-black text-on-surface uppercase tracking-tighter italic">{new Date(ann.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        <span className="text-[9px] font-black text-on-surface-variant/30 uppercase tracking-[0.2em] italic">{new Date(ann.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                      </div>
                    </td>
                    <td className="py-10 px-12">
                      <div className="max-w-lg space-y-2">
                        <p className="text-xl font-black text-on-surface tracking-tight uppercase leading-none font-display italic group-hover:text-primary transition-colors">{ann.title}</p>
                        <p className="text-sm text-on-surface-variant font-medium line-clamp-1 opacity-50 italic leading-none lowercase">"{ann.content}"</p>
                      </div>
                    </td>
                    <td className="py-10 px-12 text-center">
                      <span className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] border transition-all italic
                        ${ann.type === 'alert' ? 'bg-error/5 text-error border-error/10' : 
                          ann.type === 'success' ? 'bg-green-500/5 text-green-500 border-green-500/10' : 'bg-primary/5 text-primary border-primary/10'}`}>
                        {ann.type}
                      </span>
                    </td>
                    <td className="py-10 px-12 text-right">
                      <div className="flex items-center justify-end gap-4 translate-x-10 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                        <form action={deleteAnnouncement.bind(null, ann.id)}>
                          <button type="submit" className="w-14 h-14 rounded-2xl bg-surface-container-high border border-outline-variant/30 text-error/30 hover:bg-error hover:text-white hover:border-error transition-all shadow-xl hover:shadow-error/20 flex items-center justify-center group/del">
                            <span className="material-symbols-outlined text-xl group-hover/del:scale-110 transition-transform">delete_sweep</span>
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
