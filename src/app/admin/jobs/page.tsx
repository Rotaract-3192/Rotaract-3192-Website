import { getJobs } from '@/app/actions/queries';
import { createJob, deleteJob } from '@/app/actions/mutations';

export const revalidate = 0;

export default async function AdminJobsPage() {
  const jobItems = await getJobs();

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none text-on-surface">Career Pipeline</h1>
          <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-[0.3em] opacity-40 italic">Manage Professional Opportunities & Talent Streams</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Opportunity Stream Live</span>
          </div>
        </div>
      </header>

      {/* Post New Job Form */}
      <section className="bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white p-12 shadow-2xl shadow-primary/5">
        <div className="flex items-center gap-5 mb-12">
           <div className="w-14 h-14 rounded-[1.25rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <span className="material-symbols-outlined text-3xl">work_history</span>
           </div>
           <div>
              <h2 className="text-2xl font-black uppercase tracking-tight leading-none text-on-surface">Initialize Listing</h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em] opacity-40 mt-2 italic">Broadcast New Professional Signal to District Network</p>
           </div>
        </div>

        <form action={createJob} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Role Designation (Title)</label>
            <input
              name="title"
              type="text"
              required
              placeholder="e.g. PRINCIPAL SOFTWARE ENGINEER"
              className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Enterprise Entity (Company)</label>
            <input
              name="company"
              type="text"
              placeholder="Company Name"
              className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Geographic Node (Location)</label>
            <input
              name="location"
              type="text"
              placeholder="e.g. BENGALURU / REMOTE"
              className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Engagement Protocol (Type)</label>
            <select
              name="type"
              className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all appearance-none"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Technical Brief / Description</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Provide detailed role specifications and requirements..."
              className="w-full bg-surface-container-low border-none rounded-[2rem] py-6 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Application Vector (URL)</label>
            <input
              name="applyUrl"
              type="url"
              placeholder="https://career-portal.entity.com/apply"
              className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-primary text-white font-black uppercase tracking-[0.2em] text-[11px] py-6 rounded-[1.5rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
            >
              <span className="material-symbols-outlined text-xl">broadcast_on_home</span>
              Deploy Listing
            </button>
          </div>
        </form>
      </section>

      {/* Jobs List */}
      <div className="grid grid-cols-1 gap-6">
        {jobItems.length === 0 ? (
          <div className="py-32 text-center text-[10px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">No active opportunities identified in talent registry.</div>
        ) : (
          jobItems.map((job) => (
            <div
              key={job.id}
              className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-xl p-8 flex items-center justify-between gap-10 group hover:shadow-2xl hover:bg-white transition-all border-l-8 border-l-transparent hover:border-l-primary"
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  {job.type && (
                    <span className="px-4 py-1.5 bg-primary/5 text-primary rounded-xl text-[9px] font-black uppercase tracking-widest border border-primary/10 shadow-sm">
                      {job.type}
                    </span>
                  )}
                  {job.company && (
                    <span className="text-[11px] text-on-surface-variant font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant opacity-20"></span>
                       {job.company}
                    </span>
                  )}
                  {job.location && (
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest opacity-40 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">location_on</span>
                      {job.location}
                    </span>
                  )}
                  <span className="text-[9px] font-black text-on-surface-variant/20 uppercase tracking-[0.2em] ml-auto italic tabular-nums">
                    INIT_DATA: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'UNKNOWN'}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight leading-none group-hover:text-primary transition-colors">{job.title}</h3>
                  {job.description && (
                    <p className="text-[11px] text-on-surface-variant font-medium mt-3 opacity-60 line-clamp-2 leading-relaxed italic">{job.description}</p>
                  )}
                </div>

                {job.applyUrl && (
                  <div className="pt-2">
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-[10px] text-primary font-black uppercase tracking-[0.2em] group/link"
                    >
                      Vector Access Point
                      <span className="material-symbols-outlined text-base group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                    </a>
                  </div>
                )}
              </div>
              
              <form action={deleteJob.bind(null, job.id)}>
                <button
                  type="submit"
                  className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-red-100 opacity-0 group-hover:opacity-100 shadow-xl hover:shadow-red-500/20"
                >
                  <span className="material-symbols-outlined text-2xl">delete_sweep</span>
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

