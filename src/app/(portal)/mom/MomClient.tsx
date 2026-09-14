import Link from "next/link";

export default function MomClient({ momsData }: { momsData: any[] }) {
  const moms = momsData || [];

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-24">
      {/* Background Accents */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary-container/5 rounded-full blur-[140px] -z-10"></div>
      
      {/* MOM HEADER */}
      <header className="p-8 md:p-12 text-center space-y-6">
        <div className="flex flex-col items-center gap-4">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] px-6 py-2 rounded-full bg-primary/5 border border-primary/10 mb-4 block">Intelligence Feed</span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-on-surface mb-4 font-display">Echo <span className="text-primary italic">Protocol.</span></h1>
          <p className="text-xl text-on-surface-variant font-medium max-w-2xl leading-tight">Autonomous meeting transcription and action token extraction system.</p>
        </div>
      </header>

      <section className="px-8 md:px-12 space-y-16">
        {/* Productivity Analytics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { label: 'Total Sequences', val: moms.length, icon: 'history', color: 'text-primary' },
            { label: 'Pending Tokens', val: '12', icon: 'pending_actions', color: 'text-error' },
            { label: 'Temporal Gain', val: '4.5H', icon: 'auto_awesome', color: 'text-secondary' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-surface-container-low/70 backdrop-blur-xl p-10 rounded-[3rem] border border-outline-variant/30 shadow-ambient flex items-center gap-10 group hover:shadow-2xl transition-all duration-500">
              <div className="w-20 h-20 rounded-[2rem] bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-4xl">{stat.icon}</span>
              </div>
              <div className="space-y-1.5">
                <p className={`text-5xl font-black font-display tracking-tighter leading-none italic uppercase ${stat.color}`}>{stat.val}</p>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[.4em] opacity-40 italic">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Sequence Manifest */}
        <div className="bg-surface-container-low/70 backdrop-blur-2xl rounded-[3rem] border border-outline-variant/30 shadow-ambient overflow-hidden">
          <div className="p-10 border-b border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="space-y-2">
                <h2 className="text-3xl font-black text-on-surface uppercase tracking-tight font-display">Sequence <span className="text-primary italic">Manifest.</span></h2>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] opacity-80 italic">Global Session Logging • District 3192</p>
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high/50 border-b border-outline-variant/30">
                  <th className="py-8 px-10 text-[10px] font-black text-primary uppercase tracking-[0.4em] leading-none italic">Session ID / Context</th>
                  <th className="py-8 px-10 text-[10px] font-black text-primary uppercase tracking-[0.4em] leading-none italic">Temporal Frame</th>
                  <th className="py-8 px-10 text-[10px] font-black text-primary uppercase tracking-[0.4em] leading-none italic">Origin Node</th>
                  <th className="py-8 px-10 text-[10px] font-black text-primary uppercase tracking-[0.4em] leading-none italic text-right">Synchronization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {moms.map((mom: any, idx: number) => (
                  <tr key={idx} className="hover:bg-white/40 transition-all group cursor-pointer relative">
                    <td className="py-10 px-10">
                      <Link href={`/mom/${mom.id}`} className="block space-y-3">
                        <p className="text-2xl font-black text-on-surface font-display tracking-tighter group-hover:text-primary transition-colors uppercase italic leading-none">{mom.title}</p>
                        <p className="text-[11px] text-on-surface-variant font-medium italic opacity-50 max-w-sm truncate leading-none">"{mom.transcript_text || 'No transcription available.'}"</p>
                      </Link>
                    </td>
                    <td className="py-10 px-10 whitespace-nowrap">
                      <p className="text-[11px] font-black text-primary uppercase tracking-widest leading-none bg-primary/5 px-4 py-2 rounded-lg border border-primary/10 inline-block">
                        {new Date(mom.meetingDate || mom.meeting_date || Date.now()).toLocaleDateString('en-IN', {month: 'short', day: 'numeric', year: 'numeric'})}
                      </p>
                    </td>
                    <td className="py-10 px-10 whitespace-nowrap">
                      <span className="inline-flex items-center px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] bg-surface-container-high text-on-surface border border-outline-variant/30 shadow-sm">
                        {mom.clubId || mom.club_id || 'DISTRICT'}
                      </span>
                    </td>
                    <td className="py-10 px-10 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-4">
                         <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-30 italic">Retrievable</span>
                         <span className="material-symbols-outlined text-primary opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">bolt</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
