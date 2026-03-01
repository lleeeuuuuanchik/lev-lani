// ─── POST /api/auth/login — Авторизация администратора ───────────────────────
// Сравнивает email/password с переменными окружения (не с БД — единственный admin).
// При успехе создаёт зашифрованную сессию в cookie через nuxt-auth-utils.
import { z } from 'zod';

const bodySchema = z.object({
	email:    z.string().email(),
	password: z.string().min(1),
});

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const parsed = bodySchema.safeParse(body);

	if (!parsed.success) {
		throw createError({ statusCode: 400, statusMessage: 'Invalid credentials' });
	}

	// Учётные данные хранятся только в .env — никогда не в коде или БД
	const config = useRuntimeConfig();

	if (
		parsed.data.email    !== config.adminEmail ||
		parsed.data.password !== config.adminPassword
	) {
		// Возвращаем 401 без конкретики — не раскрываем какое поле неверно
		throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' });
	}

	// setUserSession создаёт sealed cookie с payload { user: { email } }
	// Ключ шифрования — NUXT_SESSION_PASSWORD из .env (минимум 32 символа)
	await setUserSession(event, { user: { email: parsed.data.email } });
	return { success: true };
});
