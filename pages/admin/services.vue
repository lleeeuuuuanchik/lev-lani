<script setup>
import { Scissors, Palette, Wind, Hand, Eye, Sparkles, Star, Flower2, Gem, Heart } from 'lucide-vue-next';

definePageMeta({ middleware: 'auth', layout: 'admin' });
useSeoMeta({ title: 'Услуги — Lev & Lani Admin' });

const { data: services, refresh } = await useFetch('/api/admin/services');

const showForm = ref(false);
const editingId = ref(null);
const loading = ref(false);

const form = reactive({ title: '', description: '', price: '', icon: 'sparkles', order: 0, active: 1 });

const iconMap = { scissors: Scissors, palette: Palette, wind: Wind, hand: Hand, eye: Eye, sparkles: Sparkles, star: Star, flower2: Flower2, gem: Gem, heart: Heart };

const iconOptions = [
	{ value: 'scissors', label: 'Ножницы', component: Scissors },
	{ value: 'palette', label: 'Палитра', component: Palette },
	{ value: 'wind', label: 'Ветер', component: Wind },
	{ value: 'hand', label: 'Уход', component: Hand },
	{ value: 'eye', label: 'Брови', component: Eye },
	{ value: 'sparkles', label: 'Блёстки', component: Sparkles },
	{ value: 'star', label: 'Звезда', component: Star },
	{ value: 'flower2', label: 'Цветок', component: Flower2 },
	{ value: 'gem', label: 'Кристалл', component: Gem },
	{ value: 'heart', label: 'Сердце', component: Heart },
];

const resolvedIcon = (key) => iconMap[key] ?? Sparkles;

const openCreate = () => {
	editingId.value = null;
	form.title = ''; form.description = ''; form.price = ''; form.icon = 'sparkles';
	form.order = (services.value?.length ?? 0) + 1; form.active = 1;
	showForm.value = true;
};

const openEdit = (s) => {
	editingId.value = s.id;
	form.title = s.title; form.description = s.description; form.price = s.price;
	form.icon = s.icon; form.order = s.order; form.active = s.active;
	showForm.value = true;
};

const save = async () => {
	if (!form.title) return;
	loading.value = true;
	try {
		if (editingId.value) {
			await $fetch(`/api/admin/services/${editingId.value}`, { method: 'PUT', body: { ...form } });
		} else {
			await $fetch('/api/admin/services', { method: 'POST', body: { ...form } });
		}
		showForm.value = false;
		await refresh();
	} finally { loading.value = false; }
};

const toggleActive = async (s) => {
	await $fetch(`/api/admin/services/${s.id}`, { method: 'PUT', body: { active: s.active ? 0 : 1 } });
	await refresh();
};

const remove = async (id) => {
	if (!confirm('Удалить услугу?')) return;
	await $fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
	await refresh();
};
</script>

<template>
	<main class="adm__main">
		<header class="adm__header">
			<div>
				<h1 class="adm__page-title">Услуги</h1>
				<p class="adm__page-sub">Управление каталогом услуг салона</p>
			</div>
			<button class="adm__refresh" @click="openCreate">+ Добавить услугу</button>
		</header>

		<Transition name="rev-form">
			<div v-if="showForm" class="adm__section" style="padding: 28px;">
				<h3 class="adm__form-title">{{ editingId ? 'Редактировать услугу' : 'Новая услуга' }}</h3>
				<div class="adm__form-grid">
					<div class="adm__field">
						<label class="adm__field-label">Название *</label>
						<input class="adm__input" v-model="form.title" placeholder="Стрижка" />
					</div>
					<div class="adm__field">
						<label class="adm__field-label">Цена</label>
						<input class="adm__input" v-model="form.price" placeholder="от 2 500 ₽" />
					</div>
					<div class="adm__field" style="grid-column: 1/-1">
						<label class="adm__field-label">Описание</label>
						<textarea class="adm__input adm__textarea" v-model="form.description" rows="3" placeholder="Краткое описание услуги..." />
					</div>
					<div class="adm__field" style="grid-column: 1/-1">
						<label class="adm__field-label">Иконка</label>
						<div class="adm__icon-grid">
							<button
								v-for="opt in iconOptions"
								:key="opt.value"
								type="button"
								class="adm__icon-option"
								:class="{ 'is-selected': form.icon === opt.value }"
								@click="form.icon = opt.value"
								:title="opt.label"
							>
								<component :is="opt.component" :size="20" />
								<span>{{ opt.label }}</span>
							</button>
						</div>
					</div>
					<div class="adm__field">
						<label class="adm__field-label">Порядок</label>
						<input class="adm__input" v-model.number="form.order" type="number" style="max-width:120px" />
					</div>
				</div>
				<div class="adm__form-actions">
					<button class="adm__refresh" @click="save" :disabled="loading">{{ loading ? 'Сохраняем...' : 'Сохранить' }}</button>
					<button class="adm__btn-cancel" @click="showForm = false">Отмена</button>
				</div>
			</div>
		</Transition>

		<div class="adm__section">
			<div v-if="!services?.length" class="adm__empty">
				<p>Услуг пока нет</p>
				<span>Нажмите «Добавить услугу», чтобы создать первую</span>
			</div>
			<div v-else class="adm__services-list">
				<div v-for="s in services" :key="s.id" class="adm__service-row">
					<div class="adm__service-row-left">
						<span class="adm__service-order">{{ s.order }}</span>
						<div class="adm__service-icon-preview">
							<component :is="resolvedIcon(s.icon)" :size="16" />
						</div>
						<div>
							<div class="adm__service-title">{{ s.title }}</div>
							<div class="adm__service-price">{{ s.price }}</div>
						</div>
					</div>
					<div class="adm__service-row-right">
						<button class="adm__toggle" :class="{ active: s.active }" @click="toggleActive(s)">
							{{ s.active ? 'Активна' : 'Скрыта' }}
						</button>
						<button class="adm__icon-btn" @click="openEdit(s)" title="Редактировать">
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 2l2 2-8 8H2v-2l8-8z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
						</button>
						<button class="adm__icon-btn adm__icon-btn--danger" @click="remove(s.id)" title="Удалить">
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M5 4V3h4v1M6 7v4M8 7v4M3 4l1 8h6l1-8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<style lang="scss">
.adm__services-list { display: flex; flex-direction: column; }

.adm__service-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	padding: 14px 20px;
	border-bottom: 1px solid $border;
	@include transition();
	&:last-child { border-bottom: none; }
	&:hover { background: rgba(255,255,255,0.02); }
}

.adm__service-row-left { display: flex; align-items: center; gap: 12px; }
.adm__service-row-right { display: flex; align-items: center; gap: 8px; }

.adm__service-order {
	width: 28px; height: 28px;
	display: flex; align-items: center; justify-content: center;
	background: rgba(196,129,139,0.1);
	border: 1px solid rgba(196,129,139,0.2);
	border-radius: 6px;
	font-family: $headingFont;
	font-size: 0.9rem;
	color: $roseGold;
	flex-shrink: 0;
}

.adm__service-title { font-size: 0.92rem; font-weight: 500; color: $textPrimary; }
.adm__service-price { font-size: 0.78rem; color: $roseGold; margin-top: 2px; }
</style>
