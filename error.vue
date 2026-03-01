<script setup>
const props = defineProps({ error: Object });

const handleError = () => clearError({ redirect: '/' });

const is404 = computed(() => props.error?.statusCode === 404);

onMounted(async () => {
	if (!import.meta.client) return;
	const { gsap } = await import('gsap');

	// Main entrance timeline
	const tl = gsap.timeline({ delay: 0.1 });

	tl.fromTo('.err__code',
		{ opacity: 0, scale: 0.7, y: 30 },
		{ opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'expo.out' }
	)
	.fromTo('.err__title',
		{ opacity: 0, y: 20 },
		{ opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
		'-=0.5'
	)
	.fromTo('.err__sub',
		{ opacity: 0, y: 16 },
		{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
		'-=0.4'
	)
	.fromTo('.err__actions',
		{ opacity: 0, y: 12 },
		{ opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
		'-=0.3'
	)
	.fromTo('.err__gems > *',
		{ opacity: 0, scale: 0 },
		{ opacity: 1, scale: 1, stagger: 0.08, duration: 0.5, ease: 'back.out(1.5)' },
		'-=0.2'
	);

	// Float orbits
	gsap.to('.err__orbit--1', {
		rotate: 360,
		duration: 30,
		repeat: -1,
		ease: 'none',
		transformOrigin: 'center center',
	});
	gsap.to('.err__orbit--2', {
		rotate: -360,
		duration: 20,
		repeat: -1,
		ease: 'none',
		transformOrigin: 'center center',
	});

	// Floating code number
	gsap.to('.err__code', {
		y: -12,
		duration: 3.5,
		repeat: -1,
		yoyo: true,
		ease: 'sine.inOut',
	});

	// Gems idle float
	gsap.utils.toArray('.err__gem').forEach((el, i) => {
		gsap.to(el, {
			y: `${-8 - i * 3}`,
			duration: 2.5 + i * 0.4,
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut',
			delay: i * 0.3,
		});
	});
});
</script>

<template>
	<div class="err-page">
		<!-- Cosmic bg -->
		<div class="err__stars" aria-hidden />
		<div class="err__nebula err__nebula--1" aria-hidden />
		<div class="err__nebula err__nebula--2" aria-hidden />
		<div class="err__nebula err__nebula--3" aria-hidden />

		<!-- Orbits -->
		<div class="err__orbit-wrap" aria-hidden>
			<div class="err__orbit err__orbit--1" />
			<div class="err__orbit err__orbit--2" />
			<!-- Orbit dot -->
			<div class="err__orbit-dot err__orbit-dot--1" />
			<div class="err__orbit-dot err__orbit-dot--2" />
		</div>

		<!-- Constellation -->
		<svg class="err__constellation err__constellation--tl" viewBox="0 0 200 160" fill="none" aria-hidden>
			<circle cx="20" cy="20" r="1.5" fill="rgba(196,129,139,0.5)"/>
			<circle cx="80" cy="45" r="2" fill="rgba(196,129,139,0.4)"/>
			<circle cx="140" cy="15" r="1.2" fill="rgba(255,255,255,0.28)"/>
			<circle cx="170" cy="60" r="1.8" fill="rgba(232,213,190,0.32)"/>
			<circle cx="50" cy="100" r="1" fill="rgba(255,255,255,0.20)"/>
			<circle cx="120" cy="120" r="1.3" fill="rgba(196,129,139,0.28)"/>
			<line x1="20" y1="20" x2="80" y2="45" stroke="rgba(196,129,139,0.15)" stroke-width="0.7"/>
			<line x1="80" y1="45" x2="140" y2="15" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
			<line x1="80" y1="45" x2="170" y2="60" stroke="rgba(196,129,139,0.12)" stroke-width="0.5"/>
			<line x1="50" y1="100" x2="120" y2="120" stroke="rgba(196,129,139,0.10)" stroke-width="0.5"/>
			<line x1="20" y1="20" x2="50" y2="100" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>
		</svg>

		<svg class="err__constellation err__constellation--br" viewBox="0 0 200 160" fill="none" aria-hidden>
			<circle cx="180" cy="140" r="1.5" fill="rgba(196,129,139,0.4)"/>
			<circle cx="120" cy="115" r="2" fill="rgba(196,129,139,0.35)"/>
			<circle cx="160" cy="80" r="1.2" fill="rgba(255,255,255,0.22)"/>
			<circle cx="80" cy="100" r="1.8" fill="rgba(232,213,190,0.28)"/>
			<circle cx="50" cy="140" r="1" fill="rgba(255,255,255,0.18)"/>
			<line x1="180" y1="140" x2="120" y2="115" stroke="rgba(196,129,139,0.13)" stroke-width="0.6"/>
			<line x1="120" y1="115" x2="160" y2="80" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>
			<line x1="120" y1="115" x2="80" y2="100" stroke="rgba(196,129,139,0.10)" stroke-width="0.5"/>
			<line x1="80" y1="100" x2="50" y2="140" stroke="rgba(232,213,190,0.08)" stroke-width="0.5"/>
		</svg>

		<!-- Floating gem decorations -->
		<div class="err__gems" aria-hidden>
			<svg class="err__gem err__gem--1" viewBox="0 0 24 24" fill="none">
				<path d="M12 2L2 8l10 14L22 8z" fill="rgba(196,129,139,0.15)" stroke="rgba(196,129,139,0.4)" stroke-width="0.8"/>
				<path d="M2 8h20M12 2l5 6M12 2l-5 6" stroke="rgba(196,129,139,0.25)" stroke-width="0.6"/>
			</svg>
			<svg class="err__gem err__gem--2" viewBox="0 0 20 20" fill="none">
				<path d="M10 1L1 6l9 13 9-13z" fill="rgba(232,213,190,0.12)" stroke="rgba(232,213,190,0.4)" stroke-width="0.8"/>
			</svg>
			<svg class="err__gem err__gem--3" viewBox="0 0 16 16" fill="none">
				<path d="M8 1L1 5l7 10 7-10z" fill="rgba(196,129,139,0.10)" stroke="rgba(196,129,139,0.35)" stroke-width="0.8"/>
			</svg>
			<svg class="err__gem err__gem--4" viewBox="0 0 12 12" fill="none">
				<path d="M6 1L1 4l5 7 5-7z" fill="rgba(232,213,190,0.08)" stroke="rgba(232,213,190,0.3)" stroke-width="0.8"/>
			</svg>
			<svg class="err__gem err__gem--5" viewBox="0 0 20 20" fill="none">
				<path d="M10 1L1 6l9 13 9-13z" fill="rgba(196,129,139,0.08)" stroke="rgba(196,129,139,0.28)" stroke-width="0.8"/>
			</svg>
		</div>

		<!-- Main content -->
		<div class="err__content">
			<!-- Big 404 -->
			<div class="err__code" aria-hidden>
				<span class="err__code-num">{{ error?.statusCode ?? 404 }}</span>
				<div class="err__code-glow" />
			</div>

			<!-- Icon -->
			<div class="err__icon" aria-hidden>
				<svg viewBox="0 0 48 48" fill="none">
					<!-- Star/diamond shape -->
					<path d="M24 4L28 20H44L31 29L36 45L24 36L12 45L17 29L4 20H20z"
						fill="none" stroke="url(#err-grad)" stroke-width="1.5" stroke-linejoin="round"/>
					<defs>
						<linearGradient id="err-grad" x1="4" y1="4" x2="44" y2="44">
							<stop offset="0%" stop-color="#c4818b"/>
							<stop offset="100%" stop-color="#e8d5be"/>
						</linearGradient>
					</defs>
				</svg>
			</div>

			<h1 class="err__title">
				<template v-if="is404">
					Страница<br>
					<em class="err__title-em">потерялась в космосе</em>
				</template>
				<template v-else>
					Что-то<br>
					<em class="err__title-em">пошло не так</em>
				</template>
			</h1>

			<p class="err__sub">
				<template v-if="is404">
					Кажется, вы забрели в неизведанную часть вселенной.<br>
					Но не беспокойтесь — красота ждёт вас на главной странице.
				</template>
				<template v-else>
					Произошла непредвиденная ошибка. Попробуйте обновить страницу<br>
					или вернитесь на главную.
				</template>
			</p>

			<div class="err__actions">
				<button class="err__btn err__btn--primary" @click="handleError">
					<span class="err__btn-shimmer" aria-hidden />
					<span>
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
							<path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
						На главную
					</span>
				</button>
				<a href="tel:+79627488383" class="err__btn err__btn--ghost">
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
						<path d="M2 2.5C2 2.5 3 5.5 5.5 8 8 10.5 11.5 12 11.5 12L12.5 10 10 8.5l-1 1c-.5-.3-1.5-1-2-1.5C6.5 7.5 5.8 6.5 5.5 6l1-1L5 2.5H2z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
					</svg>
					Позвонить нам
				</a>
			</div>

			<!-- Beauty message -->
			<div class="err__tagline">
				<span class="err__tagline-line" />
				<span class="err__tagline-text">Lev & Lani · Beauty Studio · Владикавказ</span>
				<span class="err__tagline-line" />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.err-page {
	min-height: 100vh;
	background: $bg;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
	padding: 40px 20px;
}

// ─── Stars ────────────────────────────────────────────────────
.err__stars {
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
			60px 30px 0 0 rgba(255,255,255,0.15),
			180px 60px 0 0 rgba(196,129,139,0.18),
			280px 20px 0 0 rgba(255,255,255,0.12),
			420px 70px 0 0 rgba(232,213,190,0.13),
			540px 35px 0 0 rgba(255,255,255,0.14),
			680px 15px 0 0 rgba(196,129,139,0.16),
			800px 55px 0 0 rgba(255,255,255,0.11),
			950px 40px 0 0 rgba(232,213,190,0.13),
			1080px 20px 0 0 rgba(255,255,255,0.10),
			1200px 60px 0 0 rgba(196,129,139,0.15),
			100px 200px 0 0 rgba(255,255,255,0.10),
			320px 250px 0 0 rgba(196,129,139,0.11),
			530px 220px 0 0 rgba(255,255,255,0.10),
			750px 270px 0 0 rgba(232,213,190,0.10),
			980px 240px 0 0 rgba(255,255,255,0.09),
			1150px 260px 0 0 rgba(196,129,139,0.11),
			200px 500px 0 0 rgba(255,255,255,0.08),
			460px 540px 0 0 rgba(196,129,139,0.09),
			700px 510px 0 0 rgba(232,213,190,0.08),
			920px 550px 0 0 rgba(255,255,255,0.08);
	}
}

// ─── Nebula ───────────────────────────────────────────────────
.err__nebula {
	position: absolute;
	border-radius: 50%;
	filter: blur(80px);
	pointer-events: none;
	z-index: 0;

	&--1 {
		width: 600px; height: 400px;
		background: radial-gradient(ellipse, rgba(196,129,139,0.10) 0%, transparent 70%);
		top: -100px; left: -100px;
	}

	&--2 {
		width: 500px; height: 300px;
		background: radial-gradient(ellipse, rgba(232,213,190,0.06) 0%, transparent 70%);
		bottom: -80px; right: -60px;
	}

	&--3 {
		width: 350px; height: 200px;
		background: radial-gradient(ellipse, rgba(196,129,139,0.07) 0%, transparent 70%);
		top: 50%; left: 50%;
		transform: translate(-50%, -50%);
	}
}

// ─── Constellations ───────────────────────────────────────────
.err__constellation {
	position: absolute;
	pointer-events: none;
	z-index: 0;
	opacity: 0.9;

	&--tl { top: 0; left: 0; width: 200px; height: 160px; }
	&--br { bottom: 0; right: 0; width: 200px; height: 160px; }
}

// ─── Orbit rings ──────────────────────────────────────────────
.err__orbit-wrap {
	position: absolute;
	top: 50%; left: 50%;
	transform: translate(-50%, -50%);
	pointer-events: none;
	z-index: 0;
}

.err__orbit {
	position: absolute;
	border-radius: 50%;
	border: 1px solid rgba(196,129,139,0.06);
	top: 50%; left: 50%;
	transform: translate(-50%, -50%);

	&--1 { width: 600px; height: 300px; }
	&--2 { width: 850px; height: 420px; border-color: rgba(232,213,190,0.04); }
}

.err__orbit-dot {
	position: absolute;
	border-radius: 50%;
	top: 50%; left: 50%;

	&--1 {
		width: 6px; height: 6px;
		background: $roseGold;
		box-shadow: 0 0 12px rgba(196,129,139,0.7);
		margin-top: -150px; // radius of orbit--1 / 2
		margin-left: -3px;
		animation: orbit-dot-1 30s linear infinite;
	}

	&--2 {
		width: 4px; height: 4px;
		background: $champagne;
		box-shadow: 0 0 8px rgba(232,213,190,0.6);
		margin-top: -210px;
		margin-left: -2px;
		animation: orbit-dot-2 20s linear infinite reverse;
	}
}

@keyframes orbit-dot-1 {
	from { transform: rotate(0deg) translateY(150px); }
	to   { transform: rotate(360deg) translateY(150px); }
}
@keyframes orbit-dot-2 {
	from { transform: rotate(0deg) translateY(210px); }
	to   { transform: rotate(360deg) translateY(210px); }
}

// ─── Floating gems ────────────────────────────────────────────
.err__gems {
	position: absolute;
	inset: 0;
	pointer-events: none;
	z-index: 0;
}

.err__gem {
	position: absolute;

	&--1 { width: 40px; top: 15%;  left: 8%;  }
	&--2 { width: 28px; top: 25%;  right: 10%; }
	&--3 { width: 22px; top: 65%;  left: 12%; }
	&--4 { width: 18px; top: 70%;  right: 8%;  }
	&--5 { width: 32px; bottom: 15%; left: 40%; }
}

// ─── Main content ─────────────────────────────────────────────
.err__content {
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	gap: 0;
	max-width: 600px;
}

// 404 huge number
.err__code {
	position: relative;
	margin-bottom: 8px;
}

.err__code-num {
	font-family: $headingFont;
	font-size: clamp(7rem, 20vw, 14rem);
	font-weight: 300;
	font-style: italic;
	color: transparent;
	-webkit-text-stroke: 1px rgba(196,129,139,0.25);
	letter-spacing: -0.02em;
	line-height: 0.9;
	display: block;
	background: linear-gradient(135deg, rgba(196,129,139,0.15), rgba(232,213,190,0.08));
	-webkit-background-clip: text;
	background-clip: text;
}

.err__code-glow {
	position: absolute;
	inset: -20px;
	background: radial-gradient(ellipse, rgba(196,129,139,0.08) 0%, transparent 65%);
	filter: blur(20px);
	z-index: -1;
}

// Star icon
.err__icon {
	width: 48px; height: 48px;
	margin-bottom: 24px;
	opacity: 0.8;
}

.err__title {
	font-family: $headingFont;
	font-size: clamp(1.6rem, 4vw, 2.8rem);
	font-weight: 300;
	line-height: 1.15;
	color: $textPrimary;
	margin: 0 0 20px;
}

.err__title-em {
	font-style: italic;
	background: linear-gradient(120deg, $roseGold 0%, $champagne 60%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.err__sub {
	font-size: 0.92rem;
	color: $textSecondary;
	line-height: 1.8;
	margin: 0 0 40px;
}

// ─── Actions ──────────────────────────────────────────────────
.err__actions {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 48px;
	flex-wrap: wrap;
	justify-content: center;
}

.err__btn {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	padding: 12px 28px;
	border-radius: 100px;
	font-size: 0.875rem;
	font-weight: 500;
	cursor: pointer;
	text-decoration: none;
	@include transition();
	position: relative;
	overflow: hidden;

	&--primary {
		background: linear-gradient(135deg, $roseGoldDark, $roseGold 50%, $roseGoldLight);
		color: $white;
		border: 1px solid transparent;
		box-shadow: 0 0 20px rgba(196,129,139,0.08), inset 0 1px 0 rgba(255,255,255,0.15);

		span:last-child {
			display: inline-flex;
			align-items: center;
			gap: 8px;
			position: relative;
			z-index: 1;
		}

		&:hover {
			box-shadow:
				0 0 28px rgba(196,129,139,0.55),
				0 0 60px rgba(196,129,139,0.18),
				0 4px 20px rgba(196,129,139,0.3),
				inset 0 1px 0 rgba(255,255,255,0.2);
			transform: translateY(-2px);

			.err__btn-shimmer { transform: translateX(250%) skewX(-15deg); }
		}

		&:active { transform: translateY(0); }
	}

	&--ghost {
		background: rgba(255,255,255,0.04);
		color: $textSecondary;
		border: 1px solid $border;

		&:hover {
			background: rgba(255,255,255,0.08);
			border-color: rgba(196,129,139,0.3);
			color: $roseGoldLight;
		}
	}
}

.err__btn-shimmer {
	position: absolute;
	top: 0; left: -60%;
	width: 50%; height: 100%;
	background: linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.25) 50%, transparent 80%);
	transform: translateX(-100%) skewX(-15deg);
	transition: transform 0.6s ease;
	pointer-events: none;
}

// ─── Tagline ──────────────────────────────────────────────────
.err__tagline {
	display: flex;
	align-items: center;
	gap: 16px;
}

.err__tagline-line {
	flex: 1;
	height: 1px;
	background: linear-gradient(90deg, transparent, $border);

	&:last-child { background: linear-gradient(90deg, $border, transparent); }
}

.err__tagline-text {
	font-size: 0.72rem;
	font-weight: 500;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: $textMuted;
	white-space: nowrap;
}
</style>
