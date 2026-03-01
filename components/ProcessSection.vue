<script setup>
/**
 * Секция «Как мы работаем»: 4 шага. Анимация при скролле.
 */

import { useGsapAnimations } from '@/composables/useGsapAnimations';

// variables
const { animateScrollCards, animateSectionTitle } = useGsapAnimations();
const steps = [
	{
		num: '01',
		title: 'Выберите услугу',
		desc: 'Изучите каталог услуг и выберите процедуру или запишитесь на консультацию — мы поможем определиться.',
		icon: `<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
	},
	{
		num: '02',
		title: 'Консультация',
		desc: 'Мастер выслушает ваши пожелания, оценит особенности и предложит оптимальное решение именно для вас.',
		icon: `<path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
	},
	{
		num: '03',
		title: 'Процедура',
		desc: 'Наслаждайтесь профессиональным уходом в атмосфере уюта. Используем только премиальные материалы.',
		icon: `<path d="M5 3l14 9-14 9V3z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="19" cy="6" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
	},
	{
		num: '04',
		title: 'Ваш результат',
		desc: 'Покиньте салон с великолепным образом и рекомендациями по уходу для сохранения результата дольше.',
		icon: `<path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
	},
];

onMounted(() =>
{
	animateSectionTitle('.process__head');
	animateScrollCards('.process__card');
});
</script>

<template>
	<section id="process" class="process g-section">
		<!-- Cosmic bg -->
		<div class="process__stars" aria-hidden />
		<div class="process__nebula process__nebula--1" aria-hidden />
		<div class="process__nebula process__nebula--2" aria-hidden />

		<!-- Constellation SVG background -->
		<svg class="process__constellation" viewBox="0 0 400 300" fill="none" aria-hidden>
			<circle cx="30" cy="50" r="1.5" fill="rgba(196,129,139,0.4)"/>
			<circle cx="100" cy="20" r="1" fill="rgba(255,255,255,0.25)"/>
			<circle cx="180" cy="70" r="2" fill="rgba(196,129,139,0.35)"/>
			<circle cx="260" cy="30" r="1.2" fill="rgba(232,213,190,0.3)"/>
			<circle cx="350" cy="60" r="1.5" fill="rgba(196,129,139,0.4)"/>
			<circle cx="60" cy="140" r="1" fill="rgba(255,255,255,0.2)"/>
			<circle cx="150" cy="160" r="1.8" fill="rgba(196,129,139,0.3)"/>
			<circle cx="300" cy="150" r="1.2" fill="rgba(232,213,190,0.25)"/>
			<circle cx="370" cy="180" r="1" fill="rgba(255,255,255,0.18)"/>
			<line x1="30" y1="50" x2="100" y2="20" stroke="rgba(196,129,139,0.12)" stroke-width="0.6"/>
			<line x1="100" y1="20" x2="180" y2="70" stroke="rgba(196,129,139,0.10)" stroke-width="0.5"/>
			<line x1="180" y1="70" x2="260" y2="30" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>
			<line x1="260" y1="30" x2="350" y2="60" stroke="rgba(196,129,139,0.09)" stroke-width="0.5"/>
			<line x1="60" y1="140" x2="150" y2="160" stroke="rgba(196,129,139,0.08)" stroke-width="0.5"/>
			<line x1="150" y1="160" x2="300" y2="150" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
			<line x1="300" y1="150" x2="370" y2="180" stroke="rgba(196,129,139,0.08)" stroke-width="0.5"/>
		</svg>

		<div class="container">
			<div class="process__head">
				<span class="g-label">Как мы работаем</span>
				<h2 class="g-h2">
					Четыре шага<br>
					<em class="process__title-em">к вашему образу</em>
				</h2>
			</div>

			<div class="process__grid">
				<div
					v-for="(step, i) in steps"
					:key="step.num"
					class="process__card"
				>
					<!-- Cosmic glow per card -->
					<div class="process__card-glow" aria-hidden />

					<div class="process__card-head">
						<div class="process__icon">
							<svg width="20" height="20" viewBox="0 0 24 24" v-html="step.icon" />
						</div>
						<span class="process__num">{{ step.num }}</span>
					</div>
					<h3 class="process__title">{{ step.title }}</h3>
					<p class="process__desc">{{ step.desc }}</p>

					<!-- Connector (except last) -->
					<div v-if="i < steps.length - 1" class="process__connector">
						<div class="process__connector-line" />
						<div class="process__connector-dot" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.process {
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

.process__stars {
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
			60px 30px 0 0 rgba(255,255,255,0.12),
			150px 10px 0 0 rgba(196,129,139,0.16),
			250px 55px 0 0 rgba(255,255,255,0.09),
			370px 20px 0 0 rgba(232,213,190,0.11),
			500px 45px 0 0 rgba(255,255,255,0.14),
			620px 8px 0 0 rgba(196,129,139,0.12),
			740px 38px 0 0 rgba(255,255,255,0.10),
			860px 22px 0 0 rgba(232,213,190,0.13),
			1000px 50px 0 0 rgba(255,255,255,0.11),
			1100px 15px 0 0 rgba(196,129,139,0.14),
			80px 200px 0 0 rgba(255,255,255,0.09),
			220px 220px 0 0 rgba(196,129,139,0.10),
			420px 240px 0 0 rgba(255,255,255,0.12),
			680px 210px 0 0 rgba(232,213,190,0.09),
			900px 230px 0 0 rgba(255,255,255,0.11);
	}
}

