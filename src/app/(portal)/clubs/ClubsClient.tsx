"use client";

import { useState, useMemo } from 'react';
import ClubCard from '@/components/ClubCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClubsClient({ clubsData }: { clubsData: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('All Regions');
  const [viewProtocol, setViewProtocol] = useState('GRID');

  const activeClubs = clubsData || [];

  const filteredClubs = useMemo(() => {
    return activeClubs.filter(club => {
      const name = club.name || '';
      const city = club.city || '';
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = regionFilter === 'All Regions' || city === regionFilter;
      return matchesSearch && matchesRegion;
    });
  }, [activeClubs, searchTerm, regionFilter]);

  const regions = useMemo(() => {
    const r = Array.from(new Set(activeClubs.map(c => c.city))).filter(Boolean);
    return ['All Regions', ...r as string[]];
  }, [activeClubs]);

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-32 px-6 lg:px-12">
      {/* Cinematic Background Accents */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -z-10"></div>
      <div className="fixed -bottom-48 -left-48 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] -z-10"></div>

      <header className="py-24 lg:py-40 flex flex-col items-center text-center gap-8 border-b border-outline-variant/30 mb-32">
        <span className="inline-block px-6 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Network Hub</span>
        <h1 className="text-6xl md:text-9xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
          Clubs <br />
          <span className="text-primary not-italic">Registry.</span>
        </h1>
        <p className="text-xl md:text-3xl text-on-surface-variant max-w-3xl font-medium leading-tight opacity-70">
          Explore and connect with over {activeClubs.length}+ active chapters shaping the future across District 3192.
        </p>

        <div className="flex items-center gap-4 mt-8">
          <div className="bg-surface-container-low p-2 rounded-[2rem] flex border border-outline-variant/30 shadow-ambient">
            <button 
              onClick={() => setViewProtocol('GRID')}
              className={`px-10 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${viewProtocol === 'GRID' ? 'bg-primary text-white shadow-xl' : 'text-on-surface-variant hover:text-primary'}`}
            >
              Grid View
            </button>
            <button 
              onClick={() => setViewProtocol('MAP')}
              className={`px-10 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${viewProtocol === 'MAP' ? 'bg-primary text-white shadow-xl' : 'text-on-surface-variant hover:text-primary'}`}
            >
              Map Protocol
            </button>
          </div>
        </div>
      </header>

      {/* Control Protocol Section */}
      <section className="mb-24">
        <div className="bg-surface-container-low/70 backdrop-blur-2xl rounded-[3rem] border border-outline-variant/30 shadow-ambient p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8">
          <div className="relative flex-1 w-full">
             <span className="absolute left-8 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/40">search</span>
             <input 
              type="text" 
              placeholder="SEARCH PROTOCOL: ENTER CLUB NAME OR REGION"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] pl-20 pr-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-on-surface placeholder:text-on-surface/20"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
            <div className="relative group min-w-[200px]">
              <select 
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full appearance-none pl-6 pr-12 py-5 rounded-[1.5rem] bg-surface-container-high border border-outline-variant/30 text-[10px] font-black uppercase tracking-widest cursor-pointer outline-none focus:border-primary/30 transition-all text-on-surface"
              >
                {regions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40">expand_more</span>
            </div>
          </div>

          <div className="h-12 w-px bg-outline-variant/30 hidden lg:block mx-4"></div>

          <div className="flex items-center gap-3 shrink-0">
             <span className="text-[10px] font-black text-on-surface/30 uppercase tracking-[0.3em]">Network Status:</span>
             <div className="flex items-center gap-2 px-6 py-3 bg-primary/5 rounded-full border border-primary/10">
               <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{filteredClubs.length} ACTIVE NODES</span>
             </div>
          </div>
        </div>
      </section>

      {/* Grid Interface */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredClubs.map((club, idx) => (
              <motion.div
                key={club.id || idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <ClubCard
                  name={club.name}
                  city={club.city}
                  members={Number(club.member_count)}
                  engagement={Number(Math.floor(Math.random() * 20) + 80)}
                  badge={idx % 4 === 0 ? "Top Performing" : "Active Chapter"}
                  type={idx % 2 === 0 ? "primary" : "secondary"}
                  slug={club.slug}
                  icon={idx % 3 === 0 ? "stars" : idx % 3 === 1 ? "school" : "waves"}
                />
              </motion.div>
            ))}

            {/* Charter CTA Card */}
            <motion.div
              layout
              className="relative rounded-[3rem] p-12 flex flex-col items-center justify-center text-center overflow-hidden min-h-[450px] bg-surface-container-low/50 border border-outline-variant/30 group backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col items-center space-y-8">
                <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-700">
                  <span className="material-symbols-outlined text-5xl">add_circle</span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-on-surface uppercase tracking-tighter font-display leading-none italic">
                    Charter <br /><span className="text-primary not-italic">New Chapter.</span>
                  </h3>
                  <p className="text-[11px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-60 leading-relaxed">
                    Initiate a new legacy in your community or university. Lead the change.
                  </p>
                </div>
                <button className="px-12 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                  Start Protocol
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {filteredClubs.length === 0 && (
          <div className="py-40 flex flex-col items-center justify-center text-center space-y-8 bg-surface-container-low/30 rounded-[4rem] border-2 border-dashed border-outline-variant/30">
             <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center text-primary/20">
                <span className="material-symbols-outlined text-5xl">search_off</span>
             </div>
             <div className="space-y-2">
               <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">Zero <span className="text-primary not-italic">Matches.</span></h3>
               <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] opacity-60">Adjust your signal filters or search parameters</p>
             </div>
             <button 
              onClick={() => {setSearchTerm(''); setRegionFilter('All Regions');}}
              className="px-10 py-4 bg-surface-container-high text-primary font-black text-[9px] uppercase tracking-[0.3em] rounded-full border border-primary/10 hover:bg-primary hover:text-white transition-all"
             >
               Reset Search Protocol
             </button>
          </div>
        )}
      </section>
    </main>
  );
}
