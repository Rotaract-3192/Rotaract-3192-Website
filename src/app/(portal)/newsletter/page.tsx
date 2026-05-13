import { getNewsletters } from '@/app/actions/queries';
import NewsletterClient from './NewsletterClient';

export const revalidate = 0; // Disable caching for now to ensure we see fresh data

export default async function NewsletterPage() {
  const newslettersData = await getNewsletters();
  
  return <NewsletterClient newslettersData={newslettersData} />;
}
