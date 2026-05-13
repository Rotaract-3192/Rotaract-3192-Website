import { getFeeds } from '@/app/actions/queries';
import NewsClient from './NewsClient';

export const revalidate = 0;

export default async function NewsPage() {
  const feedsData = await getFeeds();
  return <NewsClient feedsData={feedsData} />;
}
