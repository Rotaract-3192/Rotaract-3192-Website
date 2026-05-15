import { getLeaderboard, getClubs, getDistrictStats } from '@/app/actions/queries';
import HallOfFameClient from './HallOfFameClient';

export const metadata = {
  title: 'Hall of Fame | Rotaract District 3192',
  description: 'Celebrating the top contributors and champions of Rotaract District 3192.',
};

export const revalidate = 60;

export default async function HallOfFamePage() {
  const [leaderboard, clubs, stats] = await Promise.all([
    getLeaderboard(),
    getClubs(),
    getDistrictStats(),
  ]);

  return (
    <HallOfFameClient
      leaderboard={leaderboard}
      clubs={clubs}
      stats={stats}
    />
  );
}
