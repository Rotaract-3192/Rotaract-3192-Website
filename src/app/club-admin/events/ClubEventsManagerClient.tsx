'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { deleteEvent, trashEvent, restoreEvent } from '@/app/actions/mutations';
import ClubEventForm from './ClubEventForm';
import SlidePanel from '@/components/SlidePanel';

interface Club {
  id: string;
  name: string;
}

interface Event {
  id: string;
  clubId: string | null;
  title: string;
  slug: string;
  description: string | null;
  eventDate: Date | string | null;
  location: string | null;
  imageUrl: string | null;
  isSignatureProject: boolean | null;
  status: string | null;
  category: string | null;
  entryType: string | null;
  yearDateLabel: string | null;
  fullContent: string | null;
  galleryImages: string | null;
  featuredLinks: string | null;
  rsvpLink: string | null;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
}

interface ClubEventsManagerClientProps {
  initialEvents: Event[];
  clubs: Club[];
}

export default function ClubEventsManagerClient({ initialEvents, clubs }: ClubEventsManagerClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'Project' | 'Event' | 'trash'>('Project');
  const [formOpen, setFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'Community Service',
    'Club Service',
    'Professional Development',
    'International Service',
    'District Project',
    'Public Relations',
    'Youth Service',
    'Fundraiser',
    'Other'
  ];

  const handleCopyLink = async (slug: string, id: string) => {
    try {
      const url = `${window.location.origin}/events/${slug}`;
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSoftDelete = (id: string) => {
    if (confirm('Are you sure you want to move this entry to the trash bin?')) {
      startTransition(async () => {
        await trashEvent(id);
        router.refresh();
      });
    }
  };

  const handleRestore = (id: string) => {
    startTransition(async () => {
      await restoreEvent(id);
      router.refresh();
    });
  };

  const handlePermanentDelete = (id: string) => {
    if (confirm('CRITICAL WARNING: This will permanently delete the entry. This action CANNOT be undone. Are you sure?')) {
      startTransition(async () => {
        await deleteEvent(id);
        router.refresh();
      });
    }
  };

  // Filter logic
  const filteredEvents = initialEvents.filter((event) => {
    // 1. Tab match
    if (activeTab === 'trash') {
      if (event.status !== 'trash') return false;
    } else {
      if (event.status === 'trash') return false;
      if (event.entryType !== activeTab) return false;
    }

    // 2. Search match
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = event.title?.toLowerCase().includes(query);
      const matchesDesc = event.description?.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDesc) return false;
    }

    // 3. Category match
    if (selectedCategory !== 'all') {
      if (event.category !== selectedCategory) return false;
    }

    return true;
  });

  const getClubName = (id: string | null) => {
    if (!id) return 'District Event';
    const c = clubs.find((club) => club.id === id);
    return c ? c.name : 'Unknown Club';
  };

  const handleOpenCreateForm = () => {
    setEditingEvent(null);
    setFormOpen(true);
  };

  const handleOpenEditForm = (event: Event) => {
    setEditingEvent(event);
    setFormOpen(true);
  };

  return (
    <div className="space-y-10">
      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 bg-[#07101f]/50 p-6 rounded-[2rem] border border-purple-500/10 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search bar */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-60">search</span>
            <input
              type="text"
              placeholder="Search title, description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#030712]/60 border border-white/10 rounded-xl py-3 px-12 text-sm font-semibold text-white focus:border-purple-500/50 outline-none transition-all placeholder:text-white/20 font-sans"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#030712]/60 border border-white/10 rounded-xl py-3 pl-5 pr-10 text-xs font-bold text-slate-300 focus:border-purple-500/50 outline-none transition-all appearance-none uppercase tracking-wider cursor-pointer font-sans h-full"
            >
              <option value="all">ALL CATEGORIES</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.toUpperCase()}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 opacity-60">expand_more</span>
          </div>
        </div>

        {/* Create Button */}
        <button
          onClick={handleOpenCreateForm}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-[0.3em] text-[10px] py-4 px-8 rounded-xl shadow-xl shadow-purple-500/10 hover:scale-102 active:scale-98 transition-all font-sans cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-base">add_circle</span>
          Create Activity
        </button>
      </div>

      {/* Tabs Layout */}
      <div className="flex bg-[#030712]/40 p-1.5 rounded-2xl border border-white/5 max-w-md">
        {(['Project', 'Event', 'trash'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-lg shadow-purple-500/5'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            {tab === 'Project' ? 'Projects' : tab === 'Event' ? 'Events' : 'Trash Bin'}
          </button>
        ))}
      </div>

      {/* Main Database Table Grid */}
      <div className="glass-panel overflow-hidden border border-purple-500/10 relative">
        {isPending && (
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="animate-spin text-purple-400 material-symbols-outlined text-3xl">sync</span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse select-none">
            <thead>
              <tr className="border-b border-purple-500/10 bg-purple-500/5">
                <th className="py-5 px-8 text-[9px] font-black uppercase tracking-[0.3em] text-purple-400 font-sans">Activity Details</th>
                <th className="py-5 px-6 text-[9px] font-black uppercase tracking-[0.3em] text-purple-400 font-sans">Host Club / Location</th>
                <th className="py-5 px-6 text-[9px] font-black uppercase tracking-[0.3em] text-purple-400 font-sans">Date & Time</th>
                <th className="py-5 px-6 text-[9px] font-black uppercase tracking-[0.3em] text-purple-400 font-sans">Status</th>
                <th className="py-5 px-8 text-right text-[9px] font-black uppercase tracking-[0.3em] text-purple-400 font-sans">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredEvents.map((event) => {
                const formattedDate = event.eventDate
                  ? new Date(event.eventDate).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'Pending Date';

                return (
                  <tr key={event.id} className="hover:bg-white/[0.02] transition-colors group">
                    {/* Title / Description */}
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-purple-500/30 transition-colors">
                          {event.imageUrl ? (
                            <img src={event.imageUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="material-symbols-outlined text-slate-500">image</span>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-white uppercase font-display tracking-tight group-hover:text-purple-400 transition-colors">
                            {event.title}
                          </p>
                          <div className="flex items-center gap-2">
                            {event.category && (
                              <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded text-[8px] font-bold uppercase tracking-widest border border-purple-500/20">
                                {event.category}
                              </span>
                            )}
                            {event.isSignatureProject && (
                              <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded text-[8px] font-bold uppercase tracking-widest border border-purple-500/20">
                                Signature
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Club / Location */}
                    <td className="py-5 px-6 font-sans">
                      <div className="space-y-1 text-slate-300">
                        <p className="text-xs font-bold uppercase tracking-wider">{getClubName(event.clubId)}</p>
                        <p className="text-[10px] text-slate-400 font-medium tracking-wide flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-xs text-purple-400">location_on</span>
                          {event.location || 'Pending Location'}
                        </p>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-5 px-6 font-sans">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-200 tracking-wider uppercase">{formattedDate}</p>
                        {event.eventDate && (
                          <p className="text-[9px] font-bold text-slate-500 tracking-widest">
                            {new Date(event.eventDate).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            })}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-5 px-6 font-sans">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02]">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            event.status === 'upcoming' ? 'bg-amber-400 animate-pulse' :
                            event.status === 'completed' ? 'bg-green-500' :
                            event.status === 'trash' ? 'bg-red-500' : 'bg-slate-400'
                          }`}
                        ></span>
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                          {event.status}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-5 px-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {activeTab !== 'trash' ? (
                          <>
                            {/* Copy Link */}
                            <button
                              onClick={() => handleCopyLink(event.slug, event.id)}
                              title="Copy URL Link"
                              className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-purple-950/30 hover:text-purple-400 hover:border-purple-500/30 transition-all group/btn cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-base group-hover/btn:scale-105 transition-transform">
                                {copiedId === event.id ? 'check' : 'content_copy'}
                              </span>
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => handleOpenEditForm(event)}
                              title="Edit Entry"
                              className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-purple-950/30 hover:text-purple-400 hover:border-purple-500/30 transition-all group/btn cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-base group-hover/btn:scale-105 transition-transform">edit</span>
                            </button>

                            {/* Soft Delete */}
                            <button
                              onClick={() => handleSoftDelete(event.id)}
                              title="Move to Trash"
                              className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-red-400/50 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all group/btn cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-base group-hover/btn:scale-105 transition-transform">delete</span>
                            </button>
                          </>
                        ) : (
                          <>
                            {/* Restore */}
                            <button
                              onClick={() => handleRestore(event.id)}
                              title="Restore Entry"
                              className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-green-400 hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/20 transition-all group/btn cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-base group-hover/btn:scale-105 transition-transform">restore</span>
                            </button>

                            {/* Permanent Delete */}
                            <button
                              onClick={() => handlePermanentDelete(event.id)}
                              title="Delete Permanently"
                              className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all group/btn cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-base group-hover/btn:scale-105 transition-transform">delete_forever</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <div className="space-y-4">
                      <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                        <span className="material-symbols-outlined text-2xl text-slate-500 opacity-60">
                          {activeTab === 'trash' ? 'delete_sweep' : 'event_busy'}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] font-sans">
                        No registries match current filters
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unified Create/Edit Form SlidePanel */}
      <SlidePanel
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingEvent ? 'Edit <span class="text-purple-400">Activity</span>' : 'Create <span class="text-purple-400">Activity</span>'}
        subtitle={editingEvent ? 'Update details, case study, and gallery files.' : 'Publish a new event or complete a project showcase.'}
        icon={editingEvent ? 'edit_note' : 'add_circle'}
        accentColor="purple"
      >
        <ClubEventForm
          clubs={clubs}
          initialData={editingEvent || undefined}
          onSuccess={() => {
            setFormOpen(false);
            setEditingEvent(null);
            router.refresh();
          }}
        />
      </SlidePanel>
    </div>
  );
}
