"use client";

import { useState, useMemo } from 'react';
import ClubCard from '@/components/ClubCard';
import ClubListItem from '@/components/ClubListItem';
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
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-32 px-6 lg:px-12 pt-32">
      {/* Header Section */}
      <header className="py-20 flex flex-col items-center text-center gap-10 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">District Network Hub</span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-medium text-white tracking-tight font-display uppercase leading-none">
          Clubs <br />
          <span className="text-primary">Registry</span>
        </h1>
        
        <p className="text-lg md:text-xl text-text-muted max-w-2xl font-medium leading-relaxed opacity-70">
          Explore and connect with over {activeClubs.length}+ active chapters shaping the future across District 3192.
        </p>

        <div className="flex items-center gap-4 mt-4">
          <div className="bg-white/5 p-1.5 rounded-2xl flex border border-white/10 backdrop-blur-xl">
            <button 
              onClick={() => setViewProtocol('GRID')}
              className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${viewProtocol === 'GRID' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white'}`}
            >
              Grid
            </button>
            <button 
              onClick={() => setViewProtocol('LIST')}
              className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${viewProtocol === 'LIST' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white'}`}
            >
              List
            </button>
            <button 
              onClick={() => setViewProtocol('MAP')}
              className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${viewProtocol === 'MAP' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white'}`}
            >
              Map
            </button>
          </div>
        </div>
      </header>

      {/* Search & Filter Protocol */}
      <section className="mb-20">
        <div className="glass-panel p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-6">
          <div className="relative flex-1 w-full">
             <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/40">search</span>
             <input 
              type="text" 
              placeholder="SEARCH BY CLUB NAME OR REGION..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-[11px] font-bold uppercase tracking-[0.2em] focus:outline-none focus:border-primary/30 transition-all text-white placeholder:text-white/10"
            />
          </div>
          
          <div className="relative w-full lg:w-64">
            <select 
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full appearance-none pl-6 pr-12 py-5 rounded-2xl bg-white/5 border border-white/5 text-[11px] font-bold uppercase tracking-widest cursor-pointer outline-none focus:border-primary/30 transition-all text-white"
            >
              {regions.map(r => <option key={r} value={r} className="bg-[#020617]">{r}</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40">expand_more</span>
          </div>

          <div className="flex items-center gap-4 px-6 py-4 bg-primary/5 rounded-2xl border border-primary/10 shrink-0">
             <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#3B82F6]"></span>
             <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{filteredClubs.length} ACTIVE NODES</span>
          </div>
        </div>
      </section>

      {/* Grid/List/Map Interface */}
      <section>
        {viewProtocol === 'MAP' ? (
          <div className="w-full flex justify-center">
            <div className="w-full max-w-5xl rounded-[3rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-8 shadow-ambient relative">
              <div className="w-full aspect-[16/9] min-h-[500px] rounded-2xl overflow-hidden bg-navy/20">
                <iframe
                  src="https://www.google.com/maps/d/u/1/embed?mid=1QVmbe788_6Pefn8jekldzo2e7wW2G9Q&ehbc=2E312F&noprof=1"
                  style={{ border: 0 }}
                  className="w-full h-full opacity-90"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        ) : (
          <div className={viewProtocol === 'GRID' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" : "flex flex-col gap-6"}>
            <AnimatePresence mode="popLayout">
              {filteredClubs.map((club, idx) => (
                <motion.div
                  key={club.id || idx}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  {viewProtocol === 'GRID' ? (
                    <ClubCard
                      name={club.name}
                      city={club.city ? `${club.city}${club.zone ? ` • ${club.zone}` : ''}` : 'District 3192'}
                      members={club.memberCount ?? 0}
                      engagement={(idx * 7 + 80) % 20 + 80}
                      badge={club.zone || "Active Chapter"}
                      type={idx % 2 === 0 ? "primary" : "secondary"}
                      slug={club.slug}
                      logoUrl={club.logoUrl}
                      icon={idx % 3 === 0 ? "stars" : idx % 3 === 1 ? "school" : "waves"}
                    />
                  ) : (
                    <ClubListItem
                      name={club.name}
                      city={club.city ? `${club.city}${club.zone ? ` • ${club.zone}` : ''}` : 'District 3192'}
                      members={club.memberCount ?? 0}
                      engagement={(idx * 7 + 80) % 20 + 80}
                      slug={club.slug}
                      logoUrl={club.logoUrl}
                      icon={idx % 3 === 0 ? "stars" : idx % 3 === 1 ? "school" : "waves"}
                    />
                  )}
                </motion.div>
              ))}

              {/* Charter CTA Card - Only show in Grid View for aesthetic reasons */}
              {viewProtocol === 'GRID' && (
                <motion.div
                  layout
                  className="relative rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center overflow-hidden min-h-[400px] bg-white/5 border border-white/5 group backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 flex flex-col items-center space-y-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-700">
                      <span className="material-symbols-outlined text-4xl">add_circle</span>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-white uppercase tracking-tight font-display leading-none">
                        Charter <br /><span className="text-primary">New Chapter</span>
                      </h3>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-60 leading-relaxed max-w-[200px]">
                        Initiate a new legacy in your community. Lead the change.
                      </p>
                    </div>
                    <button className="px-10 py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                      Start Protocol
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {viewProtocol !== 'MAP' && filteredClubs.length === 0 && (
          <div className="py-40 flex flex-col items-center justify-center text-center space-y-8 bg-white/5 rounded-[3rem] border border-white/5 border-dashed">
             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-primary/20">
                <span className="material-symbols-outlined text-4xl">search_off</span>
             </div>
             <div className="space-y-2">
               <h3 className="text-2xl font-bold text-white uppercase tracking-tight font-display">Zero Matches</h3>
               <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.4em] opacity-60">Adjust your signal filters or search parameters</p>
             </div>
             <button 
              onClick={() => {setSearchTerm(''); setRegionFilter('All Regions');}}
              className="px-10 py-4 bg-white/10 text-primary font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl border border-white/5 hover:bg-primary hover:text-white transition-all"
             >
               Reset Search Protocol
             </button>
          </div>
        )}
      </section>
    </main>
  );
}
