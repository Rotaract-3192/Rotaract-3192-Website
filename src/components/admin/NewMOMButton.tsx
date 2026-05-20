'use client';

import { useState } from 'react';
import SlidePanel from '@/components/SlidePanel';
import { createMOM } from '@/app/actions/mutations';

interface Club { id: string; name: string; }
export default function NewMOMButton({ clubs }: { clubs: Club[] }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-3 bg-primary text-white font-black uppercase tracking-[0.3em] text-[10px] px-8 py-4 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all font-sans">
        <span className="material-symbols-outlined text-lg">note_add</span>
        New Minutes
      </button>

      <SlidePanel open={open} onClose={() => setOpen(false)}
        title='Archive Meeting <span class="text-primary">Minutes</span>'
        subtitle="Record district meeting proceedings"
        icon="description" accentColor="blue">
        <form action={async (fd: FormData) => { setPending(true); await createMOM(fd); setPending(false); setOpen(false); }}
          className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans border-b border-white/5 pb-3">Minutes Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Meeting Title *</label>
                <input name="title" type="text" required placeholder="e.g. District Board Meeting..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Meeting Date *</label>
                <input name="meetingDate" type="date" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Club</label>
                <select name="clubId"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans">
                  <option value="" className="bg-slate-900">District-wide</option>
                  {clubs.map(c => <option key={c.id} value={c.id} className="bg-slate-900">{c.name}</option>)}
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Document URL (Google Drive / PDF)</label>
                <input name="fileUrl" type="url" placeholder="https://drive.google.com/..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
            </div>
          </div>
          <button type="submit" disabled={pending}
            className="w-full bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-40 font-sans">
            <span className="material-symbols-outlined text-lg">save</span>
            {pending ? 'Archiving...' : 'Archive Minutes'}
          </button>
        </form>
      </SlidePanel>
    </>
  );
}
