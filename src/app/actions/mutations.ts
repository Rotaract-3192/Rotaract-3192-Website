'use server';

import { getDb } from '@/lib/db';
import { clubs, events, users, feeds, campaigns, announcements, moms, courses } from '@/lib/db/schema';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

function generateId() {
  return crypto.randomUUID();
}

// ================= CLUBS =================

export async function createClub(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const city = formData.get('city') as string;
  const charterDateStr = formData.get('charterDate') as string;
  const themeColor = formData.get('themeColor') as string;

  const charterDate = charterDateStr ? new Date(charterDateStr) : new Date();

  try {
    await getDb().insert(clubs).values({
      id: generateId(),
      name,
      slug,
      charterDate,
      description: `Rotaract Club of ${city}`,
    });
    revalidatePath('/admin/clubs');
    revalidatePath('/clubs');
  } catch (error) {
    console.error('Failed to create club:', error);
  }
}

export async function deleteClub(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    await getDb().delete(clubs).where(eq(clubs.id, id));
    revalidatePath('/admin/clubs');
    revalidatePath('/clubs');
  } catch (error) {
    console.error('Failed to delete club:', error);
  }
}

// ================= EVENTS =================

export async function createEvent(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const clubId = formData.get('clubId') as string;
  const description = formData.get('description') as string;
  const location = formData.get('location') as string;
  const eventDateStr = formData.get('eventDate') as string;
  
  const eventDate = eventDateStr ? new Date(eventDateStr) : new Date();

  try {
    await getDb().insert(events).values({
      id: generateId(),
      clubId,
      title,
      slug,
      description,
      location,
      eventDate,
      status: 'upcoming'
    });
    revalidatePath('/admin/events');
    revalidatePath('/events');
  } catch (error) {
    console.error('Failed to create event:', error);
  }
}

export async function deleteEvent(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    await getDb().delete(events).where(eq(events.id, id));
    revalidatePath('/admin/events');
    revalidatePath('/events');
  } catch (error) {
    console.error('Failed to delete event:', error);
  }
}

// ================= USERS & ACHIEVEMENTS =================

export async function updateUserRole(id: string, role: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    await getDb().update(users).set({ role }).where(eq(users.id, id));
    revalidatePath('/admin/members');
  } catch (error) {
    console.error('Failed to update user role:', error);
  }
}

export async function awardPoints(userIdToAward: string, points: number) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    // In SQLite Drizzle, you often have to fetch then update, or use sql``
    // For simplicity, let's assume we want to set absolute points or we fetch first.
    // We'll just run an update.
    // Actually, SQL fragment for increment: sql`points + ${points}`
    const { sql } = await import('drizzle-orm');
    await getDb().update(users).set({ points: sql`points + ${points}` }).where(eq(users.id, userIdToAward));
    revalidatePath('/admin/members');
  } catch (error) {
    console.error('Failed to award points:', error);
  }
}

// ================= CAMPAIGNS =================

export async function updateCampaignStatus(id: string, status: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    await getDb().update(campaigns).set({ status }).where(eq(campaigns.id, id));
    revalidatePath('/admin/campaigns');
  } catch (error) {
    console.error('Failed to update campaign status:', error);
  }
}

// ================= ANNOUNCEMENTS =================

export async function createAnnouncement(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const priority = formData.get('priority') as string || 'normal';

  try {
    await getDb().insert(announcements).values({
      id: generateId(),
      title,
      content,
      priority,
      createdBy: userId
    });
    revalidatePath('/admin/announcements');
  } catch (error) {
    console.error('Failed to create announcement:', error);
  }
}

// ================= FEEDS =================

export async function createFeed(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const type = formData.get('type') as string || 'post';
  const mediaUrl = formData.get('mediaUrl') as string | null;

  try {
    await getDb().insert(feeds).values({
      id: generateId(),
      title,
      content,
      type,
      mediaUrl: mediaUrl || null,
      authorId: userId,
    });
    revalidatePath('/admin/feeds');
    revalidatePath('/news');
  } catch (error) {
    console.error('Failed to create feed:', error);
  }
}

export async function deleteFeed(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    await getDb().delete(feeds).where(eq(feeds.id, id));
    revalidatePath('/admin/feeds');
    revalidatePath('/news');
  } catch (error) {
    console.error('Failed to delete feed:', error);
  }
}

// ================= MOMS =================

export async function createMom(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const clubId = formData.get('clubId') as string;
  const meetingDateStr = formData.get('meetingDate') as string;
  const meetingDate = meetingDateStr ? new Date(meetingDateStr) : new Date();

  try {
    await getDb().insert(moms).values({
      id: generateId(),
      title,
      clubId: clubId || null,
      meetingDate,
      status: 'pending',
    });
    revalidatePath('/admin/mom');
    revalidatePath('/mom');
  } catch (error) {
    console.error('Failed to create MOM:', error);
  }
}

export async function deleteMom(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    await getDb().delete(moms).where(eq(moms.id, id));
    revalidatePath('/admin/mom');
    revalidatePath('/mom');
  } catch (error) {
    console.error('Failed to delete MOM:', error);
  }
}

// ================= COURSES =================

export async function createCourse(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const thumbnailUrl = formData.get('thumbnailUrl') as string | null;

  try {
    await getDb().insert(courses).values({
      id: generateId(),
      title,
      description,
      thumbnailUrl: thumbnailUrl || null,
      modulesCount: 0,
    });
    revalidatePath('/admin/lms');
    revalidatePath('/lms');
  } catch (error) {
    console.error('Failed to create course:', error);
  }
}

export async function deleteCourse(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    await getDb().delete(courses).where(eq(courses.id, id));
    revalidatePath('/admin/lms');
    revalidatePath('/lms');
  } catch (error) {
    console.error('Failed to delete course:', error);
  }
}

// ================= CAMPAIGNS =================

export async function createCampaign(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const goalAmount = parseFloat(formData.get('goalAmount') as string) || 0;

  try {
    await getDb().insert(campaigns).values({
      id: generateId(),
      title,
      description,
      goalAmount,
      raisedAmount: 0,
      status: 'pending',
      createdBy: userId,
    });
    revalidatePath('/admin/campaigns');
  } catch (error) {
    console.error('Failed to create campaign:', error);
  }
}

// ================= USERS =================
export async function deleteUser(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    await getDb().delete(users).where(eq(users.id, id));
    revalidatePath('/admin/members');
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
}



