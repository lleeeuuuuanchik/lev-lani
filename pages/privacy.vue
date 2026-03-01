<script setup>
/**
 * Политика конфиденциальности. SEO + JSON-LD хлебные крошки.
 */

import { useGsapAnimations } from '@/composables/useGsapAnimations';
import { useBreadcrumbJsonLd } from '@/composables/useSeoJsonLd';

// variables
const SITE_URL = 'https://levlani.ru';
const PAGE_URL = `${SITE_URL}/privacy`;

// meta
useSeoMeta({
	title: 'Политика конфиденциальности — Lev & Lani',
	description: 'Политика конфиденциальности салона красоты Lev & Lani во Владикавказе. Информация о сборе, хранении и защите персональных данных.',
	keywords: 'политика конфиденциальности, салон красоты Lev Lani, персональные данные, Владикавказ',
	// Open Graph
	ogTitle:       'Политика конфиденциальности — Lev & Lani',
	ogDescription: 'Политика конфиденциальности салона красоты Lev & Lani во Владикавказе.',
	ogType:        'website',
	ogUrl:         PAGE_URL,
	ogImage:       `${SITE_URL}/og-image.svg`,
	ogImageWidth:  '1200',
	ogImageHeight: '630',
	ogImageAlt:    'Lev & Lani Beauty Studio — Владикавказ',
	ogLocale:      'ru_RU',
	// Twitter Card
	twitterCard:        'summary_large_image',
	twitterTitle:       'Политика конфиденциальности — Lev & Lani',
	twitterDescription: 'Политика конфиденциальности салона красоты Lev & Lani во Владикавказе.',
	twitterImage:       `${SITE_URL}/og-image.svg`,
});

// Канонический URL — предотвращает дубли при ?utm= параметрах
useHead({ link: [{ rel: 'canonical', href: PAGE_URL }] });

// JSON-LD хлебные крошки — показываются в поисковой выдаче
useBreadcrumbJsonLd([
	{ name: 'Главная',                      url: SITE_URL },
	{ name: 'Политика конфиденциальности',  url: PAGE_URL },
]);

const { animateFadeInUp } = useGsapAnimations();

// functions (onMounted — GSAP только на клиенте)
onMounted(async () =>
{
	if (!import.meta.client) return;
	const { gsap } = await import('gsap');
	const { ScrollTrigger } = await import('gsap/ScrollTrigger');
	gsap.registerPlugin(ScrollTrigger);

	// Header entrance
	gsap.fromTo('.privacy__back', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.1 });
	gsap.fromTo('.privacy__header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'power3.out' });

	// Sections scroll reveal
	document.querySelectorAll('.privacy__section').forEach((el, i) => {
		gsap.fromTo(el,
			{ opacity: 0, y: 24 },
			{
				opacity: 1, y: 0,
				duration: 0.6,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: el,
					start: 'top 85%',
					toggleActions: 'play none none none',
				},
			}
		);
	});

	// Nebula parallax
	gsap.to('.privacy__nebula--1', {
		y: -60,
		ease: 'none',
		scrollTrigger: { trigger: '.privacy-page', start: 'top top', end: 'bottom top', scrub: true },
	});
	gsap.to('.privacy__nebula--2', {
		y: -30,
		ease: 'none',
		scrollTrigger: { trigger: '.privacy-page', start: 'top top', end: 'bottom top', scrub: true },
	});
});
</script>

