import { getDistrictStats } from "@/app/actions/queries";
import Link from "next/link";

export const revalidate = 0;

export default async function PresidentialSuitePage() {
  const stats = await getDistrictStats();

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-on-surface">
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tight leading-none italic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Presidential Suite</h1>
          <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.3em] opacity-40">Elite Command Center</p>
        </div>
        <div className="flex items-center gap-4 bg-white/50 backdrop-blur-xl p-3 rounded-[2rem] border border-white shadow-xl">
           <div className="flex flex-col items-end px-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-primary">Alex Rivera</span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60 italic">District President</span>
           </div>
           <div className="w-12 h-12 rounded-2xl overflow-hidden border border-primary/20 shadow-xl shadow-primary/10">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFMPsETifRPXB3oKRVonH83qp6sebhkghJPo13pd1Mq528zHewp17jteO3IrRHi__cUvS18jqfj6CHqikasvYlkJD5Hs0YScFhJcau6lVReCZC3DaW3NrE2R7b8h3m5-L7s7uqs1b6tE80yCZL6vn5VZ1RJcQP7nNeY4RzVwM6Hp-xtxfYaiVhrPe7uvLD--tspCAT1CEdK40ccehLzH57H50ZTfCwpseD_hGQGaeeIfs2BM3pAEgmu96k5GRg_glWQ6HDMpcBcVqy" className="w-full h-full object-cover" alt="President" />
           </div>
        </div>
      </header>

      {/* Executive Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Active Clusters', val: stats.totalClubs, icon: 'hub', color: 'from-primary to-blue-600' },
          { label: 'Registered Nodes', val: stats.totalMembers, icon: 'groups', color: 'from-secondary to-purple-600' },
          { label: 'Synchronized Signals', val: stats.totalEvents, icon: 'sensors', color: 'from-green-600 to-teal-600' },
          { label: 'Broadcast Buffer', val: stats.totalAnnouncements, icon: 'campaign', color: 'from-orange-600 to-red-600' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl hover:shadow-2xl transition-all duration-500 space-y-6 group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-[0.05] rounded-bl-full group-hover:scale-150 transition-transform duration-700`}></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary transition-transform group-hover:scale-110 shadow-inner">
                <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
              </div>
            </div>
            <div className="space-y-1 relative z-10">
              <p className="text-4xl font-black text-on-surface tracking-tighter leading-none">{stat.val}</p>
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 leading-none">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Quick Actions */}
        <div className="lg:col-span-8 space-y-12">
           <section>
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xl font-black text-on-surface uppercase tracking-tight">Executive Functions</h2>
                 <div className="h-[1px] flex-1 bg-outline/5 ml-8 opacity-20"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: 'Identity Audit', desc: 'Manage district identities and role allocations.', icon: 'manage_accounts', link: '/admin/members' },
                  { title: 'Cluster Control', desc: 'Secure authorization for club nodes.', icon: 'hub', link: '/admin/clubs' },
                  { title: 'Archive Access', desc: 'Synthesize performance diagnostics from MOM.', icon: 'inventory_2', link: '/admin/mom' },
                  { title: 'Broadcast Relay', desc: 'Dispatch priority updates to all active nodes.', icon: 'rss_feed', link: '/admin/announcements' }
                ].map((action, idx) => (
                  <Link key={idx} href={action.link} className="bg-white/60 hover:bg-white p-8 rounded-[3rem] border border-white shadow-lg hover:shadow-2xl transition-all duration-500 text-left group">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-low shadow-inner flex items-center justify-center text-primary mb-6 transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                      <span className="material-symbols-outlined text-3xl">{action.icon}</span>
                    </div>
                    <h3 className="text-lg font-black text-on-surface uppercase tracking-tight mb-2">{action.title}</h3>
                    <p className="text-xs text-on-surface-variant font-medium opacity-60 italic leading-relaxed">{action.desc}</p>
                  </Link>
                ))}
              </div>
           </section>

           <section>
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xl font-black text-on-surface uppercase tracking-tight">Real-time Telemetry</h2>
                 <div className="h-[1px] flex-1 bg-outline/5 ml-8 opacity-20"></div>
              </div>
              <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] border border-white shadow-2xl space-y-8">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                       <span className="material-symbols-outlined text-lg animate-pulse">check_circle</span>
                    </div>
                    <div>
                       <p className="text-sm font-black text-on-surface uppercase tracking-tight leading-none">All Systems Operational</p>
                       <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-widest opacity-40 mt-1">Uptime: 99.99% • District 3192 Global Network</p>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-outline/5">
                    <div className="space-y-3">
                       <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Encryption</p>
                       <p className="text-sm font-bold text-on-surface uppercase italic">AES-256 District Standard</p>
                    </div>
                    <div className="space-y-3">
                       <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Latency</p>
                       <p className="text-sm font-bold text-on-surface uppercase italic">14ms Synchronized</p>
                    </div>
                    <div className="space-y-3">
                       <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">Cloud Node</p>
                       <p className="text-sm font-bold text-on-surface uppercase italic">Cloudflare D1 Edge</p>
                    </div>
                 </div>
              </div>
           </section>
        </div>

        {/* Intelligence Snapshot */}
        <div className="lg:col-span-4 space-y-12">
           <section className="sticky top-12">
              <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] p-10 border border-white shadow-2xl space-y-10 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x"></div>
                
                <div className="flex items-center justify-between">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">District Pulse</h3>
                   <span className="material-symbols-outlined text-primary/40 animate-pulse">waves</span>
                </div>
                
                {/* Mock Chart Visualization */}
                <div className="flex items-end justify-between h-48 gap-3">
                  {[40, 65, 85, 95, 75, 60, 50].map((h, i) => (
                    <div key={i} className={`w-full rounded-t-xl transition-all duration-1000 delay-${i * 100} ${h === 95 ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-surface-container-high'}`} style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                
                <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40 italic">
                  <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                </div>

                <div className="pt-8 border-t border-outline/5 space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Growth Vector</span>
                      </div>
                      <span className="text-[10px] font-black text-primary">+12.5%</span>
                   </div>
                   <div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden p-[1px]">
                      <div className="h-full bg-primary rounded-full shadow-sm shadow-primary/50" style={{ width: "75%" }}></div>
                   </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                   <div className="relative z-10 space-y-4">
                      <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                      <h4 className="text-sm font-black uppercase tracking-tight leading-tight">Achievement Protocol</h4>
                      <p className="text-[10px] font-medium text-white/70 leading-relaxed italic">District 3192 has successfully exceeded Q3 synchronization targets across all 14 club clusters.</p>
                   </div>
                </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}
