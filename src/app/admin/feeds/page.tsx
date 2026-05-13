import { getFeeds } from '@/app/actions/queries';
import { createFeed, deleteFeed } from '@/app/actions/mutations';

export const revalidate = 0;

export default async function AdminFeedsPage() {
  const feedItems = await getFeeds();

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tight leading-none text-on-surface">Content Stream</h1>
          <p className="text-xs text-on-surface-variant font-medium opacity-60 italic">{feedItems.length} active transmissions in the district feed.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Create Feed Form */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl p-10 sticky top-12 shadow-primary/5">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                 <span className="material-symbols-outlined text-xl">broadcast_on_home</span>
               </div>
               <h2 className="text-sm font-black uppercase tracking-widest text-on-surface">Publish Transmission</h2>
            </div>
            
            <form action={createFeed} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-60">Headline</label>
                <input name="title" type="text" required placeholder="PROTOCOL_INIT..." className="w-full bg-surface-container-low border-none rounded-2xl p-4 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:opacity-30" />
              </div>
              
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-60">Classification</label>
                <select name="type" className="w-full bg-surface-container-low border-none rounded-2xl p-4 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
                  <option value="post">Pulse Post</option>
                  <option value="news">District News</option>
                  <option value="announcement">Global Broadcast</option>
                  <option value="event">Operation Update</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-60">Data Payload</label>
                <textarea name="content" required rows={6} placeholder="Enter message payload..." className="w-full bg-surface-container-low border-none rounded-2xl p-4 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:opacity-30 resize-none"></textarea>
              </div>
              
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-60">Media Uplink (URL)</label>
                <input name="mediaUrl" type="url" placeholder="https://cdn.rotaract.org/..." className="w-full bg-surface-container-low border-none rounded-2xl p-4 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:opacity-30" />
              </div>
              
              <button type="submit" className="w-full bg-primary text-white font-black text-xs uppercase tracking-[0.25em] py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 mt-4 flex items-center justify-center gap-3">
                Authorize Broadcast
                <span className="material-symbols-outlined text-base">send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Feed List */}
        <div className="lg:col-span-2 space-y-6">
          {feedItems.length === 0 ? (
            <div className="bg-surface-container-low/50 rounded-[3rem] border border-dashed border-outline/20 py-32 text-center">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/20 mb-4 block">leak_add</span>
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 italic">Frequency Silent. No transmissions found.</p>
            </div>
          ) : (
            feedItems.map((feed) => (
              <div key={feed.id} className="group bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 flex items-start gap-8 hover:shadow-2xl hover:shadow-primary/5 transition-all relative overflow-hidden">
                {/* Decorative status bar */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${
                  feed.type === 'announcement' ? 'bg-amber-400' :
                  feed.type === 'news' ? 'bg-primary' : 'bg-on-surface/10'
                }`}></div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      feed.type === 'announcement' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      feed.type === 'news' ? 'bg-primary/5 text-primary border border-primary/10' :
                      'bg-surface-container-low text-on-surface-variant border border-outline/5'
                    }`}>
                      {feed.type || 'post'}
                    </span>
                    <span className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest italic">
                      {feed.createdAt ? new Date(feed.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      }) : '---'}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-on-surface uppercase tracking-tight group-hover:text-primary transition-colors">{feed.title}</h3>
                    <p className="text-sm font-medium text-on-surface-variant/80 leading-relaxed line-clamp-3">{feed.content}</p>
                  </div>

                  {feed.mediaUrl && (
                    <div className="flex items-center gap-2 pt-2">
                       <span className="material-symbols-outlined text-sm text-primary">link</span>
                       <p className="text-[10px] font-bold text-primary uppercase tracking-widest truncate max-w-[200px]">{feed.mediaUrl}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <form action={deleteFeed.bind(null, feed.id)}>
                    <button type="submit" className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all group-hover:shadow-lg group-hover:shadow-red-500/10">
                      <span className="material-symbols-outlined text-xl">delete_sweep</span>
                    </button>
                  </form>
                  <button className="w-12 h-12 rounded-2xl bg-surface-container-low text-on-surface-variant flex items-center justify-center hover:bg-on-surface hover:text-white transition-all">
                    <span className="material-symbols-outlined text-xl">edit_note</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

