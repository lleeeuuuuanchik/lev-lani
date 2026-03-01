<script setup>
/**
 * Hero: полноэкран, GSAP-слова, 3D-параллакс сцены по мыши, бегущая строка, частицы (SSR-safe).
 */

// variables
const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
const tickerItems = ['Стрижка', 'Окрашивание', 'Укладка', 'Маникюр', 'Брови', 'Уход за лицом', 'Lev & Lani'];
const particleAngles = Array.from({ length: 10 }, (_, i) => i * 36);
const heroRef = ref(null);
const sceneRef = ref(null);
let gsap$ = null;

// functions
const onMouseMove = (e) =>
{
	if (!sceneRef.value || !heroRef.value || !gsap$) return;
	const rect = heroRef.value.getBoundingClientRect();
	const cx = rect.left + rect.width * 0.73;
	const cy = rect.top + rect.height / 2;
	const rx = ((e.clientY - cy) / (rect.height / 2)) * -14;
	const ry = ((e.clientX - cx) / (rect.width / 2)) * 12;
	gsap$.to(sceneRef.value, { rotateX: rx, rotateY: ry, duration: 1.6, ease: 'power2.out' });
};

const onMouseLeave = () =>
{
	gsap$?.to(sceneRef.value, { rotateX: 0, rotateY: 0, duration: 2.5, ease: 'elastic.out(1, 0.5)' });
};

onMounted(async () =>
{
	if (!import.meta.client) return;
	const { gsap } = await import('gsap');
	gsap$ = gsap;

	gsap.fromTo('.hero__brand-word',
		{ opacity: 0, y: 60, skewX: -6 },
		{ opacity: 1, y: 0, skewX: 0, duration: 1.1, ease: 'expo.out', stagger: 0.15, delay: 0.15 }
	);

	gsap.fromTo(['.hero__meta', '.hero__desc', '.hero__cta', '.hero__contacts'],
		{ opacity: 0, y: 22 },
		{ opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.13, delay: 0.85 }
	);

	gsap.fromTo(sceneRef.value,
		{ scale: 0.65, opacity: 0, rotateY: 35, rotateX: -15, z: -200 },
		{ scale: 1, opacity: 1, rotateY: 0, rotateX: 0, z: 0, duration: 2, ease: 'expo.out', delay: 0.4 }
	);

	gsap.fromTo('.hero__pill',
		{ opacity: 0 },
		{ opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.18, delay: 1.4 }
	);

	gsap.fromTo('.hero__chip',
		{ opacity: 0 },
		{ opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.2, delay: 1.6 }
	);

	heroRef.value?.addEventListener('mousemove', onMouseMove);
	heroRef.value?.addEventListener('mouseleave', onMouseLeave);
});

onUnmounted(() =>
{
	heroRef.value?.removeEventListener('mousemove', onMouseMove);
	heroRef.value?.removeEventListener('mouseleave', onMouseLeave);
});
</script>

