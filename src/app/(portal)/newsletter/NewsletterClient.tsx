"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Newsletter {
  id: string;
  title: string;
  issue_number: string;
  publish_date: string;
  download_url: string;
  thumbnail_url: string;
  description: string;
}

export default function NewsletterClient({ newsletters }: { newsletters: Newsletter[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNewsletters = newsletters.filter(nl => 
    nl.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    nl.issue_number.includes(searchTerm)
  );

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-32 px-6 lg:px-12">
      {/* Cinematic Background Accents */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -z-10"></div>
      <div className="fixed -bottom-48 -left-48 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] -z-10"></div>

      <header className="py-24 lg:py-40 flex flex-col items-center text-center gap-8 border-b border-outline-variant/30 mb-32">
        <span className="inline-block px-6 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">The Chronicle Archive</span>
        <h1 className="text-6xl md:text-9xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
          Golden <br />
          <span className="text-primary not-italic">Wheel.</span>
        </h1>
        <p className="text-xl md:text-3xl text-on-surface-variant max-w-3xl font-medium leading-tight opacity-70">
          The official district newsletter. Preserving the legacy, documenting the impact.
        </p>
      </header>

      {/* Control Protocol Section */}
      <section className="mb-24">
        <div className="bg-surface-container-low/70 backdrop-blur-2xl rounded-[3rem] border border-outline-variant/30 shadow-ambient p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8">
          <div className="relative flex-1 w-full">
             <span className="absolute left-8 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/40">auto_stories</span>
             <input 
              type="text" 
              placeholder="CHRONICLE SEARCH: ISSUE # OR TITLE"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] pl-20 pr-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-on-surface placeholder:text-on-surface/20"
            />
          </div>
          
          <div className="flex items-center gap-6 shrink-0">
             <div className="flex flex-col items-end">
               <span className="text-[10px] font-black text-on-surface/30 uppercase tracking-[0.3em]">Total Volume:</span>
               <span className="text-2xl font-black text-primary font-display italic leading-none">{newsletters.length} ISSUES</span>
             </div>
             <div className="h-10 w-px bg-outline-variant/30"></div>
             <button className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 hover:scale-110 transition-transform">
               <span className="material-symbols-outlined">download</span>
             </button>
          </div>
        </div>
      </section>

      {/* Newsletter Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-16">
          <AnimatePresence mode="popLayout">
            {filteredNewsletters.map((nl, idx) => (
              <motion.div
                key={nl.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden mb-8 shadow-ambient border border-outline-variant/30 bg-surface-container-low group-hover:-translate-y-4 transition-all duration-700">
                  <img 
                    src={nl.thumbnail_url} 
                    alt={nl.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  
                  {/* Download Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <a 
                      href={nl.download_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-24 h-24 bg-white/10 backdrop-blur-3xl rounded-full flex items-center justify-center text-white border border-white/20 hover:scale-110 hover:bg-primary transition-all duration-500 group/btn"
                    >
                      <span className="material-symbols-outlined text-4xl group-hover/btn:animate-bounce">download</span>
                    </a>
                  </div>

                  <div className="absolute top-8 left-8">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 flex flex-col items-center">
                       <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">ISSUE</span>
                       <span className="text-3xl font-black text-white font-display italic leading-none">{nl.issue_number}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8">
                     <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] opacity-80">{nl.publish_date}</span>
                  </div>
                </div>

                <div className="space-y-4 px-4">
                  <h3 className="text-3xl font-black text-on-surface uppercase tracking-tighter font-display leading-none group-hover:text-primary transition-colors">
                    {nl.title}
                  </h3>
                  <p className="text-on-surface-variant text-lg font-medium leading-relaxed opacity-60 line-clamp-2">
                    {nl.description}
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                     <span className="material-symbols-outlined text-primary text-xl">description</span>
                     <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Portable Document Format</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredNewsletters.length === 0 && (
          <div className="py-40 flex flex-col items-center justify-center text-center space-y-8 bg-surface-container-low/30 rounded-[4rem] border-2 border-dashed border-outline-variant/30">
             <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center text-primary/20">
                <span className="material-symbols-outlined text-5xl">menu_book</span>
             </div>
             <div className="space-y-2">
               <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">Archive <span className="text-primary not-italic">Empty.</span></h3>
               <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] opacity-60">Adjust your chronicle search parameters</p>
             </div>
          </div>
        )}
      </section>
    </main>
  );
}
