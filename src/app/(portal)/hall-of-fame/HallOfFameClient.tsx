export default function HallOfFameClient({ leaderboardData }: { leaderboardData: any[] }) {
  const leaderboard = (leaderboardData || []).map((m: any, idx: number) => ({
    ...m,
    rank: idx + 1,
    name: m.name || `${m.firstName || ''} ${m.lastName || ''}`.trim() || 'Member',
    profile_pic_url: m.avatarUrl || m.profile_pic_url || `https://ui-avatars.com/api/?name=${m.name}&background=random`,
    points: m.points || 0,
    club_name: m.clubId || 'District 3192',
    badges: m.badges || ['Service', 'Leadership']
  }));

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-32 px-6 lg:px-12">
      {/* Cinematic Background Accents */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -z-10"></div>
      <div className="fixed -bottom-48 -left-48 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] -z-10"></div>

      <header className="py-24 lg:py-40 flex flex-col items-center text-center gap-8 border-b border-outline-variant/30 mb-32">
        <span className="inline-block px-6 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">The Pantheon</span>
        <h1 className="text-6xl md:text-9xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
          Hall of <br />
          <span className="text-primary not-italic">Fame.</span>
        </h1>
        <p className="text-xl md:text-3xl text-on-surface-variant max-w-3xl font-medium leading-tight opacity-70">
          Celebrating the most dedicated and impactful leaders within District 3192.
        </p>
      </header>

      {/* Podium Section */}
      {leaderboard.length >= 3 && top1 && top2 && top3 && (
      <section className="mb-48">
        <div className="flex flex-col md:flex-row items-end justify-center gap-10 md:gap-20">
          {/* 2nd Place */}
          <div className="order-2 md:order-1 flex flex-col items-center w-full md:w-auto group">
            <div className="relative mb-12">
              <div className="absolute -top-6 -right-6 w-14 h-14 bg-surface-container-high shadow-xl rounded-2xl flex items-center justify-center text-on-surface font-black border border-outline-variant/30 transition-transform group-hover:scale-110 z-20 text-xs">02</div>
              <img src={top2.profile_pic_url} alt={top2.name} className="w-48 h-48 rounded-[3rem] object-cover border-4 border-white shadow-ambient rotate-[-4deg] group-hover:rotate-0 transition-all duration-700" />
            </div>
            <div className="text-center space-y-3 mb-12">
              <h3 className="text-3xl font-black text-on-surface uppercase tracking-tight font-display leading-none group-hover:text-primary transition-colors">{top2.name}</h3>
              <span className="bg-surface-container-low text-primary font-black text-[10px] px-6 py-2.5 rounded-xl uppercase tracking-[0.2em] border border-outline-variant/30 shadow-sm">{top2.points} IMPACT PTS</span>
            </div>
            <div className="w-64 h-40 bg-surface-container-low/50 backdrop-blur-xl rounded-t-[4rem] border-t border-outline-variant/30 shadow-ambient relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-50"></div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="order-1 md:order-2 flex flex-col items-center w-full md:w-auto group">
            <div className="relative mb-16">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-primary shadow-2xl rounded-[2rem] flex items-center justify-center text-white border-4 border-white/20 animate-bounce z-20">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              </div>
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] scale-150 animate-pulse"></div>
              <img src={top1.profile_pic_url} alt={top1.name} className="w-72 h-72 rounded-[4.5rem] object-cover border-8 border-white shadow-2xl relative z-10 group-hover:scale-105 transition-all duration-700" />
            </div>
            <div className="text-center space-y-4 mb-16">
              <h3 className="text-5xl font-black text-on-surface uppercase tracking-tighter font-display leading-none group-hover:text-primary transition-colors">{top1.name}</h3>
              <span className="bg-primary text-white font-black text-[11px] px-10 py-4 rounded-[1.5rem] shadow-2xl shadow-primary/30 uppercase tracking-[0.3em] inline-block">THE APEX: {top1.points} POINTS</span>
            </div>
            <div className="w-80 h-64 bg-surface-container-lowest/90 backdrop-blur-3xl rounded-t-[5rem] border-t-2 border-primary shadow-2xl relative z-0 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent"></div>
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[160px] font-black text-primary/5 select-none leading-none font-display italic tracking-tighter">01</div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="order-3 flex flex-col items-center w-full md:w-auto group">
            <div className="relative mb-12">
              <div className="absolute -top-6 -left-6 w-14 h-14 bg-surface-container-high shadow-xl rounded-2xl flex items-center justify-center text-on-surface font-black border border-outline-variant/30 transition-transform group-hover:scale-110 z-20 text-xs">03</div>
              <img src={top3.profile_pic_url} alt={top3.name} className="w-44 h-44 rounded-[2.8rem] object-cover border-4 border-white shadow-ambient rotate-[4deg] group-hover:rotate-0 transition-all duration-700" />
            </div>
            <div className="text-center space-y-3 mb-12">
              <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display leading-none group-hover:text-primary transition-colors">{top3.name}</h3>
              <span className="bg-surface-container-low text-primary font-black text-[10px] px-6 py-2.5 rounded-xl uppercase tracking-[0.2em] border border-outline-variant/30 shadow-sm">{top3.points} IMPACT PTS</span>
            </div>
            <div className="w-60 h-32 bg-surface-container-low/50 backdrop-blur-xl rounded-t-[3.5rem] border-t border-outline-variant/30 shadow-ambient relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-50"></div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Table Section */}
      <section className="px-0 lg:px-12">
        <div className="max-w-6xl mx-auto bg-surface-container-low/70 backdrop-blur-2xl rounded-[4rem] border border-outline-variant/30 shadow-ambient overflow-hidden">
          <div className="p-12 lg:p-16 border-b border-outline-variant/30 flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-4xl font-black text-on-surface uppercase tracking-tighter font-display leading-none italic">Global <span className="text-primary not-italic">Sequence.</span></h2>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] opacity-80">Reporting Cycle: 2024-25 • District Authority 3192</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-2.5 bg-surface-container-high rounded-[2.5rem] border border-outline-variant/30 shadow-inner">
              <button className="bg-white text-primary font-black text-[10px] uppercase tracking-[0.3em] px-12 py-4 rounded-[2rem] shadow-xl transition-all hover:scale-105 active:scale-95">District Horizon</button>
              <button className="text-on-surface-variant hover:text-primary font-black text-[10px] uppercase tracking-[0.3em] px-12 py-4 transition-all">Internal Protocol</button>
            </div>
          </div>

          <div className="divide-y divide-outline-variant/20">
            {leaderboard.map((member, index) => (
              <div key={index} className="p-10 lg:p-14 hover:bg-white/40 transition-all duration-700 flex flex-col md:flex-row items-center gap-10 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="w-20 text-center shrink-0 relative z-10">
                  <span className={`text-5xl font-black ${index < 3 ? 'text-primary' : 'text-on-surface/10'} group-hover:text-primary transition-all duration-700 font-display italic tracking-tighter`}>
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                
                <div className="flex flex-col md:flex-row items-center flex-1 gap-10 relative z-10">
                  <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-white shadow-ambient shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                    <img src={member.profile_pic_url} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="text-3xl font-black text-on-surface uppercase tracking-tight leading-none font-display group-hover:text-primary transition-colors">{member.name}</h4>
                    <p className="text-[11px] font-black text-primary uppercase tracking-[0.3em] opacity-60 italic">{member.club_name}</p>
                  </div>
                </div>

                <div className="hidden xl:flex items-center gap-4 relative z-10">
                  {member.badges.slice(0, 2).map((badge: string, bIdx: number) => (
                    <span key={bIdx} className="bg-surface-container-high text-primary font-black text-[10px] px-6 py-2.5 rounded-xl border border-outline-variant/30 uppercase tracking-[0.2em] shadow-sm group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all duration-700">
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="text-center md:text-right shrink-0 min-w-[160px] relative z-10">
                  <div className="text-5xl font-black text-on-surface leading-none font-display tracking-tighter group-hover:text-primary transition-colors">{member.points}</div>
                  <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mt-3 opacity-60">Quantified Impact</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-16 text-center bg-surface-container-high/30">
            <button className="px-16 py-6 bg-primary text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all group overflow-hidden relative">
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center gap-4">
                Synchronize Global Registry
                <span className="material-symbols-outlined text-lg">bolt</span>
              </span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
