import MentorshipClient from './MentorshipClient';
import { staticMentors } from '@/data/mentorsData';

export default function MentorshipPage() {
  return <MentorshipClient mentors={staticMentors} />;
}
