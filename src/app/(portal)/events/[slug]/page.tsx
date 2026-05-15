import { getEventBySlug } from "@/app/actions/queries";
import { notFound } from "next/navigation";
import EventProfileClient from "./EventProfileClient";

export default async function EventProfilePage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  
  if (!event) {
    notFound();
  }

  return (
    <EventProfileClient 
      event={event} 
    />
  );
}
