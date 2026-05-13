"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Overview', icon: 'space_dashboard' },
    { href: '/admin/president', label: 'President', icon: 'military_tech' },
    { href: '/admin/members', label: 'Members', icon: 'group' },
    { href: '/admin/clubs', label: 'Clubs', icon: 'hub' },
    { href: '/admin/events', label: 'Events', icon: 'event' },
    { href: '/admin/announcements', label: 'Broadcasts', icon: 'campaign' },
    { href: '/admin/resources', label: 'Resources', icon: 'folder' },
    { href: '/admin/newsletter', label: 'Bulletins', icon: 'newspaper' },
    { href: '/admin/jobs', label: 'Opportunities', icon: 'work' },
    { href: '/admin/lms', label: 'Academy', icon: 'school' },
    { href: '/admin/mom', label: 'Minutes', icon: 'description' },
    { href: '/admin/audit', label: 'Audit Log', icon: 'security' },
  ];

  return (
    <aside className={`
      w-72 fixed inset-y-0 left-0 bg-surface/90 backdrop-blur-3xl z-50 flex flex-col 
      transition-transform duration-500 ease-in-out border-r border-outline-variant/30
      ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="p-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 gradient-brand rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12">
            <span className="material-symbols-outlined text-xl">terminal</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-on-surface leading-none tracking-tighter text-xl italic uppercase">ADMIN</span>
            <span className="text-[8px] font-black text-primary uppercase tracking-[0.4em] mt-1">Terminal 3192</span>
          </div>
        </Link>
        
        {/* Close button for mobile */}
        <button 
          onClick={onClose}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto scrollbar-none">
        {menuItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={`flex items-center gap-4 px-6 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all relative group overflow-hidden ${
                isActive 
                  ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                  : 'text-on-surface-variant/60 hover:text-primary hover:bg-primary/5'
              }`}
            >
              <span className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${isActive ? '' : 'opacity-40'}`}>
                {item.icon}
              </span>
              <span className={isActive ? 'italic' : ''}>{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="active-pill" 
                  className="absolute right-0 top-0 bottom-0 w-1 bg-white/30"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-8 space-y-4">
        <div className="bg-surface-container-low/50 p-6 rounded-[2rem] border border-outline-variant/30 backdrop-blur-xl">
           <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></div>
             <p className="text-[9px] font-black text-on-surface uppercase tracking-[0.3em] italic">System Uplink</p>
           </div>
           <p className="text-[8px] font-bold text-on-surface-variant/40 uppercase tracking-widest mt-2">v4.0.1 • DISTRICT COMMAND</p>
        </div>
        
        <Link href="/" className="flex items-center justify-center gap-3 px-6 py-5 bg-error/5 hover:bg-error/10 text-error rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all border border-error/10 group">
          <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">logout</span>
          Exit Portal
        </Link>
      </div>
    </aside>
  );
}