<template>
	<div class="privacy-page">
		<!-- Cosmic bg -->
		<div class="privacy__stars" aria-hidden />
		<div class="privacy__nebula privacy__nebula--1" aria-hidden />
		<div class="privacy__nebula privacy__nebula--2" aria-hidden />
		<div class="privacy__nebula privacy__nebula--3" aria-hidden />

		<!-- Constellation top-right -->
		<svg class="privacy__constellation privacy__constellation--tr" viewBox="0 0 220 180" fill="none" aria-hidden>
			<circle cx="180" cy="20" r="1.5" fill="rgba(196,129,139,0.5)"/>
			<circle cx="120" cy="45" r="2" fill="rgba(196,129,139,0.4)"/>
			<circle cx="200" cy="70" r="1.2" fill="rgba(255,255,255,0.28)"/>
			<circle cx="90" cy="90" r="1.8" fill="rgba(232,213,190,0.32)"/>
			<circle cx="155" cy="120" r="1" fill="rgba(255,255,255,0.20)"/>
			<circle cx="210" cy="145" r="1.3" fill="rgba(196,129,139,0.28)"/>
			<line x1="180" y1="20" x2="120" y2="45" stroke="rgba(196,129,139,0.14)" stroke-width="0.6"/>
			<line x1="120" y1="45" x2="200" y2="70" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
			<line x1="120" y1="45" x2="90" y2="90" stroke="rgba(196,129,139,0.11)" stroke-width="0.5"/>
			<line x1="90" y1="90" x2="155" y2="120" stroke="rgba(196,129,139,0.09)" stroke-width="0.5"/>
			<line x1="155" y1="120" x2="210" y2="145" stroke="rgba(232,213,190,0.07)" stroke-width="0.5"/>
		</svg>

		<!-- Constellation bottom-left -->
		<svg class="privacy__constellation privacy__constellation--bl" viewBox="0 0 180 160" fill="none" aria-hidden>
			<circle cx="20" cy="140" r="1.5" fill="rgba(196,129,139,0.45)"/>
			<circle cx="70" cy="110" r="2" fill="rgba(196,129,139,0.35)"/>
			<circle cx="130" cy="130" r="1.2" fill="rgba(255,255,255,0.22)"/>
			<circle cx="50" cy="70" r="1" fill="rgba(232,213,190,0.28)"/>
			<circle cx="100" cy="50" r="1.5" fill="rgba(196,129,139,0.30)"/>
			<line x1="20" y1="140" x2="70" y2="110" stroke="rgba(196,129,139,0.13)" stroke-width="0.6"/>
			<line x1="70" y1="110" x2="130" y2="130" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>
			<line x1="70" y1="110" x2="50" y2="70" stroke="rgba(196,129,139,0.10)" stroke-width="0.5"/>
			<line x1="50" y1="70" x2="100" y2="50" stroke="rgba(232,213,190,0.08)" stroke-width="0.5"/>
		</svg>

		<!-- Orbit ring decoration -->
		<div class="privacy__orbit" aria-hidden />

		<div class="container privacy__inner">
			<div class="privacy__back">
				<NuxtLink to="/" class="privacy__back-link">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					На главную
				</NuxtLink>
			</div>

			<header class="privacy__header">
				<span class="g-label">Юридическая информация</span>
				<h1 class="privacy__title">
					Политика<br>
					<em class="privacy__title-em">конфиденциальности</em>
				</h1>
				<p class="privacy__date">Последнее обновление: 1 января 2025 года</p>
			</header>

			<div class="privacy__content">
				<section class="privacy__section">
					<h2 class="privacy__h2">1. Общие положения</h2>
					<p>Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей сайта салона красоты Lev & Lani (далее — «Салон», «мы»).</p>
					<p>Используя наш сайт и заполняя формы обратной связи, вы соглашаетесь с условиями настоящей Политики. Если вы не согласны с данными условиями, пожалуйста, не используйте наш сайт.</p>
				</section>

				<section class="privacy__section">
					<h2 class="privacy__h2">2. Какие данные мы собираем</h2>
					<p>При заполнении формы записи на сайте мы собираем следующие персональные данные:</p>
					<ul class="privacy__list">
						<li>Имя и фамилия</li>
						<li>Номер мобильного телефона</li>
						<li>Выбранная услуга</li>
						<li>Дополнительные пожелания (если указаны)</li>
					</ul>
					<p>Мы не собираем платёжные данные, данные банковских карт или иную финансовую информацию через сайт.</p>
				</section>

				<section class="privacy__section">
					<h2 class="privacy__h2">3. Цели обработки данных</h2>
					<p>Ваши персональные данные используются исключительно в следующих целях:</p>
					<ul class="privacy__list">
						<li>Связь с вами для подтверждения и согласования записи на услугу</li>
						<li>Информирование об изменениях в расписании или услугах салона</li>
						<li>Улучшение качества обслуживания</li>
					</ul>
					<p>Мы не используем ваши данные для спам-рассылок, передачи третьим лицам в коммерческих целях или любого иного использования, не указанного в данной Политике.</p>
				</section>

				<section class="privacy__section">
					<h2 class="privacy__h2">4. Хранение и защита данных</h2>
					<p>Все персональные данные хранятся на защищённых серверах. Мы принимаем технические и организационные меры для защиты ваших данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
					<p>Срок хранения персональных данных — не более 3 лет с момента последнего взаимодействия с клиентом, либо до момента поступления запроса на удаление.</p>
				</section>

				<section class="privacy__section">
					<h2 class="privacy__h2">5. Передача данных третьим лицам</h2>
					<p>Мы не продаём, не обмениваем и не передаём ваши персональные данные третьим лицам без вашего согласия, за исключением случаев:</p>
					<ul class="privacy__list">
						<li>Когда это требуется законодательством Российской Федерации</li>
						<li>Для защиты прав и безопасности Салона или третьих лиц</li>
					</ul>
				</section>

				<section class="privacy__section">
					<h2 class="privacy__h2">6. Cookies и аналитика</h2>
					<p>Наш сайт может использовать файлы cookie для улучшения пользовательского опыта. Cookie — это небольшие текстовые файлы, которые сохраняются в вашем браузере. Вы можете отключить использование cookie в настройках вашего браузера, однако это может повлиять на работу некоторых функций сайта.</p>
				</section>

				<section class="privacy__section">
					<h2 class="privacy__h2">7. Ваши права</h2>
					<p>В соответствии с законодательством Российской Федерации вы имеете право:</p>
					<ul class="privacy__list">
						<li>Запросить информацию о хранимых персональных данных</li>
						<li>Потребовать исправления неточных данных</li>
						<li>Потребовать удаления ваших данных</li>
						<li>Отозвать согласие на обработку персональных данных</li>
					</ul>
					<p>Для реализации своих прав обратитесь к нам по указанным ниже контактным данным.</p>
				</section>

				<section class="privacy__section">
					<h2 class="privacy__h2">8. Контактная информация</h2>
					<p>По вопросам, связанным с обработкой персональных данных, вы можете обратиться:</p>
					<div class="privacy__contacts">
						<div class="privacy__contact-item">
							<span class="privacy__contact-label">Телефон</span>
							<a href="tel:+79627488383" class="privacy__contact-value">+7 (962) 748-83-83</a>
						</div>
						<div class="privacy__contact-item">
							<span class="privacy__contact-label">Адрес</span>
							<span class="privacy__contact-value">ул. Астана Кесаева, 4, Владикавказ</span>
						</div>
						<div class="privacy__contact-item">
							<span class="privacy__contact-label">Режим работы</span>
							<span class="privacy__contact-value">Ежедневно, 9:00–19:00</span>
						</div>
					</div>
				</section>

				<section class="privacy__section">
					<h2 class="privacy__h2">9. Изменения в Политике</h2>
					<p>Мы оставляем за собой право вносить изменения в настоящую Политику. Актуальная версия всегда доступна на данной странице. Продолжение использования сайта после внесения изменений означает ваше согласие с обновлённой Политикой.</p>
				</section>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.privacy-page
{
	background: $bg;
	min-height: 100vh;
	padding-top: 120px;
	padding-bottom: 100px;
	position: relative;
	overflow: hidden;
}

