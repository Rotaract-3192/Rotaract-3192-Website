import { getResources } from '@/app/actions/queries';
import { deleteResource, uploadResource } from '@/app/actions/mutations';

export const revalidate = 0;

export default async function AdminResourcesPage() {
  const resources = await getResources();

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none text-on-surface">Information Nexus</h1>
          <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-[0.3em] opacity-40 italic">Manage District Asset Vault & Digital Repositories</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Nexus Connectivity Active</span>
          </div>
        </div>
      </header>

      {/* Register Resource Form */}
      <section className="bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white p-12 shadow-2xl shadow-primary/5">
        <div className="flex items-center gap-5 mb-12">
           <div className="w-14 h-14 rounded-[1.25rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <span className="material-symbols-outlined text-3xl">cloud_upload</span>
           </div>
           <div>
              <h2 className="text-2xl font-black uppercase tracking-tight leading-none text-on-surface">Register Asset</h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em] opacity-40 mt-2 italic">Index Metadata for R2 Synchronized Objects</p>
           </div>
        </div>

        <form action={uploadResource} className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">File Designation (Display Name)</label>
            <input name="fileName" type="text" required placeholder="e.g. DISTRICT_BYLAWS_2024.pdf" className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Classification Protocol</label>
            <div className="relative">
              <select name="category" className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="Club Administration">CLUB_ADMIN</option>
                <option value="Branding & PR">BRANDING_PR</option>
                <option value="District Forms">DISTRICT_FORMS</option>
                <option value="Reports">REPORTS_ARCHIVE</option>
                <option value="Media">MEDIA_ASSETS</option>
                <option value="General">UNCLASSIFIED</option>
              </select>
              <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-on-surface/20 pointer-events-none">expand_more</span>
            </div>
          </div>
          <div className="md:col-span-2 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">R2 Object Key (Bucket URI)</label>
            <input name="r2Key" type="text" required placeholder="e.g. resources/bylaws-2024.pdf" className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">MIME Signature</label>
            <div className="relative">
              <select name="mimeType" className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="application/pdf">PDF_BINARY</option>
                <option value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">DOCX_XML</option>
                <option value="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">XLSX_GRID</option>
                <option value="image/png">IMAGE_PNG</option>
                <option value="image/jpeg">IMAGE_JPEG</option>
                <option value="application/zip">ARCHIVE_ZIP</option>
              </select>
              <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-on-surface/20 pointer-events-none">expand_more</span>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Object Magnitude (Bytes)</label>
            <input name="fileSize" type="number" required min="1" placeholder="e.g. 1048576" className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20" />
          </div>
          <div className="md:col-span-2 flex items-end">
            <button type="submit" className="w-full bg-primary text-white font-black uppercase tracking-[0.2em] text-[11px] py-6 rounded-[1.5rem] shadow-2xl shadow-primary/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-4">
              <span className="material-symbols-outlined text-xl">database</span>
              Commit to Nexus
            </button>
          </div>
        </form>
      </section>

      {/* Asset Vault List */}
      <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] border border-white shadow-2xl overflow-hidden shadow-primary/5">
        <div className="px-12 py-10 border-b border-outline/5 bg-surface-container-lowest flex items-center justify-between">
           <h2 className="text-xl font-black text-on-surface uppercase tracking-tight">Active Asset Registry</h2>
           <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-40 italic">{resources.length} Nodes Indexed</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Classification</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Asset Designation</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Magnitude</th>
                <th className="py-8 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {resources.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-32 text-center text-[10px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">No digital assets identified in nexus registry</td>
                </tr>
              ) : (
                resources.map((res) => (
                  <tr key={res.id} className="hover:bg-primary/5 transition-all group border-l-4 border-transparent hover:border-primary">
                    <td className="py-8 px-12">
                      <span className="px-4 py-1.5 bg-primary/5 text-primary rounded-lg text-[9px] font-black uppercase tracking-widest border border-primary/10">
                        {res.category ?? 'UNCLASSIFIED'}
                      </span>
                    </td>
                    <td className="py-8 px-12">
                      <div className="flex flex-col gap-1">
                        <p className="text-base font-black text-on-surface tracking-tight uppercase leading-none group-hover:text-primary transition-colors">{res.fileName}</p>
                        <p className="text-[10px] text-on-surface-variant font-mono opacity-40 mt-1 italic">{res.r2Key}</p>
                      </div>
                    </td>
                    <td className="py-8 px-12">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-black text-on-surface-variant uppercase tracking-wide">{(res.fileSize / 1024).toFixed(1)} KB</span>
                        <span className="text-[9px] font-bold text-on-surface-variant/30 uppercase tracking-widest italic">{res.createdAt ? new Date(res.createdAt).toLocaleDateString() : ''}</span>
                      </div>
                    </td>
                    <td className="py-8 px-12 text-right">
                      <div className="flex items-center justify-end gap-3 translate-x-8 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                        <form action={deleteResource.bind(null, res.id)}>
                          <button type="submit" className="w-12 h-12 rounded-2xl bg-white border border-outline/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-xl hover:shadow-red-500/20">
                            <span className="material-symbols-outlined text-xl">delete_sweep</span>
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
      </div>
    </div>
  );
}

