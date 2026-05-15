export default function CookiesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="space-y-6 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Browser Protocol</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Cookie <span className="text-primary not-italic">Policy.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center justify-center lg:justify-start gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            Session Management & Tracking Protocols v1.0
          </p>
        </header>

        <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient space-y-10">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">1.0 Essential <span className="text-primary not-italic">Cookies.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              These are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences or logging in.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">2.0 Performance <span className="text-primary not-italic">Tracking.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              We use analytical cookies to help us understand how visitors interact with the portal by collecting and reporting information anonymously. This helps us improve our digital infrastructure.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight font-display italic">3.0 Preference <span className="text-primary not-italic">Memory.</span></h2>
            <p className="text-on-surface-variant leading-relaxed">
              These cookies enable the website to provide enhanced functionality and personalization, such as remembering your club selection or dashboard layout preferences.
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
