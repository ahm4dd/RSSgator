ALTER TABLE "feeds" ADD COLUMN "last_fetch_at" timestamp;--> statement-breakpoint
ALTER TABLE "feeds" DROP COLUMN "last_fetched_at";