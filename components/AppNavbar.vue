<script setup>
import { Palette } from 'lucide-vue-next';
import { useGsapAnimations } from '@/composables/useGsapAnimations';

const navRef = ref(null);
const mobileOpen = ref(false);
const themeOpen = ref(false);
const themeRef = ref(null);

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
</script>

<template>
	<header ref="navRef" class="navbar">
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

		<Transition name="mobile-menu">
			<div v-if="mobileOpen" class="navbar__mobile">
				<a class="navbar__mobile-link" @click.prevent="scrollTo('#services')">Услуги</a>
				<a class="navbar__mobile-link" @click.prevent="scrollTo('#process')">Как мы работаем</a>
				<a class="navbar__mobile-link" @click.prevent="scrollTo('#contact')">Контакты</a>
				<a class="navbar__mobile-link" href="tel:+79627488383">+7 (962) 748-83-83</a>
				<!-- Mobile theme row -->
				<div class="navbar__mobile-themes">
					<span class="navbar__mobile-theme-label">Тема:</span>
					<div class="navbar__mobile-theme-dots">
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
				<UiButton size="sm" @click="scrollTo('#contact')">Записаться</UiButton>
			</div>
		</Transition>
	</header>
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

// Theme switcher
.navbar__theme {
	position: relative;
	flex-shrink: 0;
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

.navbar__mobile {
	display: flex;
	flex-direction: column;
	gap: 2px;
	padding: 10px 16px 20px;
	background: rgba(8, 10, 12, 0.96);
	backdrop-filter: blur(24px);
	border-bottom: 1px solid $border;

	@include mq($laptop) { display: none !important; }
}

.navbar__mobile-link {
	display: block;
	padding: 11px 13px;
	font-size: 0.92rem;
	color: $textSecondary;
	text-decoration: none;
	border-radius: 8px;
	cursor: pointer;
	@include transition();
	&:hover { color: $textPrimary; background: rgba(255, 255, 255, 0.05); }
}

.navbar__mobile-themes {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 10px 13px;
}

.navbar__mobile-theme-label {
	font-size: 0.8rem;
	color: $textMuted;
}

.navbar__mobile-theme-dots {
	display: flex;
	gap: 6px;
}

.mobile-menu-enter-active, .mobile-menu-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; transform: translateY(-10px); }

.theme-pop-enter-active, .theme-pop-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.theme-pop-enter-from, .theme-pop-leave-to { opacity: 0; transform: translateY(-6px) scale(0.95); }
</style>
