<script setup>
// ─── Лейаут по умолчанию ─────────────────────────────────────────────────────
// Оборачивает все страницы кроме /admin/* (у них layout: 'admin').
// Структура: FallingStars (фоновая анимация) → AppNavbar → <slot> → AppFooter.
// Через Teleport в body выводятся глобальные оверлеи: прелоадер и confirm-диалог.

const nuxtApp = useNuxtApp();
const loading = ref(false);

// Показываем прелоадер при навигации между страницами
nuxtApp.hook('page:start',  () => loading.value = true);
nuxtApp.hook('page:finish', () => {
	loading.value = false;
	getScrollWidth(); // пересчитываем ширину scrollbar после смены страницы
});
</script>

<template>
	<div class="default-layout">
		<FallingStars />
		<AppNavbar />
		<main class="default-layout__main">
			<slot />
		</main>
		<AppFooter />
	</div>

	<!-- Глобальные оверлеи вне дерева лейаута — Teleport избегает z-index проблем -->
	<Teleport to="body">
		<HugePreloader v-if="loading" />
		<UiConfirmDialog />
	</Teleport>
</template>

<style lang="scss">
.default-layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	&__main {
		flex: 1;
	}
}
</style>
