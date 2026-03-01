import { useDatabase } from '~/server/database';
import { reviews } from '~/server/database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
	const session = await getUserSession(event);
	if (!session?.user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
	const id = Number(getRouterParam(event, 'id'));
	const { approved } = await readBody(event);
	const db = useDatabase();
	await db.update(reviews).set({ approved: approved ? 1 : 0 }).where(eq(reviews.id, id));
	return { ok: true };
});
