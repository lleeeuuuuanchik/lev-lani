// ─── Database Schema — Drizzle ORM + SQLite ──────────────────────────────────
// Описывает структуру всех таблиц базы данных.
// Drizzle генерирует типы TypeScript прямо из схемы — отдельные типы не нужны.
// Файл используется drizzle-kit для генерации миграций (npm run db:generate).
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// ─── submissions: заявки с формы записи ──────────────────────────────────────
// Клиент заполняет имя, телефон, услугу и сообщение.
// Записи видны только в админке (/admin) — требуют авторизации.
export const submissions = sqliteTable('submissions', {
	id:        integer('id').primaryKey({ autoIncrement: true }),
	name:      text('name').notNull(),
	phone:     text('phone').notNull(),
	service:   text('service').notNull(),
	message:   text('message').default(''),
	// Храним как UNIX timestamp (секунды); mode: 'timestamp' даёт JS Date при чтении
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// ─── reviews: отзывы клиентов ────────────────────────────────────────────────
// Любой посетитель может оставить отзыв через форму на сайте.
// Новые отзывы имеют approved = 0 (на модерации) — на сайте не отображаются.
// Администратор меняет approved = 1 чтобы опубликовать отзыв.
export const reviews = sqliteTable('reviews', {
	id:        integer('id').primaryKey({ autoIncrement: true }),
	author:    text('author').notNull(),
	service:   text('service').notNull(),   // название услуги, которой воспользовался клиент
	text:      text('text').notNull(),
	rating:    integer('rating').default(5),    // 1-5 звёзд
	approved:  integer('approved').default(0),  // 0 = черновик, 1 = опубликован
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// ─── services: услуги салона ─────────────────────────────────────────────────
// Список услуг управляется через админку (/admin/services).
// Клиентская сторона запрашивает только active = 1, сортируя по order.
// icon — ключ иконки из Lucide (scissors, palette, wind, hand, eye, sparkles, star, flower2, gem, heart)
export const services = sqliteTable('services', {
	id:          integer('id').primaryKey({ autoIncrement: true }),
	title:       text('title').notNull(),
	description: text('description').default(''),
	price:       text('price').default(''),       // строка, например «от 2 500 ₽»
	icon:        text('icon').default('sparkles'), // ключ Lucide-иконки
	order:       integer('order').default(0),      // порядок отображения (по возрастанию)
	active:      integer('active').default(1),     // 0 = скрыта, 1 = активна
	createdAt:   integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// ─── masters: мастера салона ─────────────────────────────────────────────────
// Управляется через /admin/masters.
// initial — первая буква имени (используется как аватар-заглушка если нет фото).
// photo — URL изображения (опционально, может быть пустым).
export const masters = sqliteTable('masters', {
	id:        integer('id').primaryKey({ autoIncrement: true }),
	name:      text('name').notNull(),
	role:      text('role').notNull(),     // должность, например «Стилист · Колорист»
	spec:      text('spec').default(''),   // специализация (дополнительно)
	exp:       text('exp').default(''),    // опыт работы, например «7 лет»
	initial:   text('initial').notNull(), // первая буква имени для аватара
	photo:     text('photo').default(''), // URL фото или пусто
	active:    integer('active').default(1),
	order:     integer('order').default(0),
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// ─── TypeScript типы (выводятся из схемы автоматически) ──────────────────────
export type Submission    = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;
export type Review        = typeof reviews.$inferSelect;
export type NewReview     = typeof reviews.$inferInsert;
export type Service       = typeof services.$inferSelect;
export type NewService    = typeof services.$inferInsert;
export type Master        = typeof masters.$inferSelect;
export type NewMaster     = typeof masters.$inferInsert;
