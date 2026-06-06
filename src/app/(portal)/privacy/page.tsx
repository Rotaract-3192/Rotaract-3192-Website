export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="space-y-6 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Legal Governance</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Privacy <span className="text-primary not-italic">Protocol.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center justify-center lg:justify-start gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            Data Protection & Privacy Policy v1.0
          </p>
        </header>

        <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient space-y-10">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">1.0 Data <span className="text-primary not-italic">Collection.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              We collect information that you provide directly to us when you register for the Rotaract District 3192 Portal, including your name, email address, club affiliation, and contact details. This data is used solely for district administration and member engagement.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">2.0 Usage <span className="text-primary not-italic">Analytics.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              Our system tracks interaction data to optimize the portal experience. This includes login frequency, resource downloads, and event registrations. We do not sell or share this data with third-party commercial entities.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">3.0 Security <span className="text-primary not-italic">Encryption.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              All personal data is encrypted at rest and in transit. We utilize Clerk for secure authentication and industry-standard encryption, ensuring your digital identity within the district remains protected.
            </p>
          </div>

          <div className="pt-10 border-t border-outline-variant/30">
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] opacity-40 italic">Last Updated: May 2024 | Rotaract District 3192 Secretariat</p>
          </div>
        </section>
      </div>
    </div>
  );
}
