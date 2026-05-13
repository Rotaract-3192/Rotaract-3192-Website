import { getMentors } from '@/app/actions/queries';
import MentorshipClient from './MentorshipClient';

export const revalidate = 0;

export default async function MentorshipPage() {
  const mentors = await getMentors();
  return <MentorshipClient mentors={mentors} />;
}
