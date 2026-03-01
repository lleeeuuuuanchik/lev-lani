# Lev & Lani — Beauty Studio

Сайт салона красоты с публичной витриной, формой записи и защищённой панелью администратора. Построен на **Nuxt 4** с тёмной luxury-темой, GSAP-анимациями и SQLite-базой данных.

---

## Содержание

- [Стек технологий](#стек-технологий)
- [Архитектура проекта](#архитектура-проекта)
- [Дизайн-система](#дизайн-система)
- [Запуск и разработка](#запуск-и-разработка)
- [Переменные окружения](#переменные-окружения)
- [База данных](#база-данных)
- [API-эндпоинты](#api-эндпоинты)
- [Публичный сайт](#публичный-сайт)
- [Панель администратора](#панель-администратора)
- [Система тем](#система-тем)
- [Анимации GSAP](#анимации-gsap)
- [Структура файлов](#структура-файлов)

---

## Стек технологий

| Категория | Технология |
|---|---|
| Framework | Nuxt 4 (Vue 3, SSR) |
| Стили | SCSS + Tailwind CSS v4 (Vite-плагин) |
| Анимации | GSAP + ScrollTrigger |
| База данных | SQLite через Drizzle ORM + better-sqlite3 |
| Аутентификация | nuxt-auth-utils (sealed cookie-сессии) |
| Валидация клиент | Vuelidate |
| Валидация сервер | Zod |
| Маска полей | maska (директива v-maska) |
| Уведомления | vue-toast-notification |
| Иконки | lucide-vue-next |
| Шрифты | Inter (локально) + Cormorant Garamond (Google Fonts) |

---

## Архитектура проекта

### Лейауты

Два лейаута в `layouts/`:

- **`default.vue`** — для публичного сайта. Структура: `FallingStars` (фоновые частицы) → `AppNavbar` → `<slot>` (контент) → `AppFooter`. Через `Teleport` добавляет глобальный прелоадер (`HugePreloader`) и диалог подтверждения (`UiConfirmDialog`).

- **`admin.vue`** — для всех страниц `/admin/*`. Содержит боковой sidebar с Lucide-иконками и кнопкой выхода. Страницы подключают его через `definePageMeta({ layout: 'admin' })`.

### Маршруты

```
/                  → pages/index.vue          (публичный сайт)
/privacy           → pages/privacy.vue        (политика конфиденциальности)
/admin/login       → pages/admin/login.vue    (вход — без middleware)
/admin             → pages/admin/index.vue    (список заявок, защищён)
/admin/services    → pages/admin/services.vue
/admin/masters     → pages/admin/masters.vue
/admin/reviews     → pages/admin/reviews.vue
/admin/theme       → pages/admin/theme.vue
```

### Защита роутов

`middleware/auth.ts` запускается на всех маршрутах `/admin/*` кроме `/admin/login`. Использует `useUserSession()` из nuxt-auth-utils — если сессии нет, редиректит на `/admin/login`.

---

## Дизайн-система

### Цветовая палитра

Тёмная luxury-тема с акцентами rose-gold. Переменные в `assets/styles/base/_variables.scss`:

| Переменная | Значение | Назначение |
|---|---|---|
| `$bg` | `#080a0c` | Основной фон |
| `$bg2` | `#0e1012` | Чуть светлее |
| `$bgCard` | `#131618` | Карточки |
| `$textPrimary` | `#f0ece8` | Основной текст |
| `$textSecondary` | `rgba(240,236,232,0.52)` | Вторичный текст |
| `$roseGold` | `#c4818b` | Акцент |
| `$champagne` | `#e8d5be` | Шампань |
| `$border` | `rgba(255,255,255,0.07)` | Границы |

### Темы

5 цветовых тем (переключаются через кнопку Palette в navbar):

| ID | Название | Акцент |
|---|---|---|
| `rose` | Rose Cosmos | `#c4818b` (по умолчанию) |
| `violet` | Violet Galaxy | `#9b72cf` |
| `sage` | Sage Botanic | `#7aaa8a` |
| `ocean` | Ocean Abyss | `#5b8cc8` |
| `gold` | Gold Desert | `#c9a030` |

### Типографика

- **Inter** — основной шрифт (локально, `assets/fonts/`)
- **Cormorant Garamond** — заголовки (Google Fonts, italic/300-700)

### UI-компоненты (`components/ui/`)

| Компонент | Описание |
|---|---|
| `Button.vue` | Кнопка: default (solid gradient), ghost, border, outline; размеры sm/lg/xl |
| `Input.vue` | Поле ввода; `isPhone=true` включает maska `+7 (###) ###-##-##` |
| `Select.vue` | Кастомный select с `<Teleport to="body">` — выпадает из overflow:hidden |
| `ConfirmDialog.vue` | Модальный диалог (управляется `stores/confirm-dialog.js`) |
| `Skeleton.vue` | Skeleton-placeholder при загрузке |

---

## Запуск и разработка

### Установка

```bash
npm install
```

### Создание `.env`

```env
NUXT_SESSION_PASSWORD=levlani-super-secret-session-password-32chars
NUXT_DB_FILE_NAME=./data/levlani.db
NUXT_ADMIN_EMAIL=admin@levlani.com
NUXT_ADMIN_PASSWORD=admin123
```

### Запуск

```bash
npm run dev    # разработка → http://localhost:3000
```

База данных создаётся **автоматически** при первом запуске — таблицы и начальные данные добавляются через встроенную авто-миграцию в `server/database/index.ts`.

### Скрипты

```bash
npm run build         # продакшн-сборка
npm run preview       # предпросмотр build локально
npm run db:generate   # сгенерировать SQL через drizzle-kit
npm run db:migrate    # применить миграции вручную
npm run db:studio     # Drizzle Studio → http://localhost:4983
```

---

## Переменные окружения

| Переменная | Описание |
|---|---|
| `NUXT_SESSION_PASSWORD` | Ключ шифрования cookie-сессии (минимум 32 символа) |
| `NUXT_DB_FILE_NAME` | Путь к SQLite-файлу (по умолчанию `./data/levlani.db`) |
| `NUXT_ADMIN_EMAIL` | Email администратора для входа |
| `NUXT_ADMIN_PASSWORD` | Пароль администратора |

Все значения доступны **только на сервере** через `useRuntimeConfig()` — никогда не попадают в клиентский JS-бандл.

---

## База данных

SQLite-файл: `./data/levlani.db` (создаётся автоматически).

### Таблицы

**`submissions`** — заявки на запись
```
id, name, phone, service, message, created_at
```

**`reviews`** — отзывы клиентов
```
id, author, service, text, rating, approved (0/1), created_at
```

**`services`** — услуги салона
```
id, title, description, price, icon, order, active (0/1), created_at
```

**`masters`** — мастера
```
id, name, role, spec, exp, initial, photo, active (0/1), order, created_at
```

### Автосидирование

При первом запуске добавляются:
- **6 услуг** (Стрижка, Окрашивание, Укладка, Маникюр, Брови, Уход за лицом)
- **8 отзывов** с `approved=1` — разбросаны по датам за последние 2 месяца

---

## API-эндпоинты

### Публичные

| Метод | URL | Тело / Описание |
|---|---|---|
| `GET` | `/api/services` | Активные услуги (active=1, по order) |
| `GET` | `/api/reviews` | Одобренные отзывы (approved=1) |
| `GET` | `/api/masters` | Активные мастера (по order) |
| `POST` | `/api/contact` | `{ name, phone, service, message? }` → заявка |
| `POST` | `/api/reviews` | `{ author, service, text, rating? }` → отзыв (approved=0) |
| `POST` | `/api/auth/login` | `{ email, password }` → сессия |
| `POST` | `/api/auth/logout` | Удалить сессию |

### Защищённые (сессия обязательна)

| Метод | URL | Описание |
|---|---|---|
| `GET` | `/api/submissions` | Все заявки (requireUserSession) |

---

## Публичный сайт

`pages/index.vue` — список секций вертикально:

| Компонент | Якорь | Описание |
|---|---|---|
| `HeroSection` | — | Полноэкранный hero, 3D-параллакс мышью, GSAP-анимация слов |
| `MarqueeSection` | — | Анимированная надпись "Lev & Lani" со звёздами при скролле |
| `StatsSection` | — | 4 счётчика (лет опыта, клиентов и т.д.) с count-up анимацией |
| `ServicesSection` | `#services` | Карточки услуг из БД, fade-in при скролле |
| `MoodSection` | — | Визуальная секция с атмосферными изображениями |
| `MastersSection` | — | Карточки мастеров из БД |
| `ProcessSection` | `#process` | 4 шага работы с клиентом |
| `ReviewsSection` | — | Карусель одобренных отзывов + форма оставить отзыв |
| `ContactSection` | `#contact` | Форма записи (Vuelidate + maska для телефона) |

### Navbar

`AppNavbar` — фиксированный, прозрачный → тёмный (blur) при скролле > 80px. Кнопка Palette открывает попап с 5 точками-темами. На мобильных — бургер-меню с темами внутри.

---

## Панель администратора

Адрес: `/admin/login` → `/admin`.

**Вход:** сравнивает email/пароль с `.env` переменными → создаёт sealed cookie-сессию. Выход — `POST /api/auth/logout` + редирект на `/admin/login`.

### Разделы

| Страница | Описание |
|---|---|
| `/admin` | Таблица всех заявок (имя, телефон, услуга, дата) |
| `/admin/services` | CRUD услуг: название, описание, цена, иконка, порядок |
| `/admin/masters` | CRUD мастеров: фото/инициал, специализация, опыт |
| `/admin/reviews` | Модерация: одобрить / скрыть / удалить отзыв |
| `/admin/theme` | Выбор цветовой темы (дублирует кнопку в navbar) |

### Диалог подтверждения

Опасные действия (удаление) открывают `UiConfirmDialog` через `useConfirmDialogStore`:
```js
store.openDialog({
  title: 'Удалить услугу?',
  message: 'Это действие нельзя отменить.',
  onConfirm: () => deleteService(id),
});
```

---

## Система тем

Composable `composables/useTheme.ts` + плагин `plugins/theme.client.ts`.

**Механизм:**
1. При старте `theme.client.ts` → `initTheme()` читает `localStorage['levlani-theme']`
2. `applyTheme(id)` → `document.documentElement.setAttribute('data-theme', id)`
3. CSS: `[data-theme="violet"] .class { color: var(--accent); }` реагирует автоматически
4. Выбор сохраняется в `localStorage` — у каждого посетителя своя тема

---

## Анимации GSAP

Все в `composables/useGsapAnimations.ts`. Используют **динамический import** — GSAP не включается в серверный рендер.

| Функция | Используется в | Описание |
|---|---|---|
| `animateHeroEntrance(sel)` | HeroSection | Слова летят снизу (y:50→0, stagger) при загрузке |
| `animateScrollCards(sel)` | Services, Masters | Карточки снизу при входе в viewport (once) |
| `animateNavbar(el)` | AppNavbar | `.scrolled` класс при scroll > 80px |
| `animateSectionTitle(sel)` | Services, Process | Заголовок fade-in при скролле |
| `animateCounters(sel)` | StatsSection | Count-up по data-target атрибуту |
| `animateFadeInUp(sel, stagger)` | Process, Mood | Универсальное появление снизу |
| `animateParallaxSection(bg, cnt)` | MoodSection | Параллакс фона + fade-in контента |

`MarqueeSection` — собственный inline GSAP-timeline: линия → метка → слова → звёзды → подпись.

---

## Структура файлов

```
lev-lani/
├── assets/styles/
│   ├── base/_variables.scss     — цвета, шрифты, брейкпоинты, темы
│   ├── base/_mixins.scss        — mq(), transition()
│   ├── index.scss               — точка входа SCSS
│   └── tailwind.css             — Tailwind v4
├── components/
│   ├── ui/                      — Button, Input, Select, ConfirmDialog, Skeleton
│   ├── icons/Logo.vue           — логотип с пульсирующим алмазом
│   ├── services/                — ServicesSection + ServiceCard
│   ├── contact/ContactSection   — форма записи (ClientOnly + Vuelidate)
│   ├── admin/SubmissionsTable   — таблица заявок
│   ├── AppNavbar.vue            — navbar с темами
│   ├── AppFooter.vue            — подвал
│   ├── HeroSection.vue          — hero (GSAP + 3D parallax)
│   ├── MarqueeSection.vue       — бренд-строка со звёздами
│   ├── StatsSection.vue         — счётчики
│   ├── MoodSection.vue          — атмосферная секция
│   ├── MastersSection.vue       — мастера
│   ├── ProcessSection.vue       — процесс
│   ├── ReviewsSection.vue       — карусель отзывов
│   ├── FallingStars.vue         — CSS-частицы (фиксированный фон)
│   └── HugePreloader.vue        — прелоадер
├── composables/
│   ├── useGsapAnimations.ts     — все GSAP-функции
│   ├── useTheme.ts              — система тем
│   └── useToast.js              — обёртка toast
├── layouts/
│   ├── default.vue              — публичный (navbar + footer)
│   └── admin.vue                — админка (sidebar + slot)
├── middleware/auth.ts            — защита /admin/*
├── pages/
│   ├── index.vue                — главная
│   ├── privacy.vue              — политика
│   └── admin/                   — login, index, services, masters, reviews, theme
├── plugins/
│   ├── gsap.client.ts           — GSAP + ScrollTrigger
│   ├── theme.client.ts          — инициализация темы
│   ├── toaster.client.ts        — toast уведомления
│   ├── maska.ts                 — директива v-maska
│   └── ssr-width.ts             — provideSSRWidth(1024)
├── server/
│   ├── api/                     — все эндпоинты
│   └── database/
│       ├── schema.ts            — Drizzle-схема
│       ├── index.ts             — useDatabase() singleton + авто-миграция
│       └── migrate.ts           — ручной скрипт
├── stores/confirm-dialog.js      — Pinia диалог
├── utils/
│   ├── formatPrice.js           — Intl.NumberFormat рубли
│   └── getScrollWidth.js        — --scrollbar-width CSS-переменная
├── data/levlani.db              — SQLite (авто-создаётся)
├── nuxt.config.ts               — модули, SCSS, runtimeConfig
└── drizzle.config.ts            — drizzle-kit
```
