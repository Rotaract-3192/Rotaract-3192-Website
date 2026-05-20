CREATE TABLE "past_leaders" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"year" text NOT NULL,
	"avatar_url" text,
	"theme_name" text,
	"citation" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
