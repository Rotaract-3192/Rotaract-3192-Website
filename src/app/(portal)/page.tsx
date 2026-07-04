import { CLUBS_DATA } from '@/lib/clubs-data';
import HomeClient from './HomeClient';

export const revalidate = 3600;

export default async function HomePage() {
  const communityClubs = CLUBS_DATA.filter(c => c.type === 'Community Based').length;
  const institutionClubs = CLUBS_DATA.filter(c => c.type === 'Institution Based').length;

  return <HomeClient 
    clubsData={CLUBS_DATA} 
    usersCount={0}
    clubsCount={CLUBS_DATA.length}
    projectsCount={0}
    charteredClubsCount={communityClubs}
  />;
}
