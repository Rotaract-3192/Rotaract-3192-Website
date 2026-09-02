import { CLUBS_DATA } from '@/lib/clubs-data';
import HomeClient from './HomeClient';
import { getDistrictStats } from '@/app/actions/queries';

export const revalidate = 3600;

export default async function HomePage() {
  const stats = await getDistrictStats();

  return <HomeClient 
    clubsData={CLUBS_DATA} 
    usersCount={stats.totalMembers}
    clubsCount={stats.totalClubs}
    projectsCount={stats.totalProjects}
    charteredClubsCount={stats.totalCharteredClubs}
  />;
}
