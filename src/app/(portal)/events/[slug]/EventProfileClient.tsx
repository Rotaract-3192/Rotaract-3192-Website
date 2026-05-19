"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";

function MarkdownContent({ content }: { content: string }) {
  if (!content) return null;
  const lines = content.split('\n');
  return (
    <div className="space-y-4 text-white/80 leading-relaxed font-sans text-base md:text-lg">
      {lines.map((line, idx) => {
        if (line.startsWith('### ')) {
          return <h5 key={idx} className="text-xl font-bold text-white uppercase tracking-wider mt-6">{line.slice(4)}</h5>;
        }
        if (line.startsWith('## ')) {
          return <h4 key={idx} className="text-2xl font-bold text-white uppercase tracking-wide mt-8">{line.slice(3)}</h4>;
        }
        if (line.startsWith('# ')) {
          return <h3 key={idx} className="text-3xl font-bold text-white uppercase tracking-tight mt-10">{line.slice(2)}</h3>;
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <ul key={idx} className="list-disc pl-6 space-y-1 my-2">
              <li>{line.slice(2)}</li>
            </ul>
          );
        }
        if (!line.trim()) {
          return <div key={idx} className="h-2"></div>;
        }
        const parts = line.split('**');
        if (parts.length > 1) {
          return (
            <p key={idx}>
              {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-bold">{part}</strong> : part)}
            </p>
          );
        }
        return <p key={idx}>{line}</p>;
      })}
    </div>
  );
}

export default function EventProfileClient({ event }: { event: any }) {
  let gallery: string[] = [];
  try {
    if (event.galleryImages) {
      gallery = JSON.parse(event.galleryImages);
    }
  } catch (e) {
    console.error('Failed to parse gallery images:', e);
  }

  let links: { label: string; url: string }[] = [];
  try {
    if (event.featuredLinks) {
      links = JSON.parse(event.featuredLinks);
    }
  } catch (e) {
    console.error('Failed to parse featured links:', e);
  }

  return (
    <main className="min-h-screen pt-32 pb-40">
      {/* Immersive Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-primary/5 backdrop-blur-[2px]"></div>
          {event.imageUrl ? (
            <img 
              src={event.imageUrl} 
              className="w-full h-full object-cover grayscale opacity-40 scale-105 group-hover:scale-100 transition-transform duration-[2000ms]"
              alt={event.title}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 opacity-20"></div>
          )}
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pb-20 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-4"
          >
            <span className="px-6 py-2 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-primary/20">
              {event.entryType || 'MISSION'}
            </span>
            <span className="px-6 py-2 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] border border-white/10 backdrop-blur-xl">
              {event.category || 'COMMUNITY SERVICE'}
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

          {event.fullContent && (
            <section className="space-y-8 border-t border-white/5 pt-16">
              <h3 className="text-sm font-black text-primary uppercase tracking-[0.4em] flex items-center gap-4">
                <span className="w-12 h-[1px] bg-primary"></span>
                Detailed Intel
              </h3>
              <MarkdownContent content={event.fullContent} />
            </section>
          )}

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-3xl space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <span className="material-symbols-outlined text-3xl">calendar_month</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-2">Temporal Coordinates</p>
                <p className="text-2xl font-bold text-white uppercase tracking-tight italic font-display">
                  {event.yearDateLabel || (event.eventDate ? format(new Date(event.eventDate), 'EEEE, do MMMM yyyy') : 'DATE PROTOCOL PENDING')}
                </p>
                {event.eventDate && (
                  <p className="text-sm text-primary font-bold uppercase tracking-widest mt-1">
                    {format(new Date(event.eventDate), 'hh:mm a')} IST
                  </p>
                )}
              </div>
            </div>

            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-3xl space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <span className="material-symbols-outlined text-3xl">location_on</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-2">Physical Location</p>
                <p className="text-2xl font-bold text-white uppercase tracking-tight italic font-display">
                  {event.location || 'SECURE DISTRICT COMPOUND'}
                </p>
                <p className="text-sm text-primary font-bold uppercase tracking-widest mt-1">Deployment Location</p>
              </div>
            </div>
          </section>

          {/* Gallery Images */}
          {gallery.length > 0 && (
            <section className="space-y-8 border-t border-white/5 pt-16">
              <h3 className="text-sm font-black text-primary uppercase tracking-[0.4em] flex items-center gap-4">
                <span className="w-12 h-[1px] bg-primary"></span>
                Mission Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {gallery.map((url, index) => (
                  <div key={index} className="aspect-square relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 group cursor-pointer">
                    <img 
                      src={url} 
                      alt={`Gallery Image ${index + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Featured Links */}
          {links.length > 0 && (
            <section className="space-y-8 border-t border-white/5 pt-16">
              <h3 className="text-sm font-black text-primary uppercase tracking-[0.4em] flex items-center gap-4">
                <span className="w-12 h-[1px] bg-primary"></span>
                Featured Intelligence Links
              </h3>
              <div className="flex flex-wrap gap-4">
                {links.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-xs uppercase tracking-widest hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 no-underline"
                  >
                    <span className="material-symbols-outlined text-sm">link</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Registration / RSVP Module */}
          {event.rsvpLink && (
            <section className="relative p-12 lg:p-20 bg-primary rounded-[4rem] overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -z-10 group-hover:scale-125 transition-transform duration-1000"></div>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="space-y-4 text-center lg:text-left">
                  <h2 className="text-4xl md:text-5xl font-bold text-white font-display tracking-tight uppercase italic leading-none">Registration <br />Protocol</h2>
                  <p className="text-white/80 font-bold uppercase tracking-widest text-[10px]">Secure your clearance for this operation</p>
                </div>
                <a 
                  href={event.rsvpLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-12 py-5 bg-white text-primary rounded-2xl font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all no-underline"
                >
                  Initialize Access
                </a>
              </div>
            </section>
          )}
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
                  <p className="text-xl font-bold text-white uppercase tracking-tighter italic font-display">Rotaract District 3192</p>
                </div>
              </div>

              <div className="pt-10 border-t border-white/5 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Operation Status</span>
                  <span className="text-sm font-bold text-primary font-display uppercase tracking-widest">{event.status || 'ACTIVE'}</span>
                </div>
              </div>

              <div className="pt-10 border-t border-white/5 flex gap-4">
                <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">share</span>
                </button>
                <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white transition-colors cursor-pointer">
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
