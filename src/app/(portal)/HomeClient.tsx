"use client";

import { useRef, useMemo } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function HomeClient({ 
  clubsData, 
  usersCount, 
  eventsCount 
}: { 
  clubsData: any[], 
  usersCount: number, 
  eventsCount: number 
}) {
  const containerRef = useRef(null);
  
  const stats = useMemo(() => ({
    clubsCount: (clubsData || []).filter((c: any) => c.status === "active").length,
    membersCount: usersCount || 4500,
    eventsYear: eventsCount || 184,
  }), [clubsData, usersCount, eventsCount]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <main ref={containerRef} className="relative overflow-visible pb-32">
      {/* Background Cinematic Accents */}
      <div className="fixed top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] -z-10"></div>
      <div className="fixed -bottom-48 -left-48 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[180px] -z-10"></div>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="max-w-7xl mx-auto min-h-screen flex flex-col lg:flex-row items-center gap-16 px-6 lg:px-12 pt-32 lg:pt-0"
      >
        <div className="flex-1 space-y-12 relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/5 border border-primary/10">
               <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">District Authority 3192</span>
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter text-on-surface font-display uppercase">
              Lead the <br />
              <span className="text-primary italic">Movement.</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-3xl text-on-surface-variant font-medium leading-tight max-w-2xl opacity-70 italic"
          >
            "Empowering the next generation of global citizens through radical action, visionary leadership, and unwavering service."
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-6 justify-center lg:justify-start"
          >
            <Link href="/sign-up">
              <button className="bg-primary text-white px-14 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] flex items-center gap-4 group shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                Initialize Uplink
                <span className="material-symbols-outlined text-lg">bolt</span>
              </button>
            </Link>
            <Link href="/clubs">
              <button className="bg-surface-container-high text-on-surface px-14 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] flex items-center gap-4 transition-all hover:bg-white border border-outline-variant/30 shadow-ambient">
                Explore Nodes
              </button>
            </Link>
          </motion.div>
        </div>
        
        {/* Cinematic Imagery */}
        <div className="flex-1 relative w-full h-[600px] lg:h-[800px]">
           <motion.div 
            initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 rounded-[4rem] overflow-hidden shadow-2xl border border-outline-variant/20 group"
           >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
                alt="Movement" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60"></div>
           </motion.div>

           {/* Floating Impact Node */}
           <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute -bottom-10 -left-10 lg:-left-20 bg-surface-container-lowest/90 backdrop-blur-3xl p-10 rounded-[3rem] border border-outline-variant/30 shadow-ambient space-y-6 max-w-sm hidden md:block"
           >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                    <span className="material-symbols-outlined">diversity_3</span>
                 </div>
                 <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Impact Protocol</span>
              </div>
              <p className="text-xl font-black text-on-surface uppercase tracking-tight font-display leading-none">
                Connecting <span className="text-primary italic">{stats.clubsCount} Nodes</span> of change.
              </p>
           </motion.div>
        </div>
      </motion.section>

      {/* Impact Metric Bar */}
      <section className="px-6 lg:px-12 py-32 max-w-7xl mx-auto">
        <div className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[4rem] border border-outline-variant/30 shadow-ambient p-16 lg:p-24 grid grid-cols-1 md:grid-cols-3 gap-16 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-30"></div>
           
           {[
             { label: 'Active Chapters', val: stats.clubsCount, unit: 'Nodes', icon: 'hub' },
             { label: 'Force Capacity', val: stats.membersCount, unit: 'Leaders', icon: 'groups' },
             { label: 'Impact Vectors', val: stats.eventsYear, unit: 'Initiatives', icon: 'target' }
           ].map((stat, idx) => (
             <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center space-y-6 group relative z-10"
             >
                <div className="w-16 h-16 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                  <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-6xl lg:text-8xl font-black font-display tracking-tighter text-on-surface leading-none group-hover:text-primary transition-colors">
                    {stat.val}
                  </div>
                  <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">
                    {stat.label} • {stat.unit}
                  </div>
                </div>
                {idx < 2 && <div className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 w-px h-24 bg-outline-variant/30" />}
             </motion.div>
           ))}
        </div>
      </section>

      {/* Core Pillars */}
      <section className="px-6 lg:px-12 py-32 max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col items-center text-center space-y-6">
           <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] px-6 py-2 rounded-full bg-primary/5 border border-primary/10">The Blueprint</span>
           <h2 className="text-6xl md:text-9xl font-black tracking-tighter font-display uppercase leading-[0.85] italic">
             Strategic <br /><span className="text-primary not-italic">Pillars.</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              title: "Literacy First", 
              desc: "Deploying innovative learning solutions to marginalized communities through tech and empathy.", 
              icon: "menu_book", 
              delay: 0.1 
            },
            { 
              title: "Eco Resilience", 
              desc: "Building a sustainable future through radical environmental action and zero-waste protocols.", 
              icon: "forest", 
              delay: 0.2
            },
            { 
              title: "Leader Lab", 
              desc: "Nurturing professional excellence through deep-dive mentorship and disruptive workshops.", 
              icon: "workspace_premium", 
              delay: 0.3
            }
          ].map((pillar, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: pillar.delay, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group bg-surface-container-low/70 backdrop-blur-2xl p-12 lg:p-16 rounded-[4rem] flex flex-col gap-10 border border-outline-variant/30 hover:bg-white hover:shadow-ambient transition-all duration-700"
            >
              <div className="w-24 h-24 rounded-[2.5rem] bg-surface-container-high border border-outline-variant/30 flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 group-hover:border-primary/30">
                <span className="material-symbols-outlined text-primary text-5xl">{pillar.icon}</span>
              </div>
              <div className="space-y-6 flex-1">
                <h3 className="text-4xl font-black font-display uppercase tracking-tighter group-hover:text-primary transition-colors italic leading-none">
                  {pillar.title}
                </h3>
                <p className="text-on-surface-variant text-lg font-medium leading-relaxed opacity-60">
                  {pillar.desc}
                </p>
              </div>
              <button className="flex items-center gap-4 text-primary font-black uppercase tracking-[0.4em] text-[10px] group/btn">
                Protocol Details 
                <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portal Entry Point */}
      <section className="px-6 lg:px-12 py-32 max-w-7xl mx-auto">
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary rounded-[5rem] p-20 lg:p-32 shadow-2xl shadow-primary/20 relative overflow-hidden text-center lg:text-left"
         >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
               <div className="space-y-10 max-w-2xl">
                  <h2 className="text-6xl md:text-[8rem] font-black text-white font-display uppercase tracking-tighter leading-[0.8] italic">
                    The Future <br /><span className="not-italic opacity-50">Needs You.</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-white/80 font-medium font-display leading-tight">
                    Join a high-performance network of {stats.membersCount}+ young leaders making impact reality.
                  </p>
               </div>
               <div className="flex flex-col gap-6 w-full lg:w-auto min-w-[400px]">
                  <Link href="/sign-up" className="w-full">
                    <button className="w-full bg-white text-primary py-8 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl hover:scale-105 active:scale-95 transition-all group overflow-hidden relative">
                      <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      Establish Connection
                    </button>
                  </Link>
                  <Link href="/login" className="w-full">
                    <button className="w-full bg-white/10 text-white border border-white/20 backdrop-blur-xl py-8 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] hover:bg-white/20 transition-all">
                      Access Terminal
                    </button>
                  </Link>
               </div>
            </div>
         </motion.div>
      </section>
    </main>
  );
}
