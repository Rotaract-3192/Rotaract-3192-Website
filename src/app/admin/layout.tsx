import { auth } from "@/lib/mockAuth";
import { redirect } from "next/navigation";
import { isMasterAdmin, hasClubPanel } from "@/lib/permissions";
import AdminLayoutClient from "./AdminLayoutClient";

export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, permissionBits } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  if (!isMasterAdmin(permissionBits)) {
    if (hasClubPanel(permissionBits)) {
      redirect("/club-admin");
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}
