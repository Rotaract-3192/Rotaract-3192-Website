'use client';

import { useState } from 'react';
import { setUserPermissions } from '@/app/actions/mutations';
import { getRoleLabel, getBinaryStr, getRoleBadgeClass } from '@/lib/permissions';

interface Club { id: string; name: string; }
interface Props {
  userId: string;
  currentBits: number;
  currentClubId: string | null;
  clubs: Club[];
}

export default function PermissionAssigner({ userId, currentBits, currentClubId, clubs }: Props) {
  const [open, setOpen] = useState(false);
  const [bits, setBits] = useState(currentBits);
  const [pending, setPending] = useState(false);

  const needsClub = bits === 2 || bits === 3;

  return (
    <div className="flex flex-col items-end gap-2">
      {/* Current badge */}
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.3em] border font-sans ${getRoleBadgeClass(currentBits)}`}>
          {getRoleLabel(currentBits)}
        </span>
        <span className="text-[9px] font-mono text-white/20">[{getBinaryStr(currentBits)}]</span>
        <button
          onClick={() => setOpen(o => !o)}
          className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-primary/60 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all flex items-center justify-center"
          title="Set permissions"
        >
          <span className="material-symbols-outlined text-sm">settings</span>
        </button>
      </div>

      {/* Inline assignment panel */}
      {open && (
        <form
          action={async (fd: FormData) => {
            setPending(true);
            await setUserPermissions(fd);
            setOpen(false);
            setPending(false);
          }}
          className="flex flex-wrap items-center gap-2 bg-[#0a1a30] border border-primary/20 rounded-xl p-3 shadow-xl w-64"
        >
          <input type="hidden" name="userId" value={userId} />

          {/* Permission level */}
          <div className="w-full space-y-1">
            <label className="text-[8px] font-black uppercase tracking-[0.3em] text-primary/50 font-sans">Permission Level</label>
            <select
              name="permissionBits"
              value={bits}
              onChange={e => setBits(parseInt(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs font-bold text-white focus:border-primary/50 outline-none font-sans"
            >
              <option value={0} className="bg-slate-900">00 — Member</option>
              <option value={1} className="bg-slate-900">01 — Master Admin</option>
              <option value={2} className="bg-slate-900">10 — Assigned Admin</option>
              <option value={3} className="bg-slate-900">11 — Club President</option>
            </select>
          </div>

          {/* Club selector — only for bits 2 or 3 */}
          {needsClub && (
            <div className="w-full space-y-1">
              <label className="text-[8px] font-black uppercase tracking-[0.3em] text-purple-400/60 font-sans">Club Assignment</label>
              <select
                name="clubId"
                defaultValue={currentClubId || ''}
                className="w-full bg-white/5 border border-purple-500/20 rounded-lg py-2 px-3 text-xs font-bold text-white focus:border-purple-500/50 outline-none font-sans"
              >
                <option value="" className="bg-slate-900">— Select Club —</option>
                {clubs.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900">{c.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="w-full flex gap-2 pt-1">
            <button
              type="submit"
              disabled={pending}
              className="flex-1 bg-primary text-white text-[9px] font-black uppercase tracking-[0.3em] py-2 rounded-lg hover:bg-primary/80 transition-all disabled:opacity-40 font-sans"
            >
              {pending ? 'Saving...' : 'Apply'}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-3 py-2 bg-white/5 border border-white/10 text-white/40 text-[9px] font-black rounded-lg hover:bg-white/10 transition-all font-sans"
            >
              ✕
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
