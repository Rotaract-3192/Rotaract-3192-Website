import { getClubs, getUsers, getEvents } from '@/app/actions/queries';
import HomeClient from './HomeClient';

export const revalidate = 0; // Disable caching for now to ensure we see fresh data

export default async function HomePage() {
  const [clubsData, usersData, eventsData] = await Promise.all([
    getClubs(),
    getUsers(),
    getEvents()
  ]);
  
  return <HomeClient 
    clubsData={clubsData} 
    usersCount={usersData.length} 
    eventsCount={eventsData.length} 
  />;
}
