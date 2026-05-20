import { getPastLeaders } from "@/app/actions/queries";
import PresidentClient from "./PresidentClient";

export const revalidate = 0;

export default async function PresidentialSuitePage() {
  const initialLeaders = await getPastLeaders();

  return (
    <PresidentClient initialLeaders={initialLeaders} />
  );
}
