import { getEvents, getClubs } from '@/app/actions/queries';
import EventsManagerClient from './EventsManagerClient';
import NewEventButton from '@/components/admin/NewEventButton';

export const revalidate = 0;

export default async function AdminEventsPage() {
  const [events, clubs] = await Promise.all([getEvents(true), getClubs()]);

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
            {events.filter(e => e.status !== 'trash').length} active entries synchronized in the district system.
          </p>
        </div>
        <NewEventButton clubs={clubs} />
      </header>

      {/* Database/Table Interface */}
      <section className="space-y-8">
        <EventsManagerClient initialEvents={events} clubs={clubs} />
      </section>
    </div>
  );
}