<template>
	<section class="hero" ref="heroRef">
		<div class="hero__bg-orb hero__bg-orb--1" />
		<div class="hero__bg-orb hero__bg-orb--2" />
		<div class="hero__bg-grid" />

		<div class="container hero__wrap">

			<!-- ─── Left ─── -->
			<div class="hero__left">
				<div class="hero__meta">
					<span class="hero__meta-badge">
						<span class="hero__meta-dot" />
						Владикавказ
					</span>
					<span class="hero__meta-sep">·</span>
					<span class="hero__meta-text">Авторский салон красоты</span>
					<span class="hero__meta-sep">·</span>
					<span class="hero__meta-text">с 2015 года</span>
				</div>

				<div class="hero__brand" aria-label="Lev &amp; Lani">
					<span class="hero__brand-word hero__brand-word--lev">Lev</span>
					<span class="hero__brand-word hero__brand-word--amp">&amp;</span>
					<span class="hero__brand-word hero__brand-word--lani">Lani</span>
				</div>

				<p class="hero__desc">
					Студия, где искусство встречает красоту.<br>
					Стрижки, окрашивание, маникюр, уход за лицом —<br>
					всё создано для вашего образа.
				</p>

				<div class="hero__cta">
					<UiButton size="lg" @click="scrollTo('#contact')">Записаться онлайн</UiButton>
					<button class="hero__link-btn" @click="scrollTo('#services')">
						<span>Услуги и цены</span>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
				</div>

				<div class="hero__contacts">
					<a href="tel:+79627488383" class="hero__contact-link hero__contact-link--phone">
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
							<path d="M2.5 2h2.7l1 2.5-1.5 1.5a8.5 8.5 0 003.3 3.3L9.5 7.8l2.5 1v2.7A1 1 0 0111 12.5C4.1 12.5 1.5 5.9 1.5 3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
						</svg>
						+7 (962) 748-83-83
					</a>
					<span class="hero__contact-sep" />
					<a href="https://www.instagram.com/lev_lani_/" target="_blank" rel="noopener noreferrer" class="hero__contact-link">
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
							<rect x="1.5" y="1.5" width="11" height="11" rx="3" stroke="currentColor" stroke-width="1.2"/>
							<circle cx="7" cy="7" r="2.5" stroke="currentColor" stroke-width="1.2"/>
							<circle cx="10.5" cy="3.5" r="0.5" fill="currentColor"/>
						</svg>
						Instagram
					</a>
					<span class="hero__contact-sep" />
					<a href="https://t.me/teoamor" target="_blank" rel="noopener noreferrer" class="hero__contact-link">
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
							<path d="M1.5 7l10-5-4 10-2-4-4-1z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
						</svg>
						Telegram
					</a>
				</div>
			</div>

			<!-- ─── Right: Cosmic planet ─── -->
			<div class="hero__right">
				<div class="hero__scene">
					<!-- Star field -->
					<div class="hero__stars" aria-hidden />

					<!-- Nebula -->
					<div class="hero__nebula hero__nebula--1" aria-hidden />
					<div class="hero__nebula hero__nebula--2" aria-hidden />

					<!-- 3D planet container -->
					<div class="hero__scene-3d" ref="sceneRef">
						<div class="hero__orbit-wrap hero__orbit-wrap--1">
							<div class="hero__orbit-ring">
								<div class="hero__orbit-dot" />
							</div>
						</div>
						<div class="hero__orbit-wrap hero__orbit-wrap--2">
							<div class="hero__orbit-ring hero__orbit-ring--2">
								<div class="hero__orbit-dot hero__orbit-dot--warm" />
							</div>
						</div>
						<div class="hero__orbit-wrap hero__orbit-wrap--3">
							<div class="hero__orbit-ring hero__orbit-ring--3">
								<div class="hero__orbit-dot hero__orbit-dot--small" />
								<div class="hero__orbit-dot hero__orbit-dot--small hero__orbit-dot--opp" />
							</div>
						</div>

						<!-- The planet sphere -->
						<div class="hero__sphere">
							<div class="hero__sphere-hl" />
							<div class="hero__sphere-hl hero__sphere-hl--2" />
						</div>

						<!-- Particle ring -->
						<div class="hero__particle-ring">
							<div
								v-for="a in particleAngles"
								:key="a"
								class="hero__particle-dot"
								:style="`--a: ${a}deg`"
							/>
						</div>
					</div>

					<!-- Floating service pills -->
					<div class="hero__pill hero__pill--top"><span class="hero__pill-dot" />Стрижка & Укладка</div>
					<div class="hero__pill hero__pill--right"><span class="hero__pill-dot" />Маникюр</div>
					<div class="hero__pill hero__pill--bottom"><span class="hero__pill-dot" />Брови и ресницы</div>
					<div class="hero__pill hero__pill--left"><span class="hero__pill-dot" />Уход за лицом</div>

					<!-- Info chips -->
					<div class="hero__chip hero__chip--exp">
						<span class="hero__chip-val">10+</span>
						<span class="hero__chip-lbl">лет опыта</span>
					</div>
					<div class="hero__chip hero__chip--clients">
						<span class="hero__chip-val">3 000+</span>
						<span class="hero__chip-lbl">клиентов</span>
					</div>
					<div class="hero__chip hero__chip--founder">
						<div class="hero__chip-avatar">
							<ClientOnly>
								<img src="/images/founder.jpg" alt="Меладзе Тея" class="hero__chip-avatar-img" />
							</ClientOnly>
						</div>
						<div class="hero__chip-info">
							<span class="hero__chip-name">Меладзе Тея</span>
							<span class="hero__chip-role">Основатель · Art Director</span>
						</div>
					</div>
				</div>
			</div>

		</div>

		<!-- Ticker -->
		<div class="hero__ticker">
			<div class="hero__ticker-track">
				<span
					v-for="(item, i) in [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems]"
					:key="i"
					class="hero__ticker-item"
				>
					{{ item }}
					<svg width="4" height="4" viewBox="0 0 4 4"><circle cx="2" cy="2" r="2" fill="currentColor"/></svg>
				</span>
			</div>
		</div>

		<div class="hero__bottom-fade" />
	</section>
