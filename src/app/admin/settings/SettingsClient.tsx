'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateDistrictSettings } from '@/app/actions/mutations';

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: string | null;
  createdAt: Date | null;
}

interface AnalyticsLog {
  id: string;
  eventType: string;
  eventMetadata: string | null;
  timestamp: Date | null;
}

interface AnalyticsSummary {
  totalVisits: number;
  totalResourceClicks: number;
  totalVideoClicks: number;
  totalTicketClicks: number;
  recentLogs: AnalyticsLog[];
}

interface SettingsClientProps {
  initialSettings: Record<string, string>;
  analytics: AnalyticsSummary;
  announcements: Announcement[];
}

export default function SettingsClient({ initialSettings, analytics, announcements }: SettingsClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Form Field State
  const [statsMembers, setStatsMembers] = useState(initialSettings.stats_members_override || '');
  const [statsClubs, setStatsClubs] = useState(initialSettings.stats_clubs_override || '');
  const [statsProjects, setStatsProjects] = useState(initialSettings.stats_projects_override || '');
  const [statsChartered, setStatsChartered] = useState(initialSettings.stats_chartered_clubs_override || '');
  
  const [resourceLink, setResourceLink] = useState(initialSettings.resource_link_url || '');
  const [resourceVideo, setResourceVideo] = useState(initialSettings.resource_video_url || '');
  const [ticketLink, setTicketLink] = useState(initialSettings.default_event_ticket_link || '');
  const [featuredAnnouncement, setFeaturedAnnouncement] = useState(initialSettings.featured_announcement_id || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const formData = new FormData(e.currentTarget);
      await updateDistrictSettings(formData);
      setSuccessMsg('District settings updated successfully!');
      
      // Smoothly hide the success message after 4 seconds
      setTimeout(() => {
        setSuccessMsg('');
      }, 4000);

      router.refresh();
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'Failed to update district settings. Check credentials or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEventLabel = (type: string) => {
    switch (type) {
      case 'homepage_visit':
        return 'Homepage Visit';
      case 'resource_click':
        return 'External Library Click';
      case 'video_click':
        return 'Video Academy Click';
      case 'ticket_click':
        return 'Book Tickets Redirect';
      default:
        return type;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'homepage_visit':
        return 'visibility';
      case 'resource_click':
        return 'folder_open';
      case 'video_click':
        return 'play_circle';
      case 'ticket_click':
        return 'local_activity';
      default:
        return 'info';
    }
  };

  const getEventColorClass = (type: string) => {
    switch (type) {
      case 'homepage_visit':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'resource_click':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'video_click':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'ticket_click':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default:
        return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      {/* Header Section */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Configuration Console</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            District <span className="text-primary">Settings</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Configure statistics overrides, default links, featured communications, and view analytics.
          </p>
        </div>

        <div className="flex items-center gap-4 glass-panel px-8 py-4">
          <span className="material-symbols-outlined text-primary text-xl">settings_suggest</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white font-sans">Control Hub v1.2</span>
        </div>
      </header>

      {/* Notifications Panel */}
      {(successMsg || errorMsg) && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          {successMsg && (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-4 font-sans text-sm font-semibold">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
              <span>{successMsg}</span>
            </div>
          )}
          {errorMsg && (
            <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-4 font-sans text-sm font-semibold">
              <span className="material-symbols-outlined text-2xl">error</span>
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      )}

      {/* Main Settings Forms Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        
        {/* Settings overrides Form */}
        <div className="xl:col-span-2 space-y-12">
          <form onSubmit={handleSubmit} className="glass-panel p-10 lg:p-14 space-y-12 relative overflow-hidden font-sans">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            {/* Section 1: Stats overrides */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                <span className="material-symbols-outlined text-primary text-2xl">analytics</span>
                <h2 className="text-xl font-bold uppercase tracking-wider text-white">Homepage Stats Overrides</h2>
              </div>
              <p className="text-xs text-text-muted opacity-60">
                Override the counts displayed in the homepage statistics counter. Leave fields blank to automatically calculate values based on active database records (Clubs, Users, and Projects).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Members Override */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary ml-2">Total Members Override</label>
                  <input
                    type="number"
                    name="stats_members_override"
                    placeholder="e.g. 2133 (Auto-calculate if empty)"
                    value={statsMembers}
                    onChange={(e) => setStatsMembers(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 tracking-wider"
                  />
                </div>

                {/* Clubs Override */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary ml-2">Total Clubs Override</label>
                  <input
                    type="number"
                    name="stats_clubs_override"
                    placeholder="e.g. 84 (Auto-calculate if empty)"
                    value={statsClubs}
                    onChange={(e) => setStatsClubs(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 tracking-wider"
                  />
                </div>

                {/* Projects Override */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary ml-2">Total Projects Override</label>
                  <input
                    type="number"
                    name="stats_projects_override"
                    placeholder="e.g. 150 (Auto-calculate if empty)"
                    value={statsProjects}
                    onChange={(e) => setStatsProjects(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 tracking-wider"
                  />
                </div>

                {/* Chartered Clubs Override */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary ml-2">Chartered Clubs Override</label>
                  <input
                    type="number"
                    name="stats_chartered_clubs_override"
                    placeholder="e.g. 15 (Auto-calculate if empty)"
                    value={statsChartered}
                    onChange={(e) => setStatsChartered(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 tracking-wider"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: External resources */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                <span className="material-symbols-outlined text-primary text-2xl">folder_shared</span>
                <h2 className="text-xl font-bold uppercase tracking-wider text-white">Resource Link Actions</h2>
              </div>
              <p className="text-xs text-text-muted opacity-60">
                Update URLs connected to the quick resource dashboard links. Clicks are logged dynamically for analytics reporting.
              </p>

              <div className="grid grid-cols-1 gap-8">
                {/* External Library Link */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary ml-2">External Library (Google Drive, Notion, etc.)</label>
                  <input
                    type="url"
                    name="resource_link_url"
                    placeholder="https://drive.google.com/drive/folders/..."
                    value={resourceLink}
                    onChange={(e) => setResourceLink(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 tracking-wider"
                  />
                </div>

                {/* Video Academy Link */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary ml-2">Video Academy Link (YouTube, Vimeo, etc.)</label>
                  <input
                    type="url"
                    name="resource_video_url"
                    placeholder="https://www.youtube.com/playlist?list=..."
                    value={resourceVideo}
                    onChange={(e) => setResourceVideo(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 tracking-wider"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Ticketing Configuration */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                <span className="material-symbols-outlined text-primary text-2xl">local_activity</span>
                <h2 className="text-xl font-bold uppercase tracking-wider text-white">Event Ticket Booking Flow</h2>
              </div>
              <p className="text-xs text-text-muted opacity-60">
                Define the default redirect URL when users click the "Book Tickets" action button on the events detail profiles page.
              </p>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary ml-2">Default Booking URL (Rotasphere, Townscript, etc.)</label>
                <input
                  type="url"
                  name="default_event_ticket_link"
                  placeholder="https://rotasphere.org/event-booking/..."
                  value={ticketLink}
                  onChange={(e) => setTicketLink(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 tracking-wider"
                />
              </div>
            </div>

            {/* Section 4: Highlights */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                <span className="material-symbols-outlined text-primary text-2xl">campaign</span>
                <h2 className="text-xl font-bold uppercase tracking-wider text-white">Announcement Broadcasting</h2>
              </div>
              <p className="text-xs text-text-muted opacity-60">
                Select a featured announcement to broadcast prominently across top banners.
              </p>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary ml-2">Featured Announcement</label>
                <div className="relative">
                  <select
                    name="featured_announcement_id"
                    value={featuredAnnouncement}
                    onChange={(e) => setFeaturedAnnouncement(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all appearance-none cursor-pointer tracking-wider"
                  >
                    <option value="" className="bg-slate-900">-- None Featured --</option>
                    {announcements.map((ann) => (
                      <option key={ann.id} value={ann.id} className="bg-slate-900">
                        [{ann.priority?.toUpperCase()}] {ann.title}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
                </div>
              </div>
            </div>

            {/* Form Action Footer */}
            <div className="flex justify-end pt-8 border-t border-white/5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white font-bold uppercase tracking-[0.4em] text-[11px] px-14 py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 disabled:bg-primary/50 transition-all flex items-center justify-center gap-3 group"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
                    Transmitting...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">save</span>
                    Save Configurations
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Analytics & Logs Sidebar */}
        <div className="xl:col-span-1 space-y-12">
          
          {/* Analytics Summary Widget */}
          <section className="glass-panel p-10 space-y-8 font-sans">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">insights</span>
              <h2 className="text-xl font-bold uppercase tracking-wider text-white">Click Analytics</h2>
            </div>
            <p className="text-xs text-text-muted opacity-60 leading-relaxed">
              Real-time tracker of clicks on critical external links and user actions.
            </p>

            <div className="space-y-6">
              {[
                { label: 'Homepage Visits', count: analytics.totalVisits, icon: 'visibility', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
                { label: 'External Library Clicks', count: analytics.totalResourceClicks, icon: 'folder_open', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                { label: 'Video Academy Clicks', count: analytics.totalVideoClicks, icon: 'play_circle', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                { label: 'Event Ticket Clicks', count: analytics.totalTicketClicks, icon: 'local_activity', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all duration-350">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${item.color}`}>
                      <span className="material-symbols-outlined text-lg">{item.icon}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">{item.label}</span>
                  </div>
                  <span className="text-2xl font-bold text-white font-display leading-none">{item.count}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Event Log Stream */}
          <section className="glass-panel p-10 space-y-8 font-sans">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider leading-none">Activity Stream</h2>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                <span className="text-[9px] font-bold text-primary uppercase tracking-[0.27em] leading-none">LIVE</span>
              </div>
            </div>
            
            <div className="space-y-6 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/5">
              {analytics.recentLogs.length === 0 ? (
                <div className="py-16 text-center opacity-30 text-[10px] font-bold uppercase tracking-[0.4em]">Waiting for active signals...</div>
              ) : (
                analytics.recentLogs.map((log) => (
                  <div key={log.id} className="flex gap-4 border-b border-white/5 pb-4 group last:border-0 last:pb-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 group-hover:scale-105 transition-transform ${getEventColorClass(log.eventType)}`}>
                      <span className="material-symbols-outlined text-sm">{getEventIcon(log.eventType)}</span>
                    </div>
                    <div className="space-y-1 min-w-0">
                      <p className="text-[10px] font-bold text-white uppercase tracking-wider truncate leading-tight">
                        {getEventLabel(log.eventType)}
                      </p>
                      {log.eventMetadata && (
                        <p className="text-[9px] text-text-muted/60 uppercase tracking-widest truncate leading-tight font-semibold">
                          Meta: {log.eventMetadata}
                        </p>
                      )}
                      <p className="text-[8px] font-bold text-text-muted/40 uppercase tracking-widest leading-none">
                        {log.timestamp ? new Date(log.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '---'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
