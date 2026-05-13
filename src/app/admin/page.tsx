import { getClubs, getUsers, getAuditLogs, getDistrictStats } from "@/app/actions/queries";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [clubsData, membersData, auditLogs, stats] = await Promise.all([
    getClubs(),
    getUsers(),
    getAuditLogs(),
    getDistrictStats()
  ]);
  
  const activeClubs = clubsData.slice(0, 5);
  const allMembers = membersData;

  const metrics = [
    { label: 'Registered Clubs', val: stats.totalClubs, icon: 'hub', color: 'text-primary', link: '/admin/clubs', trend: 'ACTIVE' },
    { label: 'Active Members', val: stats.totalMembers, icon: 'groups', color: 'text-secondary', link: '/admin/members', trend: 'LATEST' },
    { label: 'Live Events', val: stats.totalEvents, icon: 'vital_signs', color: 'text-green-600', link: '/admin/events', trend: 'NOMINAL' },
    { label: 'Broadcasts', val: stats.totalAnnouncements, icon: 'campaign', color: 'text-primary', link: '/admin/announcements', trend: 'SYNCED' }
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Dynamic Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-on-surface uppercase tracking-tight leading-none">Command Center</h1>
          <p className="text-xs text-on-surface-variant font-medium opacity-60 italic flex items-center gap-2 text-on-surface">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Real-time District Synchronization Active
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
             {allMembers.slice(0, 4).map((m: any, i) => (
                <img key={i} src={m.avatarUrl || `https://ui-avatars.com/api/?name=${m.firstName}`} className="w-10 h-10 rounded-full border-4 border-surface shadow-xl" alt="Member" />
             ))}
             <div className="w-10 h-10 rounded-full bg-surface-container-high border-4 border-surface flex items-center justify-center text-[10px] font-bold text-primary shadow-xl">+{allMembers.length > 4 ? allMembers.length - 4 : 0}</div>
          </div>
          <Link href="/admin/audit" className="bg-primary text-white font-bold text-xs px-8 py-3.5 rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
            <span className="material-symbols-outlined text-sm">security</span>
            Security Audit
          </Link>
        </div>
      </header>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((stat, idx) => (
          <Link key={idx} href={stat.link} className="bg-white p-8 rounded-[2.5rem] border border-outline/5 shadow-ambient hover:shadow-2xl transition-all duration-500 space-y-6 group cursor-pointer block relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className={`w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center ${stat.color} transition-transform group-hover:scale-110 shadow-inner`}>
                <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
              </div>
              <span className="text-[9px] font-black text-on-surface-variant/40 bg-surface-container-low px-3 py-1 rounded-full tracking-widest uppercase">{stat.trend}</span>
            </div>
            <div className="space-y-1 relative z-10">
              <p className="text-4xl font-black text-on-surface tracking-tighter leading-none">{stat.val}</p>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] opacity-40 leading-none">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Recent Node Ingress (Clubs) */}
        <div className="xl:col-span-2 space-y-8">
           <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] border border-white shadow-2xl overflow-hidden shadow-primary/5">
              <div className="px-10 py-8 border-b border-outline/5 flex justify-between items-center bg-surface-container-lowest">
                <div>
                  <h2 className="text-xl font-black text-on-surface uppercase tracking-tight">Recent Node Ingress</h2>
                  <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-widest opacity-40 mt-1">LATEST CLUSTER SYNCHRONIZATIONS</p>
                </div>
                <Link href="/admin/clubs" className="px-6 py-2.5 rounded-xl bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all inline-flex items-center gap-2">View All Registry</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-low/50">
                      <th className="py-5 px-10 text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Origin Node</th>
                      <th className="py-5 px-10 text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Location</th>
                      <th className="py-5 px-10 text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 text-right">Integrity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline/5">
                    {activeClubs.map((club, idx) => (
                      <tr key={idx} className="hover:bg-primary/5 transition-all group">
                        <td className="py-6 px-10">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl overflow-hidden border border-outline/10 shadow-sm bg-white p-1">
                               <img src={club.logoUrl || `https://ui-avatars.com/api/?name=${club.name}`} className="w-full h-full object-contain" alt={club.name} />
                             </div>
                             <p className="text-base font-black text-on-surface tracking-tight uppercase leading-none">{club.name}</p>
                          </div>
                        </td>
                        <td className="py-6 px-10 text-[11px] font-bold text-on-surface-variant lowercase italic tracking-wide opacity-60">District 3192 Internal</td>
                        <td className="py-6 px-10 text-right">
                          <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest bg-green-50 text-green-700 border border-green-200">VALIDATED</span>
                        </td>
                      </tr>
                    ))}
                    {activeClubs.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-20 text-center text-on-surface-variant opacity-40 text-sm font-bold uppercase tracking-widest italic">No cluster data synchronized</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
           </div>

           {/* Intelligence Log (Real Audit Data) */}
           <div className="bg-surface-container-low p-10 rounded-[3rem] border border-outline/5 space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-black text-on-surface uppercase tracking-tight">Intelligence Log</h2>
                <div className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                   <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">LIVE STREAM</span>
                </div>
              </div>
              <div className="space-y-6">
                 {auditLogs.length === 0 ? (
                    <div className="py-10 text-center opacity-30 italic text-[10px] font-black uppercase tracking-widest">No activity detected on current frequency</div>
                 ) : (
                    auditLogs.slice(0, 6).map((log) => (
                      <div key={log.id} className="flex items-start gap-4 group">
                         <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 transition-transform ${
                           log.severity === 'critical' ? 'text-red-500' :
                           log.severity === 'warning' ? 'text-amber-500' : 'text-primary'
                         }`}>
                           <span className="material-symbols-outlined text-sm">{
                             log.severity === 'critical' ? 'emergency' :
                             log.severity === 'warning' ? 'warning' : 'sensors'
                           }</span>
                         </div>
                         <div className="flex-1 border-b border-outline/5 pb-4">
                           <p className="text-xs font-bold text-on-surface uppercase leading-tight">{log.action}</p>
                           <div className="flex items-center gap-2 mt-1">
                             <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-widest">{log.userName || 'System'}</p>
                             <span className="text-[8px] opacity-20">•</span>
                             <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-widest italic">
                                {log.timestamp ? new Date(log.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '---'}
                             </p>
                           </div>
                         </div>
                      </div>
                    ))
                 )}
              </div>
           </div>
        </div>

        {/* Quick Functions Sidebar */}
        <div className="xl:col-span-1 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 border border-outline/5 shadow-xl space-y-8">
            <h2 className="text-xl font-black text-on-surface uppercase tracking-tight leading-none">Operational Functions</h2>
            <div className="space-y-4">
              <Link href="/admin/audit" className="w-full group bg-primary text-white p-6 rounded-[2rem] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-left flex items-center justify-between block">
                <div className="space-y-1">
                   <p className="text-xs font-bold uppercase tracking-widest leading-none">System Security</p>
                   <p className="text-[9px] text-white/60 uppercase tracking-widest">View Audit History</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">shield_locked</span>
                </div>
              </Link>
              
              <Link href="/admin/feeds" className="w-full group bg-surface-container-low text-on-surface p-6 rounded-[2rem] border border-white hover:bg-white transition-all text-left flex items-center justify-between block">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest leading-none">Content Pulse</p>
                  <p className="text-[9px] text-on-surface-variant uppercase tracking-widest">Feed Moderation</p>
                </div>
                <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">broadcast_on_home</span>
              </Link>

              <Link href="/admin/events" className="w-full group bg-surface-container-low text-on-surface p-6 rounded-[2rem] border border-white hover:bg-white transition-all text-left flex items-center justify-between block">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest leading-none">Pulse Control</p>
                  <p className="text-[9px] text-on-surface-variant uppercase tracking-widest">Event Management</p>
                </div>
                <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">analytics</span>
              </Link>

              <Link href="/admin/members" className="w-full group bg-surface-container-low text-on-surface p-6 rounded-[2rem] border border-white hover:bg-white transition-all text-left flex items-center justify-between block">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest leading-none">Identity Manager</p>
                  <p className="text-[9px] text-on-surface-variant uppercase tracking-widest">Credentials & Roles</p>
                </div>
                <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">badge</span>
              </Link>
            </div>
          </div>

          {/* District Status Card */}
          <div className="bg-gradient-to-br from-primary to-secondary p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">rocket_launch</span>
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Expand Network</h3>
                <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mt-1 italic">DISTRICT SCALE PROTOCOL</p>
              </div>
              <p className="text-xs font-medium text-white/80 leading-relaxed italic border-l-2 border-white/20 pl-4">The network is expanding. Ensure all nodes are synchronized and validated before next district assembly.</p>
              <Link href="/admin/members" className="w-full bg-white text-primary font-black text-[10px] py-4 rounded-xl uppercase tracking-widest shadow-lg hover:scale-105 transition-all flex items-center justify-center">Go to Buffer Control</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

