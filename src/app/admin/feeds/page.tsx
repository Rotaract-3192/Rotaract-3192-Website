import { getFeeds } from '@/app/actions/queries';
import { createFeed, deleteFeed } from '@/app/actions/mutations';
import Image from 'next/image';

export const revalidate = 0;

export default async function AdminFeedsPage() {
  const feedItems = await getFeeds();

  return (
    <div className="space-y-16 pb-24">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Content Management</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Content <span className="text-primary not-italic">Stream.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            {feedItems.length} Active transmissions currently in the district network.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Create Feed Form */}
        <div className="lg:col-span-1">
          <div className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-10 lg:p-12 border border-outline-variant/30 shadow-ambient sticky top-12">
            <div className="flex items-center gap-5 mb-10">
               <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
                 <span className="material-symbols-outlined text-3xl">broadcast_on_home</span>
               </div>
               <div>
                 <h2 className="text-xl font-black font-display uppercase tracking-tight leading-none text-on-surface italic">Publish <span className="text-primary not-italic">Signal.</span></h2>
                 <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-[0.2em] opacity-40 mt-1 italic">AUTHORIZE NEW TRANSMISSION</p>
               </div>
            </div>
            
            <form action={createFeed} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-4 italic">Headline</label>
                <input 
                  name="title" 
                  type="text" 
                  required 
                  placeholder="TRANSMISSION_IDENTIFIER" 
                  className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-2xl py-5 px-8 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" 
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-4 italic">Classification Protocol</label>
                <div className="relative">
                  <select name="type" className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-2xl py-5 px-8 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer">
                    <option value="post" className="bg-surface">PULSE_POST</option>
                    <option value="news" className="bg-surface">DISTRICT_NEWS</option>
                    <option value="announcement" className="bg-surface">GLOBAL_BROADCAST</option>
                    <option value="event" className="bg-surface">OPERATION_UPDATE</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-4 italic">Data Payload</label>
                <textarea 
                  name="content" 
                  required 
                  rows={5} 
                  placeholder="Enter message payload and critical data..." 
                  className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-2xl py-6 px-8 text-sm font-medium text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all resize-none italic leading-relaxed placeholder:text-on-surface-variant/20"
                ></textarea>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-4 italic">Media Uplink (URL)</label>
                <input 
                  name="mediaUrl" 
                  type="url" 
                  placeholder="HTTPS://STORAGE.DISTRICT3192.ORG/..." 
                  className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-2xl py-5 px-8 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" 
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] py-6 rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group mt-4"
              >
                Authorize Broadcast
                <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Feed Monitor */}
        <div className="lg:col-span-2 space-y-10">
          <div className="flex items-center justify-between px-6">
             <div>
                <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">Signal <span className="text-primary not-italic">Log.</span></h2>
                <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-[0.4em] opacity-40 mt-2 italic">LIVE TRANSMISSION MONITORING</p>
             </div>
          </div>

          <div className="space-y-8">
            {feedItems.length === 0 ? (
              <div className="bg-surface-container-low/30 rounded-[4rem] border border-outline-variant/30 py-40 text-center space-y-8 border-dashed">
                <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center mx-auto border border-outline-variant/30">
                  <span className="material-symbols-outlined text-5xl text-on-surface-variant/20">broadcast_on_personal</span>
                </div>
                <p className="text-[11px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">FREQUENCY SILENT • NO ACTIVE SIGNALS</p>
              </div>
            ) : (
              feedItems.map((feed) => (
                <div key={feed.id} className="group bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] border border-outline-variant/30 p-10 flex flex-col gap-8 hover:bg-white hover:shadow-ambient transition-all duration-700 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-[12px] h-full transition-colors duration-700 ${
                    feed.type === 'announcement' ? 'bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)]' :
                    feed.type === 'news' ? 'bg-primary shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)]' : 'bg-outline-variant/30'
                  }`}></div>

                  <div className="space-y-6 pl-6">
                    <div className="flex items-center justify-between flex-wrap gap-6">
                      <div className="flex items-center gap-4">
                        <span className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] border transition-all italic ${
                          feed.type === 'announcement' ? 'bg-amber-400/5 text-amber-500 border-amber-400/20' :
                          feed.type === 'news' ? 'bg-primary/5 text-primary border-primary/10' :
                          'bg-surface-container-high text-on-surface-variant border border-outline-variant/30'
                        }`}>
                          {feed.type?.toUpperCase() || 'PULSE_SIGNAL'}
                        </span>
                        <div className="flex items-center gap-3 opacity-40">
                           <span className="material-symbols-outlined text-base">schedule</span>
                           <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest italic tabular-nums">
                             {feed.createdAt ? new Date(feed.createdAt).toLocaleDateString('en-IN', {
                               day: '2-digit',
                               month: 'short',
                               year: 'numeric',
                               hour: '2-digit',
                               minute: '2-digit'
                             }) : 'PROTOCOL_PENDING'}
                           </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 translate-x-12 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                        <button className="w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant/30 text-on-surface-variant/40 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-xl">
                          <span className="material-symbols-outlined text-xl">edit_note</span>
                        </button>
                        <form action={deleteFeed.bind(null, feed.id)}>
                          <button type="submit" className="w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant/30 text-error/30 hover:bg-error hover:text-white hover:border-error transition-all shadow-xl hover:shadow-error/20 flex items-center justify-center group/del">
                            <span className="material-symbols-outlined text-xl group-hover/del:scale-110 transition-transform">delete_sweep</span>
                          </button>
                        </form>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-on-surface uppercase tracking-tight font-display italic group-hover:text-primary transition-colors leading-none">{feed.title}</h3>
                      <p className="text-sm font-medium text-on-surface-variant opacity-60 leading-relaxed italic max-w-3xl">"{feed.content}"</p>
                    </div>

                    {feed.mediaUrl && (
                      <div className="flex items-center gap-4 bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10 w-fit group/uplink cursor-pointer hover:bg-primary transition-all">
                         <span className="material-symbols-outlined text-base text-primary group-hover/uplink:text-white">link</span>
                         <p className="text-[10px] font-black text-primary uppercase tracking-widest truncate max-w-[250px] italic group-hover/uplink:text-white">UPLINK: {feed.mediaUrl}</p>
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
