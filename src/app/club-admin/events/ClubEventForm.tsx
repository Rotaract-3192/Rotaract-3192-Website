'use client';

import { useState, useEffect } from 'react';
import { createEvent, updateEvent } from '@/app/actions/mutations';

interface Club {
  id: string;
  name: string;
}

interface ClubEventFormProps {
  clubs: Club[];
  initialData?: any;
  onSuccess?: () => void;
}

export default function ClubEventForm({ clubs, initialData, onSuccess }: ClubEventFormProps) {
  const [isEditMode] = useState(!!initialData);
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [entryType, setEntryType] = useState(initialData?.entryType || 'Event');
  const [status, setStatus] = useState(initialData?.status || 'upcoming');
  const [yearDateLabel, setYearDateLabel] = useState(initialData?.yearDateLabel || '');
  const [eventDate, setEventDate] = useState(
    initialData?.eventDate ? new Date(initialData.eventDate).toISOString().slice(0, 16) : ''
  );
  const [clubId, setClubId] = useState(initialData?.clubId || (clubs.length === 1 ? clubs[0].id : ''));
  const [location, setLocation] = useState(initialData?.location || '');
  const [rsvpLink, setRsvpLink] = useState(initialData?.rsvpLink || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [fullContent, setFullContent] = useState(initialData?.fullContent || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  
  // Featured Links state
  const [featuredLinks, setFeaturedLinks] = useState<{ id: string; label: string; url: string }[]>([]);
  
  // File names for display
  const [coverFileName, setCoverFileName] = useState('');
  const [coverPreviewUrl, setCoverPreviewUrl] = useState(initialData?.imageUrl || '');
  const [galleryFileNames, setGalleryFileNames] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse existing gallery images
  const [existingGalleryImages, setExistingGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setSlug(initialData.slug || '');
      setCategory(initialData.category || '');
      setEntryType(initialData.entryType || 'Event');
      setStatus(initialData.status || 'upcoming');
      setYearDateLabel(initialData.yearDateLabel || '');
      setEventDate(initialData.eventDate ? new Date(initialData.eventDate).toISOString().slice(0, 16) : '');
      setClubId(initialData.clubId || (clubs.length === 1 ? clubs[0].id : ''));
      setLocation(initialData.location || '');
      setRsvpLink(initialData.rsvpLink || '');
      setDescription(initialData.description || '');
      setFullContent(initialData.fullContent || '');
      setImageUrl(initialData.imageUrl || '');
      setCoverPreviewUrl(initialData.imageUrl || '');
      
      // Parse featured links if any
      if (initialData.featuredLinks) {
        try {
          const links = typeof initialData.featuredLinks === 'string' 
            ? JSON.parse(initialData.featuredLinks) 
            : initialData.featuredLinks;
          if (Array.isArray(links)) {
            setFeaturedLinks(links.map((l: any) => ({ id: Math.random().toString(), label: l.label, url: l.url })));
          }
        } catch (e) {
          console.error('Error parsing featured links:', e);
        }
      }

      // Parse gallery images if any
      if (initialData.galleryImages) {
        try {
          const images = typeof initialData.galleryImages === 'string'
            ? JSON.parse(initialData.galleryImages)
            : initialData.galleryImages;
          if (Array.isArray(images)) {
            setExistingGalleryImages(images);
          }
        } catch (e) {
          console.error('Error parsing gallery images:', e);
        }
      }
    }
  }, [initialData, clubs]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditMode) {
      const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      setSlug(generatedSlug);
    }
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

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFileName(file.name);
      const localUrl = URL.createObjectURL(file);
      setCoverPreviewUrl(localUrl);
    } else {
      setCoverFileName('');
      setCoverPreviewUrl(imageUrl || '');
    }
  };

  const removeExistingGalleryImage = (indexToRemove: number) => {
    setExistingGalleryImages(existingGalleryImages.filter((_, idx) => idx !== indexToRemove));
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
          if (isEditMode) {
            formData.append('existingGalleryImages', JSON.stringify(existingGalleryImages));
          }

          if (isEditMode) {
            await updateEvent(initialData.id, formData);
          } else {
            await createEvent(formData);
            // Reset form
            setTitle('');
            setSlug('');
            setCategory('');
            setEntryType('Event');
            setStatus('upcoming');
            setYearDateLabel('');
            setEventDate('');
            setClubId(clubs.length === 1 ? clubs[0].id : '');
            setLocation('');
            setRsvpLink('');
            setDescription('');
            setFullContent('');
            setImageUrl('');
            setCoverFileName('');
            setCoverPreviewUrl('');
            setGalleryFileNames([]);
            setFeaturedLinks([]);
            (document.getElementById('club-event-form') as HTMLFormElement)?.reset();
          }

          if (onSuccess) {
            onSuccess();
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsSubmitting(false);
        }
      }}
      id="club-event-form"
      className="space-y-8 text-white max-w-4xl mx-auto"
    >
      {/* Row 1: Title & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans">
            Project Title <span className="text-purple-400">*</span>
          </label>
          <input 
            name="title" 
            type="text" 
            placeholder="Enter title..." 
            required
            value={title}
            onChange={handleTitleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 text-sm font-bold text-white focus:border-purple-500/50 outline-none transition-all placeholder:text-white/20 tracking-wider font-sans"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans">
            URL Slug <span className="text-purple-400">*</span>
          </label>
          <input 
            name="slug" 
            type="text" 
            placeholder="url-slug" 
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 text-sm font-bold text-white focus:border-purple-500/50 outline-none transition-all placeholder:text-white/20 lowercase tracking-wider font-sans"
          />
        </div>
      </div>

      {/* Row 2: Category & Host Club */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans">
            Category <span className="text-purple-400">*</span>
          </label>
          <div className="relative">
            <select 
              name="category" 
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 text-sm font-bold text-white focus:border-purple-500/50 outline-none transition-all appearance-none uppercase tracking-wider cursor-pointer font-sans"
            >
              <option value="" className="bg-slate-900">Select Category...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900">{cat.toUpperCase()}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 opacity-60">expand_more</span>
          </div>
        </div>

        {/* Host Club Option */}
        {clubs.length === 1 ? (
          <input type="hidden" name="clubId" value={clubId} />
        ) : (
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans">
              Host Club (Optional)
            </label>
            <div className="relative">
              <select 
                name="clubId" 
                value={clubId}
                onChange={(e) => setClubId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 text-sm font-bold text-white focus:border-purple-500/50 outline-none transition-all appearance-none uppercase tracking-wider cursor-pointer font-sans"
              >
                <option value="" className="bg-slate-900">Select host club...</option>
                {clubs.map((club) => (
                  <option key={club.id} value={club.id} className="bg-slate-900">{club.name.toUpperCase()}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 opacity-60">expand_more</span>
            </div>
          </div>
        )}
      </div>

      {/* Row 3: Entry Type, Status, Year/Date Label */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans">
            Entry Type <span className="text-purple-400">*</span>
          </label>
          <div className="relative">
            <select 
              name="entryType" 
              required
              value={entryType}
              onChange={(e) => setEntryType(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 text-sm font-bold text-white focus:border-purple-500/50 outline-none transition-all appearance-none uppercase tracking-wider cursor-pointer font-sans"
            >
              <option value="Event" className="bg-slate-900">EVENT</option>
              <option value="Project" className="bg-slate-900">PROJECT</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 opacity-60">expand_more</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans">
            Status <span className="text-purple-400">*</span>
          </label>
          <div className="relative">
            <select 
              name="status" 
              required
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 text-sm font-bold text-white focus:border-purple-500/50 outline-none transition-all appearance-none uppercase tracking-wider cursor-pointer font-sans"
            >
              <option value="upcoming" className="bg-slate-900">UPCOMING</option>
              <option value="ongoing" className="bg-slate-900">ONGOING</option>
              <option value="completed" className="bg-slate-900">COMPLETED</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 opacity-60">expand_more</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans">
            Year / Date Label <span className="text-purple-400">*</span>
          </label>
          <input 
            name="yearDateLabel" 
            type="text" 
            placeholder="e.g. 2025-2026 or MAY 24" 
            required
            value={yearDateLabel}
            onChange={(e) => setYearDateLabel(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 text-sm font-bold text-white focus:border-purple-500/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-wider font-sans"
          />
        </div>
      </div>

      {/* Date & RSVP links (Row 3b) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans">Exact Event Date (Optional)</label>
          <input 
            name="eventDate" 
            type="datetime-local" 
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 text-sm font-bold text-white focus:border-purple-500/50 outline-none transition-all uppercase tracking-wider font-sans"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans">Venue / Location (Optional)</label>
          <input 
            name="location" 
            type="text" 
            placeholder="Physical address or digital link..." 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 text-sm font-bold text-white focus:border-purple-500/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-wider font-sans"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans">RSVP / Ticket Link (Optional)</label>
          <input 
            name="rsvpLink" 
            type="url" 
            placeholder="https://example.com/rsvp" 
            value={rsvpLink}
            onChange={(e) => setRsvpLink(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 text-sm font-bold text-white focus:border-purple-500/50 outline-none transition-all placeholder:text-white/20 lowercase tracking-wider font-sans"
          />
        </div>
      </div>

      {/* Row 4: Short Description */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans">
          Short Description <span className="text-purple-400">*</span>
        </label>
        <textarea 
          name="description" 
          rows={3}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide a short overview of the event/project..." 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-medium text-white focus:border-purple-500/50 outline-none transition-all resize-none leading-relaxed placeholder:text-white/20 font-sans"
        ></textarea>
      </div>

      {/* Full Content (Markdown) */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans">Full Article / Details (Markdown, Optional)</label>
        <textarea 
          name="fullContent" 
          rows={6}
          value={fullContent}
          onChange={(e) => setFullContent(e.target.value)}
          placeholder="Provide detailed article, schedule, speakers, or project details..." 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-medium text-white focus:border-purple-500/50 outline-none transition-all resize-y leading-relaxed placeholder:text-white/20 font-mono"
        ></textarea>
      </div>

      {/* Row 5: Cover Image Split Container */}
      <div className="space-y-3 border-t border-white/5 pt-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans">
          Cover Image <span className="text-purple-400">*</span>
        </span>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Left Preview Box */}
          <div className="col-span-12 md:col-span-4 border border-dashed border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center bg-white/5 min-h-[160px] relative overflow-hidden group">
            {coverPreviewUrl ? (
              <>
                <img 
                  src={coverPreviewUrl} 
                  alt="Cover Preview" 
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white">Image Uploaded</span>
                </div>
              </>
            ) : (
              <div className="text-center space-y-1">
                <span className="material-symbols-outlined text-3xl text-slate-500">image</span>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">No Image</p>
                <p className="text-[8px] text-slate-600 font-semibold uppercase tracking-widest">800x600 recommended</p>
              </div>
            )}
          </div>

          {/* Right Controls Box */}
          <div className="col-span-12 md:col-span-8 flex flex-col justify-between gap-4">
            <div className="relative border border-dashed border-white/15 hover:border-purple-500/40 rounded-xl transition-all cursor-pointer group flex flex-col items-center justify-center p-6 bg-white/5 flex-1 min-h-[90px]">
              <input 
                type="file" 
                name="coverImage"
                accept="image/*"
                onChange={handleCoverFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <span className="material-symbols-outlined text-2xl text-purple-400 group-hover:text-purple-300 mb-1.5 transition-colors">cloud_upload</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors text-center">
                {coverFileName || 'Click to Upload Image'}
              </span>
            </div>

            <input 
              name="imageUrl" 
              type="hidden" 
              value={imageUrl}
            />
          </div>
        </div>
      </div>

      {/* Gallery Images Section */}
      <div className="space-y-4 border-t border-white/5 pt-6">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans">Gallery Images (Optional)</label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative border border-dashed border-white/15 hover:border-purple-500/40 rounded-xl transition-all cursor-pointer group flex flex-col items-center justify-center p-6 bg-white/5 min-h-[110px]">
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
            <span className="material-symbols-outlined text-2xl text-purple-400 group-hover:text-purple-300 mb-1.5 transition-colors">collections</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors text-center px-4">
              {galleryFileNames.length > 0 ? `${galleryFileNames.length} Files Selected` : 'Choose Multiple Files'}
            </span>
          </div>

          <div className="space-y-2">
            <textarea 
              name="externalGalleryUrls" 
              rows={2}
              placeholder="Or provide fallback Image URLs (comma-separated)" 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-purple-500/50 outline-none transition-all placeholder:text-white/20 lowercase tracking-wider font-sans resize-none"
            ></textarea>
          </div>
        </div>

        {/* Existing Gallery Images display with removal */}
        {isEditMode && existingGalleryImages.length > 0 && (
          <div className="space-y-2">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Current Gallery Images (click to remove):</p>
            <div className="flex flex-wrap gap-3">
              {existingGalleryImages.map((img, idx) => (
                <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden group border border-white/5">
                  <img src={img} alt="gallery-thumb" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingGalleryImage(idx)}
                    className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <span className="material-symbols-outlined text-white text-base">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Featured Links Section */}
      <div className="space-y-4 border-t border-white/5 pt-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Featured Links</h3>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-sans mt-0.5">Reference links, news articles, or attachments</p>
          </div>
          <button
            type="button"
            onClick={addFeaturedLink}
            className="border border-purple-500/30 text-purple-400 hover:bg-purple-500/5 font-bold uppercase tracking-[0.15em] text-[9px] px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 font-sans cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Link
          </button>
        </div>

        {featuredLinks.length > 0 && (
          <div className="space-y-3">
            {featuredLinks.map((link) => (
              <div key={link.id} className="flex gap-3 items-center">
                <input
                  type="text"
                  name="featuredLinkLabel"
                  placeholder="Label (e.g. Register)"
                  value={link.label}
                  onChange={(e) => handleLinkChange(link.id, 'label', e.target.value)}
                  required
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-purple-500/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-wider font-sans"
                />
                <input
                  type="url"
                  name="featuredLinkUrl"
                  placeholder="URL (e.g. https://...)"
                  value={link.url}
                  onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
                  required
                  className="flex-[2] bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-sm font-bold text-white focus:border-purple-500/50 outline-none transition-all placeholder:text-white/20 lowercase tracking-wider font-sans"
                />
                <button
                  type="button"
                  onClick={() => removeFeaturedLink(link.id)}
                  className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Submit */}
      <div className="flex justify-end pt-4 border-t border-white/5 gap-4">
        {onSuccess && (
          <button
            type="button"
            onClick={onSuccess}
            className="px-6 py-3 border border-white/10 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all text-slate-300 cursor-pointer"
          >
            Cancel
          </button>
        )}
        <button 
          type="submit"
          disabled={isSubmitting}
          className="bg-purple-600 text-white hover:bg-purple-500 font-bold uppercase tracking-[0.2em] text-[10px] px-8 py-3.5 rounded-xl shadow-md hover:scale-102 active:scale-98 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 group font-sans cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm group-hover:rotate-45 transition-transform">
            {isSubmitting ? 'sync' : 'add'}
          </span>
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Entry' : 'Publish Entry'}
        </button>
      </div>
    </form>
  );
}
