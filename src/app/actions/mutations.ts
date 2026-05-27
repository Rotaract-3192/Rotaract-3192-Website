'use server';

import { getDb } from '@/lib/db';
import {
  clubs, events, users, feeds, campaigns, announcements, moms, courses,
  jobs, newsletters, eventRegistrations, serviceHours, mentorshipApplications,
  coldStorageFiles, auditLogs, pastLeaders, pointTransactions, attendance,
} from '@/lib/db/schema';
import { revalidatePath } from 'next/cache';
import { eq, and, sql } from 'drizzle-orm';
import { getRoleLabel, getBinaryStr, isMasterAdmin } from '@/lib/permissions';
import { auth } from '@/lib/mockAuth';


function generateId() {
  return crypto.randomUUID();
}

// ================= AUDIT LOGGING =================

export async function recordAuditLog(action: string, resourceType?: string, resourceId?: string, severity: 'info' | 'warning' | 'critical' = 'info') {
  const { userId } = await auth();
  if (!userId) return;

  try {
    const db = getDb();
    const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
    const userName = user ? `${user.firstName} ${user.lastName}` : 'System Admin';

    await db.insert(auditLogs).values({
      id: generateId(),
      userId,
      userName,
      action,
      resourceType,
      resourceId,
      severity,
    });
  } catch (error) {
    console.error('Failed to record audit log:', error);
  }
}

// ================= CLUBS =================

