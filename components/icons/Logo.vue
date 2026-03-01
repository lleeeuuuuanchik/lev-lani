<!-- ─── Логотип салона ─────────────────────────────────────────────────────────
     Состав: иконка-алмаз (пульсирующий SVG) + "Lev & Lani" (Cormorant Garamond)
     + подпись "Beauty Studio" (скрывается на мобильных через mq-миксин).
     Используется в AppNavbar и AppFooter через <icons-logo />.
     Амперсанд и "Lani" получают rose-gold градиент через -webkit-text-fill-color. -->
<template>
	<div class="logo-mark">
		<div class="logo-mark__gem" aria-hidden>
			<svg width="11" height="11" viewBox="0 0 12 12" fill="none">
				<path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" fill="currentColor"/>
			</svg>
		</div>
		<div class="logo-mark__name">
			<span class="logo-mark__lev">Lev</span>
			<span class="logo-mark__amp">&</span>
			<span class="logo-mark__lani">Lani</span>
		</div>
		<span class="logo-mark__sub">Beauty Studio</span>
	</div>
</template>

<style lang="scss">
.logo-mark {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	text-decoration: none;
	line-height: 1;
}

.logo-mark__gem {
	color: $roseGold;
	animation: logo-gem-pulse 3s ease-in-out infinite;
	flex-shrink: 0;
	filter: drop-shadow(0 0 4px rgba(196,129,139,0.6));
}

@keyframes logo-gem-pulse {
	0%, 100% { opacity: 0.85; transform: scale(1) rotate(0deg); }
	50%       { opacity: 1;    transform: scale(1.15) rotate(15deg); filter: drop-shadow(0 0 9px rgba(196,129,139,0.9)); }
}

.logo-mark__name {
	display: flex;
	align-items: baseline;
	gap: 4px;
	font-family: $headingFont;
	font-weight: 400;
	font-size: 1.5rem;
	letter-spacing: 0.02em;
}

.logo-mark__lev {
	color: $champagne;
	font-weight: 300;
}

.logo-mark__amp {
	font-style: italic;
	font-size: 1.1rem;
	background: linear-gradient(120deg, $roseGold, $champagne);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	padding: 0 1px;
}

.logo-mark__lani {
	font-style: italic;
	background: linear-gradient(120deg, $roseGold, $champagne);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.logo-mark__sub {
	font-size: 0.56rem;
	font-weight: 600;
	letter-spacing: 0.22em;
	text-transform: uppercase;
	color: rgba(196,129,139,0.5);
	align-self: flex-end;
	margin-bottom: 2px;

	@include mq(0, $tablet) {
		display: none;
	}
}
</style>
