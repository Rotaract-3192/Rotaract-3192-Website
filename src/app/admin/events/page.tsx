import { getEvents, getClubs } from '@/app/actions/queries';
import { createEvent, deleteEvent } from '@/app/actions/mutations';

export const revalidate = 0;

export default async function AdminEventsPage() {
  const [events, clubs] = await Promise.all([getEvents(), getClubs()]);

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tight leading-none text-on-surface">Event Manifest</h1>
          <p className="text-xs text-on-surface-variant font-medium opacity-60 italic">{events.length} Synchronized signals in the system.</p>
        </div>
      </header>

      {/* Create Event Form */}
      <section className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white p-10 shadow-2xl shadow-primary/5">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <span className="material-symbols-outlined">event_available</span>
           </div>
           <div>
              <h2 className="text-xl font-black uppercase tracking-tight leading-none text-on-surface">Initialize Event</h2>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest opacity-40 mt-1">NEW DISTRICT SIGNAL ENTRY</p>
           </div>
        </div>

        <form action={createEvent} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-4">Event Designation</label>
              <input 
                name="title" 
                type="text" 
                placeholder="District Assembly 2024" 
                required
                className="w-full bg-surface-container-low border border-outline/10 rounded-2xl py-4 px-6 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-4">Origin Node (Host Club)</label>
              <select 
                name="clubId" 
                required
                className="w-full bg-surface-container-low border border-outline/10 rounded-2xl py-4 px-6 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all appearance-none"
              >
                <option value="">Select Club Node...</option>
                {clubs.map((club) => (
                  <option key={club.id} value={club.id}>{club.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-4">Chronology Signal (Date & Time)</label>
              <input 
                name="eventDate" 
                type="datetime-local" 
                required
                className="w-full bg-surface-container-low border border-outline/10 rounded-2xl py-4 px-6 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-4">Geographic Coordinates (Location)</label>
              <input 
                name="location" 
                type="text" 
                placeholder="Venue, City or Digital Link" 
                className="w-full bg-surface-container-low border border-outline/10 rounded-2xl py-4 px-6 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-4">Event Payload (Description)</label>
            <textarea 
              name="description" 
              rows={4}
              placeholder="Enter event details, objectives, and agenda..." 
              className="w-full bg-surface-container-low border border-outline/10 rounded-2xl py-4 px-6 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all resize-none"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              className="bg-primary text-white font-black uppercase tracking-widest text-[10px] px-12 py-5 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined text-base">rocket_launch</span>
              Execute Entry
            </button>
          </div>
        </form>
      </section>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-[2.5rem] border border-outline/5 shadow-ambient overflow-hidden group hover:shadow-2xl transition-all duration-700 flex flex-col">
             <div className="h-56 w-full relative overflow-hidden bg-surface-container-low">
                {event.imageUrl ? (
                  <img src={event.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={event.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-container-low to-surface-container-high">
                    <span className="material-symbols-outlined text-5xl text-primary/10 group-hover:scale-125 transition-transform duration-700">event</span>
                  </div>
                )}
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/20 backdrop-blur-xl rounded-xl text-[9px] font-black text-white uppercase tracking-[0.2em] border border-white/30 shadow-xl">
                  {event.status}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             </div>
             <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{new Date(event.eventDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-[12px]">location_on</span>
                      <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest truncate max-w-[100px]">{event.location || 'TBD'}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-on-surface uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-[11px] text-on-surface-variant font-medium line-clamp-2 opacity-60 leading-relaxed italic">
                    {event.description || 'No description provided for this synchronized signal.'}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-outline/5 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                     <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-widest">LIVE DATA</span>
                   </div>
                   <form action={deleteEvent.bind(null, event.id)}>
                     <button type="submit" className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                       <span className="material-symbols-outlined text-lg">delete</span>
                     </button>
                   </form>
                </div>
             </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="bg-surface-container-low rounded-[3rem] border border-outline-variant/30 py-32 text-center space-y-6 border-dashed">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-4xl text-primary/20">event_busy</span>
          </div>
          <p className="text-sm font-black text-on-surface-variant/40 uppercase tracking-[0.3em] italic">No active signals in manifest. Initialize one above.</p>
        </div>
      )}
    </div>
  );
}
