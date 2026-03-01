// ─── JSON-LD / Schema.org — структурированные данные ─────────────────────────
// Используется Google для rich snippets: звёздочки рейтинга, адрес, часы работы,
// карусель услуг в поиске и т.д.
//
// Все функции вызываются в pages/index.vue через useHead() — данные уходят
// в <script type="application/ld+json"> в <head> страницы.
// JSON-LD — рекомендуемый Google формат (предпочтительнее HTML microdata).

const SITE_URL = 'https://levlani.ru';

// ─── Базовые данные бизнеса (переиспользуются в нескольких схемах) ────────────
const BUSINESS_BASE = {
	'@type': 'BeautySalon',
	'@id':   `${SITE_URL}/#business`,
	name:    'Lev & Lani Beauty Studio',
	url:     SITE_URL,
	telephone: '+79627488383',
	image:     `${SITE_URL}/og-image.jpg`,
	priceRange: '₽₽',
	currenciesAccepted: 'RUB',
	paymentAccepted: 'Cash, Credit Card',
	foundingDate: '2015',
	description: 'Профессиональный салон красоты во Владикавказе. Стрижка, окрашивание, маникюр, брови и ресницы, уход за лицом. Команда сертифицированных мастеров с опытом 10+ лет.',
	address: {
		'@type':         'PostalAddress',
		streetAddress:   'ул. Астана Кесаева, 4',
		addressLocality: 'Владикавказ',
		addressRegion:   'Северная Осетия — Алания',
		postalCode:      '362000',
		addressCountry:  'RU',
	},
	// Часы работы: ежедневно 9:00–19:00
	openingHoursSpecification: [
		{
			'@type':   'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			opens:     '09:00',
			closes:    '19:00',
		},
	],
	// Зона обслуживания
	areaServed: {
		'@type': 'City',
		name: 'Владикавказ',
	},
	// Соцсети и мессенджеры
	sameAs: [
		'https://www.instagram.com/lev_lani_/',
		'https://t.me/teoamor',
		'https://wa.me/79627488383',
	],
};

// ─── 1. BeautySalon + WebSite — основной бизнес-блок ────────────────────────
// Вызывается один раз на главной странице.
// Даёт Google: адрес, телефон, часы работы, тип бизнеса.
export function useBusinessJsonLd() {
	const beautySchema = {
		'@context': 'https://schema.org',
		...BUSINESS_BASE,
	};

	// WebSite — помогает Google связать сайт с бизнесом,
	// потенциально добавляет SearchAction в поисковую выдачу
	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type':    'WebSite',
		'@id':       `${SITE_URL}/#website`,
		url:          SITE_URL,
		name:        'Lev & Lani Beauty Studio',
		inLanguage:  'ru-RU',
		publisher: { '@id': `${SITE_URL}/#business` },
	};

	useHead({
		script: [
			{ type: 'application/ld+json', innerHTML: JSON.stringify(beautySchema) },
			{ type: 'application/ld+json', innerHTML: JSON.stringify(websiteSchema) },
		],
	});
}

// ─── 2. ItemList услуг ────────────────────────────────────────────────────────
// Передаём Ref с массивом услуг из /api/services.
// Google показывает услуги в расширенных сниппетах и карточках бизнеса.
export function useServicesJsonLd(services: Ref<any[] | null>) {
	useHead(() => {
		if (!services.value?.length) return {};

		const schema = {
			'@context': 'https://schema.org',
			'@type':    'ItemList',
			name:       'Услуги салона Lev & Lani',
			numberOfItems: services.value.length,
			itemListElement: services.value.map((s, i) => ({
				'@type':    'ListItem',
				position:    i + 1,
				item: {
					'@type':      'Service',
					name:          s.title,
					description:   s.description,
					provider: { '@id': `${SITE_URL}/#business` },
					areaServed: { '@type': 'City', name: 'Владикавказ' },
					offers: {
						'@type':        'Offer',
						price:           s.price,         // строка "от 2 500 ₽"
						priceCurrency:  'RUB',
						availability:   'https://schema.org/InStock',
						url:             `${SITE_URL}/#services`,
					},
				},
			})),
		};

		return { script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(schema) }] };
	});
}

// ─── 3. AggregateRating + Review items ───────────────────────────────────────
// ЭТО — самый ценный блок для CTR: звёздочки прямо в поисковой выдаче.
// Вычисляет средний рейтинг из одобренных отзывов и добавляет их в JSON-LD.
export function useReviewsJsonLd(reviews: Ref<any[] | null>) {
	useHead(() => {
		if (!reviews.value?.length) return {};

		const approved = reviews.value; // API уже возвращает только approved=1
		if (!approved.length) return {};

		// Средний рейтинг с округлением до 1 знака
		const avg = (approved.reduce((s, r) => s + (r.rating ?? 5), 0) / approved.length).toFixed(1);

		const schema = {
			'@context': 'https://schema.org',
			'@type':    'BeautySalon',
			'@id':       `${SITE_URL}/#business`,
			name:        'Lev & Lani Beauty Studio',

			// AggregateRating — показывается как «★ 4.9 (8 отзывов)» в Google
			aggregateRating: {
				'@type':       'AggregateRating',
				ratingValue:    avg,
				reviewCount:    approved.length,
				bestRating:    '5',
				worstRating:   '1',
			},

			// Первые 10 отзывов в полном виде
			review: approved.slice(0, 10).map(r => ({
				'@type': 'Review',
				author: {
					'@type': 'Person',
					name:     r.author,
				},
				reviewRating: {
					'@type':      'Rating',
					ratingValue:   r.rating ?? 5,
					bestRating:    5,
					worstRating:   1,
				},
				reviewBody:      r.text,
				// ISO date из Unix timestamp (секунды); guard от NaN / некорректных значений
				datePublished: (() => {
					const ts = Number(r.createdAt);
					if (!ts || isNaN(ts)) return undefined;
					const d = new Date(ts * 1000);
					return isNaN(d.getTime()) ? undefined : d.toISOString().split('T')[0];
				})(),
				itemReviewed: { '@id': `${SITE_URL}/#business` },
			})),
		};

		return { script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(schema) }] };
	});
}

// ─── 4. BreadcrumbList — хлебные крошки ──────────────────────────────────────
// Используется на внутренних страницах (/privacy, будущие /services/:id и т.д.)
// Добавляет навигацию в поисковую выдачу.
export function useBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
	const schema = {
		'@context': 'https://schema.org',
		'@type':    'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type':    'ListItem',
			position:    i + 1,
			name:        item.name,
			item:        item.url,
		})),
	};

	useHead({
		script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(schema) }],
	});
}