export async function createClub(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const city = formData.get('city') as string;
  const zone = formData.get('zone') as string;
  const venue = formData.get('venue') as string;
  const meetingDayTime = formData.get('meetingDayTime') as string;
  const description = formData.get('description') as string || `Rotaract Club of ${city}`;
  let logoUrl = formData.get('logoUrl') as string || '';

  // Handle logo image upload to R2
  const logoImageFile = formData.get('logoImage') as File | null;
  if (logoImageFile && logoImageFile.size > 0 && typeof logoImageFile.arrayBuffer === 'function') {
    try {
      const { uploadFile } = await import('@/lib/r2');
      const bytes = await logoImageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const tempId = crypto.randomUUID();
      const filename = `clubs/${tempId}/logo-${Date.now()}-${logoImageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      logoUrl = await uploadFile(filename, buffer, logoImageFile.type);
    } catch (err) {
      console.error('Failed to upload club logo to R2:', err);
    }
  }

  if (!logoUrl) {
    logoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=003F8A&color=fff&size=128`;
  }

  const charterDateStr = formData.get('charterDate') as string;


  const presidentName = formData.get('presidentName') as string;
  const presidentPhone = formData.get('presidentPhone') as string;
  const presidentEmail = formData.get('presidentEmail') as string;
  
  const secretaryName = formData.get('secretaryName') as string;
  const secretaryPhone = formData.get('secretaryPhone') as string;
  const secretaryEmail = formData.get('secretaryEmail') as string;

  const charterDate = charterDateStr ? new Date(charterDateStr) : new Date();

  try {
    const id = generateId();
    await getDb().insert(clubs).values({
      id,
      name,
      slug,
      charterDate,
      description,
      logoUrl,
      city,
      zone,
      venue,
      meetingDayTime,
      presidentName,
      presidentPhone,
      presidentEmail,
      secretaryName,
      secretaryPhone,
      secretaryEmail,
    });
    
    await recordAuditLog(`Created Club: ${name}`, 'club', id);
    
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
    const db = getDb();
    const club = await db.query.clubs.findFirst({ where: eq(clubs.id, id) });
    await db.delete(clubs).where(eq(clubs.id, id));
    
    await recordAuditLog(`Deleted Club: ${club?.name || id}`, 'club', id, 'warning');

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
  const slug = (formData.get('slug') as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')).trim();
  const clubId = (formData.get('clubId') as string) || null;
  const category = formData.get('category') as string;
  const entryType = formData.get('entryType') as string;
  const status = formData.get('status') as string;
  const yearDateLabel = formData.get('yearDateLabel') as string;
  const description = formData.get('description') as string;
  const location = formData.get('location') as string;
  const rsvpLink = formData.get('rsvpLink') as string;
  const fullContent = formData.get('fullContent') as string;
  
  const eventDateStr = formData.get('eventDate') as string;
  const eventDate = eventDateStr ? new Date(eventDateStr) : null;

  // Handle Cover Image upload
  const coverImageFile = formData.get('coverImage') as File | null;
  let imageUrl = formData.get('imageUrl') as string || '';
  if (coverImageFile && coverImageFile.size > 0 && typeof coverImageFile.arrayBuffer === 'function') {
    try {
      const { uploadFile } = await import('@/lib/r2');
      const bytes = await coverImageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `events/${Date.now()}-${coverImageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      imageUrl = await uploadFile(filename, buffer, coverImageFile.type);
    } catch (err) {
      console.error('Failed to upload cover image to R2:', err);
    }
  }

  // Handle Gallery Images upload
  const galleryImageFiles = formData.getAll('galleryImages') as File[];
  const galleryImagePaths: string[] = [];
  for (const file of galleryImageFiles) {
    if (file && file.size > 0 && typeof file.arrayBuffer === 'function') {
      try {
        const { uploadFile } = await import('@/lib/r2');
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `events/gallery/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const uploadedUrl = await uploadFile(filename, buffer, file.type);
        galleryImagePaths.push(uploadedUrl);
      } catch (err) {
        console.error('Failed to upload gallery image to R2:', err);
      }
    }
  }

  const externalGalleryUrls = formData.get('externalGalleryUrls') as string;
  if (externalGalleryUrls) {
    const urls = externalGalleryUrls.split(',').map(u => u.trim()).filter(Boolean);
    galleryImagePaths.push(...urls);
  }

  // Handle Featured Links
  const linkLabels = formData.getAll('featuredLinkLabel') as string[];
  const linkUrls = formData.getAll('featuredLinkUrl') as string[];
  const featuredLinksArray: { label: string; url: string }[] = [];
  for (let i = 0; i < linkLabels.length; i++) {
    if (linkLabels[i] && linkUrls[i]) {
      featuredLinksArray.push({ label: linkLabels[i], url: linkUrls[i] });
    }
  }

  let aiScore: number | null = null;
  let aiAnalysis: string | null = null;
  if (entryType === 'Project') {
    try {
      const { analyzeProject } = await import('@/lib/ai');
      const evalResult = await analyzeProject(title, description || '', fullContent || '');
      aiScore = evalResult.score;
      aiAnalysis = evalResult.analysis;
    } catch (err) {
      console.error('AI evaluation failed during project creation:', err);
    }
  }

  try {
    const id = generateId();
    await getDb().insert(events).values({
      id,
      clubId,
      title,
      slug,
      description,
      location,
      eventDate,
      imageUrl,
      status: status || 'upcoming',
      category,
      entryType,
      yearDateLabel,
      fullContent,
      galleryImages: galleryImagePaths.length > 0 ? JSON.stringify(galleryImagePaths) : null,
      featuredLinks: featuredLinksArray.length > 0 ? JSON.stringify(featuredLinksArray) : null,
      rsvpLink,
      aiScore,
      aiAnalysis,
    });

    // Automatically award +5 points to the creating user for posting a new event/project
    const pointsAwarded = 5;
    const db = getDb();
    
    await db.insert(pointTransactions).values({
      id: generateId(),
      userId,
      points: pointsAwarded,
      reason: `Created Event/Project: ${title}`,
      category: 'event_creation',
      eventId: id,
      awardedBy: 'system',
      createdAt: new Date(),
    });

    await db
      .update(users)
      .set({ points: sql`${users.points} + ${pointsAwarded}` })
      .where(eq(users.id, userId));

    await recordAuditLog(`Created Event/Project: ${title}`, 'event', id);

    revalidatePath('/admin/events');
    revalidatePath('/club-admin/events');
    revalidatePath('/events');
    revalidatePath('/admin/members');
    revalidatePath('/admin/leaderboard');
    revalidatePath('/hall-of-fame');
  } catch (error) {
    console.error('Failed to create event:', error);
  }
}

export async function deleteEvent(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    const db = getDb();
    const event = await db.query.events.findFirst({ where: eq(events.id, id) });
    await db.delete(events).where(eq(events.id, id));

    await recordAuditLog(`Deleted Event: ${event?.title || id}`, 'event', id, 'warning');

    revalidatePath('/admin/events');
    revalidatePath('/events');
  } catch (error) {
    console.error('Failed to delete event:', error);
  }
}

export async function trashEvent(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    const db = getDb();
    const event = await db.query.events.findFirst({ where: eq(events.id, id) });
    if (!event) throw new Error('Event not found');

    await db.update(events).set({ status: 'trash', updatedAt: new Date() }).where(eq(events.id, id));

    await recordAuditLog(`Moved Event to Trash: ${event.title}`, 'event', id, 'warning');

    revalidatePath('/admin/events');
    revalidatePath('/events');
  } catch (error) {
    console.error('Failed to trash event:', error);
  }
}

