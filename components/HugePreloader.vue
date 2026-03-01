<template>
	<Transition name="preloader" appear>
		<div class="preloader">
			<div class="preloader__gem-wrap" aria-hidden>
				<svg class="preloader__gem" width="32" height="32" viewBox="0 0 12 12" fill="none">
					<path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" fill="currentColor"/>
				</svg>
			</div>
			<span class="preloader__name">Lev <em>&amp;</em> Lani</span>
		</div>
	</Transition>
</template>

<style lang="scss">
.preloader
{
	position: fixed;
	inset: 0;
	z-index: 9999;
	background: $bg;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 18px;
}

.preloader__gem-wrap
{
	color: $roseGold;
	animation: preloader-spin 1.4s ease-in-out infinite;
	filter: drop-shadow(0 0 12px rgba(196, 129, 139, 0.7));
}

@keyframes preloader-spin
{
	0%   { transform: rotate(0deg) scale(1); opacity: 0.85; }
	50%  { transform: rotate(180deg) scale(1.3); opacity: 1; }
	100% { transform: rotate(360deg) scale(1); opacity: 0.85; }
}

.preloader__name
{
	font-family: $headingFont;
	font-style: italic;
	font-weight: 300;
	font-size: 1.3rem;
	letter-spacing: 0.12em;
	color: $textMuted;
}

.preloader__name em
{
	font-style: normal;
	background: linear-gradient(110deg, $roseGold, $champagne);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	padding: 0 4px;
}

.preloader-enter-active { transition: opacity 0.2s ease; }
.preloader-leave-active { transition: opacity 0.3s ease; }
.preloader-enter-from,
.preloader-leave-to { opacity: 0; }
</style>
