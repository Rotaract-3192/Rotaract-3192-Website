CREATE TABLE `announcements` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`priority` text DEFAULT 'normal',
	`created_by` text,
	`created_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE TABLE `attendance` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`event_id` text NOT NULL,
	`status` text DEFAULT 'present',
	`marked_by` text,
	`created_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`user_name` text,
	`action` text NOT NULL,
	`resource_type` text,
	`resource_id` text,
	`timestamp` text DEFAULT (datetime('now')),
	`severity` text DEFAULT 'info'
);
--> statement-breakpoint
CREATE TABLE `campaigns` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`goal_amount` real NOT NULL,
	`raised_amount` real DEFAULT 0,
	`status` text DEFAULT 'active',
	`created_by` text NOT NULL,
	`created_at` text DEFAULT (datetime('now')),
	`updated_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE TABLE `clubs` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`charter_date` text,
	`description` text,
	`logo_url` text,
	`president_id` text,
	`city` text,
	`zone` text,
	`venue` text,
	`meeting_day_time` text,
	`president_name` text,
	`president_phone` text,
	`president_email` text,
	`secretary_name` text,
	`secretary_phone` text,
	`secretary_email` text,
	`created_at` text DEFAULT (datetime('now')),
	`updated_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `clubs_slug_unique` ON `clubs` (`slug`);--> statement-breakpoint
CREATE TABLE `cold_storage_files` (
	`id` text PRIMARY KEY NOT NULL,
	`file_name` text NOT NULL,
	`file_size` integer NOT NULL,
	`mime_type` text,
	`r2_key` text NOT NULL,
	`uploaded_by` text NOT NULL,
	`category` text DEFAULT 'general',
	`is_public` integer DEFAULT false,
	`created_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cold_storage_files_r2_key_unique` ON `cold_storage_files` (`r2_key`);--> statement-breakpoint
CREATE TABLE `course_modules` (
	`id` text PRIMARY KEY NOT NULL,
	`course_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`video_url` text,
	`duration` integer,
	`order` integer DEFAULT 0,
	`created_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`thumbnail_url` text,
	`modules_count` integer DEFAULT 0,
	`created_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE TABLE `event_registrations` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`user_id` text NOT NULL,
	`registered_at` text DEFAULT (datetime('now')),
	`status` text DEFAULT 'confirmed'
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`club_id` text,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`event_date` text,
	`location` text,
	`image_url` text,
	`is_signature_project` integer DEFAULT false,
	`status` text DEFAULT 'upcoming',
	`category` text,
	`entry_type` text,
	`year_date_label` text,
	`full_content` text,
	`gallery_images` text,
	`featured_links` text,
	`rsvp_link` text,
	`max_attendees` integer,
	`current_attendees` integer DEFAULT 0,
	`ai_score` integer,
	`ai_analysis` text,
	`created_at` text DEFAULT (datetime('now')),
	`updated_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `events_slug_unique` ON `events` (`slug`);--> statement-breakpoint
CREATE TABLE `feeds` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text,
	`title` text NOT NULL,
	`content` text,
	`media_url` text,
	`author_id` text,
	`created_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`company` text,
	`location` text,
	`type` text,
	`description` text,
	`apply_url` text,
	`created_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE TABLE `mentorship_applications` (
	`id` text PRIMARY KEY NOT NULL,
	`mentor_id` text NOT NULL,
	`mentee_id` text NOT NULL,
	`message` text,
	`status` text DEFAULT 'pending',
	`domain` text,
	`created_at` text DEFAULT (datetime('now')),
	`updated_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE TABLE `moms` (
	`id` text PRIMARY KEY NOT NULL,
	`club_id` text,
	`title` text NOT NULL,
	`meeting_date` text NOT NULL,
	`file_url` text,
	`status` text DEFAULT 'pending',
	`created_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE TABLE `newsletters` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`issue_date` text NOT NULL,
	`file_url` text,
	`thumbnail_url` text,
	`created_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE TABLE `past_leaders` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`year` text NOT NULL,
	`avatar_url` text,
	`theme_name` text,
	`citation` text,
	`created_at` text DEFAULT (datetime('now')),
	`updated_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE TABLE `point_transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`points` integer NOT NULL,
	`reason` text NOT NULL,
	`category` text DEFAULT 'general' NOT NULL,
	`awarded_by` text,
	`event_id` text,
	`created_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE TABLE `service_hours` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`event_id` text,
	`hours` real NOT NULL,
	`description` text,
	`logged_at` text DEFAULT (datetime('now')),
	`approved_by` text
);
--> statement-breakpoint
CREATE TABLE `user_achievements` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`badge_icon` text,
	`awarded_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`first_name` text,
	`last_name` text,
	`role` text DEFAULT 'member',
	`permission_bits` integer DEFAULT 0,
	`club_id` text,
	`bio` text,
	`avatar_url` text,
	`points` integer DEFAULT 0,
	`created_at` text DEFAULT (datetime('now')),
	`updated_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);