export async function restoreEvent(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    const db = getDb();
    const event = await db.query.events.findFirst({ where: eq(events.id, id) });
    if (!event) throw new Error('Event not found');

    await db.update(events).set({ status: 'upcoming', updatedAt: new Date() }).where(eq(events.id, id));

    await recordAuditLog(`Restored Event from Trash: ${event.title}`, 'event', id, 'info');

    revalidatePath('/admin/events');
    revalidatePath('/events');
  } catch (error) {
    console.error('Failed to restore event:', error);
  }
}

export async function updateEvent(id: string, formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const slug = (formData.get('slug') as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')).trim();
  const clubId = (formData.get('clubId') as string) || null;
  const category = formData.get('category') as string;
  const entryType = formData.get('entryType') as string;
  const status = formData.get('status') as string;
  const yearDateLabel = formData.get('yearDateLabel') as string;
  const description = formData.get('description') as string;
  const location = formData.get('location') as string;
  const rsvpLink = formData.get('rsvpLink') as string;
  const fullContent = formData.get('fullContent') as string;
  
  const eventDateStr = formData.get('eventDate') as string;
  const eventDate = eventDateStr ? new Date(eventDateStr) : null;

  // Handle Cover Image upload
  const coverImageFile = formData.get('coverImage') as File | null;
  let imageUrl = formData.get('imageUrl') as string || '';
  if (coverImageFile && coverImageFile.size > 0 && typeof coverImageFile.arrayBuffer === 'function') {
    try {
      const { uploadFile } = await import('@/lib/r2');
      const bytes = await coverImageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `events/${Date.now()}-${coverImageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      imageUrl = await uploadFile(filename, buffer, coverImageFile.type);
    } catch (err) {
      console.error('Failed to upload cover image to R2:', err);
    }
  }

  // Handle Gallery Images upload
  const galleryImageFiles = formData.getAll('galleryImages') as File[];
  const galleryImagePaths: string[] = [];
  
  // Preserve existing gallery images
  const existingGalleryImagesStr = formData.get('existingGalleryImages') as string;
  if (existingGalleryImagesStr) {
    try {
      galleryImagePaths.push(...JSON.parse(existingGalleryImagesStr));
    } catch (e) {
      // ignore
    }
  }

  for (const file of galleryImageFiles) {
    if (file && file.size > 0 && typeof file.arrayBuffer === 'function') {
      try {
        const { uploadFile } = await import('@/lib/r2');
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `events/gallery/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const uploadedUrl = await uploadFile(filename, buffer, file.type);
        galleryImagePaths.push(uploadedUrl);
      } catch (err) {
        console.error('Failed to upload gallery image to R2:', err);
      }
    }
  }

  const externalGalleryUrls = formData.get('externalGalleryUrls') as string;
  if (externalGalleryUrls) {
    const urls = externalGalleryUrls.split(',').map(u => u.trim()).filter(Boolean);
    galleryImagePaths.push(...urls);
  }

  // Handle Featured Links
  const linkLabels = formData.getAll('featuredLinkLabel') as string[];
  const linkUrls = formData.getAll('featuredLinkUrl') as string[];
  const featuredLinksArray: { label: string; url: string }[] = [];
  for (let i = 0; i < linkLabels.length; i++) {
    if (linkLabels[i] && linkUrls[i]) {
      featuredLinksArray.push({ label: linkLabels[i], url: linkUrls[i] });
    }
  }

  let aiScore: number | undefined = undefined;
  let aiAnalysis: string | undefined = undefined;
  if (entryType === 'Project') {
    try {
      const { analyzeProject } = await import('@/lib/ai');
      const evalResult = await analyzeProject(title, description || '', fullContent || '');
      aiScore = evalResult.score;
      aiAnalysis = evalResult.analysis;
    } catch (err) {
      console.error('AI evaluation failed during project update:', err);
    }
  }

  try {
    const db = getDb();
    const updateValues: any = {
      clubId,
      title,
      slug,
      description,
      location,
      eventDate,
      status: status || 'upcoming',
      category,
      entryType,
      yearDateLabel,
      fullContent,
      galleryImages: galleryImagePaths.length > 0 ? JSON.stringify(galleryImagePaths) : null,
      featuredLinks: featuredLinksArray.length > 0 ? JSON.stringify(featuredLinksArray) : null,
      rsvpLink,
      maxAttendees: formData.get('maxAttendees') ? parseInt(formData.get('maxAttendees') as string) : undefined,
      updatedAt: new Date(),
    };
    
    if (aiScore !== undefined) updateValues.aiScore = aiScore;
    if (aiAnalysis !== undefined) updateValues.aiAnalysis = aiAnalysis;
    
    if (imageUrl) {
      updateValues.imageUrl = imageUrl;
    }

    await db.update(events).set(updateValues).where(eq(events.id, id));

    await recordAuditLog(`Updated Event/Project: ${title}`, 'event', id);

    revalidatePath('/admin/events');
    revalidatePath('/events');
  } catch (error) {
    console.error('Failed to update event:', error);
    throw error;
  }
}


