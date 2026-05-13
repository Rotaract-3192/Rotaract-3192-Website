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
      {/* Cinematic Background Accents */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -z-10"></div>
      <div className="fixed -bottom-48 -left-48 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] -z-10"></div>

      <header className="py-24 lg:py-40 flex flex-col items-center text-center gap-8 border-b border-outline-variant/30 mb-32">
        <span className="inline-block px-6 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Leadership Ascension</span>
        <h1 className="text-6xl md:text-9xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
          Mentorship <br />
          <span className="text-primary not-italic">Hub.</span>
        </h1>
        <p className="text-xl md:text-3xl text-on-surface-variant max-w-3xl font-medium leading-tight opacity-70">
          Connect with industry veterans and visionary leaders dedicated to your professional trajectory.
        </p>
      </header>

      {/* Control Protocol Section */}
      <section className="mb-24">
        <div className="bg-surface-container-low/70 backdrop-blur-2xl rounded-[3rem] border border-outline-variant/30 shadow-ambient p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8">
          <div className="relative flex-1 w-full">
             <span className="absolute left-8 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/40">cognition</span>
             <input 
              type="text" 
              placeholder="SEARCH EXPERTISE PROTOCOL: ENTER FIELD OR MENTOR NAME"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] pl-20 pr-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-on-surface placeholder:text-on-surface/20"
            />
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
             <button className="px-12 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
               Apply for Mentorship
             </button>
             <button className="w-14 h-14 bg-surface-container-high text-on-surface-variant rounded-2xl flex items-center justify-center border border-outline-variant/30 hover:text-primary transition-all">
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group bg-surface-container-low/70 backdrop-blur-xl rounded-[3rem] border border-outline-variant/30 overflow-hidden shadow-ambient hover:border-primary/30 transition-all duration-700"
              >
                <div className="relative h-72 overflow-hidden">
                   <img 
                    src={mentor.image_url} 
                    alt={mentor.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
                   <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] bg-white/10 backdrop-blur-md px-4 py-1 rounded-full border border-white/20 inline-block">
                          {mentor.role}
                        </div>
                        <h3 className="text-3xl font-black text-on-surface uppercase tracking-tighter font-display italic leading-none group-hover:text-primary transition-colors">
                          {mentor.name}
                        </h3>
                      </div>
                   </div>
                </div>

                <div className="p-10 space-y-8">
                  <div className="space-y-4">
                    <p className="text-on-surface-variant font-medium leading-relaxed opacity-70 line-clamp-3">
                      {mentor.bio}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((exp, eIdx) => (
                      <span key={eIdx} className="bg-surface-container-high text-on-surface-variant text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-xl border border-outline-variant/20 group-hover:border-primary/20 transition-colors">
                        {exp}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-outline-variant/20">
                     <button className="w-full py-5 bg-surface-container-high text-primary font-black text-[10px] uppercase tracking-[0.3em] rounded-[1.5rem] border border-outline-variant/30 hover:bg-primary hover:text-white hover:border-transparent transition-all shadow-sm">
                       Initiate Connection
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredMentors.length === 0 && (
          <div className="py-40 flex flex-col items-center justify-center text-center space-y-8 bg-surface-container-low/30 rounded-[4rem] border-2 border-dashed border-outline-variant/30">
             <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center text-primary/20">
                <span className="material-symbols-outlined text-5xl">psychology_alt</span>
             </div>
             <div className="space-y-2">
               <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">Expertise <span className="text-primary not-italic">Not Found.</span></h3>
               <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] opacity-60">Adjust your expertise search protocol</p>
             </div>
          </div>
        )}
      </section>
    </main>
  );
}
