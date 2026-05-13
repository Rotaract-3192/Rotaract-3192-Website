import EventCard from "@/components/EventCard";

export default function EventsClient({ eventsData }: { eventsData: any[] }) {
  const publishedEvents = (eventsData || []).filter((e: any) => e.status === 'published' || e.status === 'upcoming');
  // For now, let's just use all published events as upcoming if date logic is strict
  const upcomingEvents = publishedEvents;

  // Sort events by date
  const sortedEvents = upcomingEvents.sort((a: any, b: any) => 
    new Date(a.eventDate || a.start_at).getTime() - new Date(b.eventDate || b.start_at).getTime()
  );

  const featuredEvent = sortedEvents[0];
  const otherEvents = sortedEvents.slice(1);

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-24">
      {/* Background Cinematic Accents */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -z-10"></div>
      <div className="fixed -bottom-48 -left-48 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

      {/* Header Section */}
      <header className="p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-outline-variant/30 mb-12">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">District Pulse</span>
          <h1 className="text-5xl md:text-8xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Explore <span className="text-primary not-italic">Events.</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-xl font-medium leading-tight opacity-70">Discover opportunities to lead, serve, and connect with fellow Rotaractors across the district.</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="relative group">
            <select className="appearance-none bg-surface-container-high border border-outline-variant/30 rounded-2xl px-8 py-4 pr-12 font-black text-[10px] uppercase tracking-[0.2em] shadow-ambient focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer outline-none">
              <option>Category: All</option>
              <option>Service Project</option>
              <option>Professional Dev</option>
              <option>Social Mixer</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary transition-transform group-hover:translate-y-[-40%]">expand_more</span>
          </div>
          <div className="relative group">
            <select className="appearance-none bg-surface-container-high border border-outline-variant/30 rounded-2xl px-8 py-4 pr-12 font-black text-[10px] uppercase tracking-[0.2em] shadow-ambient focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer outline-none">
              <option>Date: Anytime</option>
              <option>This Weekend</option>
              <option>Next 30 Days</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary transition-transform group-hover:translate-y-[-40%]">calendar_today</span>
          </div>
        </div>
      </header>

      {/* Events Grid */}
      <section className="px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Featured Card - High Impact */}
        {featuredEvent && (
          <div className="lg:col-span-2 group relative overflow-hidden rounded-[3.5rem] bg-surface-container-low border border-outline-variant/30 shadow-ambient transition-all duration-700 h-[550px]">
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 scale-110 group-hover:scale-100 transition-all duration-1000 grayscale group-hover:grayscale-0">
              <img className="w-full h-full object-cover" src={featuredEvent.imageUrl || featuredEvent.banner_url} alt={featuredEvent.title} />
            </div>
            
            <div className="absolute top-8 left-8 z-20 flex gap-4">
              <span className="bg-primary text-white text-[9px] font-black uppercase tracking-[0.4em] px-5 py-2 rounded-full shadow-lg">{featuredEvent.type}</span>
              <span className="bg-surface-container-highest/80 backdrop-blur-xl text-on-surface text-[9px] font-black uppercase tracking-[0.4em] px-5 py-2 rounded-full shadow-lg border border-outline-variant/30">Apex Transmission</span>
            </div>

            <div className="absolute bottom-0 left-0 p-12 lg:p-16 z-20 w-full space-y-8">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-6xl font-black text-on-surface leading-none font-display tracking-tighter uppercase italic">{featuredEvent.title}</h3>
                <div className="flex flex-wrap items-center gap-10 text-on-surface-variant">
                  <span className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]">
                    <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
                    {new Date(featuredEvent.eventDate || featuredEvent.start_at).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]">
                    <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                    {featuredEvent.location || featuredEvent.venue}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a href={`/events/${featuredEvent.slug}`} className="w-full sm:w-auto bg-primary text-white font-black text-[11px] uppercase tracking-[0.4em] px-12 py-5 rounded-2xl hover:shadow-2xl hover:shadow-primary/40 transition-all text-center group/btn relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    Infiltrate Sync
                    <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-2 transition-transform">bolt</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Other Events */}
        {otherEvents.map((event: any, idx: number) => (
          <EventCard 
            key={idx}
            title={event.title}
            date={new Date(event.eventDate || event.start_at).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
            description={event.description}
            image={event.imageUrl || event.banner_url}
            slug={event.slug}
            badge={event.is_free ? 'Open Access' : 'Encrypted Link'}
            statusBadge={(event.status || 'UPCOMING').toUpperCase()}
          />
        ))}
      </div>

      {/* Secondary CTA Section / High-Tech Bento */}
      <section className="px-8 md:px-12 mt-24 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 bg-surface-container-low/70 backdrop-blur-2xl rounded-[3.5rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="space-y-6 flex-1">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[9px] font-black tracking-[0.4em] uppercase border border-primary/10">Signal Lost?</span>
              <h2 className="text-4xl md:text-5xl font-black text-on-surface font-display tracking-tighter uppercase italic leading-none">Activate <span className="text-primary not-italic">Notifications.</span></h2>
              <p className="text-on-surface-variant font-medium leading-relaxed max-w-md opacity-70">Our regional committees are constantly planning new missions. Get real-time alerts for the latest transmissions.</p>
            </div>
            <button className="w-full lg:w-auto bg-surface-container-high text-on-surface border border-outline-variant/30 px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-white hover:shadow-2xl transition-all duration-500 shrink-0">Enable Uplink</button>
          </div>
          
          <div className="bg-surface-container-low/70 backdrop-blur-2xl rounded-[3.5rem] p-12 border border-outline-variant/30 shadow-ambient flex flex-col justify-center items-center text-center group hover:bg-white transition-all duration-700">
            <div className="w-24 h-24 bg-surface-container-high rounded-[2rem] flex items-center justify-center text-primary border border-outline-variant/30 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
              <span className="material-symbols-outlined text-5xl">stars</span>
            </div>
            <h5 className="text-2xl font-black text-on-surface font-display tracking-tighter uppercase mb-3">Force Status</h5>
            <p className="text-on-surface-variant text-[11px] font-black uppercase tracking-[0.3em] opacity-40 leading-relaxed italic">Participate in 3+ missions this cycle to elevate your rank to 'Elite Leader'.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
