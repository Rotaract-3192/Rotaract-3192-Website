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
    <div className="space-y-16 pb-24">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Financial Oversight</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Fiscal <span className="text-primary not-italic">Intelligence.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            Monitor District Funding Streams & Financial Protocols: SYNCED
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-surface-container-low/50 backdrop-blur-xl px-8 py-4 rounded-[2rem] border border-outline-variant/30">
          <span className="material-symbols-outlined text-primary text-xl">account_balance</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface">Treasury Stream Active</span>
        </div>
      </header>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Capital Generated', val: `₹${totalRaised.toLocaleString()}`, unit: 'INR', color: 'text-primary', icon: 'payments' },
          { label: 'Operational Initiatives', val: activeCampaignsCount, unit: 'Active', color: 'text-secondary', icon: 'monitoring' },
          { label: 'Awaiting Authorization', val: pendingCampaignsCount, unit: 'Protocols', color: 'text-on-surface', icon: 'pending_actions' }
        ].map((metric, i) => (
          <div key={i} className="bg-surface-container-low/70 backdrop-blur-xl p-10 rounded-[3rem] border border-outline-variant/30 shadow-ambient relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="flex items-center justify-between mb-8">
               <div className="w-14 h-14 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                 <span className="material-symbols-outlined text-2xl">{metric.icon}</span>
               </div>
               <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] italic">Telemetry</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                 <span className={`text-5xl font-black font-display tracking-tighter leading-none italic ${metric.color}`}>{metric.val}</span>
                 <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">{metric.unit}</span>
              </div>
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[.3em] opacity-40 italic">{metric.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Initialize Funding Protocol */}
      <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
        <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
           <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
              <span className="material-symbols-outlined text-4xl">add_chart</span>
           </div>
           <div>
              <h2 className="text-3xl font-black font-display uppercase tracking-tight leading-none text-on-surface italic">Initiate <span className="text-primary not-italic">Protocol.</span></h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.3em] opacity-40 mt-3 italic">Deploy New Fiscal Initiative to District Network</p>
           </div>
        </div>

        <form action={createCampaign} className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
          <div className="md:col-span-8 space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Initiative Designation</label>
            <input name="title" type="text" required placeholder="PROTOCOL IDENTIFIER" className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest" />
          </div>
          <div className="md:col-span-4 space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Capital Target (₹)</label>
            <input name="goalAmount" type="number" required min="1" placeholder="UNIT VOLUME" className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 tracking-[0.2em]" />
          </div>
          <div className="md:col-span-12 space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Technical Brief / Objectives</label>
            <textarea name="description" rows={3} placeholder="Mission objectives and fiscal parameters..." className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2.5rem] py-8 px-10 text-sm font-medium text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 italic leading-relaxed"></textarea>
          </div>
          <div className="md:col-span-12 flex justify-end">
             <button type="submit" className="bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] px-16 py-6 rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group">
                <span className="material-symbols-outlined text-xl group-hover:rotate-45 transition-transform">rocket_launch</span>
                Deploy Protocol
             </button>
          </div>
        </form>
      </section>

      {/* Initiatives Register */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
           <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Active Initiatives Registry</h2>
           <div className="h-px flex-grow bg-outline-variant/30"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {campaigns.length === 0 ? (
            <div className="col-span-full py-32 bg-surface-container-low/30 rounded-[4rem] border border-outline-variant/10 text-center text-[11px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">No operational initiatives registered.</div>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-surface-container-low/70 backdrop-blur-xl rounded-[3.5rem] border border-outline-variant/30 overflow-hidden group hover:bg-white hover:shadow-ambient transition-all duration-700">
                <div className="p-12 flex flex-col gap-10">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4">
                       <h3 className="text-3xl font-black text-on-surface font-display uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors italic leading-none">{campaign.title}</h3>
                       <div className="flex gap-4">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${campaign.status === 'active' ? 'bg-primary/5 text-primary border-primary/10' : 'bg-surface-container-high text-on-surface-variant/50 border-outline-variant/30'}`}>
                            {campaign.status}
                          </span>
                       </div>
                    </div>
                    <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center text-on-surface-variant/20 group-hover:text-primary group-hover:scale-110 transition-all border border-outline-variant/30 shadow-inner">
                       <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                    </div>
                  </div>

                  <p className="text-on-surface-variant text-base font-medium opacity-60 line-clamp-2 italic leading-relaxed">"{campaign.description}"</p>

                  <div className="space-y-6">
                     <div className="flex justify-between items-end">
                        <div className="space-y-2">
                           <span className="text-[9px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40 italic">Stream Volume</span>
                           <div className="text-3xl font-black text-on-surface font-display tracking-tight tabular-nums italic">₹{campaign.raisedAmount?.toLocaleString() || 0}</div>
                        </div>
                        <div className="text-right space-y-2">
                           <span className="text-[9px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40 italic">Target Metric</span>
                           <div className="text-sm font-black text-on-surface-variant opacity-40 tabular-nums italic">₹{campaign.goalAmount.toLocaleString()}</div>
                        </div>
                     </div>

                     <div className="relative h-2 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/10 shadow-inner">
                        <div 
                           className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]" 
                           style={{ width: `${Math.min(100, ((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100)}%` }}
                        >
                           <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 animate-shimmer"></div>
                        </div>
                     </div>

                     <div className="flex justify-between items-center pt-6">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic animate-pulse">
                           {Math.round(((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100)}% Saturation
                        </span>
                        <div className="flex gap-6">
                           {campaign.status === 'pending' && (
                             <form action={updateCampaignStatus.bind(null, campaign.id, 'active')}>
                               <button type="submit" className="text-[10px] font-black text-primary uppercase tracking-[0.3em] hover:scale-110 transition-transform underline decoration-2 underline-offset-8">Approve</button>
                             </form>
                           )}
                           <form action={updateCampaignStatus.bind(null, campaign.id, 'completed')}>
                             <button type="submit" className="text-[10px] font-black text-error/50 hover:text-error uppercase tracking-[0.3em] hover:scale-110 transition-transform underline decoration-2 underline-offset-8">Terminate</button>
                           </form>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}
