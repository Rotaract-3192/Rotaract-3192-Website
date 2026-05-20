'use client';

import { useState } from 'react';
import SlidePanel from '@/components/SlidePanel';
import { awardPoints } from '@/app/actions/mutations';

interface Member { id: string; firstName: string | null; lastName: string | null; email: string; points: number | null; }

const CATEGORIES = [
  { value: 'service',      label: 'Community Service',       icon: 'volunteer_activism', color: 'text-green-400' },
  { value: 'professional', label: 'Professional Development', icon: 'work',              color: 'text-blue-400'  },
  { value: 'fellowship',   label: 'Fellowship',               icon: 'celebration',       color: 'text-pink-400'  },
  { value: 'leadership',   label: 'Leadership',               icon: 'military_tech',     color: 'text-yellow-400'},
  { value: 'attendance',   label: 'Attendance',               icon: 'how_to_reg',        color: 'text-purple-400'},
];

export default function AwardPointsPanel({ members }: { members: Member[] }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [selectedMember, setSelectedMember] = useState('');
  const [success, setSuccess] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = members.filter(m =>
    `${m.firstName} ${m.lastName} ${m.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-3 bg-yellow-500 text-slate-900 font-black uppercase tracking-[0.3em] text-[10px] px-8 py-4 rounded-xl shadow-xl shadow-yellow-500/20 hover:scale-105 active:scale-95 transition-all font-sans">
        <span className="material-symbols-outlined text-lg">military_tech</span>
        Award Points
      </button>

      <SlidePanel open={open} onClose={() => { setOpen(false); setSuccess(false); }}
        title='Award <span class="text-yellow-400">Points</span>'
        subtitle="Recognize member contributions"
        icon="military_tech" accentColor="blue">

        {success ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-green-400">check_circle</span>
            </div>
            <p className="text-xl font-bold text-white font-display uppercase">Points Awarded!</p>
            <button onClick={() => { setSuccess(false); setSelectedMember(''); }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-primary border border-primary/20 bg-primary/5 px-8 py-3 rounded-xl hover:bg-primary hover:text-white transition-all font-sans">
              Award Again
            </button>
          </div>
        ) : (
          <form action={async (fd: FormData) => {
            setPending(true);
            await awardPoints(fd);
            setPending(false);
            setSuccess(true);
          }} className="space-y-8">

            {/* Member Search */}
            <div className="space-y-4">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Select Member *</label>
              <input type="text" placeholder="Search by name or email..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm text-white focus:border-primary/50 outline-none placeholder:text-white/20 font-sans" />
              <div className="max-h-52 overflow-y-auto space-y-1 rounded-xl border border-white/5 bg-white/3">
                {filtered.map(m => (
                  <button key={m.id} type="button"
                    onClick={() => { setSelectedMember(m.id); setSearch(`${m.firstName} ${m.lastName}`); }}
                    className={`w-full text-left px-5 py-3 flex items-center gap-4 transition-all hover:bg-white/5 ${selectedMember === m.id ? 'bg-primary/10 border-l-2 border-primary' : ''}`}>
                    <img src={`https://ui-avatars.com/api/?name=${m.firstName}+${m.lastName}&background=random&size=40`}
                      className="w-8 h-8 rounded-lg object-cover" alt="" />
                    <div>
                      <p className="text-sm font-bold text-white font-sans">{m.firstName} {m.lastName}</p>
                      <p className="text-[10px] text-white/30 font-sans">{m.points ?? 0} pts · {m.email}</p>
                    </div>
                    {selectedMember === m.id && <span className="material-symbols-outlined text-primary ml-auto">check_circle</span>}
                  </button>
                ))}
              </div>
              <input type="hidden" name="userId" value={selectedMember} />
            </div>

            {/* Category */}
            <div className="space-y-4">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Category *</label>
              <div className="grid grid-cols-1 gap-2">
                {CATEGORIES.map(cat => (
                  <label key={cat.value}
                    className="flex items-center gap-4 px-5 py-3 rounded-xl border border-white/5 bg-white/3 cursor-pointer hover:bg-white/5 has-[:checked]:border-primary/30 has-[:checked]:bg-primary/5 transition-all">
                    <input type="radio" name="category" value={cat.value} className="accent-primary" />
                    <span className={`material-symbols-outlined text-lg ${cat.color}`}>{cat.icon}</span>
                    <span className="text-sm font-bold text-white font-sans">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Points + Reason */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Points *</label>
                <input name="points" type="number" min={1} max={500} required placeholder="e.g. 50"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-lg font-black text-yellow-400 focus:border-yellow-500/50 outline-none placeholder:text-white/20 font-sans" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Reason *</label>
                <input name="reason" type="text" required placeholder="e.g. Led community blood drive..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 font-sans" />
              </div>
            </div>

            <button type="submit" disabled={pending || !selectedMember}
              className="w-full bg-yellow-500 text-slate-900 font-black uppercase tracking-[0.4em] text-[11px] py-5 rounded-xl shadow-xl shadow-yellow-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-40 font-sans">
              <span className="material-symbols-outlined text-lg">military_tech</span>
              {pending ? 'Awarding...' : 'Award Points'}
            </button>
          </form>
        )}
      </SlidePanel>
    </>
  );
}
