<script setup>
/**
 * Выбор цветовой темы сайта (дублирует кнопку палитры в navbar).
 */
definePageMeta({ middleware: 'auth', layout: 'admin' });
useSeoMeta({ title: 'Тема сайта — Lev & Lani Admin' });

// variables
const { THEMES, currentTheme, applyTheme } = useTheme();
</script>

<template>
	<main class="adm__main">
		<header class="adm__header">
			<div>
				<h1 class="adm__page-title">Тема сайта</h1>
				<p class="adm__page-sub">Цветовая схема — также доступна через кнопку в шапке сайта</p>
			</div>
		</header>

		<div class="adm__section" style="padding: 28px;">
			<div class="theme-grid">
				<button
					v-for="theme in THEMES"
					:key="theme.id"
					class="theme-card"
					:class="{ 'theme-card--active': currentTheme === theme.id }"
					@click="applyTheme(theme.id)"
				>
					<div class="theme-card__preview">
						<div class="theme-card__preview-bg">
							<div class="theme-card__swatch theme-card__swatch--accent" :style="{ background: theme.preview }" />
							<div class="theme-card__swatch theme-card__swatch--champagne" :style="{ background: theme.champagne }" />
							<div class="theme-card__swatch theme-card__swatch--dark" />
						</div>
						<div class="theme-card__preview-ui">
							<div class="theme-card__preview-bar" :style="{ background: theme.preview }" />
							<div class="theme-card__preview-text">
								<div class="theme-card__preview-line" />
								<div class="theme-card__preview-line theme-card__preview-line--short" />
							</div>
							<div class="theme-card__preview-btn" :style="{ background: theme.preview }" />
						</div>
					</div>
					<div v-if="currentTheme === theme.id" class="theme-card__check">
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
							<path d="M2 7l3.5 3.5L12 3" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
					<div class="theme-card__info">
						<span class="theme-card__name">{{ theme.name }}</span>
						<span class="theme-card__desc">{{ theme.description }}</span>
					</div>
				</button>
			</div>

			<div class="theme-note">
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
					<circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.2" fill="none"/>
					<path d="M7 6v4M7 4.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
				</svg>
				Тема сохраняется в браузере. Каждый посетитель видит дефолтную тему, если не менял настройки. Также доступна через иконку палитры в шапке сайта.
			</div>
		</div>
	</main>
</template>

<style lang="scss">
.theme-grid
{
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 16px;
	margin-bottom: 24px;
}

.theme-card
{
	background: rgba(255,255,255,0.03);
	border: 1px solid $border;
	border-radius: 16px;
	padding: 0;
	cursor: pointer;
	@include transition();
	position: relative;
	overflow: hidden;
	text-align: left;

	&:hover { border-color: rgba(255,255,255,0.12); background: rgba(255,255,255,0.05); }
	&--active { border-color: rgba(196,129,139,0.5); box-shadow: 0 0 20px rgba(196,129,139,0.12); }
}

.theme-card__preview
{
	height: 110px;
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.theme-card__preview-bg
{
	display: flex;
	gap: 6px;
	align-items: center;
}

.theme-card__swatch
{
	border-radius: 4px;

	&--accent { width: 32px; height: 14px; }
	&--champagne { width: 24px; height: 14px; opacity: 0.7; }
	&--dark { width: 16px; height: 14px; background: $bg; border: 1px solid rgba(255,255,255,0.1); }
}

.theme-card__preview-ui
{
	display: flex;
	flex-direction: column;
	gap: 6px;
	flex: 1;
}

.theme-card__preview-bar
{
	width: 100%;
	height: 4px;
	border-radius: 2px;
	opacity: 0.5;
}

.theme-card__preview-text
{
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.theme-card__preview-line
{
	height: 5px;
	background: rgba(255,255,255,0.12);
	border-radius: 2px;
	width: 100%;

	&--short { width: 65%; }
}

.theme-card__preview-btn
{
	width: 48px;
	height: 10px;
	border-radius: 3px;
	opacity: 0.8;
}

.theme-card__check
{
	position: absolute;
	top: 10px;
	right: 10px;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: rgba(196,129,139,0.9);
	display: flex;
	align-items: center;
	justify-content: center;
}

.theme-card__info
{
	padding: 14px 16px;
	border-top: 1px solid $border;
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.theme-card__name
{
	font-size: 0.88rem;
	font-weight: 500;
	color: $textPrimary;
}

.theme-card__desc
{
	font-size: 0.74rem;
	color: $textMuted;
}

.theme-note
{
	display: flex;
	align-items: flex-start;
	gap: 8px;
	font-size: 0.78rem;
	color: $textMuted;
	line-height: 1.6;
	padding: 14px 16px;
	background: rgba(255,255,255,0.02);
	border: 1px solid $border;
	border-radius: 10px;
}

.theme-note svg
{
	flex-shrink: 0;
	margin-top: 2px;
}
</style>
