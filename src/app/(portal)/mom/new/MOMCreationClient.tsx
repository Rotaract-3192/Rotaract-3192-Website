"use client";

import { useState } from "react";
import Link from "next/link";
import { createMom } from "@/app/actions/mutations";

export default function MOMCreationClient({ clubsList }: { clubsList: any[] }) {
  const [title, setTitle] = useState('');
  const [clubId, setClubId] = useState(clubsList.length > 0 ? clubsList[0].id : '');
  const [meetingDate, setMeetingDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('clubId', clubId);
      formData.append('meetingDate', meetingDate);
      
      await createMom(formData);
      setSubmitSuccess(true);
      setTimeout(() => {
        window.location.href = '/mom';
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-24">
      {/* Background Accents */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary-container/5 rounded-full blur-[140px] -z-10"></div>
      
      <header className="p-8 md:p-12 flex items-center gap-10">
        <Link href="/mom" className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all group border border-outline-variant/30 shrink-0 shadow-lg">
          <span className="material-symbols-outlined text-2xl group-hover:translate-x-[-4px] transition-transform">arrow_back</span>
        </Link>
        <div className="space-y-2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Active Capture</span>
          <h1 className="text-4xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none">Initialize <span className="text-primary italic">Sequence.</span></h1>
        </div>
      </header>

      <section className="px-8 md:px-12 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <form onSubmit={handleSubmit} className="bg-surface-container-low/70 backdrop-blur-2xl rounded-[3rem] border border-outline-variant/30 shadow-ambient overflow-hidden group">
            
            <div className="p-12 lg:p-16 border-b border-outline-variant/30 bg-surface-container-high/50">
              <div className="space-y-10">
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="SESSION IDENTIFIER: E.G. BOARD SYNC" 
                  className="w-full text-4xl lg:text-5xl font-black text-primary border-none p-0 focus:ring-0 placeholder:text-primary/10 bg-transparent font-display tracking-tighter uppercase italic outline-none"
                />
                
                <div className="flex flex-wrap gap-6">
                  <div className="bg-surface-container-high rounded-2xl px-6 py-4 border border-outline-variant/30 flex items-center gap-4 shadow-sm">
                     <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
                     <input 
                       type="date" 
                       value={meetingDate}
                       onChange={(e) => setMeetingDate(e.target.value)}
                       className="bg-transparent border-none text-[10px] font-black text-primary uppercase tracking-[0.2em] p-0 focus:ring-0 outline-none cursor-pointer" 
                     />
                  </div>
                  <div className="bg-surface-container-high rounded-2xl px-6 py-4 border border-outline-variant/30 flex items-center gap-4 shadow-sm">
                     <span className="material-symbols-outlined text-primary text-xl">layers</span>
                     <select 
                       value={clubId}
                       onChange={(e) => setClubId(e.target.value)}
                       className="bg-transparent border-none text-[10px] font-black text-primary uppercase tracking-[0.2em] p-0 focus:ring-0 italic outline-none cursor-pointer"
                     >
                       {clubsList.map((club) => (
                         <option key={club.id} value={club.id} className="bg-[#020617]">{club.name}</option>
                       ))}
                     </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-16 lg:p-24 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              {submitSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 border border-green-500/20">
                    <span className="material-symbols-outlined text-4xl animate-bounce">done</span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-white font-display uppercase tracking-tight italic">Sequence Created</h2>
                    <p className="text-[11px] text-on-surface-variant font-black uppercase tracking-[0.3em] opacity-40 italic">Redirecting to manifest feed...</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-10 relative z-10 w-full max-w-md">
                  <p className="text-[11px] text-on-surface-variant font-black uppercase tracking-[0.3em] opacity-40 leading-relaxed italic">
                    Press below to save the minutes record to the district dashboard.
                  </p>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-4 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">mic</span>
                    {isSubmitting ? 'Initializing Sync...' : 'Save meeting minutes'}
                  </button>
                </div>
              )}
            </div>

          </form>
        </div>
      </section>
    </main>
  );
}
