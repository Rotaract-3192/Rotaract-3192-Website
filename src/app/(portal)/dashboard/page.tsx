import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth, currentUser } from '@/lib/mockAuth';
import { getUserProfile, getDashboardStats, getUpcomingEvents, getAnnouncements } from '@/app/actions/queries';

export const metadata = {
  title: 'Dashboard | District 3192',
};

export const revalidate = 0;

export default async function DashboardPage() {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  const [profile, stats, upcomingEvents, announcements] = await Promise.all([
    userId ? getUserProfile(userId) : null,
    userId ? getDashboardStats(userId) : { totalHours: 0, eventsAttended: 0, points: 0 },
    getUpcomingEvents(3),
    getAnnouncements(),
  ]);

  const displayName =
    profile
      ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim()
      : clerkUser?.firstName ?? 'Member';

  const clubUpdates = announcements.slice(0, 3);

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-24 pt-32">
      {/* Background Cinematic Accents */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -z-10"></div>
      <div className="fixed -bottom-48 -left-48 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

      {/* Welcoming Hero */}
      <section className="px-8 md:px-12 mb-16">
        <div className="relative overflow-hidden rounded-[3.5rem] bg-white/5 backdrop-blur-3xl p-12 lg:p-20 border border-white/10 shadow-ambient">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
             <div className="space-y-6 text-center lg:text-left">
               <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Terminal Active</span>
               <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter font-display uppercase leading-none italic">
                 Welcome, <span className="text-primary not-italic">{displayName}.</span>
               </h1>
               <p className="text-text-muted text-xl font-medium max-w-xl opacity-70 italic">
                 {upcomingEvents.length > 0
                   ? `Systems check: ${upcomingEvents.length} mission protocols pending initialization.`
                   : 'All clear. No immediate missions detected in your sector.'}
               </p>
             </div>
             <Link href="/events" className="shrink-0">
                <button className="bg-primary text-white px-12 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-primary/30 hover:scale-105 transition-all flex items-center gap-4 group">
                  Mission Intel
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-2 transition-transform">bolt</span>
                </button>
             </Link>
           </div>
        </div>
      </section>

      <div className="px-8 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-16">
          
          {/* Quick Access Node */}
          <section className="space-y-10">
            <div className="flex items-center gap-6">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Quick Access Nodes</h3>
              <div className="h-px flex-grow bg-outline-variant/30"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Log Hours', href: '/profile', icon: 'timer', color: 'primary' },
                { label: 'Register', href: '/events', icon: 'event_available', color: 'secondary' },
                { label: 'Directory', href: '/clubs', icon: 'contacts', color: 'on-surface' },
                { label: 'Minutes', href: '/mom', icon: 'description', color: 'error' }
              ].map((action, i) => (
                <Link key={i} href={action.href} className="group bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 flex flex-col items-center gap-4 text-center hover:bg-white/10 hover:shadow-ambient transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <span className="material-symbols-outlined text-3xl">{action.icon}</span>
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{action.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Upcoming Missions */}
          <section className="space-y-10">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Pending Missions</h3>
              <Link href="/events" className="text-[10px] font-black text-on-surface-variant hover:text-primary transition-colors uppercase tracking-[0.3em]">View Archive →</Link>
            </div>
            
            {upcomingEvents.length === 0 ? (
              <div className="p-12 bg-white/5 rounded-[3rem] border border-white/10 text-center italic text-text-muted opacity-50">
                No missions currently broadcasted.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {upcomingEvents.map((event) => (
                  <Link key={event.id} href={`/events/${event.slug}`} className="group bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 overflow-hidden shadow-ambient hover:bg-white/10 hover:shadow-2xl transition-all duration-700">
                    <div className="h-40 relative overflow-hidden">
                      {event.imageUrl ? (
                        <Image alt={event.title} src={event.imageUrl} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                      ) : (
                        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-primary/30">
                          <span className="material-symbols-outlined text-6xl">event</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                      <div className="absolute top-6 right-6">
                        <span className="bg-primary/90 backdrop-blur-md text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/20">
                          {event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'TBD'}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 space-y-4">
                      <h4 className="text-2xl font-black text-white font-display uppercase tracking-tighter leading-none italic group-hover:text-primary transition-colors">{event.title}</h4>
                      <p className="text-[10px] font-black text-text-muted/50 uppercase tracking-widest flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">location_on</span>
                        {event.location || 'Co-ordinate Pending'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar - Impact & Intel */}
        <div className="space-y-16">
          
          {/* Force Status / Stats */}
          <section className="bg-white/5 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/10 shadow-ambient space-y-10">
            <div className="space-y-2">
               <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Impact Protocol</h3>
               <p className="text-text-muted text-sm font-medium italic opacity-60">District 3192 Performance Matrix</p>
            </div>
            
            <div className="space-y-8">
              {[
                { label: 'Hours Logged', val: stats.totalHours, icon: 'timer', color: 'text-primary' },
                { label: 'Missions Complete', val: stats.eventsAttended, icon: 'done_all', color: 'text-secondary' },
                { label: 'Impact Score', val: stats.points, icon: 'diamond', color: 'text-white' }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                  </div>
                  <div>
                    <p className={`text-4xl font-black font-display tracking-tighter leading-none italic ${stat.color}`}>{stat.val}</p>
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.3em] opacity-40 italic">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/profile" className="block pt-4">
              <button className="w-full bg-white/5 text-white border border-white/10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all">Full Intelligence Profile</button>
            </Link>
          </section>

          {/* District Broadcasts */}
          <section className="space-y-10">
            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">District Broadcasts</h3>
            
            <div className="space-y-6">
              {clubUpdates.length === 0 ? (
                <p className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant opacity-30 italic">No active signals.</p>
              ) : (
                clubUpdates.map((ann) => (
                  <div key={ann.id} className="group p-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:bg-white/10 hover:shadow-ambient transition-all duration-500 space-y-4">
                    <div className="flex items-center justify-between">
                       <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${ann.priority === 'high' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                         {ann.priority === 'high' ? 'Priority Signal' : 'Standard Broadcast'}
                       </span>
                       <span className="text-[9px] font-black text-text-muted/30 uppercase tracking-widest italic">
                         {ann.createdAt ? new Date(ann.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : ''}
                       </span>
                    </div>
                    <h4 className="text-lg font-black text-white font-display uppercase tracking-tight italic group-hover:text-primary transition-colors leading-tight">{ann.title}</h4>
                    <p className="text-text-muted text-sm font-medium leading-relaxed opacity-60 line-clamp-2 italic">"{ann.content}"</p>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
