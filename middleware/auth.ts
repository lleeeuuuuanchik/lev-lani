// ─── middleware/auth.ts — Защита маршрутов администратора ────────────────────
// Nuxt автоматически применяет этот middleware ко всем страницам, которые
// объявляют definePageMeta({ middleware: 'auth' }).
// Работает на клиенте (при навигации) и на сервере (при SSR).
export default defineNuxtRouteMiddleware(async (to) => {
	// Не мешаем маршрутам вне /admin (главная, privacy и т.д.)
	if (!to.path.startsWith('/admin')) return;

	// Страница логина доступна без авторизации — иначе бесконечный редирект
	if (to.path === '/admin/login') return;

	// useUserSession() — хук nuxt-auth-utils; читает sealed cookie с сессией
	const { loggedIn } = useUserSession();

	// Если сессия отсутствует или протухла — редиректим на логин
	if (!loggedIn.value) {
		return navigateTo('/admin/login');
	}
});
