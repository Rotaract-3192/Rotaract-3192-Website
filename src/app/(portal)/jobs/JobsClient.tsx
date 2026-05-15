export default function JobsClient({ jobsData }: { jobsData: any[] }) {
  const jobs = jobsData || [];
  const activeJobs = jobs.filter((j: any) => j.status === 'active');

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-32 px-6 lg:px-12">
      <header className="py-24 lg:py-40 flex flex-col items-center text-center gap-8 mb-20">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">The Marketplace</span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tight font-display uppercase leading-none">
          Career <br />
          <span className="text-primary">Opportunities</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-text-muted max-w-3xl font-medium leading-tight opacity-70 font-sans">
          Discover high-impact professional trajectories curated within the network.
        </p>
      </header>

      <section className="space-y-12">
        {/* Filter Bar */}
        <div className="glass-panel p-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto no-scrollbar">
            <button className="px-10 py-3.5 rounded-xl bg-primary text-white font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 transition-all">All Jobs</button>
            <button className="px-10 py-3.5 rounded-xl bg-white/5 text-white/40 hover:text-primary font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-white/10 border border-white/5">Full Time</button>
            <button className="px-10 py-3.5 rounded-xl bg-white/5 text-white/40 hover:text-primary font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-white/10 border border-white/5">Internships</button>
          </div>
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] px-8 py-3.5 bg-primary/10 rounded-xl border border-primary/20 whitespace-nowrap">
            {activeJobs.length} Positions Available
          </p>
        </div>

        {/* Job List */}
        <div className="grid gap-10">
          {jobs.map((job, idx) => (
            <div key={idx} className={`group glass-panel p-10 lg:p-14 hover:border-primary/30 transition-all duration-700 relative overflow-hidden flex flex-col xl:flex-row xl:items-center justify-between gap-12 ${job.status === 'closed' ? 'opacity-50 grayscale' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex-1 space-y-10 relative z-10">
                <div className="flex flex-wrap items-center gap-6">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg border shadow-sm
                    ${job.type === 'job' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                    {job.type.toUpperCase()}
                  </span>
                  {job.status === 'closed' && (
                    <span className="text-[9px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg bg-white/5 text-white/40 border border-white/10">Applications Closed</span>
                  )}
                  <div className="flex items-center gap-3 text-[10px] font-bold text-text-muted/60 uppercase tracking-[0.2em] font-sans">
                    <span className="material-symbols-outlined text-lg opacity-40">calendar_today</span>
                    Expiry: {new Date(job.expiresAt || job.expires_at || job.createdAt || Date.now()).toLocaleDateString('en-IN', {month:'short', day:'numeric', year:'numeric'})}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">{job.company}</div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-white tracking-tight uppercase leading-none font-display group-hover:text-primary transition-colors">{job.title}</h3>
                </div>
                
                <p className="text-text-muted text-lg font-medium leading-relaxed opacity-70 max-w-3xl font-sans">
                  {job.description}
                </p>
              </div>
              
              <div className="shrink-0 flex flex-col items-start xl:items-end gap-8 relative z-10">
                <a href={(job.status || 'active') === 'active' ? (job.applyUrl || job.apply_url || '#') : '#'} className={`group/btn relative px-12 py-5 font-bold uppercase tracking-[0.3em] text-[10px] rounded-xl w-full xl:w-auto text-center transition-all shadow-xl overflow-hidden
                  ${job.status === 'active' 
                    ? 'bg-primary text-white hover:scale-105 active:scale-95' 
                    : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/10'}`}>
                  {job.status === 'active' ? (
                    <>
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                      <span className="flex items-center justify-center gap-3 relative z-10">
                        Apply Now <span className="material-symbols-outlined text-xl group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                      </span>
                    </>
                  ) : 'Application Inactive'}
                </a>
                <div className="flex items-center gap-3 px-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                   <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 font-sans">Posted by {job.postedBy || job.posted_by || "District Authority"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="py-40 flex flex-col items-center justify-center text-center space-y-8 glass-panel border-dashed">
             <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-primary/20 border border-white/5">
                <span className="material-symbols-outlined text-5xl">work_off</span>
             </div>
             <div className="space-y-3">
               <h3 className="text-2xl font-bold text-white uppercase tracking-tight font-display">No Opportunities Available</h3>
               <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.4em] opacity-60 font-sans">Check back later for new career signals.</p>
             </div>
          </div>
        )}
      </section>
    </main>
  );
}