// ================= USERS & ACHIEVEMENTS =================

export async function updateUserRole(id: string, role: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    const db = getDb();
    const targetUser = await db.query.users.findFirst({ where: eq(users.id, id) });
    await db.update(users).set({ role }).where(eq(users.id, id));
    
    await recordAuditLog(`Updated Role for ${targetUser?.email}: ${role}`, 'user', id);

    revalidatePath('/admin/members');
  } catch (error) {
    console.error('Failed to update user role:', error);
  }
}

// awardPoints — accepts FormData from AwardPointsPanel
// CRITICAL FIX: Added missing auth check (was allowing anyone to award points)
export async function awardPoints(formData: FormData) {
  const { userId: adminId } = await auth();
  if (!adminId) throw new Error('Unauthorized');

  const userId = formData.get('userId') as string;
  const pts = parseInt(formData.get('points') as string);
  const reason = formData.get('reason') as string;
  const category = (formData.get('category') as string) || 'general';
  const eventId = (formData.get('eventId') as string) || null;

  if (!userId || !pts || !reason) throw new Error('userId, points and reason are required');

  try {
    const db = getDb();
    await db.insert(pointTransactions).values({
      id: crypto.randomUUID(),
      userId,
      points: pts,
      reason,
      category,
      eventId: eventId || null,
      awardedBy: adminId,
      createdAt: new Date(),
    });

    await db
      .update(users)
      .set({ points: sql`${users.points} + ${pts}` })
      .where(eq(users.id, userId));

    await recordAuditLog(`Awarded ${pts} points (${category}) to user ${userId}: ${reason}`, 'user', userId);

    revalidatePath('/admin/members');
    revalidatePath('/admin/leaderboard');
    revalidatePath('/club-admin/members');
  } catch (error) {
    console.error('Failed to award points:', error);
    throw error;
  }
}

// ================= CAMPAIGNS =================

export async function updateCampaignStatus(id: string, status: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    const db = getDb();
    const campaign = await db.query.campaigns.findFirst({ where: eq(campaigns.id, id) });
    await db.update(campaigns).set({ status }).where(eq(campaigns.id, id));
    
    await recordAuditLog(`Updated Campaign Status: ${campaign?.title} -> ${status}`, 'campaign', id);

    revalidatePath('/admin/campaigns');
  } catch (error) {
    console.error('Failed to update campaign status:', error);
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
    const id = generateId();
    await getDb().insert(feeds).values({
      id,
      title,
      content,
      type,
      mediaUrl: mediaUrl || null,
      authorId: userId,
    });

    await recordAuditLog(`Published Feed Post: ${title}`, 'feed', id);

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
    const db = getDb();
    const feed = await db.query.feeds.findFirst({ where: eq(feeds.id, id) });
    await db.delete(feeds).where(eq(feeds.id, id));

    await recordAuditLog(`Deleted Feed Post: ${feed?.title || id}`, 'feed', id, 'warning');

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
    const id = generateId();
    await getDb().insert(moms).values({
      id,
      title,
      clubId: clubId || null,
      meetingDate,
      status: 'pending',
    });

    await recordAuditLog(`Recorded Meeting Minutes: ${title}`, 'mom', id);

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
    const db = getDb();
    const mom = await db.query.moms.findFirst({ where: eq(moms.id, id) });
    await db.delete(moms).where(eq(moms.id, id));

    await recordAuditLog(`Deleted Meeting Minutes: ${mom?.title || id}`, 'mom', id, 'warning');

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
    const id = generateId();
    await getDb().insert(courses).values({
      id,
      title,
      description,
      thumbnailUrl: thumbnailUrl || null,
      modulesCount: 0,
    });

    await recordAuditLog(`Created Academy Course: ${title}`, 'course', id);

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
    const db = getDb();
    const course = await db.query.courses.findFirst({ where: eq(courses.id, id) });
    await db.delete(courses).where(eq(courses.id, id));

    await recordAuditLog(`Deleted Academy Course: ${course?.title || id}`, 'course', id, 'warning');

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
    const id = generateId();
    await getDb().insert(campaigns).values({
      id,
      title,
      description,
      goalAmount,
      raisedAmount: 0,
      status: 'pending',
      createdBy: userId,
    });

    await recordAuditLog(`Launched Campaign: ${title}`, 'campaign', id);

    revalidatePath('/admin/campaigns');
  } catch (error) {
    console.error('Failed to create campaign:', error);
  }
}

