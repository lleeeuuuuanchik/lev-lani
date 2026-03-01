// ─── База данных — Singleton-подключение к SQLite ─────────────────────────────
// Используем better-sqlite3 (синхронный драйвер) через Drizzle ORM.
// Один экземпляр _db переиспользуется на весь срок жизни Node-процесса —
// это важно, т.к. Nuxt server-side запускает handler-ы в одном процессе.

import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import * as schema from './schema';

// Singleton: инициализируется один раз, далее возвращается кешированный экземпляр
let _db: ReturnType<typeof drizzle> | null = null;

export function useDatabase() {
	// Возвращаем уже созданный экземпляр — избегаем открытия нескольких соединений
	if (_db) return _db;

	// dbFileName задаётся через .env → NUXT_DB_FILE_NAME (по умолчанию ./data/levlani.db)
	const config = useRuntimeConfig();
	const dbPath = config.dbFileName as string;

	// Создаём директорию для БД, если её ещё нет (например, ./data/)
	mkdirSync(dirname(dbPath), { recursive: true });

	const sqlite = new Database(dbPath);
	// WAL (Write-Ahead Logging) — повышает производительность конкурентных операций чтения
	sqlite.pragma('journal_mode = WAL');

	// Auto-create tables if they don't exist
	sqlite.exec(`
		CREATE TABLE IF NOT EXISTS submissions (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			phone TEXT NOT NULL,
			service TEXT NOT NULL,
			message TEXT DEFAULT '',
			created_at INTEGER
		);
		CREATE TABLE IF NOT EXISTS reviews (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			author TEXT NOT NULL,
			service TEXT NOT NULL,
			text TEXT NOT NULL,
			rating INTEGER DEFAULT 5,
			approved INTEGER DEFAULT 0,
			created_at INTEGER
		);
		CREATE TABLE IF NOT EXISTS services (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL,
			description TEXT DEFAULT '',
			price TEXT DEFAULT '',
			icon TEXT DEFAULT 'sparkles',
			"order" INTEGER DEFAULT 0,
			active INTEGER DEFAULT 1,
			created_at INTEGER
		);
		CREATE TABLE IF NOT EXISTS masters (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			role TEXT NOT NULL,
			spec TEXT DEFAULT '',
			exp TEXT DEFAULT '',
			initial TEXT NOT NULL,
			photo TEXT DEFAULT '',
			active INTEGER DEFAULT 1,
			"order" INTEGER DEFAULT 0,
			created_at INTEGER
		);
	`);

	// Migrate: add columns if they don't exist
	try { sqlite.exec(`ALTER TABLE reviews ADD COLUMN approved INTEGER DEFAULT 0;`); } catch {}

	// Seed default services if empty
	const cnt = (sqlite.prepare('SELECT COUNT(*) as c FROM services').get() as { c: number }).c;
	if (cnt === 0) {
		sqlite.exec(`
			INSERT INTO services (title, description, price, icon, "order", active) VALUES
			('Стрижка', 'Авторские стрижки любой сложности — от классики до современных трендов. Индивидуальный подход к форме лица.', 'от 2 500 ₽', 'scissors', 1, 1),
			('Окрашивание', 'Balayage, омбре, тонирование и классическое окрашивание. Используем только профессиональные краски.', 'от 4 000 ₽', 'palette', 2, 1),
			('Укладка', 'Вечерние и повседневные укладки для любого торжества. Ваши волосы — наше искусство.', 'от 1 800 ₽', 'wind', 3, 1),
			('Маникюр', 'Классический, аппаратный, покрытие гель-лаком. Дизайн ногтей любой сложности.', 'от 1 200 ₽', 'sparkles', 4, 1),
			('Брови и ресницы', 'Коррекция, окрашивание, ламинирование бровей и ресниц. Идеальный взгляд каждый день.', 'от 800 ₽', 'eye', 5, 1),
			('Уход за лицом', 'Профессиональные уходовые процедуры, чистки и массажи. Сияющая кожа без усилий.', 'от 3 000 ₽', 'heart', 6, 1);
		`);
	}

	// Seed default reviews if empty
	const revCnt = (sqlite.prepare('SELECT COUNT(*) as c FROM reviews').get() as { c: number }).c;
	if (revCnt === 0) {
		const ts = (daysAgo: number) => Math.floor((Date.now() - daysAgo * 86400000) / 1000);
		sqlite.exec(`
			INSERT INTO reviews (author, service, text, rating, approved, created_at) VALUES
			('Алина К.', 'Стрижка', 'Давно не получала такого удовольствия от похода в салон. Мастер идеально поняла, что я хотела — объёмная стрижка с лёгкими слоями, лицо преобразилось. Сама нарезала пряди так мастерски, что я уже три месяца хожу идеальная. Обязательно вернусь!', 5, 1, ${ts(5)}),
			('Мария Т.', 'Окрашивание', 'Делала балаяж — переживала, что будет слишком светло или неравномерно, но результат превзошёл все ожидания. Цвет получился натуральным, переходы мягкие, как будто так и было. Уже вторая клиентка спрашивает, где я красилась.', 5, 1, ${ts(12)}),
			('Светлана Р.', 'Маникюр', 'Покрытие держится уже четыре недели и ни одного скола. Мастер очень аккуратная, ногтевая пластина не пострадала совсем. Дизайн предложила сама — нежные линии, очень элегантно. Теперь только сюда.', 5, 1, ${ts(18)}),
			('Диана А.', 'Уход за лицом', 'Была на процедуре чистки и увлажняющего ухода. Кожа после неё как шёлк — ни одного покраснения, которое бывает после других мастеров. Буду приходить регулярно, результат реально заметен уже на следующий день.', 5, 1, ${ts(24)}),
			('Кристина В.', 'Брови и ресницы', 'Сделала коррекцию и окрашивание бровей. Мастер подобрала форму с учётом типа лица — стало намного гармоничнее. Теперь утром не трачу время на макияж. Сервис на высшем уровне, приятная атмосфера.', 5, 1, ${ts(31)}),
			('Зарина М.', 'Стрижка', 'Пришла с длинными волосами и смелым желанием — стрижка под бой. Мастер подробно обсудила варианты, показала референсы, убедилась что это точно то, чего я хочу. Результат — я в восторге, комплименты сыплются каждый день.', 5, 1, ${ts(38)}),
			('Тамара Б.', 'Укладка', 'Заказывала вечернюю укладку на свадьбу подруги. Сложная причёска с плетением и украшениями — держалась весь день и ещё половину ночи. Фотографии получились потрясающие. Однозначно рекомендую для особых событий!', 5, 1, ${ts(45)}),
			('Ирина О.', 'Окрашивание', 'Долго искала мастера для мелирования — везде либо дорого, либо результат не тот. Здесь всё идеально: цена честная, цвет именно тот, который я хотела, а волосы после процедуры остались мягкими. Стала постоянным клиентом.', 4, 1, ${ts(52)});
		`);
	}

	_db = drizzle(sqlite, { schema });
	return _db;
}
