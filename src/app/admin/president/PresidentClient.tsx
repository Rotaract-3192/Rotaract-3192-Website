'use client';

import { useState } from 'react';
import { createPastLeader, updatePastLeader, deletePastLeader } from '@/app/actions/mutations';

interface PastLeader {
  id: string;
  name: string;
  role: string;
  year: string;
  avatarUrl: string | null;
  themeName: string | null;
  citation: string | null;
}

interface PresidentClientProps {
  initialLeaders: PastLeader[];
}

export default function PresidentClient({ initialLeaders }: PresidentClientProps) {
  const [leaders, setLeaders] = useState<PastLeader[]>(initialLeaders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('District Rotaract Representative');
  const [year, setYear] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [themeName, setThemeName] = useState('');
  const [citation, setCitation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openAddModal = () => {
    setEditingId(null);
    setName('');
    setRole('District Rotaract Representative');
    setYear('');
    setAvatarUrl('');
    setThemeName('');
    setCitation('');
    setIsModalOpen(true);
  };

  const openEditModal = (leader: PastLeader) => {
    setEditingId(leader.id);
    setName(leader.name);
    setRole(leader.role);
    setYear(leader.year);
    setAvatarUrl(leader.avatarUrl || '');
    setThemeName(leader.themeName || '');
    setCitation(leader.citation || '');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !year) return;
    setIsSubmitting(true);

    try {
      const data = {
        name,
        role,
        year,
        avatarUrl: avatarUrl || null,
        themeName: themeName || null,
        citation: citation || null,
      };

      if (editingId) {
        await updatePastLeader(editingId, data);
        setLeaders(prev => prev.map(l => l.id === editingId ? { ...l, ...data } : l));
      } else {
        const res = await createPastLeader(data);
        if (res.success && res.id) {
          setLeaders(prev => [{ id: res.id!, ...data }, ...prev].sort((a, b) => b.year.localeCompare(a.year)));
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Operation failed:', error);
      alert('Failed to save leader info. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this past leader from the Hall of Honor?')) return;
    try {
      await deletePastLeader(id);
      setLeaders(prev => prev.filter(l => l.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete past leader. Please try again.');
    }
  };

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">District History</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            Hall of <span className="text-primary">Honor</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Manage timeline and profiles of Past DRRs & Leaders.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-primary text-white font-bold text-[10px] uppercase tracking-[0.3em] px-10 py-5 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group font-sans"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Add Leader
        </button>
      </header>

      {/* Grid of Leaders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leaders.map(leader => (
          <div key={leader.id} className="glass-panel p-8 relative overflow-hidden group flex flex-col justify-between h-[380px] hover:border-primary/50 transition-all duration-350">
            {/* Visual background accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="space-y-6">
              {/* Leader Header Card */}
              <div className="flex gap-6 items-center border-b border-white/5 pb-5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative shrink-0">
                  <img
                    src={leader.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=003F8A&color=fff`}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="text-xs font-bold uppercase text-primary tracking-widest">{leader.year}</span>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight font-display truncate leading-tight group-hover:text-primary transition-colors">{leader.name}</h3>
                  <p className="text-[10px] text-text-muted/60 uppercase tracking-wider font-semibold font-sans truncate">{leader.role}</p>
                </div>
              </div>

              {/* Leader Meta & Bio */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[140px] pr-2 scrollbar-thin scrollbar-thumb-white/5">
                {leader.themeName && (
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#f9a826] uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 w-fit font-sans">
                    <span className="material-symbols-outlined text-xs">local_activity</span>
                    Theme: {leader.themeName}
                  </div>
                )}
                {leader.citation ? (
                  <p className="text-xs text-text-muted opacity-80 leading-relaxed font-sans mt-2">{leader.citation}</p>
                ) : (
                  <p className="text-xs text-text-muted opacity-40 italic leading-relaxed font-sans mt-2">No citation provided.</p>
                )}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex gap-4 pt-5 border-t border-white/5 mt-auto relative z-10 shrink-0">
              <button
                onClick={() => openEditModal(leader)}
                className="flex-1 py-3 bg-white/5 hover:bg-primary/20 text-white rounded-lg font-bold text-[9px] uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center gap-2 font-sans"
              >
                <span className="material-symbols-outlined text-xs">edit</span>
                Edit
              </button>
              <button
                onClick={() => handleDelete(leader.id)}
                className="py-3 px-5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-lg transition-all flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>
          </div>
        ))}

        {leaders.length === 0 && (
          <div className="col-span-full glass-panel py-32 text-center text-text-muted opacity-40 text-xs font-bold uppercase tracking-[0.4em] font-sans">
            No leaders in the Hall of Honor yet. Click 'Add Leader' to get started.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>

          {/* Modal Container */}
          <div className="glass-panel w-full max-w-2xl p-10 lg:p-12 relative z-10 overflow-y-auto max-h-[90vh] border border-white/15 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-6 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <span className="material-symbols-outlined text-2.5xl">military_tech</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold font-display uppercase tracking-tight leading-none text-white">
                  {editingId ? 'Edit Past Leader' : 'Add Past Leader'}
                </h2>
                <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.3em] opacity-40 mt-2.5 font-sans">
                  {editingId ? 'Modify leader credentials and bio' : 'Log new leader historical entry'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary ml-2">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rtr. John Doe"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 tracking-wider"
                  />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary ml-2">Role</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. District Rotaract Representative"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 tracking-wider"
                  />
                </div>

                {/* Year */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary ml-2">Year / Tenure</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2024-25"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 tracking-wider"
                  />
                </div>

                {/* Rotary Theme */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary ml-2">Rotary Theme Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Magic of Rotary"
                    value={themeName}
                    onChange={e => setThemeName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 tracking-wider"
                  />
                </div>

                {/* Avatar URL */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary ml-2">Avatar / Photograph URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    value={avatarUrl}
                    onChange={e => setAvatarUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 tracking-wider"
                  />
                </div>

                {/* Citation */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary ml-2">Citation & Key Achievements</label>
                  <textarea
                    rows={4}
                    placeholder="Describe their major achievements and theme during their tenure..."
                    value={citation}
                    onChange={e => setCitation(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-medium text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 tracking-wide leading-relaxed resize-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest border border-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
                      Saving...
                    </>
                  ) : (
                    'Save Leader'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
