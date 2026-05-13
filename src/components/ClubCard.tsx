import Link from "next/link";

interface ClubCardProps {
  name: string;
  city: string;
  members: number;
  engagement: number;
  badge: string;
  type?: 'primary' | 'secondary';
  slug: string;
  icon?: string;
}

export default function ClubCard({ 
  name, city, members, engagement, badge, type = 'primary', slug, icon = 'stars' 
}: ClubCardProps) {
  const accentColor = type === 'secondary' ? 'var(--color-gold)' : 'var(--color-reef)';
  const accentBg    = type === 'secondary'
    ? 'rgba(240, 165, 0, 0.12)'
    : 'rgba(0, 180, 216, 0.12)';

  return (
    <div className="bg-surface-container-low/70 backdrop-blur-xl rounded-[2.5rem] border border-outline-variant/30 shadow-ambient group hover:shadow-2xl transition-all duration-700 overflow-hidden p-8 flex flex-col h-full relative">
      {/* Cinematic Accent Blur */}
      <div 
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000 opacity-20 pointer-events-none"
        style={{ background: type === 'secondary' ? 'var(--primary)' : 'var(--secondary)' }}
      />

      {/* Header Area */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
          <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            {icon}
          </span>
        </div>
        <span className="px-4 py-1.5 rounded-xl bg-primary/10 text-primary font-black text-[9px] uppercase tracking-[0.2em] border border-primary/20">
          {badge}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 mb-8 relative z-10">
        <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight mb-2 font-display group-hover:text-primary transition-colors leading-none">
          {name}
        </h3>
        <p className="text-[11px] font-black text-on-surface-variant uppercase tracking-[0.3em] flex items-center gap-2 opacity-60 italic">
          <span className="material-symbols-outlined text-xs text-primary">location_on</span>
          {city}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
        <div className="p-5 bg-surface-container-high/50 rounded-[1.5rem] border border-outline-variant/20 shadow-inner group-hover:bg-white/40 transition-colors duration-500">
          <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.3em] mb-2 opacity-60">
            Cohort
          </p>
          <p className="text-2xl font-black text-on-surface font-display">{members}<span className="text-[10px] ml-1 opacity-40 font-sans">MBRS</span></p>
        </div>
        <div className="p-5 bg-surface-container-high/50 rounded-[1.5rem] border border-outline-variant/20 shadow-inner group-hover:bg-white/40 transition-colors duration-500">
          <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.3em] mb-2 opacity-60">
            Vibe
          </p>
          <p className="text-2xl font-black text-primary font-display">{engagement}%</p>
        </div>
      </div>

      {/* Action */}
      <Link
        href={`/clubs/${slug}`}
        className="w-full py-5 bg-primary text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-[1.5rem] flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-500 group/btn relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
        <span className="relative z-10">Sync Data</span>
        <span className="material-symbols-outlined text-sm relative z-10 group-hover/btn:translate-x-1 transition-transform">bolt</span>
      </Link>
    </div>
  );
}
