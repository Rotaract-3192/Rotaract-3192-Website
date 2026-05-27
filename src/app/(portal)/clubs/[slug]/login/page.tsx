import { getClubBySlug } from "@/app/actions/queries";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

// Server action to log in as a specific simulated user dynamically by email
async function handleMockLogin(formData: FormData) {
  "use server";
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const clubId = formData.get("clubId") as string;
  const role = formData.get("role") as string;

  if (!email || !clubId) return;

  const db = getDb();
  
  // Try to find the user in the database by email
  let user = await db.query.users.findFirst({
    where: eq(users.email, email)
  });

  const permissionBits = role === "president" ? 3 : role === "secretary" ? 2 : 0;
  const userRole = role === "president" ? "club_admin" : role === "secretary" ? "club_admin" : "member";
  
  let targetUserId = "";

  if (user) {
    targetUserId = user.id;
    // Automatically make sure their role, permission bits, and club ID are updated to align with club parameters
    await db
      .update(users)
      .set({
        clubId,
        permissionBits,
        role: userRole,
      })
      .where(eq(users.id, targetUserId));
  } else {
    // If the user does not exist yet (e.g. newly manually added club president/secretary), dynamically provision them
    targetUserId = `usr_${role}_${clubId}`;
    const firstName = name.split(" ")[0] || "Club";
    const lastName = name.split(" ").slice(1).join(" ") || (role === "president" ? "President" : "Secretary");

    await db.insert(users).values({
      id: targetUserId,
      email,
      firstName,
      lastName,
      role: userRole,
      permissionBits,
      clubId,
      points: 0,
    });
  }

  // Set the mock cookie
  const cookieStore = await cookies();
  cookieStore.set("mock_user_id", targetUserId, { path: "/" });

  // Redirect to correct dashboard
  if (role === "president" || role === "secretary") {
    redirect("/club-admin");
  } else {
    redirect("/dashboard");
  }
}

export default async function CharteredClubLoginPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  if (!club) {
    notFound();
  }

  // Pre-selected roles resolved dynamically from the club registration details
  const mockRoles = [
    {
      name: club.presidentName || "Club President",
      email: club.presidentEmail || `president@${club.slug}.com`,
      title: "Club President",
      role: "president",
      description: `Access club admin portal as ${club.presidentName || "President"} (${club.presidentEmail || "president@club.com"}).`,
      icon: "shield_person",
      color: "from-yellow-400 to-amber-500",
      textColor: "text-yellow-400",
    },
    {
      name: club.secretaryName || "Club Secretary",
      email: club.secretaryEmail || `secretary@${club.slug}.com`,
      title: "Club Secretary",
      role: "secretary",
      description: `Access club admin portal as ${club.secretaryName || "Secretary"} (${club.secretaryEmail || "secretary@club.com"}).`,
      icon: "edit_document",
      color: "from-blue-400 to-indigo-500",
      textColor: "text-blue-400",
    },
    {
      name: "Active Member",
      email: `member@${club.slug}.com`,
      title: "Active Member",
      role: "member",
      description: "Access public portal dashboard as a standard club member.",
      icon: "person",
      color: "from-purple-400 to-pink-500",
      textColor: "text-purple-400",
    },
  ];

  return (
    <main className="min-h-screen relative flex items-center justify-center py-32 px-6">
      {/* Background Cinematic Gradients */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -z-10" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] -z-10" />

      <div className="w-full max-w-xl space-y-10 relative z-10">
        {/* Sponsoring Club / Chapter Info */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Chartered Portal</span>
          </div>

          <div className="w-28 h-28 mx-auto rounded-[2rem] bg-white/5 border border-white/10 p-3 backdrop-blur-3xl shadow-xl hover:scale-105 transition-transform duration-500">
            <img 
              src={club.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(club.name)}&background=003F8A&color=fff`} 
              className="w-full h-full object-contain" 
              alt={club.name} 
            />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter font-display uppercase italic leading-none">
              {club.name}
            </h1>
            <p className="text-text-muted text-xs opacity-60 uppercase tracking-[0.3em] font-sans">
              Authorized Login for Chartered Chapters
            </p>
          </div>
        </div>

        {/* Login Cards */}
        <div className="grid grid-cols-1 gap-6">
          {mockRoles.map((roleInfo) => (
            <form key={roleInfo.role} action={handleMockLogin}>
              <input type="hidden" name="email" value={roleInfo.email} />
              <input type="hidden" name="name" value={roleInfo.name} />
              <input type="hidden" name="clubId" value={club.id} />
              <input type="hidden" name="role" value={roleInfo.role} />

              <button
                type="submit"
                className="w-full text-left p-6 rounded-[2.5rem] bg-white/3 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-500 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${roleInfo.color} p-0.5 shadow-lg shrink-0`}>
                    <div className="w-full h-full rounded-2xl bg-slate-900/90 flex items-center justify-center">
                      <span className={`material-symbols-outlined ${roleInfo.textColor} text-2xl`}>
                        {roleInfo.icon}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight font-display group-hover:text-primary transition-colors">
                      {roleInfo.title}
                    </h3>
                    <p className="text-xs text-text-muted opacity-60 mt-1 italic font-medium leading-snug">
                      {roleInfo.description}
                    </p>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </div>
              </button>
            </form>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.4em] italic">
            Rotaract District 3192 Security Protocol
          </p>
        </div>
      </div>
    </main>
  );
}
