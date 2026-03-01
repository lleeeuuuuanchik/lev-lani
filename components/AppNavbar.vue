<script setup>
import { Palette } from 'lucide-vue-next';
import { useGsapAnimations } from '@/composables/useGsapAnimations';

const navRef = ref(null);
const mobileOpen = ref(false);
const themeOpen = ref(false);
const themeRef = ref(null);
const navbarHeight = ref(76);
const hasAnimated = ref(false);

const { animateNavbar } = useGsapAnimations();
const { THEMES, currentTheme, applyTheme } = useTheme();
const route = useRoute();
const router = useRouter();

onMounted(() => {
	if (navRef.value) animateNavbar(navRef.value);
	document.addEventListener('click', (e) => {
		if (themeRef.value && !themeRef.value.contains(e.target)) themeOpen.value = false;
	});
});

// Re-measure navbar height + lock scroll when menu opens
watch(mobileOpen, async (open) => {
	if (!import.meta.client) return;
	document.body.style.overflow = open ? 'hidden' : '';
	if (open) {
		await nextTick();
		navbarHeight.value = navRef.value?.offsetHeight ?? 76;
	} else {
		await nextTick();
		// Вручную восстанавливаем scrolled-класс — ScrollTrigger не перезапускает onEnter
		if (navRef.value) {
			navRef.value.classList.toggle('scrolled', window.scrollY > 80);
		}
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		ScrollTrigger.refresh();
	}
});

onUnmounted(() => {
	if (import.meta.client) document.body.style.overflow = '';
});

