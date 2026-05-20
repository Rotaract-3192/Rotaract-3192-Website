'use client';

import { useState } from 'react';
import SlidePanel from '@/components/SlidePanel';
import { createFeed } from '@/app/actions/mutations';

export default function NewClubNewsButton() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-3 bg-purple-600 text-white font-black uppercase tracking-[0.3em] text-[10px] px-8 py-4 rounded-xl shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all font-sans">
        <span className="material-symbols-outlined text-lg">edit_note</span>
        Write Post
      </button>

      <SlidePanel open={open} onClose={() => setOpen(false)}
        title='Write a <span class="text-purple-400">Post</span>'
        subtitle="Publish news or blog to the district feed"
        icon="article" accentColor="purple">
        <form action={async (fd: FormData) => { setPending(true); await createFeed(fd); setPending(false); setOpen(false); }}
          className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Post Type</label>
              <select name="type" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none font-sans">
                <option value="post" className="bg-slate-900">News Post</option>
                <option value="blog" className="bg-slate-900">Blog Article</option>
                <option value="announcement" className="bg-slate-900">Announcement</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Title *</label>
              <input name="title" type="text" required placeholder="Post headline..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400/60 font-sans">Content *</label>
              <textarea name="content" rows={8} required placeholder="Write your post content here..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-bold text-white focus:border-purple-500/50 outline-none placeholder:text-white/20 font-sans resize-none" />
            </div>
          </div>
          <button type="submit" disabled={pending}
            className="w-full bg-purple-600 text-white font-black uppercase tracking-[0.4em] text-[11px] py-5 rounded-xl hover:bg-purple-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-40 font-sans">
            <span className="material-symbols-outlined text-lg">publish</span>
            {pending ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </SlidePanel>
    </>
  );
}