// ================= USERS =================
export async function createMember(formData: FormData) {
  const { userId: adminId } = await auth();
  if (!adminId) throw new Error('Unauthorized');

  const email = formData.get('email') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const role = formData.get('role') as string;
  const clubId = formData.get('clubId') as string;

  if (!email || !firstName) throw new Error('Missing required fields');

  try {
    const id = `manual_${generateId()}`;
    await getDb().insert(users).values({
      id,
      email,
      firstName,
      lastName: lastName || null,
      role: role || 'member',
      clubId: clubId || null,
      points: 0,
    });

    await recordAuditLog(`Manually Added Member: ${email}`, 'user', id);

    revalidatePath('/admin/members');
  } catch (error) {
    console.error('Failed to create member:', error);
    throw error;
  }
}

export async function deleteUser(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    const db = getDb();
    const user = await db.query.users.findFirst({ where: eq(users.id, id) });
    await db.delete(users).where(eq(users.id, id));

    await recordAuditLog(`Deleted User: ${user?.email || id}`, 'user', id, 'warning');

    revalidatePath('/admin/members');
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
}

export async function updateProfile(data: {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatarUrl?: string;
  clubId?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    await getDb()
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, userId));
    revalidatePath('/profile');
    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
}

// ================= JOBS =================

export async function createJob(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const company = formData.get('company') as string;
  const location = formData.get('location') as string;
  const type = formData.get('type') as string;
  const description = formData.get('description') as string;
  const applyUrl = formData.get('applyUrl') as string;

  try {
    const id = generateId();
    await getDb().insert(jobs).values({
      id,
      title,
      company: company || null,
      location: location || null,
      type: type || null,
      description: description || null,
      applyUrl: applyUrl || null,
    });

    await recordAuditLog(`Posted Job Opportunity: ${title} @ ${company}`, 'job', id);

    revalidatePath('/admin/jobs');
    revalidatePath('/jobs');
  } catch (error) {
    console.error('Failed to create job:', error);
    throw error;
  }
}

export async function deleteJob(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    const db = getDb();
    const job = await db.query.jobs.findFirst({ where: eq(jobs.id, id) });
    await db.delete(jobs).where(eq(jobs.id, id));

    await recordAuditLog(`Deleted Job Posting: ${job?.title || id}`, 'job', id, 'warning');

    revalidatePath('/admin/jobs');
    revalidatePath('/jobs');
  } catch (error) {
    console.error('Failed to delete job:', error);
    throw error;
  }
}

// ================= NEWSLETTERS =================

export async function createNewsletter(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const issueDateStr = formData.get('issueDate') as string;
  const fileUrl = formData.get('fileUrl') as string;
  const thumbnailUrl = formData.get('thumbnailUrl') as string;

  const issueDate = issueDateStr ? new Date(issueDateStr) : new Date();

  try {
    const id = generateId();
    await getDb().insert(newsletters).values({
      id,
      title,
      issueDate,
      fileUrl: fileUrl || null,
      thumbnailUrl: thumbnailUrl || null,
    });

    await recordAuditLog(`Published Newsletter: ${title}`, 'newsletter', id);

    revalidatePath('/admin/newsletter');
    revalidatePath('/newsletter');
  } catch (error) {
    console.error('Failed to create newsletter:', error);
    throw error;
  }
}

