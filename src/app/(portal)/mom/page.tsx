import { getMOMs } from '@/app/actions/queries';
import MomClient from './MomClient';

export const revalidate = 0; // Disable caching for now to ensure we see fresh data

export default async function MOMPage() {
  const momsData = await getMOMs();
  
  return <MomClient momsData={momsData} />;
}