</template>

<style lang="scss">
// ─── Цвета планеты — меняются при смене темы ─────────────────
:root, [data-theme="rose"] {
	--sphere-a:    rgba(215, 160, 170, 0.95);
	--sphere-b:    rgba(168,  90, 108, 0.90);
	--sphere-c:    rgba( 65,  12,  28, 0.95);
	--glow-45:     rgba(196, 129, 139, 0.45);
	--glow-60:     rgba(196, 129, 139, 0.60);
	--glow-18:     rgba(196, 129, 139, 0.18);
	--glow-07:     rgba(196, 129, 139, 0.07);
	--orbit-1:     rgba(196, 129, 139, 0.30);
	--orbit-2:     rgba(232, 213, 190, 0.18);
	--orbit-3:     rgba(196, 129, 139, 0.14);
	--dot-rgb:     rgba(196, 129, 139, 1);
}
[data-theme="violet"] {
	--sphere-a:    rgba(180, 148, 224, 0.95);
	--sphere-b:    rgba(122,  84, 168, 0.90);
	--sphere-c:    rgba( 30,  10,  50, 0.95);
	--glow-45:     rgba(155, 114, 207, 0.45);
	--glow-60:     rgba(155, 114, 207, 0.60);
	--glow-18:     rgba(155, 114, 207, 0.18);
	--glow-07:     rgba(155, 114, 207, 0.07);
	--orbit-1:     rgba(155, 114, 207, 0.30);
	--orbit-2:     rgba(216, 200, 240, 0.18);
	--orbit-3:     rgba(155, 114, 207, 0.14);
	--dot-rgb:     rgba(155, 114, 207, 1);
}
[data-theme="sage"] {
	--sphere-a:    rgba(150, 192, 166, 0.95);
	--sphere-b:    rgba( 92, 136, 110, 0.90);
	--sphere-c:    rgba( 10,  30,  18, 0.95);
	--glow-45:     rgba(122, 170, 138, 0.45);
	--glow-60:     rgba(122, 170, 138, 0.60);
	--glow-18:     rgba(122, 170, 138, 0.18);
	--glow-07:     rgba(122, 170, 138, 0.07);
	--orbit-1:     rgba(122, 170, 138, 0.30);
	--orbit-2:     rgba(200, 232, 213, 0.18);
	--orbit-3:     rgba(122, 170, 138, 0.14);
	--dot-rgb:     rgba(122, 170, 138, 1);
}
[data-theme="ocean"] {
	--sphere-a:    rgba(120, 168, 224, 0.95);
	--sphere-b:    rgba( 60, 107, 168, 0.90);
	--sphere-c:    rgba(  6,  16,  36, 0.95);
	--glow-45:     rgba( 91, 140, 200, 0.45);
	--glow-60:     rgba( 91, 140, 200, 0.60);
	--glow-18:     rgba( 91, 140, 200, 0.18);
	--glow-07:     rgba( 91, 140, 200, 0.07);
	--orbit-1:     rgba( 91, 140, 200, 0.30);
	--orbit-2:     rgba(184, 212, 240, 0.18);
	--orbit-3:     rgba( 91, 140, 200, 0.14);
	--dot-rgb:     rgba( 91, 140, 200, 1);
}
[data-theme="gold"] {
	--sphere-a:    rgba(221, 184,  74, 0.95);
	--sphere-b:    rgba(160, 120,  24, 0.90);
	--sphere-c:    rgba( 40,  24,   4, 0.95);
	--glow-45:     rgba(201, 160,  48, 0.45);
	--glow-60:     rgba(201, 160,  48, 0.60);
	--glow-18:     rgba(201, 160,  48, 0.18);
	--glow-07:     rgba(201, 160,  48, 0.07);
	--orbit-1:     rgba(201, 160,  48, 0.30);
	--orbit-2:     rgba(240, 224, 160, 0.18);
	--orbit-3:     rgba(201, 160,  48, 0.14);
	--dot-rgb:     rgba(201, 160,  48, 1);
}
[data-theme="cherry"] {
	--sphere-a:    rgba(220, 120, 140, 0.95);
	--sphere-b:    rgba(160,  48,  72, 0.90);
	--sphere-c:    rgba( 50,   8,  18, 0.95);
	--glow-45:     rgba(181,  68,  90, 0.45);
	--glow-60:     rgba(181,  68,  90, 0.60);
	--glow-18:     rgba(181,  68,  90, 0.18);
	--glow-07:     rgba(181,  68,  90, 0.07);
	--orbit-1:     rgba(181,  68,  90, 0.30);
	--orbit-2:     rgba(240, 208, 216, 0.18);
	--orbit-3:     rgba(181,  68,  90, 0.14);
	--dot-rgb:     rgba(181,  68,  90, 1);
}
[data-theme="midnight"] {
	--sphere-a:    rgba(140, 152, 220, 0.95);
	--sphere-b:    rgba( 80,  94, 170, 0.90);
	--sphere-c:    rgba( 10,  12,  40, 0.95);
	--glow-45:     rgba(110, 124, 200, 0.45);
	--glow-60:     rgba(110, 124, 200, 0.60);
	--glow-18:     rgba(110, 124, 200, 0.18);
	--glow-07:     rgba(110, 124, 200, 0.07);
	--orbit-1:     rgba(110, 124, 200, 0.30);
	--orbit-2:     rgba(192, 200, 240, 0.18);
	--orbit-3:     rgba(110, 124, 200, 0.14);
	--dot-rgb:     rgba(110, 124, 200, 1);
}
[data-theme="copper"] {
	--sphere-a:    rgba(210, 150, 100, 0.95);
	--sphere-b:    rgba(150,  90,  40, 0.90);
	--sphere-c:    rgba( 40,  18,   4, 0.95);
	--glow-45:     rgba(184, 112,  64, 0.45);
	--glow-60:     rgba(184, 112,  64, 0.60);
	--glow-18:     rgba(184, 112,  64, 0.18);
	--glow-07:     rgba(184, 112,  64, 0.07);
	--orbit-1:     rgba(184, 112,  64, 0.30);
	--orbit-2:     rgba(240, 208, 160, 0.18);
	--orbit-3:     rgba(184, 112,  64, 0.14);
	--dot-rgb:     rgba(184, 112,  64, 1);
}
[data-theme="arctic"] {
	--sphere-a:    rgba(120, 210, 200, 0.95);
	--sphere-b:    rgba( 60, 152, 144, 0.90);
	--sphere-c:    rgba(  4,  30,  28, 0.95);
	--glow-45:     rgba( 91, 186, 176, 0.45);
	--glow-60:     rgba( 91, 186, 176, 0.60);
	--glow-18:     rgba( 91, 186, 176, 0.18);
	--glow-07:     rgba( 91, 186, 176, 0.07);
	--orbit-1:     rgba( 91, 186, 176, 0.30);
	--orbit-2:     rgba(184, 236, 234, 0.18);
	--orbit-3:     rgba( 91, 186, 176, 0.14);
	--dot-rgb:     rgba( 91, 186, 176, 1);
}

