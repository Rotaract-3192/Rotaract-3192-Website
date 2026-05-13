import { getEvents, getClubs } from '@/app/actions/queries';
import { createEvent, deleteEvent } from '@/app/actions/mutations';

export const revalidate = 0;

export default async function AdminEventsPage() {
  const [events, clubs] = await Promise.all([getEvents(), getClubs()]);

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tight leading-none">Event Manifest</h1>
          <p className="text-xs text-on-surface-variant font-medium opacity-60 italic">{events.length} events in the system.</p>
        </div>
      </header>

      {/* Create Event Form */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white shadow-xl p-8">
        <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Create New Event</h2>
        <form action={createEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Event Title</label>
            <input name="title" type="text" required placeholder="Event name..." className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Host Club</label>
            <select name="clubId" required className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">Select Club...</option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>{club.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Event Date</label>
            <input name="eventDate" type="datetime-local" required className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Location</label>
            <input name="location" type="text" placeholder="Venue or online link..." className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Description</label>
            <textarea name="description" rows={3} placeholder="Event description..." className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"></textarea>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-primary text-white font-black text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Create Event
            </button>
          </div>
        </form>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-surface-container-lowest rounded-3xl border border-white shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
             <div className="h-48 w-full relative overflow-hidden bg-surface-container-low">
                {event.imageUrl ? (
                  <img src={event.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={event.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-outline-variant/50">event</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-black text-white uppercase tracking-widest border border-white/30">
                  {event.status}
                </div>
             </div>
             <div className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                   <p className="text-[10px] font-black text-primary uppercase tracking-widest">{new Date(event.eventDate).toLocaleDateString()}</p>
                   <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60 truncate max-w-[120px]">{event.location || 'TBD'}</p>
                </div>
                <h3 className="text-lg font-black text-on-surface uppercase tracking-tight leading-tight">{event.title}</h3>
                <div className="pt-4 border-t border-outline/5 flex justify-end">
                   <form action={deleteEvent.bind(null, event.id)}>
                     <button type="submit" className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-all">
                       <span className="material-symbols-outlined text-sm">delete</span>
                     </button>
                   </form>
                </div>
             </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="bg-surface-container-low rounded-3xl border border-outline-variant/30 py-20 text-center space-y-4">
          <span className="material-symbols-outlined text-4xl text-primary/20">event</span>
          <p className="text-sm font-black text-on-surface-variant/40 uppercase tracking-widest">No events yet. Create one above.</p>
        </div>
      )}
    </div>
  );
}
