<script setup>
// ─── Секция отзывов — Swiper карусель ─────────────────────────────────────────
// Отзывы загружаются через GET /api/reviews (только approved=1).
// Swiper: loop + autoplay 5s + кастомная навигация + pagination dots.
// Форма добавления отзыва — в <ClientOnly> (Vuelidate требует DOM).
// Schema.org Review microdata — на каждом слайде.

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useToast } from '@/composables/useToast';

const { showSuccess, showError } = useToast();

const modules = [Autoplay, Navigation, Pagination];

const serviceOptions = [
	{ value: 'Стрижка', label: 'Стрижка' },
	{ value: 'Окрашивание', label: 'Окрашивание' },
	{ value: 'Укладка', label: 'Укладка' },
	{ value: 'Маникюр', label: 'Маникюр' },
	{ value: 'Брови и ресницы', label: 'Брови и ресницы' },
	{ value: 'Уход за лицом', label: 'Уход за лицом' },
];

const { data: reviews, refresh } = await useFetch('/api/reviews');

const showForm = ref(false);
const loading = ref(false);
const form = reactive({ author: '', service: '', text: '', rating: 5 });

// Ref на инстанс Swiper — используется для кастомных кнопок навигации
const swiperInstance = ref(null);
const onSwiper = (swiper) => { swiperInstance.value = swiper; };

const total = computed(() => reviews.value?.length ?? 0);

const submit = async () => {
	if (!form.author || !form.service || form.text.length < 10) return;
	loading.value = true;
	try {
		await $fetch('/api/reviews', { method: 'POST', body: { ...form } });
		showSuccess('Спасибо за отзыв! Он появится после проверки.');
		form.author = ''; form.service = ''; form.text = ''; form.rating = 5;
		showForm.value = false;
		await refresh();
	} catch {
		showError('Не удалось отправить отзыв. Попробуйте позже.');
	} finally {
		loading.value = false;
	}
};

const formatDate = (ts) => {
	if (!ts) return '';
	return new Date(typeof ts === 'number' ? ts * 1000 : ts).toLocaleDateString('ru-RU', {
		day: 'numeric', month: 'long', year: 'numeric',
	});
};

const initial = (name) => name?.charAt(0)?.toUpperCase() ?? '?';
</script>

