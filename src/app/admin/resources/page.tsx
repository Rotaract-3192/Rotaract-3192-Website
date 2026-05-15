import { getResources } from '@/app/actions/queries';
import { deleteResource, uploadResource } from '@/app/actions/mutations';
import Image from 'next/image';

export const revalidate = 0;

export default async function AdminResourcesPage() {
  const resources = await getResources();

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Asset Repository</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            District <span className="text-primary">Resources</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Manage district digital assets, documents, and public repositories.
          </p>
        </div>
      </header>

      {/* Register Resource Form */}
      <section className="glass-panel p-10 lg:p-14 relative overflow-hidden">
        <div className="flex items-center gap-8 mb-12">
           <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <span className="material-symbols-outlined text-3xl">cloud_upload</span>
           </div>
           <div>
              <h2 className="text-3xl font-bold font-display uppercase tracking-tight leading-none text-white">Upload <span className="text-primary">Asset</span></h2>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] opacity-40 mt-3 font-sans">Register a new digital resource to the district vault</p>
           </div>
        </div>

        <form action={uploadResource} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-3 lg:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Resource Name</label>
              <input 
                name="fileName" 
                type="text" 
                required 
                placeholder="Enter display name..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Category</label>
              <div className="relative">
                <select name="category" className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer font-sans">
                  <option value="Club Administration" className="bg-[#0A0F1C]">Club Admin</option>
                  <option value="Branding & PR" className="bg-[#0A0F1C]">Branding & PR</option>
                  <option value="District Forms" className="bg-[#0A0F1C]">District Forms</option>
                  <option value="Reports" className="bg-[#0A0F1C]">Reports</option>
                  <option value="Media" className="bg-[#0A0F1C]">Media Assets</option>
                  <option value="General" className="bg-[#0A0F1C]">General</option>
                </select>
                <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
              </div>
            </div>
            <div className="space-y-3 lg:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">R2 Object Key</label>
              <input 
                name="r2Key" 
                type="text" 
                required 
                placeholder="path/to/resource.pdf" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">File Type</label>
              <div className="relative">
                <select name="mimeType" className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer font-sans">
                  <option value="application/pdf" className="bg-[#0A0F1C]">PDF Document</option>
                  <option value="application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="bg-[#0A0F1C]">Word Doc</option>
                  <option value="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" className="bg-[#0A0F1C]">Excel Sheet</option>
                  <option value="image/png" className="bg-[#0A0F1C]">PNG Image</option>
                  <option value="image/jpeg" className="bg-[#0A0F1C]">JPEG Image</option>
                  <option value="application/zip" className="bg-[#0A0F1C]">ZIP Archive</option>
                </select>
                <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">File Size (Bytes)</label>
              <input 
                name="fileSize" 
                type="number" 
                required 
                min="1" 
                placeholder="Enter size..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" 
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="bg-primary text-white font-bold uppercase tracking-[0.4em] text-[11px] px-14 py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group font-sans"
            >
              <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">database</span>
              Register Asset
            </button>
          </div>
        </form>
      </section>

      {/* Asset Registry Table */}
      <section className="glass-panel overflow-hidden">
        <div className="px-10 py-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display">Asset <span className="text-primary">Registry</span></h2>
              <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.4em] opacity-40 mt-2 font-sans">Live Resource Monitor</p>
           </div>
           <div className="text-[10px] font-bold text-primary bg-primary/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-primary/10 font-sans">{resources.length} Items Indexed</div>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Category</th>
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Resource Designation</th>
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] text-center font-sans">Size</th>
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] text-right font-sans">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {resources.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-40 text-center text-[10px] font-bold text-text-muted/20 uppercase tracking-[0.5em] font-sans">No digital assets found in repository</td>
                </tr>
              ) : (
                resources.map((res) => (
                  <tr key={res.id} className="hover:bg-white/5 transition-all group cursor-default border-l-4 border-transparent hover:border-primary">
                    <td className="py-8 px-10">
                      <span className="px-5 py-1.5 rounded-lg text-[9px] font-bold text-primary bg-primary/5 uppercase tracking-[0.2em] border border-primary/10 font-sans">
                        {res.category ?? 'Unclassified'}
                      </span>
                    </td>
                    <td className="py-8 px-10">
                      <div className="max-w-md space-y-2">
                        <p className="text-lg font-bold text-white uppercase tracking-tight font-display group-hover:text-primary transition-colors leading-none">{res.fileName}</p>
                        <p className="text-[9px] text-text-muted opacity-30 uppercase tracking-[0.1em] font-sans lowercase">Key: {res.r2Key}</p>
                      </div>
                    </td>
                    <td className="py-8 px-10 text-center">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-white uppercase tracking-widest font-sans">{(res.fileSize / 1024).toFixed(1)} KB</span>
                        <span className="text-[9px] font-bold text-text-muted opacity-20 uppercase tracking-[0.1em] font-sans">{res.createdAt ? new Date(res.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : ''}</span>
                      </div>
                    </td>
                    <td className="py-8 px-10 text-right">
                      <div className="flex items-center justify-end gap-4 translate-x-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                        <form action={deleteResource.bind(null, res.id)}>
                          <button type="submit" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all group/del">
                            <span className="material-symbols-outlined text-lg group-hover/del:scale-110 transition-transform">delete</span>
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
