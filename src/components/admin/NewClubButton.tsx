'use client';

import { useState, useRef } from 'react';
import SlidePanel from '@/components/SlidePanel';
import { createClub } from '@/app/actions/mutations';

export default function NewClubButton() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [logoPreview, setLogoPreview] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 bg-primary text-white font-black uppercase tracking-[0.3em] text-[10px] px-8 py-4 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all font-sans"
      >
        <span className="material-symbols-outlined text-lg">add</span>
        New Club
      </button>

      <SlidePanel
        open={open}
        onClose={() => { setOpen(false); setLogoPreview(''); }}
        title='Add New <span class="text-primary">Club</span>'
        subtitle="Establish New District Club Entry"
        icon="add_business"
        accentColor="blue"
      >
        <form
          action={async (fd: FormData) => {
            setPending(true);
            await createClub(fd);
            setPending(false);
            setOpen(false);
            setLogoPreview('');
          }}
          className="space-y-10"
        >
          {/* Club Parameters */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans border-b border-white/5 pb-3">Club Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Club Designation (Name) *</label>
                <input name="name" type="text" required placeholder="Enter club name..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Location (City) *</label>
                <input name="city" type="text" required placeholder="Enter city..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Charter Date</label>
                <input name="charterDate" type="date"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Zone</label>
                <input name="zone" type="text" placeholder="e.g. Zone 1..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Meeting Day &amp; Time</label>
                <input name="meetingDayTime" type="text" placeholder="e.g. Sundays 5:00 PM..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Meeting Venue / Location Name</label>
                <input name="venue" type="text" placeholder="e.g. Rotary House, Malleshwaram..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>

              {/* Logo Upload */}
              <div className="space-y-3 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Club Logo</label>
                <div className="flex items-start gap-6">
                  {/* Preview + Click Target */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all group overflow-hidden relative shrink-0"
                  >
                    {logoPreview ? (
                      <img src={logoPreview} className="w-full h-full object-contain" alt="Preview" />
                    ) : (
                      <span className="material-symbols-outlined text-3xl text-primary/30 group-hover:text-primary transition-colors">add_photo_alternate</span>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <span className="material-symbols-outlined text-white text-xl">upload</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="logoImage"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-white/5 border border-white/10 border-dashed rounded-xl py-3 px-5 text-[10px] font-bold text-white/40 hover:text-white hover:border-primary/40 hover:bg-primary/5 transition-all uppercase tracking-widest font-sans flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">upload_file</span>
                      {logoPreview ? 'Change Image' : 'Upload from Device'}
                    </button>
                    <p className="text-[8px] text-white/20 font-sans uppercase tracking-wider">Or paste a URL</p>
                    <input name="logoUrl" type="url" placeholder="https://example.com/logo.png..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-xs font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 font-sans" />
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Executive Summary</label>
                <textarea name="description" rows={3} placeholder="Enter club summary and background..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans resize-none" />
              </div>
            </div>
          </div>

          {/* President */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans border-b border-white/5 pb-3">President Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">President Name</label>
                <input name="presidentName" type="text" placeholder="Rtr. John Doe..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Phone</label>
                <input name="presidentPhone" type="tel" placeholder="+91 XXXXX XXXXX..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Email</label>
                <input name="presidentEmail" type="email" placeholder="president@club.com..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
            </div>
          </div>

          {/* Secretary */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans border-b border-white/5 pb-3">Secretary Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Secretary Name</label>
                <input name="secretaryName" type="text" placeholder="Rtr. Jane Smith..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Phone</label>
                <input name="secretaryPhone" type="tel" placeholder="+91 XXXXX XXXXX..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Email</label>
                <input name="secretaryEmail" type="email" placeholder="secretary@club.com..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button type="submit" disabled={pending}
              className="w-full bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-40 font-sans">
              <span className="material-symbols-outlined text-lg">add_business</span>
              {pending ? 'Initializing...' : 'Initialize Club'}
            </button>
          </div>
        </form>
      </SlidePanel>
    </>
  );
}
