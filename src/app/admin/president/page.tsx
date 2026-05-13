import { getDistrictStats } from "@/app/actions/queries";
import Link from "next/link";
import Image from 'next/image';

export const revalidate = 0;

export default async function PresidentialSuitePage() {
  const stats = await getDistrictStats();

  return (
    <div className="space-y-16 pb-24">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Elite Command Center</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Presidential <span className="text-primary not-italic">Suite.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            Authenticated Access • District Executive Layer
          </p>
        </div>
        
        <div className="flex items-center gap-6 bg-surface-container-low/70 backdrop-blur-3xl p-4 rounded-[2.5rem] border border-outline-variant/30 shadow-ambient pr-8">
           <div className="w-16 h-16 rounded-2xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/10 relative group">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFMPsETifRPXB3oKRVonH83qp6sebhkghJPo13pd1Mq528zHewp17jteO3IrRHi__cUvS18jqfj6CHqikasvYlkJD5Hs0YScFhJcau6lVReCZC3DaW3NrE2R7b8h3m5-L7s7uqs1b6tE80yCZL6vn5VZ1RJcQP7nNeY4RzVwM6Hp-xtxfYaiVhrPe7uvLD--tspCAT1CEdK40ccehLzH57H50ZTfCwpseD_hGQGaeeIfs2BM3pAEgmu96k5GRg_glWQ6HDMpcBcVqy" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="President" 
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           </div>
           <div className="flex flex-col">
              <span className="text-xl font-black uppercase tracking-tight text-on-surface font-display italic leading-none">Alex Rivera</span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mt-2 italic opacity-60">District President</span>
           </div>
        </div>
      </header>

      {/* Executive Metrics Registry */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          { label: 'Active Clusters', val: stats.totalClubs, icon: 'hub', color: 'from-primary/20 to-primary/5', text: 'text-primary' },
          { label: 'Registered Nodes', val: stats.totalMembers, icon: 'groups', color: 'from-secondary/20 to-secondary/5', text: 'text-secondary' },
          { label: 'Synchronized Signals', val: stats.totalEvents, icon: 'sensors', color: 'from-green-400/20 to-green-400/5', text: 'text-green-500' },
          { label: 'Broadcast Buffer', val: stats.totalAnnouncements, icon: 'campaign', color: 'from-amber-400/20 to-amber-400/5', text: 'text-amber-500' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-surface-container-low/70 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-outline-variant/30 shadow-ambient group hover:bg-white transition-all duration-700 relative overflow-hidden">
            <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${stat.color} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className={`w-14 h-14 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center ${stat.text} shadow-inner group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors animate-pulse"></div>
            </div>
            <div className="space-y-2 relative z-10">
              <p className="text-5xl font-black text-on-surface tracking-tighter leading-none font-display italic">{stat.val}</p>
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] opacity-40 leading-none italic">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Quick Executive Functions */}
        <div className="lg:col-span-8 space-y-12">
           <section className="space-y-10">
              <div className="flex items-center gap-6 px-4">
                 <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic leading-none shrink-0">Executive <span className="text-primary not-italic">Functions.</span></h2>
                 <div className="h-[1px] flex-1 bg-outline-variant/30 opacity-40"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { title: 'Identity Audit', desc: 'Manage district identities and role allocations with cryptographic precision.', icon: 'manage_accounts', link: '/admin/members' },
                  { title: 'Cluster Control', desc: 'Secure authorization and synchronization for all club nodes.', icon: 'hub', link: '/admin/clubs' },
                  { title: 'Archive Access', desc: 'Synthesize performance diagnostics from the immutable MOM registry.', icon: 'inventory_2', link: '/admin/mom' },
                  { title: 'Broadcast Relay', desc: 'Dispatch priority global updates to all active district nodes.', icon: 'rss_feed', link: '/admin/announcements' }
                ].map((action, idx) => (
                  <Link key={idx} href={action.link} className="bg-surface-container-low/70 hover:bg-white p-10 rounded-[3.5rem] border border-outline-variant/30 shadow-ambient transition-all duration-700 text-left group flex flex-col items-start gap-8 border-b-[10px] border-b-transparent hover:border-b-primary hover:-translate-y-2">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-surface-container-high border border-outline-variant/30 shadow-inner flex items-center justify-center text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-white group-hover:rotate-12">
                      <span className="material-symbols-outlined text-4xl">{action.icon}</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-black text-on-surface uppercase tracking-tight font-display italic leading-none">{action.title}</h3>
                      <p className="text-sm font-medium text-on-surface-variant opacity-60 italic leading-relaxed">"{action.desc}"</p>
                    </div>
                  </Link>
                ))}
              </div>
           </section>

           <section className="space-y-10">
              <div className="flex items-center gap-6 px-4">
                 <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic leading-none shrink-0">Real-time <span className="text-primary not-italic">Telemetry.</span></h2>
                 <div className="h-[1px] flex-1 bg-outline-variant/30 opacity-40"></div>
              </div>
              
              <div className="bg-surface-container-low/70 backdrop-blur-3xl p-12 rounded-[4rem] border border-outline-variant/30 shadow-ambient space-y-12 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 group-hover:scale-110 transition-transform duration-1000"></div>
                 
                 <div className="flex items-center gap-6 flex-wrap lg:flex-nowrap">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                       <span className="material-symbols-outlined text-3xl animate-pulse">verified_user</span>
                    </div>
                    <div className="space-y-1">
                       <p className="text-xl font-black text-on-surface uppercase tracking-tight font-display italic leading-none">All Systems Operational.</p>
                       <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.4em] opacity-40 mt-2 italic">UPTIME: 99.99% • DISTRICT 3192 GLOBAL NETWORK SYNCHRONIZED</p>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-10 border-t border-outline-variant/30">
                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic ml-4">Encryption</p>
                       <div className="bg-surface-container-high/50 p-6 rounded-2xl border border-outline-variant/30 shadow-inner">
                          <p className="text-sm font-black text-on-surface uppercase tracking-widest italic leading-none">AES-256 DISTRICT_STD</p>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic ml-4">Network Latency</p>
                       <div className="bg-surface-container-high/50 p-6 rounded-2xl border border-outline-variant/30 shadow-inner flex items-center justify-between">
                          <p className="text-sm font-black text-on-surface uppercase tracking-widest italic leading-none tabular-nums">14ms_SYNC</p>
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic ml-4">Cloud Architecture</p>
                       <div className="bg-surface-container-high/50 p-6 rounded-2xl border border-outline-variant/30 shadow-inner">
                          <p className="text-sm font-black text-on-surface uppercase tracking-widest italic leading-none">CF_D1_EDGE_NODE</p>
                       </div>
                    </div>
                 </div>
              </div>
           </section>
        </div>

        {/* Executive Intelligence Snapshot */}
        <div className="lg:col-span-4 space-y-12">
           <section className="sticky top-12">
              <div className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[4rem] p-12 border border-outline-variant/30 shadow-ambient space-y-12 overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)]"></div>
                
                <div className="flex items-center justify-between">
                   <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary italic leading-none">District Pulse</h3>
                   <div className="flex gap-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full bg-primary animate-pulse opacity-${i * 30}`}></div>
                      ))}
                   </div>
                </div>
                
                {/* Advanced Data Visualization */}
                <div className="flex items-end justify-between h-56 gap-4 px-2">
                  {[40, 65, 85, 95, 75, 60, 50].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
                       <div 
                         className={`w-full rounded-2xl transition-all duration-1000 delay-${i * 100} relative overflow-hidden ${
                           h === 95 ? 'bg-primary shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.3)]' : 'bg-surface-container-high'
                         }`} 
                         style={{ height: `${h}%` }}
                       >
                          {h === 95 && <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>}
                       </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between px-2 text-[9px] font-black uppercase tracking-[0.4em] text-on-surface-variant opacity-40 italic">
                  <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>

                <div className="pt-10 border-t border-outline-variant/30 space-y-8">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></div>
                         <span className="text-[11px] font-black uppercase tracking-[0.4em] text-on-surface italic">Growth Vector</span>
                      </div>
                      <span className="text-sm font-black text-primary tabular-nums tracking-tighter italic">+12.5%</span>
                   </div>
                   <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden p-[2px] shadow-inner">
                      <div className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)] transition-all duration-1000" style={{ width: "75%" }}></div>
                   </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-secondary p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group/card hover:scale-105 transition-all duration-700">
                   <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover/card:scale-150 transition-transform duration-1000"></div>
                   <div className="relative z-10 space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                         <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                      </div>
                      <div className="space-y-2">
                         <h4 className="text-lg font-black uppercase tracking-tight font-display italic leading-none">Achievement Protocol</h4>
                         <p className="text-[10px] font-medium text-white/70 leading-relaxed italic uppercase tracking-widest">
                           DISTRICT 3192 HAS EXCEEDED Q3 SYNCHRONIZATION TARGETS ACROSS ALL CLUSTERS.
                         </p>
                      </div>
                   </div>
                </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}
