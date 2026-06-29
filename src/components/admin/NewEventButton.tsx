'use client';

import { useState, useRef } from 'react';
import SlidePanel from '@/components/SlidePanel';
import { createEvent } from '@/app/actions/mutations';

interface Club { id: string; name: string; }
export default function NewEventButton({ clubs }: { clubs: Club[] }) {
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

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-3 bg-primary text-white font-black uppercase tracking-[0.3em] text-[10px] px-8 py-4 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all font-sans cursor-pointer">
        <span className="material-symbols-outlined text-lg">add_circle</span>
        New Activity
      </button>

      <SlidePanel open={open} onClose={() => { setOpen(false); setCoverPreview(''); }}
        title={activityType === 'Event' ? 'Create New <span class="text-primary">Event</span>' : 'Showcase New <span class="text-primary">Project</span>'}
        subtitle={activityType === 'Event' ? 'Deploy district event to network and capture registrations' : 'Log completed project details, trigger AI audit, and update leaderboard'}
        icon={activityType === 'Event' ? 'event' : 'emoji_events'} accentColor="blue">
        
        <form action={async (fd: FormData) => { 
          setPending(true); 
          await createEvent(fd); 
          setPending(false); 
          setOpen(false); 
          setCoverPreview(''); 
        }}
          className="space-y-8">
          
          {/* Activity Type Switcher */}
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Activity Type</label>
            <div className="flex bg-white/5 p-1.5 rounded-xl border border-white/10">
              <button 
                type="button" 
                onClick={() => setActivityType('Event')} 
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activityType === 'Event' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-white/40 hover:text-white'
                }`}
              >
                Upcoming Event
              </button>
              <button 
                type="button" 
                onClick={() => setActivityType('Project')} 
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activityType === 'Project' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-white/40 hover:text-white'
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
            <>
              <input type="hidden" name="entryType" value="Event" />
              <input type="hidden" name="status" value="upcoming" />
            </>
          )}

          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans border-b border-white/5 pb-3">
              {activityType === 'Event' ? 'Event Details' : 'Project Details'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Title */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">
                  {activityType === 'Event' ? 'Event Title *' : 'Project Title *'}
                </label>
                <input name="title" type="text" required placeholder={activityType === 'Event' ? 'Enter event title...' : 'Enter project title...'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">
                  {activityType === 'Event' ? 'Date &amp; Time *' : 'Completion Date *'}
                </label>
                <input name="eventDate" type="datetime-local" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans" />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Location / Venue</label>
                <input name="location" type="text" placeholder="Venue / Platform..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Category</label>
                <select name="category" required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans cursor-pointer">
                  <option value="" className="bg-slate-900">Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                  ))}
                </select>
              </div>

              {/* Event Specific: Entry Type */}
              {activityType === 'Event' && (
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Entry Type</label>
                  <select name="entryType"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans cursor-pointer">
                    <option value="free" className="bg-slate-900">Free Entry</option>
                    <option value="paid" className="bg-slate-900">Paid Entry</option>
                    <option value="invite" className="bg-slate-900">Invite Only</option>
                  </select>
                </div>
              )}

              {/* Project Specific: Year Label */}
              {activityType === 'Project' && (
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Project Year</label>
                  <input name="yearDateLabel" type="text" placeholder="e.g. 2025-26" defaultValue="2025-26" required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
                </div>
              )}

              {/* Host Club */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Host Club (Optional)</label>
                <select name="clubId"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans cursor-pointer">
                  <option value="" className="bg-slate-900">District-wide</option>
                  {clubs.map(c => <option key={c.id} value={c.id} className="bg-slate-900">{c.name}</option>)}
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Short Narrative Summary</label>
                <textarea name="description" rows={3} placeholder="Describe the activity..." required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans resize-none" />
              </div>

              {/* Event Specific: RSVP Link */}
              {activityType === 'Event' && (
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">RSVP / Ticket Link</label>
                  <input name="rsvpLink" type="url" placeholder="https://..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
                </div>
              )}

              {/* Project Specific: Detailed Case Study (Markdown) */}
              {activityType === 'Project' && (
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Detailed Case Study (Supports Markdown)</label>
                  <textarea name="fullContent" rows={6} placeholder="Provide full project details, methodologies, results, and impact logs..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 font-sans resize-none font-mono" />
                </div>
              )}

              {/* Project Specific: Featured Links */}
              {activityType === 'Project' && (
                <div className="space-y-4 md:col-span-2 border-t border-white/5 pt-6">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans block">Reference Link</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="featuredLinkLabel" type="text" placeholder="Link Label (e.g. Press Release)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
                    <input name="featuredLinkUrl" type="url" placeholder="https://..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 uppercase tracking-widest font-sans" />
                  </div>
                </div>
              )}

              {/* Cover Image Upload (Shown for both Event and Project) */}
              <div className="space-y-3 md:col-span-2 border-t border-white/5 pt-6">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Activity Cover Image</label>
                <div className="flex items-start gap-6">
                  {/* Preview + Click Target */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all group overflow-hidden relative shrink-0"
                  >
                    {coverPreview ? (
                      <img src={coverPreview} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <span className="material-symbols-outlined text-3xl text-primary/30 group-hover:text-primary transition-colors">add_photo_alternate</span>
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
                      className="w-full bg-white/5 border border-white/10 border-dashed rounded-xl py-3 px-5 text-[10px] font-bold text-white/40 hover:text-white hover:border-primary/40 hover:bg-primary/5 transition-all uppercase tracking-widest font-sans flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">upload_file</span>
                      {coverPreview ? 'Change Image' : 'Upload from Device'}
                    </button>
                    <p className="text-[8px] text-white/20 font-sans uppercase tracking-wider text-center">Or paste a URL</p>
                    <input name="imageUrl" type="url" placeholder="https://example.com/cover.png..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-xs font-bold text-white focus:border-primary/50 outline-none placeholder:text-white/20 font-sans" />
                  </div>
                </div>
              </div>

              {/* Project Specific: Gallery Images (Multiple) */}
              {activityType === 'Project' && (
                <div className="space-y-2 md:col-span-2 border-t border-white/5 pt-6">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60 font-sans">Project Gallery Images (Multiple)</label>
                  <input name="galleryImages" type="file" accept="image/*" multiple
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none font-sans cursor-pointer" />
                </div>
              )}

            </div>
          </div>
          <button type="submit" disabled={pending}
            className="w-full bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-40 font-sans cursor-pointer">
            <span className="material-symbols-outlined text-lg">
              {activityType === 'Event' ? 'rocket_launch' : 'emoji_events'}
            </span>
            {pending ? 'Deploying...' : activityType === 'Event' ? 'Deploy Event' : 'Showcase Project'}
          </button>
        </form>
      </SlidePanel>
    </>
  );
}
