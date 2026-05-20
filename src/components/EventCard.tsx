import Link from "next/link";

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  image: string;
  slug: string;
  badge?: string;
  statusBadge?: string;
  rsvpLink?: string | null;
}

export default function EventCard({ 
  title, date, description, image, slug, badge, statusBadge, rsvpLink
}: EventCardProps) {
  return (
    <div className="group relative bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden transition-all duration-700 hover:shadow-primary/5 flex flex-col h-full">
      {/* Image Container */}
      <div className="h-64 w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
        />
        {statusBadge && (
          <div className="absolute top-6 right-6 z-20">
            <span className="bg-primary text-white text-[9px] font-bold px-5 py-1.5 rounded-full uppercase tracking-[0.3em] shadow-xl border border-white/10">
              {statusBadge}
            </span>
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-1 gap-6">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10">
            {date}
          </span>
          <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.4em] font-sans">
            {badge}
          </span>
        </div>

        <div className="space-y-4 flex-1">
          <h4 className="text-2xl font-bold text-white leading-tight font-display tracking-tight uppercase group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h4>
          <p className="text-text-muted text-sm font-medium leading-relaxed line-clamp-3 font-sans opacity-70">
            {description}
          </p>
        </div>

        <div className="pt-6 border-t border-white/5 mt-auto flex items-center gap-3">
          {rsvpLink && (
            <a href={rsvpLink} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-bold text-[10px] uppercase tracking-[0.3em] px-5 py-3 rounded-xl hover:bg-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all no-underline">
              <span className="material-symbols-outlined text-base">how_to_reg</span>
              Register
            </a>
          )}
          <Link
            href={`/events/${slug}`}
            className={`flex items-center justify-between group/link no-underline ${rsvpLink ? '' : 'flex-1'}`}
          >
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em] group-hover:text-primary transition-colors mr-4">{rsvpLink ? '' : 'Details'}</span>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover/link:bg-primary group-hover/link:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-xl group-hover/link:translate-x-1 transition-transform">
                north_east
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
