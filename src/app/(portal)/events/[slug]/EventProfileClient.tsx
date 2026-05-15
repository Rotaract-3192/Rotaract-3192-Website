"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";

export default function EventProfileClient({ event }: { event: any }) {
  return (
    <main className="min-h-screen pt-32 pb-40">
      {/* Immersive Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-primary/5 backdrop-blur-[2px]"></div>
          <img 
            src={event.imageUrl} 
            className="w-full h-full object-cover grayscale opacity-40 scale-105 group-hover:scale-100 transition-transform duration-[2000ms]"
            alt=""
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pb-20 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <span className="px-6 py-2 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-primary/20">
              {event.isSignatureProject ? 'Signature Mission' : 'Standard Protocol'}
            </span>
            <span className="px-6 py-2 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] border border-white/10 backdrop-blur-xl">
              Phase: Execution
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-bold text-white uppercase tracking-tighter font-display italic leading-none max-w-5xl"
          >
            {event.title}
          </motion.h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-30">
        {/* Left: Mission Directive */}
        <div className="lg:col-span-8 space-y-16">
          <section className="space-y-8">
            <h3 className="text-sm font-black text-primary uppercase tracking-[0.4em] flex items-center gap-4">
              <span className="w-12 h-[1px] bg-primary"></span>
              Mission Directive
            </h3>
            <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed opacity-90 italic font-display">
              {event.description}
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-3xl space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <span className="material-symbols-outlined text-3xl">calendar_month</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-2">Temporal Coordinates</p>
                <p className="text-2xl font-bold text-white uppercase tracking-tight italic font-display">
                  {format(new Date(event.eventDate), 'EEEE, do MMMM yyyy')}
                </p>
                <p className="text-sm text-primary font-bold uppercase tracking-widest mt-1">10:00 AM - 04:00 PM IST</p>
              </div>
            </div>

            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-3xl space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <span className="material-symbols-outlined text-3xl">location_on</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-2">Physical Location</p>
                <p className="text-2xl font-bold text-white uppercase tracking-tight italic font-display">
                  {event.location}
                </p>
                <p className="text-sm text-primary font-bold uppercase tracking-widest mt-1">On-Site Deployment</p>
              </div>
            </div>
          </section>

          {/* Registration Module */}
          <section className="relative p-12 lg:p-20 bg-primary rounded-[4rem] overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -z-10 group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="space-y-4 text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-white font-display tracking-tight uppercase italic leading-none">Registration <br />Protocol</h2>
                <p className="text-white/80 font-bold uppercase tracking-widest text-[10px]">Secure your clearance for this operation</p>
              </div>
              <button className="px-12 py-5 bg-white text-primary rounded-2xl font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all">
                Initialize Access
              </button>
            </div>
          </section>
        </div>

        {/* Right: Organizer Intel */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl">
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-primary"></span>
              Organizer Intel
            </h3>
            
            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/5 p-3 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/initials/svg?seed=RC" className="w-full h-full object-contain opacity-60" alt="" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">Host Entity</p>
                  <p className="text-xl font-bold text-white uppercase tracking-tighter italic font-display">Rotaract Club of Bengaluru</p>
                </div>
              </div>

              <div className="pt-10 border-t border-white/5 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Entry Fee</span>
                  <span className="text-lg font-bold text-primary font-display">INR 250.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Slots Remaining</span>
                  <span className="text-lg font-bold text-white font-display">42 / 100</span>
                </div>
              </div>

              <div className="pt-10 border-t border-white/5 flex gap-4">
                <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">share</span>
                </button>
                <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">contact_support</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 bg-primary/5 border border-primary/20 rounded-[2.5rem] border-dashed text-center">
            <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em]">District 3192 // Official Registry</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
