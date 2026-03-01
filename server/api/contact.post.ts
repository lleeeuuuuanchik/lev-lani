// ─── POST /api/contact — Обработка формы записи клиента ──────────────────────
// Принимает данные формы, валидирует через Zod и сохраняет в SQLite.
// Публичный эндпоинт — авторизация не требуется.
import { z } from 'zod';
import { useDatabase } from '../database/index';
import { submissions } from '../database/schema';

// Схема валидации: определяет допустимые поля и их ограничения
const bodySchema = z.object({
	name:    z.string().min(1).max(100),
	phone:   z.string().min(10).max(30),
	service: z.string().min(1).max(100),
	message: z.string().max(1000).optional().default(''),
});

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	// safeParse не бросает исключение — возвращает { success, data } или { success: false, error }
	const parsed = bodySchema.safeParse(body);
	if (!parsed.success) {
		throw createError({ statusCode: 400, statusMessage: 'Invalid data' });
	}

	// useDatabase() возвращает singleton drizzle-инстанс, создавая БД при первом вызове
	const db = useDatabase();
	await db.insert(submissions).values(parsed.data);

	return { success: true };
});
