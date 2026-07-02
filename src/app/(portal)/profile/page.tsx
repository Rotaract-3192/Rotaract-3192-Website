import React from "react";
import Image from "next/image";
import { auth, currentUser } from '@/lib/mockAuth';
import { getUserProfile, getDashboardStats } from '@/app/actions/queries';
import DPDPControlPanel from "@/components/DPDPControlPanel";

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
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-32 pt-32 px-8">
      {/* Background Cinematic Accents */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -z-10"></div>
      <div className="fixed -bottom-48 -left-48 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

      {/* Profile Header */}
      <header className="flex flex-col md:flex-row items-center gap-12 mb-20">
        <div className="relative group shrink-0">
           <div className="w-48 h-48 rounded-[3rem] overflow-hidden border-4 border-surface shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2">
              <Image alt={displayName} src={avatarUrl} width={200} height={200} className="w-full h-full object-cover" />
           </div>
           <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30 border-4 border-surface group-hover:rotate-12 transition-transform">
              <span className="material-symbols-outlined text-xl">verified</span>
           </div>
        </div>
        
        <div className="text-center md:text-left space-y-4">
           <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Active Personnel</span>
           <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
             {displayName}
           </h1>
           <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-on-surface-variant font-display italic opacity-60">
             <span className="flex items-center gap-3">
               <span className="material-symbols-outlined text-primary text-xl">military_tech</span>
               {role.replace('_', ' ').toUpperCase()}
             </span>
             <span className="flex items-center gap-3">
               <span className="material-symbols-outlined text-primary text-xl">apartment</span>
               {clubName.toUpperCase()}
             </span>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Impact Visualizer */}
        <section className="lg:col-span-2 bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
           <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="relative w-56 h-56 flex items-center justify-center shrink-0">
                 <svg className="w-full h-full -rotate-90">
                    <circle className="text-surface-container-high" cx="112" cy="112" r="100" fill="transparent" stroke="currentColor" strokeWidth="12"></circle>
                    <circle className="text-primary transition-all duration-1000 ease-out" cx="112" cy="112" r="100" fill="transparent" stroke="currentColor" strokeDasharray="628" strokeDashoffset={628 * (1 - progressPercent / 100)} strokeLinecap="round" strokeWidth="12"></circle>
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black font-display text-on-surface leading-none italic">{totalHours}</span>
                    <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40">Sync Hours</span>
                 </div>
              </div>
              <div className="space-y-6 flex-1">
                 <h3 className="text-4xl font-black font-display uppercase tracking-tighter text-on-surface italic leading-none">Service <span className="text-primary not-italic">Integrity.</span></h3>
                 <p className="text-on-surface-variant text-lg font-medium leading-relaxed opacity-70 italic">
                    "You have successfully synchronized {totalHours} units of service impact. {progressPercent >= 100 ? "Goal parameters exceeded." : `Maintain protocol to bridge the remaining ${goalHours - totalHours} units.`}"
                 </p>
                 <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
                 </div>
              </div>
           </div>
        </section>

        {/* Tactical Stats */}
        <section className="space-y-8">
           <div className="bg-surface-container-low/70 backdrop-blur-xl p-10 rounded-[3rem] border border-outline-variant/30 shadow-ambient flex flex-col items-center text-center gap-6 group hover:bg-white transition-all duration-500">
              <div className="w-20 h-20 bg-secondary/10 rounded-[2rem] flex items-center justify-center text-secondary border border-secondary/20 group-hover:scale-110 transition-transform">
                 <span className="material-symbols-outlined text-4xl">workspace_premium</span>
              </div>
              <div className="space-y-1">
                 <p className="text-5xl font-black font-display tracking-tighter text-secondary italic leading-none">{stats.points}</p>
                 <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[.4em] opacity-40 italic">District Merit Score</p>
              </div>
           </div>
           
           <div className="bg-surface-container-low/70 backdrop-blur-xl p-10 rounded-[3rem] border border-outline-variant/30 shadow-ambient flex flex-col items-center text-center gap-6 group hover:bg-white transition-all duration-500">
              <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                 <span className="material-symbols-outlined text-4xl">event_available</span>
              </div>
              <div className="space-y-1">
                 <p className="text-5xl font-black font-display tracking-tighter text-primary italic leading-none">{stats.eventsAttended}</p>
                 <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[.4em] opacity-40 italic">Mission Attendance</p>
              </div>
           </div>
        </section>

        {/* Activity Log */}
        <section className="lg:col-span-3 space-y-10 mt-16">
           <div className="flex items-center gap-6">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Historical Log</h3>
              <div className="h-px flex-grow bg-outline-variant/30"></div>
           </div>
           <div className="bg-surface-container-low/50 backdrop-blur-xl p-20 rounded-[4rem] border border-outline-variant/10 flex flex-col items-center justify-center text-center gap-6">
              <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface-variant/20 border border-outline-variant/20">
                 <span className="material-symbols-outlined text-5xl">history</span>
              </div>
              <p className="text-on-surface-variant text-lg font-medium italic opacity-40 max-w-sm">
                Activity log currently offline. History will populate as you engage in District protocols.
              </p>
           </div>
        </section>

        {/* DPDP Consent and Data Rights Panel */}
        {profile && (
           <section className="lg:col-span-3 mt-16">
             <DPDPControlPanel 
               userData={{
                 id: profile.id,
                 email: profile.email,
                 firstName: profile.firstName ?? null,
                 lastName: profile.lastName ?? null,
                 role: profile.role ?? null,
                 clubId: profile.clubId ?? null,
                 bio: profile.bio ?? null,
                 avatarUrl: profile.avatarUrl ?? null,
                 points: profile.points ?? 0,
                 created_at: profile.createdAt ?? null
               }} 
               stats={stats} 
             />
           </section>
         )}
      </div>
    </main>
  );
}
