import { getResources } from '@/app/actions/queries';
import ResourcesClient from './ResourcesClient';

export const revalidate = 0;

export default async function ResourcesPage() {
  const resources = await getResources();
  return <ResourcesClient resources={resources} />;
}
