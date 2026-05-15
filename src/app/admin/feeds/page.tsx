import { getFeeds } from '@/app/actions/queries';
import { createFeed, deleteFeed } from '@/app/actions/mutations';
import Image from 'next/image';

export const revalidate = 0;

export default async function AdminFeedsPage() {
  const feedItems = await getFeeds();

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Content Manager</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            District <span className="text-primary">Feed</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {feedItems.length} active updates in the district network.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Create Feed Form */}
        <div className="lg:col-span-4">
          <div className="glass-panel p-10 lg:p-12 sticky top-12">
            <div className="flex items-center gap-5 mb-10">
               <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                 <span className="material-symbols-outlined text-3xl">post_add</span>
               </div>
               <div>
                 <h2 className="text-xl font-bold font-display uppercase tracking-tight leading-none text-white">Create <span className="text-primary">Post</span></h2>
                 <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.2em] opacity-40 mt-2 font-sans">Share a new update to the district</p>
               </div>
            </div>
            
            <form action={createFeed} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Headline</label>
                <input 
                  name="title" 
                  type="text" 
                  required 
                  placeholder="Enter title..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" 
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Category</label>
                <div className="relative">
                  <select name="type" className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer font-sans">
                    <option value="post" className="bg-[#0A0F1C]">General Post</option>
                    <option value="news" className="bg-[#0A0F1C]">District News</option>
                    <option value="announcement" className="bg-[#0A0F1C]">Announcement</option>
                    <option value="event" className="bg-[#0A0F1C]">Event Update</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Message Body</label>
                <textarea 
                  name="content" 
                  required 
                  rows={5} 
                  placeholder="Draft your message..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-6 px-8 text-sm font-medium text-white focus:border-primary/50 outline-none transition-all resize-none leading-relaxed placeholder:text-white/20 font-sans"
                ></textarea>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Media Link (URL)</label>
                <input 
                  name="mediaUrl" 
                  type="url" 
                  placeholder="https://..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" 
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-primary text-white font-bold uppercase tracking-[0.4em] text-[11px] py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group mt-4 font-sans"
              >
                Post Update
                <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Feed Monitor */}
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center justify-between px-6">
             <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display">Update <span className="text-primary">Stream</span></h2>
                <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.4em] opacity-40 mt-2 font-sans">Live District Activity</p>
             </div>
          </div>

          <div className="space-y-8">
            {feedItems.length === 0 ? (
              <div className="glass-panel py-40 text-center space-y-8 border-dashed">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                  <span className="material-symbols-outlined text-5xl text-white/10">feed</span>
                </div>
                <p className="text-[11px] font-bold text-text-muted/20 uppercase tracking-[0.5em] font-sans">No updates found in feed</p>
              </div>
            ) : (
              feedItems.map((feed) => (
                <div key={feed.id} className="group glass-panel p-10 flex flex-col gap-8 hover:bg-white/5 transition-all duration-700 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-[6px] h-full transition-colors duration-700 ${
                    feed.type === 'announcement' ? 'bg-amber-400' :
                    feed.type === 'news' ? 'bg-primary' : 'bg-white/10'
                  }`}></div>

                  <div className="space-y-6 pl-6">
                    <div className="flex items-center justify-between flex-wrap gap-6">
                      <div className="flex items-center gap-4">
                        <span className={`px-5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] border transition-all font-sans ${
                          feed.type === 'announcement' ? 'bg-amber-400/5 text-amber-400 border-amber-400/20' :
                          feed.type === 'news' ? 'bg-primary/5 text-primary border-primary/10' :
                          'bg-white/5 text-text-muted border border-white/10'
                        }`}>
                          {feed.type?.toUpperCase() || 'POST'}
                        </span>
                        <div className="flex items-center gap-3 opacity-40">
                           <span className="material-symbols-outlined text-sm">schedule</span>
                           <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest tabular-nums font-sans">
                             {feed.createdAt ? new Date(feed.createdAt).toLocaleDateString('en-IN', {
                               day: '2-digit',
                               month: 'short',
                               year: 'numeric',
                               hour: '2-digit',
                               minute: '2-digit'
                             }) : 'Pending...'}
                           </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 translate-x-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                        <form action={deleteFeed.bind(null, feed.id)}>
                          <button type="submit" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-xl flex items-center justify-center group/del">
                            <span className="material-symbols-outlined text-lg group-hover/del:scale-110 transition-transform">delete</span>
                          </button>
                        </form>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-white uppercase tracking-tight font-display group-hover:text-primary transition-colors leading-none">{feed.title}</h3>
                      <p className="text-sm font-medium text-text-muted opacity-60 leading-relaxed font-sans">{feed.content}</p>
                    </div>

                    {feed.mediaUrl && (
                      <div className="flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-xl border border-primary/10 w-fit group/uplink hover:bg-primary transition-all">
                         <span className="material-symbols-outlined text-sm text-primary group-hover/uplink:text-white">link</span>
                         <p className="text-[10px] font-bold text-primary uppercase tracking-widest truncate max-w-[250px] group-hover/uplink:text-white font-sans">View Media</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
