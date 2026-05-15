import { getNewsletters } from '@/app/actions/queries';
import NewsletterClient from './NewsletterClient';

export const revalidate = 0; // Disable caching for now to ensure we see fresh data

export default async function NewsletterPage() {
  const newslettersData = await getNewsletters();
  
  const mappedNewsletters = newslettersData.map((nl, idx) => ({
    id: nl.id,
    title: nl.title,
    issue_number: (idx + 1).toString().padStart(2, '0'),
    publish_date: nl.issueDate ? new Date(nl.issueDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown Date',
    download_url: nl.fileUrl || '#',
    thumbnail_url: nl.thumbnailUrl || 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80',
    description: 'Official District Newsletter capturing the moments and milestones of our service journey.'
  }));

  return <NewsletterClient newsletters={mappedNewsletters} />;
}
