"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image_url: string;
  author: string;
}

export default function NewsClient({ newsData }: { newsData: NewsItem[] }) {
  const [activeCategory, setActiveCategory] = useState('ALL SIGNALS');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(newsData.map(item => item.category))).filter(Boolean);
    return ['ALL SIGNALS', ...cats];
  }, [newsData]);

  const filteredNews = useMemo(() => {
    return newsData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'ALL SIGNALS' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [newsData, searchTerm, activeCategory]);

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-32 px-6 lg:px-12">
      {/* Cinematic Background Accents */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -z-10"></div>
      <div className="fixed -bottom-48 -left-48 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] -z-10"></div>

      <header className="py-24 lg:py-40 flex flex-col items-center text-center gap-8 border-b border-outline-variant/30 mb-32">
        <span className="inline-block px-6 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Global Intelligence</span>
        <h1 className="text-6xl md:text-9xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
          News <br />
          <span className="text-primary not-italic">Signal.</span>
        </h1>
        <p className="text-xl md:text-3xl text-on-surface-variant max-w-3xl font-medium leading-tight opacity-70">
          The definitive stream of updates, stories, and impact bulletins from across the district.
        </p>
      </header>

      {/* Control Protocol Section */}
      <section className="mb-24">
        <div className="bg-surface-container-low/70 backdrop-blur-2xl rounded-[3rem] border border-outline-variant/30 shadow-ambient p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8">
          <div className="relative flex-1 w-full">
             <span className="absolute left-8 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/40">sensors</span>
             <input 
              type="text" 
              placeholder="FREQUENCY SCAN: ENTER KEYWORDS"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] pl-20 pr-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-on-surface placeholder:text-on-surface/20"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-10 py-5 rounded-[1.5rem] text-[9px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? 'bg-primary text-white shadow-2xl shadow-primary/30 scale-105' 
                  : 'bg-surface-container-high text-on-surface-variant hover:text-primary border border-outline-variant/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="h-12 w-px bg-outline-variant/30 hidden lg:block mx-4"></div>

          <div className="flex items-center gap-3 shrink-0">
             <span className="text-[10px] font-black text-on-surface/30 uppercase tracking-[0.3em]">Signal Quality:</span>
             <div className="flex items-center gap-2 px-6 py-3 bg-primary/5 rounded-full border border-primary/10">
               <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Stable Feed</span>
             </div>
          </div>
        </div>
      </section>

      {/* News Feed Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item, idx) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden mb-10 shadow-ambient border border-outline-variant/30">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute top-8 left-8">
                     <span className="bg-primary/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.3em] px-6 py-2.5 rounded-full shadow-2xl">
                       {item.category}
                     </span>
                  </div>
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                     <div className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">
                       {item.date} • By {item.author}
                     </div>
                     <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-primary group-hover:border-transparent transition-all">
                        <span className="material-symbols-outlined">arrow_outward</span>
                     </div>
                  </div>
                </div>
                <div className="space-y-4 px-4">
                  <h3 className="text-3xl lg:text-4xl font-black text-on-surface uppercase tracking-tighter font-display leading-none group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-on-surface-variant text-lg font-medium leading-relaxed opacity-60 line-clamp-2">
                    {item.excerpt}
                  </p>
                  <div className="pt-4 flex items-center gap-4">
                     <span className="w-8 h-[2px] bg-primary group-hover:w-16 transition-all duration-700"></span>
                     <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Read Bulletin</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredNews.length === 0 && (
          <div className="py-40 flex flex-col items-center justify-center text-center space-y-8 bg-surface-container-low/30 rounded-[4rem] border-2 border-dashed border-outline-variant/30">
             <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center text-primary/20">
                <span className="material-symbols-outlined text-5xl">signal_cellular_connected_no_internet_4_bar</span>
             </div>
             <div className="space-y-2">
               <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">No <span className="text-primary not-italic">Signals.</span></h3>
               <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] opacity-60">No bulletins found matching your frequency</p>
             </div>
             <button 
              onClick={() => {setSearchTerm(''); setActiveCategory('ALL SIGNALS');}}
              className="px-10 py-4 bg-surface-container-high text-primary font-black text-[9px] uppercase tracking-[0.3em] rounded-full border border-primary/10 hover:bg-primary hover:text-white transition-all"
             >
               Reset Frequency Protocol
             </button>
          </div>
        )}
      </section>
    </main>
  );
}
