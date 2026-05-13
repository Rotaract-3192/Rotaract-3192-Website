import { getResources } from '@/app/actions/queries';
import { deleteResource, uploadResource } from '@/app/actions/mutations';
import Image from 'next/image';

export const revalidate = 0;

export default async function AdminResourcesPage() {
  const resources = await getResources();

  return (
    <div className="space-y-16 pb-24">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Asset Management</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Information <span className="text-primary not-italic">Nexus.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            Manage District Asset Vault & Digital Repositories
          </p>
        </div>
      </header>

      {/* Register Resource Form */}
      <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
        <div className="flex items-center gap-8 mb-12">
           <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
              <span className="material-symbols-outlined text-4xl">cloud_upload</span>
           </div>
           <div>
              <h2 className="text-3xl font-black font-display uppercase tracking-tight leading-none text-on-surface italic">Register <span className="text-primary not-italic">Asset.</span></h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.3em] opacity-40 mt-3 italic">Index Metadata for R2 Synchronized Objects</p>
           </div>
        </div>

        <form action={uploadResource} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="space-y-4 lg:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">File Designation (Display Name)</label>
              <input 
                name="fileName" 
                type="text" 
                required 
                placeholder="MISSION CRITICAL FILE NAME" 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" 
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Classification Protocol</label>
              <div className="relative">
                <select name="category" className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer">
                  <option value="Club Administration" className="bg-surface">CLUB_ADMIN</option>
                  <option value="Branding & PR" className="bg-surface">BRANDING_PR</option>
                  <option value="District Forms" className="bg-surface">DISTRICT_FORMS</option>
                  <option value="Reports" className="bg-surface">REPORTS_ARCHIVE</option>
                  <option value="Media" className="bg-surface">MEDIA_ASSETS</option>
                  <option value="General" className="bg-surface">UNCLASSIFIED</option>
                </select>
                <span className="material-symbols-outlined absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
              </div>
            </div>
            <div className="space-y-4 lg:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">R2 Object Key (Bucket URI)</label>
              <input 
                name="r2Key" 
                type="text" 
                required 
                placeholder="RESOURCES/MISSION-ASSET.PDF" 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" 
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">MIME Signature</label>
              <div className="relative">
                <select name="mimeType" className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer">
                  <option value="application/pdf" className="bg-surface">PDF_BINARY</option>
                  <option value="application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="bg-surface">DOCX_XML</option>
                  <option value="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" className="bg-surface">XLSX_GRID</option>
                  <option value="image/png" className="bg-surface">IMAGE_PNG</option>
                  <option value="image/jpeg" className="bg-surface">IMAGE_JPEG</option>
                  <option value="application/zip" className="bg-surface">ARCHIVE_ZIP</option>
                </select>
                <span className="material-symbols-outlined absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Object Magnitude (Bytes)</label>
              <input 
                name="fileSize" 
                type="number" 
                required 
                min="1" 
                placeholder="MAGNITUDE" 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" 
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              className="bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] px-16 py-6 rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group"
            >
              <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">database</span>
              Commit to Nexus
            </button>
          </div>
        </form>
      </section>

      {/* Asset Registry Table */}
      <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] border border-outline-variant/30 shadow-ambient overflow-hidden">
        <div className="px-12 py-10 border-b border-outline-variant/30 bg-surface-container-high/30 flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">Active Asset <span className="text-primary not-italic">Registry.</span></h2>
              <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-[0.4em] opacity-40 mt-2 italic">LIVE NEXUS MONITORING</p>
           </div>
           <div className="text-[10px] font-black text-primary bg-primary/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-primary/10 italic">{resources.length} Nodes Indexed</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-high/20">
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 italic">Classification</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 italic">Asset Designation</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 italic text-center">Magnitude</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 text-right italic">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {resources.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-40 text-center text-[11px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">No digital assets identified in nexus</td>
                </tr>
              ) : (
                resources.map((res) => (
                  <tr key={res.id} className="hover:bg-white transition-all group cursor-pointer border-l-4 border-transparent hover:border-primary">
                    <td className="py-10 px-12">
                      <span className="px-6 py-2 rounded-xl text-[9px] font-black text-primary bg-primary/5 uppercase tracking-[0.3em] border border-primary/10 italic">
                        {res.category ?? 'UNCLASSIFIED'}
                      </span>
                    </td>
                    <td className="py-10 px-12">
                      <div className="max-w-md space-y-2">
                        <p className="text-xl font-black text-on-surface tracking-tight uppercase leading-none font-display italic group-hover:text-primary transition-colors">{res.fileName}</p>
                        <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-[0.2em] opacity-30 mt-1 italic lowercase">KEY: {res.r2Key}</p>
                      </div>
                    </td>
                    <td className="py-10 px-12 text-center">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-black text-on-surface uppercase tracking-tighter italic">{(res.fileSize / 1024).toFixed(1)} KB</span>
                        <span className="text-[9px] font-black text-on-surface-variant/30 uppercase tracking-[0.2em] italic">{res.createdAt ? new Date(res.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : ''}</span>
                      </div>
                    </td>
                    <td className="py-10 px-12 text-right">
                      <div className="flex items-center justify-end gap-4 translate-x-10 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                        <form action={deleteResource.bind(null, res.id)}>
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