export async function deleteNewsletter(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    const db = getDb();
    const nl = await db.query.newsletters.findFirst({ where: eq(newsletters.id, id) });
    await db.delete(newsletters).where(eq(newsletters.id, id));

    await recordAuditLog(`Deleted Newsletter Issue: ${nl?.title || id}`, 'newsletter', id, 'warning');

    revalidatePath('/admin/newsletter');
    revalidatePath('/newsletter');
  } catch (error) {
    console.error('Failed to delete newsletter:', error);
    throw error;
  }
}

// ================= EVENT REGISTRATIONS =================

export async function registerForEvent(eventId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    await getDb().insert(eventRegistrations).values({
      id: generateId(),
      eventId,
      userId,
      status: 'confirmed',
    });
    revalidatePath('/events');
    revalidatePath('/dashboard');
  } catch (error: any) {
    // Unique constraint means already registered — silently ignore
    if (error?.message?.includes('UNIQUE')) return;
    console.error('Failed to register for event:', error);
    throw error;
  }
}

export async function cancelEventRegistration(eventId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    const { and } = await import('drizzle-orm');
    await getDb()
      .delete(eventRegistrations)
      .where(and(eq(eventRegistrations.eventId, eventId), eq(eventRegistrations.userId, userId)));
    revalidatePath('/events');
    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Failed to cancel registration:', error);
    throw error;
  }
}

// ================= SERVICE HOURS =================

export async function logServiceHours(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const hours = parseFloat(formData.get('hours') as string);
  const description = formData.get('description') as string;
  const eventId = formData.get('eventId') as string | null;

  if (!hours || hours <= 0) throw new Error('Invalid hours value');

  try {
    await getDb().insert(serviceHours).values({
      id: generateId(),
      userId,
      eventId: eventId || null,
      hours,
      description: description || null,
    });
    revalidatePath('/dashboard');
    revalidatePath('/profile');
  } catch (error) {
    console.error('Failed to log service hours:', error);
    throw error;
  }
}

// ================= MENTORSHIP =================

export async function applyForMentorship(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const mentorId = formData.get('mentorId') as string;
  const message = formData.get('message') as string;
  const domain = formData.get('domain') as string;

  try {
    await getDb().insert(mentorshipApplications).values({
      id: generateId(),
      mentorId,
      menteeId: userId,
      message: message || null,
      domain: domain || null,
      status: 'pending',
    });
    revalidatePath('/mentorship');
  } catch (error) {
    console.error('Failed to apply for mentorship:', error);
    throw error;
  }
}

export async function updateMentorshipStatus(id: string, status: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    await getDb()
      .update(mentorshipApplications)
      .set({ status, updatedAt: new Date() })
      .where(eq(mentorshipApplications.id, id));
    revalidatePath('/mentorship');
    revalidatePath('/admin');
  } catch (error) {
    console.error('Failed to update mentorship status:', error);
    throw error;
  }
}

// ================= RESOURCES (Cold Storage Metadata) =================

export async function uploadResource(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const fileName = formData.get('fileName') as string;
  const r2Key = formData.get('r2Key') as string;
  const category = formData.get('category') as string;
  const mimeType = formData.get('mimeType') as string;
  const fileSize = parseInt(formData.get('fileSize') as string, 10);

  if (!fileName || !r2Key || !fileSize) throw new Error('Missing required fields');

  try {
    const id = generateId();
    await getDb().insert(coldStorageFiles).values({
      id,
      fileName,
      r2Key,
      category: category || 'General',
      mimeType: mimeType || null,
      fileSize,
      uploadedBy: userId,
      isPublic: true,
    });

    await recordAuditLog(`Uploaded Resource: ${fileName}`, 'resource', id);

    revalidatePath('/admin/resources');
    revalidatePath('/resources');
  } catch (error) {
    console.error('Failed to register resource:', error);
    throw error;
  }
}

export async function deleteResource(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    const db = getDb();
    const file = await db.query.coldStorageFiles.findFirst({ where: eq(coldStorageFiles.id, id) });
    await db.delete(coldStorageFiles).where(eq(coldStorageFiles.id, id));

    await recordAuditLog(`Deleted Resource: ${file?.fileName || id}`, 'resource', id, 'warning');

    revalidatePath('/admin/resources');
    revalidatePath('/resources');
  } catch (error) {
    console.error('Failed to delete resource:', error);
    throw error;
  }
}

// ================= ANNOUNCEMENTS =================

