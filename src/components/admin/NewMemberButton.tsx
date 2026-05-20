'use client';

import { useState } from 'react';
import SlidePanel from '@/components/SlidePanel';
import { createMember } from '@/app/actions/mutations';

interface Club { id: string; name: string; }
export default function NewMemberButton({ clubs }: { clubs: Club[] }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-3 bg-primary text-white font-black uppercase tracking-[0.3em] text-[10px] px-8 py-4 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all font-sans">
        <span className="material-symbols-outlined text-lg">person_add</span>
        New Member
      </button>

      <SlidePanel open={open} onClose={() => setOpen(false)}
        title='Authorize New <span class="text-primary">Member</span>'
        subtitle="Manual member registration protocol"
        icon="person_add" accentColor="blue">
        <form action={async (fd: FormData) => { setPending(true); await createMember(fd); setPending(false); setOpen(false); }}
          className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans border-b border-white/5 pb-3">Member Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Email Address *</label>
                <input name="email" type="email" required placeholder="member@rotaract3192.org"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">First Name *</label>
                <input name="firstName" type="text" required placeholder="Enter first name..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Last Name</label>
                <input name="lastName" type="text" placeholder="Enter last name..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Club Affiliation</label>
                <select name="clubId"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none appearance-none uppercase tracking-widest cursor-pointer font-sans">
                  <option value="" className="bg-slate-900">District 3192 (Universal)</option>
                  {clubs.map(c => <option key={c.id} value={c.id} className="bg-slate-900">{c.name}</option>)}
                </select>
              </div>
            </div>
          </div>
          <button type="submit" disabled={pending}
            className="w-full bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-40 font-sans">
            <span className="material-symbols-outlined text-lg">verified_user</span>
            {pending ? 'Authorizing...' : 'Authorize Member'}
          </button>
        </form>
      </SlidePanel>
    </>
  );
}