.hero {
	position: relative;
	min-height: 100vh;
	overflow: hidden;
	background: $bg;
	display: flex;
	flex-direction: column;
}

// Background
.hero__bg-orb {
	position: absolute;
	border-radius: 50%;
	filter: blur(90px);
	pointer-events: none;

	&--1 { width: 800px; height: 800px; background: radial-gradient(circle, rgba(196,129,139,0.10) 0%, transparent 65%); top: -20%; right: -15%; }
	&--2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(100,60,140,0.07) 0%, transparent 65%); bottom: 10%; left: -5%; }
}

.hero__bg-grid {
	position: absolute; inset: 0;
	background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
	background-size: 36px 36px;
	mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%);
	pointer-events: none;
}

// Layout
.hero__wrap {
	flex: 1;
	display: grid;
	grid-template-columns: 1.05fr 0.95fr;
	gap: 48px;
	align-items: center;
	padding-top: 130px;
	padding-bottom: 80px;
	position: relative;
	z-index: 2;

	@include mq(0, $laptop) { grid-template-columns: 1fr; padding-top: 110px; padding-bottom: 60px; }
}

// ─── Left ──────────────────────────────────
.hero__left { display: flex; flex-direction: column; gap: 28px; }

.hero__meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; opacity: 0; }

.hero__meta-badge {
	display: flex; align-items: center; gap: 7px;
	padding: 5px 12px 5px 8px;
	background: rgba(196,129,139,0.08);
	border: 1px solid rgba(196,129,139,0.22);
	border-radius: 100px;
	font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
	color: $roseGoldLight;
}

