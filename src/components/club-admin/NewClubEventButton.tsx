'use client';

import { useState } from 'react';
import SlidePanel from '@/components/SlidePanel';
import { createEvent } from '@/app/actions/mutations';

export default function NewClubEventButton({ clubId }: { clubId: string | null }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-3 bg-purple-600 text-white font-black uppercase tracking-[0.3em] text-[10px] px-8 py-4 rounded-xl shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all font-sans">
        <span className="material-symbols-outlined text-lg">add_circle</span>
        New Event
      </button>

      <SlidePanel open={open} onClose={() => setOpen(false)}
        title='Create Club <span class="text-purple-400">Event</span>'
        subtitle="Publish event for your club"
        icon="event" accentColor="purple">
        <form action={async (fd: FormData) => { setPending(true); await createEvent(fd); setPending(false); setOpen(false); }}
          className="space-y-8">
          {clubId && <input type="hidden" name="clubId" value={clubId} />}
          <input type="hidden" name="status" value="upcoming" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Event Title *</label>
              <input name="title" type="text" required placeholder="Enter event name..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Date &amp; Time *</label>
              <input name="eventDate" type="datetime-local" required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none font-sans" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Location</label>
              <input name="location" type="text" placeholder="Venue..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Category</label>
              <select name="category" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none font-sans">
                <option value="" className="bg-slate-900">Select category</option>
                <option value="service" className="bg-slate-900">Community Service</option>
                <option value="professional" className="bg-slate-900">Professional Development</option>
                <option value="fellowship" className="bg-slate-900">Fellowship</option>
                <option value="fundraising" className="bg-slate-900">Fundraising</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Entry Type</label>
              <select name="entryType" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none font-sans">
                <option value="free" className="bg-slate-900">Free</option>
                <option value="paid" className="bg-slate-900">Paid</option>
                <option value="invite" className="bg-slate-900">Invite Only</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Description</label>
              <textarea name="description" rows={4} placeholder="Describe the event..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans resize-none" />
            </div>
          </div>
          <button type="submit" disabled={pending}
            className="w-full bg-purple-600 text-white font-black uppercase tracking-[0.4em] text-[11px] py-5 rounded-xl hover:bg-purple-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-40 font-sans">
            <span className="material-symbols-outlined text-lg">add_circle</span>
            {pending ? 'Publishing...' : 'Publish Event'}
          </button>
        </form>
      </SlidePanel>
    </>
  );
}
