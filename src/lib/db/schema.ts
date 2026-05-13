import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  role: text('role').default('member'),
  clubId: text('club_id'),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  points: integer('points').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const clubs = sqliteTable('clubs', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  charterDate: integer('charter_date', { mode: 'timestamp' }),
  description: text('description'),
  logoUrl: text('logo_url'),
  presidentId: text('president_id'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const events = sqliteTable('events', {
  id: text('id').primaryKey(),
  clubId: text('club_id').notNull(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  eventDate: integer('event_date', { mode: 'timestamp' }).notNull(),
  location: text('location'),
  imageUrl: text('image_url'),
  isSignatureProject: integer('is_signature_project', { mode: 'boolean' }).default(false),
  status: text('status').default('upcoming'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const eventRegistrations = sqliteTable('event_registrations', {
  id: text('id').primaryKey(),
  eventId: text('event_id').notNull(),
  userId: text('user_id').notNull(),
  registeredAt: integer('registered_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  status: text('status').default('confirmed'),
});

export const campaigns = sqliteTable('campaigns', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  goalAmount: real('goal_amount').notNull(),
  raisedAmount: real('raised_amount').default(0),
  status: text('status').default('active'),
  createdBy: text('created_by').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const courses = sqliteTable('courses', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  thumbnailUrl: text('thumbnail_url'),
  modulesCount: integer('modules_count').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const feeds = sqliteTable('feeds', {
  id: text('id').primaryKey(),
  type: text('type'),
  title: text('title').notNull(),
  content: text('content'),
  mediaUrl: text('media_url'),
  authorId: text('author_id'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const jobs = sqliteTable('jobs', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  company: text('company'),
  location: text('location'),
  type: text('type'),
  description: text('description'),
  applyUrl: text('apply_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const moms = sqliteTable('moms', {
  id: text('id').primaryKey(),
  clubId: text('club_id'),
  title: text('title').notNull(),
  meetingDate: integer('meeting_date', { mode: 'timestamp' }).notNull(),
  fileUrl: text('file_url'),
  status: text('status').default('pending'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const newsletters = sqliteTable('newsletters', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  issueDate: integer('issue_date', { mode: 'timestamp' }).notNull(),
  fileUrl: text('file_url'),
  thumbnailUrl: text('thumbnail_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const announcements = sqliteTable('announcements', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  priority: text('priority').default('normal'),
  createdBy: text('created_by'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const coldStorageFiles = sqliteTable('cold_storage_files', {
  id: text('id').primaryKey(),
  fileName: text('file_name').notNull(),
  fileSize: integer('file_size').notNull(),
  mimeType: text('mime_type'),
  r2Key: text('r2_key').notNull().unique(),
  uploadedBy: text('uploaded_by').notNull(),
  category: text('category').default('general'),
  isPublic: integer('is_public', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export const userAchievements = sqliteTable('user_achievements', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  badgeIcon: text('badge_icon'),
  awardedAt: integer('awarded_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});