.hero__meta-dot {
	width: 5px; height: 5px; border-radius: 50%;
	background: $roseGold; box-shadow: 0 0 8px rgba(196,129,139,0.8);
	animation: meta-pulse 2.5s ease-in-out infinite; flex-shrink: 0;
}

@keyframes meta-pulse {
	0%, 100% { box-shadow: 0 0 6px rgba(196,129,139,0.6); opacity: 1; }
	50% { box-shadow: 0 0 18px rgba(196,129,139,1); opacity: 0.8; }
}

.hero__meta-sep { font-size: 0.7rem; color: $textMuted; }
.hero__meta-text { font-size: 0.72rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: $textMuted; }

// Brand
.hero__brand { display: flex; flex-direction: column; gap: 0; line-height: 0.88; }

.hero__brand-word {
	display: block;
	font-family: $headingFont; font-style: italic; font-weight: 300;
	font-size: clamp(5rem, 11vw, 9rem); letter-spacing: -0.03em;
	opacity: 0; color: $textPrimary;

	&--lev { padding-left: 0; }
	&--amp {
		font-size: clamp(2.5rem, 5.5vw, 4.5rem); padding-left: clamp(2.5rem, 5vw, 4.5rem);
		background: linear-gradient(110deg, $roseGold 0%, $champagne 60%, $roseGoldLight 100%);
		-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
		line-height: 1.2; font-style: normal; font-weight: 200; letter-spacing: 0.05em;
	}
	&--lani {
		padding-left: clamp(3.5rem, 7vw, 6.5rem);
		background: linear-gradient(110deg, $champagne 0%, $roseGoldLight 50%, $champagne 100%);
		-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
	}
}

.hero__desc { font-size: clamp(0.85rem, 1.3vw, 0.96rem); color: $textSecondary; line-height: 1.85; opacity: 0; max-width: 460px; }
.hero__cta { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; opacity: 0; }

.hero__link-btn {
	display: inline-flex; align-items: center; gap: 8px;
	font-size: 0.88rem; font-weight: 500; color: $textSecondary;
	background: none; border: none; cursor: pointer; padding: 0;
	@include transition();
	svg { @include transition(); }
	&:hover { color: $champagne; svg { transform: translateX(5px); } }
}

.hero__contacts { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; opacity: 0; }

.hero__contact-link {
	display: flex; align-items: center; gap: 6px;
	font-size: 0.78rem; font-weight: 500; letter-spacing: 0.04em;
	color: $textMuted; text-decoration: none;
	@include transition();
	svg { flex-shrink: 0; opacity: 0.6; @include transition(); }
	&:hover { color: $roseGoldLight; svg { opacity: 1; } }
	&--phone { color: $champagneMuted; font-feature-settings: 'tnum'; letter-spacing: 0.06em; }
}

