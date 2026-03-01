import { useDatabase } from '../../../database/index';
import { masters } from '../../../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
	await requireUserSession(event);
	const id = Number(getRouterParam(event, 'id'));
	const db = useDatabase();
	await db.delete(masters).where(eq(masters.id, id));
	return { ok: true };
});
