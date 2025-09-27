DROP INDEX "message_index_shadow_idx";--> statement-breakpoint
DROP INDEX "message_index";--> statement-breakpoint
ALTER TABLE `chats` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
CREATE INDEX `message_index_shadow_idx` ON `message_index_shadow` (`index_key`);--> statement-breakpoint
CREATE INDEX `message_index` ON `messages` (`embedding`);--> statement-breakpoint
ALTER TABLE `messages` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT CURRENT_TIMESTAMP;