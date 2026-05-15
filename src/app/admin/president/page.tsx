import { getDistrictStats } from "@/app/actions/queries";
import Link from "next/link";
import Image from 'next/image';

export const revalidate = 0;

export default async function PresidentialSuitePage() {
  const stats = await getDistrictStats();

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">District Leadership</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            Presidential <span className="text-primary">Portal</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Authenticated Access • District Executive Dashboard
          </p>
        </div>
        
        <div className="flex items-center gap-6 glass-panel p-4 pr-10">
           <div className="w-16 h-16 rounded-2xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/10 relative group">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFMPsETifRPXB3oKRVonH83qp6sebhkghJPo13pd1Mq528zHewp17jteO3IrRHi__cUvS18jqfj6CHqikasvYlkJD5Hs0YScFhJcau6lVReCZC3DaW3NrE2R7b8h3m5-L7s7uqs1b6tE80yCZL6vn5VZ1RJcQP7nNeY4RzVwM6Hp-xtxfYaiVhrPe7uvLD--tspCAT1CEdK40ccehLzH57H50ZTfCwpseD_hGQGaeeIfs2BM3pAEgmu96k5GRg_glWQ6HDMpcBcVqy" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="President" 
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           </div>
           <div className="flex flex-col">
              <span className="text-xl font-bold uppercase tracking-tight text-white font-display leading-none">District President</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary mt-2 opacity-60 font-sans tracking-widest">DRR 2024-25</span>
           </div>
        </div>
      </header>

      {/* District Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Clubs', val: stats.totalClubs, icon: 'hub', color: 'from-blue-500/20 to-blue-500/5', text: 'text-blue-500' },
          { label: 'Active Members', val: stats.totalMembers, icon: 'groups', color: 'from-primary/20 to-primary/5', text: 'text-primary' },
          { label: 'Live Events', val: stats.totalEvents, icon: 'sensors', color: 'from-blue-400/20 to-blue-400/5', text: 'text-blue-400' },
          { label: 'Announcements', val: stats.totalAnnouncements, icon: 'campaign', color: 'from-blue-600/20 to-blue-600/5', text: 'text-blue-600' }
        ].map((stat, idx) => (
          <div key={idx} className="glass-panel p-10 group hover:bg-white/5 transition-all duration-700 relative overflow-hidden">
            <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${stat.color} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${stat.text} group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors animate-pulse"></div>
            </div>
            <div className="space-y-2 relative z-10">
              <p className="text-5xl font-bold text-white tracking-tighter leading-none font-display uppercase">{stat.val}</p>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.4em] opacity-40 leading-none font-sans">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Quick Executive Functions */}
        <div className="lg:col-span-8 space-y-12">
           <section className="space-y-10">
              <div className="flex items-center gap-6 px-4">
                 <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display leading-none shrink-0">Administrative <span className="text-primary">Controls</span></h2>
                 <div className="h-[1px] flex-1 bg-white/5"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: 'Member Directory', desc: 'Manage district members and club officers.', icon: 'manage_accounts', link: '/admin/members' },
                  { title: 'Club Registry', desc: 'Oversee and synchronize district club data.', icon: 'hub', link: '/admin/clubs' },
                  { title: 'Minutes Manager', desc: 'Archive and review meeting documentation.', icon: 'inventory_2', link: '/admin/mom' },
                  { title: 'Communications', desc: 'Broadcast updates across the district network.', icon: 'rss_feed', link: '/admin/announcements' }
                ].map((action, idx) => (
                  <Link key={idx} href={action.link} className="glass-panel p-10 hover:bg-white/5 transition-all duration-700 text-left group flex flex-col items-start gap-8 border-b-4 border-b-transparent hover:border-b-primary">
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary transition-all duration-700 group-hover:bg-primary group-hover:text-white group-hover:rotate-6">
                      <span className="material-symbols-outlined text-3xl">{action.icon}</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white uppercase tracking-tight font-display leading-none">{action.title}</h3>
                      <p className="text-sm font-medium text-text-muted opacity-60 leading-relaxed font-sans">{action.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
           </section>

           <section className="space-y-10">
              <div className="flex items-center gap-6 px-4">
                 <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display leading-none shrink-0">System <span className="text-primary">Status</span></h2>
                 <div className="h-[1px] flex-1 bg-white/5"></div>
              </div>
              
              <div className="glass-panel p-12 space-y-12 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 group-hover:scale-110 transition-transform duration-1000"></div>
                 
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
                       <span className="material-symbols-outlined text-3xl animate-pulse">verified_user</span>
                    </div>
                    <div className="space-y-1">
                       <p className="text-xl font-bold text-white uppercase tracking-tight font-display leading-none">Network Operational</p>
                       <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.4em] opacity-40 mt-2 font-sans">Uptime: 99.9% • Global Synchronization Active</p>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-10 border-t border-white/5">
                    <div className="space-y-4">
                       <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Security Protocol</p>
                       <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                          <p className="text-sm font-bold text-white uppercase tracking-widest leading-none font-sans">AES-256 District Shield</p>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Sync Latency</p>
                       <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-center justify-between">
                          <p className="text-sm font-bold text-white uppercase tracking-widest leading-none tabular-nums font-sans">12ms Response</p>
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Architecture</p>
                       <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                          <p className="text-sm font-bold text-white uppercase tracking-widest leading-none font-sans">Cloudflare Edge v3</p>
                       </div>
                    </div>
                 </div>
              </div>
           </section>
        </div>

        {/* District Health Card */}
        <div className="lg:col-span-4 space-y-12">
           <section className="sticky top-12">
              <div className="glass-panel p-12 space-y-12 overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-primary to-blue-400"></div>
                
                <div className="flex items-center justify-between">
                   <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary leading-none font-sans">Activity Pulse</h3>
                   <div className="flex gap-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`w-1 h-1 rounded-full bg-primary animate-pulse opacity-${i * 30}`}></div>
                      ))}
                   </div>
                </div>
                
                {/* Data Bars */}
                <div className="flex items-end justify-between h-48 gap-3">
                  {[40, 65, 85, 100, 75, 60, 50].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-4">
                       <div 
                         className={`w-full rounded-lg transition-all duration-1000 relative overflow-hidden ${
                           h === 100 ? 'bg-primary' : 'bg-white/5'
                         }`} 
                         style={{ height: `${h}%` }}
                       >
                          {h === 100 && <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>}
                       </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.4em] text-text-muted opacity-40 font-sans">
                  <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>

                <div className="pt-10 border-t border-white/5 space-y-8">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                         <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white font-sans">Engagement</span>
                      </div>
                      <span className="text-sm font-bold text-primary italic font-sans">+12.5%</span>
                   </div>
                   <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: "75%" }}></div>
                   </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-blue-600 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden group/card hover:scale-105 transition-all duration-700">
                   <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover/card:scale-150 transition-transform duration-1000"></div>
                   <div className="relative z-10 space-y-6">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                         <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                      </div>
                      <div className="space-y-2">
                         <h4 className="text-lg font-bold uppercase tracking-tight font-display leading-none">Milestone Reached</h4>
                         <p className="text-[10px] font-medium text-white/70 leading-relaxed uppercase tracking-widest font-sans">
                           District 3192 has exceeded member growth targets for the current quarter.
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
