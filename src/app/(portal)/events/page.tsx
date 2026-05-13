import { getEvents } from '@/app/actions/queries';
import EventsClient from './EventsClient';

export const revalidate = 0; // Disable caching for now to ensure we see fresh data

export default async function EventsPage() {
  const eventsData = await getEvents();
  
  return <EventsClient eventsData={eventsData} />;
}
