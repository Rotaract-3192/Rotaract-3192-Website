import { getCourses } from '@/app/actions/queries';
import LMSClient from './LMSClient';

export const revalidate = 0; // Disable caching for now to ensure we see fresh data

export default async function LMSPage() {
  const coursesData = await getCourses();
  
  return <LMSClient coursesData={coursesData} />;
}
