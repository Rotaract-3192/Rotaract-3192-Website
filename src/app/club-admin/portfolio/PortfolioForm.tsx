'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateClub } from '@/app/actions/mutations';

interface Club {
  id: string;
  slug: string;
  name: string;
  charterDate: Date | null;
  description: string | null;
  logoUrl: string | null;
  city: string | null;
  zone: string | null;
  venue: string | null;
  meetingDayTime: string | null;
  presidentName: string | null;
  presidentPhone: string | null;
  presidentEmail: string | null;
  secretaryName: string | null;
  secretaryPhone: string | null;
  secretaryEmail: string | null;
}

export default function PortfolioForm({ club }: { club: Club }) {
  const [logoPreview, setLogoPreview] = useState(club.logoUrl || '');
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('saving');
    setErrorMessage('');
    
    try {
      const formData = new FormData(e.currentTarget);
      await updateClub(club.id, formData);
      setStatus('success');
      // Reset status to idle after 4 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err?.message || 'Failed to save changes. Please check permissions.');
    }
  };

  return (
    <div className="space-y-14 pb-24">
      {/* Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.4em] font-sans">
            Profile Customization
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white font-display uppercase tracking-tight leading-none">
          Club <span className="text-purple-400">Portfolio</span>
        </h1>
        <p className="text-white/40 text-sm font-sans">
          Configure operations, branding parameters, and officer listings visible to the public.
        </p>
      </header>

      {/* Notifications */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-5 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider font-sans"
          >
            <span className="material-symbols-outlined text-lg">check_circle</span>
            Club profile successfully synchronized and saved.
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider font-sans"
          >
            <span className="material-symbols-outlined text-lg">error</span>
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-10 max-w-5xl">
        {/* Dynamic Logo Branding & General Details */}
        <section className="glass-panel border border-purple-500/10 p-8 md:p-10 space-y-10">
          <h2 className="text-lg font-bold text-white font-display uppercase tracking-wider border-b border-purple-500/10 pb-4">
            Branding & <span className="text-purple-400">Identity</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Logo Upload Display */}
            <div className="w-full md:w-1/3 flex flex-col items-center space-y-4">
              <div 
                onClick={triggerFileSelect} 
                className="w-48 h-48 rounded-[2.5rem] bg-white/3 border border-white/10 p-4 flex items-center justify-center cursor-pointer hover:border-purple-500/40 hover:bg-purple-500/5 transition-all group overflow-hidden relative shadow-2xl"
              >
                {logoPreview ? (
                  <img src={logoPreview} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" alt="Club Logo" />
                ) : (
                  <span className="material-symbols-outlined text-4xl text-purple-400/40">image</span>
                )}
                <div className="absolute inset-0 bg-[#030c1a]/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-all duration-300">
                  <span className="material-symbols-outlined text-2xl text-purple-400">upload_file</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Upload New Logo</span>
                </div>
              </div>
              <input 
                ref={fileInputRef}
                type="file" 
                name="logoImage" 
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden" 
              />
              <p className="text-[9px] text-white/30 font-black uppercase tracking-widest font-sans text-center">
                Click image to browse. Supports PNG, JPG, or SVG.
              </p>
            </div>

            {/* General Settings Fields */}
            <div className="flex-1 w-full space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">
                  Club Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  defaultValue={club.name} 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">
                  Description / Executive Summary
                </label>
                <textarea 
                  name="description" 
                  defaultValue={club.description || ''} 
                  rows={4}
                  placeholder="Enter a compelling description of your club's vision, objectives, and identity..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans resize-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Operation Parameters */}
        <section className="glass-panel border border-purple-500/10 p-8 md:p-10 space-y-8">
          <h2 className="text-lg font-bold text-white font-display uppercase tracking-wider border-b border-purple-500/10 pb-4">
            Operation <span className="text-purple-400">Parameters</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">
                Base of Operations (Venue)
              </label>
              <input 
                type="text" 
                name="venue" 
                defaultValue={club.venue || ''} 
                placeholder="e.g. RV College Conference Hall"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">
                Meeting Day & Time
              </label>
              <input 
                type="text" 
                name="meetingDayTime" 
                defaultValue={club.meetingDayTime || ''} 
                placeholder="e.g. Saturdays, 4:00 PM"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">
                City Location
              </label>
              <input 
                type="text" 
                name="city" 
                defaultValue={club.city || ''} 
                placeholder="e.g. Bengaluru"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">
                Zone Designation
              </label>
              <input 
                type="text" 
                name="zone" 
                defaultValue={club.zone || ''} 
                placeholder="e.g. Zone 1"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" 
              />
            </div>
          </div>
        </section>

        {/* Leadership Command */}
        <section className="glass-panel border border-purple-500/10 p-8 md:p-10 space-y-10">
          <h2 className="text-lg font-bold text-white font-display uppercase tracking-wider border-b border-purple-500/10 pb-4">
            Leadership <span className="text-purple-400">Command</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* President Info */}
            <div className="space-y-6">
              <h3 className="text-xs font-black text-purple-400 uppercase tracking-[0.25em] flex items-center gap-3">
                <span className="material-symbols-outlined text-base">shield_person</span>
                President Details
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 font-sans">
                    Name
                  </label>
                  <input 
                    type="text" 
                    name="presidentName" 
                    defaultValue={club.presidentName || ''} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 font-sans">
                    Phone Number
                  </label>
                  <input 
                    type="text" 
                    name="presidentPhone" 
                    defaultValue={club.presidentPhone || ''} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 font-sans">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="presidentEmail" 
                    defaultValue={club.presidentEmail || ''} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" 
                  />
                </div>
              </div>
            </div>

            {/* Secretary Info */}
            <div className="space-y-6">
              <h3 className="text-xs font-black text-purple-400 uppercase tracking-[0.25em] flex items-center gap-3">
                <span className="material-symbols-outlined text-base">edit_document</span>
                Secretary Details
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 font-sans">
                    Name
                  </label>
                  <input 
                    type="text" 
                    name="secretaryName" 
                    defaultValue={club.secretaryName || ''} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 font-sans">
                    Phone Number
                  </label>
                  <input 
                    type="text" 
                    name="secretaryPhone" 
                    defaultValue={club.secretaryPhone || ''} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 font-sans">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="secretaryEmail" 
                    defaultValue={club.secretaryEmail || ''} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Submit Operations Block */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={status === 'saving'}
            className="flex items-center gap-3 bg-purple-600 text-white font-black uppercase tracking-[0.3em] text-[10px] px-10 py-5 rounded-xl shadow-xl shadow-purple-500/20 hover:bg-purple-500 hover:scale-[1.02] active:scale-95 disabled:opacity-40 transition-all font-sans cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">
              {status === 'saving' ? 'sync' : 'save'}
            </span>
            {status === 'saving' ? 'Synchronizing...' : 'Save Portfolio'}
          </button>
        </div>
      </form>
    </div>
  );
}
