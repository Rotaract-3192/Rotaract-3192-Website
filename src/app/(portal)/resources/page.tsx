import { getResources, getDistrictSettings } from '@/app/actions/queries';
import ResourcesClient from './ResourcesClient';

export const revalidate = 0;

export default async function ResourcesPage() {
  const [resources, settings] = await Promise.all([
    getResources(),
    getDistrictSettings()
  ]);
  
  return (
    <ResourcesClient 
      resources={resources} 
      linkUrl={settings.resource_link_url || 'https://drive.google.com/drive/folders/1BamhCLMTs0RHH0TBTartmTxHqAFRhbE3?usp=sharing'} 
      videoUrl={settings.resource_video_url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
    />
  );
}
