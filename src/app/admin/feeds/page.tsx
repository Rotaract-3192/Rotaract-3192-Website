import { getFeeds } from '@/app/actions/queries';
import { createFeed, deleteFeed } from '@/app/actions/mutations';

export const revalidate = 0;

export default async function AdminFeedsPage() {
  const feedItems = await getFeeds();

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-on-surface">
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tight leading-none">Feed Moderation</h1>
          <p className="text-xs text-on-surface-variant font-medium opacity-60 italic">{feedItems.length} items in the content stream.</p>
        </div>
      </header>

      {/* Create Feed Form */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white shadow-xl p-8">
        <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Publish New Post</h2>
        <form action={createFeed} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Title</label>
            <input name="title" type="text" required placeholder="Post title..." className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Type</label>
            <select name="type" className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="post">Post</option>
              <option value="news">News</option>
              <option value="announcement">Announcement</option>
              <option value="event">Event</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Content</label>
            <textarea name="content" required rows={4} placeholder="Post content..." className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"></textarea>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Media URL (optional)</label>
            <input name="mediaUrl" type="url" placeholder="https://..." className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full bg-primary text-white font-black text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Publish Post
            </button>
          </div>
        </form>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {feedItems.length === 0 ? (
          <div className="text-center py-16 text-on-surface-variant/50 text-sm font-bold uppercase tracking-widest">
            No feed items yet. Publish your first post above.
          </div>
        ) : (
          feedItems.map((feed) => (
            <div key={feed.id} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-md p-6 flex items-start justify-between gap-6 group hover:shadow-lg transition-all">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[9px] font-black uppercase tracking-widest">{feed.type || 'post'}</span>
                  <p className="text-[10px] text-on-surface-variant opacity-50">{feed.createdAt ? new Date(feed.createdAt).toLocaleDateString() : ''}</p>
                </div>
                <h3 className="text-base font-black text-on-surface uppercase tracking-tight">{feed.title}</h3>
                <p className="text-xs text-on-surface-variant opacity-70 line-clamp-2">{feed.content}</p>
              </div>
              <form action={deleteFeed.bind(null, feed.id)}>
                <button type="submit" className="w-9 h-9 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-all opacity-0 group-hover:opacity-100">
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
