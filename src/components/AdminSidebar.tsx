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
    { href: '/admin',             label: 'Overview',    icon: 'dashboard'        },
    { href: '/admin/president',   label: 'Hall of Honor', icon: 'military_tech'  },
    { href: '/admin/members',     label: 'Members',     icon: 'groups'           },
    { href: '/admin/clubs',       label: 'Clubs',       icon: 'hub'              },
    { href: '/admin/events',      label: 'Events',      icon: 'event'            },
    { href: '/admin/leaderboard', label: 'Leaderboard', icon: 'leaderboard'      },
    { href: '/admin/mom',         label: 'MOMs',        icon: 'description'      },
    { href: '/admin/audit',       label: 'System Audit', icon: 'security'        },
  ];

  return (
    <aside className={`
      w-72 fixed inset-y-0 left-0 bg-[#091124] z-50 flex flex-col 
      transition-transform duration-500 ease-in-out border-r border-white/5
      ${isOpen ? 'translate-x-0 shadow-2xl shadow-primary/20' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Sidebar Header with White Card Logo */}
      <div className="p-8 flex flex-col items-center relative">
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="lg:hidden absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Logo container */}
        <Link href="/" className="mb-4 flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/20 transition-all duration-300">
          <img 
            src="/assets/logo.png" 
            alt="Rotaract District Logo" 
            className="h-18 w-auto object-contain filter brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]"
          />
        </Link>
      </div>

      <div className="px-6">
        <div className="border-t border-[#1e293b] opacity-40"></div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
        {menuItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={`flex items-center gap-4 px-5 py-3 rounded-xl font-bold text-[10px] uppercase tracking-[0.18em] transition-all relative group no-underline overflow-hidden font-sans ${
                isActive 
                  ? 'bg-[#0f2444] text-[#f9a826] border border-[#1d3d6b]/50 shadow-inner' 
                  : 'text-white/40 hover:text-white hover:bg-[#0f2444]/40'
              }`}
            >
              <span className={`material-symbols-outlined text-lg transition-colors group-hover:scale-105 ${isActive ? 'text-[#f9a826]' : 'text-slate-400 group-hover:text-white'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="active-pill" 
                  className="absolute right-0 top-2.5 bottom-2.5 w-1 bg-[#f9a826] rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer with Crimson Exit Button */}
      <div className="p-6 space-y-4">
        <div className="border-t border-[#1e293b] opacity-40 mb-2"></div>
        <Link 
          href="/" 
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#d81b60] hover:bg-[#b0134b] text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-lg no-underline font-sans group"
        >
          <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
          Exit Admin
        </Link>
      </div>
    </aside>
  );
}

