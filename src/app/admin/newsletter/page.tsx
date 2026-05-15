import { getNewsletters } from '@/app/actions/queries';
import { createNewsletter, deleteNewsletter } from '@/app/actions/mutations';
import Image from 'next/image';

export const revalidate = 0;

export default async function AdminNewsletterPage() {
  const newsletters = await getNewsletters();

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Bulletin Dispatch</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            District <span className="text-primary">Newsletters</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Manage district publications and periodic newsletters.
          </p>
        </div>
      </header>

      {/* Create Newsletter Form */}
      <section className="glass-panel p-10 lg:p-14 relative overflow-hidden">
        <div className="flex items-center gap-8 mb-12">
           <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <span className="material-symbols-outlined text-3xl">newspaper</span>
           </div>
           <div>
              <h2 className="text-3xl font-bold font-display uppercase tracking-tight leading-none text-white">Publish <span className="text-primary">Edition</span></h2>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] opacity-40 mt-3 font-sans">Release a new district newsletter edition</p>
           </div>
        </div>

        <form action={createNewsletter} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Newsletter Title</label>
              <input 
                name="title" 
                type="text" 
                required 
                placeholder="Enter edition title..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Issue Date</label>
              <input 
                name="issueDate" 
                type="date" 
                required 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all uppercase tracking-widest font-sans" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Document URL (PDF)</label>
              <input 
                name="fileUrl" 
                type="url" 
                placeholder="https://example.com/newsletter.pdf" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Thumbnail URL (Cover)</label>
              <input 
                name="thumbnailUrl" 
                type="url" 
                placeholder="https://example.com/cover.jpg" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" 
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="bg-primary text-white font-bold uppercase tracking-[0.4em] text-[11px] px-14 py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group font-sans"
            >
              <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">publish</span>
              Dispatch Newsletter
            </button>
          </div>
        </form>
      </section>

      {/* Dispatch Registry Grid */}
      <section className="space-y-10">
        <div className="flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display">Edition <span className="text-primary">Logs</span></h2>
              <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.4em] opacity-40 mt-2 font-sans">Historical Publication Registry</p>
           </div>
           <div className="text-[10px] font-bold text-primary bg-primary/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-primary/10 font-sans">{newsletters.length} Editions Released</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {newsletters.length === 0 ? (
            <div className="col-span-2 glass-panel py-40 text-center space-y-8">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                <span className="material-symbols-outlined text-4xl text-text-muted/20">newspaper</span>
              </div>
              <p className="text-[10px] font-bold text-text-muted/20 uppercase tracking-[0.5em] font-sans">No newsletter editions released yet</p>
            </div>
          ) : (
            newsletters.map((nl) => (
              <div key={nl.id} className="glass-panel p-8 flex items-center gap-10 group hover:bg-white/5 hover:shadow-2xl transition-all duration-700 relative overflow-hidden border-l-4 border-l-transparent hover:border-l-primary">
                 <div className="relative shrink-0">
                    {nl.thumbnailUrl ? (
                      <img src={nl.thumbnailUrl} alt={nl.title} className="w-28 h-40 rounded-xl object-cover border border-white/10 shadow-xl group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100" />
                    ) : (
                      <div className="w-28 h-40 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                        <span className="material-symbols-outlined text-4xl text-primary/10 group-hover:scale-125 transition-transform duration-700">auto_stories</span>
                      </div>
                    )}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shadow-xl border border-white/20">
                       {nl.id.slice(-2).toUpperCase()}
                    </div>
                 </div>
                 
                 <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                       <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight group-hover:text-primary transition-colors leading-none">{nl.title}</h3>
                       <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.3em] opacity-40 font-sans">
                         {nl.issueDate ? new Date(nl.issueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Date Pending'}
                       </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                       {nl.fileUrl && (
                         <a href={nl.fileUrl} target="_blank" className="px-6 py-2.5 rounded-xl bg-primary/5 text-primary text-[9px] font-bold uppercase tracking-[0.3em] border border-primary/10 hover:bg-primary hover:text-white transition-all flex items-center gap-3 group/link font-sans">
                           <span className="material-symbols-outlined text-base group-hover/link:rotate-12 transition-transform">picture_as_pdf</span>
                           View PDF
                         </a>
                       )}
                       <form action={deleteNewsletter.bind(null, nl.id)} className="translate-x-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                         <button type="submit" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all group/del">
                           <span className="material-symbols-outlined text-lg group-hover/del:scale-110 transition-transform">delete</span>
                         </button>
                       </form>
                    </div>
                 </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