const scrollTo = async (id) => {
	mobileOpen.value = false;
	if (route.path !== '/') {
		await router.push({ path: '/', hash: id });
		return;
	}
	const el = document.querySelector(id);
	if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const selectTheme = (id) => {
	applyTheme(id);
	themeOpen.value = false;
};

// ─── Full-screen menu GSAP transitions ─────────────────────────────────────
const onMenuEnter = async (el, done) => {
	if (!import.meta.client || hasAnimated.value) { done(); return; }
	hasAnimated.value = true;
	const { gsap } = await import('gsap');
	const items = el.querySelectorAll('.nm__item');
	const foot = el.querySelector('.nm__foot');
	gsap.set(el, { opacity: 0 });
	gsap.set(items, { opacity: 0, x: -36 });
	gsap.set(foot, { opacity: 0, y: 18 });
	gsap.timeline({ onComplete: done })
		.to(el, { opacity: 1, duration: 0.22, ease: 'power2.out' })
		.to(items, { opacity: 1, x: 0, duration: 0.52, ease: 'expo.out', stagger: 0.09 }, 0.08)
		.to(foot, { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' }, 0.36);
};

const onMenuLeave = async (el, done) => {
	if (!import.meta.client) { done(); return; }
	const { gsap } = await import('gsap');
	gsap.to(el, { opacity: 0, duration: 0.22, ease: 'power2.in', onComplete: done });
};
</script>

<template>
	<!-- Single header — stays visible above the menu -->
	<header ref="navRef" class="navbar" :class="{ 'navbar--menu-open': mobileOpen }">
		<div class="container navbar__inner">
			<NuxtLink to="/" class="navbar__logo">
				<icons-logo />
			</NuxtLink>

			<nav class="navbar__nav">
				<a class="navbar__link" @click.prevent="scrollTo('#services')">Услуги</a>
				<a class="navbar__link" @click.prevent="scrollTo('#process')">Как мы работаем</a>
				<a class="navbar__link" @click.prevent="scrollTo('#contact')">Контакты</a>
				<a class="navbar__link navbar__link--phone" href="tel:+79627488383">+7 (962) 748-83-83</a>
			</nav>

			<!-- Theme switcher -->
			<div ref="themeRef" class="navbar__theme">
				<button
					class="navbar__theme-btn"
					:class="{ active: themeOpen }"
					@click.stop="themeOpen = !themeOpen"
					title="Цветовая тема"
				>
					<Palette :size="16" />
				</button>
				<Transition name="theme-pop">
					<div v-if="themeOpen" class="navbar__theme-pop">
						<button
							v-for="t in THEMES"
							:key="t.id"
							class="navbar__theme-dot"
							:class="{ active: currentTheme === t.id }"
							:style="{ background: t.preview }"
							:title="t.name"
							@click.stop="selectTheme(t.id)"
						/>
					</div>
				</Transition>
			</div>

			<UiButton class="navbar__cta" size="sm" @click="scrollTo('#contact')">
				Записаться
			</UiButton>

			<button class="navbar__burger" :class="{ open: mobileOpen }" @click="mobileOpen = !mobileOpen" aria-label="Меню">
				<span /><span /><span />
			</button>
		</div>
	</header>

	<!-- ─── Mobile menu — opens below the navbar ─────────────────────────── -->
	<Transition :css="false" @enter="onMenuEnter" @leave="onMenuLeave">
		<div v-if="mobileOpen" class="nm" :style="{ paddingTop: navbarHeight + 'px' }">
			<div class="nm__ambient" aria-hidden />

			<nav class="nm__nav">
				<a class="nm__item" @click.prevent="scrollTo('#services')">
					<span class="nm__num">01</span>
					<span class="nm__text">Услуги</span>
					<svg class="nm__arrow" width="22" height="22" viewBox="0 0 22 22" fill="none">
						<path d="M4 11h14M12 5l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
				<a class="nm__item" @click.prevent="scrollTo('#process')">
					<span class="nm__num">02</span>
					<span class="nm__text">Как мы работаем</span>
					<svg class="nm__arrow" width="22" height="22" viewBox="0 0 22 22" fill="none">
						<path d="M4 11h14M12 5l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
				<a class="nm__item" @click.prevent="scrollTo('#contact')">
					<span class="nm__num">03</span>
					<span class="nm__text">Записаться</span>
					<svg class="nm__arrow" width="22" height="22" viewBox="0 0 22 22" fill="none">
						<path d="M4 11h14M12 5l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
			</nav>

			<div class="nm__foot">
				<a href="tel:+79627488383" class="nm__phone">+7 (962) 748-83-83</a>
				<div class="nm__social">
					<a href="https://www.instagram.com/lev_lani_/" target="_blank" rel="noopener noreferrer" class="nm__social-link">Instagram</a>
					<span class="nm__sep" />
					<a href="https://t.me/teoamor" target="_blank" rel="noopener noreferrer" class="nm__social-link">Telegram</a>
				</div>
				<div class="nm__themes">
					<button
						v-for="t in THEMES"
						:key="t.id"
						class="navbar__theme-dot"
						:class="{ active: currentTheme === t.id }"
						:style="{ background: t.preview }"
						:title="t.name"
						@click="selectTheme(t.id)"
					/>
				</div>
			</div>
		</div>
	</Transition>
</template>

<style lang="scss">
.navbar {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	padding: 18px 0;
	background: transparent;
	transition: background 0.4s ease, padding 0.3s ease, border-color 0.35s ease;
	border-bottom: 1px solid transparent;

	&.scrolled {
		background: rgba(8, 10, 12, 0.88);
		backdrop-filter: blur(24px) saturate(1.4);
		-webkit-backdrop-filter: blur(24px) saturate(1.4);
		padding: 12px 0;
		border-bottom-color: $border;
	}

	// When menu is open — always show solid background and bottom border
	&--menu-open {
		background: rgba(8, 10, 12, 0.96) !important;
		backdrop-filter: blur(24px) saturate(1.4) !important;
		-webkit-backdrop-filter: blur(24px) saturate(1.4) !important;
		border-bottom-color: $border !important;
	}
}

.navbar__inner {
	display: flex;
	align-items: center;
	gap: 16px;
}

.navbar__logo {
	flex-shrink: 0;
	text-decoration: none;
}

.navbar__nav {
	display: flex;
	align-items: center;
	gap: 2px;
	margin-left: auto;

	@include mq(0, $laptop) { display: none; }
}

.navbar__link {
	padding: 7px 13px;
	font-size: 0.84rem;
	font-weight: 450;
	color: $textSecondary;
	text-decoration: none;
	cursor: pointer;
	border-radius: 8px;
	@include transition();

	&:hover { color: $textPrimary; background: rgba(255, 255, 255, 0.05); }
	&--phone { color: $champagneMuted; font-feature-settings: 'tnum'; letter-spacing: 0.01em; }
}

// Theme switcher — hidden on mobile (themes available in burger menu)
.navbar__theme {
	position: relative;
	flex-shrink: 0;

	@include mq(0, $laptop) { display: none; }
}

.navbar__theme-btn {
	width: 34px; height: 34px;
	display: flex; align-items: center; justify-content: center;
	background: rgba(255,255,255,0.04);
	border: 1px solid $border;
	border-radius: 8px;
	color: $textMuted;
	cursor: pointer;
	@include transition();

	&:hover, &.active {
		background: rgba(196,129,139,0.08);
		border-color: rgba(196,129,139,0.3);
		color: $roseGold;
	}
}

.navbar__theme-pop {
	position: absolute;
	top: calc(100% + 8px);
	right: 0;
	display: flex;
	gap: 6px;
	padding: 10px 12px;
	background: rgba(13,15,18,0.95);
	backdrop-filter: blur(20px);
	border: 1px solid $border;
	border-radius: 12px;
	box-shadow: 0 8px 32px rgba(0,0,0,0.4);
	z-index: 200;
}

.navbar__theme-dot {
	width: 22px; height: 22px;
	border-radius: 50%;
	border: 2px solid transparent;
	cursor: pointer;
	@include transition();
	flex-shrink: 0;
	padding: 0;

	&:hover { transform: scale(1.15); }
	&.active {
		border-color: $textPrimary;
		box-shadow: 0 0 0 2px rgba(240,236,232,0.2);
	}
}

.navbar__cta {
	flex-shrink: 0;
	margin-left: 4px;
	@include mq(0, $laptop) { display: none; }
}

.navbar__burger {
	display: none;
	flex-direction: column;
	justify-content: center;
	gap: 5px;
	width: 36px; height: 36px;
	background: rgba(255, 255, 255, 0.04);
	border: 1px solid $border;
	border-radius: 8px;
	cursor: pointer;
	padding: 9px 8px;
	margin-left: auto;
	@include transition();

	span {
		display: block;
		height: 1.5px;
		background: $textSecondary;
		border-radius: 2px;
		@include transition();
		transform-origin: center;
	}

	&.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
	&.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
	&.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

	@include mq(0, $laptop) { display: flex; }
}

// ─── Full-screen menu ──────────────────────────────────────────────────────
// z-index: 99 — below navbar (100), so the single header always shows on top
.nm {
	position: fixed;
	inset: 0;
	z-index: 99;
	background: $bg;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	@include mq($laptop) { display: none !important; }
}

// Subtle rose-gold ambient top-right
.nm__ambient {
	position: absolute;
	width: 480px; height: 480px;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(196,129,139,0.08) 0%, transparent 65%);
	filter: blur(80px);
	top: -120px; right: -100px;
	pointer-events: none;
}

// Navigation: full-width rows with dividers
.nm__nav {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	z-index: 2;
}

.nm__item {
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 0 48px;
	min-height: clamp(76px, 20vw, 108px);
	border-bottom: 1px solid $border;
	text-decoration: none;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	@include transition();

	&:first-child { border-top: 1px solid $border; }

	// Left accent bar that scales in on hover
	&::before {
		content: '';
		position: absolute;
		left: 0; top: 0; bottom: 0;
		width: 3px;
		background: linear-gradient(180deg, $roseGold 0%, $champagne 100%);
		transform: scaleY(0);
		transform-origin: center;
		transition: transform 0.3s ease;
	}

	&:hover {
		background: rgba(196,129,139,0.025);

		&::before { transform: scaleY(1); }

		.nm__text {
			color: $textPrimary;
			transform: translateX(8px);
		}
		.nm__num { color: $roseGold; }
		.nm__arrow {
			opacity: 1;
			transform: translateX(5px);
		}
	}

	@include mq(0, $tablet) { padding: 0 20px; gap: 12px; }
}

.nm__num {
	font-size: 0.6rem;
	font-weight: 700;
	letter-spacing: 0.22em;
	text-transform: uppercase;
	color: $textMuted;
	flex-shrink: 0;
	min-width: 26px;
	@include transition();
}

.nm__text {
	font-family: $headingFont;
	font-style: italic;
	font-weight: 300;
	font-size: clamp(2.2rem, 10vw, 3.8rem);
	letter-spacing: -0.02em;
	line-height: 1;
	color: $textSecondary;
	flex: 1;
	transition: color 0.25s ease, transform 0.25s ease;
}

.nm__arrow {
	flex-shrink: 0;
	color: $roseGold;
	opacity: 0;
	transition: opacity 0.25s ease, transform 0.25s ease;
}

// Footer: phone + social + themes
.nm__foot {
	flex-shrink: 0;
	position: relative;
	z-index: 2;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 12px 24px;
	padding: 18px 48px 30px;
	border-top: 1px solid $border;

	@include mq(0, $tablet) { padding: 16px 20px 26px; }
}

.nm__phone {
	font-size: 0.85rem;
	font-weight: 500;
	color: $champagneMuted;
	text-decoration: none;
	letter-spacing: 0.04em;
	font-feature-settings: 'tnum';
	@include transition();
	&:hover { color: $champagne; }
}

.nm__social {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-right: auto;
}

.nm__social-link {
	font-size: 0.68rem;
	font-weight: 600;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: $textMuted;
	text-decoration: none;
	@include transition();
	&:hover { color: $roseGoldLight; }
}

.nm__sep {
	width: 3px; height: 3px;
	border-radius: 50%;
	background: $textMuted;
	flex-shrink: 0;
	opacity: 0.35;
}

.nm__themes {
	display: flex;
	gap: 6px;
	flex-wrap: wrap;
}

.theme-pop-enter-active, .theme-pop-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.theme-pop-enter-from, .theme-pop-leave-to { opacity: 0; transform: translateY(-6px) scale(0.95); }
</style>
