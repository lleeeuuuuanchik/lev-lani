import { useDatabase } from '../../database/index';
import { masters } from '../../database/schema';
import { asc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
	await requireUserSession(event);
	const db = useDatabase();
	return db.select().from(masters).orderBy(asc(masters.order));
});
