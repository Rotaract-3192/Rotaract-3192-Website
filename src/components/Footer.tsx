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
    <>
    <footer className="bg-transparent border-t border-white/5 py-40 relative overflow-hidden">
      {/* Cinematic background accents */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -z-0 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-24 pb-24 border-b border-white/5">
          
          {/* Brand Identity */}
          <div className="lg:col-span-2 space-y-12">
            <Link href="/" className="flex items-center no-underline group relative w-fit">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <img src="/assets/logo.png" alt="Rotaract District" className="h-16 w-auto object-contain relative z-10 filter brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
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
               {[
                 { name: 'About', href: '/about' },
                 { name: 'Events', href: 'https://events.rotaract3192.org/' },
                 { name: 'Clubs', href: 'https://reporting.rotaract3192.org/clubs' },
                 { name: 'Resources', href: '/resources' },
                 { name: 'Leadership', href: '/leadership' }
               ].map((item) => (
                 <Link 
                  key={item.name} 
                  href={item.href}
                  className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-all no-underline font-sans flex items-center gap-3 group"
                 >
                   <div className="w-1 h-1 rounded-full bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   {item.name}
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

      {/* Floating WhatsApp Button – visible on all pages */}
      <a
        href="http://wa.me/+919148733192"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-8 right-8 z-[200] flex items-center justify-center w-16 h-16 rounded-full shadow-2xl shadow-green-500/40 bg-[#25D366] hover:bg-[#1ebe5d] transition-all duration-300 hover:scale-110 group"
      >
        {/* WhatsApp SVG Icon */}
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.002 3C9.374 3 4 8.374 4 15.002c0 2.184.594 4.33 1.721 6.205L4 29l8.025-1.702A12.923 12.923 0 0 0 16.002 28C22.63 28 28 22.626 28 16.002 28 9.374 22.63 3 16.002 3zm0 23.586a10.568 10.568 0 0 1-5.39-1.474l-.387-.23-4.764 1.01 1.029-4.636-.25-.4A10.543 10.543 0 0 1 4.93 15.002C4.93 8.89 9.89 3.93 16.002 3.93c6.112 0 11.07 4.96 11.07 11.072 0 6.112-4.958 11.584-11.07 11.584zm6.07-8.576c-.333-.166-1.97-.972-2.274-1.083-.305-.111-.527-.166-.749.166-.222.333-.86 1.083-1.054 1.305-.194.222-.388.25-.722.083-.333-.166-1.408-.519-2.68-1.654-.99-.883-1.659-1.973-1.853-2.306-.194-.333-.02-.513.146-.679.15-.15.333-.388.5-.582.166-.194.222-.333.333-.555.111-.222.055-.416-.028-.582-.083-.166-.749-1.804-1.026-2.47-.27-.648-.545-.56-.749-.57-.194-.009-.416-.011-.638-.011-.222 0-.582.083-.888.416-.305.333-1.165 1.138-1.165 2.776 0 1.638 1.193 3.22 1.36 3.442.166.222 2.348 3.582 5.689 5.025.795.344 1.416.549 1.9.702.799.254 1.527.218 2.102.132.641-.096 1.97-.805 2.248-1.583.278-.777.278-1.443.194-1.583-.083-.138-.305-.222-.638-.388z"/>
        </svg>
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"></span>
      </a>
    </>
  );
}
