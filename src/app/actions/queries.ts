'use server';

import { getDb } from '@/lib/db';
import {
  clubs, events, jobs, courses, moms, newsletters, users, feeds, campaigns,
  announcements, eventRegistrations, serviceHours, coldStorageFiles, auditLogs,
} from '@/lib/db/schema';
import { desc, eq, and, sql, count } from 'drizzle-orm';

export async function getClubs() {
  try {
    return await getDb().select().from(clubs);
  } catch (error) {
    console.error('Failed to fetch clubs:', error);
    return [];
  }
}

export async function getEvents() {
  try {
    return await getDb().select().from(events).orderBy(desc(events.eventDate));
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

export async function getJobs() {
  try {
    return await getDb().select().from(jobs).orderBy(desc(jobs.createdAt));
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return [];
  }
}

export async function getCourses() {
  try {
    return await getDb().select().from(courses).orderBy(desc(courses.createdAt));
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return [];
  }
}

export async function getMOMs() {
  try {
    return await getDb().select().from(moms).orderBy(desc(moms.meetingDate));
  } catch (error) {
    console.error('Failed to fetch MOMs:', error);
    return [];
  }
}

export async function getNewsletters() {
  try {
    return await getDb().select().from(newsletters).orderBy(desc(newsletters.issueDate));
  } catch (error) {
    console.error('Failed to fetch newsletters:', error);
    return [];
  }
}

export async function getUsers() {
  try {
    return await getDb().select().from(users).orderBy(desc(users.createdAt));
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

export async function getFeeds() {
  try {
    return await getDb().select().from(feeds).orderBy(desc(feeds.createdAt));
  } catch (error) {
    console.error('Failed to fetch feeds:', error);
    return [];
  }
}

export async function getLeaderboard() {
  try {
    const allUsers = await getDb().select().from(users).orderBy(desc(users.points)).limit(10);
    return allUsers.map(user => ({
      id: user.id,
      name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
      points: user.points,
      avatarUrl: user.avatarUrl,
      role: user.role,
    }));
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return [];
  }
}

export async function getCampaigns() {
  try {
    return await getDb().select().from(campaigns).orderBy(desc(campaigns.createdAt));
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    return [];
  }
}

export async function getAnnouncements() {
  try {
    return await getDb().select().from(announcements).orderBy(desc(announcements.createdAt));
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
    const mentors = await getDb()
      .select()
      .from(users)
      .where(eq(users.role, 'club_admin'));
    const districtAdmins = await getDb()
      .select()
      .from(users)
      .where(eq(users.role, 'district_admin'));
    return [...mentors, ...districtAdmins];
  } catch (error) {
    console.error('Failed to fetch mentors:', error);
    return [];
  }
}

export async function getDistrictStats() {
  try {
    const db = getDb();
    const [clubsCount, membersCount, eventsCount, announcementsCount] = await Promise.all([
      db.select({ count: count() }).from(clubs),
      db.select({ count: count() }).from(users),
      db.select({ count: count() }).from(events),
      db.select({ count: count() }).from(announcements)
    ]);

    return {
      totalClubs: clubsCount[0]?.count || 0,
      totalMembers: membersCount[0]?.count || 0,
      totalEvents: eventsCount[0]?.count || 0,
      totalAnnouncements: announcementsCount[0]?.count || 0,
    };
  } catch (error) {
    console.error('Failed to fetch district stats:', error);
    return { totalClubs: 0, totalMembers: 0, totalEvents: 0, totalAnnouncements: 0 };
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



