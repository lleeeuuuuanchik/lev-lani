<script setup>
definePageMeta({ middleware: 'auth', layout: 'admin' });
useSeoMeta({ title: 'Мастера — Lev & Lani Admin' });

const { data: masters, refresh } = await useFetch('/api/admin/masters');

const showForm = ref(false);
const editingId = ref(null);
const saving = ref(false);

const emptyForm = () => ({ name: '', role: '', spec: '', exp: '', initial: '', photo: '', active: 1, order: 0 });
const form = reactive(emptyForm());

const openAdd = () => {
	Object.assign(form, emptyForm());
	editingId.value = null;
	showForm.value = true;
};

const openEdit = (m) => {
	Object.assign(form, { ...m });
	editingId.value = m.id;
	showForm.value = true;
};

const cancel = () => { showForm.value = false; editingId.value = null; };

const save = async () => {
	if (!form.name || !form.role || !form.initial) return;
	saving.value = true;
	try {
		if (editingId.value) {
			await $fetch(`/api/admin/masters/${editingId.value}`, { method: 'PUT', body: { ...form } });
		} else {
			await $fetch('/api/admin/masters', { method: 'POST', body: { ...form } });
		}
		await refresh();
		cancel();
	} finally { saving.value = false; }
};

const toggleActive = async (m) => {
	await $fetch(`/api/admin/masters/${m.id}`, { method: 'PUT', body: { active: m.active ? 0 : 1 } });
	await refresh();
};

const deleteMaster = async (id) => {
	if (!confirm('Удалить мастера?')) return;
	await $fetch(`/api/admin/masters/${id}`, { method: 'DELETE' });
	await refresh();
};

watch(() => form.name, (v) => {
	if (!editingId.value && v) form.initial = v.trim().charAt(0).toUpperCase();
});
</script>

<template>
	<main class="adm__main">
		<header class="adm__header">
			<div>
				<h1 class="adm__page-title">Мастера</h1>
				<p class="adm__page-sub">Управление командой мастеров</p>
			</div>
			<button class="adm__refresh" @click="openAdd">+ Добавить мастера</button>
		</header>

		<Transition name="rev-form">
			<div v-if="showForm" class="adm__section" style="padding: 28px;">
				<h3 class="adm__form-title">{{ editingId ? 'Редактировать мастера' : 'Новый мастер' }}</h3>
				<div class="adm__form-grid">
					<div class="adm__field">
						<label class="adm__field-label">Имя *</label>
						<input class="adm__input" v-model="form.name" placeholder="Имя Фамилия" />
					</div>
					<div class="adm__field">
						<label class="adm__field-label">Должность *</label>
						<input class="adm__input" v-model="form.role" placeholder="Стилист · Мастер маникюра" />
					</div>
					<div class="adm__field">
						<label class="adm__field-label">Специализация</label>
						<input class="adm__input" v-model="form.spec" placeholder="Стрижка · Окрашивание" />
					</div>
					<div class="adm__field">
						<label class="adm__field-label">Опыт</label>
						<input class="adm__input" v-model="form.exp" placeholder="10 лет" />
					</div>
					<div class="adm__field">
						<label class="adm__field-label">Инициал *</label>
						<input class="adm__input" v-model="form.initial" maxlength="2" placeholder="А" style="max-width:80px" />
					</div>
					<div class="adm__field">
						<label class="adm__field-label">Порядок</label>
						<input class="adm__input" type="number" v-model.number="form.order" style="max-width:100px" />
					</div>
					<div class="adm__field" style="grid-column: 1/-1">
						<label class="adm__field-label">URL фото (необязательно)</label>
						<input class="adm__input" v-model="form.photo" placeholder="/images/master-1.jpg" />
					</div>
				</div>
				<div class="adm__form-actions">
					<button class="adm__refresh" @click="save" :disabled="saving || !form.name || !form.role || !form.initial">
						{{ saving ? 'Сохранение...' : (editingId ? 'Сохранить' : 'Добавить') }}
					</button>
					<button class="adm__btn-cancel" @click="cancel">Отмена</button>
				</div>
			</div>
		</Transition>

		<div class="adm__section">
			<div v-if="!masters?.length" class="adm__empty">
				<p>Мастера не добавлены</p>
				<span>Нажмите «Добавить мастера», чтобы создать первого</span>
			</div>
			<div v-else class="adm__masters-list">
				<div v-for="m in masters" :key="m.id" class="adm__master-row">
					<div class="adm__master-info">
						<div class="adm__master-avatar">{{ m.initial }}</div>
						<div>
							<div class="adm__master-name">{{ m.name }}</div>
							<div class="adm__master-role-sub">{{ m.role }}</div>
							<div v-if="m.spec" class="adm__master-spec">{{ m.spec }}</div>
						</div>
					</div>
					<div class="adm__master-exp">{{ m.exp || '—' }}</div>
					<div class="adm__service-row-right">
						<button class="adm__toggle" :class="{ active: m.active }" @click="toggleActive(m)">
							{{ m.active ? 'Активен' : 'Скрыт' }}
						</button>
						<button class="adm__icon-btn" @click="openEdit(m)" title="Редактировать">
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 2l2 2-8 8H2v-2l8-8z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
						</button>
						<button class="adm__icon-btn adm__icon-btn--danger" @click="deleteMaster(m.id)" title="Удалить">
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M5 4V3h4v1M6 7v4M8 7v4M3 4l1 8h6l1-8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<style lang="scss">
.adm__masters-list { display: flex; flex-direction: column; }

.adm__master-row {
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

.adm__master-info { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }

.adm__master-avatar {
	width: 38px; height: 38px;
	border-radius: 50%;
	background: linear-gradient(135deg, $roseGoldDark, $roseGold);
	display: flex; align-items: center; justify-content: center;
	font-family: $headingFont; font-size: 1rem; font-style: italic;
	color: $white; flex-shrink: 0;
	box-shadow: 0 0 12px rgba(196,129,139,0.3);
}

.adm__master-name { font-size: 0.92rem; font-weight: 500; color: $textPrimary; }
.adm__master-role-sub { font-size: 0.76rem; color: $roseGold; margin-top: 1px; }
.adm__master-spec { font-size: 0.72rem; color: $textMuted; margin-top: 1px; }
.adm__master-exp { font-size: 0.8rem; color: $textMuted; flex-shrink: 0; white-space: nowrap; }
</style>
