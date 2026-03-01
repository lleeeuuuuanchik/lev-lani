<script setup>
/**
 * Секция записи: 2 колонки (инфо + форма). Vuelidate + maska для телефона. ClientOnly из-за Vuelidate/SSR.
 */

import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { useToast } from '@/composables/useToast';

// variables
const { showSuccess, showError } = useToast();
const { contactApi } = useApi();

const serviceOptions = [
	{ value: 'Стрижка', label: 'Стрижка' },
	{ value: 'Окрашивание', label: 'Окрашивание' },
	{ value: 'Укладка', label: 'Укладка' },
	{ value: 'Маникюр', label: 'Маникюр' },
	{ value: 'Брови и ресницы', label: 'Брови и ресницы' },
	{ value: 'Уход за лицом', label: 'Уход за лицом' },
];

const form = reactive({ name: '', phone: '', service: '', message: '' });

const rules = {
	name: { required },
	phone: { required, minLength: minLength(18) },
	service: { required },
};

const v$ = useVuelidate(rules, form);
const loading = ref(false);

// functions
const submit = async () =>
{
	const valid = await v$.value.$validate();
	if (!valid) return;
	loading.value = true;
	try
	{
		await contactApi.submitContact({ name: form.name, phone: form.phone, service: form.service, message: form.message });
		showSuccess('Заявка отправлена! Свяжемся с вами в ближайшее время.');
		form.name = ''; form.phone = ''; form.service = ''; form.message = '';
		v$.value.$reset();
	}
	catch
	{
		showError('Что-то пошло не так. Попробуйте ещё раз.');
	}
	finally
	{
		loading.value = false;
	}
};
</script>

<template>
	<!-- Schema.org LocalBusiness — дублирует JSON-LD в HTML-микроразметке -->
	<section id="contact" class="contact g-section"
	         itemscope itemtype="https://schema.org/BeautySalon">
		<!-- Скрытые мета-данные бизнеса — не видны пользователю, но читаются поисковиками -->
		<meta itemprop="name"        content="Lev & Lani Beauty Studio">
		<meta itemprop="telephone"   content="+79627488383">
		<meta itemprop="priceRange"  content="₽₽">
		<link itemprop="url"         href="https://levlani.ru">
		<link itemprop="sameAs"      href="https://www.instagram.com/lev_lani_/">
		<link itemprop="sameAs"      href="https://t.me/teoamor">
		<div class="contact__glow" />
		<div class="container contact__inner">

			<div class="contact__info">
				<span class="g-label">Запись</span>
				<h2 class="g-h2 contact__title">
					Начните свой<br>
					<em class="contact__title-em">путь к красоте</em>
				</h2>
				<p class="contact__text">
					Оставьте заявку — мы свяжемся в течение 30 минут и подберём
					удобное время для вас.
				</p>

				<div class="contact__details">
					<a href="tel:+79627488383" class="contact__detail" itemprop="telephone" content="+79627488383">
						<div class="contact__detail-icon">
							<svg width="15" height="15" viewBox="0 0 15 15" fill="none">
								<path d="M2 2h3l1.5 3.5L5 7s1 2 3 3l1.5-1.5L13 10v3c-7 0-11-4-11-11z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" fill="none"/>
							</svg>
						</div>
						<div>
							<div class="contact__detail-label">Телефон</div>
							<div class="contact__detail-value">+7 (962) 748-83-83</div>
						</div>
					</a>
				<!-- Адрес с PostalAddress микроразметкой -->
					<a class="contact__detail contact__detail--link" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress"
						href="https://2gis.ru/vladikavkaz/firm/70000001034069266" target="_blank" rel="noopener noreferrer">
						<meta itemprop="streetAddress"   content="ул. Астана Кесаева, 4">
						<meta itemprop="addressLocality" content="Владикавказ">
						<meta itemprop="addressRegion"   content="Северная Осетия — Алания">
						<meta itemprop="postalCode"      content="362000">
						<meta itemprop="addressCountry"  content="RU">
						<div class="contact__detail-icon">
							<svg width="15" height="15" viewBox="0 0 15 15" fill="none">
								<path d="M7.5 1C5 1 3 3 3 5.5c0 3.5 4.5 8.5 4.5 8.5S12 9 12 5.5C12 3 10 1 7.5 1z" stroke="currentColor" stroke-width="1.3" fill="none"/>
								<circle cx="7.5" cy="5.5" r="1.5" stroke="currentColor" stroke-width="1.3" fill="none"/>
							</svg>
						</div>
						<div>
							<div class="contact__detail-label">Адрес</div>
							<div class="contact__detail-value">ул. Астана Кесаева, 4, Владикавказ</div>
						</div>
					</a>
				<!-- openingHours: Google использует для карточки бизнеса -->
					<div class="contact__detail">
						<meta itemprop="openingHours" content="Mo-Su 09:00-19:00">
						<div class="contact__detail-icon">
							<svg width="15" height="15" viewBox="0 0 15 15" fill="none">
								<circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.3" fill="none"/>
								<path d="M7.5 4v4l2.5 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" fill="none"/>
							</svg>
						</div>
						<div>
							<div class="contact__detail-label">Часы работы</div>
							<div class="contact__detail-value">Ежедневно, 9:00–19:00</div>
						</div>
					</div>
				</div>
			</div>

			<ClientOnly>
				<form class="contact__form" @submit.prevent="submit" novalidate>
					<div class="contact__form-grid">
						<UiInput label="Имя" placeholder="Ваше имя" :value="form.name" :error="v$.name.$error" :error-text="v$.name.$error ? 'Введите ваше имя' : ''" @update:value="form.name = $event" />
						<UiInput label="Телефон" placeholder="+7 (___) ___-__-__" :is-phone="true" :value="form.phone" :error="v$.phone.$error" :error-text="v$.phone.$error ? 'Введите корректный номер' : ''" @update:value="form.phone = $event" />
					</div>

					<UiSelect
						label="Услуга"
						placeholder="Выберите услугу"
						:options="serviceOptions"
						:value="form.service"
						:error="v$.service.$error"
						error-text="Выберите услугу"
						@update:value="form.service = $event"
					/>

					<div class="contact__field-wrap">
						<label class="contact__field-label">Сообщение <span class="contact__optional">(необязательно)</span></label>
						<textarea class="contact__textarea" v-model="form.message" placeholder="Дополнительные пожелания..." rows="3" />
					</div>

					<UiButton type="submit" :disabled="loading" class="contact__submit">
						{{ loading ? 'Отправляем...' : 'Отправить заявку' }}
					</UiButton>

					<p class="contact__note">Нажимая кнопку, вы соглашаетесь с <NuxtLink to="/privacy" class="contact__note-link">политикой конфиденциальности</NuxtLink></p>
				</form>

				<template #fallback>
					<div class="contact__form">
						<UiSkeleton style="height:52px;border-radius:10px" />
						<UiSkeleton style="height:52px;border-radius:10px" />
						<UiSkeleton style="height:52px;border-radius:10px" />
						<UiSkeleton style="height:90px;border-radius:10px" />
						<UiSkeleton style="height:52px;border-radius:10px" />
					</div>
				</template>
			</ClientOnly>
		</div>
	</section>
