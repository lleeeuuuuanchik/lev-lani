import tailwindcss from '@tailwindcss/vite';

// ─── Nuxt Configuration — Lev & Lani Beauty Studio ───────────────────────────
// Полная конфигурация приложения: модули, стили, сборка и серверные переменные.
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },

	// Активные Nuxt-модули:
	// @pinia/nuxt       — реактивное хранилище состояния (confirm-dialog)
	// @vueuse/nuxt      — авто-импорт хуков VueUse (useElementSize и т.д.)
	// @nuxt/content     — чтение YAML-файлов из /content/services/
	// nuxt-auth-utils   — сессии через sealed cookie (requireUserSession, setUserSession)
	modules: [
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxt/content',
		'nuxt-auth-utils',
	],

	// Серверные переменные окружения (доступны только на сервере через useRuntimeConfig())
	// Значения берутся из .env — никогда не попадают в клиентский бандл
	runtimeConfig: {
		sessionPassword: process.env.NUXT_SESSION_PASSWORD, // ключ шифрования сессии (32+ символа)
		adminEmail:      process.env.NUXT_ADMIN_EMAIL,      // логин администратора
		adminPassword:   process.env.NUXT_ADMIN_PASSWORD,   // пароль администратора
		dbFileName:      process.env.NUXT_DB_FILE_NAME || './data/levlani.db', // путь к SQLite
		// public.* попадают в клиент — используем только для не-секретных настроек
		public: {
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://levlani.ru',
		},
	},

	// Глобальные <head> теги: применяются ко ВСЕМ страницам
	// Cormorant Garamond — для заголовков (italic, 300-700)
	// Inter — тело страницы, грузится локально из /assets/fonts/
	app: {
		head: {
			// Язык документа — критично для SEO и доступности
			htmlAttrs: { lang: 'ru' },
			meta: [
				// Запрещаем iOS автоматически «кликабелить» телефоны (иначе schema.org telephone конфликтует)
				{ name: 'format-detection', content: 'telephone=no' },
				// Глобальные Open Graph — переопределяются в useSeoMeta() на каждой странице
				{ property: 'og:locale',    content: 'ru_RU' },
				{ property: 'og:site_name', content: 'Lev & Lani Beauty Studio' },
				// Разрешаем индексацию + large image previews в Google (важно для rich snippets)
				{ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
				// Цвет адресной строки браузера (Chrome Android, Safari)
				{ name: 'theme-color', content: '#080a0c' },
				// Geo-теги — помогают локальным поисковикам
				{ name: 'geo.region',   content: 'RU-SE' },
				{ name: 'geo.placename', content: 'Владикавказ' },
			],
			link: [
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap',
				},
			],
		},
	},

	// Глобальные стили:
	// index.scss  — базовый reset + глобальные SCSS-правила (toast, transitions)
	// tailwind.css — точка входа Tailwind v4 (@import "tailwindcss")
	css: ['@/assets/styles/index.scss', '@/assets/styles/tailwind.css'],

	vite: {
		// Tailwind v4 подключается как Vite-плагин (не через PostCSS)
		plugins: [tailwindcss()],

		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern',
					silenceDeprecations: ['import', 'global-builtin', 'legacy-js-api'],
					// Инжектируем переменные и миксины в каждый .scss файл автоматически —
					// нет нужды вручную @import их в каждом компоненте
					additionalData: `@use "@/assets/styles/base/_variables.scss" as *; @use "@/assets/styles/base/_mixins.scss" as *;`,
				},
			},
		},
	},
})
