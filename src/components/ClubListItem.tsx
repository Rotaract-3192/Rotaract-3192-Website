import Link from "next/link";

interface ClubListItemProps {
  name: string;
  city: string;
  members: number;
  engagement: number;
  slug: string;
  icon?: string;
  logoUrl?: string;
}

export default function ClubListItem({ 
  name, city, members, engagement, slug, icon = 'stars', logoUrl 
}: ClubListItemProps) {
  return (
    <Link
      href={`/clubs/${slug}`}
      className="group p-8 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8 no-underline"
    >
      <div className="flex items-center gap-8 w-full md:w-auto">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform overflow-hidden">
          {logoUrl ? (
            <img src={logoUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="material-symbols-outlined text-3xl">{icon}</span>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white uppercase tracking-tight font-display group-hover:text-primary transition-colors leading-none italic">{name}</h3>
          <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-primary/60">location_on</span>
            {city}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-6 md:pt-0">
        <div className="text-center md:text-right">
          <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em] mb-1">Members</p>
          <p className="text-xl font-bold text-white font-display leading-none italic">{members}</p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em] mb-1">Engagement</p>
          <p className="text-xl font-bold text-primary font-display leading-none italic">{engagement}%</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-primary group-hover:text-white transition-all">
          <span className="material-symbols-outlined text-xl">north_east</span>
        </div>
      </div>
    </Link>
  );
}
