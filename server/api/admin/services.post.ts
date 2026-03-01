import { useDatabase } from '~/server/database';
import { services } from '~/server/database/schema';
import { z } from 'zod';

const schema = z.object({
	title: z.string().min(1),
	description: z.string().default(''),
	price: z.string().default(''),
	icon: z.string().default('sparkles'),
	order: z.number().default(0),
	active: z.number().default(1),
});

export default defineEventHandler(async (event) => {
	const session = await getUserSession(event);
	if (!session?.user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
	const body = await readBody(event);
	const parsed = schema.safeParse(body);
	if (!parsed.success) throw createError({ statusCode: 422, statusMessage: 'Validation error' });
	const db = useDatabase();
	const result = await db.insert(services).values(parsed.data).returning();
	return result[0];
});
