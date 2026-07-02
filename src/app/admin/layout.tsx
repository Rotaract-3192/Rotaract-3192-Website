import { auth } from "@/lib/mockAuth";
import { redirect } from "next/navigation";
import { isMasterAdmin } from "@/lib/permissions";
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
    // Redirect unauthorized users (regular members or club admins) to portal dashboard
    redirect("/dashboard");
  }

  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}