.hero__contact-sep { width: 3px; height: 3px; border-radius: 50%; background: $border; flex-shrink: 0; }

// ─── Right: planet ─────────────────────────
.hero__right {
	display: flex; align-items: center; justify-content: center;
	@include mq(0, $laptop) { display: none; }
}

.hero__scene { position: relative; width: 440px; height: 440px; perspective: 900px; flex-shrink: 0; }

// Stars
.hero__stars {
	position: absolute; inset: 0; pointer-events: none; z-index: 0;
	&::before {
		content: ''; position: absolute; width: 1px; height: 1px;
		background: transparent; border-radius: 50%;
		box-shadow:
			22px 38px 0 0 rgba(255,255,255,0.25), 68px 110px 0 0 rgba(255,255,255,0.18),
			114px 22px 0 0 rgba(196,129,139,0.30), 172px 76px 0 0 rgba(255,255,255,0.20),
			231px 44px 0 0 rgba(255,255,255,0.22), 288px 128px 0 0 rgba(196,129,139,0.28),
			342px 58px 0 0 rgba(255,255,255,0.16), 398px 94px 0 0 rgba(255,255,255,0.24),
			428px 32px 0 0 rgba(196,129,139,0.20), 36px 172px 0 0 rgba(255,255,255,0.18),
			88px 224px 0 0 rgba(255,255,255,0.14), 148px 192px 0 0 rgba(196,129,139,0.22),
			205px 268px 0 0 rgba(255,255,255,0.18), 261px 204px 0 0 rgba(255,255,255,0.20),
			317px 246px 0 0 rgba(196,129,139,0.16), 372px 184px 0 0 rgba(255,255,255,0.24),
			418px 238px 0 0 rgba(255,255,255,0.18), 54px 318px 0 0 rgba(196,129,139,0.22),
			118px 374px 0 0 rgba(255,255,255,0.16), 178px 342px 0 0 rgba(255,255,255,0.20),
			234px 408px 0 0 rgba(196,129,139,0.18), 294px 358px 0 0 rgba(255,255,255,0.14),
			358px 396px 0 0 rgba(255,255,255,0.22), 412px 322px 0 0 rgba(196,129,139,0.26),
			432px 418px 0 0 rgba(255,255,255,0.16);
	}
}

// Nebula
.hero__nebula {
	position: absolute; border-radius: 50%; pointer-events: none;
	&--1 { width: 220px; height: 130px; background: rgba(196,129,139,0.12); filter: blur(50px); top: 15%; left: 8%; z-index: 1; animation: nebula-drift 8s ease-in-out infinite; }
	&--2 { width: 180px; height: 110px; background: rgba(100,60,160,0.08); filter: blur(45px); bottom: 12%; right: 5%; z-index: 1; animation: nebula-drift 10s ease-in-out infinite reverse; }
}

@keyframes nebula-drift {
	0%, 100% { transform: translate(0, 0); }
	50%      { transform: translate(12px, -16px); }
}

// 3D scene
.hero__scene-3d {
	position: absolute; inset: 0; transform-style: preserve-3d;
	display: flex; align-items: center; justify-content: center;
	opacity: 0;
}

// Orbit wrappers
.hero__orbit-wrap {
	position: absolute; transform-style: preserve-3d;
	display: flex; align-items: center; justify-content: center;
	&--1 { width: 240px; height: 240px; transform: rotateX(72deg) rotateZ(10deg); }
	&--2 { width: 330px; height: 330px; transform: rotateX(68deg) rotateZ(-50deg); }
	&--3 { width: 418px; height: 418px; transform: rotateX(58deg) rotateZ(70deg); }
}

// Orbit rings
.hero__orbit-ring {
	position: absolute; inset: 0; border-radius: 50%;
	border: 1px solid var(--orbit-1);
	animation: ring-spin 13s linear infinite;
	&--2 { border-color: var(--orbit-2); animation-duration: 22s; animation-direction: reverse; }
	&--3 { border-color: var(--orbit-3); animation-duration: 36s; }
}

@keyframes ring-spin { to { transform: rotate(360deg); } }

