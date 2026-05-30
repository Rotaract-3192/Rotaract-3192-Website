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
            <Link href="/" className="flex items-center no-underline group relative w-fit">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <img src="/assets/logo.png" alt="Rotaract District" className="h-16 w-auto object-contain relative z-10 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
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