<template>
	<section class="rev g-section">
		<div class="rev__glow" />
		<div class="rev__stars" aria-hidden />
		<div class="rev__nebula" aria-hidden />

		<!-- Constellation -->
		<svg class="rev__constellation" viewBox="0 0 200 160" fill="none" aria-hidden>
			<circle cx="25" cy="30" r="1.5" fill="rgba(196,129,139,0.5)"/>
			<circle cx="80" cy="12" r="1.2" fill="rgba(255,255,255,0.28)"/>
			<circle cx="140" cy="45" r="2" fill="rgba(196,129,139,0.38)"/>
			<circle cx="185" cy="20" r="1" fill="rgba(232,213,190,0.3)"/>
			<circle cx="55" cy="80" r="1.3" fill="rgba(196,129,139,0.32)"/>
			<circle cx="115" cy="110" r="1.5" fill="rgba(255,255,255,0.2)"/>
			<circle cx="175" cy="120" r="1" fill="rgba(196,129,139,0.28)"/>
			<line x1="25" y1="30" x2="80" y2="12" stroke="rgba(196,129,139,0.14)" stroke-width="0.6"/>
			<line x1="80" y1="12" x2="140" y2="45" stroke="rgba(196,129,139,0.11)" stroke-width="0.5"/>
			<line x1="140" y1="45" x2="185" y2="20" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>
			<line x1="55" y1="80" x2="115" y2="110" stroke="rgba(196,129,139,0.10)" stroke-width="0.5"/>
			<line x1="115" y1="110" x2="175" y2="120" stroke="rgba(232,213,190,0.08)" stroke-width="0.5"/>
			<line x1="25" y1="30" x2="55" y2="80" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>
		</svg>

		<div class="container">
			<div class="rev__head">
				<div>
					<span class="g-label">Отзывы клиентов</span>
					<h2 class="g-h2 rev__title">
						Реальные отзывы<br>
						<em class="rev__title-em">реальных людей</em>
					</h2>
				</div>
				<button class="rev__add-btn" @click="showForm = !showForm">
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
						<path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
					{{ showForm ? 'Отмена' : 'Оставить отзыв' }}
				</button>
			</div>

			<!-- Form -->
			<Transition name="rev-form">
				<div v-if="showForm" class="rev__form-wrap">
					<ClientOnly>
						<div class="rev__form">
							<h3 class="rev__form-title">Ваш отзыв</h3>

							<!-- Stars selector -->
							<div class="rev__stars-pick">
								<button
									v-for="s in 5" :key="s"
									class="rev__star-btn"
									:class="{ 'is-active': s <= form.rating }"
									@click="form.rating = s"
									type="button"
									:aria-label="`${s} звезд`"
								>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
										<path d="M10 2l2.3 4.6 5.1.7-3.7 3.6.9 5.1L10 13.5l-4.6 2.5.9-5.1L2.6 7.3l5.1-.7z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
									</svg>
								</button>
							</div>

							<div class="rev__form-grid">
								<UiInput label="Ваше имя" placeholder="Анна К." :value="form.author" @update:value="form.author = $event" />
								<UiSelect label="Услуга" placeholder="Выберите услугу" :options="serviceOptions" :value="form.service" @update:value="form.service = $event" />
							</div>

							<div class="rev__field-wrap">
								<label class="rev__field-label">Отзыв</label>
								<textarea class="rev__textarea" v-model="form.text" placeholder="Расскажите о вашем опыте..." rows="4" />
							</div>

							<UiButton :disabled="loading || !form.author || !form.service || form.text.length < 10" @click="submit" class="rev__submit">
								{{ loading ? 'Отправляем...' : 'Отправить отзыв' }}
							</UiButton>
						</div>
					</ClientOnly>
				</div>
			</Transition>

			<!-- Swiper slider -->
			<div v-if="reviews?.length" class="rev__slider">
				<ClientOnly>
					<Swiper
						class="rev__swiper"
						:modules="modules"
						:slides-per-view="1"
						:space-between="0"
						:loop="total > 1"
						:autoplay="total > 1 ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true } : false"
						:pagination="total > 1 ? { clickable: true, el: '.rev__pagination' } : false"
						:allow-touch-move="total > 1"
						@swiper="onSwiper"
					>
						<SwiperSlide v-for="r in reviews" :key="r.id">
							<!-- Schema.org Review microdata -->
							<div class="rev__card" itemscope itemtype="https://schema.org/Review">
								<div itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating" style="display:none">
									<meta itemprop="ratingValue" :content="String(r.rating ?? 5)">
									<meta itemprop="bestRating"  content="5">
									<meta itemprop="worstRating" content="1">
								</div>
								<meta itemprop="datePublished" :content="(() => { const ts = Number(r.createdAt); if (!ts || isNaN(ts)) return ''; const d = new Date(ts * 1000); return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0]; })()">
								<link itemprop="itemReviewed" href="https://levlani.ru/#business">

								<!-- Декоративная большая кавычка -->
								<div class="rev__card-quote-bg" aria-hidden>"</div>

								<div class="rev__card-top">
									<div class="rev__card-stars">
										<svg v-for="s in r.rating" :key="s" width="14" height="14" viewBox="0 0 13 13" fill="none">
											<path d="M6.5 1l1.5 3 3.3.5-2.4 2.3.6 3.3L6.5 8.7 3 10.1l.6-3.3L1.2 4.5 4.5 4z" fill="url(#rs-a)"/>
											<defs><linearGradient id="rs-a" x1="1" y1="1" x2="12" y2="12"><stop offset="0%" stop-color="#c4818b"/><stop offset="100%" stop-color="#e8d5be"/></linearGradient></defs>
										</svg>
										<svg v-for="s in (5 - r.rating)" :key="`e${s}`" width="14" height="14" viewBox="0 0 13 13" fill="none">
											<path d="M6.5 1l1.5 3 3.3.5-2.4 2.3.6 3.3L6.5 8.7 3 10.1l.6-3.3L1.2 4.5 4.5 4z" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
										</svg>
									</div>
									<span class="rev__card-date">{{ formatDate(r.createdAt) }}</span>
								</div>

								<p class="rev__card-text" itemprop="reviewBody">{{ r.text }}</p>

								<div class="rev__card-author" itemprop="author" itemscope itemtype="https://schema.org/Person">
									<div class="rev__card-avatar">{{ initial(r.author) }}</div>
									<div>
										<div class="rev__card-name" itemprop="name">{{ r.author }}</div>
										<div class="rev__card-service">{{ r.service }}</div>
									</div>
								</div>
							</div>
						</SwiperSlide>
					</Swiper>

					<!-- Controls — только если больше одного отзыва -->
					<div v-if="total > 1" class="rev__controls">
						<div class="rev__pagination" />
						<div class="rev__arrows">
							<button class="rev__arrow" @click="swiperInstance?.slidePrev()" aria-label="Предыдущий отзыв">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
									<path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</button>
							<button class="rev__arrow" @click="swiperInstance?.slideNext()" aria-label="Следующий отзыв">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
									<path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</button>
						</div>
					</div>

					<template #fallback>
						<div class="rev__card rev__card--skeleton">
							<UiSkeleton style="height:20px;width:100px;border-radius:4px" />
							<UiSkeleton style="height:80px;border-radius:8px;margin-top:16px" />
							<UiSkeleton style="height:44px;width:180px;border-radius:8px;margin-top:24px" />
						</div>
					</template>
				</ClientOnly>
			</div>

			<!-- Empty state -->
			<div v-else class="rev__empty">
				<p>Пока нет отзывов. Будьте первым!</p>
				<button class="rev__add-btn" @click="showForm = true">Оставить отзыв</button>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
