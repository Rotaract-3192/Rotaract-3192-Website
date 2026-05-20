"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useUser, UserButton } from "@/lib/mockAuthClient";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] flex text-white overflow-x-hidden selection:bg-[#f9a826]/20 selection:text-[#f9a826]">
      {/* Cinematic Background Elements */}
      <div className="fixed top-0 right-0 w-[1000px] h-[1000px] bg-[#f9a826]/5 rounded-full blur-[200px] -z-10 opacity-30"></div>
      <div className="fixed bottom-0 left-0 w-[800px] h-[800px] bg-[#003f8a]/5 rounded-full blur-[180px] -z-10 opacity-20"></div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-md transition-all"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Component */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Page Content */}
      <div className="flex-1 flex flex-col min-h-screen relative lg:pl-72">
        {/* Sticky Header Bar (both mobile and desktop) */}
        <header className="h-20 bg-[#091124]/80 backdrop-blur-md border-b border-white/5 flex items-center px-8 sticky top-0 z-30 justify-between">
          <div className="flex items-center gap-5">
            {/* Mobile Sidebar Menu Button */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#f9a826] bg-[#f9a826]/10 rounded-xl border border-[#f9a826]/20 transition-all hover:bg-[#f9a826]/20"
            >
              <span className="material-symbols-outlined text-xl">menu</span>
            </button>

            {/* Title for Desktop */}
            <span className="hidden lg:block text-xs font-black uppercase tracking-[0.25em] text-slate-300">
              Admin Control Panel
            </span>

            {/* Title for Mobile */}
            <span className="lg:hidden font-display font-black tracking-wider text-sm uppercase text-[#f9a826]">
              District 3192
            </span>
          </div>

          {/* Pill-shaped User Badge with Avatar */}
          <div className="flex items-center gap-3 bg-[#0f2444] border border-[#1d3d6b]/50 px-4 py-1.5 rounded-full shadow-inner transition-transform hover:scale-102">
            <span className="text-[9px] font-bold text-slate-200 uppercase tracking-wider select-none">
              {mounted && isLoaded && user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'District Admin' : 'District Admin'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f9a826] animate-pulse"></span>
            <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center border border-white/15">
              {mounted ? (
                <UserButton />
              ) : (
                <div className="w-full h-full bg-[#0a1526] animate-pulse" />
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 lg:p-12 transition-all duration-500 overflow-visible">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

