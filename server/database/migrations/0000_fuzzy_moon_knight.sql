CREATE TABLE `submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`service` text NOT NULL,
	`message` text DEFAULT '',
	`created_at` integer
);
