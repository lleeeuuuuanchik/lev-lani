import { useDatabase } from '~/server/database';
import { services } from '~/server/database/schema';
import { asc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
	const session = await getUserSession(event);
	if (!session?.user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
	const db = useDatabase();
	return db.select().from(services).orderBy(asc(services.order));
});
