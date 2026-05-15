import { getClubs, getDistrictStats } from '@/app/actions/queries';
import HomeClient from './HomeClient';

export const revalidate = 0; // Disable caching for now to ensure we see fresh data

export default async function HomePage() {
  const [clubsData, stats] = await Promise.all([
    getClubs(),
    getDistrictStats()
  ]);
  
  return <HomeClient 
    clubsData={clubsData} 
    usersCount={stats.totalMembers} 
    eventsCount={stats.totalEvents} 
  />;
}
