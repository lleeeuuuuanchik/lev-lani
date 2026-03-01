<script setup>
const sectionRef = ref(null);

// Static star positions — safe for SSR (no random on client)
const stars = [
	{ x: 5,  y: 20, s: 3 },
	{ x: 12, y: 72, s: 5 },
	{ x: 22, y: 38, s: 3 },
	{ x: 38, y: 12, s: 4 },
	{ x: 52, y: 80, s: 3 },
	{ x: 63, y: 25, s: 5 },
	{ x: 74, y: 60, s: 3 },
	{ x: 85, y: 85, s: 4 },
	{ x: 92, y: 42, s: 3 },
	{ x: 47, y: 55, s: 4 },
];

onMounted(async () => {
	if (!import.meta.client) return;

	const [{ gsap }, { ScrollTrigger }] = await Promise.all([
		import('gsap'),
		import('gsap/ScrollTrigger'),
	]);
	gsap.registerPlugin(ScrollTrigger);

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: sectionRef.value,
			start: 'top 85%',
			once: true,
		},
	});

	// Decorative line draws from left
	tl.fromTo('.marq__line', { scaleX: 0 }, {
		scaleX: 1,
		duration: 0.9,
		ease: 'power3.inOut',
		transformOrigin: 'left center',
	});

	// Label fades up
	tl.fromTo('.marq__label', { opacity: 0, y: 12 }, {
		opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
	}, '-=0.5');

	// Words fly in left to right, staggered
	tl.fromTo('.marq__word', {
		x: -70,
		opacity: 0,
		skewX: -4,
	}, {
		x: 0,
		opacity: 1,
		skewX: 0,
		duration: 1.0,
		stagger: 0.2,
		ease: 'power3.out',
	}, '-=0.3');

	// Stars sparkle in
	tl.fromTo('.marq__star', {
		scale: 0,
		opacity: 0,
	}, {
		scale: 1,
		opacity: 1,
		duration: 0.5,
		stagger: { amount: 0.8, from: 'random' },
		ease: 'back.out(2)',
	}, '-=0.7');

	// Subtitle fades in
	tl.fromTo('.marq__sub', { opacity: 0, y: 8 }, {
		opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
	}, '-=0.3');
});
</script>

<template>
	<section ref="sectionRef" class="marq">
		<!-- Cosmic stars -->
		<div class="marq__stars" aria-hidden>
			<span
				v-for="(star, i) in stars"
				:key="i"
				class="marq__star"
				:style="{ left: star.x + '%', top: star.y + '%', width: star.s + 'px', height: star.s + 'px' }"
			/>
		</div>

		<div class="container marq__inner">
			<!-- Decorative line -->
			<div class="marq__line" />

			<!-- Label -->
			<div class="marq__label">· BEAUTY &amp; LIFESTYLE STUDIO · ВЛАДИКАВКАЗ · С 2015 ·</div>

			<!-- Main heading -->
			<div class="marq__text">
				<span class="marq__word">Lev</span>
				<span class="marq__word marq__word--amp">&amp;</span>
				<span class="marq__word">Lani</span>
			</div>

			<!-- Subtitle -->
			<p class="marq__sub">Пространство, где рождается красота</p>
		</div>
	</section>
</template>

<style lang="scss">
.marq {
	position: relative;
	padding: 80px 0 88px;
	overflow: hidden;
	border-top: 1px solid $border;
	border-bottom: 1px solid $border;
	background: $bg;
}

.marq__stars {
	position: absolute;
	inset: 0;
	pointer-events: none;
	z-index: 0;
}

.marq__star {
	position: absolute;
	border-radius: 50%;
	background: $roseGold;
	opacity: 0; // GSAP animates to 1
	box-shadow: 0 0 8px rgba(196, 129, 139, 0.8), 0 0 20px rgba(196, 129, 139, 0.25);

	&::before,
	&::after {
		content: '';
		position: absolute;
		background: $roseGold;
		opacity: 0.35;
		border-radius: 1px;
	}

	// Vertical ray
	&::before {
		width: 1px;
		height: 200%;
		top: -50%;
		left: 50%;
		transform: translateX(-50%);
	}

	// Horizontal ray
	&::after {
		height: 1px;
		width: 200%;
		left: -50%;
		top: 50%;
		transform: translateY(-50%);
	}
}

.marq__inner {
	position: relative;
	z-index: 1;
}

.marq__line {
	width: 100%;
	height: 1px;
	background: linear-gradient(90deg, $roseGold 0%, $champagne 40%, rgba(232, 213, 190, 0.2) 80%, transparent 100%);
	margin-bottom: 20px;
	transform-origin: left center;
}

.marq__label {
	font-size: 0.68rem;
	letter-spacing: 0.22em;
	color: $textMuted;
	text-transform: uppercase;
	margin-bottom: 12px;
	opacity: 0; // GSAP animates
}

.marq__text {
	display: flex;
	align-items: baseline;
	line-height: 1;
	overflow: visible;
}

.marq__word {
	font-family: $headingFont;
	font-size: clamp(5rem, 13vw, 10rem);
	font-weight: 300;
	font-style: italic;
	background: linear-gradient(130deg, $textPrimary 0%, $champagne 55%, $roseGold 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	opacity: 0; // GSAP animates
	display: inline-block;
	margin-right: 0.12em;

	&--amp {
		font-size: clamp(3rem, 8vw, 6rem);
		background: none;
		-webkit-background-clip: initial;
		-webkit-text-fill-color: rgba(196, 129, 139, 0.55);
		margin: 0 0.18em;
		font-style: normal;
	}
}

.marq__sub {
	font-size: 0.9rem;
	color: $textMuted;
	letter-spacing: 0.06em;
	margin: 16px 0 0;
	font-style: italic;
	opacity: 0; // GSAP animates
}
</style>
