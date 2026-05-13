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
    <div className="min-h-screen bg-surface flex text-on-surface overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Background Cinematic Accents */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] -z-10"></div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-all"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Persistent on desktop, drawer on mobile */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden h-20 bg-surface/80 backdrop-blur-2xl border-b border-outline-variant/30 flex items-center px-8 sticky top-0 z-30 justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-12 h-12 flex items-center justify-center text-primary bg-primary/5 rounded-2xl border border-primary/10 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <span className="font-display font-black tracking-tighter text-xl uppercase italic">Terminal</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/30 overflow-hidden">
             {/* Placeholder for small avatar if needed */}
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 lg:p-16 lg:ml-72 transition-all duration-500 overflow-visible">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
