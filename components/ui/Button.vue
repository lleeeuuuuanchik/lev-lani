<script setup>
// ─── Кнопка — универсальный UI-компонент ─────────────────────────────────────
// Поддерживает 4 варианта (variant) и 4 размера (size).
// Для анимации hover/active использует CSS-переходы, а не JS.
// Внутри два слоя: __bg (фоновый, меняется при hover) и __content (текст/иконка).
const props = defineProps({
	variant: String, // default (solid gradient) | ghost | border | outline
	size: String,    // sm | default | lg | xl
	disabled: Boolean,
});
</script>

<template>
	<button
		class="ui-button"
		:class="[
			variant && `ui-button--${variant}`,
			size && `ui-button--${size}`,
		]"
		:disabled="disabled"
	>
		<!-- Фоновый слой — используется в variant=border для градиентного фона -->
		<span class="ui-button__bg" aria-hidden />
		<!-- Контентный слой всегда поверх фона (z-index: 1) -->
		<span class="ui-button__content"><slot /></span>
	</button>
</template>

<style lang="scss">
// ─── Core ────────────────────────────────────────────────────
.ui-button {
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	cursor: pointer;
	outline: none;
	border: none;
	border-radius: 6px;
	padding: 11px 28px;
	font-family: $firstFont;
	font-size: 0.875rem;
	font-weight: 500;
	letter-spacing: 0.05em;
	white-space: nowrap;
	overflow: hidden;
	@include transition();
	isolation: isolate; // новый stacking context — дочерние z-index не вылезут за кнопку

	// ─── Default (primary): solid gradient ───────────────────
	background: linear-gradient(135deg, $roseGoldDark 0%, $roseGold 50%, $roseGoldLight 100%);
	color: $white;

	// Gradient border glow via box-shadow
	box-shadow:
		0 0 0 1px rgba(196,129,139,0.0),
		0 2px 12px rgba(196,129,139,0.0),
		inset 0 1px 0 rgba(255,255,255,0.12);

	&::before {
		// Hovering fill-brighten overlay
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%);
		opacity: 0;
		@include transition();
	}

	&:hover:not(:disabled) {
		transform: translateY(-3px);
		box-shadow:
			0 0 0 1px rgba(196,129,139,0.5),
			0 0 32px rgba(196,129,139,0.45),
			0 0 64px rgba(196,129,139,0.15),
			0 8px 24px rgba(196,129,139,0.25),
			inset 0 1px 0 rgba(255,255,255,0.2);

		&::before { opacity: 1; }
	}

	&:active:not(:disabled) {
		transform: translateY(-1px) scale(0.99);
		box-shadow:
			0 0 0 1px rgba(196,129,139,0.4),
			0 0 18px rgba(196,129,139,0.35),
			inset 0 2px 8px rgba(0,0,0,0.15);
	}

	&:disabled {
		opacity: 0.38;
		cursor: not-allowed;
	}

	// ─── Sizes ───────────────────────────────────────────────
	&--sm { padding: 7px 18px; font-size: 0.8rem; border-radius: 5px; }
	&--lg { padding: 14px 36px; font-size: 0.95rem; letter-spacing: 0.06em; }
	&--xl { padding: 16px 44px; font-size: 1rem; letter-spacing: 0.06em; }

	// ─── Ghost variant: transparent + subtle border ───────────
	&--ghost {
		background: transparent;
		color: $textSecondary;
		box-shadow: inset 0 0 0 1px $border;

		&::before { display: none; }

		.ui-button__bg { display: none; }

		&:hover:not(:disabled) {
			color: $textPrimary;
			background: rgba(255,255,255,0.05);
			box-shadow: inset 0 0 0 1px $borderHover;
			transform: none;
		}

		&:active:not(:disabled) {
			background: rgba(255,255,255,0.03);
			transform: none;
		}
	}

	// ─── Border variant: rose-gold gradient border + glow ────
	&--border {
		background: transparent;
		color: $roseGoldLight;
		// Multi-layer shadow: inner gradient border + outer glow
		box-shadow:
			inset 0 0 0 1px rgba(196,129,139,0.35),
			0 0 0 0 rgba(196,129,139,0);

		&::before { display: none; }

		.ui-button__bg {
			position: absolute;
			inset: 0;
			background: linear-gradient(135deg, rgba(196,129,139,0.08), rgba(232,213,190,0.04));
			opacity: 1;
		}

		&:hover:not(:disabled) {
			color: $champagne;
			box-shadow:
				inset 0 0 0 1px rgba(196,129,139,0.7),
				0 0 20px rgba(196,129,139,0.25),
				0 4px 16px rgba(196,129,139,0.15);
			transform: translateY(-2px);

			.ui-button__bg {
				background: linear-gradient(135deg, rgba(196,129,139,0.14), rgba(232,213,190,0.07));
			}
		}

		&:active:not(:disabled) {
			transform: translateY(0);
			box-shadow:
				inset 0 0 0 1px rgba(196,129,139,0.5),
				inset 0 2px 6px rgba(0,0,0,0.1);
		}
	}

	// ─── Outline variant: same as border but no bg fill ──────
	&--outline {
		background: transparent;
		color: $roseGold;
		box-shadow: inset 0 0 0 1px rgba(196,129,139,0.4);

		&::before { display: none; }
		.ui-button__bg { display: none; }

		&:hover:not(:disabled) {
			background: rgba(196,129,139,0.07);
			color: $roseGoldLight;
			box-shadow: inset 0 0 0 1px rgba(196,129,139,0.6);
			transform: none;
		}
	}
}

// ─── Hoverable bg layer ───────────────────────────────────────
.ui-button__bg {
	position: absolute;
	inset: 0;
	pointer-events: none;
}

// ─── Content (always above bg) ────────────────────────────────
.ui-button__content {
	position: relative;
	z-index: 1;
	display: inline-flex;
	align-items: center;
	gap: 8px;
}
</style>
