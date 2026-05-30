"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);
  const [skyline, setSkyline] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    setSkyline([...Array(30)].map((_, i) => ({
      id: i,
      height: 10 + Math.random() * 70,
      width: 1 + Math.random() * 3
    })));
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-8%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.97]);

  return (
    <main ref={containerRef} className="relative bg-transparent min-h-screen overflow-visible">
      {/* Background Cinematic Accents */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Wave Paths (SVG) */}
        <svg className="absolute w-full h-full opacity-40 mix-blend-screen" viewBox="0 0 1440 800" fill="none">
          <motion.path
            d="M-100,400 C200,200 600,600 1000,400 C1200,300 1540,300 1540,300"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M-100,500 C380,700 860,300 1540,500"
            stroke="#2563EB"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 1 }}
          />
        </svg>

        {/* City Skyline Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] flex items-end justify-between px-4 opacity-10 grayscale brightness-200">
          {mounted && skyline.map((s) => (
            <div
              key={s.id}
              className="bg-primary/40 w-full mx-[1px]"
              style={{ height: `${s.height}%`, width: `${s.width}%` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Right Side Social Icons - Cinematic Control Bar */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center">
        {/* Connection Line Top */}
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-primary/30 to-primary/10 mb-8"></div>

        <div className="flex flex-col gap-8">
          {[
            { icon: 'photo_camera', label: 'INSTAGRAM', href: 'https://instagram.com' },
            { icon: 'link', label: 'LINKEDIN', href: 'https://linkedin.com' },
            { icon: 'smart_display', label: 'YOUTUBE', href: 'https://youtube.com' },
            { icon: 'mail', label: 'CONTACT', href: 'mailto:contact@rotaract3192.org' }
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              target="_blank"
              className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all duration-700 no-underline"
            >
              {/* Vertical Indicator (on hover) */}
              <div className="absolute -left-3 w-[2px] h-0 bg-primary group-hover:h-6 transition-all duration-500 rounded-full"></div>

              {/* Tooltip Label - Side Slidder */}
              <div className="absolute right-full mr-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 pointer-events-none">
                <span className="text-[10px] font-black text-white/40 group-hover:text-primary uppercase tracking-[0.4em] whitespace-nowrap italic bg-[#020617]/40 backdrop-blur-md px-3 py-1 rounded-md border border-white/5">
                  {item.label}
                </span>
              </div>

              {/* Icon */}
              <span className="material-symbols-outlined text-white/30 group-hover:text-white transition-all duration-500 text-lg group-hover:scale-110">
                {item.icon}
              </span>

              {/* Particle Glow */}
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
            </Link>
          ))}
        </div>

        {/* Connection Line Bottom */}
        <div className="w-[1px] h-32 bg-gradient-to-t from-transparent via-primary/30 to-primary/10 mt-8"></div>
      </div>

      <motion.section
        style={{ y: heroY, scale: heroScale }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-32 pb-24 px-8 text-center"
      >
        <div className="space-y-12 max-w-7xl flex flex-col items-center">
          {/* Logo & Title Group */}
          <div className="flex flex-col items-center gap-4 md:gap-6">
            {/* Parent/District Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex justify-center"
            >
              <img src="/assets/logo.png" alt="Rotaract District Logo" className="h-28 md:h-36 object-contain filter drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]" />
            </motion.div>

            {/* Main Title "EXUBERANT" */}
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-7xl md:text-[10rem] lg:text-[12rem] font-medium tracking-[0.05em] text-white font-display uppercase leading-none"
                style={{ textShadow: '0 0 40px rgba(59,130,246,0.2)' }}
              >
                Exuberant
              </motion.h1>
            </div>
          </div>

          {/* Subtitle with Arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-6"
          >
            <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent via-primary/50 to-primary"></div>
            <p className="text-[9px] md:text-[11px] font-black text-white uppercase tracking-[0.5em] md:tracking-[0.8em]">Create Lasting Impact</p>
            <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent via-primary/50 to-primary"></div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-sm md:text-lg text-text-muted font-medium leading-relaxed max-w-3xl mx-auto opacity-70 px-4 md:px-0"
          >
            A movement of young leaders creating positive change through leadership, service, fellowship & global connection.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center pt-6 px-4"
          >
            <Link href="/clubs">
              <button className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-10 md:px-14 py-4 md:py-4.5 rounded-xl font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center justify-center gap-3">
                Explore District
                <span className="material-symbols-outlined text-sm">north_east</span>
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="w-full sm:w-auto bg-white/5 backdrop-blur-xl text-white px-10 md:px-14 py-4 md:py-4.5 rounded-xl font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] border border-white/10 hover:border-primary transition-all flex items-center justify-center gap-3">
                Join Rotaract
                <span className="material-symbols-outlined text-sm">north_east</span>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="w-[95%] max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4 px-4 mt-24"
        >
          {[
            { label: 'Clubs', val: `${clubsData.length || 0}`, icon: 'groups' },
            { label: 'Members', val: `${usersCount || 0}`, icon: 'person' },
            { label: 'Projects', val: `${eventsCount || 0}`, icon: 'handshake' },
            { label: 'Impact Force', val: 'Active', icon: 'bolt' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center gap-2 md:gap-3 py-6 md:py-10 rounded-[1.5rem] md:rounded-[2rem] bg-[#020617]/40 backdrop-blur-3xl border border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors text-xl md:text-2xl">{stat.icon}</span>
              <div className="text-2xl md:text-4xl font-black text-white tracking-tight">{stat.val}</div>
              <div className="text-[8px] md:text-[9px] font-bold text-text-muted uppercase tracking-[0.4em]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* Impact Section */}
      <section className="relative z-10 py-32 px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col items-center text-center gap-6">
            <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] px-6 py-2 rounded-full bg-primary/5 border border-primary/10">Live Impact Tracker</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter font-display uppercase italic">Real-Time <span className="text-primary not-italic">Service Data.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Hours Served', val: '45,290', trend: '+12%', icon: 'schedule' },
              { label: 'Lives Impacted', val: '128,400', trend: '+8%', icon: 'favorite' },
              { label: 'Funds Raised', val: '$1.2M', trend: '+24%', icon: 'payments' }
            ].map((item, i) => (
              <motion.div
                whileHover={{ y: -10 }}
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] space-y-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all"></div>
                <span className="material-symbols-outlined text-primary text-4xl">{item.icon}</span>
                <div className="space-y-1">
                  <div className="text-4xl font-black text-white tracking-tight">{item.val}</div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-primary tracking-[0.2em] uppercase">
                    {item.label}
                    <span className="text-green-400">{item.trend}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative z-10 py-48 px-8 border-t border-white/5 bg-transparent">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-16">
          <div className="space-y-6">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter font-display uppercase italic leading-none">
              The Future <br />
              <span className="text-primary not-italic">Needs You.</span>
            </h2>
            <p className="text-[10px] font-bold text-white/40 tracking-[0.5em] uppercase">Join the district dispatch for exclusive updates</p>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}
            className="w-full max-w-2xl flex flex-col sm:flex-row gap-4 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-2xl"
          >
            <input
              type="email"
              required
              placeholder="ENTER COMMAND: EMAIL_ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-white text-[11px] font-bold uppercase tracking-[0.2em] placeholder:text-white/20"
            />
            <button className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20">
              Subscribe
              <span className="material-symbols-outlined text-sm">bolt</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
