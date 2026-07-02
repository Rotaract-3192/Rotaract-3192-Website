'use client';

import { useMemo } from 'react';
import { trackAnalyticsEvent } from '@/app/actions/mutations';

type Resource = {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string | null;
  r2Key: string;
  uploadedBy: string;
  category: string | null;
  isPublic: boolean | null;
  createdAt: Date | null;
};

function getFileTypeLabel(mimeType: string | null, fileName: string): string {
  if (!mimeType) {
    const ext = fileName.split('.').pop()?.toUpperCase();
    return ext ?? 'FILE';
  }
  if (mimeType.includes('pdf')) return 'PDF';
  if (mimeType.includes('word') || mimeType.includes('docx')) return 'DOCX';
  if (mimeType.includes('sheet') || mimeType.includes('xlsx')) return 'XLSX';
  if (mimeType.includes('png')) return 'PNG';
  if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'JPG';
  return mimeType.split('/')[1]?.toUpperCase() ?? 'FILE';
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function typeColorClass(type: string): string {
  if (type === 'PDF') return 'bg-red-500/10 text-red-600';
  if (type === 'DOCX') return 'bg-blue-500/10 text-blue-600';
  if (type === 'XLSX') return 'bg-green-500/10 text-green-600';
  if (type === 'PNG' || type === 'JPG') return 'bg-purple-500/10 text-purple-600';
  return 'bg-primary/10 text-primary';
}

export default function ResourcesClient({ 
  resources,
  linkUrl,
  videoUrl
}: { 
  resources: Resource[];
  linkUrl: string;
  videoUrl: string;
}) {
  // Group by category
  const grouped = useMemo(() => {
    const map: Record<string, Resource[]> = {};
    for (const r of resources) {
      const cat = r.category ?? 'General';
      if (!map[cat]) map[cat] = [];
      map[cat].push(r);
    }
    return map;
  }, [resources]);

  const categories = Object.keys(grouped);

  const isEmpty = resources.length === 0;

  return (
    <main className="max-w-7xl mx-auto min-h-screen relative overflow-visible pb-24">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 left-64 w-[400px] h-[400px] bg-secondary-container/5 rounded-full blur-[100px] -z-10" />

      <header className="p-8 md:p-12 mb-12">
        <div className="flex flex-col gap-4">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">The Vault</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4 font-display uppercase italic">Resource <span className="text-primary not-italic">Central.</span></h1>
          <p className="text-xl text-white/80 font-medium max-w-2xl leading-tight italic">
            Official documents, templates, and guidelines for District 3192 clubs.
          </p>
        </div>
      </header>

      {/* Dynamic Resource Action Buttons */}
      <section className="px-8 md:px-12 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl">
          {/* Link Button */}
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackAnalyticsEvent("resource_click", `Link: ${linkUrl}`).catch(e => console.error(e));
            }}
            className="group relative flex items-center justify-between p-8 bg-gradient-to-r from-primary/10 to-blue-500/10 hover:from-primary/20 hover:to-blue-500/20 border border-white/5 hover:border-primary/30 rounded-[2.5rem] transition-all duration-500 shadow-xl hover:-translate-y-1 no-underline"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">open_in_new</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider font-display italic">External Library</h3>
                <p className="text-[10px] text-text-muted uppercase tracking-widest font-sans opacity-60">Access shared drive resources</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors group-hover:translate-x-2 duration-300">arrow_forward</span>
          </a>

          {/* Video Button */}
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackAnalyticsEvent("video_click", `Video: ${videoUrl}`).catch(e => console.error(e));
            }}
            className="group relative flex items-center justify-between p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-white/5 hover:border-purple-500/30 rounded-[2.5rem] transition-all duration-500 shadow-xl hover:-translate-y-1 no-underline"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">smart_display</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider font-display italic">Video Academy</h3>
                <p className="text-[10px] text-text-muted uppercase tracking-widest font-sans opacity-60">Watch training & tutorials</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-white/20 group-hover:text-purple-400 transition-colors group-hover:translate-x-2 duration-300">arrow_forward</span>
          </a>
        </div>
      </section>


      {isEmpty ? (
        <section className="min-h-[60vh] flex items-center justify-center p-8 md:p-12">
          <a
            href="https://drive.google.com/drive/folders/1BamhCLMTs0RHH0TBTartmTxHqAFRhbE3?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-6 bg-primary text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all z-20"
          >
            Open Resource Library
          </a>
        </section>
      ) : (
        <section className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-28 bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 shadow-ambient">
                <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-8 opacity-60">Categories</h3>
                <ul className="space-y-6">
                  {categories.map((cat, i) => (
                    <li key={i}>
                      <a
                        href={`#cat-${encodeURIComponent(cat)}`}
                        className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-text-muted hover:text-primary transition-all"
                      >
                        <span className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-primary transition-all group-hover:scale-125" />
                        {cat}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Documents List */}
            <div className="lg:col-span-9 space-y-20">
              {categories.map((cat) => (
                <div key={cat} id={`cat-${encodeURIComponent(cat)}`} className="scroll-mt-32 space-y-10">
                  <div className="flex items-center gap-8">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter shrink-0 font-display italic">{cat}</h2>
                    <div className="h-px flex-grow bg-white/10" />
                  </div>

                  <div className="grid gap-8">
                    {grouped[cat].map((doc) => {
                      const type = getFileTypeLabel(doc.mimeType, doc.fileName);
                      const dateStr = doc.createdAt
                        ? new Date(doc.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
                        : '';
                      return (
                        <div
                          key={doc.id}
                          className="group p-8 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 shadow-ambient hover:bg-white/10 hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
                        >
                          <div className="flex items-center gap-8">
                            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110 ${typeColorClass(type)}`}>
                              <span className="text-[10px] font-black uppercase tracking-widest leading-none">{type}</span>
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-2xl font-black text-white tracking-tight group-hover:text-primary transition-colors leading-tight font-display italic">
                                {doc.fileName}
                              </h4>
                              <div className="flex items-center gap-5 text-[10px] font-black text-text-muted/40 uppercase tracking-[0.2em] italic">
                                <span className="flex items-center gap-2">
                                  <span className="material-symbols-outlined text-lg leading-none">database</span>
                                  {formatBytes(doc.fileSize)}
                                </span>
                                {dateStr && (
                                  <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg leading-none">history</span>
                                    {dateStr}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <a
                            href={`/api/resources/${doc.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-10 py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 whitespace-nowrap overflow-hidden relative group/btn"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
                            <span className="material-symbols-outlined text-xl relative z-10">download</span>
                            <span className="relative z-10">Download Asset</span>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}
    </main>
  );
}
