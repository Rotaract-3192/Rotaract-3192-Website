'use client';

import { useState } from 'react';
import { createEvent } from '@/app/actions/mutations';

interface Club {
  id: string;
  name: string;
}

export default function EventForm({ clubs }: { clubs: Club[] }) {
  const [slug, setSlug] = useState('');
  const [featuredLinks, setFeaturedLinks] = useState<{ id: string; label: string; url: string }[]>([]);
  const [coverFileName, setCoverFileName] = useState('');
  const [galleryFileNames, setGalleryFileNames] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    setSlug(generatedSlug);
  };

  const addFeaturedLink = () => {
    setFeaturedLinks([...featuredLinks, { id: Math.random().toString(), label: '', url: '' }]);
  };

  const removeFeaturedLink = (id: string) => {
    setFeaturedLinks(featuredLinks.filter(link => link.id !== id));
  };

  const handleLinkChange = (id: string, field: 'label' | 'url', value: string) => {
    setFeaturedLinks(featuredLinks.map(link => {
      if (link.id === id) {
        return { ...link, [field]: value };
      }
      return link;
    }));
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
    <form 
      action={async (formData) => {
        setIsSubmitting(true);
        try {
          await createEvent(formData);
          setSlug('');
          setFeaturedLinks([]);
          setCoverFileName('');
          setGalleryFileNames([]);
          (document.getElementById('event-create-form') as HTMLFormElement)?.reset();
        } catch (error) {
          console.error(error);
        } finally {
          setIsSubmitting(false);
        }
      }}
      id="event-create-form"
      className="space-y-10 relative z-10 text-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Project Title */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Project Title *</label>
          <input 
            name="title" 
            type="text" 
            placeholder="Enter title..." 
            required
            onChange={handleTitleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans"
          />
        </div>

        {/* URL Slug */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">URL Slug *</label>
          <input 
            name="slug" 
            type="text" 
            placeholder="url-slug" 
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 lowercase tracking-widest font-sans"
          />
        </div>

        {/* Category */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Category *</label>
          <div className="relative">
            <select 
              name="category" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer font-sans"
            >
              <option value="" className="bg-slate-900">Select Category...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900">{cat.toUpperCase()}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
          </div>
        </div>

        {/* Entry Type */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Entry Type *</label>
          <div className="relative">
            <select 
              name="entryType" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer font-sans"
            >
              <option value="Event" className="bg-slate-900">EVENT</option>
              <option value="Project" className="bg-slate-900">PROJECT</option>
            </select>
            <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Status *</label>
          <div className="relative">
            <select 
              name="status" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer font-sans"
            >
              <option value="upcoming" className="bg-slate-900">UPCOMING</option>
              <option value="ongoing" className="bg-slate-900">ONGOING</option>
              <option value="completed" className="bg-slate-900">COMPLETED</option>
            </select>
            <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
          </div>
        </div>

        {/* Year / Date Label */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Year / Date Label *</label>
          <input 
            name="yearDateLabel" 
            type="text" 
            placeholder="e.g. 2025-2026 or MAY 24" 
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans"
          />
        </div>

        {/* Event Date (Optional) */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Exact Event Date (Optional)</label>
          <input 
            name="eventDate" 
            type="datetime-local" 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all uppercase tracking-widest font-sans"
          />
        </div>

        {/* Host Club (Optional) */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Host Club (Optional)</label>
          <div className="relative">
            <select 
              name="clubId" 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer font-sans"
            >
              <option value="" className="bg-slate-900">Select host club...</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id} className="bg-slate-900">{club.name.toUpperCase()}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
          </div>
        </div>

        {/* Venue/Location */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Venue / Location (Optional)</label>
          <input 
            name="location" 
            type="text" 
            placeholder="Physical address or digital link..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans"
          />
        </div>

        {/* RSVP/Ticket Link */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">RSVP / Ticket Link (Optional)</label>
          <input 
            name="rsvpLink" 
            type="url" 
            placeholder="https://example.com/rsvp" 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 lowercase tracking-widest font-sans"
          />
        </div>
      </div>

      {/* Short Description */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Short Description *</label>
        <textarea 
          name="description" 
          rows={3}
          required
          placeholder="Provide a short overview of the event/project..." 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-sm font-medium text-white focus:border-primary/50 outline-none transition-all resize-none leading-relaxed placeholder:text-white/20 font-sans"
        ></textarea>
      </div>

      {/* Full Content (Markdown) */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Full Article / Details (Markdown, Optional)</label>
        <textarea 
          name="fullContent" 
          rows={8}
          placeholder="Provide detailed article, schedule, speakers, or project details..." 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-sm font-medium text-white focus:border-primary/50 outline-none transition-all resize-y leading-relaxed placeholder:text-white/20 font-mono"
        ></textarea>
      </div>

      {/* Cover Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/5 pt-10">
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Cover Image File</label>
          <div className="relative border border-dashed border-white/15 hover:border-primary/50 rounded-xl transition-colors cursor-pointer group flex flex-col items-center justify-center p-6 bg-white/2">
            <input 
              type="file" 
              name="coverImage"
              accept="image/*"
              onChange={(e) => setCoverFileName(e.target.files?.[0]?.name || '')}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span className="material-symbols-outlined text-3xl text-primary/60 group-hover:text-primary mb-2 transition-colors">cloud_upload</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
              {coverFileName || 'Choose File'}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Cover Image URL (Fallback)</label>
          <input 
            name="imageUrl" 
            type="text" 
            placeholder="https://example.com/image.jpg" 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 lowercase tracking-widest font-sans"
          />
        </div>
      </div>

      {/* Gallery Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/5 pt-10">
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Gallery Images Files</label>
          <div className="relative border border-dashed border-white/15 hover:border-primary/50 rounded-xl transition-colors cursor-pointer group flex flex-col items-center justify-center p-6 bg-white/2">
            <input 
              type="file" 
              name="galleryImages"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = e.target.files;
                const names: string[] = [];
                if (files) {
                  for (let i = 0; i < files.length; i++) {
                    names.push(files[i].name);
                  }
                }
                setGalleryFileNames(names);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span className="material-symbols-outlined text-3xl text-primary/60 group-hover:text-primary mb-2 transition-colors">collections</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors text-center px-4">
              {galleryFileNames.length > 0 ? `${galleryFileNames.length} Files Selected` : 'Choose Multiple Files'}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Gallery Image URLs (Fallback, comma-separated)</label>
          <textarea 
            name="externalGalleryUrls" 
            rows={2}
            placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 lowercase tracking-widest font-sans resize-none"
          ></textarea>
        </div>
      </div>

      {/* Featured Links Section */}
      <div className="space-y-6 border-t border-white/5 pt-10">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Featured Links</h3>
            <p className="text-[10px] text-text-muted/60 uppercase tracking-widest font-sans mt-1">Add reference links, news articles, or social media posts</p>
          </div>
          <button
            type="button"
            onClick={addFeaturedLink}
            className="border border-primary/30 text-primary font-bold uppercase tracking-[0.2em] text-[10px] px-6 py-2.5 rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-2 font-sans"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Link
          </button>
        </div>

        {featuredLinks.length > 0 && (
          <div className="space-y-4">
            {featuredLinks.map((link) => (
              <div key={link.id} className="flex gap-4 items-center">
                <input
                  type="text"
                  name="featuredLinkLabel"
                  placeholder="Link Label (e.g. Register)"
                  value={link.label}
                  onChange={(e) => handleLinkChange(link.id, 'label', e.target.value)}
                  required
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans"
                />
                <input
                  type="url"
                  name="featuredLinkUrl"
                  placeholder="Link URL (e.g. https://...)"
                  value={link.url}
                  onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
                  required
                  className="flex-[2] bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 lowercase tracking-widest font-sans"
                />
                <button
                  type="button"
                  onClick={() => removeFeaturedLink(link.id)}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500/50 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Submit */}
      <div className="flex justify-end pt-4 border-t border-white/5">
        <button 
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white font-bold uppercase tracking-[0.4em] text-[11px] px-14 py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-3 group"
        >
          <span className="material-symbols-outlined text-lg group-hover:rotate-45 transition-transform">
            {isSubmitting ? 'sync' : 'add'}
          </span>
          {isSubmitting ? 'Publishing...' : 'Publish Entry'}
        </button>
      </div>
    </form>
  );
}
