import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server';
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

  const clubUpdates = announcements.slice(0, 2);

  return (
    <div className="w-full min-h-screen bg-background font-body text-on-background selection:bg-primary-container selection:text-primary">
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* Welcoming Hero */}
        <section className="relative overflow-hidden rounded-3xl -container-low p-8 md:p-12 mt-4 shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="font-label text-tertiary text-xs font-bold uppercase tracking-[0.2em]">
                Rotaract District 3192
              </span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-on-surface">
                Welcome back, {displayName}
              </h2>
              <p className="font-body text-on-surface-variant text-lg max-w-md">
                {upcomingEvents.length > 0
                  ? `You have ${upcomingEvents.length} upcoming event${upcomingEvents.length > 1 ? 's' : ''} to look forward to.`
                  : 'No upcoming events right now. Check back soon!'}
              </p>
            </div>
            <Link
              href="/events"
              className="bg-primary hover:bg-primary-fixed-dim text-on-primary font-bold py-3 px-8 rounded-xl transition-all active:scale-95 flex items-center gap-2 group"
            >
              View Events
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </section>

        {/* Quick Actions Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-2xl font-bold tracking-tight">Quick Actions</h3>
            <span className="text-xs font-label uppercase tracking-widest text-outline">
              Frequent Tasks
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/profile"
              className="group bg-surface-container-lowest hover:-container transition-colors p-6 rounded-2xl flex flex-col gap-4 active:scale-[0.98] border border-outline-variant/10 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                <span className="material-symbols-outlined">timer</span>
              </div>
              <span className="font-headline font-bold text-lg leading-tight">Log Hours</span>
            </Link>
            <Link
              href="/events"
              className="group bg-surface-container-lowest hover:-container transition-colors p-6 rounded-2xl flex flex-col gap-4 active:scale-[0.98] border border-outline-variant/10 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-all">
                <span className="material-symbols-outlined">event_available</span>
              </div>
              <span className="font-headline font-bold text-lg leading-tight">Register for Event</span>
            </Link>
            <Link
              href="/clubs"
              className="group bg-surface-container-lowest hover:-container transition-colors p-6 rounded-2xl flex flex-col gap-4 active:scale-[0.98] border border-outline-variant/10 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all">
                <span className="material-symbols-outlined">contacts</span>
              </div>
              <span className="font-headline font-bold text-lg leading-tight">View Directory</span>
            </Link>
            <Link
              href="/mom"
              className="group bg-surface-container-lowest hover:-container transition-colors p-6 rounded-2xl flex flex-col gap-4 active:scale-[0.98] border border-outline-variant/10 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center text-error group-hover:bg-error group-hover:text-on-error transition-all">
                <span className="material-symbols-outlined">description</span>
              </div>
              <span className="font-headline font-bold text-lg leading-tight">Meeting Minutes</span>
            </Link>
          </div>
        </section>

        {/* Upcoming Events */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-2xl font-bold tracking-tight">Upcoming Events</h3>
            <Link href="/events" className="text-primary font-label text-sm uppercase tracking-widest hover:underline">
              View All
            </Link>
          </div>

          {upcomingEvents.length === 0 ? (
            <p className="text-on-surface-variant text-sm py-8 text-center">No upcoming events scheduled yet.</p>
          ) : (
            <div className="flex overflow-x-auto gap-6 pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 snap-x hide-scrollbar">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="min-w-[280px] md:min-w-[340px] snap-start -container-low rounded-2xl overflow-hidden group border border-outline-variant/10 shadow-md"
                >
                  {event.imageUrl ? (
                    <div className="h-40 relative">
                      <Image
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={event.imageUrl}
                        width={400}
                        height={200}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/20 to-transparent opacity-80" />
                    </div>
                  ) : (
                    <div className="h-40 bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-primary/30">event</span>
                    </div>
                  )}
                  <div className="p-6 space-y-3 relative z-10">
                    <span className="bg-primary-container text-on-primary-container text-[10px] px-2 py-1 rounded font-label font-bold uppercase tracking-widest">
                      {event.eventDate
                        ? new Date(event.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                        : 'TBD'}
                    </span>
                    <h4 className="font-headline text-xl font-bold">{event.title}</h4>
                    {event.location && (
                      <p className="text-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {event.location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* My Impact Stats */}
        <section className="-container-lowest rounded-3xl p-8 border border-outline-variant/5 shadow-xl">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h3 className="font-headline text-2xl font-bold tracking-tight text-on-surface">My Impact</h3>
              <p className="text-on-surface-variant text-sm">Your contribution to the district this year</p>
            </div>
            <Link href="/profile" className="text-primary font-bold text-sm hover:underline">
              Detailed Profile
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-1 border-l-2 border-primary pl-6">
              <span className="font-headline text-4xl font-bold text-on-surface">{stats.totalHours}</span>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-outline">Hours Logged</span>
            </div>
            <div className="flex flex-col gap-1 border-l-2 border-tertiary pl-6">
              <span className="font-headline text-4xl font-bold text-on-surface">{stats.eventsAttended}</span>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-outline">Events Attended</span>
            </div>
            <div className="flex flex-col gap-1 border-l-2 border-secondary pl-6">
              <span className="font-headline text-4xl font-bold text-on-surface">{stats.points}</span>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-outline">Points Earned</span>
            </div>
          </div>
        </section>

        {/* Announcements / Club Updates */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-2xl font-bold tracking-tight">District Announcements</h3>
          </div>
          {clubUpdates.length === 0 ? (
            <p className="text-on-surface-variant text-sm py-8 text-center">No announcements at this time.</p>
          ) : (
            <div className="space-y-4">
              {clubUpdates.map((ann) => (
                <div
                  key={ann.id}
                  className="p-6 bg-surface-container-low hover:-container rounded-2xl flex items-start gap-4 hover:translate-x-1 transition-all cursor-pointer border border-outline-variant/10 shadow-sm"
                >
                  <div className={`p-3 rounded-full shrink-0 ${ann.priority === 'high' ? 'bg-error/20 text-error' : 'bg-primary/20 text-primary'}`}>
                    <span className="material-symbols-outlined">campaign</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface mb-1">{ann.title}</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{ann.content}</p>
                    <span className="text-[10px] font-label text-outline uppercase mt-3 inline-block tracking-widest">
                      {ann.createdAt
                        ? new Date(ann.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                        : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
