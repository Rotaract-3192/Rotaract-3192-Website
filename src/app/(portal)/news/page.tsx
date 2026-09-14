import NewsClient from './NewsClient';

export default function NewsPage() {
  const newsData = [
    {
      id: '1',
      title: 'District 3192 Concludes Annual Leadership Assembly',
      excerpt: 'Over 500 young leaders and Rotaract delegates gathered in Bengaluru for the ceremonial installation and strategic leadership conclave.',
      category: 'DISTRICT NEWS',
      date: 'Jul 15, 2026',
      image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
      author: 'District Editorial'
    },
    {
      id: '2',
      title: 'Rotary International RY 2026-27 Strategic Directives Announced',
      excerpt: 'Key focus areas include youth empowerment, sustainable water conservation projects, and digital literacy across schools.',
      category: 'GLOBAL ROTARY',
      date: 'Jul 10, 2026',
      image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80',
      author: 'District Editorial'
    },
    {
      id: '3',
      title: 'RotaMate AI Assistant Launches Across District Clubs',
      excerpt: 'The official WhatsApp AI buddy provides seamless reporting assistance, event guidance, and club information on demand.',
      category: 'INNOVATION',
      date: 'Jul 04, 2026',
      image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
      author: 'Tech Secretariat'
    }
  ];

  return <NewsClient newsData={newsData} />;
}

