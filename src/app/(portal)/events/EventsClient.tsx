"use client";

import { useState, useMemo } from "react";
import EventCard from "@/components/EventCard";
import { motion, AnimatePresence } from "framer-motion";
import { isAfter, isBefore, startOfToday, format } from 'date-fns';

export default function EventsClient({ eventsData }: { eventsData: any[] }) {
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'PREVIOUS' | 'CALENDAR'>('UPCOMING');
  
  const today = startOfToday();
  
  const { upcoming, previous } = useMemo(() => {
    const sorted = [...(eventsData || [])].sort((a: any, b: any) => {
      const dateA = a.eventDate ? new Date(a.eventDate).getTime() : 0;
      const dateB = b.eventDate ? new Date(b.eventDate).getTime() : 0;
      return dateA - dateB;
    });

    return {
      upcoming: sorted.filter(e => {
        if (e.status === 'upcoming' || e.status === 'ongoing') return true;
        if (e.status === 'completed') return false;
        if (!e.eventDate) return true;
        const date = new Date(e.eventDate);
        return isAfter(date, today) || date.getTime() === today.getTime();
      }),
      previous: sorted.filter(e => {
        if (e.status === 'completed') return true;
        if (e.status === 'upcoming' || e.status === 'ongoing') return false;
        if (!e.eventDate) return false;
        const date = new Date(e.eventDate);
        return isBefore(date, today);
      }).reverse()
    };
  }, [eventsData, today]);

  const currentEvents = activeTab === 'UPCOMING' ? upcoming : previous;
  const featuredEvent = activeTab === 'UPCOMING' ? upcoming[0] : null;
  const displayEvents = featuredEvent ? upcoming.slice(1) : currentEvents;

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-32 px-6 lg:px-12 pt-32">
      {/* Header Section */}
      <header className="py-20 flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">District Pulse</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-medium text-white tracking-tight font-display uppercase leading-none italic">
            District <br />
            <span className="text-primary not-italic">Events</span>
          </h1>
          
          <div className="flex items-center gap-4 mt-8">
            <div className="bg-white/5 p-1.5 rounded-2xl flex border border-white/10 backdrop-blur-xl">
              <button 
                onClick={() => setActiveTab('UPCOMING')}
                className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'UPCOMING' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white'}`}
              >
                Upcoming
              </button>
              <button 
                onClick={() => setActiveTab('PREVIOUS')}
                className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'PREVIOUS' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white'}`}
              >
                Previous
              </button>
              <button 
                onClick={() => setActiveTab('CALENDAR')}
                className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'CALENDAR' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white'}`}
              >
                Calendar
              </button>
            </div>
          </div>
        </div>
        
        {activeTab !== 'CALENDAR' && (
          <div className="flex flex-wrap gap-4">
            <div className="relative group">
              <select className="appearance-none bg-white/5 border border-white/10 rounded-2xl px-8 py-4 pr-12 font-bold text-[10px] uppercase tracking-[0.2em] focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer outline-none text-white italic">
                <option className="bg-[#020617]">Category: All</option>
                <option className="bg-[#020617]">Service Project</option>
                <option className="bg-[#020617]">Professional Dev</option>
                <option className="bg-[#020617]">Social Mixer</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40">expand_more</span>
            </div>
          </div>
        )}
      </header>

      {/* Events Grid / Calendar */}
      <div className="space-y-12">
        <AnimatePresence mode="wait">
          {activeTab === 'CALENDAR' ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex justify-center"
            >
              <div className="w-full max-w-5xl rounded-[3rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-8 shadow-ambient relative">
                <div className="w-full aspect-[4/3] md:aspect-[16/10] min-h-[600px] rounded-2xl overflow-hidden bg-navy/20">
                  <iframe
                    src="https://calendar.google.com/calendar/embed?src=tech.rotaract3192%40gmail.com&ctz=Asia%2FKolkata"
                    style={{ border: 0 }}
                    className="w-full h-full opacity-90"
                    frameBorder="0"
                    scrolling="no"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.section 
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {/* Featured Card */}
              {featuredEvent && (
                <div className="lg:col-span-2 group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 shadow-2xl transition-all duration-700 h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 scale-110 group-hover:scale-100 transition-all duration-1000">
                    <img className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100" src={featuredEvent.imageUrl} alt={featuredEvent.title} />
                  </div>
                  
                  <div className="absolute top-8 left-8 z-20 flex gap-3">
                    <span className="bg-primary text-white text-[9px] font-bold uppercase tracking-[0.4em] px-5 py-2 rounded-full shadow-lg">Featured Mission</span>
                  </div>

                  <div className="absolute bottom-0 left-0 p-10 lg:p-12 z-20 w-full space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-4xl md:text-5xl font-bold text-white leading-none font-display tracking-tight uppercase italic">{featuredEvent.title}</h3>
                      <div className="flex flex-wrap items-center gap-8 text-text-muted italic">
                        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                          <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
                          {featuredEvent.yearDateLabel || (featuredEvent.eventDate ? format(new Date(featuredEvent.eventDate), 'PPP') : 'NO DATE')}
                        </span>
                        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em]">
                          <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                          {featuredEvent.location || 'PENDING'}
                        </span>
                      </div>
                    </div>
                    
                    <a href={`/events/${featuredEvent.slug}`} className="inline-flex items-center justify-center gap-4 bg-primary text-white font-bold text-[11px] uppercase tracking-[0.4em] px-10 py-4 rounded-xl hover:shadow-xl hover:shadow-primary/20 transition-all group/btn no-underline">
                      Access Intel
                      <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-2 transition-transform">north_east</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Other Events */}
              {displayEvents.map((event: any, idx: number) => (
                <EventCard 
                  key={event.id || idx}
                  title={event.title}
                  date={event.yearDateLabel || (event.eventDate ? format(new Date(event.eventDate), 'dd MMM') : 'NO DATE')}
                  description={event.description}
                  image={event.imageUrl}
                  slug={event.slug}
                  badge={event.isSignatureProject ? 'Signature' : 'Mission'}
                  statusBadge={activeTab}
                  rsvpLink={event.rsvpLink}
                />
              ))}

              {currentEvents.length === 0 && (
                <div className="lg:col-span-3 py-40 flex flex-col items-center justify-center text-center space-y-8 bg-white/5 rounded-[3rem] border border-white/5 border-dashed">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-primary/20">
                    <span className="material-symbols-outlined text-4xl">event_busy</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight font-display italic">No Records Detected</h3>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.4em] opacity-60">The selected frequency is currently quiet.</p>
                  </div>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

    </main>
  );
}
