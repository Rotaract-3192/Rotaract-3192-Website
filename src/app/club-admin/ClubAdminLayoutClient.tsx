'use client';

import { useState, useEffect } from 'react';
import ClubAdminSidebar from './ClubAdminSidebar';
import { motion } from 'framer-motion';

export default function ClubAdminLayoutClient({
  clubName,
  children
}: {
  clubName: string;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#030c1a] flex text-white overflow-x-hidden">
      {/* Ambient glows — purple for club portal */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[180px] -z-10 opacity-40 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-violet-800/5 rounded-full blur-[150px] -z-10 opacity-20 pointer-events-none" />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      <ClubAdminSidebar clubName={clubName} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen lg:pl-72">
        {/* Header */}
        <header className="h-20 bg-[#050f1e]/80 backdrop-blur-md border-b border-purple-500/10 flex items-center px-8 sticky top-0 z-30 justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-purple-400 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-all"
            >
              <span className="material-symbols-outlined text-xl">menu</span>
            </button>
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-purple-300/60 font-sans">
                Club Administration Portal
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-purple-500/5 border border-purple-500/15 px-4 py-2 rounded-full">
            <span className="text-[9px] font-black text-purple-300/60 uppercase tracking-[0.3em] font-sans">Club Admin</span>
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-visible">
          {mounted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          ) : (
            <div className="max-w-7xl mx-auto">{children}</div>
          )}
        </main>
      </div>
    </div>
  );
}
