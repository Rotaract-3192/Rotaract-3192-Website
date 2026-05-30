import { pgTable, text, integer, real, boolean, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  role: text('role').default('member'),
  permissionBits: integer('permission_bits').default(0),
  clubId: text('club_id'),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  points: integer('points').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const clubs = pgTable('clubs', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  charterDate: timestamp('charter_date'),
  description: text('description'),
  logoUrl: text('logo_url'),
  presidentId: text('president_id'),
  city: text('city'),
  zone: text('zone'),
  venue: text('venue'),
  meetingDayTime: text('meeting_day_time'),
  presidentName: text('president_name'),
  presidentPhone: text('president_phone'),
  presidentEmail: text('president_email'),
  secretaryName: text('secretary_name'),
  secretaryPhone: text('secretary_phone'),
  secretaryEmail: text('secretary_email'),
  points: integer('points').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const events = pgTable('events', {
  id: text('id').primaryKey(),
  clubId: text('club_id'),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  eventDate: timestamp('event_date'),
  location: text('location'),
  imageUrl: text('image_url'),
  isSignatureProject: boolean('is_signature_project').default(false),
  status: text('status').default('upcoming'),
  category: text('category'),
  entryType: text('entry_type'),
  yearDateLabel: text('year_date_label'),
  fullContent: text('full_content'),
  galleryImages: text('gallery_images'),
  featuredLinks: text('featured_links'),
  rsvpLink: text('rsvp_link'),
  maxAttendees: integer('max_attendees'),
  currentAttendees: integer('current_attendees').default(0),
  aiScore: integer('ai_score'),
  aiAnalysis: text('ai_analysis'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const eventRegistrations = pgTable('event_registrations', {
  id: text('id').primaryKey(),
  eventId: text('event_id').notNull(),
  userId: text('user_id').notNull(),
  registeredAt: timestamp('registered_at').defaultNow(),
  status: text('status').default('confirmed'),
});

export const campaigns = pgTable('campaigns', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  goalAmount: real('goal_amount').notNull(),
  raisedAmount: real('raised_amount').default(0),
  status: text('status').default('active'),
  createdBy: text('created_by').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const courses = pgTable('courses', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  thumbnailUrl: text('thumbnail_url'),
  modulesCount: integer('modules_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const feeds = pgTable('feeds', {
  id: text('id').primaryKey(),
  type: text('type'),
  title: text('title').notNull(),
  content: text('content'),
  mediaUrl: text('media_url'),
  authorId: text('author_id'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const jobs = pgTable('jobs', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  company: text('company'),
  location: text('location'),
  type: text('type'),
  description: text('description'),
  applyUrl: text('apply_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const moms = pgTable('moms', {
  id: text('id').primaryKey(),
  clubId: text('club_id'),
  title: text('title').notNull(),
  meetingDate: timestamp('meeting_date').notNull(),
  fileUrl: text('file_url'),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const newsletters = pgTable('newsletters', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  issueDate: timestamp('issue_date').notNull(),
  fileUrl: text('file_url'),
  thumbnailUrl: text('thumbnail_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const announcements = pgTable('announcements', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  priority: text('priority').default('normal'),
  createdBy: text('created_by'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const coldStorageFiles = pgTable('cold_storage_files', {
  id: text('id').primaryKey(),
  fileName: text('file_name').notNull(),
  fileSize: integer('file_size').notNull(),
  mimeType: text('mime_type'),
  r2Key: text('r2_key').notNull().unique(),
  uploadedBy: text('uploaded_by').notNull(),
  category: text('category').default('general'),
  isPublic: boolean('is_public').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userAchievements = pgTable('user_achievements', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  badgeIcon: text('badge_icon'),
  awardedAt: timestamp('awarded_at').defaultNow(),
});

// Mentorship Applications: tracks mentor/mentee pairings
export const mentorshipApplications = pgTable('mentorship_applications', {
  id: text('id').primaryKey(),
  mentorId: text('mentor_id').notNull(),   // users.id
  menteeId: text('mentee_id').notNull(),   // users.id
  message: text('message'),               // why they want to connect
  status: text('status').default('pending'), // 'pending', 'accepted', 'rejected', 'completed'
  domain: text('domain'),                 // e.g. 'leadership', 'marketing', 'technology'
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Course Modules: child records for each course in the LMS
export const courseModules = pgTable('course_modules', {
  id: text('id').primaryKey(),
  courseId: text('course_id').notNull(),   // courses.id
  title: text('title').notNull(),
  description: text('description'),
  videoUrl: text('video_url'),
  duration: integer('duration'),           // in minutes
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// Service Hours: tracks volunteer/service hours logged by members
export const serviceHours = pgTable('service_hours', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),       // users.id
  eventId: text('event_id'),              // events.id (optional if logged independently)
  hours: real('hours').notNull(),
  description: text('description'),
  loggedAt: timestamp('logged_at').defaultNow(),
  approvedBy: text('approved_by'),         // admin users.id
});

// Audit Logs: tracking all administrative actions
export const auditLogs = pgTable('audit_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  userName: text('user_name'),
  action: text('action').notNull(),
  resourceType: text('resource_type'), // 'event', 'club', 'member', etc.
  resourceId: text('resource_id'),
  timestamp: timestamp('timestamp').defaultNow(),
  severity: text('severity').default('info'), // 'info', 'warning', 'critical'
});

// Past Leaders: timeline of historical District leaders (DRRs, Secretary, etc.)
export const pastLeaders = pgTable('past_leaders', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  year: text('year').notNull(),
  avatarUrl: text('avatar_url'),
  themeName: text('theme_name'),
  citation: text('citation'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Point Transactions: ledger of all points awarded to members
export const pointTransactions = pgTable('point_transactions', {
  id: text('id').primaryKey(),
  userId: text('user_id'),
  clubId: text('club_id'),
  points: integer('points').notNull(),
  reason: text('reason').notNull(),
  category: text('category').notNull().default('general'), // service | professional | fellowship | leadership | attendance
  awardedBy: text('awarded_by'),
  eventId: text('event_id'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Attendance: tracks who attended which event/meeting
export const attendance = pgTable('attendance', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  eventId: text('event_id').notNull(),
  status: text('status').default('present'), // present | absent | excused
  markedBy: text('marked_by'),
  createdAt: timestamp('created_at').defaultNow(),
});