.privacy__stars
{
	position: fixed;
	inset: 0;
	pointer-events: none;
	z-index: 0;

	&::after
	{
		content: '';
		position: absolute;
		top: 0; left: 0;
		width: 1px; height: 1px;
		border-radius: 50%;
		background: transparent;
		box-shadow:
			80px 30px 0 0 rgba(255,255,255,0.10),
			200px 15px 0 0 rgba(196,129,139,0.13),
			330px 55px 0 0 rgba(255,255,255,0.08),
			480px 25px 0 0 rgba(232,213,190,0.10),
			620px 48px 0 0 rgba(255,255,255,0.11),
			750px 12px 0 0 rgba(196,129,139,0.12),
			900px 40px 0 0 rgba(255,255,255,0.09),
			1050px 22px 0 0 rgba(232,213,190,0.10),
			1180px 52px 0 0 rgba(255,255,255,0.08),
			60px 180px 0 0 rgba(196,129,139,0.10),
			250px 220px 0 0 rgba(255,255,255,0.08),
			440px 200px 0 0 rgba(232,213,190,0.09),
			680px 240px 0 0 rgba(255,255,255,0.08),
			870px 195px 0 0 rgba(196,129,139,0.09),
			1100px 210px 0 0 rgba(255,255,255,0.07),
			150px 400px 0 0 rgba(196,129,139,0.08),
			380px 450px 0 0 rgba(255,255,255,0.07),
			600px 420px 0 0 rgba(232,213,190,0.08),
			800px 460px 0 0 rgba(255,255,255,0.07),
			1000px 440px 0 0 rgba(196,129,139,0.08);
	}
}

