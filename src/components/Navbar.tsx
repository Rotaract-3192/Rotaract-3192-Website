"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useAuth, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const { userId } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Determine user role
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "thejaswinps@gmail.com" || user?.publicMetadata?.role === "district_admin";
  const userRole = isAdmin ? "district_admin" : "member";

  const mainNavLinks = [
    { name: "District", href: "/about" },
    { name: "Clubs", href: "/clubs" },
    { name: "Events", href: "/events" },
    { name: "Resources", href: "/resources" },
  ];

  const dashboardLink = userRole === "district_admin" ? "/admin" : "/dashboard";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "h-16 bg-surface/80 backdrop-blur-2xl border-b border-outline-variant/20 shadow-lg shadow-black/5" 
          : "h-20 bg-transparent border-b border-white/5"
      }`}
    >
      <div className="flex justify-between items-center px-8 h-full max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          style={{ textDecoration: "none" }}
        >
          <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12">
            <span className="material-symbols-outlined text-lg">terminal</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-on-surface uppercase font-display">
            District <span className="text-primary italic">3192</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {mainNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-label font-bold text-[11px] uppercase tracking-[0.2em] transition-all relative py-2 ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-on-surface-variant hover:text-primary'
                }`}
                style={{ textDecoration: "none" }}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            );
          })}

          {/* Office Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 font-label font-bold text-[11px] uppercase tracking-[0.2em] text-on-surface-variant transition-colors group-hover:text-primary bg-transparent border-none cursor-pointer">
              Office
              <span className="material-symbols-outlined text-base transform group-hover:rotate-180 transition-transform">
                expand_more
              </span>
            </button>
            <div
              className="absolute top-full -left-4 w-52 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50 py-3 mt-4 bg-surface-container-lowest/95 backdrop-blur-xl border border-outline-variant/30 rounded-2xl shadow-ambient"
            >
              {[
                { label: "District News", href: "/news", icon: "rss_feed" },
                { label: "Bulletins", href: "/newsletter", icon: "newspaper" },
                { label: "Opportunities", href: "/jobs", icon: "work" },
                { label: "Brand Hub", href: "/brand-centre", icon: "palette" },
                { label: "Hall of Fame", href: "/hall-of-fame", icon: "stars" },
                { label: "Leaderboard", href: "/leaderboard", icon: "leaderboard" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-6 py-3 text-[10px] font-black text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all uppercase tracking-widest"
                  style={{ textDecoration: "none" }}
                >
                  <span className="material-symbols-outlined text-base opacity-40">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Auth & Actions */}
        <div className="flex items-center gap-6">
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link
                href={dashboardLink}
                className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary/10 transition-all"
                style={{ textDecoration: "none" }}
              >
                <span className="material-symbols-outlined text-2xl">grid_view</span>
              </Link>
              <UserButton appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }} />
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="bg-primary text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              style={{ textDecoration: "none" }}
            >
              Uplink
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-highest transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            style={{ color: "var(--color-primary)", background: "none", border: "none", cursor: "pointer" }}
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-surface-container-low/95 backdrop-blur-2xl border-b border-outline-variant/30 transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[80vh] opacity-100 py-8' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="px-8 space-y-6">
          {mainNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-2xl font-black tracking-tighter uppercase ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}
                style={{ textDecoration: "none" }}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-outline-variant/30">
            {[
              { label: "News", href: "/news" },
              { label: "Jobs", href: "/jobs" },
              { label: "Brand", href: "/brand-centre" },
              { label: "Fame", href: "/hall-of-fame" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant"
                style={{ textDecoration: "none" }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href={dashboardLink}
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full bg-primary text-white py-4 rounded-2xl flex items-center justify-center font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
            style={{ textDecoration: "none" }}
          >
            Access Terminal
          </Link>
        </div>
      </div>
    </nav>
  );
}
