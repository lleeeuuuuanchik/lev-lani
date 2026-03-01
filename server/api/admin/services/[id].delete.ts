import { useDatabase } from '~/server/database';
import { services } from '~/server/database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
	const session = await getUserSession(event);
	if (!session?.user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
	const id = Number(getRouterParam(event, 'id'));
	const db = useDatabase();
	await db.delete(services).where(eq(services.id, id));
	return { ok: true };
});