</template>

<style lang="scss">
.contact {
	background: $bg;
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, $border 30%, $border 70%, transparent);
	}
}

.contact__glow {
	position: absolute;
	width: 500px; height: 500px;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(196,129,139,0.08) 0%, transparent 70%);
	filter: blur(60px);
	right: -80px; top: 50%;
	transform: translateY(-50%);
	pointer-events: none;
}

.contact__inner {
	display: grid;
	grid-template-columns: 1fr 1.2fr;
	gap: 80px;
	align-items: start;

	@include mq(0, $laptop) { grid-template-columns: 1fr; gap: 48px; }
}

.contact__info {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.contact__title {
	margin: 0;

	&-em {
		font-style: italic;
		background: linear-gradient(120deg, $roseGold 0%, $champagne 60%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
}

.contact__text {
	font-size: 0.92rem;
	color: $textSecondary;
	line-height: 1.75;
}

.contact__details {
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 8px;
}

.contact__detail {
	display: flex;
	align-items: flex-start;
	gap: 14px;
	padding: 16px;
	background: rgba(255,255,255,0.025);
	border: 1px solid $border;
	border-radius: 12px;
	text-decoration: none;
	@include transition();

	&:hover, &--link:hover {
		border-color: rgba(196,129,139,0.3);
		background: rgba(196,129,139,0.05);
		.contact__detail-icon { background: rgba(196,129,139,0.18); }
	}
}

.contact__detail-icon {
	width: 32px; height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(196,129,139,0.1);
	border: 1px solid rgba(196,129,139,0.2);
	border-radius: 8px;
	color: $roseGold;
	flex-shrink: 0;
	margin-top: 2px;
}

.contact__detail-label {
	font-size: 0.68rem;
	font-weight: 600;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: $roseGold;
	margin-bottom: 3px;
}

.contact__detail-value {
	font-size: 0.9rem;
	color: $textPrimary;
	font-weight: 450;
}

.contact__form {
	background: rgba(255,255,255,0.025);
	border: 1px solid $border;
	border-radius: 20px;
	padding: 36px;
	display: flex;
	flex-direction: column;
	gap: 18px;

	@include mq(0, $tablet) { padding: 24px; }
}

.contact__form-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 14px;

	@include mq(0, $tablet) { grid-template-columns: 1fr; }
}

.contact__field-wrap {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.contact__field-label {
	font-size: 0.78rem;
	font-weight: 500;
	letter-spacing: 0.04em;
	color: $textSecondary;
}

.contact__optional { color: $textMuted; font-weight: 400; }

.contact__textarea {
	width: 100%;
	padding: 11px 16px;
	background: rgba(255,255,255,0.04);
	border: 1px solid $border;
	border-radius: 10px;
	outline: none;
	color: $textPrimary;
	font-family: $firstFont;
	font-size: 0.9rem;
	resize: vertical;
	min-height: 90px;
	@include transition();

	&:hover { border-color: $borderHover; background: rgba(255,255,255,0.055); }
	&:focus { border-color: $borderFocus; background: rgba(196,129,139,0.04); }
	&::placeholder { color: $textMuted; }
}

.contact__submit {
	width: 100%;
	justify-content: center;
	border-radius: 10px !important;
	padding: 13px !important;
}

.contact__note {
	font-size: 0.72rem;
	color: $textMuted;
	text-align: center;
	line-height: 1.5;
}

.contact__note-link {
	color: $roseGold;
	text-decoration: none;
	@include transition();
	&:hover { color: $roseGoldLight; }
}
</style>
