export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="space-y-6 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Usage Agreement</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Terms of <span className="text-primary not-italic">Service.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center justify-center lg:justify-start gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            Operational Guidelines & Member Conduct v1.0
          </p>
        </header>

        <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient space-y-10">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">1.0 Platform <span className="text-primary not-italic">Access.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              Access to the Rotaract District 3192 Portal is granted exclusively to active members of chartered Rotaract clubs within the district. Users are responsible for maintaining the confidentiality of their credentials.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">2.0 Member <span className="text-primary not-italic">Conduct.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              Users must adhere to the Rotaract Four-Way Test and the Rotaract District 3192 Code of Conduct. Any misuse of the platform, including unauthorized data extraction or distribution of inappropriate content, will result in immediate revocation of access.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">3.0 Intellectual <span className="text-primary not-italic">Property.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              All materials provided on this portal, including district reports, minutes of meetings, and resource guides, are the property of Rotaract District 3192 and are intended for internal club use only.
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
