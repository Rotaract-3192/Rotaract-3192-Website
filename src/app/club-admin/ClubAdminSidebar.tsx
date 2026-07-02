'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/lib/mockAuthClient';

const NAV = [
  { href: '/club-admin',              icon: 'dashboard',    label: 'Dashboard'    },
  { href: '/club-admin/portfolio',    icon: 'shield',       label: 'Club Profile' },
  { href: '/club-admin/members',      icon: 'group',        label: 'Members'      },
  { href: '/club-admin/events',       icon: 'event',        label: 'Events'       },
  { href: '/club-admin/news',         icon: 'article',      label: 'News & Blogs' },
  { href: '/club-admin/mom',          icon: 'description',  label: 'Minutes'      },
];

export default function ClubAdminSidebar({ clubName, isOpen, onClose }: {
  clubName: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const path = usePathname();
  const { user } = useUser();
  const role = user?.publicMetadata?.role as string | undefined;
  const isSuperAdmin = role === 'district_admin';

  return (
    <aside className={`fixed top-0 left-0 h-screen w-72 bg-[#07101f] border-r border-purple-500/10 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Logo */}
      <div className="h-20 flex items-center px-8 border-b border-purple-500/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-purple-400 text-lg">shield_person</span>
          </div>
          <div>
            <p className="text-[8px] font-black text-purple-400/60 uppercase tracking-[0.4em] font-sans">Club Portal</p>
            <p className="text-xs font-black text-white uppercase tracking-wider font-display leading-tight truncate max-w-[140px]">{clubName}</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden ml-auto text-white/20 hover:text-white transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
        {NAV.map(item => {
          const active = path === item.href || (item.href !== '/club-admin' && path.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} onClick={onClose}
              className={`flex items-center gap-4 px-5 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.25em] transition-all font-sans group ${
                active
                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-lg shadow-purple-500/5'
                  : 'text-white/30 hover:text-white hover:bg-white/5 border border-transparent'
              }`}>
              <span className={`material-symbols-outlined text-lg ${active ? 'text-purple-400' : 'text-white/20 group-hover:text-white/60'}`}>{item.icon}</span>
              {item.label}
              {active && <div className="ml-auto w-1 h-1 rounded-full bg-purple-400 animate-pulse" />}
            </Link>
          );
        })}
      </nav>

      {/* Back to main site */}
      <div className="px-4 pb-8 shrink-0 space-y-2">
        <div className="h-px bg-purple-500/10 mb-4" />
        {isSuperAdmin && (
          <Link href="/admin"
            className="flex items-center gap-3 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-yellow-400/80 border border-transparent hover:border-yellow-500/10 hover:bg-yellow-500/5 transition-all font-sans">
            <span className="material-symbols-outlined text-base">admin_panel_settings</span>
            Master Admin
          </Link>
        )}
        <Link href="/"
          className="flex items-center gap-3 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white/60 border border-transparent hover:border-white/5 transition-all font-sans">
          <span className="material-symbols-outlined text-base">home</span>
          Public Site
        </Link>
      </div>
    </aside>
  );
}
