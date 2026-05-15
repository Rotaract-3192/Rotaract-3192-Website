import { getJobs } from '@/app/actions/queries';
import { createJob, deleteJob } from '@/app/actions/mutations';
import Image from 'next/image';

export const revalidate = 0;

export default async function AdminJobsPage() {
  const jobItems = await getJobs();

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Opportunity Registry</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            District <span className="text-primary">Careers</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Manage professional opportunities for the district.
          </p>
        </div>
      </header>

      {/* Post New Job Form */}
      <section className="glass-panel p-10 lg:p-14 relative overflow-hidden">
        <div className="flex items-center gap-8 mb-12">
           <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <span className="material-symbols-outlined text-3xl">work</span>
           </div>
           <div>
              <h2 className="text-3xl font-bold font-display uppercase tracking-tight leading-none text-white">Post <span className="text-primary">Opportunity</span></h2>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] opacity-40 mt-3 font-sans">Broadcast a new professional listing</p>
           </div>
        </div>

        <form action={createJob} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="space-y-3 lg:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Job Title</label>
              <input 
                name="title" 
                type="text" 
                required 
                placeholder="e.g. Senior Software Engineer" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Company</label>
              <input 
                name="company" 
                type="text" 
                placeholder="Organization Name" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Location</label>
              <input 
                name="location" 
                type="text" 
                placeholder="City or Remote" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Employment Type</label>
              <div className="relative">
                <select 
                  name="type" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer font-sans"
                >
                  <option value="Full-time" className="bg-[#0A0F1C]">Full-Time</option>
                  <option value="Part-time" className="bg-[#0A0F1C]">Part-Time</option>
                  <option value="Internship" className="bg-[#0A0F1C]">Internship</option>
                  <option value="Freelance" className="bg-[#0A0F1C]">Freelance</option>
                  <option value="Volunteer" className="bg-[#0A0F1C]">Volunteer</option>
                </select>
                <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
              </div>
            </div>
            <div className="space-y-3 lg:col-span-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Application URL</label>
              <input 
                name="applyUrl" 
                type="url" 
                placeholder="https://apply.organization.com/..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" 
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Job Description</label>
            <textarea 
              name="description" 
              rows={3}
              placeholder="Provide detailed role specifications..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-6 px-8 text-sm font-medium text-white focus:border-primary/50 outline-none transition-all resize-none leading-relaxed placeholder:text-white/20 font-sans"
            ></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="bg-primary text-white font-bold uppercase tracking-[0.4em] text-[11px] px-14 py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group font-sans"
            >
              <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">send</span>
              Post Opportunity
            </button>
          </div>
        </form>
      </section>

      {/* Opportunity Registry Grid */}
      <section className="space-y-10">
        <div className="flex items-center justify-between px-6">
           <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display">Active <span className="text-primary">Opportunities</span></h2>
              <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.4em] opacity-40 mt-2 font-sans">District Opportunity Stream</p>
           </div>
           <div className="text-[10px] font-bold text-primary bg-primary/5 px-5 py-2 rounded-full uppercase tracking-[0.2em] border border-primary/10 font-sans">{jobItems.length} Listings Published</div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {jobItems.length === 0 ? (
            <div className="glass-panel py-40 text-center space-y-8 border-dashed">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                <span className="material-symbols-outlined text-5xl text-white/10">work_off</span>
              </div>
              <p className="text-[11px] font-bold text-text-muted/20 uppercase tracking-[0.5em] font-sans">No active opportunities found</p>
            </div>
          ) : (
            jobItems.map((job) => (
              <div key={job.id} className="glass-panel p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 group hover:bg-white/5 transition-all duration-700 relative overflow-hidden">
                 <div className="flex-1 space-y-8">
                    <div className="flex items-center gap-6 flex-wrap">
                       {job.type && (
                         <span className="px-5 py-1.5 bg-primary/5 text-primary rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] border border-primary/10 font-sans">
                           {job.type.toUpperCase()}
                         </span>
                       )}
                       <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-base">domain</span>
                          <span className="text-sm font-bold text-white uppercase tracking-widest font-sans">{job.company || 'PRIVATE ENTITY'}</span>
                       </div>
                       <div className="flex items-center gap-3 opacity-40">
                          <span className="material-symbols-outlined text-base">location_on</span>
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest font-sans">{job.location || 'REMOTE'}</span>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h3 className="text-3xl font-bold text-white font-display uppercase tracking-tight group-hover:text-primary transition-colors leading-none">{job.title}</h3>
                       <p className="text-sm text-text-muted font-medium line-clamp-2 opacity-50 leading-relaxed max-w-4xl font-sans">{job.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                       {job.applyUrl && (
                         <a href={job.applyUrl} target="_blank" className="inline-flex items-center gap-3 text-[10px] text-primary font-bold uppercase tracking-[0.3em] group/link font-sans">
                           Application Portal
                           <span className="material-symbols-outlined text-lg group-hover/link:translate-x-2 transition-transform">arrow_right_alt</span>
                         </a>
                       )}
                       <span className="text-[9px] font-bold text-text-muted/20 uppercase tracking-[0.3em] tabular-nums font-sans">Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                 </div>

                 <div className="flex items-center gap-4 translate-x-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                   <form action={deleteJob.bind(null, job.id)}>
                     <button type="submit" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-xl flex items-center justify-center group/del">
                       <span className="material-symbols-outlined text-xl group-hover/del:scale-110 transition-transform">delete</span>
                     </button>
                   </form>
                 </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
