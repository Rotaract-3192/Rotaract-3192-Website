import { getJobs } from '@/app/actions/queries';
import { createJob, deleteJob } from '@/app/actions/mutations';
import Image from 'next/image';

export const revalidate = 0;

export default async function AdminJobsPage() {
  const jobItems = await getJobs();

  return (
    <div className="space-y-16 pb-24">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Opportunity Registry</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Career <span className="text-primary not-italic">Pipeline.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            Manage Professional Opportunities & Talent Streams
          </p>
        </div>
      </header>

      {/* Post New Job Form */}
      <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
        <div className="flex items-center gap-8 mb-12">
           <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
              <span className="material-symbols-outlined text-4xl">work_history</span>
           </div>
           <div>
              <h2 className="text-3xl font-black font-display uppercase tracking-tight leading-none text-on-surface italic">Initialize <span className="text-primary not-italic">Listing.</span></h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.3em] opacity-40 mt-3 italic">Broadcast New Professional Signal to District Network</p>
           </div>
        </div>

        <form action={createJob} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="space-y-4 lg:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Role Designation (Title)</label>
              <input 
                name="title" 
                type="text" 
                required 
                placeholder="PRINCIPAL ENGINEER / LEAD" 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" 
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Enterprise Entity</label>
              <input 
                name="company" 
                type="text" 
                placeholder="COMPANY NAME" 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" 
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Geographic Node</label>
              <input 
                name="location" 
                type="text" 
                placeholder="BENGALURU / REMOTE" 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" 
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Engagement Protocol</label>
              <div className="relative">
                <select 
                  name="type" 
                  className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer"
                >
                  <option value="Full-time" className="bg-surface">FULL-TIME</option>
                  <option value="Part-time" className="bg-surface">PART-TIME</option>
                  <option value="Internship" className="bg-surface">INTERNSHIP</option>
                  <option value="Freelance" className="bg-surface">FREELANCE</option>
                  <option value="Volunteer" className="bg-surface">VOLUNTEER</option>
                </select>
                <span className="material-symbols-outlined absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
              </div>
            </div>
            <div className="space-y-4 lg:col-span-3">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Application Vector (URL)</label>
              <input 
                name="applyUrl" 
                type="url" 
                placeholder="HTTPS://CAREER-PORTAL.ENTITY.COM/APPLY" 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" 
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Technical Brief</label>
            <textarea 
              name="description" 
              rows={3}
              placeholder="Provide detailed role specifications and requirements..." 
              className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2.5rem] py-8 px-10 text-sm font-medium text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all resize-none italic leading-relaxed placeholder:text-on-surface-variant/20"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              className="bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] px-16 py-6 rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group"
            >
              <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">broadcast_on_home</span>
              Deploy Listing
            </button>
          </div>
        </form>
      </section>

      {/* Opportunity Registry Grid */}
      <section className="space-y-10">
        <div className="flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">Active <span className="text-primary not-italic">Opportunities.</span></h2>
              <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-[0.4em] opacity-40 mt-2 italic">LIVE TALENT STREAM MONITORING</p>
           </div>
           <div className="text-[10px] font-black text-primary bg-primary/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-primary/10 italic">{jobItems.length} Signatures Found</div>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {jobItems.length === 0 ? (
            <div className="bg-surface-container-low/30 rounded-[4rem] border border-outline-variant/30 py-40 text-center space-y-8 border-dashed">
              <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center mx-auto border border-outline-variant/30">
                <span className="material-symbols-outlined text-5xl text-on-surface-variant/20">work_off</span>
              </div>
              <p className="text-[11px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">NO ACTIVE OPPORTUNITIES DETECTED IN PIPELINE</p>
            </div>
          ) : (
            jobItems.map((job) => (
              <div key={job.id} className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] border border-outline-variant/30 p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 group hover:bg-white hover:shadow-ambient transition-all duration-700 relative overflow-hidden border-l-[12px] border-l-transparent hover:border-l-primary">
                 <div className="flex-1 space-y-8">
                    <div className="flex items-center gap-6 flex-wrap">
                       {job.type && (
                         <span className="px-6 py-2 bg-primary/5 text-primary rounded-xl text-[9px] font-black uppercase tracking-[0.3em] border border-primary/10 italic">
                           {job.type.toUpperCase()}
                         </span>
                       )}
                       <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-base">domain</span>
                          <span className="text-sm font-black text-on-surface uppercase tracking-tighter italic">{job.company || 'ANONYMOUS_ENTITY'}</span>
                       </div>
                       <div className="flex items-center gap-3 opacity-40">
                          <span className="material-symbols-outlined text-base">location_on</span>
                          <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest italic">{job.location || 'GLOBAL_REMOTE'}</span>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h3 className="text-3xl font-black text-on-surface font-display uppercase tracking-tighter group-hover:text-primary transition-colors italic leading-none">{job.title}</h3>
                       <p className="text-sm text-on-surface-variant font-medium line-clamp-2 opacity-50 italic leading-relaxed max-w-4xl">"{job.description || 'No detailed mission parameters provided for this professional opportunity.'}"</p>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                       {job.applyUrl && (
                         <a href={job.applyUrl} target="_blank" className="inline-flex items-center gap-4 text-[10px] text-primary font-black uppercase tracking-[0.4em] group/link italic">
                           Vector Access Point
                           <span className="material-symbols-outlined text-xl group-hover/link:translate-x-2 transition-transform">arrow_right_alt</span>
                         </a>
                       )}
                       <span className="text-[9px] font-black text-on-surface-variant/20 uppercase tracking-[0.4em] italic tabular-nums">SYNC_MARKER: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'UNKNOWN'}</span>
                    </div>
                 </div>

                 <form action={deleteJob.bind(null, job.id)} className="translate-x-12 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                   <button type="submit" className="w-16 h-16 rounded-[1.5rem] bg-surface-container-high border border-outline-variant/30 text-error/30 hover:bg-error hover:text-white hover:border-error transition-all shadow-xl hover:shadow-error/20 flex items-center justify-center group/del">
                     <span className="material-symbols-outlined text-2xl group-hover/del:scale-110 transition-transform">delete_sweep</span>
                   </button>
                 </form>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
