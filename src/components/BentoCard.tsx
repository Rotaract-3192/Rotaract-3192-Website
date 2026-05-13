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
  const iconStyles = {
    primary:   { bg: 'rgba(14, 107, 168, 0.2)',  color: 'var(--color-reef)' },
    secondary: { bg: 'rgba(240, 165, 0, 0.15)',   color: 'var(--color-gold)' },
    tertiary:  { bg: 'rgba(144, 224, 239, 0.12)', color: 'var(--color-foam)' },
  };
  const { bg, color } = iconStyles[type];

  return (
    <div className={`group relative bg-surface-container-low/70 backdrop-blur-xl rounded-[3.5rem] p-12 border border-outline-variant/30 shadow-ambient transition-all duration-700 hover:bg-white hover:shadow-2xl flex flex-col gap-8 ${translateY ? 'lg:translate-y-12' : ''}`}>
      <div className="w-20 h-20 bg-surface-container-high rounded-[2rem] border border-outline-variant/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
        <span className="material-symbols-outlined text-4xl">{icon}</span>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-3xl font-black text-on-surface leading-none font-display tracking-tighter uppercase italic group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-lg text-on-surface-variant font-medium leading-relaxed opacity-70">
          {description}
        </p>
      </div>

      <div className="pt-6 border-t border-outline-variant/30 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="flex items-center gap-4 text-primary font-black uppercase tracking-[0.4em] text-[9px]">
          Protocol Status: Active
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}
