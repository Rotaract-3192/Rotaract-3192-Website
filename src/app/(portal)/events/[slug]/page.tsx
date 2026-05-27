import { getEventBySlug } from "@/app/actions/queries";
import { notFound } from "next/navigation";
import EventProfileClient from "./EventProfileClient";

export default async function EventProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  
  if (!event) {
    notFound();
  }

  return (
    <EventProfileClient 
      event={event} 
    />
  );
}
