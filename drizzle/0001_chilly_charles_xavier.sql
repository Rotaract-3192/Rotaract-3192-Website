CREATE TABLE "analytics_events" (
	"id" text PRIMARY KEY NOT NULL,
	"event_type" text NOT NULL,
	"event_metadata" text,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "district_settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "status" text DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "posted_by" text;