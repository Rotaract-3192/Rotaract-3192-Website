import { getCampaigns } from '@/app/actions/queries';
import { updateCampaignStatus, createCampaign } from '@/app/actions/mutations';
import Image from 'next/image';

export const revalidate = 0;

export default async function AdminCampaignsPage() {
  const campaigns = await getCampaigns();
  
  const totalRaised = campaigns.reduce((sum, c) => sum + (c.raisedAmount || 0), 0);
  const activeCampaignsCount = campaigns.filter(c => c.status === 'active').length;
  const pendingCampaignsCount = campaigns.filter(c => c.status === 'pending').length;

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Financial Oversight</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            District <span className="text-primary">Campaigns</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Monitor district funding streams and financial initiatives.
          </p>
        </div>
        
        <div className="flex items-center gap-4 glass-panel px-8 py-4">
          <span className="material-symbols-outlined text-primary text-xl">account_balance</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white font-sans">Treasury Active</span>
        </div>
      </header>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Funds Raised', val: `₹${totalRaised.toLocaleString()}`, unit: 'INR', color: 'text-primary', icon: 'payments' },
          { label: 'Active Campaigns', val: activeCampaignsCount, unit: 'Active', color: 'text-blue-400', icon: 'monitoring' },
          { label: 'Pending Approval', val: pendingCampaignsCount, unit: 'Pending', color: 'text-white', icon: 'pending_actions' }
        ].map((metric, i) => (
          <div key={i} className="glass-panel p-10 rounded-[2.5rem] relative overflow-hidden group hover:bg-white/5 transition-all duration-700">
            <div className="flex items-center justify-between mb-8">
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                 <span className="material-symbols-outlined text-xl">{metric.icon}</span>
               </div>
               <span className="text-[9px] font-bold text-text-muted uppercase tracking-[0.3em] font-sans">Analytics</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                 <span className={`text-5xl font-bold font-display tracking-tight leading-none uppercase ${metric.color}`}>{metric.val}</span>
                 <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-40 font-sans">{metric.unit}</span>
              </div>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-[.3em] opacity-40 font-sans">{metric.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Initialize Funding Protocol */}
      <section className="glass-panel p-10 lg:p-14 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
           <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <span className="material-symbols-outlined text-3xl">add_chart</span>
           </div>
           <div>
              <h2 className="text-3xl font-bold font-display uppercase tracking-tight leading-none text-white">New <span className="text-primary">Campaign</span></h2>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] opacity-40 mt-3 font-sans">Launch a new financial initiative for the district</p>
           </div>
        </div>

        <form action={createCampaign} className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
          <div className="md:col-span-8 space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Campaign Title</label>
            <input name="title" type="text" required placeholder="Enter campaign name..." className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans" />
          </div>
          <div className="md:col-span-4 space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Goal Amount (₹)</label>
            <input name="goalAmount" type="number" required min="1" placeholder="Enter amount..." className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 tracking-[0.2em] font-sans" />
          </div>
          <div className="md:col-span-12 space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Campaign Description</label>
            <textarea name="description" rows={3} placeholder="Outline campaign objectives and purpose..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-sm font-medium text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 leading-relaxed font-sans"></textarea>
          </div>
          <div className="md:col-span-12 flex justify-end pt-4">
             <button type="submit" className="bg-primary text-white font-bold uppercase tracking-[0.4em] text-[11px] px-14 py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group font-sans">
                <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">rocket_launch</span>
                Launch Campaign
             </button>
          </div>
        </form>
      </section>

      {/* Initiatives Register */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
           <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Active Initiatives Registry</h2>
           <div className="h-px flex-grow bg-white/5"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {campaigns.length === 0 ? (
            <div className="col-span-full py-32 glass-panel text-center text-[11px] font-bold text-text-muted/20 uppercase tracking-[0.5em] font-sans">No operational initiatives registered.</div>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign.id} className="glass-panel rounded-[2.5rem] overflow-hidden group hover:bg-white/5 hover:shadow-2xl transition-all duration-700">
                <div className="p-10 flex flex-col gap-10">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4">
                       <h3 className="text-3xl font-bold text-white font-display uppercase tracking-tight group-hover:text-primary transition-colors leading-none">{campaign.title}</h3>
                       <div className="flex gap-4">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border font-sans ${campaign.status === 'active' ? 'bg-primary/5 text-primary border-primary/20' : 'bg-white/5 text-text-muted border-white/10'}`}>
                            {campaign.status}
                          </span>
                       </div>
                    </div>
                    <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center text-primary/40 group-hover:text-primary group-hover:scale-110 transition-all border border-white/10 shadow-inner">
                       <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                    </div>
                  </div>

                  <p className="text-text-muted text-base font-medium opacity-60 line-clamp-2 leading-relaxed font-sans">{campaign.description}</p>

                  <div className="space-y-6">
                     <div className="flex justify-between items-end">
                        <div className="space-y-2">
                           <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted opacity-40 font-sans">Amount Raised</span>
                           <div className="text-3xl font-bold text-white font-display tracking-tight tabular-nums uppercase">₹{campaign.raisedAmount?.toLocaleString() || 0}</div>
                        </div>
                        <div className="text-right space-y-2">
                           <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted opacity-40 font-sans">Goal Target</span>
                           <div className="text-sm font-bold text-text-muted opacity-40 tabular-nums uppercase font-sans">₹{campaign.goalAmount.toLocaleString()}</div>
                        </div>
                     </div>

                     <div className="relative h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div 
                           className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_10px_#3B82F6]" 
                           style={{ width: `${Math.min(100, ((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100)}%` }}
                        >
                           <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 animate-shimmer"></div>
                        </div>
                     </div>

                     <div className="flex justify-between items-center pt-6">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">
                           {Math.round(((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100)}% Funding Goal Reached
                        </span>
                        <div className="flex gap-6">
                           {campaign.status === 'pending' && (
                             <form action={updateCampaignStatus.bind(null, campaign.id, 'active')}>
                               <button type="submit" className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] hover:text-white transition-all underline underline-offset-8 font-sans">Approve</button>
                             </form>
                           )}
                           <form action={updateCampaignStatus.bind(null, campaign.id, 'completed')}>
                             <button type="submit" className="text-[10px] font-bold text-red-500/50 hover:text-red-500 uppercase tracking-[0.3em] hover:scale-105 transition-all underline underline-offset-8 font-sans">Archive</button>
                           </form>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