.process__nebula {
	position: absolute;
	border-radius: 50%;
	filter: blur(70px);
	pointer-events: none;
	z-index: 0;

	&--1 {
		width: 500px; height: 250px;
		background: radial-gradient(ellipse, rgba(196,129,139,0.07) 0%, transparent 70%);
		top: -60px; right: -80px;
	}

	&--2 {
		width: 400px; height: 200px;
		background: radial-gradient(ellipse, rgba(232,213,190,0.04) 0%, transparent 70%);
		bottom: -40px; left: 5%;
	}
}

.process__constellation {
	position: absolute;
	bottom: 0; right: 0;
	width: 400px; height: 300px;
	pointer-events: none;
	z-index: 0;
	opacity: 0.85;
}

.process__head {
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-bottom: 64px;
	max-width: 480px;
	position: relative;
	z-index: 1;
}

.process__title-em {
	font-style: italic;
	background: linear-gradient(120deg, $roseGold 0%, $champagne 60%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.process__grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 0;
	position: relative;
	z-index: 1;

	@include mq(0, $laptop) {
		grid-template-columns: repeat(2, 1fr);
	}

	@include mq(0, $tablet) {
		grid-template-columns: 1fr;
	}
}

.process__card {
	padding: 32px 28px;
	background: rgba(255, 255, 255, 0.015);
	border: 1px solid $border;
	border-radius: 16px;
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 14px;
	overflow: hidden;
	@include transition();

	& + & {
		margin-left: -1px;
		border-radius: 0;

		@include mq(0, $laptop) {
			margin-left: 0;
			margin-top: -1px;
		}
	}

	&:first-child {
		border-radius: 16px 0 0 16px;

		// 2-col (tablet..laptop): only top-left corner
		@include mq(0, $laptop) {
			border-radius: 16px 0 0 0;
		}

		// 1-col: top two corners
		@include mq(0, $tablet) {
			border-radius: 16px 16px 0 0;
		}
	}

	// 2-col: top-right corner for card #2
	&:nth-child(2) {
		@include mq($tablet, $laptop) {
			border-radius: 0 16px 0 0;
		}
	}

	// 2-col: bottom-left corner for card #3
	&:nth-child(3) {
		@include mq($tablet, $laptop) {
			border-radius: 0 0 0 16px;
		}
	}

	&:last-child {
		border-radius: 0 16px 16px 0;

		// 2-col: only bottom-right corner
		@include mq(0, $laptop) {
			border-radius: 0 0 16px 0;
		}

		// 1-col: both bottom corners
		@include mq(0, $tablet) {
			border-radius: 0 0 16px 16px;
		}
	}

	&:hover {
		background: rgba(255, 255, 255, 0.035);
		border-color: rgba(196, 129, 139, 0.2);
		z-index: 2;

		.process__card-glow {
			opacity: 1;
		}
	}
}

.process__card-glow {
	position: absolute;
	width: 160px; height: 160px;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(196,129,139,0.10) 0%, transparent 70%);
	top: -40px; left: -40px;
	filter: blur(30px);
	pointer-events: none;
	opacity: 0.5;
	@include transition();
}

.process__card-head {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}

.process__icon {
	width: 44px;
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(196, 129, 139, 0.08);
	border: 1px solid rgba(196, 129, 139, 0.18);
	border-radius: 12px;
	color: $roseGold;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		inset: -1px;
		border-radius: 12px;
		box-shadow: 0 0 16px rgba(196,129,139,0.15);
		pointer-events: none;
	}
}

.process__num {
	font-family: $headingFont;
	font-size: 2.2rem;
	font-weight: 300;
	color: $textMuted;
	line-height: 1;
}

.process__title {
	font-family: $headingFont;
	font-size: 1.25rem;
	font-weight: 400;
	color: $textPrimary;
	line-height: 1.3;
}

.process__desc {
	font-size: 0.84rem;
	color: $textSecondary;
	line-height: 1.7;
	flex: 1;
}

.process__connector {
	position: absolute;
	top: 50%;
	right: -1px;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	pointer-events: none;
	z-index: 3;

	@include mq(0, $laptop) {
		display: none;
	}
}

.process__connector-line {
	width: 0;
	height: 0;
}

.process__connector-dot {
	width: 6px; height: 6px;
	border-radius: 50%;
	background: $roseGold;
	box-shadow: 0 0 10px rgba(196,129,139,0.7), 0 0 20px rgba(196,129,139,0.3);
	position: relative;

	&::before {
		content: '';
		position: absolute;
		inset: -3px;
		border-radius: 50%;
		border: 1px solid rgba(196,129,139,0.3);
	}
}
</style>
