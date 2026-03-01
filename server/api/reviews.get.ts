import { useDatabase } from '~/server/database';
import { reviews } from '~/server/database/schema';
import { eq, desc } from 'drizzle-orm';

export default defineEventHandler(async () => {
	const db = useDatabase();
	return db.select().from(reviews).where(eq(reviews.approved, 1)).orderBy(desc(reviews.createdAt)).limit(50);
});
