'use client';

import { useState } from 'react';
import { deleteClub, updateClub } from '@/app/actions/mutations';
import NewClubButton from '@/components/admin/NewClubButton';
import SlidePanel from '@/components/SlidePanel';

export default function AdminClubsClient({ clubs }: { clubs: any[] }) {
  const [editingClub, setEditingClub] = useState<any | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Organization Control</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            Club <span className="text-primary">Registry</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Management system for all district club chapters.
          </p>
        </div>
        <NewClubButton />
      </header>

      {/* Clubs Table */}
      <section className="glass-panel overflow-hidden">
        <div className="px-10 py-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-display">Active <span className="text-primary">Chapters</span></h2>
            <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.4em] opacity-40 mt-2 font-sans">District network monitoring</p>
          </div>
          <div className="text-[10px] font-bold text-primary bg-primary/5 px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-primary/10 font-sans">{clubs.length} Chapters Active</div>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5">
                <th className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 font-sans">Club Identity</th>
                <th className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 text-center font-sans">Chartered</th>
                <th className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 text-center font-sans">Zone</th>
                <th className="py-6 px-10 text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] opacity-40 text-right font-sans">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clubs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-40 text-center text-[10px] font-bold text-text-muted/20 uppercase tracking-[0.5em] font-sans">
                    No active chapters — click &quot;New Club&quot; to add one
                  </td>
                </tr>
              ) : clubs.map((club: any, idx: number) => (
                <tr key={idx} className="hover:bg-white/5 transition-all group cursor-pointer border-l-4 border-transparent hover:border-primary">
                  <td className="py-8 px-10">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl transition-transform group-hover:scale-110 overflow-hidden bg-primary">
                        {club.logoUrl ? <img src={club.logoUrl} alt="" className="w-full h-full object-cover" /> : club.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white tracking-tight uppercase leading-none font-display group-hover:text-primary transition-colors">{club.name}</p>
                        <p className="text-[9px] text-text-muted mt-2 font-bold uppercase tracking-[0.2em] opacity-40 font-sans">
                          {club.city ? `${club.city} • ${club.zone || 'District Wide'}` : 'PROTOCOL: DISTRICT 3192'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-8 px-10 text-center text-sm font-bold text-white uppercase tracking-tighter font-sans">
                    {club.charterDate ? new Date(club.charterDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'PENDING'}
                  </td>
                  <td className="py-8 px-10 text-center">
                    <span className="text-[9px] font-bold text-primary bg-primary/5 px-5 py-1.5 rounded-full uppercase tracking-[0.2em] border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all font-sans">
                      {club.zone || 'General'}
                    </span>
                  </td>
                  <td className="py-8 px-10 text-right">
                    <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0">
                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => setEditingClub(club)}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-primary/50 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-xl flex items-center justify-center"
                        title="Edit Club"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      {/* View public page */}
                      <a
                        href={`/clubs/${club.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/30 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all shadow-xl flex items-center justify-center"
                        title="View Public Profile"
                      >
                        <span className="material-symbols-outlined text-lg">open_in_new</span>
                      </a>
                      {/* Delete */}
                      <form action={deleteClub.bind(null, club.id)}>
                        <button type="submit" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-xl flex items-center justify-center" title="Delete Club">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Edit Club SlidePanel */}
      <SlidePanel
        open={!!editingClub}
        onClose={() => setEditingClub(null)}
        title={editingClub ? `Edit <span class="text-primary">${editingClub.name}</span>` : ''}
        subtitle="Update club profile, leadership, and operational details"
        icon="edit"
        accentColor="blue"
      >
        {editingClub && (
          <form
            action={async (fd: FormData) => {
              setPending(true);
              try {
                await updateClub(editingClub.id, fd);
                setEditingClub(null);
              } finally {
                setPending(false);
              }
            }}
            className="space-y-8"
          >
            {/* Hidden slug for path revalidation */}
            <input type="hidden" name="slug" value={editingClub.slug} />

            {/* Basic Info */}
            <div className="space-y-2">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Club Identity</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 font-sans">Club Name *</label>
                  <input name="name" required defaultValue={editingClub.name}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans" />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 font-sans">City</label>
                  <input name="city" defaultValue={editingClub.city || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans" />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 font-sans">Zone</label>
                  <input name="zone" defaultValue={editingClub.zone || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans" />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 font-sans">Venue / Base</label>
                  <input name="venue" defaultValue={editingClub.venue || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans" />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 font-sans">Meeting Day & Time</label>
                  <input name="meetingDayTime" defaultValue={editingClub.meetingDayTime || ''}
                    placeholder="e.g. Every Tuesday, 6:30 PM"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 font-sans" />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 font-sans">Charter Date</label>
                  <input name="charterDate" type="date"
                    defaultValue={editingClub.charterDate ? new Date(editingClub.charterDate).toISOString().split('T')[0] : ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 font-sans">Logo — Upload Image</label>
                  <input name="logoImage" type="file" accept="image/*"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans cursor-pointer" />
                  <p className="text-[8px] text-white/20 font-sans pl-1">Or paste a URL below</p>
                  <input name="logoUrl" type="url" defaultValue={editingClub.logoUrl || ''}
                    placeholder="https://..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 font-sans" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 font-sans">Description</label>
                  <textarea name="description" rows={3} defaultValue={editingClub.description || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans resize-none" />
                </div>
              </div>
            </div>

            {/* President */}
            <div className="space-y-2 border-t border-white/5 pt-6">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">President</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 font-sans">Name</label>
                  <input name="presidentName" defaultValue={editingClub.presidentName || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans" />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 font-sans">Phone</label>
                  <input name="presidentPhone" defaultValue={editingClub.presidentPhone || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans" />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 font-sans">Email</label>
                  <input name="presidentEmail" type="email" defaultValue={editingClub.presidentEmail || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans" />
                </div>
              </div>
            </div>

            {/* Secretary */}
            <div className="space-y-2 border-t border-white/5 pt-6">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Secretary</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 font-sans">Name</label>
                  <input name="secretaryName" defaultValue={editingClub.secretaryName || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans" />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 font-sans">Phone</label>
                  <input name="secretaryPhone" defaultValue={editingClub.secretaryPhone || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans" />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 font-sans">Email</label>
                  <input name="secretaryEmail" type="email" defaultValue={editingClub.secretaryEmail || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] py-5 rounded-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-40 font-sans cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">save</span>
              {pending ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}
      </SlidePanel>
    </div>
  );
}
