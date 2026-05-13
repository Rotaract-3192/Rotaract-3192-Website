import { getMoms, getClubs } from '@/app/actions/queries';
import { createMom, deleteMom } from '@/app/actions/mutations';

export const revalidate = 0;

export default async function AdminMomPage() {
  const [moms, clubs] = await Promise.all([getMoms(), getClubs()]);

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tight leading-none">Meeting Records</h1>
          <p className="text-xs text-on-surface-variant font-medium opacity-60 italic">Official Minutes of Meetings Repository — {moms.length} records</p>
        </div>
      </header>

      {/* Create MOM Form */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white shadow-xl p-8">
        <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Record New Meeting</h2>
        <form action={createMom} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Meeting Title</label>
            <input name="title" type="text" required placeholder="e.g. Monthly Board Meeting — May 2025" className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Club</label>
            <select name="clubId" className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">District (All Clubs)</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>{club.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Meeting Date</label>
            <input name="meetingDate" type="date" required className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full bg-primary text-white font-black text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Save Record
            </button>
          </div>
        </form>
      </div>

      {/* MOM Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {moms.map((mom) => (
          <div key={mom.id} className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-surface-container-low text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-xl">history_edu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest 
                  ${mom.status === 'transcribed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                  {mom.status}
                </span>
                <form action={deleteMom.bind(null, mom.id)}>
                  <button type="submit" className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-all opacity-0 group-hover:opacity-100">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </form>
              </div>
            </div>
            <h4 className="text-base font-black text-on-surface uppercase tracking-tight mb-2 group-hover:text-primary transition-colors leading-tight">{mom.title}</h4>
            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest flex items-center gap-2 opacity-60 mt-auto italic">
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              {new Date(mom.meetingDate).toLocaleDateString()}
            </p>
          </div>
        ))}

        {moms.length === 0 && (
          <div className="col-span-full text-center py-16 text-on-surface-variant/50 text-sm font-bold uppercase tracking-widest">
            No meeting records yet. Create one above.
          </div>
        )}
      </div>
    </div>
  );
}
