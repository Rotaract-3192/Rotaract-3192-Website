"use client";

import { motion } from 'framer-motion';

export default function BrandCentrePage() {
  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-32 px-6 lg:px-12">
      {/* Cinematic Background Accents */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -z-10"></div>
      <div className="fixed -bottom-48 -left-48 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] -z-10"></div>

      <header className="py-24 lg:py-40 flex flex-col items-center text-center gap-8 border-b border-outline-variant/30 mb-32">
        <span className="inline-block px-6 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Identity Framework</span>
        <h1 className="text-6xl md:text-9xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
          Brand <br />
          <span className="text-primary not-italic">Centre.</span>
        </h1>
        <p className="text-xl md:text-3xl text-on-surface-variant max-w-3xl font-medium leading-tight opacity-70">
          Official guidelines and assets for Rotaract District 3192, maintaining visual integrity across all signals.
        </p>
      </header>

      {/* LOGOS SECTION */}
      <section className="mb-48">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-4xl font-black text-on-surface uppercase tracking-tighter font-display leading-none italic">District <span className="text-primary not-italic">Logos.</span></h2>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] opacity-80">Official Marks Protocol v2.0</p>
          </div>
          <button className="px-10 py-4 bg-surface-container-high text-primary font-black text-[9px] uppercase tracking-[0.3em] rounded-full border border-primary/10 hover:bg-primary hover:text-white transition-all shadow-sm">
            Download Asset Pack
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Logo variant: Master */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-container-low/70 backdrop-blur-xl rounded-[3rem] p-12 border border-outline-variant/30 shadow-ambient group hover:border-primary/30 transition-all duration-700"
          >
            <div className="aspect-video bg-white rounded-[2rem] mb-12 flex flex-col items-center justify-center border border-outline-variant/10 transition-transform group-hover:scale-95 duration-500 overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
               <div className="text-center relative z-10">
                <span className="block font-black text-4xl tracking-tighter text-primary font-headline uppercase leading-none">Rotaract</span>
                <span className="block text-[9px] uppercase tracking-[0.5em] text-on-surface-variant font-black mt-2">District 3192</span>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display">Master Mark</h3>
                <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed opacity-60 uppercase tracking-widest">Primary visual identifier for light-mode environments.</p>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] py-5 rounded-2xl shadow-2xl shadow-primary/30 hover:-translate-y-1 active:translate-y-0 transition-all">PNG</button>
                <button className="flex-1 bg-surface-container-high text-primary text-[10px] font-black uppercase tracking-[0.3em] py-5 rounded-2xl hover:bg-primary hover:text-white transition-all border border-outline-variant/30">SVG</button>
              </div>
            </div>
          </motion.div>

          {/* Logo variant: Negative */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-primary rounded-[3rem] p-12 shadow-2xl shadow-primary/20 group hover:-translate-y-2 transition-all duration-700 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="aspect-video bg-white/10 backdrop-blur-md rounded-[2rem] mb-12 flex flex-col items-center justify-center border border-white/10 transition-transform group-hover:scale-95 duration-500 relative z-10">
              <div className="text-center">
                <span className="block font-black text-4xl tracking-tighter text-white font-headline uppercase leading-none">Rotaract</span>
                <span className="block text-[9px] uppercase tracking-[0.5em] text-white/50 font-black mt-2">District 3192</span>
              </div>
            </div>
            <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight font-display">Negative Mark</h3>
                <p className="text-[11px] font-medium text-white/70 leading-relaxed opacity-60 uppercase tracking-widest">Optimized for high-tech dark background protocols.</p>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-white text-primary text-[10px] font-black uppercase tracking-[0.3em] py-5 rounded-2xl shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all">PNG</button>
                <button className="flex-1 bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] py-5 rounded-2xl border border-white/10 hover:bg-white hover:text-primary transition-all">SVG</button>
              </div>
            </div>
          </motion.div>

          {/* Logo variant: Tonal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-surface-container-low/70 backdrop-blur-xl rounded-[3rem] p-12 border border-outline-variant/30 shadow-ambient group hover:border-secondary/30 transition-all duration-700"
          >
            <div className="aspect-video bg-secondary/5 rounded-[2rem] mb-12 flex flex-col items-center justify-center border border-secondary/10 transition-transform group-hover:scale-95 duration-500 overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent"></div>
               <div className="text-center relative z-10">
                <span className="block font-black text-4xl tracking-tighter text-secondary font-headline uppercase leading-none">Rotaract</span>
                <span className="block text-[9px] uppercase tracking-[0.5em] text-secondary/40 font-black mt-2">District 3192</span>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display">Secondary Mark</h3>
                <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed opacity-60 uppercase tracking-widest">Alternative mark for specific sub-brand applications.</p>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-secondary text-white text-[10px] font-black uppercase tracking-[0.3em] py-5 rounded-2xl shadow-2xl shadow-secondary/30 hover:-translate-y-1 active:translate-y-0 transition-all">PNG</button>
                <button className="flex-1 bg-surface-container-high text-secondary text-[10px] font-black uppercase tracking-[0.3em] py-5 rounded-2xl hover:bg-secondary hover:text-white transition-all border border-outline-variant/30">SVG</button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PALETTE & TYPE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32">
        {/* Colour Palette */}
        <div className="lg:col-span-7 space-y-16">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-4xl font-black text-on-surface uppercase tracking-tighter font-display leading-none italic">Tonal <span className="text-primary not-italic">Spectrum.</span></h2>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] opacity-80">Chromatic Token System v2.0</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 group"
            >
              <div className="h-64 bg-primary rounded-[3rem] shadow-2xl shadow-primary/20 relative overflow-hidden transition-transform duration-700 group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-white space-y-2">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Primary Protocol</p>
                   <p className="text-4xl font-black tracking-tighter font-display italic leading-none">Deep Purple</p>
                </div>
              </div>
              <div className="px-6 flex justify-between items-center bg-surface-container-low py-4 rounded-2xl border border-outline-variant/30">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">--primary</span>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">#5300B9</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 group"
            >
              <div className="h-64 bg-secondary-container rounded-[3rem] shadow-2xl shadow-secondary/20 relative overflow-hidden transition-transform duration-700 group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-white space-y-2">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Secondary Protocol</p>
                   <p className="text-4xl font-black tracking-tighter font-display italic leading-none">Pulse Blue</p>
                </div>
              </div>
              <div className="px-6 flex justify-between items-center bg-surface-container-low py-4 rounded-2xl border border-outline-variant/30">
                <span className="text-[10px] font-black text-secondary-container uppercase tracking-widest opacity-60">--secondary</span>
                <span className="text-[10px] font-black text-secondary-container uppercase tracking-widest">#316BF3</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Typography */}
        <div className="lg:col-span-5 space-y-16">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-4xl font-black text-on-surface uppercase tracking-tighter font-display leading-none italic">Typographic <span className="text-primary not-italic">Rules.</span></h2>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] opacity-80">Global Legibility Protocol</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-surface-container-low/70 backdrop-blur-xl rounded-[4rem] p-12 border border-outline-variant/30 space-y-16 shadow-ambient"
          >
            <div className="space-y-6">
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] opacity-40">System Core Font</p>
              <h3 className="text-6xl font-black text-primary tracking-tighter uppercase leading-none font-display">Inter <br /><span className="italic text-on-surface">Variable.</span></h3>
              <p className="text-primary font-black text-xl tracking-[0.3em] overflow-hidden whitespace-nowrap opacity-40">ABCDEFGHIJKLMNOPQRSTUVWXY&</p>
            </div>
            
            <div className="space-y-6 pt-12 border-t border-outline-variant/20 leading-relaxed">
              <p className="text-on-surface-variant font-medium text-lg italic opacity-60">
                "A modern, high-legibility sans-serif optimized for deep readability and geometric clarity across the digital horizon."
              </p>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-lg">format_size</span>
                 </div>
                 <span className="text-[10px] font-black text-on-surface uppercase tracking-[0.3em]">Protocol: Weight Range 100-900</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="mt-48 text-center bg-surface-container-low/50 backdrop-blur-2xl rounded-[5rem] p-24 border border-outline-variant/30 shadow-ambient">
         <div className="max-w-2xl mx-auto space-y-12">
            <h2 className="text-5xl font-black text-on-surface uppercase tracking-tighter font-display italic leading-none">Compliance <br /><span className="text-primary not-italic">Verification.</span></h2>
            <p className="text-lg font-medium text-on-surface-variant opacity-60">
              Ensure all public-facing communication adheres to the District 3192 Identity Framework. For special permissions, contact the Brand Authority.
            </p>
            <button className="px-16 py-6 bg-primary text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all group overflow-hidden relative">
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10">Access Identity Protocol</span>
            </button>
         </div>
      </section>
    </main>
  );
}
