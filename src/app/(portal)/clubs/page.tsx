import { CLUBS_DATA } from '@/lib/clubs-data';
import ClubsClient from './ClubsClient';

export const revalidate = 3600; // Revalidate once per hour (data is static)

export default async function ClubsPage() {
  // Using hardcoded master sheet data (RY 2026-27) — 83 clubs
  return <ClubsClient clubsData={CLUBS_DATA} />;
}
