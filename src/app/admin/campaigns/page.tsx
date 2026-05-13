import { getCampaigns } from '@/app/actions/queries';
import { updateCampaignStatus, createCampaign } from '@/app/actions/mutations';

export const revalidate = 0;

export default async function AdminCampaignsPage() {
  const campaigns = await getCampaigns();
  
  const totalRaised = campaigns.reduce((sum, c) => sum + (c.raisedAmount || 0), 0);
  const activeCampaignsCount = campaigns.filter(c => c.status === 'active').length;
  const pendingCampaignsCount = campaigns.filter(c => c.status === 'pending').length;

  return (
    <>
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-primary font-display">Campaigns &amp; Treasury</h1>
          <p className="text-on-surface-variant max-w-lg">Oversee fiscal initiatives, manage district-wide fundraising, and approve pending budgetary requests.</p>
        </div>
      </header>

      {/* Create Campaign Form */}
      <section className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white shadow-xl p-8 mb-12">
        <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Create New Campaign</h2>
        <form action={createCampaign} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Campaign Title</label>
            <input name="title" type="text" required placeholder="Campaign name..." className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Goal Amount (₹)</label>
            <input name="goalAmount" type="number" required min="1" placeholder="50000" className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full bg-primary text-white font-black text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Create Campaign
            </button>
          </div>
          <div className="md:col-span-3 space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Description</label>
            <textarea name="description" rows={2} placeholder="Campaign description..." className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"></textarea>
          </div>
        </form>
      </section>

      {/* Metrics Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-surface-container-low p-8 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
          <div className="label-md uppercase tracking-[0.1em] text-zinc-500 mb-4 font-bold">Total Raised</div>
          <div className="text-5xl font-bold text-primary font-display mb-1">₹{totalRaised.toLocaleString()}</div>
        </div>
        <div className="bg-surface-container-low p-8 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary/5 rounded-full blur-2xl group-hover:bg-tertiary/10 transition-all"></div>
          <div className="label-md uppercase tracking-[0.1em] text-zinc-500 mb-4 font-bold">Active Campaigns</div>
          <div className="text-5xl font-bold text-tertiary font-display mb-1">{activeCampaignsCount}</div>
        </div>
        <div className="bg-surface-container-low p-8 rounded-2xl relative overflow-hidden group border-b-2 border-primary/20">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-error/5 rounded-full blur-2xl group-hover:bg-error/10 transition-all"></div>
          <div className="label-md uppercase tracking-[0.1em] text-zinc-500 mb-4 font-bold">Pending Approvals</div>
          <div className="text-5xl font-bold text-on-background font-display mb-1">{pendingCampaignsCount}</div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-on-background font-display">Live Initiatives</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-surface-container p-1 rounded-2xl overflow-hidden group">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/3 h-48 md:h-auto overflow-hidden bg-surface-container-low flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-outline-variant/50">campaign</span>
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${campaign.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-tertiary/10 text-tertiary'}`}>{campaign.status}</span>
                      <span className="text-zinc-500 text-xs font-medium">{Math.round(((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100)}% Funded</span>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-100 mb-2 font-display">{campaign.title}</h3>
                    <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{campaign.description}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-zinc-500">Target: ₹{campaign.goalAmount.toLocaleString()}</span>
                      <span className="text-primary">₹{campaign.raisedAmount?.toLocaleString() || 0}</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, ((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100)}%` }}></div>
                    </div>
                    <div className="pt-4 flex justify-end gap-2">
                      {campaign.status === 'pending' && (
                        <form action={updateCampaignStatus.bind(null, campaign.id, 'active')}>
                          <button type="submit" className="text-xs font-bold text-green-500 hover:underline">Approve</button>
                        </form>
                      )}
                      <form action={updateCampaignStatus.bind(null, campaign.id, 'completed')}>
                        <button type="submit" className="text-xs font-bold text-tertiary hover:underline">Mark Completed</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {campaigns.length === 0 && (
            <div className="col-span-2 text-center py-12 text-on-surface-variant italic">No campaigns found.</div>
          )}
        </div>
      </section>
    </>
  );
}
