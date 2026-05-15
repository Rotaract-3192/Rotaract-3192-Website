"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] flex text-white overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Cinematic Background Elements */}
      <div className="fixed top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[200px] -z-10 opacity-30"></div>
      <div className="fixed bottom-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] -z-10 opacity-20"></div>

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
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* Mobile Header Bar */}
        <header className="lg:hidden h-20 bg-surface/50 backdrop-blur-3xl border-b border-white/5 flex items-center px-8 sticky top-0 z-30 justify-between">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-12 h-12 flex items-center justify-center text-primary bg-primary/10 rounded-xl border border-primary/20 transition-all hover:bg-primary/20"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <span className="font-display font-bold tracking-tight text-xl uppercase text-white">District <span className="text-primary">Admin</span></span>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 overflow-hidden shadow-inner">
             {/* Profile placeholder */}
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 lg:p-16 lg:ml-72 transition-all duration-500 overflow-visible">
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
