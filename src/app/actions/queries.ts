'use server';

import { getDb } from '@/lib/db';
import {
  clubs, events, jobs, courses, moms, newsletters, users, feeds, campaigns,
  announcements, eventRegistrations, serviceHours, coldStorageFiles, auditLogs,
  pastLeaders, pointTransactions,
} from '@/lib/db/schema';
import { desc, eq, and, ne, sql, count } from 'drizzle-orm';

export async function getClubs(limit = 100) {
  try {
    return await getDb().select().from(clubs).limit(limit);
  } catch (error) {
    console.error('Failed to fetch clubs:', error);
    return [];
  }
}

export async function getEvents(includeTrash = false, limit = 100) {
  try {
    if (includeTrash) {
      return await getDb().select().from(events).orderBy(desc(events.eventDate)).limit(limit);
    }
    return await getDb()
      .select()
      .from(events)
      .where(ne(events.status, 'trash'))
      .orderBy(desc(events.eventDate))
      .limit(limit);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}

export async function getUpcomingEvents(limit = 5) {
  try {
    return await getDb()
      .select()
      .from(events)
      .where(eq(events.status, 'upcoming'))
      .orderBy(events.eventDate)
      .limit(limit);
  } catch (error) {
    console.error('Failed to fetch upcoming events:', error);
    return [];
  }
}

export async function getJobs(limit = 50) {
  try {
    return await getDb().select().from(jobs).orderBy(desc(jobs.createdAt)).limit(limit);
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return [];
  }
}

export async function getCourses(limit = 50) {
  try {
    return await getDb().select().from(courses).orderBy(desc(courses.createdAt)).limit(limit);
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return [];
  }
}

export async function getMOMs(limit = 50) {
  try {
    return await getDb().select().from(moms).orderBy(desc(moms.meetingDate)).limit(limit);
  } catch (error) {
    console.error('Failed to fetch MOMs:', error);
    return [];
  }
}

export async function getNewsletters(limit = 50) {
  try {
    return await getDb().select().from(newsletters).orderBy(desc(newsletters.issueDate)).limit(limit);
  } catch (error) {
    console.error('Failed to fetch newsletters:', error);
    return [];
  }
}

export async function getUsers(limit = 100) {
  try {
    return await getDb().select().from(users).orderBy(desc(users.createdAt)).limit(limit);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

export async function getFeeds(limit = 50) {
  try {
    return await getDb().select().from(feeds).orderBy(desc(feeds.createdAt)).limit(limit);
  } catch (error) {
    console.error('Failed to fetch feeds:', error);
    return [];
  }
}

export async function getLeaderboard(limit = 50) {
  try {
    return await getDb()
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        avatarUrl: users.avatarUrl,
        clubId: users.clubId,
        points: users.points,
        role: users.role,
      })
      .from(users)
      .orderBy(desc(users.points))
      .limit(limit);
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return [];
  }
}

export async function getCampaigns(limit = 50) {
  try {
    return await getDb().select().from(campaigns).orderBy(desc(campaigns.createdAt)).limit(limit);
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    return [];
  }
}

export async function getAnnouncements(limit = 50) {
  try {
    return await getDb().select().from(announcements).orderBy(desc(announcements.createdAt)).limit(limit);
  } catch (error) {
    console.error('Failed to fetch announcements:', error);
    return [];
  }
}

/** Public resources stored in R2 (cold storage) */
export async function getResources() {
  try {
    return await getDb()
      .select()
      .from(coldStorageFiles)
      .where(eq(coldStorageFiles.isPublic, true))
      .orderBy(coldStorageFiles.category, desc(coldStorageFiles.createdAt));
  } catch (error) {
    console.error('Failed to fetch resources:', error);
    return [];
  }
}

/** Fetch user profile row by Clerk user ID */
export async function getUserProfile(clerkUserId: string) {
  try {
    const result = await getDb()
      .select()
      .from(users)
      .where(eq(users.id, clerkUserId))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
}

/** Aggregated stats for the Dashboard — hours logged, events attended, points */
export async function getDashboardStats(clerkUserId: string) {
  try {
    const hoursRows = await getDb()
      .select()
      .from(serviceHours)
      .where(eq(serviceHours.userId, clerkUserId));

    const totalHours = hoursRows.reduce((acc, row) => acc + (Number(row.hours) || 0), 0);

    const eventsResult = await getDb()
      .select()
      .from(eventRegistrations)
      .where(
        and(
          eq(eventRegistrations.userId, clerkUserId),
          eq(eventRegistrations.status, 'attended'),
        )
      );

    const userResult = await getDb()
      .select()
      .from(users)
      .where(eq(users.id, clerkUserId))
      .limit(1);

    return {
      totalHours,
      eventsAttended: eventsResult.length,
      points: userResult[0]?.points ?? 0,
    };
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return { totalHours: 0, eventsAttended: 0, points: 0 };
  }
}

/** All members who can act as mentors */
export async function getMentors() {
  try {
    const db = getDb();
    const mentors = await db
      .select()
      .from(users)
      .where(eq(users.role, 'club_admin'));
    const districtAdmins = await db
      .select()
      .from(users)
      .where(eq(users.role, 'district_admin'));
    
    const all = [...mentors, ...districtAdmins];
    
    return all.map(user => ({
      id: user.id,
      name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
      role: user.role === 'district_admin' ? 'District Leader' : 'Club Leader',
      organization: 'Rotaract District 3192',
      expertise: ['Leadership', 'Service', 'Professional Dev'],
      image_url: user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName || 'User')}&background=003F8A&color=fff`,
      bio: user.bio || 'Experienced leader within the Rotaract District 3192 network dedicated to service and mentorship.',
    }));
  } catch (error) {
    console.error('Failed to fetch mentors:', error);
    return [];
  }
}

export async function getDistrictStats() {
  try {
    const db = getDb() as any;
    const [clubsCount, membersCount, eventsCount, announcementsCount, momsCount] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(clubs),
      db.select({ count: sql<number>`count(*)` }).from(users),
      db.select({ count: sql<number>`count(*)` }).from(events),
      db.select({ count: sql<number>`count(*)` }).from(announcements),
      db.select({ count: sql<number>`count(*)` }).from(moms)
    ]);

    return {
      totalClubs: clubsCount[0]?.count || 0,
      totalMembers: membersCount[0]?.count || 0,
      totalEvents: eventsCount[0]?.count || 0,
      totalAnnouncements: announcementsCount[0]?.count || 0,
      totalMoms: momsCount[0]?.count || 0,
    };
  } catch (error) {
    console.error('Failed to fetch district stats:', error);
    return { totalClubs: 0, totalMembers: 0, totalEvents: 0, totalAnnouncements: 0, totalMoms: 0 };
  }
}

export async function getAuditLogs() {
  try {
    return await getDb().select().from(auditLogs).orderBy(desc(auditLogs.timestamp)).limit(50);
  } catch (error) {
    console.error('Failed to fetch audit logs:', error);
    return [];
  }
}

export async function getClubBySlug(slug: string) {
  try {
    const result = await getDb()
      .select()
      .from(clubs)
      .where(eq(clubs.slug, slug))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error('Failed to fetch club by slug:', error);
    return null;
  }
}

export async function getEventBySlug(slug: string) {
  try {
    const result = await getDb()
      .select()
      .from(events)
      .where(and(eq(events.slug, slug), ne(events.status, 'trash')))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error('Failed to fetch event by slug:', error);
    return null;
  }
}

export async function getEventsByClubId(clubId: string) {
  try {
    return await getDb()
      .select()
      .from(events)
      .where(and(eq(events.clubId, clubId), ne(events.status, 'trash')))
      .orderBy(desc(events.eventDate));
  } catch (error) {
    console.error('Failed to fetch events by club ID:', error);
    return [];
  }
}

export async function getFeedsByClubId(clubId: string) {
  try {
    const db = getDb() as any;
    return await db
      .select({
        id: feeds.id,
        title: feeds.title,
        content: feeds.content,
        mediaUrl: feeds.mediaUrl,
        type: feeds.type,
        createdAt: feeds.createdAt,
      })
      .from(feeds)
      .innerJoin(users, eq(feeds.authorId, users.id))
      .where(eq(users.clubId, clubId))
      .orderBy(desc(feeds.createdAt));
  } catch (error) {
    console.error('Failed to fetch feeds by club ID:', error);
    return [];
  }
}

export async function getPastLeaders() {
  try {
    return await getDb()
      .select()
      .from(pastLeaders)
      .orderBy(desc(pastLeaders.year));
  } catch (error) {
    console.error('Failed to fetch past leaders:', error);
    return [];
  }
}


export async function getPointHistory(userId: string, limit = 20) {
  try {
    return await getDb()
      .select()
      .from(pointTransactions)
      .where(eq(pointTransactions.userId, userId))
      .orderBy(desc(pointTransactions.createdAt))
      .limit(limit);
  } catch (error) {
    console.error('Failed to fetch point history:', error);
    return [];
  }
}

export async function getClubsWithProjectStats() {
  try {
    const db = getDb();
    const allClubs = await db.select().from(clubs);
    const allProjects = await db
      .select()
      .from(events)
      .where(and(eq(events.entryType, 'Project'), ne(events.status, 'trash')));

    const clubStatsMap = new Map();

    for (const project of allProjects) {
      if (!project.clubId) continue;
      const current = clubStatsMap.get(project.clubId) || {
        totalProjects: 0,
        totalAiPoints: 0,
        projects: [],
      };
      const score = project.aiScore || 0;
      current.totalProjects += 1;
      current.totalAiPoints += score;
      current.projects.push({
        id: project.id,
        title: project.title,
        slug: project.slug,
        score,
        aiAnalysis: project.aiAnalysis,
      });
      clubStatsMap.set(project.clubId, current);
    }

    const clubsWithStats = allClubs.map((club) => {
      const stats = clubStatsMap.get(club.id) || {
        totalProjects: 0,
        totalAiPoints: 0,
        projects: [],
      };
      return {
        id: club.id,
        name: club.name,
        slug: club.slug,
        logoUrl: club.logoUrl,
        charterDate: club.charterDate,
        city: club.city,
        zone: club.zone,
        totalProjects: stats.totalProjects,
        totalAiPoints: stats.totalAiPoints,
        averageAiScore: stats.totalProjects > 0 ? Math.round(stats.totalAiPoints / stats.totalProjects) : 0,
        projects: stats.projects.sort((a: any, b: any) => b.score - a.score),
      };
    });

    // Sort by totalAiPoints desc, then by totalProjects desc
    return clubsWithStats.sort((a, b) => {
      if (b.totalAiPoints !== a.totalAiPoints) {
        return b.totalAiPoints - a.totalAiPoints;
      }
      return b.totalProjects - a.totalProjects;
    });
  } catch (error) {
    console.error('Failed to fetch clubs with project stats:', error);
    return [];
  }
}

