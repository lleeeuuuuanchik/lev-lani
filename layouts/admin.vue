<script setup>
import { LayoutGrid, Scissors, Users, Star, Palette, LogOut } from 'lucide-vue-next';

const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook('page:start',  () => loading.value = true);
nuxtApp.hook('page:finish', () => loading.value = false);

const logout = async () => {
	await $fetch('/api/auth/logout', { method: 'POST' });
	await navigateTo('/admin/login');
};
</script>

<template>
	<div class="adm">
		<div class="adm__bg-orb" />

		<aside class="adm__sidebar">
			<NuxtLink to="/" class="adm__logo"><icons-logo /></NuxtLink>
			<nav class="adm__nav">
				<NuxtLink to="/admin" class="adm__nav-item" exact-active-class="adm__nav-item--active">
					<LayoutGrid :size="16" />
					Заявки
				</NuxtLink>
				<NuxtLink to="/admin/services" class="adm__nav-item" exact-active-class="adm__nav-item--active">
					<Scissors :size="16" />
					Услуги
				</NuxtLink>
				<NuxtLink to="/admin/masters" class="adm__nav-item" exact-active-class="adm__nav-item--active">
					<Users :size="16" />
					Мастера
				</NuxtLink>
				<NuxtLink to="/admin/reviews" class="adm__nav-item" exact-active-class="adm__nav-item--active">
					<Star :size="16" />
					Отзывы
				</NuxtLink>
				<NuxtLink to="/admin/theme" class="adm__nav-item" exact-active-class="adm__nav-item--active">
					<Palette :size="16" />
					Тема сайта
				</NuxtLink>
			</nav>
			<div class="adm__sidebar-bottom">
				<button class="adm__logout" @click="logout">
					<LogOut :size="15" />
					Выйти
				</button>
			</div>
		</aside>

		<slot />
	</div>

	<ClientOnly>
		<Teleport to="body">
			<HugePreloader v-if="loading" />
		</Teleport>
	</ClientOnly>
</template>

<style lang="scss">
.adm {
	min-height: 100vh;
	background: $bg;
	display: grid;
	grid-template-columns: 220px 1fr;

	@include mq(0, $laptop) {
		grid-template-columns: 1fr;
	}
}

.adm__bg-orb {
	position: fixed;
	width: 600px; height: 600px;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(196,129,139,0.05) 0%, transparent 65%);
	filter: blur(80px);
	top: -200px; right: -100px;
	pointer-events: none;
	z-index: 0;
}

// Sidebar
.adm__sidebar {
	background: rgba(255,255,255,0.018);
	border-right: 1px solid $border;
	padding: 28px 16px;
	display: flex;
	flex-direction: column;
	gap: 32px;
	position: sticky;
	top: 0;
	height: 100vh;
	z-index: 10;

	@include mq(0, $laptop) { display: none; }
}

.adm__logo {
	text-decoration: none;
	padding: 0 8px;
	display: block;
}

.adm__nav {
	display: flex;
	flex-direction: column;
	gap: 4px;
	flex: 1;
}

