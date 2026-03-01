<!-- ─── Логотип салона — italic Cormorant Garamond + cosmic star ─────────────
     ВАЖНО: <span> имени стоят на ОДНОЙ строке без пробелов между тегами.
     SSR создаёт text-nodes из пробелов между inline-элементами → hydration mismatch.
     Используется в AppNavbar, AppFooter и admin сайдбаре через <icons-logo />. -->
<template>
	<div class="logo-mark">
		<svg class="logo-mark__star" width="10" height="10" viewBox="0 0 12 12" aria-hidden fill="none">
			<path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" fill="currentColor" />
		</svg>
		<div class="logo-mark__body">
			<div class="logo-mark__name"><span class="logo-mark__lev">Lev</span><span class="logo-mark__amp">&amp;</span><span class="logo-mark__lani">Lani</span></div>
			<span class="logo-mark__sub">Beauty Studio</span>
		</div>
	</div>
</template>

<style lang="scss">
.logo-mark
{
	display: inline-flex;
	align-items: center;
	gap: 8px;
}

.logo-mark__star
{
	color: $roseGold;
	filter: drop-shadow(0 0 5px rgba(196, 129, 139, 0.65));
	flex-shrink: 0;
	animation: logo-twinkle 4s ease-in-out infinite;
}

@keyframes logo-twinkle
{
	0%, 100% { opacity: 0.7; transform: scale(1) rotate(0deg); }
	50% { opacity: 1; transform: scale(1.15) rotate(22deg); }
}

.logo-mark__body
{
	display: flex;
	flex-direction: column;
	gap: 1px;
}

.logo-mark__name
{
	display: flex;
	align-items: center;
	gap: 2px;
	font-family: $headingFont;
	font-style: italic;
	font-weight: 300;
	font-size: 1.55rem;
	letter-spacing: -0.02em;
	line-height: 1.25;
}

.logo-mark__lev
{
	color: $champagne;
	font-family: $headingFont;
}

.logo-mark__amp
{
	font-size: 0.95rem;
	font-weight: 200;
	background: linear-gradient(110deg, $roseGold 0%, $champagne 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	padding: 0 2px;
}

.logo-mark__lani
{
	background: linear-gradient(110deg, $champagne 0%, $roseGoldLight 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	padding-right: 4px;
	font-family: $headingFont;
}

.logo-mark__sub
{
	font-size: 0.43rem;
	font-weight: 700;
	letter-spacing: 0.26em;
	text-transform: uppercase;
	color: rgba(196, 129, 139, 0.5);

	@include mq(0, $tablet) { display: none; }
}
</style>
