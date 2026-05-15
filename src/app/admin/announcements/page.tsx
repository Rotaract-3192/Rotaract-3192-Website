import { getAnnouncements } from "@/app/actions/queries";
import { createAnnouncement, deleteAnnouncement } from "@/app/actions/mutations";
import Image from 'next/image';

export const revalidate = 0;

export default async function AdminAnnouncementsPage() {
  const announcementsList = await getAnnouncements();

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">District Communications</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            District <span className="text-primary">Broadcasting</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Management system for critical district updates and alerts.
          </p>
        </div>
        
        <div className="flex items-center gap-4 glass-panel px-8 py-4">
          <span className="material-symbols-outlined text-primary text-xl">broadcast_on_personal</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white font-sans">Active Status: Transmission Ready</span>
        </div>
      </header>

      {/* Create Announcement Form */}
      <section className="glass-panel p-10 lg:p-14 relative overflow-hidden">
        <div className="flex items-center gap-8 mb-12">
           <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <span className="material-symbols-outlined text-3xl">campaign</span>
           </div>
           <div>
              <h2 className="text-3xl font-bold font-display uppercase tracking-tight leading-none text-white">New <span className="text-primary">Announcement</span></h2>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] opacity-40 mt-3 font-sans">Draft and transmit district-wide notification</p>
           </div>
        </div>

        <form action={createAnnouncement} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Announcement Title</label>
              <input 
                name="title" 
                type="text" 
                placeholder="Enter title..." 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Priority Level</label>
              <div className="relative">
                <select 
                  name="type"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer font-sans"
                >
                  <option value="info" className="bg-slate-900">Standard Information</option>
                  <option value="alert" className="bg-slate-900">Critical Alert</option>
                  <option value="success" className="bg-slate-900">Success Update</option>
                </select>
                <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Announcement Message</label>
            <textarea 
              name="content" 
              rows={5}
              placeholder="Draft your announcement here..." 
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-sm font-medium text-white focus:border-primary/50 outline-none transition-all resize-none leading-relaxed placeholder:text-white/20 font-sans"
            ></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="bg-primary text-white font-bold uppercase tracking-[0.4em] text-[11px] px-14 py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group font-sans"
            >
              <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">send</span>
              Post Announcement
            </button>
          </div>
        </form>
      </section>

      {/* Active Broadcasts List */}
      <section className="glass-panel overflow-hidden">
        <div className="px-10 py-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display">Message <span className="text-primary">History</span></h2>
              <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.4em] opacity-40 mt-2 font-sans">Active signal monitoring</p>
           </div>
           <div className="text-[10px] font-bold text-primary bg-primary/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-primary/10 font-sans">{announcementsList.length} Active Posts</div>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5">
                <th className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 font-sans">Timestamp</th>
                <th className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 font-sans">Message Details</th>
                <th className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 text-center font-sans">Level</th>
                <th className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 text-right font-sans">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {announcementsList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-40 text-center text-[10px] font-bold text-text-muted/20 uppercase tracking-[0.5em] font-sans">No active messages in registry</td>
                </tr>
              ) : (
                announcementsList.map((ann, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-all group cursor-pointer border-l-4 border-transparent hover:border-primary">
                    <td className="py-8 px-10">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-white uppercase tracking-tight font-sans">{new Date(ann.createdAt || new Date()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        <span className="text-[9px] font-bold text-text-muted uppercase tracking-[0.1em] opacity-40 font-sans">{new Date(ann.createdAt || new Date()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </td>
                    <td className="py-8 px-10">
                      <div className="max-w-lg space-y-1.5">
                        <p className="text-xl font-bold text-white tracking-tight uppercase leading-none font-display group-hover:text-primary transition-colors">{ann.title}</p>
                        <p className="text-sm text-text-muted font-medium line-clamp-1 opacity-50 leading-relaxed font-sans">{ann.content}</p>
                      </div>
                    </td>
                    <td className="py-8 px-10 text-center">
                      <span className={`px-5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] border transition-all font-sans
                        ${ann.priority === 'alert' ? 'bg-red-500/5 text-red-400 border-red-500/10' : 
                          ann.priority === 'success' ? 'bg-green-500/5 text-green-400 border-green-500/10' : 'bg-primary/5 text-primary border-primary/10'}`}>
                        {ann.priority}
                      </span>
                    </td>
                    <td className="py-8 px-10 text-right">
                      <div className="flex items-center justify-end gap-4 translate-x-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                        <form action={deleteAnnouncement.bind(null, ann.id)}>
                          <button type="submit" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-xl flex items-center justify-center group/del">
                            <span className="material-symbols-outlined text-lg group-hover/del:scale-110 transition-transform">delete_sweep</span>
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