// ─── Swiper CSS (базовый) ─────────────────────────────────────
@use 'swiper/css';

.rev {
	background: $bg2;
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, $border 30%, $border 70%, transparent);
	}
}

.rev__glow {
	position: absolute;
	width: 600px; height: 400px;
	border-radius: 50%;
	background: radial-gradient(ellipse, rgba(196,129,139,0.06) 0%, transparent 70%);
	filter: blur(60px);
	left: -100px; top: 50%;
	transform: translateY(-50%);
	pointer-events: none;
}

.rev__stars {
	position: absolute;
	inset: 0;
	pointer-events: none;
	z-index: 0;

	&::after {
		content: '';
		position: absolute;
		top: 0; left: 0;
		width: 1px; height: 1px;
		border-radius: 50%;
		background: transparent;
		box-shadow:
			55px 20px 0 0 rgba(255,255,255,0.12),
			150px 48px 0 0 rgba(196,129,139,0.15),
			260px 14px 0 0 rgba(255,255,255,0.09),
			380px 40px 0 0 rgba(232,213,190,0.11),
			510px 22px 0 0 rgba(255,255,255,0.13),
			640px 55px 0 0 rgba(196,129,139,0.12),
			770px 18px 0 0 rgba(255,255,255,0.10),
			900px 38px 0 0 rgba(232,213,190,0.11),
			1020px 28px 0 0 rgba(255,255,255,0.12),
			1120px 52px 0 0 rgba(196,129,139,0.14),
			90px 200px 0 0 rgba(255,255,255,0.09),
			270px 230px 0 0 rgba(196,129,139,0.10),
			490px 250px 0 0 rgba(255,255,255,0.10),
			720px 220px 0 0 rgba(232,213,190,0.09),
			950px 240px 0 0 rgba(255,255,255,0.11);
	}
}

.rev__nebula {
	position: absolute;
	width: 420px; height: 240px;
	border-radius: 50%;
	background: radial-gradient(ellipse, rgba(196,129,139,0.06) 0%, transparent 70%);
	filter: blur(60px);
	top: -40px; right: 5%;
	pointer-events: none;
	z-index: 0;
}

.rev__constellation {
	position: absolute;
	top: 0; right: 0;
	width: 200px; height: 160px;
	pointer-events: none;
	z-index: 0;
	opacity: 0.85;
}

.rev__head {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 24px;
	margin-bottom: 40px;
	flex-wrap: wrap;
	position: relative;
	z-index: 1;
}

.rev__form-wrap,
.rev__slider,
.rev__empty {
	position: relative;
	z-index: 1;
}

.rev__title { margin: 8px 0 0; }

