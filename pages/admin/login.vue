<script setup>
definePageMeta({ layout: false });

useSeoMeta({ title: 'Вход — Lev & Lani Admin', robots: 'noindex, nofollow' });

const form = reactive({ email: '', password: '' });
const error = ref('');
const loading = ref(false);

const submit = async () => {
	error.value = '';
	loading.value = true;
	try {
		await $fetch('/api/auth/login', {
			method: 'POST',
			body: form,
		});
		await navigateTo('/admin');
	} catch {
		error.value = 'Неверный email или пароль';
	} finally {
		loading.value = false;
	}
};
</script>

<template>
	<div class="al">
		<!-- Background orbs -->
		<div class="al__orb al__orb--1" />
		<div class="al__orb al__orb--2" />

		<div class="al__card">
			<!-- Logo -->
			<div class="al__logo">
				<NuxtLink to="/" class="al__logo-link">
					<icons-logo />
				</NuxtLink>
			</div>

			<div class="al__head">
				<h1 class="al__title">Панель управления</h1>
				<p class="al__sub">Войдите, чтобы просматривать заявки</p>
			</div>

			<form class="al__form" @submit.prevent="submit" novalidate>
				<UiInput
					label="Email"
					type="email"
					placeholder="admin@levlani.com"
					:value="form.email"
					@update:value="form.email = $event"
				/>
				<UiInput
					label="Пароль"
					type="password"
					placeholder="••••••••"
					:value="form.password"
					@update:value="form.password = $event"
				/>

				<Transition name="fade-err">
					<div v-if="error" class="al__error">
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
							<circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.3" fill="none"/>
							<path d="M7 4v3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
							<circle cx="7" cy="10" r="0.7" fill="currentColor"/>
						</svg>
						{{ error }}
					</div>
				</Transition>

				<UiButton type="submit" :disabled="loading" class="al__btn">
					{{ loading ? 'Входим...' : 'Войти в панель' }}
				</UiButton>
			</form>

			<p class="al__note">
				<NuxtLink to="/" class="al__note-link">← Вернуться на сайт</NuxtLink>
			</p>
		</div>
	</div>
</template>

<style lang="scss">
.al {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: $bg;
	padding: 24px;
	position: relative;
	overflow: hidden;
}

.al__orb {
	position: absolute;
	border-radius: 50%;
	filter: blur(80px);
	pointer-events: none;

	&--1 {
		width: 500px; height: 500px;
		background: radial-gradient(circle, rgba(196,129,139,0.08) 0%, transparent 65%);
		top: -120px; right: -80px;
	}

	&--2 {
		width: 300px; height: 300px;
		background: radial-gradient(circle, rgba(232,213,190,0.05) 0%, transparent 65%);
		bottom: -60px; left: -40px;
	}
}

.al__card {
	width: 100%;
	max-width: 420px;
	background: rgba(255,255,255,0.025);
	border: 1px solid $border;
	border-radius: 20px;
	padding: 48px 40px 40px;
	display: flex;
	flex-direction: column;
	gap: 28px;
	position: relative;
	z-index: 1;
	backdrop-filter: blur(20px);

	@include mq(0, $tablet) {
		padding: 36px 24px 28px;
	}
}

.al__logo {
	display: flex;
	justify-content: center;
}

.al__logo-link {
	text-decoration: none;
}

.al__head {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	text-align: center;
}

.al__title {
	font-family: $headingFont;
	font-size: 1.7rem;
	font-weight: 300;
	color: $textPrimary;
	margin: 0;
}

.al__sub {
	font-size: 0.84rem;
	color: $textMuted;
	margin: 0;
}

.al__form {
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.al__error {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 11px 14px;
	background: rgba(255,77,109,0.08);
	border: 1px solid rgba(255,77,109,0.25);
	border-radius: 10px;
	font-size: 0.84rem;
	color: #ff4d6d;
}

.al__btn {
	width: 100%;
	justify-content: center;
	border-radius: 10px !important;
	padding: 13px !important;
	margin-top: 4px;
}

.al__note {
	text-align: center;
	margin: 0;
}

.al__note-link {
	font-size: 0.78rem;
	color: $textMuted;
	text-decoration: none;
	@include transition();
	&:hover { color: $roseGoldLight; }
}

.fade-err-enter-active,
.fade-err-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-err-enter-from,
.fade-err-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
