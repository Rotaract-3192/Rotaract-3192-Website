import { getClubBySlug, getEventsByClubId, getFeedsByClubId } from "@/app/actions/queries";
import { notFound } from "next/navigation";
import ClubProfileClient from "./ClubProfileClient";

export default async function ClubProfilePage({ params }: { params: { slug: string } }) {
  const club = await getClubBySlug(params.slug);
  
  if (!club) {
    notFound();
  }

  const events = await getEventsByClubId(club.id);
  const feeds = await getFeedsByClubId(club.id);

  return (
    <ClubProfileClient 
      club={club} 
      events={events} 
      feeds={feeds} 
    />
  );
}
