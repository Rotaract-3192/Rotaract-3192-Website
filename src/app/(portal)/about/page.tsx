"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BentoCard from "@/components/BentoCard";

const sliderPhotos = [
  { name: "PHF Rtr. Rtn. Sanjay R.", role: "District Rotaract Representative", img: "/assets/slider/drr.jpeg", fallback: "https://ui-avatars.com/api/?name=Sanjay+R&background=0e6ba8&color=caf0f8&size=400" },
  { name: "DG AKS Rtn. Ravishankar Dakoju", role: "District Governor", img: "/assets/slider/dg.jpeg", fallback: "https://ui-avatars.com/api/?name=Ravishankar+Dakoju&background=00b4d8&color=020b18&size=400" },
  { name: "PHF Rtr. Rtn. Janice Philip", role: "Immediate Past DRR", img: "/assets/slider/ipdrr.jpeg", fallback: "https://ui-avatars.com/api/?name=Janice+Philip&background=0e6ba8&color=caf0f8&size=400" },
  { name: "DREE PP Rtr. Rakshith K. Shetty", role: "DRR Elect (DREE / DRRN)", img: "/assets/slider/drrn_rakshit.jpeg", fallback: "https://ui-avatars.com/api/?name=Rakshith+Shetty&background=00b4d8&color=020b18&size=400" },
  { name: "IPP Rtr. Disha B. S.", role: "District Secretary (Admin)", img: "/assets/slider/drs_disha.jpeg", fallback: "https://ui-avatars.com/api/?name=Disha+BS&background=0e6ba8&color=caf0f8&size=400" },
  { name: "PP Rtr. Shashank Shrivatsa", role: "District Secretary (Operations)", img: "/assets/slider/drs_shashank.jpeg", fallback: "https://ui-avatars.com/api/?name=Shashank+Shrivatsa&background=00b4d8&color=020b18&size=400" },
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [handshakeLoaded, setHandshakeLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-24">
      {/* Background Cinematic Accents */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -z-10"></div>
      <div className="fixed -bottom-48 -left-48 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] -z-10"></div>

      {/* HERO SECTION */}
      <header className="p-8 md:p-12 lg:py-32 flex flex-col items-center text-center gap-8 border-b border-white/10 mb-24">
        <span className="inline-block px-6 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">The District Authority</span>
        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter font-display uppercase leading-tight italic">
          Be the Number One, <br />
          <span className="text-primary not-italic">or the Only One.</span>
        </h1>
        <p className="text-lg md:text-2xl text-white/90 max-w-3xl font-medium leading-relaxed opacity-90 italic">
          Rotaract District 3192 is a thriving network of young leaders committed to institutional excellence and sustainable community impact.
        </p>
      </header>

      {/* MISSION & VISION */}
      <section className="px-8 md:px-12 py-12 space-y-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <BentoCard
            title="Our Mission"
            description="To build a culture of excellence where every club thrives, every leader grows, and every initiative becomes a benchmark for others to follow."
            icon="rocket_launch"
          />
          <BentoCard
            title="Our Vision"
            description="To make Rotaract a powerful platform that empowers every Rotaractor with the leadership, skills, and opportunities needed to thrive in both their personal and professional lives."
            icon="visibility"
            translateY={true}
          />
        </div>

        <div className="rounded-[4rem] overflow-hidden aspect-video relative group border border-white/10 shadow-ambient">
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10 opacity-80" />
          
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-primary/10 via-[#020617] to-secondary/10 p-8 text-center">
            {!handshakeLoaded && (
              <>
                <span className="material-symbols-outlined text-white/10 text-[10rem] group-hover:scale-110 transition-transform duration-1000">handshake</span>
                <div className="mt-4 font-display text-3xl font-bold uppercase tracking-widest text-white/95">Sanjay & DG Ravishankar Handshake</div>
                <div className="text-sm uppercase tracking-widest text-primary mt-2">Rotaract District 3192</div>
              </>
            )}
          </div>

          <img
            src="/assets/sanjay_dg_handshake.png"
            ref={(el) => {
              if (el && el.complete) {
                setHandshakeLoaded(true);
              }
            }}
            onLoad={() => setHandshakeLoaded(true)}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            alt="Sanjay with DG Handshake"
            className="absolute inset-0 w-full h-full object-cover z-20 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
          />
          
          <div className="absolute bottom-0 left-0 p-12 lg:p-20 z-30 w-full">
            <div className="max-w-2xl space-y-4">
              <h3 className="text-4xl md:text-6xl font-black text-white font-display tracking-tighter uppercase italic">Service Above <span className="text-primary">Self.</span></h3>
              <p className="text-xl text-white/95 font-medium leading-tight opacity-95 italic">
                Through every project and every handshake, we aim to build a legacy of excellence that transcends generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP PHOTO SLIDER */}
      <section className="px-8 md:px-12 py-32 overflow-hidden">
        <div className="flex flex-col gap-6 text-center items-center mb-24">
          <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] px-6 py-2 rounded-full bg-primary/5 border border-primary/10">District Core Team</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter font-display uppercase leading-none italic">Strategic <span className="text-primary not-italic">Leadership.</span></h2>
        </div>

        {mounted && (
          <div className="relative w-full overflow-hidden py-10">
            {/* Sliding Marquee */}
            <div className="flex w-full overflow-hidden">
              <motion.div
                className="flex gap-8 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 25,
                }}
              >
                {/* Duplicate the array twice to ensure seamless infinite looping */}
                {[...sliderPhotos, ...sliderPhotos].map((leader, idx) => (
                  <div key={idx} className="w-80 flex-shrink-0 bg-white/5 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 shadow-ambient hover:bg-white/10 hover:shadow-2xl transition-all duration-700 flex flex-col gap-8">
                    <div className="aspect-square rounded-[2rem] overflow-hidden border border-white/10 relative bg-[#090d22] flex items-center justify-center">
                      <span className="material-symbols-outlined text-white/5 text-6xl absolute z-0">person</span>
                      <img
                        src={leader.img}
                        onError={(e) => {
                          e.currentTarget.src = leader.fallback;
                        }}
                        alt={leader.name}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-110 transition-all duration-1000 relative z-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-white font-display tracking-tighter uppercase transition-colors leading-none italic">
                        {leader.name}
                      </h3>
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] opacity-80">
                        {leader.role}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </section>

      {/* CORE PILLARS SECTION */}
      <section className="px-8 md:px-12 py-32 space-y-24">
        <div className="flex flex-col gap-6 text-center items-center">
          <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] px-6 py-2 rounded-full bg-primary/5 border border-primary/10">The Foundations</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter font-display uppercase leading-none italic">Core <span className="text-primary not-italic">Pillars.</span></h2>
          <p className="text-white/90 text-sm font-bold tracking-[0.3em] uppercase italic">The Four Avenues of Service</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            { title: "Club Service", desc: "Focusing on strengthening fellowship and ensuring the effective functioning of the club.", icon: "groups" },
            { title: "Vocational Service", desc: "Encouraging high ethical standards in business and professions and recognizing the worth of all useful occupations.", icon: "work" },
            { title: "Community Service", desc: "Developing and implementing projects that improve the quality of life in our local communities.", icon: "volunteer_activism" },
            { title: "International Service", desc: "Expanding our reach globally to foster understanding, goodwill, and peace between nations.", icon: "public" }
          ].map((pillar, i) => (
            <div key={i} className="group p-10 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all duration-500 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">{pillar.icon}</span>
              </div>
              <h3 className="text-3xl font-black text-white font-display uppercase tracking-tight italic">{pillar.title}</h3>
              <p className="text-white/80 font-medium leading-relaxed italic opacity-90">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HISTORY */}
      <section className="px-8 md:px-12 py-32 bg-white/5 rounded-[4rem] border border-white/10 mx-8 md:mx-12">
        <div className="max-w-4xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter font-display uppercase leading-none italic">The Legacy <span className="text-primary not-italic">of 3192.</span></h2>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="space-y-12 text-xl md:text-2xl text-white/90 font-medium leading-relaxed italic opacity-95">
            <p>
              Rotaract originally began as a Rotary International youth program in 1968. Today, Rotaract operates globally with over 10,000 clubs in 180 countries.
            </p>
            <p>
              District 3192 has a rich legacy of vibrant youth action in South India. Formed to concentrate impact within key urban and rural demographics, 3192 acts as a catalyst for professional development and massive community service projects.
            </p>
          </div>

          <div className="bg-white/5 rounded-[3.5rem] p-12 lg:p-20 border border-white/10 shadow-ambient relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="text-center space-y-10 relative z-10">
              <h3 className="text-3xl md:text-4xl font-black text-primary font-display uppercase tracking-tight italic">"Friendship through Service"</h3>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-tight opacity-90 italic">
                Join a global movement of young leaders making an impact. Start your journey with Rotaract District 3192 today.
              </p>
              <a href="/clubs" className="inline-flex bg-primary text-white px-12 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all group/btn relative overflow-hidden">
                 <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                 <span className="relative z-10 flex items-center gap-4">
                   Find local club
                   <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-2 transition-transform">bolt</span>
                 </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