.adm__nav-item {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 9px 12px;
	border-radius: 8px;
	font-size: 0.86rem;
	color: $textSecondary;
	cursor: pointer;
	text-decoration: none;
	position: relative;
	transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
	border: 1px solid transparent;

	svg { flex-shrink: 0; transition: color 0.25s ease; }

	// Active indicator bar
	&::before {
		content: '';
		position: absolute;
		left: 0; top: 50%;
		transform: translateY(-50%) scaleY(0);
		width: 3px; height: 16px;
		background: $roseGold;
		border-radius: 0 2px 2px 0;
		box-shadow: 0 0 8px var(--accent-glow);
		transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	&:hover {
		background: rgba(255,255,255,0.04);
		color: $textPrimary;
	}

	&--active {
		background: rgba(196,129,139,0.08);
		border-color: rgba(196,129,139,0.18);
		color: $roseGoldLight;
		box-shadow: inset 0 0 20px rgba(196,129,139,0.04);

		svg { color: $roseGold; }

		&::before {
			transform: translateY(-50%) scaleY(1);
		}
	}
}

.adm__sidebar-bottom {
	padding-top: 16px;
	border-top: 1px solid $border;
}

.adm__logout {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 9px 12px;
	border-radius: 8px;
	font-size: 0.86rem;
	color: $textMuted;
	background: none;
	border: none;
	cursor: pointer;
	width: 100%;
	@include transition();
	&:hover { background: rgba(255,77,109,0.06); color: #ff4d6d; }
}

// Main content area
.adm__main {
	padding: 36px 40px;
	display: flex;
	flex-direction: column;
	gap: 28px;
	position: relative;
	z-index: 1;
	@include mq(0, $tablet) { padding: 24px 16px; }
}

.adm__header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
}

.adm__page-title {
	font-family: $headingFont;
	font-size: 1.9rem;
	font-weight: 300;
	color: $textPrimary;
	margin: 0;
}

.adm__page-sub {
	font-size: 0.83rem;
	color: $textMuted;
	margin: 4px 0 0;
}

.adm__refresh {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 16px;
	background: rgba(255,255,255,0.04);
	border: 1px solid $border;
	border-radius: 8px;
	font-size: 0.84rem;
	color: $textSecondary;
	cursor: pointer;
	@include transition();
	white-space: nowrap;

	&:hover { background: rgba(255,255,255,0.07); border-color: $borderHover; color: $textPrimary; }
	&:disabled { opacity: 0.5; cursor: not-allowed; }
}

// Stats
.adm__stats { display: flex; gap: 16px; flex-wrap: wrap; }

.adm__stat {
	background: rgba(255,255,255,0.025);
	border: 1px solid $border;
	border-radius: 14px;
	padding: 20px 28px;
	display: flex;
	flex-direction: column;
	gap: 4px;
	min-width: 130px;
}

.adm__stat-val {
	font-family: $headingFont;
	font-size: 2.2rem;
	font-weight: 300;
	line-height: 1;
	background: linear-gradient(120deg, $roseGold, $champagne);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.adm__stat-label { font-size: 0.76rem; color: $textMuted; letter-spacing: 0.04em; }

// Section card
.adm__section {
	background: rgba(255,255,255,0.018);
	border: 1px solid $border;
	border-radius: 16px;
	overflow: hidden;
}

.adm__empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	padding: 72px 24px;
	color: $textMuted;
	text-align: center;

	svg { color: rgba(255,255,255,0.12); }
	p { font-size: 1rem; font-weight: 500; color: $textSecondary; margin: 0; }
	span { font-size: 0.84rem; }
}

// Shared action elements
.adm__toggle {
	padding: 4px 12px;
	border-radius: 100px;
	font-size: 0.76rem;
	font-weight: 500;
	cursor: pointer;
	@include transition();
	background: rgba(255,255,255,0.04);
	border: 1px solid $border;
	color: $textMuted;

	&.active {
		background: rgba(196,129,139,0.1);
		border-color: rgba(196,129,139,0.3);
		color: $roseGoldLight;
	}
}

.adm__icon-btn {
	width: 32px; height: 32px;
	display: flex; align-items: center; justify-content: center;
	background: rgba(255,255,255,0.03);
	border: 1px solid $border;
	border-radius: 7px;
	color: $textSecondary;
	cursor: pointer;
	@include transition();

	&:hover { background: rgba(255,255,255,0.07); border-color: $borderHover; color: $textPrimary; }
	&--danger:hover { background: rgba(255,77,109,0.07); border-color: rgba(255,77,109,0.3); color: #ff4d6d; }
}

// Form elements
.adm__form-title {
	font-family: $headingFont;
	font-size: 1.1rem;
	font-weight: 400;
	color: $textPrimary;
	margin: 0 0 20px;
}

.adm__form-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 14px;
	margin-bottom: 20px;
	@include mq(0, $tablet) { grid-template-columns: 1fr; }
}

.adm__field { display: flex; flex-direction: column; gap: 6px; }

.adm__field-label {
	font-size: 0.76rem;
	font-weight: 500;
	letter-spacing: 0.04em;
	color: $textSecondary;
}

.adm__input {
	padding: 9px 14px;
	background: rgba(255,255,255,0.04);
	border: 1px solid $border;
	border-radius: 8px;
	outline: none;
	color: $textPrimary;
	font-family: $firstFont;
	font-size: 0.88rem;
	@include transition();
	&:focus { border-color: $borderFocus; }
	&::placeholder { color: $textMuted; }
}

.adm__textarea { resize: vertical; min-height: 80px; }
.adm__form-actions { display: flex; gap: 10px; align-items: center; }

.adm__btn-cancel {
	padding: 8px 16px;
	background: none;
	border: 1px solid $border;
	border-radius: 8px;
	font-size: 0.84rem;
	color: $textMuted;
	cursor: pointer;
	@include transition();
	&:hover { border-color: $borderHover; color: $textSecondary; }
}

// Lucide icon picker
.adm__icon-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
	gap: 8px;
}

.adm__icon-option {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
	padding: 12px 8px;
	background: rgba(255,255,255,0.03);
	border: 1px solid $border;
	border-radius: 10px;
	color: $textMuted;
	cursor: pointer;
	@include transition();
	font-size: 0.68rem;
	letter-spacing: 0.03em;

	&:hover { background: rgba(255,255,255,0.06); border-color: $borderHover; color: $textSecondary; }

	&.is-selected {
		background: rgba(196,129,139,0.12);
		border-color: rgba(196,129,139,0.45);
		color: $roseGoldLight;
		svg, .lucide { color: $roseGold; }
	}
}

.adm__service-icon-preview {
	width: 32px; height: 32px;
	display: flex; align-items: center; justify-content: center;
	background: rgba(196,129,139,0.07);
	border: 1px solid rgba(196,129,139,0.15);
	border-radius: 8px;
	color: $roseGold;
	flex-shrink: 0;
}

// Form transition
.rev-form-enter-active, .rev-form-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.rev-form-enter-from, .rev-form-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
