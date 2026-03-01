<script setup>
/**
 * Лейаут по умолчанию: FallingStars → AppNavbar → slot → AppFooter.
 * Teleport: прелоадер и confirm-диалог в body.
 */

// variables
const nuxtApp = useNuxtApp();
const loading = ref(false);

nuxtApp.hook('page:start',  () => loading.value = true);
nuxtApp.hook('page:finish', () =>
{
	loading.value = false;
	getScrollWidth();
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
.default-layout
{
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.default-layout__main
{
	flex: 1;
}
</style>
