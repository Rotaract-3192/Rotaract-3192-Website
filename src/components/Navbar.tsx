"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@/lib/mockAuthClient";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);

  const mainNavLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Clubs", href: "/clubs" },
    { name: "Resources", href: "/resources" },
  ];

  const officeLinks = [
    { name: "District News", href: "/news" },
    { name: "Newsletters", href: "/newsletter" },
    { name: "Hall of Fame", href: "/hall-of-fame" },
    { name: "Jobs", href: "/jobs" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[100] transition-all duration-700 rounded-2xl border border-white/10 ${
          scrolled 
            ? "bg-[#020617]/40 backdrop-blur-3xl py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="flex justify-between items-center px-6 lg:px-10 h-full">
          {/* Logo with Glow */}
          <Link href="/" className="flex items-center gap-4 no-underline group relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 group-hover:border-primary/40 flex items-center justify-center transition-all duration-500 relative z-10">
              <svg viewBox="0 0 100 100" className="w-7 h-7 text-primary animate-spin-slow">
                 <path fill="currentColor" d="M50,15.5c-19,0-34.5,15.5-34.5,34.5S31,84.5,50,84.5S84.5,69,84.5,50S69,15.5,50,15.5z M50,78.5c-15.7,0-28.5-12.8-28.5-28.5 S34.3,21.5,50,21.5S78.5,34.3,78.5,50S65.7,78.5,50,78.5z" />
              </svg>
            </div>
            <div className="flex flex-col text-left relative z-10">
              <span className="text-sm font-black tracking-[0.3em] text-white uppercase leading-none">
                Rotaract
              </span>
              <span className="text-[10px] font-bold tracking-[0.1em] text-primary/60 uppercase mt-1">
                District 3192
              </span>
            </div>
          </Link>
  
          {/* Desktop Navigation - Cinematic spacing */}
          <div className="hidden lg:flex items-center gap-10">
            {mainNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans font-black text-[10px] uppercase tracking-[0.3em] transition-all relative py-2 no-underline ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-primary/60"
                    />
                  )}
                </Link>
              );
            })}

            {/* Office Dropdown - Refined */}
            <div 
              className="relative"
              onMouseEnter={() => setIsOfficeOpen(true)}
              onMouseLeave={() => setIsOfficeOpen(false)}
            >
              <button className="flex items-center gap-2 font-sans font-black text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white py-2 transition-colors">
                Office
                <span className={`material-symbols-outlined text-sm transition-transform duration-500 ${isOfficeOpen ? 'rotate-180 text-primary' : ''}`}>
                  expand_more
                </span>
              </button>
              
              <AnimatePresence>
                {isOfficeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-60 bg-[#020617]/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mt-3"
                  >
                    <div className="grid grid-cols-1 gap-1">
                      {officeLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center px-4 py-3 rounded-xl hover:bg-white/5 text-white/40 hover:text-primary transition-all no-underline group"
                        >
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">{link.name}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
  
          {/* Auth & Actions - Optimized */}
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="hidden sm:flex items-center gap-4 lg:gap-8">
              {isSignedIn ? (
                <div className="flex items-center gap-6">
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-xl text-white font-black text-[10px] uppercase tracking-[0.3em] no-underline transition-all group"
                  >
                    <span className="material-symbols-outlined text-lg opacity-40 group-hover:text-primary group-hover:opacity-100 transition-all">dashboard</span>
                    Dashboard
                  </Link>
                  <div className="p-[2px] rounded-full bg-gradient-to-tr from-primary/40 to-transparent">
                    <UserButton />
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="flex items-center gap-2 text-white/40 hover:text-white font-black text-[10px] uppercase tracking-[0.3em] no-underline transition-all group"
                  >
                    <span className="material-symbols-outlined text-lg opacity-20 group-hover:opacity-100 transition-all">person</span>
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    className="relative px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.4em] text-white no-underline transition-all overflow-hidden group flex items-center gap-3"
                  >
                    <div className="absolute inset-0 bg-primary group-hover:bg-primary/90 transition-colors"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative z-10">Join</span>
                    <span className="material-symbols-outlined text-sm relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </>
              )}
            </div>
  
            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all hover:bg-white/10"
            >
              <span className="material-symbols-outlined text-xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>
  
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-[#020617]/95 backdrop-blur-3xl lg:hidden flex flex-col p-12 pt-40 overflow-y-auto"
          >
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] opacity-40">Navigation</span>
                <div className="flex flex-col gap-6">
                  {mainNavLinks.map((link, i) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-3xl font-display font-bold uppercase tracking-tighter no-underline transition-colors ${
                        pathname === link.href ? 'text-primary' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] opacity-40">Office</span>
                <div className="grid grid-cols-2 gap-4">
                  {officeLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] no-underline hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
  
            <div className="mt-auto pt-20 space-y-6">
               {!isSignedIn && (
                 <Link
                   href="/sign-up"
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.4em] no-underline transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                 >
                   Join Movement
                   <span className="material-symbols-outlined text-sm">arrow_forward</span>
                 </Link>
               )}
               <div className="flex items-center justify-between px-2">
                 <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">District 3192</span>
                   <span className="text-[8px] font-bold text-primary uppercase tracking-[0.2em] mt-1">Official Network</span>
                 </div>
                 {isSignedIn && <UserButton />}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

