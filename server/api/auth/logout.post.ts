// ─── POST /api/auth/logout — Выход из системы ────────────────────────────────
// Удаляет сессионный cookie — пользователь теряет доступ к /admin/*.
export default defineEventHandler(async (event) => {
	await clearUserSession(event);
	return { success: true };
});
