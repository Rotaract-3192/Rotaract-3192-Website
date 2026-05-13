import { getJobs } from '@/app/actions/queries';
import JobsClient from './JobsClient';

export const revalidate = 0; // Disable caching for now to ensure we see fresh data

export default async function JobsPage() {
  const jobsData = await getJobs();
  
  return <JobsClient jobsData={jobsData} />;
}
