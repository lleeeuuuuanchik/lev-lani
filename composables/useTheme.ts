// ─── Система тем сайта ────────────────────────────────────────────────────────
// Тема применяется через data-theme атрибут на <html> — CSS переменные в
// _variables.scss реагируют на [data-theme="..."] и меняют цвета акцента.
// Выбор сохраняется в localStorage; при следующем визите тема восстанавливается
// через plugins/theme.client.ts (запускается клиентски до первого рендера).

export const THEMES = [
	{
		id: 'rose',
		name: 'Rose Cosmos',
		description: 'Классический розово-золотой',
		preview: '#c4818b',
		champagne: '#e8d5be',
	},
	{
		id: 'violet',
		name: 'Violet Galaxy',
		description: 'Мистический фиолетовый',
		preview: '#9b72cf',
		champagne: '#d8c8f0',
	},
	{
		id: 'sage',
		name: 'Sage Botanic',
		description: 'Природный шалфейный',
		preview: '#7aaa8a',
		champagne: '#c8e8d5',
	},
	{
		id: 'ocean',
		name: 'Ocean Abyss',
		description: 'Глубокий синий океан',
		preview: '#5b8cc8',
		champagne: '#b8d4f0',
	},
	{
		id: 'gold',
		name: 'Gold Desert',
		description: 'Золото пустыни',
		preview: '#c9a030',
		champagne: '#f0e0a0',
	},
	{
		id: 'cherry',
		name: 'Cherry Blossom',
		description: 'Тёмная вишня',
		preview: '#b5445a',
		champagne: '#f0d0d8',
	},
	{
		id: 'midnight',
		name: 'Midnight Indigo',
		description: 'Полночный индиго',
		preview: '#6e7cc8',
		champagne: '#c0c8f0',
	},
	{
		id: 'copper',
		name: 'Copper',
		description: 'Медь и бронза',
		preview: '#b87040',
		champagne: '#f0d0a0',
	},
	{
		id: 'arctic',
		name: 'Arctic Mint',
		description: 'Арктическая мята',
		preview: '#5bbab0',
		champagne: '#b8ecea',
	},
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];

// Ключ для хранения выбранной темы в localStorage
const STORAGE_KEY = 'levlani-theme';

export function useTheme() {
	// useState — реактивный глобальный стейт Nuxt (аналог composable-singleton).
	// 'theme' — ключ стора, 'rose' — тема по умолчанию.
	const currentTheme = useState<ThemeId>('theme', () => 'rose');

	// Применяет тему: устанавливает data-theme на <html>, пишет в localStorage, обновляет стейт.
	// Пропускается на сервере (SSR), т.к. document/localStorage недоступны.
	const applyTheme = (id: ThemeId) => {
		if (!import.meta.client) return;
		document.documentElement.setAttribute('data-theme', id);
		localStorage.setItem(STORAGE_KEY, id);
		currentTheme.value = id;
	};

	// Читает сохранённую тему из localStorage и применяет её.
	// Вызывается в plugins/theme.client.ts при старте приложения.
	// Если сохранённое значение невалидно — fallback на 'rose'.
	const initTheme = () => {
		if (!import.meta.client) return;
		const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
		const theme = saved && THEMES.find(t => t.id === saved) ? saved : 'rose';
		applyTheme(theme);
	};

	return { THEMES, currentTheme, applyTheme, initTheme };
}
