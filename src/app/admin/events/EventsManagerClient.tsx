'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { deleteEvent, trashEvent, restoreEvent } from '@/app/actions/mutations';
import EventForm from './EventForm';

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

interface EventsManagerClientProps {
  initialEvents: Event[];
  clubs: Club[];
}

export default function EventsManagerClient({ initialEvents, clubs }: EventsManagerClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'Project' | 'Event' | 'trash'>('Project');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Categories list matching the EventForm
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

  // Helper to copy links
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

  // Action handlers
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
    if (confirm('CRITICAL WARNING: This will permanently delete the entry and all associated registration records from PostgreSQL. This action CANNOT be undone. Are you sure?')) {
      startTransition(async () => {
        await deleteEvent(id);
        router.refresh();
      });
    }
  };

  // Find club name helper
  const getClubName = (clubId: string | null) => {
    if (!clubId) return 'District 3192';
    const club = clubs.find(c => c.id === clubId);
    return club ? club.name : 'Unknown Club';
  };

  // Filtering logic
  const filteredEvents = initialEvents.filter(event => {
    // 1. Tab check
    if (activeTab === 'trash') {
      if (event.status !== 'trash') return false;
    } else {
      if (event.status === 'trash') return false;
      const isProject = event.entryType?.toLowerCase() === 'project';
      const isProjectTab = activeTab.toLowerCase() === 'project';
      if (isProject !== isProjectTab) return false;
    }

    // 2. Search query check
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const titleMatch = event.title?.toLowerCase().includes(query);
      const descMatch = event.description?.toLowerCase().includes(query);
      const locationMatch = event.location?.toLowerCase().includes(query);
      const categoryMatch = event.category?.toLowerCase().includes(query);
      if (!titleMatch && !descMatch && !locationMatch && !categoryMatch) return false;
    }

    // 3. Category check
    if (selectedCategory !== 'all') {
      if (event.category?.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    }

    return true;
  });

  // Count tab items for badge displays
  const projectsCount = initialEvents.filter(e => e.status !== 'trash' && e.entryType?.toLowerCase() === 'project').length;
  const eventsCount = initialEvents.filter(e => e.status !== 'trash' && e.entryType?.toLowerCase() !== 'project').length;
  const trashCount = initialEvents.filter(e => e.status === 'trash').length;

  return (
    <div className="space-y-10">
      {/* Toast Notification for Link Copying */}
      <AnimatePresence>
        {copiedId && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 bg-[#0f2444] border border-[#f9a826]/30 text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-[#f9a826] text-xl">check_circle</span>
            <span className="text-xs font-bold uppercase tracking-wider font-sans">URL Protocol copied to clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Panel: Search & Category filters */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
        {/* Search */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 opacity-60">search</span>
          <input
            type="text"
            placeholder="Search active project databases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a1526]/80 backdrop-blur-sm border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm font-semibold text-white focus:border-[#f9a826]/40 outline-none transition-all placeholder:text-white/20 tracking-wider font-sans shadow-inner"
          />
        </div>

        {/* Category Select Dropdown */}
        <div className="relative min-w-[240px]">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#0a1526]/80 backdrop-blur-sm border border-white/5 rounded-2xl py-4 pl-6 pr-12 text-sm font-bold text-white focus:border-[#f9a826]/40 outline-none transition-all appearance-none uppercase tracking-wider cursor-pointer font-sans shadow-inner"
          >
            <option value="all">ALL CATEGORIES</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat.toUpperCase()}</option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 opacity-60">expand_more</span>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex border-b border-white/5 gap-1.5 pb-px overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('Project')}
          className={`flex items-center gap-3 px-6 py-4 border-b-2 font-display text-xs font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
            activeTab === 'Project'
              ? 'border-[#f9a826] text-[#f9a826]'
              : 'border-transparent text-slate-400 hover:text-white hover:border-white/10'
          }`}
        >
          <span className="material-symbols-outlined text-lg">folder_special</span>
          Projects
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-bold ${
            activeTab === 'Project' ? 'bg-[#f9a826]/20 text-[#f9a826]' : 'bg-white/5 text-slate-400'
          }`}>
            {projectsCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('Event')}
          className={`flex items-center gap-3 px-6 py-4 border-b-2 font-display text-xs font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
            activeTab === 'Event'
              ? 'border-[#f9a826] text-[#f9a826]'
              : 'border-transparent text-slate-400 hover:text-white hover:border-white/10'
          }`}
        >
          <span className="material-symbols-outlined text-lg">event</span>
          Events
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-bold ${
            activeTab === 'Event' ? 'bg-[#f9a826]/20 text-[#f9a826]' : 'bg-white/5 text-slate-400'
          }`}>
            {eventsCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('trash')}
          className={`flex items-center gap-3 px-6 py-4 border-b-2 font-display text-xs font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
            activeTab === 'trash'
              ? 'border-red-500 text-red-500'
              : 'border-transparent text-slate-400 hover:text-white hover:border-white/10'
          }`}
        >
          <span className="material-symbols-outlined text-lg">delete_sweep</span>
          Trash Bin
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-bold ${
            activeTab === 'trash' ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-slate-400'
          }`}>
            {trashCount}
          </span>
        </button>
      </div>

      {/* Main Table Interface */}
      <div className="glass-panel overflow-hidden border border-white/5 rounded-2xl bg-[#091124]/40 backdrop-blur-md relative shadow-2xl">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] font-sans">
                <th className="py-5 px-8 select-none">Entry</th>
                <th className="py-5 px-6 select-none">Club / Location</th>
                <th className="py-5 px-6 select-none">Date</th>
                <th className="py-5 px-6 select-none">Status</th>
                <th className="py-5 px-8 text-right select-none">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredEvents.map((event) => {
                const formattedDate = event.yearDateLabel || (event.eventDate
                  ? new Date(event.eventDate).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : 'PENDING');

                return (
                  <tr
                    key={event.id}
                    className="hover:bg-white/[0.02] group transition-colors duration-200"
                  >
                    {/* Entry Info */}
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        {/* Image Preview */}
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10 relative flex-shrink-0 flex items-center justify-center">
                          {event.imageUrl ? (
                            <Image
                              src={event.imageUrl}
                              alt={event.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-xl text-slate-500 opacity-60">
                              {event.entryType?.toLowerCase() === 'project' ? 'folder_special' : 'event'}
                            </span>
                          )}
                        </div>

                        {/* Title & Badges */}
                        <div className="space-y-1.5">
                          <h4 className="font-display font-bold uppercase tracking-tight text-white group-hover:text-[#f9a826] transition-colors leading-tight line-clamp-1 max-w-[280px]">
                            {event.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2">
                            {event.category && (
                              <span className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-bold text-slate-300 uppercase tracking-widest border border-white/5">
                                {event.category}
                              </span>
                            )}
                            {event.isSignatureProject && (
                              <span className="px-2 py-0.5 bg-[#f9a826]/10 text-[#f9a826] rounded text-[8px] font-bold uppercase tracking-widest border border-[#f9a826]/20">
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
                          <span className="material-symbols-outlined text-xs text-[#f9a826]">location_on</span>
                          {event.location || 'Pending sync'}
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
                              hour12: true
                            })}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-5 px-6 font-sans">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02]">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          event.status === 'upcoming' ? 'bg-amber-400 animate-pulse' :
                          event.status === 'completed' ? 'bg-green-500' :
                          event.status === 'trash' ? 'bg-red-500' : 'bg-slate-400'
                        }`}></span>
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
                              className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-[#0f2444] hover:text-[#f9a826] hover:border-[#1d3d6b] transition-all group/btn"
                            >
                              <span className="material-symbols-outlined text-base group-hover/btn:scale-105 transition-transform">content_copy</span>
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => setEditingEvent(event)}
                              title="Edit Entry"
                              className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-[#0f2444] hover:text-[#f9a826] hover:border-[#1d3d6b] transition-all group/btn"
                            >
                              <span className="material-symbols-outlined text-base group-hover/btn:scale-105 transition-transform">edit</span>
                            </button>

                            {/* Soft Delete */}
                            <button
                              onClick={() => handleSoftDelete(event.id)}
                              title="Move to Trash"
                              className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-red-400/50 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all group/btn"
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
                              className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-green-400 hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/20 transition-all group/btn"
                            >
                              <span className="material-symbols-outlined text-base group-hover/btn:scale-105 transition-transform">restore</span>
                            </button>

                            {/* Permanent Delete */}
                            <button
                              onClick={() => handlePermanentDelete(event.id)}
                              title="Delete Permanently"
                              className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all group/btn"
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

      {/* Edit Entry Modal Overlay */}
      <AnimatePresence>
        {editingEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingEvent(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative bg-[#020617] border border-[#1d3d6b]/50 rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-y-auto p-8 md:p-12 shadow-2xl z-10 scrollbar-thin select-none"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-white/5 pb-6 mb-8">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f9a826]/10 border border-[#f9a826]/20 rounded-full text-[9px] font-black uppercase text-[#f9a826] tracking-widest font-sans">
                    Registry Edit Protocol
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight">
                    Edit <span className="text-[#f9a826]">Entry</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    ID: {editingEvent.id}
                  </p>
                </div>

                <button
                  onClick={() => setEditingEvent(null)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Form Content */}
              <div className="overflow-visible">
                <EventForm
                  clubs={clubs}
                  initialData={editingEvent}
                  onSuccess={() => {
                    setEditingEvent(null);
                    router.refresh();
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
