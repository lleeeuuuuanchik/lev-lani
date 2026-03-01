<script setup>
// ─── Главная страница ─────────────────────────────────────────────────────────
// SEO: полный набор — title, description, Open Graph, Twitter Card, canonical.
// JSON-LD: BeautySalon + WebSite + ItemList услуг + AggregateRating из отзывов.
// Данные для JSON-LD берутся из тех же API-запросов, что и секции страницы —
// Nuxt дедуплицирует useFetch с одинаковым ключом, двойного запроса нет.

const SITE_URL = 'https://levlani.ru';

// Данные нужны в script до рендера — для JSON-LD в <head>
const { data: services } = await useFetch('/api/services');
const { data: reviews }  = await useFetch('/api/reviews');

// ─── Meta tags ──────────────────────────────────────────────────────────────
useSeoMeta({
	// Title с ключевым словом «Владикавказ» — локальное SEO
	title:       'Lev & Lani — Салон красоты во Владикавказе',
	description: 'Профессиональный салон красоты во Владикавказе. Стрижка, окрашивание, маникюр, брови и ресницы, уход за лицом. Опыт 10+ лет. Запись онлайн: +7 (962) 748-83-83.',
	keywords:    'салон красоты владикавказ, стрижка владикавказ, окрашивание волос балаяж, маникюр педикюр, брови ресницы, уход за лицом, lev lani, лев лани',

	// ─── Open Graph (Facebook, Telegram, WhatsApp превью) ─────────────────
	ogTitle:       'Lev & Lani — Салон красоты во Владикавказе',
	ogDescription: 'Профессиональный уход за волосами, ногтями и кожей. Мастера с опытом 10+ лет. Запись онлайн.',
	ogType:        'website',
	ogUrl:          SITE_URL,
	ogImage:        `${SITE_URL}/og-image.svg`,   // 1200×630 px
	ogImageWidth:  '1200',
	ogImageHeight: '630',
	ogImageAlt:    'Lev & Lani Beauty Studio — Владикавказ',
	ogLocale:      'ru_RU',

	// ─── Twitter / X Card ────────────────────────────────────────────────
	twitterCard:        'summary_large_image',
	twitterTitle:       'Lev & Lani — Салон красоты во Владикавказе',
	twitterDescription: 'Профессиональный уход за волосами, ногтями и кожей. Запись онлайн.',
	twitterImage:        `${SITE_URL}/og-image.svg`,
});

// Canonical — предотвращает дублирование если сайт доступен с www/без www
useHead({
	link: [{ rel: 'canonical', href: SITE_URL }],
});

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────
// BeautySalon (адрес, телефон, часы, тип бизнеса) + WebSite
useBusinessJsonLd();
// ItemList услуг — Google показывает в rich snippets
useServicesJsonLd(services);
// AggregateRating + Review — звёздочки в поисковой выдаче
useReviewsJsonLd(reviews);
</script>

<template>
	<div class="index-page">
		<HeroSection />
		<MarqueeSection />
		<StatsSection />
		<ServicesSection />
		<MoodSection />
		<MastersSection />
		<ProcessSection />
		<ReviewsSection />
		<ContactSection />
	</div>
</template>
