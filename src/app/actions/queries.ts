'use server';

import { getDb } from '@/lib/db';
import {
  clubs, events, jobs, courses, moms, newsletters, users, feeds, campaigns,
  announcements, eventRegistrations, serviceHours, coldStorageFiles, auditLogs,
  pastLeaders, pointTransactions, courseModules, districtSettings, analyticsEvents,
  blastContacts,
} from '@/lib/db/schema';
import { desc, eq, and, ne, sql, count } from 'drizzle-orm';

export async function getClubs(limit = 100) {
  try {
    const db = getDb();
    const result = await db
      .select({
        club: clubs,
        memberCount: sql<number>`cast(count(${users.id}) as integer)`,
      })
      .from(clubs)
      .leftJoin(users, eq(users.clubId, clubs.id))
      .groupBy(clubs.id)
      .limit(limit);
      
    return result.map(row => ({
      ...row.club,
      memberCount: row.memberCount,
    }));
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
        id: clubs.id,
        name: clubs.name,
        slug: clubs.slug,
        logoUrl: clubs.logoUrl,
        points: clubs.points,
        city: clubs.city,
        zone: clubs.zone,
      })
      .from(clubs)
      .orderBy(desc(clubs.points))
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

/** Public resources stored in object storage */
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

export async function getDistrictSettings() {
  try {
    const db = getDb();
    const rows = await db.select().from(districtSettings);
    const settingsMap: Record<string, string> = {};
    for (const row of rows) {
      settingsMap[row.key] = row.value;
    }
    return settingsMap;
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return {};
  }
}

export async function getDistrictStats() {
  try {
    const db = getDb() as any;
    const [clubsCount, membersCount, eventsCount, announcementsCount, momsCount, settingsRows] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(clubs),
      db.select({ count: sql<number>`count(*)` }).from(users),
      db.select({ count: sql<number>`count(*)` }).from(events),
      db.select({ count: sql<number>`count(*)` }).from(announcements),
      db.select({ count: sql<number>`count(*)` }).from(moms),
      db.select().from(districtSettings)
    ]);

    const settings: Record<string, string> = {};
    for (const r of settingsRows) {
      settings[r.key] = r.value;
    }

    const dbClubs = clubsCount[0]?.count || 0;
    const dbMembers = membersCount[0]?.count || 0;
    const dbEvents = eventsCount[0]?.count || 0;

    const totalMembers = settings.stats_members_override ? parseInt(settings.stats_members_override) : dbMembers;
    const totalClubs = settings.stats_clubs_override ? parseInt(settings.stats_clubs_override) : dbClubs;
    const totalProjects = settings.stats_projects_override ? parseInt(settings.stats_projects_override) : dbEvents;
    const totalCharteredClubs = settings.stats_chartered_clubs_override ? parseInt(settings.stats_chartered_clubs_override) : 0;

    return {
      totalClubs,
      totalMembers,
      totalProjects,
      totalEvents: totalProjects,
      totalCharteredClubs,
      totalAnnouncements: announcementsCount[0]?.count || 0,
      totalMoms: momsCount[0]?.count || 0,
    };
  } catch (error) {
    console.error('Failed to fetch district stats:', error);
    return { totalClubs: 84, totalMembers: 2133, totalProjects: 0, totalEvents: 0, totalCharteredClubs: 0, totalAnnouncements: 0, totalMoms: 0 };
  }
}

export async function getAnalyticsSummary() {
  try {
    const db = getDb();
    const visits = await db.select({ count: count() }).from(analyticsEvents).where(eq(analyticsEvents.eventType, 'homepage_visit'));
    const resourceClicks = await db.select({ count: count() }).from(analyticsEvents).where(eq(analyticsEvents.eventType, 'resource_click'));
    const videoClicks = await db.select({ count: count() }).from(analyticsEvents).where(eq(analyticsEvents.eventType, 'video_click'));
    const ticketClicks = await db.select({ count: count() }).from(analyticsEvents).where(eq(analyticsEvents.eventType, 'ticket_click'));
    
    // Detailed logs for recent actions
    const recentLogs = await db.select().from(analyticsEvents).orderBy(desc(analyticsEvents.timestamp)).limit(20);

    return {
      totalVisits: visits[0]?.count || 0,
      totalResourceClicks: resourceClicks[0]?.count || 0,
      totalVideoClicks: videoClicks[0]?.count || 0,
      totalTicketClicks: ticketClicks[0]?.count || 0,
      recentLogs
    };
  } catch (error) {
    console.error('Failed to fetch analytics summary:', error);
    return { totalVisits: 0, totalResourceClicks: 0, totalVideoClicks: 0, totalTicketClicks: 0, recentLogs: [] };
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

export async function getCourseById(courseId: string) {
  try {
    const result = await getDb()
      .select()
      .from(courses)
      .where(eq(courses.id, courseId))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error('Failed to fetch course by ID:', error);
    return null;
  }
}

export async function getCourseModules(courseId: string) {
  try {
    return await getDb()
      .select()
      .from(courseModules)
      .where(eq(courseModules.courseId, courseId))
      .orderBy(courseModules.order);
  } catch (error) {
    console.error('Failed to fetch course modules:', error);
    return [];
  }
}

export async function getMomById(momId: string) {
  try {
    const result = await getDb()
      .select()
      .from(moms)
      .where(eq(moms.id, momId))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error('Failed to fetch MOM by ID:', error);
    return null;
  }
}

export async function getBlastContacts() {
  try {
    return await getDb()
      .select()
      .from(blastContacts)
      .orderBy(desc(blastContacts.createdAt));
  } catch (error) {
    console.error('Failed to fetch blast contacts:', error);
    return [];
  }
}
