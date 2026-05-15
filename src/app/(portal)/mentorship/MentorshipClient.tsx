"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Mentor {
  id: string;
  name: string;
  role: string;
  organization: string;
  expertise: string[];
  image_url: string;
  bio: string;
}

export default function MentorshipClient({ mentors }: { mentors: Mentor[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    mentor.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-32 px-6 lg:px-12">
      <header className="py-24 lg:py-40 flex flex-col items-center text-center gap-8 mb-20">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Leadership Ascension</span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tight font-display uppercase leading-none">
          Mentorship <br />
          <span className="text-primary">Network</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-text-muted max-w-3xl font-medium leading-tight opacity-70 font-sans">
          Connect with industry veterans and visionary leaders dedicated to your professional trajectory.
        </p>
      </header>

      {/* Search and Filters */}
      <section className="mb-24">
        <div className="glass-panel p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-8">
          <div className="relative flex-1 w-full">
             <span className="absolute left-8 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/40">search</span>
             <input 
              type="text" 
              placeholder="Search by expertise or mentor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-20 pr-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-white placeholder:text-white/20 font-sans"
            />
          </div>
          
          <div className="flex items-center gap-4 shrink-0 w-full lg:w-auto">
             <button className="flex-1 lg:flex-none px-12 py-5 bg-primary text-white rounded-xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
               Apply for Mentorship
             </button>
             <button className="w-14 h-14 bg-white/5 text-white/40 rounded-xl flex items-center justify-center border border-white/10 hover:text-primary hover:border-primary/30 transition-all">
               <span className="material-symbols-outlined">help</span>
             </button>
          </div>
        </div>
      </section>

      {/* Mentor Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredMentors.map((mentor, idx) => (
              <motion.div
                key={mentor.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="group glass-panel overflow-hidden hover:border-primary/30 transition-all duration-700 flex flex-col"
              >
                <div className="relative h-72 overflow-hidden">
                   <img 
                    src={mentor.image_url} 
                    alt={mentor.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent"></div>
                   <div className="absolute bottom-6 left-8 right-8">
                      <div className="space-y-3">
                        <div className="text-[9px] font-bold text-primary uppercase tracking-[0.3em] bg-primary/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary/20 inline-block">
                          {mentor.role}
                        </div>
                        <h3 className="text-3xl font-bold text-white uppercase tracking-tight font-display leading-none group-hover:text-primary transition-colors">
                          {mentor.name}
                        </h3>
                      </div>
                   </div>
                </div>

                <div className="p-10 flex flex-col flex-1 space-y-8">
                  <p className="text-text-muted text-sm font-medium leading-relaxed opacity-70 line-clamp-3 font-sans">
                    {mentor.bio}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((exp, eIdx) => (
                      <span key={eIdx} className="bg-white/5 text-primary text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-lg border border-white/5 group-hover:border-primary/20 transition-colors">
                        {exp}
                      </span>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-white/5 mt-auto">
                     <button className="w-full py-5 bg-white/5 text-primary font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl border border-white/10 hover:bg-primary hover:text-white hover:border-transparent transition-all shadow-sm">
                       Initiate Connection
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredMentors.length === 0 && (
          <div className="py-40 flex flex-col items-center justify-center text-center space-y-8 glass-panel border-dashed">
             <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-primary/20 border border-white/5">
                <span className="material-symbols-outlined text-5xl">search_off</span>
             </div>
             <div className="space-y-3">
               <h3 className="text-2xl font-bold text-white uppercase tracking-tight font-display">No Mentors Found</h3>
               <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.4em] opacity-60 font-sans">Adjust your search parameters and try again.</p>
             </div>
          </div>
        )}
      </section>
    </main>
  );
}
