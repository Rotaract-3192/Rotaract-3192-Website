export default function JobsClient({ jobsData }: { jobsData: any[] }) {
  const jobs = jobsData || [];
  const activeJobs = jobs.filter((j: any) => j.status === 'active');

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-24">
      {/* Background Accents */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[120px] -z-10"></div>
      <div className="fixed bottom-0 left-64 w-[400px] h-[400px] bg-secondary-container/5 rounded-full blur-[100px] -z-10"></div>

      <header className="p-8 md:p-12 mb-12">
        <div className="flex flex-col gap-4">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">The Marketplace</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface mb-4 font-display">Career <span className="text-primary italic">Signal.</span></h1>
          <p className="text-xl text-on-surface-variant font-medium max-w-2xl leading-tight">Discover professional trajectories curated within the network.</p>
        </div>
      </header>

      <section className="p-8 md:p-12 space-y-12">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-surface-container-low/50 backdrop-blur-md p-4 rounded-3xl border border-outline-variant/30 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
            <button className="px-10 py-3 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 transition-all">All Signals</button>
            <button className="px-10 py-3 rounded-xl bg-surface-container text-on-surface-variant hover:text-primary font-black text-[10px] uppercase tracking-widest transition-all hover:bg-white border border-outline-variant/30">Direct Hire</button>
            <button className="px-10 py-3 rounded-xl bg-surface-container text-on-surface-variant hover:text-primary font-black text-[10px] uppercase tracking-widest transition-all hover:bg-white border border-outline-variant/30">Internships</button>
          </div>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-8 py-3 bg-primary/10 rounded-xl border border-primary/20 whitespace-nowrap">
            {activeJobs.length} Active Nodes
          </p>
        </div>

        {/* Job List */}
        <div className="grid gap-10">
          {jobs.map((job, idx) => (
            <div key={idx} className={`group bg-surface-container-low/50 backdrop-blur-xl p-10 rounded-[3rem] border border-outline-variant/30 shadow-ambient hover:shadow-2xl hover:bg-white transition-all duration-500 overflow-hidden relative ${job.status === 'closed' ? 'opacity-50' : ''}`}>
              <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-12">
                <div className="flex-1 space-y-8">
                  <div className="flex flex-wrap items-center gap-6">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border shadow-sm
                      ${job.type === 'job' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-green-500/10 text-green-600 border-green-500/20'}`}>
                      {job.type.toUpperCase()}
                    </span>
                    {job.status === 'closed' && (
                      <span className="text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-surface-container text-on-surface-variant border border-outline-variant/30">Sequence Terminated</span>
                    )}
                    <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">schedule</span>
                      Expiry: {new Date(job.expiresAt || job.expires_at || job.createdAt || Date.now()).toLocaleDateString('en-IN', {month:'short', day:'numeric', year:'numeric'})}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-4xl font-black text-on-surface tracking-tighter uppercase leading-none font-display group-hover:text-primary transition-colors">{job.title}</h3>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">{job.company}</p>
                  </div>
                  
                  <p className="text-on-surface-variant text-base font-medium leading-relaxed italic opacity-80 max-w-3xl">
                    "{job.description}"
                  </p>
                </div>
                
                <div className="shrink-0 flex flex-col items-start xl:items-end gap-6">
                  <a href={(job.status || 'active') === 'active' ? (job.applyUrl || job.apply_url || '#') : '#'} className={`group/btn relative px-12 py-5 font-black uppercase tracking-[0.2em] text-[10px] rounded-[2rem] w-full xl:w-auto text-center transition-all shadow-xl overflow-hidden
                    ${job.status === 'active' 
                      ? 'bg-primary text-white hover:scale-105 active:scale-95' 
                      : 'bg-surface-container text-on-surface-variant cursor-not-allowed opacity-50'}`}>
                    {job.status === 'active' ? (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
                        <span className="flex items-center justify-center gap-3 relative z-10">
                          Initialize Application <span className="material-symbols-outlined text-xl group-hover/btn:translate-x-1 transition-transform">bolt</span>
                        </span>
                      </>
                    ) : 'Sequence Offline'}
                  </a>
                  <div className="flex items-center gap-3 px-4 opacity-50">
                     <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                     <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Transmitted by {job.postedBy || job.posted_by || "Admin"}</p>
                  </div>
                </div>
              </div>
              {/* Decorative interior element */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 z-0 group-hover:bg-primary/10 transition-colors`}></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
