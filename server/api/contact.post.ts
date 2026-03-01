// ─── POST /api/contact — Обработка формы записи клиента ──────────────────────
// Принимает данные формы, валидирует через Zod и сохраняет в SQLite.
// После сохранения отправляет уведомление в Telegram.
// Публичный эндпоинт — авторизация не требуется.
import { z } from 'zod';
import { useDatabase } from '../database/index';
import { submissions } from '../database/schema';

// Схема валидации: определяет допустимые поля и их ограничения
const bodySchema = z.object({
	name:    z.string().min(1).max(100),
	phone:   z.string().min(10).max(30),
	service: z.string().min(1).max(100),
	message: z.string().max(1000).optional().default(''),
});

// ─── Отправка уведомления в Telegram ─────────────────────────────────────────
async function sendTelegramNotification(data: {
	name: string;
	phone: string;
	service: string;
	message: string;
}) {
	const config = useRuntimeConfig();
	if (!config.tgBotToken || !config.tgChatId) return; // если не настроено — пропускаем

	const date = new Date().toLocaleString('ru-RU', {
		timeZone: 'Europe/Moscow',
		day:    '2-digit',
		month:  '2-digit',
		year:   'numeric',
		hour:   '2-digit',
		minute: '2-digit',
	});

	const text = [
		`🌸 <b>Новая заявка — Lev &amp; Lani</b>`,
		``,
		`👤 <b>Имя:</b> ${data.name}`,
		`📞 <b>Телефон:</b> ${data.phone}`,
		`💅 <b>Услуга:</b> ${data.service}`,
		data.message ? `💬 <b>Сообщение:</b> ${data.message}` : '',
		``,
		`🕐 ${date} (МСК)`,
	].filter(Boolean).join('\n');

	await $fetch(`https://api.telegram.org/bot${config.tgBotToken}/sendMessage`, {
		method: 'POST',
		body: {
			chat_id:    config.tgChatId,
			text,
			parse_mode: 'HTML',
		},
	}).catch((err) => {
		// Не блокируем ответ клиенту если TG недоступен
		console.error('[TG notify] failed:', err?.message, err?.data);
	});
}

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	// safeParse не бросает исключение — возвращает { success, data } или { success: false, error }
	const parsed = bodySchema.safeParse(body);
	if (!parsed.success) {
		throw createError({ statusCode: 400, statusMessage: 'Invalid data' });
	}

	// useDatabase() возвращает singleton drizzle-инстанс, создавая БД при первом вызове
	const db = useDatabase();
	await db.insert(submissions).values(parsed.data);

	// Уведомление в Telegram — не await, чтобы не замедлять ответ клиенту
	sendTelegramNotification(parsed.data);

	return { success: true };
});
