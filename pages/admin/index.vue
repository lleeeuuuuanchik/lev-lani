<script setup>
definePageMeta({ middleware: 'auth', layout: 'admin' });
useSeoMeta({ title: 'Заявки — Lev & Lani Admin', robots: 'noindex, nofollow' });

const { data: submissions, refresh } = await useFetch('/api/submissions');

const total = computed(() => submissions.value?.length ?? 0);
const today = computed(() => {
	const todayStr = new Date().toDateString();
	return submissions.value?.filter(s => {
		const d = s.createdAt ? new Date(typeof s.createdAt === 'number' ? s.createdAt * 1000 : s.createdAt) : null;
		return d && d.toDateString() === todayStr;
	}).length ?? 0;
});
</script>

<template>
	<main class="adm__main">
		<header class="adm__header">
			<div>
				<h1 class="adm__page-title">Заявки</h1>
				<p class="adm__page-sub">Управление входящими записями клиентов</p>
			</div>
			<button class="adm__refresh" @click="refresh">
				<svg width="15" height="15" viewBox="0 0 15 15" fill="none">
					<path d="M13 7.5A5.5 5.5 0 012 7.5M2 7.5A5.5 5.5 0 0113 7.5M2 7.5V4.5M2 4.5H5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				Обновить
			</button>
		</header>

		<div class="adm__stats">
			<div class="adm__stat">
				<span class="adm__stat-val">{{ total }}</span>
				<span class="adm__stat-label">Всего заявок</span>
			</div>
			<div class="adm__stat">
				<span class="adm__stat-val">{{ today }}</span>
				<span class="adm__stat-label">Сегодня</span>
			</div>
			<div class="adm__stat">
				<span class="adm__stat-val">{{ total > 0 ? Math.round((today / total) * 100) : 0 }}%</span>
				<span class="adm__stat-label">Конверсия дня</span>
			</div>
		</div>

		<div class="adm__section">
			<div v-if="!submissions?.length" class="adm__empty">
				<svg width="40" height="40" viewBox="0 0 40 40" fill="none">
					<rect x="6" y="10" width="28" height="22" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/>
					<path d="M13 10V7a7 7 0 0114 0v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
					<path d="M15 20h10M15 25h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
				<p>Заявок пока нет</p>
				<span>Когда клиенты отправят заявки, они появятся здесь</span>
			</div>
			<AdminSubmissionsTable v-else :submissions="submissions" />
		</div>
	</main>
</template>