.rev__title-em {
	font-style: italic;
	background: linear-gradient(120deg, $roseGold 0%, $champagne 60%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.rev__add-btn {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	padding: 10px 20px;
	background: rgba(196,129,139,0.1);
	border: 1px solid rgba(196,129,139,0.25);
	border-radius: 100px;
	font-size: 0.85rem;
	font-weight: 500;
	color: $roseGoldLight;
	cursor: pointer;
	@include transition();
	white-space: nowrap;

	&:hover {
		background: rgba(196,129,139,0.18);
		border-color: rgba(196,129,139,0.4);
	}
}

// ─── Form ────────────────────────────────────────────────────
.rev__form-wrap { overflow: hidden; margin-bottom: 40px; }

.rev__form {
	background: rgba(255,255,255,0.025);
	border: 1px solid $border;
	border-radius: 20px;
	padding: 32px;
	display: flex;
	flex-direction: column;
	gap: 18px;

	@include mq(0, $tablet) { padding: 20px; }
}

.rev__form-title {
	font-family: $headingFont;
	font-size: 1.3rem;
	font-weight: 400;
	color: $textPrimary;
	margin: 0;
}

.rev__stars-pick { display: flex; gap: 4px; }

.rev__star-btn {
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	color: $border;
	line-height: 0;
	@include transition();

	&.is-active { color: $roseGold; }
	&:hover { color: $roseGoldLight; transform: scale(1.1); }
}

.rev__form-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 14px;

	@include mq(0, $tablet) { grid-template-columns: 1fr; }
}

.rev__field-wrap { display: flex; flex-direction: column; gap: 6px; }

.rev__field-label {
	font-size: 0.78rem;
	font-weight: 500;
	letter-spacing: 0.04em;
	color: $textSecondary;
}

.rev__textarea {
	width: 100%;
	padding: 11px 16px;
	background: rgba(255,255,255,0.04);
	border: 1px solid $border;
	border-radius: 10px;
	outline: none;
	color: $textPrimary;
	font-family: $firstFont;
	font-size: 0.9rem;
	resize: vertical;
	min-height: 100px;
	@include transition();

	&:hover { border-color: $borderHover; }
	&:focus { border-color: $borderFocus; }
	&::placeholder { color: $textMuted; }
}

.rev__submit { align-self: flex-start; }

// ─── Swiper ──────────────────────────────────────────────────
.rev__swiper {
	width: 100%;
	// Отступ снизу под pagination dots
	padding-bottom: 0 !important;
}

// Slide card
.rev__card {
	background: rgba(255,255,255,0.025);
	border: 1px solid $border;
	border-radius: 24px;
	padding: 48px 56px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	position: relative;
	overflow: hidden;
	height: 100%;
	box-sizing: border-box;
	@include transition();

	&:hover { border-color: rgba(196,129,139,0.18); }

	&--skeleton { min-height: 280px; }

	@include mq(0, $tablet) { padding: 28px 20px; }
}

.rev__card-quote-bg {
	position: absolute;
	top: -20px; right: 40px;
	font-family: $headingFont;
	font-size: 12rem;
	font-weight: 300;
	font-style: italic;
	color: transparent;
	-webkit-text-stroke: 1px rgba(196,129,139,0.07);
	line-height: 1;
	pointer-events: none;
	user-select: none;
}

.rev__card-top {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
}

.rev__card-stars { display: flex; gap: 3px; }

.rev__card-date {
	font-size: 0.75rem;
	color: $textMuted;
}

.rev__card-text {
	font-family: $headingFont;
	font-size: clamp(1rem, 2vw, 1.25rem);
	font-weight: 300;
	font-style: italic;
	color: $textSecondary;
	line-height: 1.75;
	flex: 1;
	margin: 0;
	max-width: 840px;
}

.rev__card-author {
	display: flex;
	align-items: center;
	gap: 12px;
	padding-top: 20px;
	border-top: 1px solid $border;
}

.rev__card-avatar {
	width: 44px; height: 44px;
	border-radius: 50%;
	background: linear-gradient(135deg, $roseGoldDark, $roseGold);
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: $headingFont;
	font-size: 1.1rem;
	color: $white;
	flex-shrink: 0;
	box-shadow: 0 0 16px rgba(196,129,139,0.25);
}

.rev__card-name {
	font-size: 0.92rem;
	font-weight: 500;
	color: $textPrimary;
}

.rev__card-service {
	font-size: 0.76rem;
	color: $roseGold;
	margin-top: 2px;
}

// ─── Controls ────────────────────────────────────────────────
.rev__controls {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
	margin-top: 28px;

	@include mq(0, $tablet) { flex-direction: column-reverse; align-items: flex-start; }
}

// Кастомные pagination dots (переопределяем Swiper)
.rev__pagination {
	display: flex;
	gap: 8px;
	align-items: center;

	// Swiper генерирует .swiper-pagination-bullet внутри нашего контейнера
	.swiper-pagination-bullet {
		width: 6px; height: 6px;
		border-radius: 100px;
		background: rgba(255,255,255,0.12);
		opacity: 1;
		@include transition();
		margin: 0 !important;
	}

	.swiper-pagination-bullet-active {
		width: 24px;
		background: linear-gradient(90deg, $roseGold, $champagne);
		box-shadow: 0 0 10px rgba(196,129,139,0.5);
	}
}

.rev__arrows {
	display: flex;
	align-items: center;
	gap: 10px;
}

.rev__arrow {
	width: 40px; height: 40px;
	border-radius: 50%;
	border: 1px solid $border;
	background: rgba(255,255,255,0.03);
	color: $textSecondary;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	@include transition();

	&:hover {
		border-color: rgba(196,129,139,0.35);
		color: $roseGoldLight;
		background: rgba(196,129,139,0.08);
	}
}

// ─── Empty ────────────────────────────────────────────────────
.rev__empty {
	text-align: center;
	padding: 60px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;

	p { font-size: 1rem; color: $textMuted; margin: 0; }
}

// ─── Form transition ──────────────────────────────────────────
.rev-form-enter-active,
.rev-form-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.rev-form-enter-from,
.rev-form-leave-to { opacity: 0; transform: translateY(-12px); }
</style>
