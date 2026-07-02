'use client';

import { useRef, useState, useTransition } from 'react';
import { createAnnouncement } from '@/app/actions/mutations';
import { draftAnnouncementWithAI } from '@/app/actions/aiDraft';

export default function AnnouncementForm({ blastContactsCount }: { blastContactsCount: number }) {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AI draft state
  const [aiPrompt, setAiPrompt] = useState('');
  const [isDrafting, startDrafting] = useTransition();
  const [aiError, setAiError] = useState('');

  // Controlled form fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [priority, setPriority] = useState('normal');

  // Attachment preview
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  // Submission state
  const [isSubmitting, startSubmit] = useTransition();
  const [successMsg, setSuccessMsg] = useState('');
  const [submitError, setSubmitError] = useState('');

  function handleAIDraft() {
    if (!aiPrompt.trim()) return;
    setAiError('');
    startDrafting(async () => {
      try {
        const result = await draftAnnouncementWithAI(aiPrompt.trim(), priority);
        setTitle(result.title);
        setContent(result.content);
        setEmailSubject(result.emailSubject);
      } catch (err: unknown) {
        setAiError(err instanceof Error ? err.message : 'AI draft failed. Try again.');
      }
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setAttachedFiles(prev => {
      const existing = new Set(prev.map(f => f.name + f.size));
      const newFiles = files.filter(f => !existing.has(f.name + f.size));
      return [...prev, ...newFiles];
    });
  }

  function removeFile(index: number) {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  }

  function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccessMsg('');
    setSubmitError('');
    const formData = new FormData(e.currentTarget);
    // Append controlled fields
    formData.set('title', title);
    formData.set('content', content);
    formData.set('emailSubject', emailSubject);
    formData.set('priority', priority);
    // Append file attachments
    formData.delete('attachments');
    for (const file of attachedFiles) {
      formData.append('attachments', file);
    }

    startSubmit(async () => {
      try {
        await createAnnouncement(formData);
        setSuccessMsg('Announcement posted successfully!');
        setTitle('');
        setContent('');
        setEmailSubject('');
        setAiPrompt('');
        setAttachedFiles([]);
        formRef.current?.reset();
      } catch (err: unknown) {
        setSubmitError(err instanceof Error ? err.message : 'Failed to post announcement.');
      }
    });
  }

  const fileIconMap: Record<string, string> = {
    'application/pdf': 'picture_as_pdf',
    'image/': 'image',
    'video/': 'videocam',
    'audio/': 'audio_file',
    'application/zip': 'folder_zip',
    'application/msword': 'description',
    'application/vnd': 'table_chart',
  };
  function getFileIcon(type: string) {
    for (const [k, v] of Object.entries(fileIconMap)) {
      if (type.startsWith(k)) return v;
    }
    return 'attach_file';
  }

  return (
    <section className="glass-panel p-10 lg:p-14 relative overflow-hidden">
      {/* Section header */}
      <div className="flex items-center gap-8 mb-12">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
          <span className="material-symbols-outlined text-3xl">campaign</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold font-display uppercase tracking-tight leading-none text-white">
            New <span className="text-primary">Announcement</span>
          </h2>
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] opacity-40 mt-3 font-sans">
            Draft and transmit district-wide notification
          </p>
        </div>
      </div>

      {/* ── AI DRAFT PANEL ────────────────────────────────────────── */}
      <div className="mb-10 border border-primary/20 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent p-8 space-y-5">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary font-sans">AI Draft Assistant</p>
            <p className="text-[9px] text-white/30 font-sans mt-0.5">Powered by Groq · llama-3.3-70b-versatile</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <textarea
            value={aiPrompt}
            onChange={e => setAiPrompt(e.target.value)}
            rows={2}
            placeholder="Describe this announcement… e.g. 'Monthly district meeting on July 15th, mandatory for all club presidents'"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm font-medium text-white focus:border-primary/50 outline-none transition-all resize-none placeholder:text-white/20 font-sans"
          />
          <button
            type="button"
            onClick={handleAIDraft}
            disabled={isDrafting || !aiPrompt.trim()}
            className="md:w-44 flex items-center justify-center gap-2 bg-primary/10 border border-primary/30 text-primary font-bold uppercase tracking-[0.2em] text-[10px] px-6 py-4 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed font-sans"
          >
            {isDrafting ? (
              <><span className="material-symbols-outlined text-base animate-spin">progress_activity</span>Drafting…</>
            ) : (
              <><span className="material-symbols-outlined text-base">auto_awesome</span>Draft with AI</>
            )}
          </button>
        </div>
        {aiError && (
          <p className="text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 font-sans">⚠ {aiError}</p>
        )}
      </div>

      {/* Status banners */}
      {successMsg && (
        <div className="mb-8 flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-6 py-4">
          <span className="material-symbols-outlined text-green-400 text-xl">check_circle</span>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-green-400 font-sans">{successMsg}</p>
        </div>
      )}
      {submitError && (
        <div className="mb-8 flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-6 py-4">
          <span className="material-symbols-outlined text-red-400 text-xl">error</span>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-400 font-sans">{submitError}</p>
        </div>
      )}

      {/* ── MAIN FORM ─────────────────────────────────────────────── */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 relative z-10">

        {/* Title + Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Announcement Title *</label>
            <input
              name="title" type="text" value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter title..." required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Priority Level</label>
            <div className="relative">
              <select
                name="priority" value={priority} onChange={e => setPriority(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer font-sans"
              >
                <option value="normal" className="bg-slate-900">Standard / Normal</option>
                <option value="info" className="bg-slate-900">Info</option>
                <option value="alert" className="bg-slate-900">Critical Alert</option>
                <option value="success" className="bg-slate-900">Success Update</option>
              </select>
              <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary opacity-40">expand_more</span>
            </div>
          </div>
        </div>

        {/* Message body */}
        <div className="space-y-3">
          <div className="flex items-center justify-between mx-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary font-sans">Announcement Message *</label>
            {content && <span className="text-[9px] text-primary/50 font-sans">✓ AI drafted</span>}
          </div>
          <textarea
            name="content" rows={6} value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Draft your announcement here, or use the AI assistant above…"
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-sm font-medium text-white focus:border-primary/50 outline-none transition-all resize-none leading-relaxed placeholder:text-white/20 font-sans"
          />
        </div>

        {/* ── EMAIL BLAST SETTINGS ──────────────────────────────────── */}
        <div className="border border-white/8 rounded-2xl bg-white/2 p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-6">
            <span className="material-symbols-outlined text-primary text-2xl">mail</span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white font-sans">Email Blast Settings</p>
              <p className="text-[9px] text-white/30 font-sans mt-1">Configure recipients and attachments</p>
            </div>
          </div>

          {/* Email Subject */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">
              Email Subject <span className="text-white/20 normal-case">(defaults to title if blank)</span>
            </label>
            <input
              name="emailSubject" type="text" value={emailSubject}
              onChange={e => setEmailSubject(e.target.value)}
              placeholder="Leave blank to use the announcement title…"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-8 text-sm font-medium text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 font-sans"
            />
          </div>

          {/* Additional Recipients */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">
              Additional Recipients <span className="text-white/20 normal-case">(comma, semicolon, or newline separated)</span>
            </label>
            <textarea
              name="customEmails" rows={3}
              placeholder={'e.g.\nrotarypresident@gmail.com\nguest@yahoo.com, info@partnerclub.org'}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm font-medium text-white focus:border-primary/50 outline-none transition-all resize-none leading-relaxed placeholder:text-white/20 font-sans"
            />
          </div>

          {/* ── FILE ATTACHMENTS ──────────────────────────────────── */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">
              Attachments <span className="text-white/20 normal-case">(PDF, images, docs — sent with every email)</span>
            </label>

            {/* Drop zone */}
            <div
              className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/3 transition-all group"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); }}
              onDrop={e => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files);
                setAttachedFiles(prev => {
                  const existing = new Set(prev.map(f => f.name + f.size));
                  return [...prev, ...files.filter(f => !existing.has(f.name + f.size))];
                });
              }}
            >
              <span className="material-symbols-outlined text-3xl text-white/20 group-hover:text-primary transition-colors">cloud_upload</span>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-2 font-sans group-hover:text-white/60 transition-colors">
                Click or drag &amp; drop files here
              </p>
              <p className="text-[9px] text-white/15 font-sans mt-1">Max 25 MB per file · Multiple files supported</p>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              name="attachments"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Attached files list */}
            {attachedFiles.length > 0 && (
              <div className="space-y-2">
                {attachedFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/8 rounded-xl px-5 py-3">
                    <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">
                      {getFileIcon(file.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate font-sans">{file.name}</p>
                      <p className="text-[9px] text-white/30 font-sans">{formatBytes(file.size)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center flex-shrink-0"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recipient checkboxes */}
          <div className="space-y-4 pt-2 border-t border-white/5">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 font-sans">Recipient Groups</p>

            {/* All registered members */}
            <div className="flex items-start gap-4">
              <input type="checkbox" name="sendEmailBlast" id="sendEmailBlast"
                className="mt-0.5 w-5 h-5 rounded accent-primary cursor-pointer" />
              <div>
                <label htmlFor="sendEmailBlast" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 cursor-pointer font-sans hover:text-white transition-colors block">
                  All Registered Members
                </label>
                <p className="text-[9px] text-white/25 font-sans mt-1">Every user account in the database (BCC batches of 50).</p>
              </div>
            </div>

            {/* Stored blast contacts */}
            <div className="flex items-start gap-4">
              <input type="checkbox" name="includeBlastContacts" id="includeBlastContacts"
                className="mt-0.5 w-5 h-5 rounded accent-primary cursor-pointer" />
              <div>
                <label htmlFor="includeBlastContacts" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 cursor-pointer font-sans hover:text-white transition-colors block">
                  Saved Blast Contacts
                  {blastContactsCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[8px]">
                      {blastContactsCount} contacts
                    </span>
                  )}
                </label>
                <p className="text-[9px] text-white/25 font-sans mt-1">External partners, sponsors, and guests saved in the blast list below.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit" disabled={isSubmitting}
            className="bg-primary text-white font-bold uppercase tracking-[0.4em] text-[11px] px-14 py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group font-sans cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isSubmitting ? (
              <><span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>Posting…</>
            ) : (
              <><span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">send</span>Post Announcement</>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
