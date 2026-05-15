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
  const [activeCategory, setActiveCategory] = useState('All News');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(newsData.map(item => item.category))).filter(Boolean);
    return ['All News', ...cats];
  }, [newsData]);

  const filteredNews = useMemo(() => {
    return newsData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All News' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [newsData, searchTerm, activeCategory]);

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-32 px-6 lg:px-12">
      <header className="py-24 lg:py-40 flex flex-col items-center text-center gap-8 mb-20">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">District Updates</span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tight font-display uppercase leading-none">
          Latest <br />
          <span className="text-primary">News</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-text-muted max-w-3xl font-medium leading-tight opacity-70 font-sans">
          The definitive stream of updates, stories, and impact bulletins from across the district.
        </p>
      </header>

      {/* Control Protocol Section */}
      <section className="mb-24">
        <div className="glass-panel p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-8">
          <div className="relative flex-1 w-full">
             <span className="absolute left-8 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary/40">search</span>
             <input 
              type="text" 
              placeholder="Search news by keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-20 pr-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-white placeholder:text-white/20 font-sans"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0 scrollbar-hide no-scrollbar">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-10 py-5 rounded-xl text-[9px] font-bold uppercase tracking-[0.3em] transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' 
                  : 'bg-white/5 text-white/40 hover:text-primary border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
             <div className="flex items-center gap-2 px-6 py-4 bg-primary/5 rounded-xl border border-primary/10">
               <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
               <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Live Feed</span>
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl border border-white/10">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent opacity-80 transition-opacity"></div>
                  <div className="absolute top-8 left-8">
                     <span className="bg-primary/90 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-[0.3em] px-6 py-2.5 rounded-full shadow-xl border border-white/10">
                       {item.category}
                     </span>
                  </div>
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                     <div className="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em] font-sans">
                       {item.date} • {item.author}
                     </div>
                     <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-primary group-hover:border-transparent transition-all">
                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                     </div>
                  </div>
                </div>
                <div className="space-y-5 px-4">
                  <h3 className="text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight font-display leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-lg font-medium leading-relaxed opacity-60 line-clamp-2 font-sans">
                    {item.excerpt}
                  </p>
                  <div className="pt-4 flex items-center gap-4 group/link">
                     <span className="w-8 h-[2px] bg-primary group-hover:w-16 transition-all duration-700"></span>
                     <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] group-hover:translate-x-2 transition-transform">Read Article</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredNews.length === 0 && (
          <div className="py-40 flex flex-col items-center justify-center text-center space-y-8 glass-panel border-dashed">
             <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-primary/20 border border-white/5">
                <span className="material-symbols-outlined text-5xl">feed</span>
             </div>
             <div className="space-y-3">
               <h3 className="text-2xl font-bold text-white uppercase tracking-tight font-display">No Articles Found</h3>
               <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.4em] opacity-60 font-sans">We couldn't find any news matching your criteria.</p>
             </div>
             <button 
              onClick={() => {setSearchTerm(''); setActiveCategory('All News');}}
              className="px-12 py-5 bg-white/5 text-primary font-bold text-[9px] uppercase tracking-[0.3em] rounded-xl border border-white/5 hover:bg-primary hover:text-white transition-all shadow-sm"
             >
               Reset Search Filters
             </button>
          </div>
        )}
      </section>
    </main>
  );
}
