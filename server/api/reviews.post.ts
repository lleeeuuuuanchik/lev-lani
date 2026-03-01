// ─── POST /api/reviews — Публичная отправка нового отзыва ────────────────────
// Любой посетитель может оставить отзыв. Новый отзыв получает approved = 0
// и появляется только после модерации администратором (/admin/reviews).
import { z } from 'zod';
import { useDatabase } from '../database/index';
import { reviews } from '../database/schema';

const schema = z.object({
	author:  z.string().min(2).max(80),
	service: z.string().min(1),
	text:    z.string().min(10).max(1000),
	rating:  z.number().int().min(1).max(5).default(5),
});

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const parsed = schema.safeParse(body);
	if (!parsed.success) {
		throw createError({ statusCode: 422, message: 'Validation error' });
	}

	const db = useDatabase();
	// approved по умолчанию 0 — не отображается на сайте до проверки
	await db.insert(reviews).values(parsed.data);

	return { ok: true };
});
