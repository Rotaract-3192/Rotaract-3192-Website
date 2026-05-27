import { getClubs } from '@/app/actions/queries';
import AdminClubsClient from './AdminClubsClient';

export const revalidate = 0;

export default async function AdminClubsPage() {
  const clubs = await getClubs();
  return <AdminClubsClient clubs={clubs} />;
}
