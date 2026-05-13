import Link from "next/link";

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  image: string;
  slug: string;
  badge?: string;
  statusBadge?: string;
}

export default function EventCard({ 
  title, date, description, image, slug, badge, statusBadge 
}: EventCardProps) {
  return (
    <div className="group relative bg-surface-container-low/70 backdrop-blur-xl rounded-[3rem] border border-outline-variant/30 shadow-ambient overflow-hidden transition-all duration-700 hover:bg-white hover:shadow-2xl hover:translate-y-[-8px] flex flex-col h-full">
      {/* Image Node */}
      <div className="h-64 w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent z-10 opacity-60"></div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
        />
        {statusBadge && (
          <div className="absolute top-6 right-6 z-20">
            <span className="bg-primary/90 backdrop-blur-md text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] shadow-lg border border-white/20">
              {statusBadge}
            </span>
          </div>
        )}
      </div>

      <div className="p-10 flex flex-col flex-1 gap-6">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10">
            {date}
          </span>
          <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] italic">
            {badge}
          </span>
        </div>

        <div className="space-y-4 flex-1">
          <h4 className="text-2xl font-black text-on-surface leading-tight font-display tracking-tighter uppercase italic group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h4>
          <p className="text-on-surface-variant text-sm font-medium leading-relaxed opacity-70 line-clamp-3">
            {description}
          </p>
        </div>

        <div className="pt-6 border-t border-outline-variant/30 mt-auto">
          <Link
            href={`/events/${slug}`}
            className="flex items-center justify-between group/link"
          >
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Initialize Intel</span>
            <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary group-hover/link:bg-primary group-hover/link:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-xl group-hover/link:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
