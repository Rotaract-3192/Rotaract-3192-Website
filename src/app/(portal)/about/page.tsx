import BentoCard from "@/components/BentoCard";

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-24">
      {/* Background Cinematic Accents */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -z-10"></div>
      <div className="fixed -bottom-48 -left-48 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] -z-10"></div>

      {/* HERO SECTION */}
      <header className="p-8 md:p-12 lg:py-32 flex flex-col items-center text-center gap-8 border-b border-outline-variant/30 mb-24">
        <span className="inline-block px-6 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">The District Authority</span>
        <h1 className="text-6xl md:text-9xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
          Architecting <br />
          <span className="text-primary not-italic">Social Change.</span>
        </h1>
        <p className="text-xl md:text-3xl text-on-surface-variant max-w-3xl font-medium leading-tight opacity-70">
          Rotaract District 3192 is a thriving network of young leaders committed to institutional excellence and sustainable community impact.
        </p>
      </header>

      {/* MISSION & VISION */}
      <section className="px-8 md:px-12 py-12 space-y-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <BentoCard
            title="Our Mission"
            description="To provide opportunities for young men and women to enhance their knowledge and skills that will assist them in personal development, to address the physical and social needs of their communities."
            icon="rocket_launch"
          />
          <BentoCard
            title="Our Vision"
            description="Together, we see a world where young people unite and take action to create lasting change — across the globe, in our communities, and in ourselves."
            icon="visibility"
            translateY={true}
          />
        </div>

        <div className="rounded-[4rem] overflow-hidden aspect-video relative group border border-outline-variant/30 shadow-ambient">
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10 opacity-80" />
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4451d13488?auto=format&fit=crop&q=80&w=1200"
            alt="Service"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
          />
          <div className="absolute bottom-0 left-0 p-12 lg:p-20 z-20 w-full">
            <div className="max-w-2xl space-y-4">
              <h3 className="text-4xl md:text-6xl font-black text-on-surface font-display tracking-tighter uppercase italic">Service Above <span className="text-primary">Self.</span></h3>
              <p className="text-xl text-on-surface-variant font-medium leading-tight opacity-80">
                Through every project and every handshake, we aim to build a legacy of excellence that transcends generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="px-8 md:px-12 py-32">
        <div className="flex flex-col gap-6 text-center items-center mb-24">
          <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] px-6 py-2 rounded-full bg-primary/5 border border-primary/10">District Core Team</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter font-display uppercase leading-none italic">Strategic <span className="text-primary not-italic">Leadership.</span></h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Dr. Priya Ramesh", role: "District Rotaract Representative", img: "https://ui-avatars.com/api/?name=Priya+Ramesh&background=0e6ba8&color=caf0f8&size=400" },
            { name: "Rahul Krishnan", role: "District Secretary", img: "https://ui-avatars.com/api/?name=Rahul+Krishnan&background=00b4d8&color=020b18&size=400" },
            { name: "Sneha Venkatesh", role: "District Treasurer", img: "https://ui-avatars.com/api/?name=Sneha+Venkatesh&background=0e6ba8&color=caf0f8&size=400" },
            { name: "Karthik Reddy", role: "Professional Service Chair", img: "https://ui-avatars.com/api/?name=Karthik+Reddy&background=00b4d8&color=020b18&size=400" },
          ].map((leader, idx) => (
            <div key={idx} className="group bg-surface-container-low/70 backdrop-blur-xl p-8 rounded-[3rem] border border-outline-variant/30 shadow-ambient hover:bg-white hover:shadow-2xl transition-all duration-700 flex flex-col gap-8">
              <div className="aspect-square rounded-[2rem] overflow-hidden border border-outline-variant/30">
                <img
                  src={leader.img}
                  alt={leader.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-on-surface font-display tracking-tighter uppercase group-hover:text-primary transition-colors leading-none">
                  {leader.name}
                </h3>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] opacity-60">
                  {leader.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HISTORY */}
      <section className="px-8 md:px-12 py-32 bg-surface-container-low/30 rounded-[4rem] border border-outline-variant/10 mx-8 md:mx-12">
        <div className="max-w-4xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter font-display uppercase leading-none italic">The Legacy <span className="text-primary not-italic">of 3192.</span></h2>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="space-y-12 text-xl md:text-2xl text-on-surface-variant font-medium leading-relaxed italic opacity-80">
            <p>
              Rotaract originally began as a Rotary International youth program in 1968. Today, Rotaract operates globally with over 10,000 clubs in 180 countries.
            </p>
            <p>
              District 3192 has a rich legacy of vibrant youth action in South India. Formed to concentrate impact within key urban and rural demographics, 3192 acts as a catalyst for professional development and massive community service projects.
            </p>
          </div>

          <div className="bg-surface-container-high rounded-[3.5rem] p-12 lg:p-20 border border-outline-variant/30 shadow-ambient relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="text-center space-y-10 relative z-10">
              <h3 className="text-3xl md:text-4xl font-black text-primary font-display uppercase tracking-tight italic">"Friendship through Service"</h3>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-medium leading-tight opacity-70">
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
