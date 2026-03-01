import { useDatabase } from '~/server/database';
import { services } from '~/server/database/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const schema = z.object({
	title: z.string().min(1).optional(),
	description: z.string().optional(),
	price: z.string().optional(),
	icon: z.string().optional(),
	order: z.number().optional(),
	active: z.number().optional(),
});

export default defineEventHandler(async (event) => {
	const session = await getUserSession(event);
	if (!session?.user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
	const id = Number(getRouterParam(event, 'id'));
	const body = await readBody(event);
	const parsed = schema.safeParse(body);
	if (!parsed.success) throw createError({ statusCode: 422, statusMessage: 'Validation error' });
	const db = useDatabase();
	await db.update(services).set(parsed.data).where(eq(services.id, id));
	return { ok: true };
});
