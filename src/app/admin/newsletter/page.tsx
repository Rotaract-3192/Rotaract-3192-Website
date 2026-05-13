import { getNewsletters } from '@/app/actions/queries';
import { createNewsletter, deleteNewsletter } from '@/app/actions/mutations';
import Image from 'next/image';

export const revalidate = 0;

export default async function AdminNewsletterPage() {
  const newsletters = await getNewsletters();

  return (
    <div className="space-y-16 pb-24">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Bulletin Dispatch</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Newsletter <span className="text-primary not-italic">Vault.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            Manage District Publications & Periodic Dispatches
          </p>
        </div>
      </header>

      {/* Create Newsletter Form */}
      <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
        <div className="flex items-center gap-8 mb-12">
           <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
              <span className="material-symbols-outlined text-4xl">newspaper</span>
           </div>
           <div>
              <h2 className="text-3xl font-black font-display uppercase tracking-tight leading-none text-on-surface italic">Publish New <span className="text-primary not-italic">Edition.</span></h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.3em] opacity-40 mt-3 italic">Broadcast New District Literature to All Nodes</p>
           </div>
        </div>

        <form action={createNewsletter} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Edition Designation (Title)</label>
              <input 
                name="title" 
                type="text" 
                required 
                placeholder="EDITION TITLE" 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" 
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Chronology Marker (Issue Date)</label>
              <input 
                name="issueDate" 
                type="date" 
                required 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all uppercase tracking-widest" 
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Document Payload URL (PDF)</label>
              <input 
                name="fileUrl" 
                type="url" 
                placeholder="HTTPS://STORAGE.DISTRICT3192.ORG/..." 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" 
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Visual Identifier (Cover URL)</label>
              <input 
                name="thumbnailUrl" 
                type="url" 
                placeholder="HTTPS://STORAGE.DISTRICT3192.ORG/COVER.JPG" 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" 
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              className="bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] px-16 py-6 rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group"
            >
              <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">publish</span>
              Execute Dispatch
            </button>
          </div>
        </form>
      </section>

      {/* Dispatch Registry Grid */}
      <section className="space-y-10">
        <div className="flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">Dispatch <span className="text-primary not-italic">Registry.</span></h2>
              <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-[0.4em] opacity-40 mt-2 italic">HISTORICAL PUBLICATION MONITORING</p>
           </div>
           <div className="text-[10px] font-black text-primary bg-primary/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-primary/10 italic">{newsletters.length} Editions Synchronized</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {newsletters.length === 0 ? (
            <div className="col-span-2 bg-surface-container-low/30 rounded-[4rem] border border-outline-variant/30 py-40 text-center space-y-8 border-dashed">
              <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center mx-auto border border-outline-variant/30">
                <span className="material-symbols-outlined text-5xl text-on-surface-variant/20">newspaper</span>
              </div>
              <p className="text-[11px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">NO PERIODIC DISPATCHES IDENTIFIED IN REGISTRY</p>
            </div>
          ) : (
            newsletters.map((nl) => (
              <div key={nl.id} className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] border border-outline-variant/30 p-8 flex items-center gap-10 group hover:bg-white hover:shadow-ambient transition-all duration-700 relative overflow-hidden border-l-[12px] border-l-transparent hover:border-l-primary">
                 <div className="relative shrink-0">
                    {nl.thumbnailUrl ? (
                      <img src={nl.thumbnailUrl} alt={nl.title} className="w-32 h-44 rounded-2xl object-cover border border-outline-variant/30 shadow-xl group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0" />
                    ) : (
                      <div className="w-32 h-44 rounded-2xl bg-surface-container-high flex items-center justify-center border border-outline-variant/30 shadow-inner">
                        <span className="material-symbols-outlined text-5xl text-on-surface/10 group-hover:scale-125 transition-transform duration-700">auto_stories</span>
                      </div>
                    )}
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-[11px] font-black shadow-xl border-2 border-white italic">
                       {nl.id.slice(-2).toUpperCase()}
                    </div>
                 </div>
                 
                 <div className="flex-1 space-y-6">
                    <div className="space-y-3">
                       <h3 className="text-2xl font-black text-on-surface font-display uppercase tracking-tighter group-hover:text-primary transition-colors italic leading-none">{nl.title}</h3>
                       <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.3em] opacity-40 italic">
                         {nl.issueDate ? new Date(nl.issueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : 'PROTOCOL_PENDING'}
                       </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                       {nl.fileUrl && (
                         <a href={nl.fileUrl} target="_blank" className="px-8 py-3 rounded-xl bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] border border-primary/10 hover:bg-primary hover:text-white transition-all italic flex items-center gap-3 group/link">
                           <span className="material-symbols-outlined text-lg group-hover/link:rotate-12 transition-transform">picture_as_pdf</span>
                           ACCESS_DISPATCH
                         </a>
                       )}
                       <form action={deleteNewsletter.bind(null, nl.id)} className="translate-x-12 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                         <button type="submit" className="w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant/30 text-error/30 hover:bg-error hover:text-white hover:border-error transition-all shadow-xl hover:shadow-error/20 flex items-center justify-center group/del">
                           <span className="material-symbols-outlined text-xl group-hover/del:scale-110 transition-transform">delete_forever</span>
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
