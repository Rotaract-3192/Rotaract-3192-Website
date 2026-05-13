import { getNewsletters } from '@/app/actions/queries';
import { createNewsletter, deleteNewsletter } from '@/app/actions/mutations';

export const revalidate = 0;

export default async function AdminNewsletterPage() {
  const newsletters = await getNewsletters();

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none text-on-surface">Bulletin Dispatch</h1>
          <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-[0.3em] opacity-40 italic">Manage District Publications & Periodic Dispatches</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Publisher Stream Active</span>
          </div>
        </div>
      </header>

      {/* Create Newsletter Form */}
      <section className="bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white p-12 shadow-2xl shadow-primary/5">
        <div className="flex items-center gap-5 mb-12">
           <div className="w-14 h-14 rounded-[1.25rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <span className="material-symbols-outlined text-3xl">newspaper</span>
           </div>
           <div>
              <h2 className="text-2xl font-black uppercase tracking-tight leading-none text-on-surface">Publish New Edition</h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em] opacity-40 mt-2 italic">Broadcast New District Literature to All Nodes</p>
           </div>
        </div>

        <form action={createNewsletter} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Edition Designation (Title)</label>
            <input
              name="title"
              type="text"
              required
              placeholder="e.g. ROTARACT DISPATCH — ISSUE 12"
              className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Chronology Marker (Issue Date)</label>
            <input
              name="issueDate"
              type="date"
              required
              className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Document Payload URL (PDF)</label>
            <input
              name="fileUrl"
              type="url"
              placeholder="https://storage.district3192.org/bulletin-12.pdf"
              className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Visual Identifier (Cover Image URL)</label>
            <input
              name="thumbnailUrl"
              type="url"
              placeholder="https://storage.district3192.org/cover-12.jpg"
              className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20"
            />
          </div>
          <div className="md:col-span-2 flex justify-end pt-4">
            <button
              type="submit"
              className="bg-primary text-white font-black uppercase tracking-[0.2em] text-[11px] px-16 py-6 rounded-[1.5rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
            >
              <span className="material-symbols-outlined text-xl">publish</span>
              Execute Dispatch
            </button>
          </div>
        </form>
      </section>

      {/* Newsletters List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {newsletters.length === 0 ? (
          <div className="col-span-2 py-32 text-center text-[10px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">No periodic dispatches identified in registry.</div>
        ) : (
          newsletters.map((nl) => (
            <div
              key={nl.id}
              className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-xl p-8 flex items-center gap-8 group hover:shadow-2xl hover:bg-white transition-all border-l-4 border-l-transparent hover:border-l-primary"
            >
              <div className="relative shrink-0">
                {nl.thumbnailUrl ? (
                  <img
                    src={nl.thumbnailUrl}
                    alt={nl.title}
                    className="w-24 h-32 rounded-2xl object-cover border border-outline/10 shadow-lg group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="w-24 h-32 rounded-2xl bg-surface-container-low flex items-center justify-center border border-outline/5 shadow-inner">
                    <span className="material-symbols-outlined text-4xl text-on-surface/10">auto_stories</span>
                  </div>
                )}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-black shadow-lg">
                   {nl.id.slice(-2).toUpperCase()}
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-black text-on-surface uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{nl.title}</h3>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-[0.2em] opacity-40 mt-1 italic">
                    {nl.issueDate ? new Date(nl.issueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : 'PROTOCOL_PENDING'}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  {nl.fileUrl && (
                    <a
                      href={nl.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-xl bg-primary/5 text-primary text-[9px] font-black uppercase tracking-[0.2em] border border-primary/10 hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                      ACCESS_DISPATCH
                    </a>
                  )}
                  <form action={deleteNewsletter.bind(null, nl.id)}>
                    <button
                      type="submit"
                      className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-red-100 opacity-0 group-hover:opacity-100 shadow-lg hover:shadow-red-500/20"
                    >
                      <span className="material-symbols-outlined text-lg">delete_forever</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
