interface BentoCardProps {
  title: string;
  description: string;
  icon: string;
  type?: 'primary' | 'secondary' | 'tertiary';
  translateY?: boolean;
}

export default function BentoCard({ 
  title, 
  description, 
  icon, 
  type = 'primary', 
  translateY = false 
}: BentoCardProps) {
  return (
    <div className={`group relative bg-navy/40 backdrop-blur-xl rounded-[4rem] p-12 border border-white/5 shadow-2xl transition-all duration-700 hover:shadow-primary/5 flex flex-col gap-8 ${translateY ? 'lg:translate-y-16' : ''}`}>
      <div className="w-20 h-20 bg-white/5 rounded-[2rem] border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-navy transition-all duration-700">
        <span className="material-symbols-outlined text-5xl">{icon}</span>
      </div>
      
      <div className="space-y-5">
        <h3 className="text-4xl font-black text-white leading-none font-display tracking-tighter uppercase italic group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-lg text-white/50 font-medium leading-relaxed font-serif italic">
          {description}
        </p>
      </div>

      <div className="pt-8 border-t border-white/10 mt-auto">
        <div className="flex items-center gap-4 text-primary font-bold uppercase tracking-[0.5em] text-[10px]">
          Status: Authorized
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}
