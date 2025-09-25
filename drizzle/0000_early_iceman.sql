-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `conversations` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`whatsapp_chat_id` text NOT NULL,
	`title` text,
	`is_group` integer DEFAULT 0,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`conversation_id` integer NOT NULL,
	`author` text,
	`from_me` integer NOT NULL,
	`body` text,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`embedding` numeric NOT NULL,
	FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `message_index` ON `messages` (``);--> statement-breakpoint
CREATE TABLE `message_index_shadow` (
	`index_key` integer PRIMARY KEY,
	`data` blob
);
--> statement-breakpoint
CREATE INDEX `message_index_shadow_idx` ON `message_index_shadow` (`index_key`);
*/