<script setup>
definePageMeta({ middleware: 'auth', layout: 'admin' });
useSeoMeta({ title: 'Отзывы — Lev & Lani Admin' });

const { data: reviews, refresh } = await useFetch('/api/admin/reviews');

const toggleApproved = async (r) => {
	await $fetch(`/api/admin/reviews/${r.id}`, { method: 'PATCH', body: { approved: !r.approved } });
	await refresh();
};

const deleteReview = async (id) => {
	if (!confirm('Удалить отзыв?')) return;
	await $fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
	await refresh();
};

const formatDate = (ts) => {
	if (!ts) return '';
	return new Date(typeof ts === 'number' ? ts * 1000 : ts).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
};

const approved = computed(() => reviews.value?.filter(r => r.approved).length ?? 0);
const pending = computed(() => reviews.value?.filter(r => !r.approved).length ?? 0);
</script>

<template>
	<main class="adm__main">
		<header class="adm__header">
			<div>
				<h1 class="adm__page-title">Отзывы</h1>
				<p class="adm__page-sub">Модерация отзывов клиентов</p>
			</div>
			<button class="adm__refresh" @click="refresh">Обновить</button>
		</header>

		<div class="adm__stats">
			<div class="adm__stat">
				<span class="adm__stat-val">{{ reviews?.length ?? 0 }}</span>
				<span class="adm__stat-label">Всего отзывов</span>
			</div>
			<div class="adm__stat">
				<span class="adm__stat-val">{{ approved }}</span>
				<span class="adm__stat-label">Одобрено</span>
			</div>
			<div class="adm__stat">
				<span class="adm__stat-val">{{ pending }}</span>
				<span class="adm__stat-label">Ожидают</span>
			</div>
		</div>

		<div class="adm__section">
			<div v-if="!reviews?.length" class="adm__empty">
				<p>Отзывов пока нет</p>
				<span>Когда клиенты оставят отзывы, они появятся здесь</span>
			</div>

			<div v-else class="adm__reviews-list">
				<div v-for="r in reviews" :key="r.id" class="adm__review-row" :class="{ 'is-approved': r.approved }">
					<div class="adm__review-top">
						<div class="adm__review-stars">
							<svg v-for="s in r.rating" :key="s" width="12" height="12" viewBox="0 0 12 12" fill="none">
								<path d="M6 1l1.1 2.3 2.6.4-1.9 1.8.4 2.6L6 7l-2.2 1.1.4-2.6L2.3 3.7l2.6-.4z" fill="url(#as)"/>
								<defs><linearGradient id="as" x1="2" y1="1" x2="10" y2="10"><stop offset="0%" stop-color="#c4818b"/><stop offset="100%" stop-color="#e8d5be"/></linearGradient></defs>
							</svg>
						</div>
						<span class="adm__review-date">{{ formatDate(r.createdAt) }}</span>
						<span class="adm__review-service">{{ r.service }}</span>
					</div>
					<p class="adm__review-text">"{{ r.text }}"</p>
					<div class="adm__review-bottom">
						<span class="adm__review-author">— {{ r.author }}</span>
						<div class="adm__review-actions">
							<button class="adm__toggle" :class="{ active: r.approved }" @click="toggleApproved(r)">
								{{ r.approved ? '✓ Опубликован' : '○ На модерации' }}
							</button>
							<button class="adm__icon-btn adm__icon-btn--danger" @click="deleteReview(r.id)" title="Удалить отзыв">
								<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M5 4V3h4v1M6 7v4M8 7v4M3 4l1 8h6l1-8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<style lang="scss">
.adm__reviews-list { display: flex; flex-direction: column; }

.adm__review-row {
	padding: 20px 24px;
	border-bottom: 1px solid $border;
	@include transition();
	&:last-child { border-bottom: none; }
	&:hover { background: rgba(255,255,255,0.02); }
	&.is-approved .adm__review-text { color: $textSecondary; }
}

.adm__review-top {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 10px;
	flex-wrap: wrap;
}

.adm__review-stars { display: flex; gap: 2px; }
.adm__review-date { font-size: 0.74rem; color: $textMuted; }

.adm__review-service {
	font-size: 0.74rem;
	font-weight: 500;
	padding: 2px 10px;
	background: rgba(196,129,139,0.08);
	border: 1px solid rgba(196,129,139,0.2);
	border-radius: 100px;
	color: $roseGold;
}

.adm__review-text {
	font-size: 0.88rem;
	color: $textMuted;
	line-height: 1.7;
	font-style: italic;
	margin: 0 0 12px;
}

.adm__review-bottom {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
}

.adm__review-author { font-size: 0.82rem; font-weight: 500; color: $textSecondary; }
.adm__review-actions { display: flex; align-items: center; gap: 8px; }
</style>
