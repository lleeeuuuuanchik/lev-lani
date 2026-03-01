<script setup>
const props = defineProps({
	value:     { type: String, required: true },
	options:   { type: Array, default: () => [] },   // [{ value, label }]
	label:     { type: String, default: '' },
	placeholder: { type: String, default: 'Выберите...' },
	error:     { type: Boolean, default: false },
	errorText: { type: String, default: '' },
});

const emit = defineEmits(['update:value']);

const open = ref(false);
const wrapRef = ref(null);
const triggerRef = ref(null);
const dropdownRef = ref(null);
const dropStyle = ref({});

const selectedLabel = computed(() => {
	const opt = props.options.find(o => o.value === props.value);
	return opt ? opt.label : '';
});

const updatePosition = () => {
	const rect = triggerRef.value?.getBoundingClientRect();
	if (!rect) return;
	dropStyle.value = {
		position: 'fixed',
		top: rect.bottom + 6 + 'px',
		left: rect.left + 'px',
		width: rect.width + 'px',
		zIndex: 9999,
	};
};

const toggle = () => {
	if (!open.value) updatePosition();
	open.value = !open.value;
};

const select = (opt) => {
	emit('update:value', opt.value);
	open.value = false;
};

const handleKeydown = (e) => {
	if (e.key === 'Escape') open.value = false;
};

onMounted(() => {
	document.addEventListener('click', (e) => {
		const inTrigger = wrapRef.value?.contains(e.target);
		const inDropdown = dropdownRef.value?.contains(e.target);
		if (!inTrigger && !inDropdown) open.value = false;
	});
	window.addEventListener('scroll', () => { open.value = false; }, { passive: true });
	window.addEventListener('resize', () => { if (open.value) updatePosition(); }, { passive: true });
});
</script>

<template>
	<div class="ui-select" :class="{ 'is-open': open, 'is-error': error, 'is-filled': value }" ref="wrapRef">
		<label v-if="label" class="ui-select__label">{{ label }}</label>

		<div ref="triggerRef" class="ui-select__trigger" @click="toggle" @keydown="handleKeydown" tabindex="0">
			<span :class="value ? 'ui-select__value' : 'ui-select__placeholder'">
				{{ selectedLabel || placeholder }}
			</span>
			<svg class="ui-select__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
				<path d="M2 4.5l5 5 5-5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>

		<Teleport to="body">
			<Transition name="select-drop">
				<div v-if="open" ref="dropdownRef" class="ui-select__dropdown" :style="dropStyle">
					<div
						v-for="opt in options"
						:key="opt.value"
						class="ui-select__option"
						:class="{ 'is-active': opt.value === value }"
						@click="select(opt)"
					>
						<span>{{ opt.label }}</span>
						<svg v-if="opt.value === value" width="13" height="13" viewBox="0 0 13 13" fill="none">
							<path d="M1.5 6.5l3.5 3.5 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
				</div>
			</Transition>
		</Teleport>

		<span v-if="error && errorText" class="ui-select__error">{{ errorText }}</span>
	</div>
</template>

<style lang="scss">
.ui-select {
	display: flex;
	flex-direction: column;
	gap: 6px;
	position: relative;

	&__label {
		font-size: 0.78rem;
		font-weight: 500;
		letter-spacing: 0.04em;
		color: $textSecondary;
		cursor: pointer;
		@include transition();
	}

	&__trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding: 11px 16px;
		background: rgba(255,255,255,0.04);
		border: 1px solid $border;
		border-radius: 10px;
		cursor: pointer;
		outline: none;
		@include transition();
		user-select: none;

		&:hover {
			border-color: $borderHover;
			background: rgba(255,255,255,0.055);
		}
	}

	&__value {
		font-size: 0.9rem;
		color: $textPrimary;
	}

	&__placeholder {
		font-size: 0.9rem;
		color: $textMuted;
	}

	&__arrow {
		color: $textSecondary;
		flex-shrink: 0;
		@include transition();
	}

	&__dropdown {
		background: $bgCard2;
		border: 1px solid $borderHover;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 8px 32px rgba(0,0,0,0.5);
	}

	&__option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 16px;
		font-size: 0.88rem;
		color: $textSecondary;
		cursor: pointer;
		@include transition();

		&:hover { background: rgba(255,255,255,0.05); color: $textPrimary; }
		&.is-active { color: $roseGoldLight; }
	}

	&__error {
		font-size: 0.73rem;
		color: $red;
	}

	// States
	&.is-open {
		.ui-select__trigger {
			border-color: $borderFocus;
			background: rgba(196,129,139,0.04);
		}
		.ui-select__arrow { transform: rotate(180deg); }
		.ui-select__label { color: $roseGoldLight; }
	}

	&.is-filled .ui-select__label { color: $roseGoldLight; }

	&.is-error .ui-select__trigger {
		border-color: rgba(255,77,109,0.5);
		background: rgba(255,77,109,0.04);
	}
}

// Dropdown transition
.select-drop-enter-active,
.select-drop-leave-active {
	transition: opacity 0.15s ease, transform 0.15s ease;
}
.select-drop-enter-from,
.select-drop-leave-to {
	opacity: 0;
	transform: translateY(-6px);
}
</style>
