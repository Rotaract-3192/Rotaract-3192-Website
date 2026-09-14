import { redirect } from 'next/navigation';

export default async function EventProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`https://events.rotaract3192.org/${slug}`);
}

