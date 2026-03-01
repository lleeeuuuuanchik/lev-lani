import { useDatabase } from '../database/index';
import { masters } from '../database/schema';
import { eq, asc } from 'drizzle-orm';

export default defineEventHandler(async () => {
	const db = useDatabase();
	return db.select().from(masters)
		.where(eq(masters.active, 1))
		.orderBy(asc(masters.order));
});
