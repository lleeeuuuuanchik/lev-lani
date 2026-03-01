import { useDatabase } from '~/server/database';
import { reviews } from '~/server/database/schema';
import { desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
	const session = await getUserSession(event);
	if (!session?.user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
	const db = useDatabase();
	return db.select().from(reviews).orderBy(desc(reviews.createdAt));
});
