import { useDatabase } from '~/server/database';
import { reviews } from '~/server/database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
	await requireUserSession(event);
	const id = Number(getRouterParam(event, 'id'));
	const db = useDatabase();
	await db.delete(reviews).where(eq(reviews.id, id));
	return { ok: true };
});
