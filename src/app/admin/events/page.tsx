import { getEvents, getClubs } from '@/app/actions/queries';
import { deleteEvent } from '@/app/actions/mutations';
import Image from 'next/image';
import EventForm from './EventForm';

export const revalidate = 0;

export default async function AdminEventsPage() {
  const [events, clubs] = await Promise.all([getEvents(), getClubs()]);

  return (
    <div className="space-y-16 pb-24">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Ops Registry</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            Event & <span className="text-primary">Project Management</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {events.length} active entries synchronized in the district system.
          </p>
        </div>
      </header>

      {/* Create Event/Project Form */}
      <section className="glass-panel p-10 lg:p-14 relative overflow-hidden">
        <div className="flex items-center gap-8 mb-12">
           <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <span className="material-symbols-outlined text-3xl">add_circle</span>
           </div>
           <div>
              <h2 className="text-3xl font-bold font-display uppercase tracking-tight leading-none text-white">Create <span className="text-primary">Entry</span></h2>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] opacity-40 mt-3 font-sans">Initialize new district event or project protocol</p>
           </div>
        </div>

        <EventForm clubs={clubs} />
      </section>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event) => (
          <div key={event.id} className="glass-panel group overflow-hidden hover:border-primary/30 transition-all duration-700 flex flex-col relative">
             <div className="h-56 w-full relative overflow-hidden bg-white/5">
                {event.imageUrl ? (
                  <Image src={event.imageUrl} fill className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" alt={event.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10">
                    <span className="material-symbols-outlined text-6xl text-primary/10 group-hover:scale-125 transition-transform duration-700">event</span>
                  </div>
                )}
                <div className="absolute top-6 right-6 px-4 py-1.5 bg-primary/90 backdrop-blur-md text-white rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border border-white/10 shadow-xl">
                  {event.status}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
             </div>
             
             <div className="p-8 space-y-8 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                       <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-sans">
                         {event.yearDateLabel || (event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'NO DATE')}
                       </p>
                    </div>
                    <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-base text-primary">location_on</span>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest truncate max-w-[100px] font-sans">{event.location || 'PENDING'}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white font-display uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{event.title}</h3>
                  
                  <p className="text-sm text-text-muted font-medium line-clamp-3 opacity-60 leading-relaxed font-sans">
                    {event.description || 'Event description pending district synchronization.'}
                  </p>
                </div>
                
                <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                     <span className="text-[9px] font-bold text-text-muted/40 uppercase tracking-[0.2em] font-sans">Verified</span>
                   </div>
                   <form action={deleteEvent.bind(null, event.id)}>
                     <button type="submit" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all group/del">
                       <span className="material-symbols-outlined text-lg group-hover/del:scale-110 transition-transform">delete</span>
                     </button>
                   </form>
                </div>
             </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="glass-panel py-40 text-center space-y-8 border-dashed">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
            <span className="material-symbols-outlined text-4xl text-white/10">event_busy</span>
          </div>
          <p className="text-[10px] font-bold text-text-muted/30 uppercase tracking-[0.5em] font-sans">No Active Events Found</p>
        </div>
      )}
    </div>
  );
}
