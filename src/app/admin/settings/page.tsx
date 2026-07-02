import { getDistrictSettings, getAnalyticsSummary, getAnnouncements } from "@/app/actions/queries";
import SettingsClient from "./SettingsClient";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const [initialSettings, analytics, announcements] = await Promise.all([
    getDistrictSettings(),
    getAnalyticsSummary(),
    getAnnouncements()
  ]);

  return (
    <SettingsClient
      initialSettings={initialSettings}
      analytics={analytics}
      announcements={announcements}
    />
  );
}
