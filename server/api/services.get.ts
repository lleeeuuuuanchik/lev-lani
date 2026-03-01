import { useDatabase } from '~/server/database';
import { services } from '~/server/database/schema';
import { eq, asc } from 'drizzle-orm';

export default defineEventHandler(async () => {
	const db = useDatabase();
	return db.select().from(services).where(eq(services.active, 1)).orderBy(asc(services.order));
});
