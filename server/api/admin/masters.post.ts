import { useDatabase } from '../../database/index';
import { masters } from '../../database/schema';
import { z } from 'zod';

const schema = z.object({
	name: z.string().min(1),
	role: z.string().min(1),
	spec: z.string().optional().default(''),
	exp: z.string().optional().default(''),
	initial: z.string().min(1).max(2),
	photo: z.string().optional().default(''),
	active: z.number().int().min(0).max(1).optional().default(1),
	order: z.number().int().optional().default(0),
});

export default defineEventHandler(async (event) => {
	await requireUserSession(event);
	const body = await readBody(event);
	const data = schema.parse(body);
	const db = useDatabase();
	const result = await db.insert(masters).values(data).returning();
	return result[0];
});
