<script setup>
// ─── Текстовое поле — универсальный UI-компонент ─────────────────────────────
// Поддерживает:
//   isPhone — включает maska-маску +7 (###) ###-##-##
//   error / errorText — подсветка ошибки + текст под полем
//   label — подпись над полем (кликабельна, фокусирует input)
//   slot default — иконка справа внутри поля (напр. Eye для пароля)
// Использует паттерн :value + @input вместо v-model для совместимости с Vuelidate.

const props = defineProps({
	placeholder: { type: String, default: '' },
	errorText:   { type: String, default: '' },
	disabled:    { type: Boolean, default: false },
	isPhone:     { type: Boolean, default: false }, // включает maska маску
	value:       { type: String, required: true },
	label:       { type: String, default: '' },
	error:       { type: Boolean, default: false },
	type:        { type: String, default: 'text' },
	name:        { type: [String, Boolean], default: '' },
});
const emit = defineEmits(['update:value', 'triggerIcon']);

const focus = ref(false);
const inputRef = ref(null);

// Позволяет кликнуть по label и сфокусировать input
const focusInput  = () => { if (inputRef.value) inputRef.value.focus(); };
const updateValue = (value) => emit('update:value', value);

// Проверяем наличие слотового контента для условного рендера иконки
const slots = useSlots();
const hasSlotContent = slots.hasOwnProperty('default') && slots.default().length > 0;
</script>

<template>
	<div
		class="ui-input"
		:class="{
			'is-active':   focus || value,  // label подсвечивается при фокусе или заполненности
			'is-disabled': disabled,
			'is-error':    error,
		}"
	>
		<label v-if="label" class="ui-input__label" @click="focusInput">
			{{ label }}
		</label>

		<div class="ui-input__wr">
			<!-- Обычное поле без маски -->
			<input
				v-if="!isPhone"
				class="ui-input__field"
				ref="inputRef"
				:type="type"
				:value="value"
				:placeholder="placeholder"
				:disabled="disabled"
				:name="name"
				@focus="focus = true"
				@blur="focus = false"
				@input="updateValue($event.target.value)"
			/>
			<!-- Телефонное поле с маской +7 (###) ###-##-## через maska-директиву -->
			<input
				v-else
				class="ui-input__field"
				ref="inputRef"
				v-maska
				data-maska="+7 (###) ###-##-##"
				:type="type"
				:value="value"
				:placeholder="placeholder"
				:disabled="disabled"
				:name="name"
				@focus="focus = true"
				@blur="focus = false"
				@input="updateValue($event.target.value)"
			/>
			<!-- Иконка справа (напр. показать/скрыть пароль) — рендерится только если передан слот -->
			<div v-if="hasSlotContent" class="ui-input__icon" @click="emit('triggerIcon')">
				<slot />
			</div>
		</div>

		<span v-if="errorText" class="ui-input__error">{{ errorText }}</span>
	</div>
</template>

<style lang="scss">
.ui-input {
	display: flex;
	flex-direction: column;
	gap: 6px;

	&__label {
		font-size: 0.78rem;
		font-weight: 500;
		letter-spacing: 0.04em;
		color: $textSecondary;
		cursor: pointer;
		@include transition();
	}

	&__wr {
		position: relative;
	}

	&__field {
		width: 100%;
		padding: 11px 16px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid $border;
		border-radius: 10px;
		outline: none;
		color: $textPrimary;
		font-family: $firstFont;
		font-size: 0.9rem;
		@include transition();

		&::placeholder {
			color: $textMuted;
		}

		&:hover {
			border-color: $borderHover;
			background: rgba(255, 255, 255, 0.055);
		}

		&:disabled {
			opacity: 0.4;
			pointer-events: none;
		}
	}

	&__icon {
		position: absolute;
		top: 50%;
		right: 12px;
		transform: translateY(-50%);
		cursor: pointer;
		color: $textSecondary;
		line-height: 0;
		@include transition();

		&:hover { color: $textPrimary; }

		svg { width: 16px; height: 16px; }
	}

	&__error {
		font-size: 0.73rem;
		color: $red;
	}

	// States
	&.is-active .ui-input__field {
		border-color: $borderFocus;
		background: rgba(196, 129, 139, 0.04);
	}

	&.is-active .ui-input__label {
		color: $roseGoldLight;
	}

	&.is-error .ui-input__field {
		border-color: rgba(255, 77, 109, 0.5);
		background: rgba(255, 77, 109, 0.04);
	}
}
</style>
