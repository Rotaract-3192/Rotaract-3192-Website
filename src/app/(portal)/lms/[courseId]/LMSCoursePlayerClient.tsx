"use client";

import { useState } from 'react';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
}

interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  duration: number | null;
  order: number | null;
}

export default function LMSCoursePlayerClient({ 
  course, 
  modules 
}: { 
  course: Course; 
  modules: Module[] 
}) {
  const [activeModule, setActiveModule] = useState<Module | null>(
    modules.length > 0 ? modules[0] : null
  );

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-32 pt-32 px-6 lg:px-12">
      {/* Background Accents */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -z-10"></div>
      
      {/* Back button & Header */}
      <header className="flex flex-col md:flex-row md:items-center gap-8 mb-12">
        <Link href="/lms" className="w-16 h-16 rounded-full bg-white/5 border border-white/10 hover:border-primary/30 flex items-center justify-center text-primary transition-all shrink-0 shadow-lg group">
          <span className="material-symbols-outlined text-2xl group-hover:translate-x-[-4px] transition-transform">arrow_back</span>
        </Link>
        <div className="space-y-2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Academy Course</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter font-display uppercase leading-none italic">{course.title}</h1>
        </div>
      </header>

      {modules.length === 0 ? (
        <section className="py-24 text-center glass-panel border-dashed">
          <span className="material-symbols-outlined text-6xl text-primary/20 mb-6">video_library</span>
          <h3 className="text-2xl font-bold text-white uppercase tracking-tight font-display mb-2">No Modules Found</h3>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.4em] opacity-60">This course does not have any modules uploaded yet.</p>
        </section>
      ) : (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Active Player */}
          <div className="lg:col-span-8 space-y-8">
            <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-black shadow-ambient relative">
              {activeModule?.videoUrl ? (
                activeModule.videoUrl.includes('youtube.com') || activeModule.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={activeModule.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                    className="w-full h-full"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                ) : (
                  <video
                    src={activeModule.videoUrl}
                    controls
                    className="w-full h-full"
                  />
                )
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/30 space-y-4">
                  <span className="material-symbols-outlined text-7xl">videocam_off</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-muted/60">Video feed unavailable</span>
                </div>
              )}
            </div>

            <div className="glass-panel p-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Now Playing: Module {activeModule ? (activeModule.order ?? 1) : 1}</span>
                </div>
                {activeModule?.duration && (
                  <div className="text-[10px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">schedule</span>
                    {activeModule.duration} Minutes Duration
                  </div>
                )}
              </div>
              <h2 className="text-3xl font-black text-white font-display uppercase tracking-tight italic">{activeModule?.title}</h2>
              <p className="text-text-muted text-sm font-medium leading-relaxed opacity-75 font-sans">
                {activeModule?.description || "No description provided for this module."}
              </p>
            </div>
          </div>

          {/* Modules Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-8 space-y-8 sticky top-28">
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight font-display">Course <span className="text-primary">Modules</span></h3>
                <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.3em] opacity-40 mt-1 font-sans">Syllabus Overview</p>
              </div>

              <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
                {modules.map((mod) => {
                  const isActive = activeModule?.id === mod.id;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => setActiveModule(mod)}
                      className={`w-full text-left p-6 rounded-2xl border transition-all flex items-start gap-4 font-sans cursor-pointer ${
                        isActive 
                          ? 'bg-primary/10 border-primary text-white' 
                          : 'bg-white/3 border-white/5 hover:bg-white/5 hover:border-white/10 text-white/40'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-lg shrink-0 mt-0.5 ${isActive ? 'text-primary' : 'opacity-40'}`}>
                        {isActive ? 'play_circle' : 'lock_open'}
                      </span>
                      <div className="space-y-1">
                        <h4 className={`text-xs font-bold uppercase tracking-wide leading-snug ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}>
                          {mod.title}
                        </h4>
                        <p className="text-[9px] font-bold uppercase tracking-wider opacity-40 leading-none">
                          {mod.duration ? `${mod.duration} MIN` : 'TBD'}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
