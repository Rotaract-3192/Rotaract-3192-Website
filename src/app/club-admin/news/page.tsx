import { getDb } from '@/lib/db';
import { auth } from '@/lib/mockAuth';
import { users, clubs, feeds } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { deleteFeed } from '@/app/actions/mutations';
import NewClubNewsButton from '@/components/club-admin/NewClubNewsButton';

export const revalidate = 0;

async function getClubContext() {
  const { userId } = await auth();
  if (!userId) {
    return { club: null };
  }
  const db = getDb();
  const u = await db.query.users.findFirst({ where: eq(users.id, userId) });
  const club = u?.clubId
    ? await db.query.clubs.findFirst({ where: eq(clubs.id, u.clubId) })
    : await db.query.clubs.findFirst();
  return { club };
}

export default async function ClubNewsPage() {
  const { club } = await getClubContext();
  const db = getDb();
  const posts = await db.query.feeds.findMany();

  return (
    <div className="space-y-14 pb-24">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.4em] font-sans">News & Blogs</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white font-display uppercase leading-none">
            Club <span className="text-purple-400">News</span>
          </h1>
          <p className="text-white/40 text-sm font-sans">{posts.length} posts published · {club?.name ?? 'Your Club'}</p>
        </div>
        <NewClubNewsButton />
      </header>

      {/* Posts List */}
      <section className="glass-panel overflow-hidden border border-purple-500/10">
        <div className="px-8 py-6 border-b border-purple-500/10 bg-purple-500/5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-display uppercase">Published <span className="text-purple-400">Posts</span></h2>
          <span className="text-[10px] font-bold text-purple-400 bg-purple-500/5 px-4 py-1.5 rounded-full border border-purple-500/10 font-sans">{posts.length} Posts</span>
        </div>
        <div className="divide-y divide-white/5">
          {posts.length === 0 ? (
            <div className="py-24 text-center text-xs text-white/20 uppercase tracking-widest font-sans">
              No posts yet — click "Write Post" to publish one
            </div>
          ) : posts.map((p, i) => (
            <div key={i} className="flex items-start justify-between px-8 py-6 hover:bg-white/5 transition-all group border-l-4 border-transparent hover:border-purple-500">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="material-symbols-outlined text-purple-400 text-base">article</span>
                </div>
                <div>
                  <p className="font-bold text-white uppercase font-display group-hover:text-purple-400 transition-colors">{p.title}</p>
                  <p className="text-[11px] text-white/30 font-sans mt-1 line-clamp-2 max-w-xl">{p.content}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[9px] text-purple-400/60 font-black uppercase tracking-[0.3em] border border-purple-500/20 bg-purple-500/5 px-2 py-0.5 rounded font-sans">{p.type}</span>
                    <span className="text-[9px] text-white/20 font-sans">
                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
                    </span>
                  </div>
                </div>
              </div>
              <form action={deleteFeed.bind(null, p.id)}>
                <button type="submit"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
