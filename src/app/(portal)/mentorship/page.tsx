import { getUsers } from '@/app/actions/queries';
import MentorshipClient from './MentorshipClient';

export const revalidate = 0;

export default async function MentorshipPage() {
  const usersData = await getUsers();
  return <MentorshipClient usersData={usersData} />;
}
