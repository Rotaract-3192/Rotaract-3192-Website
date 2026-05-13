import { getLeaderboard } from '@/app/actions/queries';
import HallOfFameClient from './HallOfFameClient';

export const revalidate = 0;

export default async function HallOfFamePage() {
  const leaderboardData = await getLeaderboard();
  return <HallOfFameClient leaderboardData={leaderboardData} />;
}
