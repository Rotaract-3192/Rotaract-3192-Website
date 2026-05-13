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
    { label: 'Registered Clubs', val: stats.totalClubs, icon: 'hub', color: 'text-primary', link: '/admin/clubs', trend: 'ACTIVE' },
    { label: 'Active Members', val: stats.totalMembers, icon: 'groups', color: 'text-secondary', link: '/admin/members', trend: 'LATEST' },
    { label: 'Live Events', val: stats.totalEvents, icon: 'vital_signs', color: 'text-primary', link: '/admin/events', trend: 'NOMINAL' },
    { label: 'Broadcasts', val: stats.totalAnnouncements, icon: 'campaign', color: 'text-on-surface', link: '/admin/announcements', trend: 'SYNCED' }
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Dynamic Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">District Oversight</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Command <span className="text-primary not-italic">Center.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            Real-time District Synchronization Protocol: ACTIVE
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex -space-x-4">
             {allMembers.slice(0, 4).map((m: any, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-surface shadow-xl overflow-hidden bg-surface-container-high relative">
                  <Image src={m.avatarUrl || `https://ui-avatars.com/api/?name=${m.firstName}`} alt="Member" fill className="object-cover" />
                </div>
             ))}
             <div className="w-12 h-12 rounded-full bg-primary border-4 border-surface flex items-center justify-center text-[10px] font-black text-white shadow-xl relative z-10">
               +{allMembers.length > 4 ? allMembers.length - 4 : 0}
             </div>
          </div>
          <Link href="/admin/audit" className="bg-primary text-white font-black text-[10px] uppercase tracking-[0.3em] px-10 py-5 rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group">
            <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform">security</span>
            Security Audit
          </Link>
        </div>
      </header>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((stat, idx) => (
          <Link key={idx} href={stat.link} className="bg-surface-container-low/70 backdrop-blur-xl p-10 rounded-[3rem] border border-outline-variant/30 shadow-ambient hover:bg-white hover:shadow-2xl transition-all duration-700 space-y-8 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center border border-outline-variant/30 transition-transform group-hover:scale-110 group-hover:rotate-6">
                <span className={`material-symbols-outlined text-2xl ${stat.color}`}>{stat.icon}</span>
              </div>
              <span className="text-[9px] font-black text-on-surface-variant/40 bg-surface-container-high px-4 py-1.5 rounded-full tracking-[0.2em] uppercase border border-outline-variant/30">{stat.trend}</span>
            </div>
            <div className="space-y-1 relative z-10">
              <p className="text-5xl font-black text-on-surface tracking-tighter leading-none font-display italic">{stat.val}</p>
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 leading-none italic">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Recent Node Ingress (Clubs) */}
        <div className="xl:col-span-2 space-y-10">
           <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] border border-outline-variant/30 shadow-ambient overflow-hidden">
              <div className="px-12 py-10 border-b border-outline-variant/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-surface-container-high/30">
                <div>
                  <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">Origin <span className="text-primary not-italic">Nodes.</span></h2>
                  <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-[0.4em] opacity-40 mt-2 italic">LATEST CLUSTER SYNCHRONIZATIONS</p>
                </div>
                <Link href="/admin/clubs" className="px-8 py-3.5 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-primary/20">All Registry</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-high/20">
                      <th className="py-6 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 italic">Node Identity</th>
                      <th className="py-6 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 italic">Sector</th>
                      <th className="py-6 px-12 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 text-right italic">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {activeClubs.map((club, idx) => (
                      <tr key={idx} className="hover:bg-white transition-all group cursor-pointer">
                        <td className="py-8 px-12">
                          <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm bg-white p-1.5 transition-transform group-hover:scale-110">
                               <Image src={club.logoUrl || `https://ui-avatars.com/api/?name=${club.name}`} width={48} height={48} className="w-full h-full object-contain" alt={club.name} />
                             </div>
                             <p className="text-lg font-black text-on-surface tracking-tight uppercase leading-none font-display italic group-hover:text-primary transition-colors">{club.name}</p>
                          </div>
                        </td>
                        <td className="py-8 px-12 text-[11px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 italic">District 3192 Internal</td>
                        <td className="py-8 px-12 text-right">
                          <span className="inline-flex items-center px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] bg-primary/5 text-primary border border-primary/10 italic">VALIDATED</span>
                        </td>
                      </tr>
                    ))}
                    {activeClubs.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-24 text-center text-on-surface-variant opacity-40 text-[11px] font-black uppercase tracking-[0.5em] italic">No active nodes detected</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
           </section>

           {/* Intelligence Log (Real Audit Data) */}
           <section className="bg-surface-container-low/70 backdrop-blur-xl p-12 rounded-[3.5rem] border border-outline-variant/30 space-y-10 shadow-ambient">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">Intelligence <span className="text-primary not-italic">Stream.</span></h2>
                <div className="flex items-center gap-4">
                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                   <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">LIVE OPS</span>
                </div>
              </div>
              <div className="space-y-8">
                 {auditLogs.length === 0 ? (
                    <div className="py-16 text-center opacity-30 italic text-[11px] font-black uppercase tracking-[0.5em]">System idle. No incoming signals.</div>
                 ) : (
                    auditLogs.slice(0, 6).map((log) => (
                      <div key={log.id} className="flex items-start gap-6 group">
                         <div className={`w-10 h-10 rounded-2xl bg-surface-container-high flex items-center justify-center border border-outline-variant/30 shrink-0 group-hover:scale-110 transition-all ${
                           log.severity === 'critical' ? 'text-error' :
                           log.severity === 'warning' ? 'text-amber-500' : 'text-primary'
                         }`}>
                           <span className="material-symbols-outlined text-lg">{
                             log.severity === 'critical' ? 'emergency' :
                             log.severity === 'warning' ? 'warning' : 'sensors'
                           }</span>
                         </div>
                         <div className="flex-1 border-b border-outline-variant/30 pb-6">
                           <p className="text-sm font-black text-on-surface uppercase leading-tight italic">{log.action}</p>
                           <div className="flex items-center gap-3 mt-2">
                             <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">{log.userName || 'System'}</p>
                             <span className="text-[10px] opacity-20">•</span>
                             <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest italic opacity-60">
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

        {/* Quick Functions Sidebar */}
        <div className="xl:col-span-1 space-y-12">
          <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-12 border border-outline-variant/30 shadow-ambient space-y-10">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic leading-none">Operational <span className="text-primary not-italic">Nodes.</span></h2>
            <div className="space-y-6">
              {[
                { label: 'System Security', sub: 'Audit History', href: '/admin/audit', icon: 'shield_locked', color: 'bg-primary text-white shadow-primary/30' },
                { label: 'Content Pulse', sub: 'Feed Moderation', href: '/admin/feeds', icon: 'broadcast_on_home', color: 'bg-surface-container-high text-on-surface' },
                { label: 'Pulse Control', sub: 'Event Management', href: '/admin/events', icon: 'analytics', color: 'bg-surface-container-high text-on-surface' },
                { label: 'Identity Manager', sub: 'Credentials & Roles', href: '/admin/members', icon: 'badge', color: 'bg-surface-container-high text-on-surface' }
              ].map((fn, i) => (
                <Link key={i} href={fn.href} className={`w-full group p-8 rounded-[2.5rem] border border-outline-variant/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-between block ${fn.color}`}>
                  <div className="space-y-1">
                     <p className="text-[11px] font-black uppercase tracking-widest italic">{fn.label}</p>
                     <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 italic">{fn.sub}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border border-white/20 group-hover:rotate-12 transition-transform ${fn.href === '/admin/audit' ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                    <span className="material-symbols-outlined text-xl">{fn.icon}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* District Status Card */}
          <section className="bg-gradient-to-br from-primary to-secondary p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 rounded-[1.5rem] bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-inner border border-white/20 group-hover:rotate-12 transition-all">
                <span className="material-symbols-outlined text-3xl">rocket_launch</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black uppercase tracking-tight font-display italic leading-none">Scale Network.</h3>
                <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em] italic">DISTRICT PROTOCOL</p>
              </div>
              <p className="text-sm font-medium text-white/80 leading-relaxed italic border-l-2 border-white/20 pl-6">
                "Network expansion detected. Validate all cluster nodes before terminal assembly synchronization."
              </p>
              <Link href="/admin/members" className="w-full bg-white text-primary font-black text-[10px] py-6 rounded-2xl uppercase tracking-[0.3em] shadow-2xl hover:bg-surface transition-all flex items-center justify-center group/btn">
                Initialize Scale
                <span className="material-symbols-outlined text-lg ml-3 group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
