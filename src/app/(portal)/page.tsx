import { CLUBS_DATA } from '@/lib/clubs-data';
import HomeClient from './HomeClient';

export default function HomePage() {
  return (
    <HomeClient 
      clubsData={CLUBS_DATA} 
      usersCount={2133}
      clubsCount={84}
      projectsCount={0}
      charteredClubsCount={0}
    />
  );
}