export async function createAnnouncement(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const type = formData.get('type') as string; // info, alert, success
  const clubId = formData.get('clubId') as string || null;

  try {
    const id = generateId();
    await getDb().insert(announcements).values({
      id,
      title,
      content,
      priority: type || 'normal',
      createdBy: userId,
    });

    await recordAuditLog(`Sent Announcement: ${title}`, 'announcement', id);

    revalidatePath('/admin/announcements');
    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Failed to create announcement:', error);
    throw error;
  }
}

export async function deleteAnnouncement(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    const db = getDb();
    const ann = await db.query.announcements.findFirst({ where: eq(announcements.id, id) });
    await db.delete(announcements).where(eq(announcements.id, id));

    await recordAuditLog(`Deleted Announcement: ${ann?.title || id}`, 'announcement', id, 'warning');

    revalidatePath('/admin/announcements');
    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Failed to delete announcement:', error);
    throw error;
  }
}

// ================= MOM (Minutes of Meetings) =================

export async function createMOM(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const meetingDateStr = formData.get('meetingDate') as string;
  const fileUrl = formData.get('fileUrl') as string || null;
  const clubId = formData.get('clubId') as string || null;

  const meetingDate = meetingDateStr ? new Date(meetingDateStr) : new Date();

  try {
    const id = generateId();
    await getDb().insert(moms).values({
      id,
      clubId,
      title,
      meetingDate,
      fileUrl,
      status: 'pending',
    });

    await recordAuditLog(`Recorded Minutes: ${title}`, 'mom', id);

    revalidatePath('/admin/mom');
  } catch (error) {
    console.error('Failed to create MOM:', error);
    throw error;
  }
}

export async function deleteMOM(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    const db = getDb();
    const mom = await db.query.moms.findFirst({ where: eq(moms.id, id) });
    await db.delete(moms).where(eq(moms.id, id));

    await recordAuditLog(`Deleted Minutes: ${mom?.title || id}`, 'mom', id, 'warning');

    revalidatePath('/admin/mom');
  } catch (error) {
    console.error('Failed to delete MOM:', error);
    throw error;
  }
}

// ================= PAST LEADERS (Hall of Honor) =================

export async function createPastLeader(data: {
  name: string;
  role: string;
  year: string;
  avatarUrl?: string | null;
  themeName?: string | null;
  citation?: string | null;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    const id = generateId();
    await getDb().insert(pastLeaders).values({
      id,
      name: data.name,
      role: data.role,
      year: data.year,
      avatarUrl: data.avatarUrl || null,
      themeName: data.themeName || null,
      citation: data.citation || null,
    });

    await recordAuditLog(`Created Past Leader: ${data.name} (${data.year})`, 'past_leader', id);

    revalidatePath('/admin/president');
    revalidatePath('/hall-of-fame');
    return { success: true, id };
  } catch (error) {
    console.error('Failed to create past leader:', error);
    throw error;
  }
}

export async function updatePastLeader(id: string, data: {
  name: string;
  role: string;
  year: string;
  avatarUrl?: string | null;
  themeName?: string | null;
  citation?: string | null;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    await getDb()
      .update(pastLeaders)
      .set({
        name: data.name,
        role: data.role,
        year: data.year,
        avatarUrl: data.avatarUrl || null,
        themeName: data.themeName || null,
        citation: data.citation || null,
        updatedAt: new Date(),
      })
      .where(eq(pastLeaders.id, id));

    await recordAuditLog(`Updated Past Leader: ${data.name} (${data.year})`, 'past_leader', id);

    revalidatePath('/admin/president');
    revalidatePath('/hall-of-fame');
    return { success: true };
  } catch (error) {
    console.error('Failed to update past leader:', error);
    throw error;
  }
}

export async function deletePastLeader(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  try {
    const db = getDb();
    const leaderResult = await db.select().from(pastLeaders).where(eq(pastLeaders.id, id)).limit(1);
    const leader = leaderResult[0];
    await db.delete(pastLeaders).where(eq(pastLeaders.id, id));

    await recordAuditLog(`Deleted Past Leader: ${leader?.name || id}`, 'past_leader', id, 'warning');

    revalidatePath('/admin/president');
    revalidatePath('/hall-of-fame');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete past leader:', error);
    throw error;
  }
}


// ================= PERMISSION MANAGEMENT =================

