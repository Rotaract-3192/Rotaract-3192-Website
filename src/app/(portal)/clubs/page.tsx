import { getClubs } from '@/app/actions/queries';
import ClubsClient from './ClubsClient';

export const revalidate = 0; // Disable caching for now to ensure we see fresh data

export default async function ClubsPage() {
  const clubsData = await getClubs();
  
  return <ClubsClient clubsData={clubsData} />;
}
