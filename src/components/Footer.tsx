"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com", icon: "photo_camera" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "link" },
    { label: "YouTube", href: "https://youtube.com", icon: "smart_display" },
    { label: "Mail", href: "mailto:info@district3192.org", icon: "mail" },
  ];

  return (
    <footer className="bg-transparent border-t border-white/5 py-40 relative overflow-hidden">
      {/* Cinematic background accents */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -z-0 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-24 pb-24 border-b border-white/5">
          
          {/* Brand Identity */}
          <div className="lg:col-span-2 space-y-12">
            <Link href="/" className="flex items-center gap-5 no-underline group relative w-fit">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 group-hover:border-primary/40 flex items-center justify-center transition-all duration-500">
                <svg viewBox="0 0 100 100" className="w-9 h-9 text-primary/60 group-hover:text-primary transition-colors animate-spin-slow">
                   <path fill="currentColor" d="M50,15.5c-19,0-34.5,15.5-34.5,34.5S31,84.5,50,84.5S84.5,69,84.5,50S69,15.5,50,15.5z M50,78.5c-15.7,0-28.5-12.8-28.5-28.5 S34.3,21.5,50,21.5S78.5,34.3,78.5,50S65.7,78.5,50,78.5z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-[0.4em] text-white uppercase leading-none">
                  Rotaract
                </span>
                <span className="text-[11px] font-bold tracking-[0.2em] text-primary/40 uppercase mt-1">
                  District 3192
                </span>
              </div>
            </Link>
            <p className="text-white/30 text-[13px] font-medium leading-[2] max-w-sm font-sans tracking-wide">
              Empowering a global network of young leaders to create sustainable impact through strategic leadership and fellowship.
            </p>
            <div className="flex items-center gap-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 no-underline"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-primary group-hover:border-primary/40 transition-all duration-500">
                    <span className="material-symbols-outlined text-lg">{s.icon}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-12">
            <h4 className="text-[10px] font-black text-primary/60 uppercase tracking-[0.5em] font-display">District Nodes</h4>
            <div className="flex flex-col gap-6">
               {['About', 'Events', 'Clubs', 'Resources', 'Leadership'].map((item) => (
                 <Link 
                  key={item} 
                  href={`/${item.toLowerCase()}`}
                  className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-all no-underline font-sans flex items-center gap-3 group"
                 >
                   <div className="w-1 h-1 rounded-full bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   {item}
                 </Link>
               ))}
            </div>
          </div>

          {/* Support Hub */}
          <div className="space-y-12">
            <h4 className="text-[10px] font-black text-primary/60 uppercase tracking-[0.5em] font-display">Support</h4>
            <div className="flex flex-col gap-6">
               <a href="mailto:support@district3192.org" className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-all no-underline font-sans">Help Desk</a>
               <a href="#" className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-all no-underline font-sans">Contact Portal</a>
               <a href="#" className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-all no-underline font-sans">Brand Kit</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[9px] font-black text-white/10 uppercase tracking-[0.4em] hover:text-white/40 transition-colors no-underline font-sans"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="text-[9px] font-black text-white/10 uppercase tracking-[0.6em] font-display">
            © {currentYear} District 3192 <span className="text-primary/20">•</span> Strategic Movement
          </div>
        </div>
      </div>
    </footer>
  );
}
