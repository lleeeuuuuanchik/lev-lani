<script setup>
/**
 * Кнопка: variant (default | ghost | border | outline), size (sm | lg | xl).
 * Два слоя: __bg и __content. Анимация через CSS.
 */

// props
const props = defineProps({
	variant: { type: String, default: '' }, // default | ghost | border | outline
	size: { type: String, default: '' },    // sm | lg | xl
	disabled: { type: Boolean, default: false },
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
.ui-button
{
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
	isolation: isolate;
	background: linear-gradient(135deg, $roseGoldDark 0%, $roseGold 50%, $roseGoldLight 100%);
	color: $white;
	box-shadow:
		0 0 0 1px rgba(196,129,139,0.0),
		0 2px 12px rgba(196,129,139,0.0),
		inset 0 1px 0 rgba(255,255,255,0.12);

	&::before
	{
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%);
		opacity: 0;
		@include transition();
	}

	&:hover:not(:disabled)
	{
		transform: translateY(-3px);
		box-shadow:
			0 0 0 1px rgba(196,129,139,0.5),
			0 0 32px rgba(196,129,139,0.45),
			0 0 64px rgba(196,129,139,0.15),
			0 8px 24px rgba(196,129,139,0.25),
			inset 0 1px 0 rgba(255,255,255,0.2);
	}

	&:hover:not(:disabled)::before { opacity: 1; }

	&:active:not(:disabled)
	{
		transform: translateY(-1px) scale(0.99);
		box-shadow:
			0 0 0 1px rgba(196,129,139,0.4),
			0 0 18px rgba(196,129,139,0.35),
			inset 0 2px 8px rgba(0,0,0,0.15);
	}

	&:disabled
	{
		opacity: 0.38;
		cursor: not-allowed;
	}

	&--sm { padding: 7px 18px; font-size: 0.8rem; border-radius: 5px; }
	&--lg { padding: 14px 36px; font-size: 0.95rem; letter-spacing: 0.06em; }
	&--xl { padding: 16px 44px; font-size: 1rem; letter-spacing: 0.06em; }

	&--ghost
	{
		background: transparent;
		color: $textSecondary;
		box-shadow: inset 0 0 0 1px $border;

		&::before { display: none; }

		&:hover:not(:disabled)
		{
			color: $textPrimary;
			background: rgba(255,255,255,0.05);
			box-shadow: inset 0 0 0 1px $borderHover;
			transform: none;
		}

		&:active:not(:disabled)
		{
			background: rgba(255,255,255,0.03);
			transform: none;
		}
	}

	&--ghost .ui-button__bg { display: none; }

	&--border
	{
		background: transparent;
		color: $roseGoldLight;
		box-shadow:
			inset 0 0 0 1px rgba(196,129,139,0.35),
			0 0 0 0 rgba(196,129,139,0);

		&::before { display: none; }

		&:hover:not(:disabled)
		{
			color: $champagne;
			box-shadow:
				inset 0 0 0 1px rgba(196,129,139,0.7),
				0 0 20px rgba(196,129,139,0.25),
				0 4px 16px rgba(196,129,139,0.15);
			transform: translateY(-2px);
		}

		&:active:not(:disabled)
		{
			transform: translateY(0);
			box-shadow:
				inset 0 0 0 1px rgba(196,129,139,0.5),
				inset 0 2px 6px rgba(0,0,0,0.1);
		}
	}

	&--border .ui-button__bg
	{
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(196,129,139,0.08), rgba(232,213,190,0.04));
		opacity: 1;
	}

	&--border:hover:not(:disabled) .ui-button__bg
	{
		background: linear-gradient(135deg, rgba(196,129,139,0.14), rgba(232,213,190,0.07));
	}

	&--outline
	{
		background: transparent;
		color: $roseGold;
		box-shadow: inset 0 0 0 1px rgba(196,129,139,0.4);

		&::before { display: none; }

		&:hover:not(:disabled)
		{
			background: rgba(196,129,139,0.07);
			color: $roseGoldLight;
			box-shadow: inset 0 0 0 1px rgba(196,129,139,0.6);
			transform: none;
		}
	}

	&--outline .ui-button__bg { display: none; }
}

.ui-button__bg
{
	position: absolute;
	inset: 0;
	pointer-events: none;
}

.ui-button__content
{
	position: relative;
	z-index: 1;
	display: inline-flex;
	align-items: center;
	gap: 8px;
}
</style>
