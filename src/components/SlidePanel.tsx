'use client';

import { useEffect, useRef } from 'react';

interface SlidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: string;
  accentColor?: 'blue' | 'purple';
  children: React.ReactNode;
}

export default function SlidePanel({
  open,
  onClose,
  title,
  subtitle,
  icon = 'add_circle',
  accentColor = 'blue',
  children,
}: SlidePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const accent = accentColor === 'purple'
    ? { ring: 'border-purple-500/20', bg: 'bg-purple-500/10', text: 'text-purple-400', glow: 'shadow-purple-500/10' }
    : { ring: 'border-primary/20',   bg: 'bg-primary/10',    text: 'text-primary',    glow: 'shadow-primary/10'   };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 h-screen w-full max-w-2xl bg-[#07101f] border-l ${accent.ring} z-50 flex flex-col shadow-2xl ${accent.glow} transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className={`flex items-center gap-6 px-10 py-8 border-b ${accent.ring} shrink-0`}>
          <div className={`w-14 h-14 rounded-2xl ${accent.bg} border ${accent.ring} flex items-center justify-center shrink-0`}>
            <span className={`material-symbols-outlined text-2xl ${accent.text}`}>{icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2
              className="text-2xl font-bold font-display uppercase tracking-tight text-white"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {subtitle && (
              <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mt-1 font-sans text-white/60">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/30 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center shrink-0"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8">
          {children}
        </div>
      </div>
    </>
  );
}
