import { getAnnouncements } from '@/app/actions/queries';
import { createAnnouncement } from '@/app/actions/mutations';

export const revalidate = 0;

export default async function AdminAnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tight leading-none">Signal Hub</h1>
          <p className="text-xs text-on-surface-variant font-medium opacity-60 italic">Omni-Channel Broadcast Terminal — {announcements.length} sent</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-100">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           <span className="text-[9px] font-bold uppercase tracking-widest">Network Ready</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form Section */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 border border-white shadow-2xl shadow-primary/5">
            <form action={createAnnouncement} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Priority</label>
                  <select name="priority" className="w-full bg-surface-container-low border border-outline/10 rounded-xl p-4 font-bold text-sm text-on-surface focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all appearance-none cursor-pointer">
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Title / Subject</label>
                  <input type="text" name="title" required placeholder="Announcement title..." className="w-full bg-surface-container-low border border-outline/10 rounded-xl p-4 font-bold text-sm text-on-surface focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all placeholder-on-surface-variant/30" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Message Body</label>
                <textarea rows={5} name="content" required placeholder="Write your announcement message here..." className="w-full bg-surface-container-low border border-outline/10 rounded-2xl p-5 font-bold text-sm text-on-surface focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all placeholder-on-surface-variant/30"></textarea>
              </div>

              <button type="submit" className="w-full bg-primary text-white font-black py-4 rounded-xl uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-lg">send</span>
                Broadcast Announcement
              </button>
            </form>
          </div>
        </div>

        {/* History Section */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-primary">Broadcast History</h3>
            <span className="text-[10px] font-bold text-on-surface-variant italic opacity-60">{announcements.length} total</span>
          </div>

          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            {announcements.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant/50 text-xs font-bold uppercase tracking-widest">
                No announcements sent yet.
              </div>
            ) : (
              announcements.map((ann) => (
                <div key={ann.id} className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest shrink-0
                      ${ann.priority === 'urgent' ? 'bg-red-50 text-red-600' : 
                        ann.priority === 'high' ? 'bg-amber-50 text-amber-600' : 'bg-primary/10 text-primary'}`}>
                      {ann.priority}
                    </span>
                    <p className="text-[9px] text-on-surface-variant opacity-50 shrink-0">
                      {ann.createdAt ? new Date(ann.createdAt).toLocaleDateString() : ''}
                    </p>
                  </div>
                  <h4 className="text-sm font-black text-on-surface uppercase tracking-tight leading-tight mb-1">{ann.title}</h4>
                  <p className="text-xs text-on-surface-variant opacity-60 line-clamp-2">{ann.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
