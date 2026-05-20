'use client';

import { useState } from 'react';
import SlidePanel from '@/components/SlidePanel';
import { createEvent } from '@/app/actions/mutations';

interface Club { id: string; name: string; }
export default function NewEventButton({ clubs }: { clubs: Club[] }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-3 bg-primary text-white font-black uppercase tracking-[0.3em] text-[10px] px-8 py-4 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all font-sans">
        <span className="material-symbols-outlined text-lg">add</span>
        New Event
      </button>

      <SlidePanel open={open} onClose={() => setOpen(false)}
        title='Create New <span class="text-primary">Event</span>'
        subtitle="Deploy district event to network"
        icon="event" accentColor="blue">
        <form action={async (fd: FormData) => { setPending(true); await createEvent(fd); setPending(false); setOpen(false); }}
          className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans border-b border-white/5 pb-3">Event Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Event Title *</label>
                <input name="title" type="text" required placeholder="Enter event title..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Date &amp; Time *</label>
                <input name="eventDate" type="datetime-local" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Location</label>
                <input name="location" type="text" placeholder="Venue / Platform..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Category</label>
                <select name="category"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans">
                  <option value="" className="bg-slate-900">Select category</option>
                  <option value="service" className="bg-slate-900">Community Service</option>
                  <option value="professional" className="bg-slate-900">Professional Development</option>
                  <option value="fellowship" className="bg-slate-900">Fellowship</option>
                  <option value="fundraising" className="bg-slate-900">Fundraising</option>
                  <option value="sports" className="bg-slate-900">Sports &amp; Recreation</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Entry Type</label>
                <select name="entryType"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans">
                  <option value="free" className="bg-slate-900">Free</option>
                  <option value="paid" className="bg-slate-900">Paid</option>
                  <option value="invite" className="bg-slate-900">Invite Only</option>
                </select>
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
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Description</label>
                <textarea name="description" rows={4} placeholder="Describe the event..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans resize-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">RSVP Link</label>
                <input name="rsvpLink" type="url" placeholder="https://..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Cover Image URL</label>
                <input name="imageUrl" type="url" placeholder="https://..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
            </div>
          </div>
          <button type="submit" disabled={pending}
            className="w-full bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-40 font-sans">
            <span className="material-symbols-outlined text-lg">rocket_launch</span>
            {pending ? 'Deploying...' : 'Deploy Event'}
          </button>
        </form>
      </SlidePanel>
    </>
  );
}
