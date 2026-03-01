import { useDatabase } from '../../../database/index';
import { masters } from '../../../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
	await requireUserSession(event);
	const id = Number(getRouterParam(event, 'id'));
	const body = await readBody(event);
	const db = useDatabase();
	const result = await db.update(masters).set(body).where(eq(masters.id, id)).returning();
	if (!result.length) throw createError({ statusCode: 404 });
	return result[0];
});
