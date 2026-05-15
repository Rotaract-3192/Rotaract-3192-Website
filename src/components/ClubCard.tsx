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
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl group hover:shadow-primary/5 transition-all duration-700 overflow-hidden p-8 flex flex-col h-full relative">
      {/* Cinematic accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-0 group-hover:bg-primary/20 transition-all duration-700"></div>

      {/* Header Area */}
      <div className="flex justify-between items-start mb-10 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-all duration-500">
          <span className="material-symbols-outlined text-3xl">
            {icon}
          </span>
        </div>
        <span className="px-5 py-1.5 rounded-full bg-white/5 text-primary font-bold text-[9px] uppercase tracking-[0.3em] border border-white/10">
          {badge}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 mb-10 relative z-10">
        <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-2 font-display group-hover:text-primary transition-colors leading-none">
          {name}
        </h3>
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] flex items-center gap-2 font-sans">
          <span className="material-symbols-outlined text-base text-primary/60">location_on</span>
          {city}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-10 relative z-10">
        <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/5 group-hover:bg-white/10 transition-all duration-500">
          <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] mb-2 font-sans">
            Members
          </p>
          <p className="text-2xl font-bold text-white font-display leading-none">{members}</p>
        </div>
        <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/5 group-hover:bg-white/10 transition-all duration-500">
          <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] mb-2 font-sans">
            Engagement
          </p>
          <p className="text-2xl font-bold text-primary font-display leading-none">{engagement}%</p>
        </div>
      </div>

      {/* Action */}
      <Link
        href={`/clubs/${slug}`}
        className="w-full py-5 bg-white/5 text-white font-bold text-[10px] uppercase tracking-[0.5em] rounded-2xl flex items-center justify-center gap-4 border border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 group/btn no-underline"
      >
        View Portfolio
        <span className="material-symbols-outlined text-xl group-hover/btn:translate-x-2 transition-transform text-primary group-hover:text-white">north_east</span>
      </Link>
    </div>
  );
}
