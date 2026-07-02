import { notFound } from 'next/navigation';
import { getMomById, getClubs } from '@/app/actions/queries';
import Link from 'next/link';

export const revalidate = 0;

export default async function MomDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const mom = await getMomById(id);

  if (!mom) {
    notFound();
  }

  const clubsList = await getClubs();
  const originClub = mom.clubId 
    ? clubsList.find(c => c.id === mom.clubId) 
    : null;

  return (
    <main className="max-w-4xl mx-auto min-h-screen relative overflow-visible pb-32 pt-32 px-8">
      {/* Background Accents */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -z-10"></div>

      <header className="flex items-center gap-10 mb-16">
        <Link href="/mom" className="w-16 h-16 rounded-full bg-white/5 border border-white/10 hover:border-primary/30 flex items-center justify-center text-primary transition-all shrink-0 shadow-lg group">
          <span className="material-symbols-outlined text-2xl group-hover:translate-x-[-4px] transition-transform">arrow_back</span>
        </Link>
        <div className="space-y-2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Session Document</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter font-display uppercase leading-none italic">{mom.title}</h1>
        </div>
      </header>

      <article className="bg-white/5 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-20 border border-white/10 shadow-ambient space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/10 pb-12">
          <div className="space-y-2">
            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] font-sans">Origin Node</h4>
            <p className="text-xl font-bold text-white uppercase tracking-tight font-display">{originClub ? originClub.name : 'District Authority'}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] font-sans">Temporal Frame</h4>
            <p className="text-xl font-bold text-white uppercase tracking-tight font-display">
              {new Date(mom.meetingDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-white uppercase tracking-tight font-display italic">Minutes <span className="text-primary not-italic">Transcription.</span></h3>
          <p className="text-text-muted text-base font-medium leading-relaxed font-sans whitespace-pre-line">
            This meeting minutes document was successfully registered. Details, action items, and structural milestones have been processed.
          </p>
        </div>

        {mom.fileUrl && (
          <div className="pt-10 border-t border-white/10 flex justify-end">
            <a 
              href={mom.fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary text-white font-black text-[10px] uppercase tracking-[0.3em] px-12 py-5 rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-3 group"
            >
              <span className="material-symbols-outlined text-xl">description</span>
              Download Official Document
            </a>
          </div>
        )}
      </article>
    </main>
  );
}
