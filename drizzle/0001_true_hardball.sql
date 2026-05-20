ALTER TABLE "events" ALTER COLUMN "club_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "event_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "city" text;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "zone" text;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "venue" text;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "meeting_day_time" text;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "president_name" text;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "president_phone" text;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "president_email" text;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "secretary_name" text;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "secretary_phone" text;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "secretary_email" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "category" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "entry_type" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "year_date_label" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "full_content" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "gallery_images" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "featured_links" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "rsvp_link" text;