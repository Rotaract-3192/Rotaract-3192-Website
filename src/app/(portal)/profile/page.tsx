import React from "react";
import Image from "next/image";
import { auth, currentUser } from '@clerk/nextjs/server';
import { getUserProfile, getDashboardStats } from '@/app/actions/queries';

export const metadata = {
  title: "My Profile | District 3192",
};

export const revalidate = 0;

export default async function ProfilePage() {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  const [profile, stats] = await Promise.all([
    userId ? getUserProfile(userId) : null,
    userId ? getDashboardStats(userId) : { totalHours: 0, eventsAttended: 0, points: 0 },
  ]);

  const displayName = profile 
    ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim() 
    : clerkUser?.firstName ?? 'Member';
  
  const role = profile?.role || 'Rotaractor';
  const clubName = "District 3192"; // In a real app, join with clubs table
  const avatarUrl = profile?.avatarUrl || clerkUser?.imageUrl || `https://ui-avatars.com/api/?name=${displayName}&background=random`;

  const totalHours = stats.totalHours;
  const goalHours = 300;
  const progressPercent = Math.min(100, (totalHours / goalHours) * 100);
  const strokeDasharray = 552.92;
  const strokeDashoffset = strokeDasharray * (1 - progressPercent / 100);

  return (
    <div className="w-full min-h-screen font-body text-on-background selection:bg-primary-container selection:text-primary">
      <div className="max-w-3xl mx-auto pt-12 pb-32 px-6 space-y-10">
        
        {/* Header Title */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-headline tracking-tighter text-on-surface">
            My Profile
          </h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-high hover:bg-surface-container transition-colors active:scale-95 duration-200 border border-outline-variant/10">
            <span className="material-symbols-outlined text-primary">settings</span>
          </button>
        </div>

        {/* Hero Section */}
        <section className="relative">
          <div className="flex flex-col gap-6">
            <div className="w-full aspect-[4/5] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl relative group -container-low">
              <Image
                alt={displayName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={avatarUrl}
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="space-y-1">
              <h2 className="text-4xl font-headline font-bold tracking-tight text-on-surface">
                {displayName}
              </h2>
              <p className="text-primary font-headline font-medium text-lg tracking-wide uppercase">
                {role.replace('_', ' ')}
              </p>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">apartment</span>
                <span className="text-sm font-medium">{clubName}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Service Hours: Visual Metric */}
        <section className="-container-low p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8 border border-outline-variant/10 shadow-sm">
          <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
            {/* Circular Progress Background */}
            <svg className="w-full h-full -rotate-90">
              <circle
                className="text-surface-container-highest"
                cx="96"
                cy="96"
                fill="transparent"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
              ></circle>
              <circle
                className="text-primary transition-all duration-1000 ease-out"
                cx="96"
                cy="96"
                fill="transparent"
                r="88"
                stroke="currentColor"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="8"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-headline font-bold text-on-surface">{totalHours}</span>
              <span className="text-[10px] font-label font-extrabold uppercase tracking-[0.2em] text-on-surface-variant">
                of {goalHours} Hours
              </span>
            </div>
          </div>
          <div className="space-y-2 max-w-sm">
            <h3 className="text-2xl font-headline font-semibold text-on-surface">Service Impact</h3>
            <p className="text-base text-on-surface-variant">
              You have completed {totalHours} hours of community service. {progressPercent >= 100 ? "You've surpassed your yearly goal! Incredible dedication." : `You are ${goalHours - totalHours} hours away from your yearly district goal.`}
            </p>
          </div>
        </section>

        {/* Achievements */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">
              Points & Rank
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-secondary-container/10 border border-secondary/20 flex flex-col items-center gap-2">
               <span className="material-symbols-outlined text-secondary text-3xl">military_tech</span>
               <span className="text-2xl font-bold text-on-surface">{stats.points}</span>
               <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">District Points</span>
            </div>
            <div className="p-6 rounded-2xl bg-tertiary-container/10 border border-tertiary/20 flex flex-col items-center gap-2">
               <span className="material-symbols-outlined text-tertiary text-3xl">calendar_month</span>
               <span className="text-2xl font-bold text-on-surface">{stats.eventsAttended}</span>
               <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Events Attended</span>
            </div>
          </div>
        </section>

        {/* Activity Timeline */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">
              Recent Activity
            </h3>
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Live Stream</span>
          </div>
          <div className="p-12 text-center -container-lowest rounded-3xl border border-outline-variant/10 opacity-50">
             <span className="material-symbols-outlined text-4xl mb-2">history</span>
             <p className="text-sm font-medium">Activity history will appear as you participate in district events and log hours.</p>
          </div>
        </section>

      </div>
    </div>
  );
}
