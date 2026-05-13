'use server';

import { getDb } from '@/lib/db';
import { clubs, events, jobs, courses, moms, newsletters, users, feeds, campaigns, announcements } from '@/lib/db/schema';
import { desc, sql } from 'drizzle-orm';

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

export async function getMoms() {
  try {
    return await getDb().select().from(moms).orderBy(desc(moms.meetingDate));
  } catch (error) {
    console.error('Failed to fetch moms:', error);
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
      name: `${user.firstName} ${user.lastName}`,
      points: user.points,
      avatarUrl: user.avatarUrl,
      role: user.role
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
