<script setup>
/**
 * Атмосферная секция «Наша философия»: параллакс фона, цитата, счётчики.
 */
import { useGsapAnimations } from '@/composables/useGsapAnimations';

// variables
const { animateParallaxSection } = useGsapAnimations();
const counters = [
	{ value: '∞', label: 'возможностей' },
	{ value: '01', label: 'ваш образ' },
	{ value: '100%', label: 'индивидуально' },
];

// functions
onMounted(() =>
{
	animateParallaxSection('.mood__bg-text', '.mood__content');
});
</script>

<template>
	<section class="mood">
		<!-- Decorative huge background text -->
		<div class="mood__bg-text" aria-hidden>BEAUTÉ</div>

		<!-- Star field -->
		<div class="mood__stars" aria-hidden />

		<!-- Animated lines -->
		<div class="mood__lines" aria-hidden>
			<div class="mood__line mood__line--1" />
			<div class="mood__line mood__line--2" />
			<div class="mood__line mood__line--3" />
		</div>

		<!-- Glows -->
		<div class="mood__glow" />
		<div class="mood__glow mood__glow--2" />

		<!-- Orbit rings -->
		<div class="mood__orbit mood__orbit--1" aria-hidden />
		<div class="mood__orbit mood__orbit--2" aria-hidden />

		<!-- Constellation left -->
		<svg class="mood__constellation mood__constellation--left" viewBox="0 0 180 160" fill="none" aria-hidden>
			<circle cx="22" cy="38" r="1.8" fill="rgba(196,129,139,0.5)"/>
			<circle cx="78" cy="16" r="1.2" fill="rgba(255,255,255,0.35)"/>
			<circle cx="130" cy="54" r="2.2" fill="rgba(196,129,139,0.6)"/>
			<circle cx="160" cy="28" r="1" fill="rgba(255,255,255,0.25)"/>
			<circle cx="58" cy="82" r="1.5" fill="rgba(232,213,190,0.4)"/>
			<circle cx="108" cy="100" r="1" fill="rgba(196,129,139,0.3)"/>
			<circle cx="40" cy="120" r="1.3" fill="rgba(255,255,255,0.2)"/>
			<line x1="22" y1="38" x2="78" y2="16" stroke="rgba(196,129,139,0.15)" stroke-width="0.6"/>
			<line x1="78" y1="16" x2="130" y2="54" stroke="rgba(196,129,139,0.12)" stroke-width="0.6"/>
			<line x1="130" y1="54" x2="160" y2="28" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
			<line x1="22" y1="38" x2="58" y2="82" stroke="rgba(196,129,139,0.10)" stroke-width="0.5"/>
			<line x1="58" y1="82" x2="108" y2="100" stroke="rgba(196,129,139,0.08)" stroke-width="0.5"/>
			<line x1="40" y1="120" x2="58" y2="82" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
		</svg>

		<!-- Constellation right -->
		<svg class="mood__constellation mood__constellation--right" viewBox="0 0 180 160" fill="none" aria-hidden>
			<circle cx="20" cy="30" r="1.5" fill="rgba(232,213,190,0.4)"/>
			<circle cx="70" cy="55" r="2" fill="rgba(196,129,139,0.55)"/>
			<circle cx="110" cy="20" r="1.2" fill="rgba(255,255,255,0.3)"/>
			<circle cx="150" cy="70" r="1.8" fill="rgba(196,129,139,0.45)"/>
			<circle cx="90" cy="110" r="1" fill="rgba(255,255,255,0.22)"/>
			<circle cx="40" cy="90" r="1.3" fill="rgba(196,129,139,0.3)"/>
			<line x1="20" y1="30" x2="70" y2="55" stroke="rgba(196,129,139,0.13)" stroke-width="0.6"/>
			<line x1="70" y1="55" x2="110" y2="20" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
			<line x1="70" y1="55" x2="150" y2="70" stroke="rgba(196,129,139,0.11)" stroke-width="0.6"/>
			<line x1="70" y1="55" x2="90" y2="110" stroke="rgba(196,129,139,0.09)" stroke-width="0.5"/>
			<line x1="40" y1="90" x2="70" y2="55" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>
		</svg>

		<div class="container mood__content">
			<div class="mood__label">
				<div class="mood__label-line" />
				<span>Наша философия</span>
				<div class="mood__label-line" />
			</div>

			<blockquote class="mood__quote">
				Красота — это не маска.<br>
				<em>Это язык, на котором говорит ваша душа.</em>
			</blockquote>

			<p class="mood__sub">
				Каждый мастер Lev & Lani — художник.<br>
				Каждый клиент — уникальное полотно.
			</p>

			<!-- Decorative counters row -->
			<div class="mood__counters">
				<div class="mood__counter" v-for="c in counters" :key="c.label">
					<span class="mood__counter-val">{{ c.value }}</span>
					<span class="mood__counter-label">{{ c.label }}</span>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.mood
{
	position: relative;
	overflow: hidden;
	padding: 140px 0;
	background: $bg;

	@include mq(0, $tablet)
	{
		padding: 80px 0;
	}

	&::before
	{
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, $border 30%, $border 70%, transparent);
	}
}

