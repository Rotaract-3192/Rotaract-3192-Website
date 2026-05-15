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
    { href: '/admin', label: 'Overview', icon: 'dashboard' },
    { href: '/admin/president', label: 'President', icon: 'military_tech' },
    { href: '/admin/members', label: 'Directory', icon: 'groups' },
    { href: '/admin/clubs', label: 'Chapters', icon: 'hub' },
    { href: '/admin/events', label: 'Projects', icon: 'event' },
    { href: '/admin/feeds', label: 'Feeds', icon: 'rss_feed' },
    { href: '/admin/campaigns', label: 'Campaigns', icon: 'payments' },
    { href: '/admin/announcements', label: 'Broadcasts', icon: 'campaign' },
    { href: '/admin/resources', label: 'Archive', icon: 'folder' },
    { href: '/admin/newsletter', label: 'Bulletins', icon: 'newspaper' },
    { href: '/admin/jobs', label: 'Careers', icon: 'work' },
    { href: '/admin/lms', label: 'Academy', icon: 'school' },
    { href: '/admin/mom', label: 'Minutes', icon: 'description' },
    { href: '/admin/audit', label: 'Audit Log', icon: 'security' },
  ];

  return (
    <aside className={`
      w-72 fixed inset-y-0 left-0 bg-[#020617]/95 backdrop-blur-3xl z-50 flex flex-col 
      transition-transform duration-500 ease-in-out border-r border-white/5
      ${isOpen ? 'translate-x-0 shadow-2xl shadow-primary/20' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Sidebar Header */}
      <div className="p-10 flex items-center justify-between">
        <Link href="/" className="flex flex-col no-underline group">
          <span className="font-display font-bold text-white leading-none tracking-tight text-2xl uppercase">
            District <span className="text-primary">Admin</span>
          </span>
          <span className="text-[8px] font-bold text-primary uppercase tracking-[0.4em] mt-3 opacity-60 group-hover:opacity-100 transition-opacity font-sans">Official Portal</span>
        </Link>
        
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Navigation Menu */}
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
              className={`flex items-center gap-4 px-6 py-4 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all relative group no-underline overflow-hidden font-sans ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-white/40 hover:text-primary hover:bg-white/5'
              }`}
            >
              <span className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${isActive ? '' : 'opacity-40'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="active-pill" 
                  className="absolute right-0 top-2 bottom-2 w-1 bg-white/40 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-8 space-y-4">
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-xl">
           <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#3B82F6]"></div>
             <p className="text-[9px] font-bold text-white uppercase tracking-[0.3em] font-sans">Active Session</p>
           </div>
           <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em] mt-2 font-sans">District 3192 Network</p>
        </div>
        
        <Link href="/" className="flex items-center justify-center gap-3 px-6 py-5 bg-red-500/5 hover:bg-red-500/10 text-red-500 rounded-xl font-bold text-[10px] uppercase tracking-[0.3em] transition-all border border-red-500/10 no-underline group font-sans">
          <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">logout</span>
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
