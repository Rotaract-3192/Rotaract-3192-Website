import { getFeeds } from '@/app/actions/queries';
import NewsClient from './NewsClient';

export const revalidate = 0;

export default async function NewsPage() {
  const feedsData = await getFeeds();
  
  const newsData = feedsData.map(feed => ({
    id: feed.id,
    title: feed.title,
    excerpt: feed.content?.substring(0, 150) + '...' || 'Latest updates from the district.',
    category: (feed.type || 'DISTRICT NEWS').toUpperCase(),
    date: feed.createdAt ? new Date(feed.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
    image_url: feed.mediaUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80',
    author: 'District Editorial'
  }));

  return <NewsClient newsData={newsData} />;
}
