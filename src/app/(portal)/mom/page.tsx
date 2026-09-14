import MomClient from './MomClient';
import { staticMoms } from '@/data/momData';

export default function MomPage() {
  return <MomClient momsData={staticMoms} />;
}
