import LMSClient from './LMSClient';
import { staticCourses } from '@/data/coursesData';

export default function LMSPage() {
  return <LMSClient coursesData={staticCourses} />;
}
