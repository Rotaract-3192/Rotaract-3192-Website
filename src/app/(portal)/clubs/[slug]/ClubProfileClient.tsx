"use client";

import { motion } from "framer-motion";
import EventCard from "@/components/EventCard";
import { format } from "date-fns";

export default function ClubProfileClient({ club, events, feeds }: { club: any, events: any[], feeds: any[] }) {
  return (
    <main className="min-h-screen pt-32 pb-40">
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background z-10"></div>
          <div className="absolute inset-0 bg-primary/10 backdrop-blur-3xl"></div>
          <img 
            src={club.logoUrl || '/images/hero-bg.jpg'} 
            className="w-full h-full object-cover opacity-20 grayscale scale-110 blur-xl"
            alt=""
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-40 h-40 mx-auto rounded-[3rem] bg-white/5 border border-white/10 p-4 backdrop-blur-2xl shadow-2xl"
          >
            <img src={club.logoUrl} className="w-full h-full object-contain" alt={club.name} />
          </motion.div>

          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-black text-primary uppercase tracking-[0.5em]"
            >
              Protocol: Registry // Active Chapter
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl font-bold text-white uppercase tracking-tighter font-display italic leading-none"
            >
              {club.name}
            </motion.h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-20 relative z-30">
        {/* Left Column: Command Center */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl space-y-12">
            <div className="space-y-8">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="w-8 h-[1px] bg-primary"></span>
                Operation Parameters
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/5">
                    <span className="material-symbols-outlined">verified</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Charter Date</p>
                    <p className="text-lg font-bold text-white uppercase tracking-tight italic">
                      {club.charterDate ? format(new Date(club.charterDate), 'MMMM yyyy') : 'Classified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/5">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Zone & City</p>
                    <p className="text-lg font-bold text-white uppercase tracking-tight italic">
                      {club.zone ? `${club.zone} (${club.city || 'Classified'})` : club.city || 'District Wide'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/5">
                    <span className="material-symbols-outlined">home</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Base of Operations</p>
                    <p className="text-lg font-bold text-white uppercase tracking-tight italic">
                      {club.venue || 'Classified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/5">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-widest font-sans">Briefing Schedule</p>
                    <p className="text-lg font-bold text-white uppercase tracking-tight italic">
                      {club.meetingDayTime || 'Classified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 space-y-8">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="w-8 h-[1px] bg-primary"></span>
                Leadership Command
              </h3>
              
              {/* President */}
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full border-2 border-primary/20 p-1 shrink-0">
                    <div className="w-full h-full rounded-full bg-white/10 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(club.presidentName || 'President')}`} className="w-full h-full object-cover" alt="President" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white uppercase tracking-tighter italic leading-none">{club.presidentName || 'Classified'}</p>
                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mt-2">President 24-25</p>
                  </div>
                </div>
                {(club.presidentPhone || club.presidentEmail) && (
                  <div className="pl-4 space-y-1.5 text-[10px] font-semibold text-text-muted/60 uppercase tracking-widest font-sans">
                    {club.presidentPhone && <p className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">phone</span> {club.presidentPhone}</p>}
                    {club.presidentEmail && <p className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">mail</span> {club.presidentEmail}</p>}
                  </div>
                )}
              </div>

              {/* Secretary */}
              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full border-2 border-primary/20 p-1 shrink-0">
                    <div className="w-full h-full rounded-full bg-white/10 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(club.secretaryName || 'Secretary')}`} className="w-full h-full object-cover" alt="Secretary" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white uppercase tracking-tighter italic leading-none">{club.secretaryName || 'Classified'}</p>
                    <p className="text-[9px] font-black text-primary/70 uppercase tracking-[0.2em] mt-2">Secretary 24-25</p>
                  </div>
                </div>
                {(club.secretaryPhone || club.secretaryEmail) && (
                  <div className="pl-4 space-y-1.5 text-[10px] font-semibold text-text-muted/60 uppercase tracking-widest font-sans">
                    {club.secretaryPhone && <p className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">phone</span> {club.secretaryPhone}</p>}
                    {club.secretaryEmail && <p className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">mail</span> {club.secretaryEmail}</p>}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex justify-between gap-4">
              {['language', 'public', 'share'].map((icon) => (
                <button key={icon} className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 border border-white/5 hover:bg-primary hover:text-white transition-all duration-500">
                  <span className="material-symbols-outlined">{icon}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Column: Mission Logs & intel */}
        <div className="lg:col-span-8 space-y-12">
          {/* About Section */}
          <section className="bg-white/5 border border-white/10 rounded-[3rem] p-12 backdrop-blur-3xl">
            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter font-display italic mb-8">Executive Summary</h2>
            <p className="text-xl text-text-muted leading-relaxed font-medium opacity-80 italic">
              {club.description || "Information encrypted. This chapter operates with a focus on community development and professional excellence within the district's strategic framework."}
            </p>
          </section>

          {/* Operations: Events */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white uppercase tracking-tighter font-display italic">Active Operations</h2>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">{events.length} Scheduled</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event, idx) => (
                <EventCard 
                  key={event.id || idx}
                  title={event.title}
                  date={format(new Date(event.eventDate), 'dd MMM')}
                  description={event.description}
                  image={event.imageUrl}
                  slug={event.slug}
                  badge={event.isSignatureProject ? 'Signature' : 'Mission'}
                  statusBadge="UPCOMING"
                />
              ))}
              {events.length === 0 && (
                <div className="col-span-full py-20 bg-white/5 border border-white/5 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-center opacity-40">
                  <span className="material-symbols-outlined text-4xl mb-4">event_busy</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">No active operations detected</p>
                </div>
              )}
            </div>
          </section>

          {/* Intelligence: Feeds */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter font-display italic">Intelligence Feed</h2>
            <div className="space-y-6">
              {feeds.map((feed, idx) => (
                <div key={feed.id || idx} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 group hover:bg-white/10 transition-all duration-500">
                  {feed.imageUrl && (
                    <div className="w-full md:w-48 h-32 rounded-3xl overflow-hidden shrink-0 border border-white/5">
                      <img src={feed.imageUrl} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="" />
                    </div>
                  )}
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">{format(new Date(feed.createdAt), 'dd MMMM yyyy')}</p>
                    <h4 className="text-xl font-bold text-white uppercase tracking-tight italic group-hover:text-primary transition-colors">{feed.title}</h4>
                    <p className="text-sm text-text-muted font-medium line-clamp-2 opacity-70 italic">{feed.content}</p>
                  </div>
                </div>
              ))}
              {feeds.length === 0 && (
                <div className="py-20 bg-white/5 border border-white/5 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-center opacity-40">
                  <span className="material-symbols-outlined text-4xl mb-4">rss_feed</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">Quiet on the frequency</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
