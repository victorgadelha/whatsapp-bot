CREATE TABLE `chats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`whatsapp_chat_id` text NOT NULL,
	`title` text,
	`is_group` integer DEFAULT 0,
	`created_at` text DEFAULT 'sql`(CURRENT_TIMESTAMP)`' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `message_index_shadow` (
	`index_key` integer PRIMARY KEY NOT NULL,
	`data` blob
);
--> statement-breakpoint
CREATE INDEX `message_index_shadow_idx` ON `message_index_shadow` (`index_key`);--> statement-breakpoint
CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chat_id` integer NOT NULL,
	`author` text,
	`from_me` integer NOT NULL,
	`body` text,
	`timestamp` text DEFAULT 'sql`(CURRENT_TIMESTAMP)`' NOT NULL,
	`embedding` numeric NOT NULL,
	FOREIGN KEY (`chat_id`) REFERENCES `chats`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `message_index` ON `messages` (`embedding`);