.mood__stars
{
	position: absolute;
	inset: 0;
	pointer-events: none;
	z-index: 0;

	&::before
	{
		content: '';
		position: absolute;
		top: 0; left: 0;
		width: 1px; height: 1px;
		border-radius: 50%;
		background: transparent;
		box-shadow:
			55px 22px 0 0 rgba(255,255,255,0.14),
			130px 60px 0 0 rgba(196,129,139,0.18),
			210px 15px 0 0 rgba(255,255,255,0.10),
			330px 80px 0 0 rgba(232,213,190,0.13),
			480px 30px 0 0 rgba(255,255,255,0.11),
			600px 65px 0 0 rgba(196,129,139,0.15),
			720px 20px 0 0 rgba(255,255,255,0.09),
			850px 50px 0 0 rgba(232,213,190,0.12),
			1000px 10px 0 0 rgba(255,255,255,0.16),
			1100px 70px 0 0 rgba(196,129,139,0.11),
			90px 130px 0 0 rgba(255,255,255,0.09),
			260px 150px 0 0 rgba(196,129,139,0.10),
			440px 170px 0 0 rgba(255,255,255,0.12),
			640px 140px 0 0 rgba(232,213,190,0.08),
			820px 160px 0 0 rgba(255,255,255,0.11),
			1050px 130px 0 0 rgba(196,129,139,0.13);
	}

	&::after
	{
		content: '';
		position: absolute;
		bottom: 0; left: 0;
		width: 1px; height: 1px;
		border-radius: 50%;
		background: transparent;
		box-shadow:
			80px -40px 0 0 rgba(255,255,255,0.10),
			200px -20px 0 0 rgba(196,129,139,0.12),
			380px -55px 0 0 rgba(255,255,255,0.14),
			520px -30px 0 0 rgba(232,213,190,0.10),
			700px -60px 0 0 rgba(255,255,255,0.09),
			900px -25px 0 0 rgba(196,129,139,0.13),
			1080px -45px 0 0 rgba(255,255,255,0.11);
	}
}

.mood__bg-text {
	position: absolute;
	top: 50%; left: 50%;
	transform: translate(-50%, -50%);
	font-family: $headingFont;
	font-size: clamp(10rem, 22vw, 20rem);
	font-weight: 300;
	font-style: italic;
	color: transparent;
	-webkit-text-stroke: 1px rgba(196, 129, 139, 0.06);
	white-space: nowrap;
	pointer-events: none;
	user-select: none;
	letter-spacing: 0.05em;
}

.mood__lines {
	position: absolute;
	inset: 0;
	pointer-events: none;
}

.mood__line
{
	position: absolute;
	background: linear-gradient(90deg, transparent, rgba(196,129,139,0.08), transparent);
	height: 1px;
	width: 100%;

	&--1 { top: 25%; }
	&--2 { top: 50%; background: linear-gradient(90deg, transparent, rgba(232,213,190,0.05), transparent); }
	&--3 { top: 75%; }
}

.mood__glow
{
	position: absolute;
	width: 600px;
	height: 300px;
	border-radius: 50%;
	background: radial-gradient(ellipse, rgba(196,129,139,0.07) 0%, transparent 70%);
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	filter: blur(40px);
	pointer-events: none;

	&--2
	{
		width: 320px; height: 180px;
		background: radial-gradient(ellipse, rgba(232,213,190,0.05) 0%, transparent 70%);
		top: 20%; left: 75%;
		transform: translate(-50%, 0);
		filter: blur(50px);
	}
}

.mood__orbit
{
	position: absolute;
	border-radius: 50%;
	border: 1px solid rgba(196,129,139,0.05);
	pointer-events: none;
	top: 50%;
	left: 50%;

	&--1
	{
		width: 700px;
		height: 700px;
		margin-top: -350px;
		margin-left: -350px;
	}

	&--2
	{
		width: 440px; height: 440px;
		margin-top: -220px; margin-left: -220px;
		border-color: rgba(232,213,190,0.04);
	}
}

.mood__constellation
{
	position: absolute;
	pointer-events: none;
	z-index: 0;

	&--left
	{
		width: 180px;
		height: 160px;
		top: 10%;
		left: 2%;
		opacity: 0.9;
	}

	&--right
	{
		width: 180px; height: 160px;
		bottom: 10%; right: 2%;
		opacity: 0.8;
		transform: scaleX(-1);
	}
}

.mood__content
{
	position: relative;
	z-index: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: 40px;
}

.mood__label
{
	display: flex;
	align-items: center;
	gap: 16px;
	font-size: 0.68rem;
	font-weight: 600;
	letter-spacing: 0.25em;
	text-transform: uppercase;
	color: $roseGold;
}

.mood__label-line
{
	flex: 1;
	max-width: 60px;
	height: 1px;
	background: linear-gradient(90deg, transparent, rgba(196,129,139,0.4));

	&:last-child { background: linear-gradient(-90deg, transparent, rgba(196,129,139,0.4)); }
}

.mood__quote
{
	font-family: $headingFont;
	font-size: clamp(2rem, 4.5vw, 3.5rem);
	font-weight: 300;
	line-height: 1.15;
	color: $textPrimary;
	max-width: 760px;
}

.mood__quote em
{
	font-style: italic;
	background: linear-gradient(120deg, $roseGold 0%, $champagne 60%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.mood__sub
{
	font-size: 0.92rem;
	color: $textSecondary;
	line-height: 1.75;
	max-width: 400px;
}

.mood__counters
{
	display: flex;
	gap: 0;
	border: 1px solid $border;
	border-radius: 16px;
	overflow: hidden;
}

.mood__counter
{
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	padding: 20px 36px;
	position: relative;

	@include mq(0, $tablet)
	{
		padding: 16px 24px;
	}
}

.mood__counter + .mood__counter::before
{
	content: '';
	position: absolute;
	left: 0;
	top: 20%;
	bottom: 20%;
	width: 1px;
	background: linear-gradient(180deg, transparent, $border 50%, transparent);
}

.mood__counter-val
{
	font-family: $headingFont;
	font-size: 1.8rem;
	font-weight: 300;
	background: linear-gradient(120deg, $roseGold, $champagne);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	line-height: 1;
}

.mood__counter-label
{
	font-size: 0.72rem;
	color: $textMuted;
	letter-spacing: 0.08em;
	text-transform: uppercase;
}
</style>
