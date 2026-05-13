import { getCampaigns } from '@/app/actions/queries';
import { updateCampaignStatus, createCampaign } from '@/app/actions/mutations';

export const revalidate = 0;

export default async function AdminCampaignsPage() {
  const campaigns = await getCampaigns();
  
  const totalRaised = campaigns.reduce((sum, c) => sum + (c.raisedAmount || 0), 0);
  const activeCampaignsCount = campaigns.filter(c => c.status === 'active').length;
  const pendingCampaignsCount = campaigns.filter(c => c.status === 'pending').length;

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none text-on-surface">Fiscal Intelligence</h1>
          <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-[0.3em] opacity-40 italic">Monitor District Funding Streams & Financial Protocols</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Treasury Stream Active</span>
          </div>
        </div>
      </header>

      {/* Metrics Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white shadow-xl relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-4 italic">Total Capital Generated</p>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-black text-primary opacity-50 uppercase tracking-widest">INR</span>
            <div className="text-5xl font-black text-on-surface tracking-tighter tabular-nums">
              {totalRaised.toLocaleString()}
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <div className="w-full h-1 bg-primary/10 rounded-full overflow-hidden">
               <div className="h-full bg-primary w-[75%]"></div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white shadow-xl relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-tertiary/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-4 italic">Operational Initiatives</p>
          <div className="flex items-baseline gap-2">
            <div className="text-5xl font-black text-on-surface tracking-tighter tabular-nums">{activeCampaignsCount}</div>
            <span className="text-sm font-black text-tertiary opacity-50 uppercase tracking-widest">Active</span>
          </div>
          <div className="mt-6 flex items-center gap-3">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-surface-container-high border-2 border-white shadow-sm"></div>)}
             </div>
             <span className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest">+ Live Stream</span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white shadow-xl relative overflow-hidden group border-b-4 border-b-primary">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-secondary/5 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-4 italic">Awaiting Authorization</p>
          <div className="flex items-baseline gap-2">
            <div className="text-5xl font-black text-primary tracking-tighter tabular-nums">{pendingCampaignsCount}</div>
            <span className="text-sm font-black text-on-surface-variant opacity-50 uppercase tracking-widest">Protocols</span>
          </div>
          <div className="mt-6">
             <span className="px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest border border-primary/10">High Priority Action</span>
          </div>
        </div>
      </section>

      {/* Initialize Funding Protocol */}
      <section className="bg-surface-container-low rounded-[3rem] p-12 border border-outline/5">
        <div className="flex items-center gap-5 mb-10">
           <div className="w-14 h-14 rounded-[1.25rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <span className="material-symbols-outlined text-3xl">add_chart</span>
           </div>
           <div>
              <h2 className="text-2xl font-black uppercase tracking-tight leading-none text-on-surface">Initiate Protocol</h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em] opacity-40 mt-2 italic">Deploy New Fiscal Initiative to District Network</p>
           </div>
        </div>

        <form action={createCampaign} className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Initiative Designation</label>
            <input name="title" type="text" required placeholder="e.g. DISTRICT CONFERENCE 2026" className="w-full bg-white border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface shadow-sm focus:ring-4 focus:ring-primary/10 transition-all placeholder:opacity-20" />
          </div>
          <div className="md:col-span-3 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Capital Target (₹)</label>
            <input name="goalAmount" type="number" required min="1" placeholder="50000" className="w-full bg-white border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface shadow-sm focus:ring-4 focus:ring-primary/10 transition-all placeholder:opacity-20" />
          </div>
          <div className="md:col-span-4 flex items-end">
             <button type="submit" className="w-full bg-primary text-white font-black uppercase tracking-[0.2em] text-[11px] py-5 rounded-[1.5rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-xl">rocket_launch</span>
                Deploy Protocol
             </button>
          </div>
          <div className="md:col-span-12 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Technical Brief / Description</label>
            <textarea name="description" rows={3} placeholder="Provide detailed operational objectives..." className="w-full bg-white border-none rounded-[2rem] py-6 px-8 text-sm font-bold text-on-surface shadow-sm focus:ring-4 focus:ring-primary/10 transition-all placeholder:opacity-20"></textarea>
          </div>
        </form>
      </section>

      {/* Initiatives Register */}
      <section>
        <div className="flex items-center justify-between mb-8 px-4">
          <h2 className="text-xl font-black text-on-surface uppercase tracking-tight flex items-center gap-3">
             <span className="w-2 h-8 bg-primary rounded-full"></span>
             Operational Initiatives
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {campaigns.length === 0 ? (
            <div className="col-span-full py-32 text-center text-[10px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">No operational initiatives registered in district treasury.</div>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white/70 backdrop-blur-xl rounded-[3rem] border border-white shadow-xl overflow-hidden group hover:shadow-2xl transition-all border-l-8 border-l-primary/10 hover:border-l-primary">
                <div className="p-10 flex flex-col md:flex-row gap-10">
                  <div className="md:w-1/3 flex flex-col justify-center items-center gap-4 bg-surface-container-low rounded-[2rem] p-8 shadow-inner shrink-0">
                    <span className="material-symbols-outlined text-5xl text-primary opacity-20 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500">account_balance_wallet</span>
                    <div className="text-center">
                       <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">Status Code</div>
                       <div className={`text-[11px] font-black uppercase tracking-[0.2em] mt-1 ${campaign.status === 'active' ? 'text-green-500' : 'text-primary'}`}>
                          {campaign.status}
                       </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{campaign.title}</h3>
                      <p className="text-sm text-on-surface-variant font-medium mt-3 opacity-60 line-clamp-2 leading-relaxed">{campaign.description}</p>
                    </div>

                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <div className="space-y-1">
                             <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 italic">Stream Intensity</span>
                             <div className="text-xl font-black text-on-surface tabular-nums">₹{campaign.raisedAmount?.toLocaleString() || 0}</div>
                          </div>
                          <div className="text-right space-y-1">
                             <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 italic">Target Metric</span>
                             <div className="text-sm font-bold text-on-surface-variant opacity-60 tabular-nums">₹{campaign.goalAmount.toLocaleString()}</div>
                          </div>
                       </div>

                       <div className="relative h-3 bg-surface-container-high rounded-full overflow-hidden">
                          <div 
                             className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000 ease-out" 
                             style={{ width: `${Math.min(100, ((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100)}%` }}
                          >
                             <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer"></div>
                          </div>
                       </div>

                       <div className="flex justify-between items-center pt-4">
                          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                             {Math.round(((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100)}% Saturation
                          </span>
                          <div className="flex gap-4">
                             {campaign.status === 'pending' && (
                               <form action={updateCampaignStatus.bind(null, campaign.id, 'active')}>
                                 <button type="submit" className="text-[10px] font-black text-green-500 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Approve Protocol</button>
                               </form>
                             )}
                             <form action={updateCampaignStatus.bind(null, campaign.id, 'completed')}>
                               <button type="submit" className="text-[10px] font-black text-tertiary uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Terminate Stream</button>
                             </form>
                          </div>
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

