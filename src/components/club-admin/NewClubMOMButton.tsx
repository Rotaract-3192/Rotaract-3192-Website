'use client';

import { useState } from 'react';
import SlidePanel from '@/components/SlidePanel';
import { createMOM } from '@/app/actions/mutations';

export default function NewClubMOMButton({ clubId }: { clubId: string | null }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-3 bg-purple-600 text-white font-black uppercase tracking-[0.3em] text-[10px] px-8 py-4 rounded-xl shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all font-sans">
        <span className="material-symbols-outlined text-lg">note_add</span>
        Archive Minutes
      </button>

      <SlidePanel open={open} onClose={() => setOpen(false)}
        title='Archive Meeting <span class="text-purple-400">Minutes</span>'
        subtitle="Record club meeting proceedings"
        icon="description" accentColor="purple">
        <form action={async (fd: FormData) => { setPending(true); await createMOM(fd); setPending(false); setOpen(false); }}
          className="space-y-8">
          {clubId && <input type="hidden" name="clubId" value={clubId} />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Meeting Title *</label>
              <input name="title" type="text" required placeholder="e.g. Weekly Club Meeting"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Meeting Date *</label>
              <input name="meetingDate" type="date" required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none font-sans" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Document URL</label>
              <input name="fileUrl" type="url" placeholder="https://drive.google.com/..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
            </div>
          </div>
          <button type="submit" disabled={pending}
            className="w-full bg-purple-600 text-white font-black uppercase tracking-[0.4em] text-[11px] py-5 rounded-xl hover:bg-purple-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-40 font-sans">
            <span className="material-symbols-outlined text-lg">save</span>
            {pending ? 'Archiving...' : 'Save Minutes'}
          </button>
        </form>
      </SlidePanel>
    </>
  );
}
