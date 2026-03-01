<script setup>
/**
 * Секция услуг: данные из API, карточки анимируются при скролле (useGsapAnimations).
 */

import { useGsapAnimations } from '@/composables/useGsapAnimations';

// variables
const { animateScrollCards, animateSectionTitle } = useGsapAnimations();
const { servicesApi } = useApi();
const { data: services } = await servicesApi.getServices();

onMounted(() =>
{
	animateSectionTitle('.services__head');
	animateScrollCards('.service-card');
});
</script>

<template>
	<section id="services" class="services g-section">
		<!-- Cosmic bg -->
		<div class="services__stars" aria-hidden />
		<div class="services__nebula services__nebula--1" aria-hidden />
		<div class="services__nebula services__nebula--2" aria-hidden />
		<svg class="services__constellation" viewBox="0 0 240 200" fill="none" aria-hidden>
			<circle cx="20" cy="30" r="1.5" fill="rgba(196,129,139,0.45)"/>
			<circle cx="80" cy="10" r="1.2" fill="rgba(255,255,255,0.28)"/>
			<circle cx="150" cy="50" r="2" fill="rgba(196,129,139,0.38)"/>
			<circle cx="200" cy="20" r="1" fill="rgba(232,213,190,0.3)"/>
			<circle cx="230" cy="70" r="1.5" fill="rgba(255,255,255,0.22)"/>
			<circle cx="50" cy="90" r="1.3" fill="rgba(196,129,139,0.35)"/>
			<circle cx="120" cy="120" r="1" fill="rgba(255,255,255,0.18)"/>
			<circle cx="190" cy="140" r="1.8" fill="rgba(196,129,139,0.3)"/>
			<line x1="20" y1="30" x2="80" y2="10" stroke="rgba(196,129,139,0.14)" stroke-width="0.6"/>
			<line x1="80" y1="10" x2="150" y2="50" stroke="rgba(196,129,139,0.11)" stroke-width="0.5"/>
			<line x1="150" y1="50" x2="200" y2="20" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>
			<line x1="200" y1="20" x2="230" y2="70" stroke="rgba(232,213,190,0.09)" stroke-width="0.5"/>
			<line x1="50" y1="90" x2="120" y2="120" stroke="rgba(196,129,139,0.10)" stroke-width="0.5"/>
			<line x1="120" y1="120" x2="190" y2="140" stroke="rgba(196,129,139,0.08)" stroke-width="0.5"/>
			<line x1="20" y1="30" x2="50" y2="90" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
		</svg>
		<div class="container">
			<div class="services__head">
				<span class="g-label">Что мы делаем</span>
				<h2 class="g-h2 services__title">
					Услуги, которые<br>
					<em class="services__title-em">преображают</em>
				</h2>
				<p class="services__sub">
					Каждая процедура — это ритуал заботы, созданный специально для вас.
				</p>
			</div>

			<div class="services__grid">
				<ServicesServiceCard
					v-for="(service, i) in services"
					:key="service.id"
					:title="service.title"
					:description="service.description"
					:price="service.price"
					:icon="service.icon"
					:index="i"
				/>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.services {
	background: $bg2;
	position: relative;
	overflow: hidden;

	.services__head,
	.services__grid {
		position: relative;
		z-index: 1;
	}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, $border 30%, $border 70%, transparent);
	}
}

.services__stars {
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
			70px 25px 0 0 rgba(255,255,255,0.12),
			180px 8px 0 0 rgba(196,129,139,0.15),
			290px 48px 0 0 rgba(255,255,255,0.10),
			420px 18px 0 0 rgba(232,213,190,0.11),
			560px 38px 0 0 rgba(255,255,255,0.13),
			680px 12px 0 0 rgba(196,129,139,0.13),
			800px 50px 0 0 rgba(255,255,255,0.09),
			940px 28px 0 0 rgba(232,213,190,0.12),
			1060px 42px 0 0 rgba(255,255,255,0.11),
			1150px 16px 0 0 rgba(196,129,139,0.14),
			110px 220px 0 0 rgba(255,255,255,0.09),
			300px 260px 0 0 rgba(196,129,139,0.10),
			530px 240px 0 0 rgba(255,255,255,0.11),
			760px 270px 0 0 rgba(232,213,190,0.09),
			990px 250px 0 0 rgba(255,255,255,0.10);
	}
}

.services__nebula {
	position: absolute;
	border-radius: 50%;
	filter: blur(70px);
	pointer-events: none;
	z-index: 0;

	&--1 {
		width: 520px; height: 300px;
		background: radial-gradient(ellipse, rgba(196,129,139,0.08) 0%, transparent 70%);
		top: -80px; right: -60px;
	}

	&--2 {
		width: 380px; height: 220px;
		background: radial-gradient(ellipse, rgba(232,213,190,0.04) 0%, transparent 70%);
		bottom: -50px; left: 8%;
	}
}

.services__constellation {
	position: absolute;
	top: 0; left: 0;
	width: 240px; height: 200px;
	pointer-events: none;
	z-index: 0;
	opacity: 0.85;
}

.services__head {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 16px;
	margin-bottom: 60px;
	max-width: 560px;
}

.services__title {
	margin: 0;
}

.services__title-em {
	font-style: italic;
	background: linear-gradient(120deg, $roseGold 0%, $champagne 60%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.services__sub {
	font-size: 0.95rem;
	color: $textSecondary;
	line-height: 1.7;
}

.services__grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 16px;

	@include mq(0, $laptop) {
		grid-template-columns: repeat(2, 1fr);
	}

	@include mq(0, $tablet) {
		grid-template-columns: 1fr;
	}
}
</style>
