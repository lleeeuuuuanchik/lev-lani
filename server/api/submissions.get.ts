// ─── GET /api/submissions — Список всех заявок (только для админа) ───────────
// Защищённый эндпоинт: возвращает все заявки клиентов в обратном хронологическом порядке.
import { useDatabase } from '../database/index';
import { submissions } from '../database/schema';
import { desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
	// requireUserSession бросает 401 если сессия отсутствует или недействительна
	await requireUserSession(event);

	const db = useDatabase();
	const rows = await db
		.select()
		.from(submissions)
		.orderBy(desc(submissions.createdAt)); // сначала новые

	return rows;
});
