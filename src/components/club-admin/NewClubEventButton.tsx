'use client';

import { useState, useRef } from 'react';
import SlidePanel from '@/components/SlidePanel';
import { createEvent } from '@/app/actions/mutations';

export default function NewClubEventButton({ clubId }: { clubId: string | null }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [activityType, setActivityType] = useState<'Event' | 'Project'>('Event');
  const [coverPreview, setCoverPreview] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-3 bg-purple-600 text-white font-black uppercase tracking-[0.3em] text-[10px] px-8 py-4 rounded-xl shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all font-sans cursor-pointer">
        <span className="material-symbols-outlined text-lg">add_circle</span>
        Create Activity
      </button>

      <SlidePanel open={open} onClose={() => { setOpen(false); setCoverPreview(''); }}
        title={activityType === 'Event' ? 'Publish Upcoming <span class="text-purple-400">Event</span>' : 'Showcase Completed <span class="text-purple-400">Project</span>'}
        subtitle={activityType === 'Event' ? 'Publish event details and capture registrations' : 'Log project details, trigger AI audit, and gain leaderboard points'}
        icon={activityType === 'Event' ? 'event' : 'emoji_events'} accentColor="purple">
        
        <form action={async (fd: FormData) => { 
          setPending(true); 
          await createEvent(fd); 
          setPending(false); 
          setOpen(false); 
          setCoverPreview('');
        }} className="space-y-8">
          
          {clubId && <input type="hidden" name="clubId" value={clubId} />}
          
          {/* Activity Type Switcher */}
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Activity Type</label>
            <div className="flex bg-white/5 p-1.5 rounded-xl border border-white/10">
              <button 
                type="button" 
                onClick={() => setActivityType('Event')} 
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                  activityType === 'Event' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'text-white/40 hover:text-white'
                }`}
              >
                Upcoming Event
              </button>
              <button 
                type="button" 
                onClick={() => setActivityType('Project')} 
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                  activityType === 'Project' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'text-white/40 hover:text-white'
                }`}
              >
                Completed Project
              </button>
            </div>
          </div>

          {/* Activity Type Hidden Fields */}
          {activityType === 'Project' ? (
            <>
              <input type="hidden" name="entryType" value="Project" />
              <input type="hidden" name="status" value="completed" />
            </>
          ) : (
            <input type="hidden" name="status" value="upcoming" />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Title */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">
                {activityType === 'Event' ? 'Event Title *' : 'Project Title *'}
              </label>
              <input name="title" type="text" required placeholder={activityType === 'Event' ? 'Enter event name...' : 'Enter project name...'}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">
                {activityType === 'Event' ? 'Date &amp; Time *' : 'Completion Date *'}
              </label>
              <input name="eventDate" type="datetime-local" required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none font-sans" />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Category</label>
              <select name="category" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none font-sans cursor-pointer">
                <option value="Community Service" className="bg-slate-900">Community Service</option>
                <option value="Professional Development" className="bg-slate-900">Professional Development</option>
                <option value="Club Service" className="bg-slate-900">Club Service</option>
                <option value="International Service" className="bg-slate-900">International Service</option>
              </select>
            </div>

            {/* Event Specific: Entry Type */}
            {activityType === 'Event' && (
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Entry Type</label>
                <select name="entryType" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none font-sans cursor-pointer">
                  <option value="free" className="bg-slate-900">Free Entry</option>
                  <option value="paid" className="bg-slate-900">Paid Entry</option>
                  <option value="invite" className="bg-slate-900">Invite Only</option>
                </select>
              </div>
            )}

            {/* Event Specific: RSVP Link */}
            {activityType === 'Event' && (
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">RSVP / Registration Link</label>
                <input name="rsvpLink" type="url" placeholder="https://..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
              </div>
            )}

            {/* Project Specific: Year Label */}
            {activityType === 'Project' && (
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Project Year</label>
                <input name="yearDateLabel" type="text" placeholder="e.g. 2025-26" defaultValue="2025-26" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
              </div>
            )}

            {/* Location */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Location / Venue</label>
              <input name="location" type="text" placeholder="Location details..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
            </div>

            {/* Cover Image Upload (Shown for both Event and Project) */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Activity Cover Image</label>
              <div className="flex items-start gap-6">
                {/* Preview + Click Target */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:border-purple-500/40 hover:bg-purple-500/5 transition-all group overflow-hidden relative shrink-0"
                >
                  {coverPreview ? (
                    <img src={coverPreview} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <span className="material-symbols-outlined text-3xl text-purple-500/30 group-hover:text-purple-500 transition-colors">add_photo_alternate</span>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <span className="material-symbols-outlined text-white text-xl">upload</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-white/5 border border-white/10 border-dashed rounded-xl py-3 px-5 text-[10px] font-bold text-white/40 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/5 transition-all uppercase tracking-widest font-sans flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">upload_file</span>
                    {coverPreview ? 'Change Image' : 'Upload from Device'}
                  </button>
                  <p className="text-[8px] text-white/20 font-sans uppercase tracking-wider">Or paste a URL</p>
                  <input name="imageUrl" type="url" placeholder="https://example.com/cover.png..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-xs font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
                </div>
              </div>
            </div>

            {/* Project Specific: Gallery Images */}
            {activityType === 'Project' && (
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Project Gallery Images (Multiple)</label>
                <input name="galleryImages" type="file" accept="image/*" multiple
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none font-sans cursor-pointer" />
              </div>
            )}

            {/* Short Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Short Narrative Summary</label>
              <textarea name="description" rows={3} placeholder="Provide a summary of the event or project..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans resize-none" />
            </div>

            {/* Project Specific: Full Content (Markdown Case Study) */}
            {activityType === 'Project' && (
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Detailed Case Study (Supports Markdown)</label>
                <textarea name="fullContent" rows={6} placeholder="Provide full project details, methodologies, results, and impact logs..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans resize-none font-mono" />
              </div>
            )}

            {/* Project Specific: Featured Links */}
            {activityType === 'Project' && (
              <div className="space-y-4 md:col-span-2 border-t border-white/5 pt-6">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans block">Reference Link</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="featuredLinkLabel" type="text" placeholder="Link Label (e.g. Instagram Post)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
                  <input name="featuredLinkUrl" type="url" placeholder="https://..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
                </div>
              </div>
            )}

          </div>

          <button type="submit" disabled={pending}
            className="w-full bg-purple-600 text-white font-black uppercase tracking-[0.4em] text-[11px] py-5 rounded-xl hover:bg-purple-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-40 font-sans cursor-pointer">
            <span className="material-symbols-outlined text-lg">
              {activityType === 'Event' ? 'event' : 'emoji_events'}
            </span>
            {pending ? 'Publishing...' : activityType === 'Event' ? 'Publish Event' : 'Showcase Project'}
          </button>

        </form>
      </SlidePanel>
    </>
  );
}
