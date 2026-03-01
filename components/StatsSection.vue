<script setup>
// ─── Секция статистики — анимированные счётчики ───────────────────────────────
// 4 карточки с числами, которые «считаются» при входе в viewport (ScrollTrigger).
// Данные статичны — меняются вручную в массиве stats.
// animateCounters ищет элементы с data-target и анимирует их через GSAP.

import { useGsapAnimations } from '@/composables/useGsapAnimations';

const { animateCounters } = useGsapAnimations();

const stats = [
	{ value: '10', suffix: '+', label: 'лет опыта', desc: 'Работаем с 2015 года' },
	{ value: '3000', suffix: '+', label: 'довольных клиентов', desc: 'Возвращаются снова' },
	{ value: '6', suffix: '+', label: 'услуг салона', desc: 'Красота с головы до ног' },
	{ value: '99', suffix: '%', label: 'рекомендуют нас', desc: 'По отзывам клиентов' },
];

onMounted(() => {
	animateCounters('.stat__value');
});
</script>

<template>
	<section class="stats">
		<!-- Cosmic decorations -->
		<div class="stats__stars" aria-hidden />
		<div class="stats__nebula stats__nebula--1" aria-hidden />
		<div class="stats__nebula stats__nebula--2" aria-hidden />

		<div class="stats__line stats__line--top" />
		<div class="container stats__inner">
			<div
				v-for="(stat, i) in stats"
				:key="i"
				class="stat"
			>
				<div class="stat__glow" aria-hidden />
				<div class="stat__num">
					<span class="stat__value" :data-target="stat.value">0</span>
					<span class="stat__suffix">{{ stat.suffix }}</span>
				</div>
				<div class="stat__info">
					<span class="stat__label">{{ stat.label }}</span>
					<span class="stat__desc">{{ stat.desc }}</span>
				</div>
			</div>
		</div>
		<div class="stats__line stats__line--bottom" />
	</section>
</template>

<style lang="scss">
.stats {
	background: $bg2;
	position: relative;
	overflow: hidden;
}

.stats__stars {
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
			38px 18px 0 0 rgba(255,255,255,0.13),
			94px 42px 0 0 rgba(196,129,139,0.18),
			167px 12px 0 0 rgba(255,255,255,0.09),
			243px 55px 0 0 rgba(255,255,255,0.15),
			312px 28px 0 0 rgba(232,213,190,0.11),
			421px 8px 0 0 rgba(255,255,255,0.12),
			498px 48px 0 0 rgba(196,129,139,0.14),
			573px 22px 0 0 rgba(255,255,255,0.10),
			647px 38px 0 0 rgba(232,213,190,0.13),
			720px 6px 0 0 rgba(255,255,255,0.16),
			68px 68px 0 0 rgba(196,129,139,0.10),
			145px 72px 0 0 rgba(255,255,255,0.08),
			260px 80px 0 0 rgba(255,255,255,0.12),
			380px 62px 0 0 rgba(196,129,139,0.09),
			510px 74px 0 0 rgba(255,255,255,0.11),
			630px 58px 0 0 rgba(232,213,190,0.10),
			760px 70px 0 0 rgba(255,255,255,0.14),
			820px 30px 0 0 rgba(196,129,139,0.12),
			900px 15px 0 0 rgba(255,255,255,0.09),
			960px 52px 0 0 rgba(232,213,190,0.11);
	}
}

.stats__nebula {
	position: absolute;
	border-radius: 50%;
	filter: blur(60px);
	pointer-events: none;
	z-index: 0;

	&--1 {
		width: 480px; height: 280px;
		background: radial-gradient(ellipse, rgba(196,129,139,0.09) 0%, transparent 70%);
		top: -80px; left: -60px;
	}

	&--2 {
		width: 360px; height: 220px;
		background: radial-gradient(ellipse, rgba(232,213,190,0.05) 0%, transparent 70%);
		bottom: -60px; right: 5%;
	}
}

.stats__line {
	height: 1px;
	background: linear-gradient(90deg, transparent, $border 30%, $border 70%, transparent);
	position: relative;
	z-index: 1;
}

.stats__inner {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 0;
	position: relative;
	z-index: 1;

	@include mq(0, $laptop) {
		grid-template-columns: repeat(2, 1fr);
	}

	@include mq(0, $tablet) {
		grid-template-columns: 1fr 1fr;
	}
}

.stat {
	padding: 48px 36px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	position: relative;

	& + & {
		&::before {
			content: '';
			position: absolute;
			left: 0; top: 20%; bottom: 20%;
			width: 1px;
			background: linear-gradient(180deg, transparent, $border 30%, $border 70%, transparent);
		}
	}

	@include mq(0, $laptop) {
		padding: 36px 24px;

		&:nth-child(2)::before { display: block; }
		&:nth-child(3)::before { display: none; }
	}

	@include mq(0, $tablet) {
		padding: 32px 20px;
	}
}

.stat__glow {
	position: absolute;
	width: 100px; height: 100px;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(196,129,139,0.12) 0%, transparent 70%);
	top: 24px; left: 20px;
	filter: blur(24px);
	pointer-events: none;
}

.stat__num {
	display: flex;
	align-items: baseline;
	gap: 2px;
}

.stat__value {
	font-family: $headingFont;
	font-size: clamp(2.5rem, 5vw, 3.8rem);
	font-weight: 300;
	line-height: 1;
	background: linear-gradient(120deg, $roseGold, $champagne);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.stat__suffix {
	font-family: $headingFont;
	font-size: clamp(1.5rem, 3vw, 2.2rem);
	font-weight: 300;
	color: $roseGold;
}

.stat__info {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.stat__label {
	font-size: 0.88rem;
	font-weight: 500;
	color: $textPrimary;
}

.stat__desc {
	font-size: 0.76rem;
	color: $textMuted;
}
</style>
