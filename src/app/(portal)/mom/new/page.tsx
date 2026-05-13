"use client";

import Link from "next/link";

export default function NewMOMPage() {
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
          
          <div className="bg-surface-container-low/70 backdrop-blur-2xl rounded-[3rem] border border-outline-variant/30 shadow-ambient overflow-hidden group">
            
            <div className="p-12 lg:p-16 border-b border-outline-variant/30 bg-surface-container-high/50">
              <div className="space-y-10">
                <input 
                  type="text" 
                  placeholder="SESSION IDENTIFIER: E.G. BOARD SYNC" 
                  className="w-full text-4xl lg:text-5xl font-black text-primary border-none p-0 focus:ring-0 placeholder:text-primary/10 bg-transparent font-display tracking-tighter uppercase italic outline-none"
                />
                <div className="flex flex-wrap gap-6">
                  <div className="bg-surface-container-high rounded-2xl px-6 py-4 border border-outline-variant/30 flex items-center gap-4 shadow-sm">
                     <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
                     <input type="date" className="bg-transparent border-none text-[10px] font-black text-primary uppercase tracking-[0.2em] p-0 focus:ring-0 outline-none" />
                  </div>
                  <div className="bg-surface-container-high rounded-2xl px-6 py-4 border border-outline-variant/30 flex items-center gap-4 shadow-sm">
                     <span className="material-symbols-outlined text-primary text-xl">layers</span>
                     <select className="bg-transparent border-none text-[10px] font-black text-primary uppercase tracking-[0.2em] p-0 focus:ring-0 italic outline-none cursor-pointer">
                       <option>General Body Sequence</option>
                       <option>Strategic Board Sync</option>
                       <option>Tactical Committee Feed</option>
                       <option>Ad-hoc Transmission</option>
                     </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-16 lg:p-24 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              {/* Capture Node */}
              <div className="relative w-56 h-56 mb-16 flex items-center justify-center cursor-pointer group/node">
                <div className="absolute inset-0 bg-error/10 rounded-full scale-125 animate-pulse"></div>
                <div className="absolute inset-0 bg-error/5 rounded-full scale-150 animate-ping opacity-20"></div>
                <div className="relative w-40 h-40 bg-error rounded-full flex items-center justify-center text-white shadow-2xl group-hover/node:scale-95 active:group-hover/node:scale-90 transition-all duration-500 border-8 border-white/20">
                   <span className="material-symbols-outlined text-6xl">mic</span>
                </div>
              </div>
              
              <div className="text-center space-y-6 relative z-10">
                <h2 className="text-3xl font-black text-on-surface font-display tracking-tighter uppercase italic leading-none">Initialize <span className="text-primary">Capture.</span></h2>
                <p className="text-[11px] text-on-surface-variant font-black max-w-sm text-center uppercase tracking-[0.3em] opacity-40 leading-relaxed italic">Intelligence engine will perform real-time extraction of action tokens and decision nodes during transmission.</p>
              </div>
              
              <div className="mt-20 flex flex-col sm:flex-row items-center gap-8 border-t border-outline-variant/30 pt-16 w-full max-w-lg relative z-10">
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] shrink-0">Protocol: External Feed</span>
                <button className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface font-black py-5 rounded-[1.5rem] uppercase tracking-[0.2em] text-[10px] shadow-ambient hover:bg-primary hover:text-white transition-all duration-500 flex items-center justify-center gap-4 group/upload">
                  <span className="material-symbols-outlined text-lg opacity-40 group-hover/upload:opacity-100 transition-opacity">cloud_upload</span>
                  Ingest Digital Audio
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>
    </main>
  );
}