// Orbit dots
.hero__orbit-dot {
	position: absolute; top: 50%; left: -5px; transform: translateY(-50%);
	width: 9px; height: 9px; border-radius: 50%;
	background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), var(--dot-rgb));
	box-shadow: 0 0 14px var(--glow-45), 0 0 28px var(--glow-18);
	&--warm { background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.8), $champagne); box-shadow: 0 0 12px var(--glow-60), 0 0 24px var(--glow-18); }
	&--small { width: 6px; height: 6px; left: -3px; box-shadow: 0 0 8px var(--glow-45); }
	&--opp { top: auto; bottom: 50%; transform: translateY(50%); }
}

// Sphere
.hero__sphere {
	position: absolute; width: 148px; height: 148px; border-radius: 50%;
	background:
		radial-gradient(circle at 32% 28%, rgba(255,255,255,0.10) 0%, transparent 22%),
		radial-gradient(circle at 35% 38%, var(--sphere-a) 0%, var(--sphere-b) 32%, var(--sphere-c) 65%, rgba(12,2,6,1) 100%);
	box-shadow:
		inset -22px -18px 44px rgba(0,0,0,0.65), inset 6px 6px 16px rgba(255,255,255,0.05),
		0 0 60px var(--glow-45), 0 0 140px var(--glow-18), 0 0 280px var(--glow-07);
	z-index: 2;
	transition: background 0.6s ease, box-shadow 0.6s ease;
	animation: sphere-breathe 4s ease-in-out infinite;
}

@keyframes sphere-breathe {
	0%, 100% { box-shadow: inset -22px -18px 44px rgba(0,0,0,0.65), inset 6px 6px 16px rgba(255,255,255,0.05), 0 0 60px var(--glow-45), 0 0 140px var(--glow-18), 0 0 280px var(--glow-07); }
	50%       { box-shadow: inset -22px -18px 44px rgba(0,0,0,0.65), inset 6px 6px 16px rgba(255,255,255,0.05), 0 0 80px var(--glow-60), 0 0 180px var(--glow-45), 0 0 340px var(--glow-18); }
}

.hero__sphere-hl {
	position: absolute; width: 44px; height: 24px; border-radius: 50%;
	background: rgba(255,255,255,0.16); top: 18%; left: 20%; filter: blur(7px); transform: rotate(-30deg);
	&--2 { width: 14px; height: 10px; top: 28%; left: 32%; background: rgba(255,255,255,0.28); filter: blur(3px); }
}

// Particle ring
.hero__particle-ring { position: absolute; width: 360px; height: 360px; animation: ring-spin 55s linear infinite; transform: rotateX(18deg); }

.hero__particle-dot {
	position: absolute; top: 50%; left: 50%; width: 2px; height: 2px; border-radius: 50%;
	background: rgba(255,255,255,0.55); transform: translate(-50%, -50%) rotate(var(--a)) translateX(180px);
	box-shadow: 0 0 4px rgba(255,255,255,0.4);
}

// Pills — orbit around the planet (all start at center, rotate outward)
// Delays derived from starting angle: delay = -(angle/360) * 28s
// top=270° → -21s | right=0° → 0s | bottom=90° → -7s | left=180° → -14s
.hero__pill {
	position: absolute; display: flex; align-items: center; gap: 7px;
	top: 50%; left: 50%;
	padding: 8px 14px; background: rgba(8,10,12,0.7); border: 1px solid rgba(255,255,255,0.10);
	border-radius: 100px; font-size: 0.75rem; font-weight: 500; color: $textSecondary;
	white-space: nowrap; backdrop-filter: blur(16px); z-index: 5; opacity: 0;

	&--top    { animation: orbit-pill 28s linear -21s  infinite; }
	&--right  { animation: orbit-pill 28s linear  0s   infinite; }
	&--bottom { animation: orbit-pill 28s linear -7s   infinite; }
	&--left   { animation: orbit-pill 28s linear -14s  infinite; }
}

@keyframes orbit-pill {
	from { transform: translate(-50%, -50%) rotate(0deg)   translateX(210px) rotate(0deg); }
	to   { transform: translate(-50%, -50%) rotate(360deg) translateX(210px) rotate(-360deg); }
}

