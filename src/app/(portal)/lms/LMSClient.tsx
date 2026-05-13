"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LMSClient({ coursesData }: { coursesData: any[] }) {
  const courses = coursesData || [];

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-24">
      {/* Background Cinematic Accents */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -z-10"></div>
      <div className="fixed -bottom-48 -left-48 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

      {/* Header Section */}
      <header className="p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-outline-variant/30 mb-12">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Academy Protocol</span>
          <h1 className="text-5xl md:text-8xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Knowledge <span className="text-primary not-italic">Core.</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-xl font-medium leading-tight opacity-70 italic">
            "High-bandwidth intellectual capital synchronization for the District 3192 elite."
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="relative group">
            <select className="appearance-none bg-surface-container-high border border-outline-variant/30 rounded-2xl px-8 py-4 pr-12 font-black text-[10px] uppercase tracking-[0.2em] shadow-ambient focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer outline-none">
              <option>Protocol: All</option>
              <option>Leadership</option>
              <option>Technical</option>
              <option>Governance</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary transition-transform group-hover:translate-y-[-40%]">expand_more</span>
          </div>
        </div>
      </header>

      {/* Courses Grid */}
      <section className="px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <Link href={`/lms/${course.id}`} className="group flex flex-col bg-surface-container-low/70 backdrop-blur-xl rounded-[3rem] overflow-hidden border border-outline-variant/30 shadow-ambient hover:bg-white hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-700 h-full">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={course.thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"} 
                  alt={course.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-60"></div>
                
                {course.is_ri_cert && (
                  <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 shadow-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    RI Certified
                  </div>
                )}
              </div>
              
              <div className="p-10 flex flex-col flex-1 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{course.category || "General Protocol"}</p>
                  </div>
                  <h3 className="text-3xl font-black text-on-surface tracking-tighter uppercase leading-tight font-display italic group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-on-surface-variant text-base font-medium leading-relaxed opacity-60 line-clamp-3">
                    "{course.description}"
                  </p>
                </div>
                
                <div className="mt-auto pt-6 border-t border-outline-variant/30 flex items-center justify-between">
                  <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest italic">
                    {course.modulesCount || course.modules_count || (course.lessons?.length || 0)} Sync Modules
                  </span>
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                    Initialize <span className="material-symbols-outlined text-lg group-hover:translate-x-2 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Academy CTA */}
      <section className="px-8 md:px-12 mt-24">
         <div className="bg-surface-container-low/70 backdrop-blur-2xl rounded-[4rem] p-16 border border-outline-variant/30 shadow-ambient flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="space-y-6 flex-1 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[9px] font-black tracking-[0.4em] uppercase border border-primary/10">Certification Path</span>
              <h2 className="text-4xl md:text-5xl font-black text-on-surface font-display tracking-tighter uppercase italic leading-none">Elevate Your <span className="text-primary not-italic">Authority.</span></h2>
              <p className="text-on-surface-variant font-medium leading-relaxed max-w-xl opacity-70">Complete 5 Core Modules to earn the 'District Elite' certification and unlock high-level leadership opportunities.</p>
            </div>
            <button className="w-full lg:w-auto bg-primary text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">View Certifications</button>
         </div>
      </section>
    </main>
  );
}
