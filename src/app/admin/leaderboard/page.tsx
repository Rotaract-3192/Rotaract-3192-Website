import { getLeaderboard, getClubs } from '@/app/actions/queries';
import { getUsers } from '@/app/actions/queries';
import AwardPointsPanel from '@/components/admin/AwardPointsPanel';

export const revalidate = 0;

const RANK_STYLES = [
  { bg: 'bg-yellow-400',  text: 'text-slate-900', shadow: 'shadow-yellow-400/30', label: '🥇' },
  { bg: 'bg-slate-300',   text: 'text-slate-900', shadow: 'shadow-slate-300/30',  label: '🥈' },
  { bg: 'bg-amber-600',   text: 'text-white',     shadow: 'shadow-amber-600/30',  label: '🥉' },
];

const BADGE_THRESHOLDS = [
  { min: 1000, label: 'Gold',   color: 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10',  icon: 'workspace_premium' },
  { min: 500,  label: 'Silver', color: 'text-slate-300 border-slate-300/20 bg-slate-300/10',    icon: 'military_tech'     },
  { min: 100,  label: 'Bronze', color: 'text-amber-600 border-amber-600/20 bg-amber-600/10',    icon: 'stars'             },
  { min: 0,    label: 'Member', color: 'text-white/30 border-white/10 bg-white/5',              icon: 'person'            },
];

function getBadge(points: number) {
  return BADGE_THRESHOLDS.find(b => (points ?? 0) >= b.min) ?? BADGE_THRESHOLDS[3];
}

export default async function AdminLeaderboardPage() {
  const [leaderboard, clubs, members] = await Promise.all([
    getLeaderboard(100),
    getClubs(),
    getUsers(),
  ]);

  const clubMap = new Map(clubs.map(c => [c.id, c.name]));

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_#EAB308]" />
            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-[0.4em] font-sans">Points Registry</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            Member <span className="text-yellow-400">Leaderboard</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            {leaderboard.length} ranked members · Points reset each academic year
          </p>
        </div>
        <AwardPointsPanel members={members as any} />
      </header>

      {/* Top 3 Podium */}
      {leaderboard.length >= 3 && (
        <section className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[leaderboard[1], leaderboard[0], leaderboard[2]].map((member, i) => {
            const rank = i === 0 ? 1 : i === 1 ? 0 : 2;
            const style = RANK_STYLES[rank];
            const badge = getBadge(member.points ?? 0);
            const heights = ['h-40', 'h-52', 'h-36'];
            return (
              <div key={member.id} className={`relative flex flex-col items-center justify-end pb-6 ${heights[i]} rounded-3xl border border-white/5 bg-white/3 overflow-hidden group`}>
                <div className={`absolute bottom-0 left-0 right-0 ${heights[i]} ${style.bg}/10 border-t ${style.bg}/20`} />
                <img src={member.avatarUrl || `https://ui-avatars.com/api/?name=${member.firstName}+${member.lastName}&background=random`}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20 shadow-xl relative z-10 mb-2" alt="" />
                <p className="relative z-10 text-[10px] font-black uppercase tracking-widest text-white font-sans text-center leading-tight px-2">
                  {member.firstName} {member.lastName}
                </p>
                <p className={`relative z-10 text-sm font-black ${style.text === 'text-slate-900' ? 'text-yellow-400' : style.text} font-display mt-1`}>
                  {member.points ?? 0} pts
                </p>
                <div className={`relative z-10 mt-1 w-8 h-8 rounded-full ${style.bg} ${style.text} flex items-center justify-center text-sm font-black shadow-xl ${style.shadow}`}>
                  {style.label}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Full Rankings Table */}
      <section className="glass-panel overflow-hidden">
        <div className="px-10 py-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display">Full <span className="text-yellow-400">Rankings</span></h2>
            <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.4em] opacity-40 mt-2 font-sans">All district members ranked by total XP</p>
          </div>
          <div className="text-[10px] font-bold text-yellow-400 bg-yellow-400/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-yellow-400/10 font-sans">
            {leaderboard.length} Members
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5">
                <th className="py-4 px-8 text-[9px] font-black text-white/30 uppercase tracking-[0.4em] font-sans w-16">Rank</th>
                <th className="py-4 px-8 text-[9px] font-black text-white/30 uppercase tracking-[0.4em] font-sans">Member</th>
                <th className="py-4 px-8 text-[9px] font-black text-white/30 uppercase tracking-[0.4em] font-sans">Club</th>
                <th className="py-4 px-8 text-[9px] font-black text-white/30 uppercase tracking-[0.4em] font-sans">Badge</th>
                <th className="py-4 px-8 text-[9px] font-black text-white/30 uppercase tracking-[0.4em] font-sans text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-32 text-center text-[10px] text-white/20 uppercase tracking-widest font-sans">
                    No points awarded yet — click "Award Points" to get started
                  </td>
                </tr>
              ) : leaderboard.map((member, idx) => {
                const badge = getBadge(member.points ?? 0);
                const podiumStyle = RANK_STYLES[idx];
                return (
                  <tr key={member.id} className={`hover:bg-white/5 transition-all group border-l-4 border-transparent ${idx < 3 ? 'hover:border-yellow-400' : 'hover:border-primary'}`}>
                    <td className="py-5 px-8">
                      {idx < 3 ? (
                        <div className={`w-8 h-8 rounded-lg ${podiumStyle.bg} ${podiumStyle.text} flex items-center justify-center text-sm font-black shadow-lg ${podiumStyle.shadow}`}>
                          {podiumStyle.label}
                        </div>
                      ) : (
                        <span className="text-sm font-black text-white/20 font-sans">#{idx + 1}</span>
                      )}
                    </td>
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <img src={member.avatarUrl || `https://ui-avatars.com/api/?name=${member.firstName}+${member.lastName}&background=random`}
                          className="w-10 h-10 rounded-xl object-cover border border-white/10" alt="" />
                        <div>
                          <p className="font-bold text-white uppercase font-display group-hover:text-yellow-400 transition-colors">
                            {member.firstName} {member.lastName}
                          </p>
                          <p className="text-[10px] text-white/30 font-sans">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-8 text-[10px] font-bold text-white/40 uppercase tracking-widest font-sans">
                      {(member.clubId ? clubMap.get(member.clubId) ?? '—' : 'District') as string}
                    </td>
                    <td className="py-5 px-8">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] font-sans ${badge.color}`}>
                        <span className="material-symbols-outlined text-sm">{badge.icon}</span>
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-5 px-8 text-right">
                      <span className={`text-2xl font-black font-display ${idx < 3 ? 'text-yellow-400' : 'text-white'}`}>
                        {(member.points ?? 0).toLocaleString()}
                      </span>
                      <span className="text-[9px] text-white/20 font-sans ml-1">pts</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