.privacy__nebula
{
	position: fixed;
	border-radius: 50%;
	filter: blur(80px);
	pointer-events: none;
	z-index: 0;

	&--1
	{
		width: 500px; height: 300px;
		background: radial-gradient(ellipse, rgba(196,129,139,0.07) 0%, transparent 70%);
		top: -80px; right: -60px;
	}

	&--2
	{
		width: 400px; height: 250px;
		background: radial-gradient(ellipse, rgba(232,213,190,0.04) 0%, transparent 70%);
		bottom: 20%; left: -80px;
	}

	&--3
	{
		width: 300px; height: 180px;
		background: radial-gradient(ellipse, rgba(196,129,139,0.05) 0%, transparent 70%);
		top: 50%; right: 5%;
	}
}

.privacy__constellation
{
	position: fixed;
	pointer-events: none;
	z-index: 0;
	opacity: 0.9;

	&--tr
	{
		top: 0; right: 0;
		width: 220px; height: 180px;
	}

	&--bl
	{
		bottom: 0; left: 0;
		width: 180px; height: 160px;
	}
}

.privacy__orbit
{
	position: fixed;
	width: 700px; height: 700px;
	border-radius: 50%;
	border: 1px solid rgba(196,129,139,0.03);
	right: -350px;
	top: 50%;
	margin-top: -350px;
	pointer-events: none;
	z-index: 0;
}

.privacy__inner
{
	max-width: 760px;
	position: relative;
	z-index: 1;
}

.privacy__back
{
	margin-bottom: 48px;
}

.privacy__back-link
{
	display: inline-flex;
	align-items: center;
	gap: 8px;
	font-size: 0.85rem;
	color: $textSecondary;
	text-decoration: none;
	@include transition();

	&:hover
	{
		color: $roseGoldLight;
	}

	&:hover svg { transform: translateX(-3px); }

	svg { @include transition(); }
}

.privacy__header
{
	margin-bottom: 64px;
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.privacy__title
{
	font-family: $headingFont;
	font-size: clamp(2.4rem, 5vw, 3.5rem);
	font-weight: 300;
	line-height: 1.05;
	color: $textPrimary;
	margin: 0;
}

.privacy__title-em
{
	font-style: italic;
	background: linear-gradient(120deg, $roseGold 0%, $champagne 60%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.privacy__date
{
	font-size: 0.8rem;
	color: $textMuted;
	letter-spacing: 0.04em;
}

.privacy__content
{
	display: flex;
	flex-direction: column;
	gap: 0;
}

.privacy__section
{
	padding: 36px 0;
	border-bottom: 1px solid $border;

	&:first-child { padding-top: 0; }
	&:last-child { border-bottom: none; }
}

.privacy__section p
{
	font-size: 0.93rem;
	color: $textSecondary;
	line-height: 1.8;
	margin: 0 0 12px;

	&:last-child { margin-bottom: 0; }
}

.privacy__h2
{
	font-family: $headingFont;
	font-size: 1.3rem;
	font-weight: 400;
	color: $textPrimary;
	margin: 0 0 18px;
	position: relative;
	padding-left: 16px;

	&::before
	{
		content: '';
		position: absolute;
		left: 0; top: 0.15em;
		width: 3px;
		height: 1em;
		border-radius: 2px;
		background: linear-gradient(180deg, $roseGold, $champagne);
	}
}

.privacy__list
{
	list-style: none;
	padding: 0;
	margin: 0 0 14px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.privacy__list li
{
	font-size: 0.93rem;
	color: $textSecondary;
	line-height: 1.7;
	padding-left: 18px;
	position: relative;

	&::before
	{
		content: '';
		position: absolute;
		left: 0; top: 10px;
		width: 5px; height: 5px;
		border-radius: 50%;
		background: $roseGold;
		box-shadow: 0 0 6px rgba(196,129,139,0.4);
	}
}

.privacy__contacts
{
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 16px;
}

.privacy__contact-item
{
	display: flex;
	align-items: baseline;
	gap: 12px;
}

.privacy__contact-label
{
	font-size: 0.76rem;
	font-weight: 600;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: $roseGold;
	min-width: 110px;
}

.privacy__contact-value
{
	font-size: 0.92rem;
	color: $textPrimary;
	text-decoration: none;
	@include transition();

	&[href]:hover { color: $roseGoldLight; }
}
</style>
