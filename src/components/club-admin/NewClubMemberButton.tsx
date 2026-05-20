'use client';

import { useState } from 'react';
import SlidePanel from '@/components/SlidePanel';
import { createMember } from '@/app/actions/mutations';

export default function NewClubMemberButton({ clubId }: { clubId: string | null }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-3 bg-purple-600 text-white font-black uppercase tracking-[0.3em] text-[10px] px-8 py-4 rounded-xl shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all font-sans">
        <span className="material-symbols-outlined text-lg">person_add</span>
        Add Member
      </button>

      <SlidePanel open={open} onClose={() => setOpen(false)}
        title='Add Club <span class="text-purple-400">Member</span>'
        subtitle="Register member to your club"
        icon="person_add" accentColor="purple">
        <form action={async (fd: FormData) => { setPending(true); await createMember(fd); setPending(false); setOpen(false); }}
          className="space-y-8">
          {clubId && <input type="hidden" name="clubId" value={clubId} />}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Email Address *</label>
                <input name="email" type="email" required placeholder="member@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">First Name *</label>
                <input name="firstName" type="text" required placeholder="First name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Last Name</label>
                <input name="lastName" type="text" placeholder="Last name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
              </div>
            </div>
          </div>
          <button type="submit" disabled={pending}
            className="w-full bg-purple-600 text-white font-black uppercase tracking-[0.4em] text-[11px] py-5 rounded-xl hover:bg-purple-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-40 font-sans">
            <span className="material-symbols-outlined text-lg">person_add</span>
            {pending ? 'Adding...' : 'Add to Club'}
          </button>
        </form>
      </SlidePanel>
    </>
  );
}
