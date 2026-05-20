import { getClubs, getUsers, getAuditLogs, getDistrictStats } from "@/app/actions/queries";
import Link from "next/link";
import Image from "next/image";

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
    { label: 'Active Clubs', val: stats.totalClubs, icon: 'hub', color: 'text-primary', link: '/admin/clubs', trend: 'DISTRICT' },
    { label: 'Total Members', val: stats.totalMembers, icon: 'groups', color: 'text-primary', link: '/admin/members', trend: 'GROWING' },
    { label: 'Major Events', val: stats.totalEvents, icon: 'event', color: 'text-primary', link: '/admin/events', trend: 'ONGOING' },
    { label: 'Minutes (MOMs)', val: stats.totalMoms, icon: 'description', color: 'text-primary', link: '/admin/mom', trend: 'ARCHIVED' }
  ];

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      {/* Header Section */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">District Oversight</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            District <br />
            <span className="text-primary">Console</span>
          </h1>
          
          <p className="text-text-muted text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-3 opacity-60 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Real-time District Administration Active
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex -space-x-4">
             {allMembers.slice(0, 4).map((m: any, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-[#020617] shadow-xl overflow-hidden bg-white/5 relative">
                  <Image src={m.avatarUrl || `https://ui-avatars.com/api/?name=${m.firstName}`} alt="Member" fill className="object-cover" />
                </div>
             ))}
             <div className="w-12 h-12 rounded-full bg-primary border-4 border-[#020617] flex items-center justify-center text-[10px] font-bold text-white shadow-xl relative z-10 font-sans">
               +{allMembers.length > 4 ? allMembers.length - 4 : 0}
             </div>
          </div>
          <Link href="/admin/audit" className="bg-primary text-white font-bold text-[10px] uppercase tracking-[0.3em] px-10 py-5 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group font-sans no-underline">
            <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform">security</span>
            View Activity Log
          </Link>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((stat, idx) => (
          <Link key={idx} href={stat.link} className="glass-panel p-10 hover:bg-white/5 transition-all duration-700 space-y-8 group relative overflow-hidden no-underline">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 transition-transform group-hover:scale-110 group-hover:rotate-6">
                <span className={`material-symbols-outlined text-2xl ${stat.color}`}>{stat.icon}</span>
              </div>
              <span className="text-[9px] font-bold text-text-muted/40 bg-white/5 px-4 py-1.5 rounded-full tracking-[0.2em] uppercase border border-white/5 font-sans">{stat.trend}</span>
            </div>
            <div className="space-y-2 relative z-10">
              <p className="text-5xl font-bold text-white tracking-tight leading-none font-display uppercase">{stat.val}</p>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 leading-none font-sans">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Recent Clubs Section */}
        <div className="xl:col-span-2 space-y-10">
           <section className="glass-panel overflow-hidden">
              <div className="px-10 py-8 border-b border-white/5 bg-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display">Latest <span className="text-primary">Clubs</span></h2>
                  <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.4em] opacity-40 mt-2 font-sans">Recent club updates across the district</p>
                </div>
                <Link href="/admin/clubs" className="px-8 py-3 rounded-xl bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-lg shadow-primary/20 no-underline font-sans">View All Clubs</Link>
              </div>
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 font-sans">Club Name</th>
                      <th className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 font-sans">Classification</th>
                      <th className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 text-right font-sans">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {activeClubs.map((club, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-all group cursor-default">
                        <td className="py-6 px-10">
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-white p-1 transition-transform group-hover:scale-110">
                               <Image src={club.logoUrl || `https://ui-avatars.com/api/?name=${club.name}`} width={48} height={48} className="w-full h-full object-contain" alt={club.name} />
                             </div>
                             <p className="text-lg font-bold text-white tracking-tight uppercase leading-none font-display group-hover:text-primary transition-colors">{club.name}</p>
                          </div>
                        </td>
                        <td className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-40 font-sans">District 3192</td>
                        <td className="py-6 px-10 text-right">
                          <span className="inline-flex items-center px-5 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-[0.3em] bg-primary/5 text-primary border border-primary/10 font-sans">ACTIVE</span>
                        </td>
                      </tr>
                    ))}
                    {activeClubs.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-24 text-center text-text-muted opacity-40 text-[11px] font-bold uppercase tracking-[0.5em] font-sans">No active clubs found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
           </section>

           {/* Activity Stream */}
           <section className="glass-panel p-10 space-y-10">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display">District <span className="text-primary">Stream</span></h2>
                <div className="flex items-center gap-4">
                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                   <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">LIVE UPDATES</span>
                </div>
              </div>
              <div className="space-y-8">
                 {auditLogs.length === 0 ? (
                    <div className="py-16 text-center opacity-30 text-[11px] font-bold uppercase tracking-[0.5em] font-sans">Waiting for incoming activity...</div>
                 ) : (
                    auditLogs.slice(0, 6).map((log) => (
                      <div key={log.id} className="flex items-start gap-6 group">
                         <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shrink-0 group-hover:scale-110 transition-all ${
                           log.severity === 'critical' ? 'text-red-500' :
                           log.severity === 'warning' ? 'text-amber-500' : 'text-primary'
                         }`}>
                           <span className="material-symbols-outlined text-lg">{
                             log.severity === 'critical' ? 'priority_high' :
                             log.severity === 'warning' ? 'warning' : 'info'
                           }</span>
                         </div>
                         <div className="flex-1 border-b border-white/5 pb-6">
                           <p className="text-sm font-bold text-white uppercase leading-tight font-sans">{log.action}</p>
                           <div className="flex items-center gap-3 mt-2">
                             <p className="text-[10px] font-bold text-text-muted/40 uppercase tracking-widest font-sans">{log.userName || 'System'}</p>
                             <span className="text-[10px] opacity-20">•</span>
                             <p className="text-[10px] font-bold text-text-muted/40 uppercase tracking-widest opacity-60 font-sans">
                                {log.timestamp ? new Date(log.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '---'}
                             </p>
                           </div>
                         </div>
                      </div>
                    ))
                 )}
              </div>
           </section>
        </div>

        {/* Quick Access Sidebar */}
        <div className="xl:col-span-1 space-y-12">
          <section className="glass-panel p-10 space-y-10">
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display leading-none">Quick <span className="text-primary">Links</span></h2>
            <div className="space-y-4">
              {[
                { label: 'System Audit', sub: 'Audit Protocols', href: '/admin/audit', icon: 'security', active: true },
                { label: 'Hall of Honor', sub: 'Leader Timeline', href: '/admin/president', icon: 'military_tech', active: false },
                { label: 'Events Hub', sub: 'Project Control', href: '/admin/events', icon: 'event', active: false },
                { label: 'Members Directory', sub: 'Access Management', href: '/admin/members', icon: 'groups', active: false }
              ].map((fn, i) => (
                <Link key={i} href={fn.href} className={`w-full group p-6 rounded-2xl border transition-all flex items-center justify-between no-underline block font-sans ${fn.active ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                  <div className="space-y-1">
                     <p className={`text-[10px] font-bold uppercase tracking-widest text-white`}>{fn.label}</p>
                     <p className={`text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 ${fn.active ? 'text-white/60' : 'text-text-muted'}`}>{fn.sub}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-transform group-hover:rotate-12 ${fn.active ? 'bg-white/20 border-white/20 text-white' : 'bg-primary/10 border-primary/10 text-primary'}`}>
                    <span className="material-symbols-outlined text-lg">{fn.icon}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Growth & Support Card */}
          <section className="bg-gradient-to-br from-primary to-blue-700 p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-inner border border-white/20 group-hover:rotate-12 transition-all">
                <span className="material-symbols-outlined text-3xl text-white">insights</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold uppercase tracking-tight font-display leading-none">District Growth</h3>
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.4em] font-sans">Official Protocol</p>
              </div>
              <p className="text-sm font-medium text-white/80 leading-relaxed border-l-2 border-white/20 pl-6 font-sans">
                Manage and support all district clubs to ensure maximum community impact.
              </p>
              <Link href="/admin/members" className="w-full bg-white text-primary font-bold text-[10px] py-5 rounded-xl uppercase tracking-[0.3em] shadow-xl hover:bg-[#020617] hover:text-white transition-all flex items-center justify-center group/btn no-underline font-sans">
                Manage Network
                <span className="material-symbols-outlined text-lg ml-3 group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