.hero__pill-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 6px rgba(var(--accent-rgb), 0.8); flex-shrink: 0; }

// ─── Info chips — orbit closer to planet than pills (r=178px, period=36s)
// top-right=315° → -31.5s | bot-left=135° → -13.5s | bot-right=45° → -4.5s
.hero__chip {
	position: absolute; z-index: 6; opacity: 0;
	top: 50%; left: 50%;
	backdrop-filter: blur(16px);
}

.hero__chip--exp {
	display: flex; flex-direction: column; align-items: center; gap: 1px;
	padding: 10px 16px; background: rgba(8,10,12,0.78);
	border: 1px solid rgba(var(--champagne-rgb), 0.18); border-radius: 12px;
	box-shadow: 0 8px 28px rgba(0,0,0,0.4);
	animation: orbit-chip 36s linear -31.5s infinite;
}

.hero__chip--clients {
	display: flex; flex-direction: column; align-items: center; gap: 1px;
	padding: 10px 16px; background: rgba(8,10,12,0.78);
	border: 1px solid rgba(var(--accent-rgb), 0.18); border-radius: 12px;
	box-shadow: 0 8px 28px rgba(0,0,0,0.4);
	animation: orbit-chip 36s linear -13.5s infinite;
}

.hero__chip--founder {
	display: flex; align-items: center; gap: 10px;
	padding: 10px 16px; background: rgba(8,10,12,0.82);
	border: 1px solid rgba(var(--accent-rgb), 0.25); border-radius: 14px;
	white-space: nowrap;
	box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 20px var(--accent-glow);
	animation: orbit-chip 36s linear -4.5s infinite;
}

@keyframes orbit-chip {
	from { transform: translate(-50%, -50%) rotate(0deg)   translateX(178px) rotate(0deg); }
	to   { transform: translate(-50%, -50%) rotate(360deg) translateX(178px) rotate(-360deg); }
}

.hero__chip-val {
	font-family: $headingFont; font-size: 1.3rem; font-weight: 300; line-height: 1;
	background: linear-gradient(120deg, var(--accent), var(--champagne));
	-webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.hero__chip-lbl { font-size: 0.65rem; color: $textMuted; letter-spacing: 0.05em; text-align: center; white-space: nowrap; }

.hero__chip-avatar {
	width: 34px; height: 34px; border-radius: 50%;
	background: linear-gradient(135deg, var(--accent-dark), var(--accent));
	display: flex; align-items: center; justify-content: center;
	font-family: $headingFont; font-size: 1rem; font-style: italic;
	color: $white; flex-shrink: 0; box-shadow: 0 0 14px rgba(var(--accent-rgb), 0.5);
	overflow: hidden; position: relative;
}

.hero__chip-avatar-img {
	position: absolute; inset: 0;
	width: 100%; height: 100%;
	object-fit: cover; border-radius: 50%;
}

.hero__chip-avatar-fallback {
	position: relative; z-index: 1;
}

.hero__chip-info { display: flex; flex-direction: column; gap: 1px; }
.hero__chip-name { font-size: 0.82rem; font-weight: 600; color: $textPrimary; letter-spacing: 0.02em; }
.hero__chip-role { font-size: 0.68rem; color: $textMuted; letter-spacing: 0.05em; }

// ─── Ticker ────────────────────────────────
.hero__ticker { position: relative; z-index: 2; overflow: hidden; border-top: 1px solid $border; padding: 14px 0; }

.hero__ticker-track { display: flex; white-space: nowrap; animation: ticker 25s linear infinite; }

@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

.hero__ticker-item {
	display: inline-flex; align-items: center; gap: 14px;
	font-size: 0.72rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
	color: $textMuted; padding-right: 14px;
	svg { color: var(--accent); opacity: 0.5; flex-shrink: 0; }
}

.hero__bottom-fade {
	position: absolute; bottom: 0; left: 0; right: 0; height: 100px;
	background: linear-gradient(transparent, $bg); pointer-events: none; z-index: 1;
}
</style>
