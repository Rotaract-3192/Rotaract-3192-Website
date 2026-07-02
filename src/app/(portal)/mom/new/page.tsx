import { getClubs } from '@/app/actions/queries';
import MOMCreationClient from './MOMCreationClient';

export const revalidate = 0;

export default async function NewMOMPage() {
  const clubs = await getClubs();
  
  return <MOMCreationClient clubsList={clubs} />;
}
