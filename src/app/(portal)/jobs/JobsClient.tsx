"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function JobsClient() {
  const upcomingFeatures = [
    {
      icon: "work",
      title: "Exclusive Internships",
      desc: "Curated internships and trainee roles across partner organizations.",
    },
    {
      icon: "corporate_fare",
      title: "Corporate Placements",
      desc: "Direct hiring pipelines for full-time corporate opportunities.",
    },
    {
      icon: "hub",
      title: "District Talent Network",
      desc: "Connect your profile directly with recruiters and alumni founders.",
    },
    {
      icon: "psychology",
      title: "Executive Mentorship",
      desc: "1-on-1 industry guidance to prepare for high-impact careers.",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-hidden pb-32 px-6 lg:px-12 pt-32 flex flex-col items-center justify-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header Section */}
      <header className="py-12 lg:py-16 flex flex-col items-center text-center gap-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md"
        >
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_#3B82F6] animate-pulse"></div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">
            District 3192 Career Hub
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight font-display uppercase leading-tight">
            Careers & <br />
            <span className="text-primary glow-text">Coming Soon</span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto font-medium leading-relaxed opacity-75 font-sans">
            We are building an exclusive marketplace connecting Rotaractors with high-impact internships, jobs, and corporate partnerships.
          </p>
        </motion.div>
      </header>

      {/* Status Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-4xl glass-panel p-8 sm:p-12 border border-white/10 relative overflow-hidden mb-16"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-0"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">rocket_launch</span>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white font-sans">Platform In Preparation</h3>
              <p className="text-xs text-white/40 font-sans tracking-wide">RI Year 2026-27 Official Initiative</p>
            </div>
          </div>
          <span className="px-5 py-2 rounded-full bg-white/5 text-primary text-[10px] font-bold uppercase tracking-[0.3em] border border-white/10">
            Phase 1 Deployment
          </span>
        </div>

        {/* Feature Teasers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
          {upcomingFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-all shrink-0">
                <span className="material-symbols-outlined text-xl">{feat.icon}</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-[0.15em] text-white font-sans group-hover:text-primary transition-colors">
                  {feat.title}
                </h4>
                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-6"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-[0.25em] shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 no-underline"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Home
        </Link>
        <Link
          href="https://events.rotaract3192.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-[0.25em] transition-all hover:border-primary/40 no-underline"
        >
          Explore Events
          <span className="material-symbols-outlined text-base">north_east</span>
        </Link>
      </motion.div>
    </main>
  );
}

