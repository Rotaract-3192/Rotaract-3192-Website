'use client';

import { useMemo } from 'react';

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

export default function ResourcesClient({ resources }: { resources: Resource[] }) {
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
    <main className="lg:ml-64 min-h-screen relative overflow-visible pb-24">
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 left-64 w-[400px] h-[400px] bg-secondary-container/5 rounded-full blur-[100px] -z-10" />

      <header className="p-8 md:p-12 mb-12">
        <div className="flex flex-col gap-4">
          <span className="text-primary font-bold uppercase tracking-widest text-xs">The Vault</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface">Resource Central</h1>
          <p className="text-xl text-on-surface-variant font-medium max-w-2xl leading-relaxed">
            Official documents, templates, and guidelines for District 3192 clubs.
          </p>
        </div>
      </header>

      {isEmpty ? (
        <section className="p-8 md:p-12">
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <span className="material-symbols-outlined text-6xl text-outline/30">folder_open</span>
            <h3 className="text-2xl font-black text-on-surface">No resources yet</h3>
            <p className="text-on-surface-variant max-w-sm">
              District admins can upload documents and assets from the Admin Portal and mark them as public to appear here.
            </p>
          </div>
        </section>
      ) : (
        <section className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-12 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/20 shadow-sm bg-surface-container-low/50">
                <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-6 opacity-60">Categories</h3>
                <ul className="space-y-4">
                  {categories.map((cat, i) => (
                    <li key={i}>
                      <a
                        href={`#cat-${encodeURIComponent(cat)}`}
                        className="group flex items-center gap-3 text-sm font-bold text-on-surface-variant hover:text-primary transition-all"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-outline/20 group-hover:bg-primary transition-all" />
                        {cat}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Documents List */}
            <div className="lg:col-span-9 space-y-16">
              {categories.map((cat) => (
                <div key={cat} id={`cat-${encodeURIComponent(cat)}`} className="scroll-mt-12 space-y-8">
                  <div className="flex items-center gap-6">
                    <h2 className="text-2xl font-black text-on-surface uppercase tracking-tight shrink-0">{cat}</h2>
                    <div className="h-px flex-grow bg-outline/10" />
                  </div>

                  <div className="grid gap-6">
                    {grouped[cat].map((doc) => {
                      const type = getFileTypeLabel(doc.mimeType, doc.fileName);
                      const dateStr = doc.createdAt
                        ? new Date(doc.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
                        : '';
                      return (
                        <div
                          key={doc.id}
                          className="group p-8 bg-surface-container-lowest/70 backdrop-blur-xl rounded-[2.5rem] border border-white/40 shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
                        >
                          <div className="flex items-center gap-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110 ${typeColorClass(type)}`}>
                              <span className="text-[10px] font-black uppercase tracking-widest leading-none">{type}</span>
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xl font-black text-on-surface tracking-tight group-hover:text-primary transition-colors leading-tight">
                                {doc.fileName}
                              </h4>
                              <div className="flex items-center gap-4 text-[9px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">
                                <span className="flex items-center gap-1.5">
                                  <span className="material-symbols-outlined text-sm leading-none opacity-50">database</span>
                                  {formatBytes(doc.fileSize)}
                                </span>
                                {dateStr && (
                                  <span className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-sm leading-none opacity-50">history</span>
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
                            className="px-8 py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap"
                          >
                            <span className="material-symbols-outlined text-lg">download</span>
                            Download Asset
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