export async function setUserPermissions(formData: FormData) {
  const { userId: adminId } = await auth();
  if (!adminId) throw new Error('Unauthorized');

  // CRITICAL FIX: Validate admin has master admin permissions
  const db = getDb();
  const adminUser = await db.query.users.findFirst({ where: eq(users.id, adminId) });
  if (!adminUser || adminUser.permissionBits === null || !isMasterAdmin(adminUser.permissionBits)) {
    throw new Error('Master admin access required');
  }

  const userId = formData.get('userId') as string;
  const permissionBits = parseInt(formData.get('permissionBits') as string, 10);
  const clubId = (formData.get('clubId') as string) || null;

  if (!userId) throw new Error('Missing userId');
  if (permissionBits < 0 || permissionBits > 3) throw new Error('Invalid permissionBits');

  // Enforce ONE president per club — downgrade any existing president of this club
  if (permissionBits === 3 && clubId) {
    await db
      .update(users)
      .set({ permissionBits: 2 })
      .where(
        and(
          eq(users.clubId, clubId),
          eq(users.permissionBits, 3),
          sql`${users.id} != ${userId}`
        )
      );
    // Point club.presidentId at the new president
    await db.update(clubs).set({ presidentId: userId }).where(eq(clubs.id, clubId));
  }

  // If demoting away from president, clear club.presidentId
  if (permissionBits !== 3 && clubId) {
    const presidentClub = await db.query.clubs.findFirst({
      where: and(eq(clubs.id, clubId), eq(clubs.presidentId, userId)),
    });
    if (presidentClub) {
      await db.update(clubs).set({ presidentId: null }).where(eq(clubs.id, clubId));
    }
  }

  await db
    .update(users)
    .set({
      permissionBits,
      clubId: clubId || null,
      role: getRoleLabel(permissionBits).toLowerCase().replace(/ /g, '_'),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));

  await recordAuditLog(
    `Permission → ${getRoleLabel(permissionBits)} [${getBinaryStr(permissionBits)}] for user ${userId}`,
    'user',
    userId,
  );

  revalidatePath('/admin/members');
  revalidatePath('/club-admin');
}

export async function updateClub(id: string, formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const city = formData.get('city') as string;
  const zone = formData.get('zone') as string;
  const venue = formData.get('venue') as string;
  const meetingDayTime = formData.get('meetingDayTime') as string;

  const presidentName = formData.get('presidentName') as string;
  const presidentPhone = formData.get('presidentPhone') as string;
  const presidentEmail = formData.get('presidentEmail') as string;
  
  const secretaryName = formData.get('secretaryName') as string;
  const secretaryPhone = formData.get('secretaryPhone') as string;
  const secretaryEmail = formData.get('secretaryEmail') as string;

  // Handle Logo image upload to R2 if provided
  const logoImageFile = formData.get('logoImage') as File | null;
  let logoUrl = formData.get('logoUrl') as string || '';
  if (logoImageFile && logoImageFile.size > 0 && typeof logoImageFile.arrayBuffer === 'function') {
    try {
      const { uploadFile } = await import('@/lib/r2');
      const bytes = await logoImageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `clubs/${id}/logo-${Date.now()}-${logoImageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      logoUrl = await uploadFile(filename, buffer, logoImageFile.type);
    } catch (err) {
      console.error('Failed to upload club logo to R2:', err);
    }
  }

  try {
    const db = getDb();
    const updateValues: any = {
      name,
      description,
      city,
      zone,
      venue,
      meetingDayTime,
      presidentName,
      presidentPhone,
      presidentEmail,
      secretaryName,
      secretaryPhone,
      secretaryEmail,
      updatedAt: new Date(),
    };

    if (logoUrl) {
      updateValues.logoUrl = logoUrl;
    }

    await db.update(clubs).set(updateValues).where(eq(clubs.id, id));
    await recordAuditLog(`Updated Club Profile: ${name}`, 'club', id);

    const slugResult = await db.select({ slug: clubs.slug }).from(clubs).where(eq(clubs.id, id)).limit(1);
    revalidatePath('/admin/clubs');
    revalidatePath('/club-admin');
    revalidatePath('/clubs');
    if (slugResult[0]) {
      revalidatePath(`/clubs/${slugResult[0].slug}`);
    }
  } catch (error) {
    // Log but do not re-throw — throwing from a server action causes "unexpected response from server" in the client
    console.error('Failed to update club profile:', error);
  }
}


