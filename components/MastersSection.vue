<script setup>
/**
 * Секция мастеров: основатель + карточки из API. Fade-in при скролле.
 */

import { useGsapAnimations } from '@/composables/useGsapAnimations';

// variables
const { animateFadeInUp } = useGsapAnimations();
const founder = {
	name: 'Меладзе Тея',
	role: 'Основатель · Стилист',
	spec: 'Стрижка · Окрашивание · Укладка',
	exp: '12 лет',
	initial: 'Т',
	quote: 'Красота — это не стандарт, это свобода быть собой',
	photo: '/images/founder.jpg',
};
const { mastersApi } = useApi();
const { data: masters } = await mastersApi.getMasters();

onMounted(() =>
{
	animateFadeInUp('.master-card', 0.1);
	animateFadeInUp('.founder-card', 0);
});
</script>

<template>
	<section class="masters g-section">
		<div class="masters__bg-text" aria-hidden>TEAM</div>

		<!-- Cosmic bg -->
		<div class="masters__stars" aria-hidden />
		<div class="masters__nebula masters__nebula--1" aria-hidden />
		<div class="masters__nebula masters__nebula--2" aria-hidden />

		<!-- Constellation top-left -->
		<svg class="masters__constellation" viewBox="0 0 200 180" fill="none" aria-hidden>
			<circle cx="15" cy="25" r="1.5" fill="rgba(196,129,139,0.5)"/>
			<circle cx="70" cy="50" r="2" fill="rgba(196,129,139,0.4)"/>
			<circle cx="130" cy="18" r="1.2" fill="rgba(255,255,255,0.3)"/>
			<circle cx="175" cy="65" r="1.8" fill="rgba(232,213,190,0.38)"/>
			<circle cx="45" cy="100" r="1" fill="rgba(255,255,255,0.22)"/>
			<circle cx="110" cy="130" r="1.5" fill="rgba(196,129,139,0.32)"/>
			<circle cx="170" cy="150" r="1" fill="rgba(232,213,190,0.25)"/>
			<line x1="15" y1="25" x2="70" y2="50" stroke="rgba(196,129,139,0.15)" stroke-width="0.7"/>
			<line x1="70" y1="50" x2="130" y2="18" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
			<line x1="70" y1="50" x2="175" y2="65" stroke="rgba(196,129,139,0.12)" stroke-width="0.6"/>
			<line x1="45" y1="100" x2="110" y2="130" stroke="rgba(196,129,139,0.10)" stroke-width="0.5"/>
			<line x1="110" y1="130" x2="170" y2="150" stroke="rgba(232,213,190,0.08)" stroke-width="0.5"/>
			<line x1="15" y1="25" x2="45" y2="100" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>
		</svg>

		<!-- Orbit rings -->
		<div class="masters__orbit masters__orbit--1" aria-hidden />
		<div class="masters__orbit masters__orbit--2" aria-hidden />

		<div class="container">
			<div class="masters__head">
				<span class="g-label">Команда</span>
				<h2 class="g-h2 masters__title">
					Мастера,<br>
					<em class="masters__title-em">которым доверяют</em>
				</h2>
				<p class="masters__sub">
					Каждый специалист — сертифицированный профессионал<br class="br-desktop">
					с многолетним опытом в индустрии красоты.
				</p>
			</div>

			<!-- Founder featured card -->
			<div class="founder-card">
				<div class="founder-card__glow" aria-hidden />

				<div class="founder-card__left">
					<!-- Photo or avatar -->
					<div class="founder-card__avatar-wrap">
						<img
							v-if="founder.photo"
							:src="founder.photo"
							:alt="founder.name"
							class="founder-card__photo"
							@error="$event.target.style.display='none'"
						/>
						<div class="founder-card__avatar" v-show="!founder.photo || true">{{ founder.initial }}</div>
						<div class="founder-card__avatar-ring" />
						<div class="founder-card__avatar-ring founder-card__avatar-ring--2" />
						<svg class="founder-card__avatar-stars" viewBox="0 0 120 120" fill="none" aria-hidden>
							<circle cx="10" cy="30" r="1.2" fill="rgba(196,129,139,0.6)"/>
							<circle cx="110" cy="25" r="1" fill="rgba(232,213,190,0.5)"/>
							<circle cx="60" cy="5" r="1.5" fill="rgba(255,255,255,0.4)"/>
							<circle cx="15" cy="90" r="1" fill="rgba(196,129,139,0.4)"/>
							<circle cx="105" cy="85" r="1.2" fill="rgba(232,213,190,0.45)"/>
						</svg>
					</div>

					<div class="founder-card__info">
						<div class="founder-card__badge">Основатель</div>
						<div class="founder-card__name">{{ founder.name }}</div>
						<div class="founder-card__role">{{ founder.role }}</div>
						<div class="founder-card__exp">
							<span class="founder-card__exp-dot" />
							{{ founder.exp }} опыта
						</div>
					</div>
				</div>

				<div class="founder-card__divider" />

				<div class="founder-card__right">
					<svg class="founder-card__quote-icon" width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden>
						<path d="M0 22V13.2C0 9.73333 0.933333 6.8 2.8 4.4C4.66667 1.93333 7.26667 0.266667 10.6 0L11.6 2C9.2 2.4 7.33333 3.46667 6 5.2C4.73333 6.86667 4.1 8.73333 4.1 10.8H7.8V22H0ZM16.4 22V13.2C16.4 9.73333 17.3333 6.8 19.2 4.4C21.0667 1.93333 23.6667 0.266667 27 0L28 2C25.6 2.4 23.7333 3.46667 22.4 5.2C21.1333 6.86667 20.5 8.73333 20.5 10.8H24.2V22H16.4Z" fill="currentColor"/>
					</svg>
					<blockquote class="founder-card__quote">{{ founder.quote }}</blockquote>
					<div class="founder-card__spec">{{ founder.spec }}</div>
				</div>
			</div>

			<!-- Regular masters grid (from DB) -->
			<div v-if="masters?.length" class="masters__grid">
				<div
					v-for="m in masters"
					:key="m.id"
					class="master-card"
				>
					<div class="master-card__avatar-wrap">
						<img
							v-if="m.photo"
							:src="m.photo"
							:alt="m.name"
							class="master-card__photo"
						/>
						<div class="master-card__avatar" v-else>{{ m.initial }}</div>
						<div class="master-card__avatar-ring" />
					</div>

					<div class="master-card__info">
						<div class="master-card__name">{{ m.name }}</div>
						<div class="master-card__role">{{ m.role }}</div>
					</div>

					<div class="master-card__divider" />

					<div class="master-card__meta">
						<div class="master-card__spec">{{ m.spec }}</div>
						<div class="master-card__exp">
							<span class="master-card__exp-dot" />
							{{ m.exp }} опыта
						</div>
					</div>
				</div>
			</div>

			<!-- Bottom CTA strip -->
			<div class="masters__strip">
				<p class="masters__strip-text">
					Хотите работать с нами?
					<span>Мы всегда ищем таланты.</span>
				</p>
				<a href="tel:+79627488383" class="masters__strip-link">
					Связаться с нами
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
						<path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.masters {
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

.masters__stars {
	position: absolute;
	inset: 0;
	pointer-events: none;
	z-index: 0;

	&::after {
		content: '';
		position: absolute;
		top: 0; left: 0;
		width: 1px; height: 1px;
		border-radius: 50%;
		background: transparent;
		box-shadow:
			40px 22px 0 0 rgba(255,255,255,0.13),
			120px 45px 0 0 rgba(196,129,139,0.16),
			220px 12px 0 0 rgba(255,255,255,0.10),
			340px 58px 0 0 rgba(232,213,190,0.11),
			470px 30px 0 0 rgba(255,255,255,0.13),
			590px 52px 0 0 rgba(196,129,139,0.13),
			720px 18px 0 0 rgba(255,255,255,0.10),
			860px 44px 0 0 rgba(232,213,190,0.12),
			980px 26px 0 0 rgba(255,255,255,0.11),
			1080px 55px 0 0 rgba(196,129,139,0.14);
	}
}

.masters__nebula {
	position: absolute;
	border-radius: 50%;
	filter: blur(65px);
	pointer-events: none;
	z-index: 0;

	&--1 {
		width: 480px; height: 260px;
		background: radial-gradient(ellipse, rgba(196,129,139,0.08) 0%, transparent 70%);
		top: -60px; left: -80px;
	}

	&--2 {
		width: 360px; height: 200px;
		background: radial-gradient(ellipse, rgba(232,213,190,0.05) 0%, transparent 70%);
		bottom: -40px; right: 10%;
	}
}

.masters__constellation {
	position: absolute;
	bottom: 0; left: 2%;
	width: 200px; height: 180px;
	pointer-events: none;
	z-index: 0;
	opacity: 0.8;
}

.masters__orbit {
	position: absolute;
	border-radius: 50%;
	border: 1px solid rgba(196,129,139,0.04);
	pointer-events: none;
	right: -200px;
	top: 50%;

	&--1 { width: 600px; height: 600px; margin-top: -300px; }
	&--2 { width: 380px; height: 380px; margin-top: -190px; border-color: rgba(232,213,190,0.03); }
}

.masters__bg-text {
	position: absolute;
	top: 50%; right: -60px;
	transform: translateY(-50%);
	font-family: $headingFont;
	font-size: clamp(8rem, 18vw, 16rem);
	font-weight: 300;
	font-style: italic;
	color: transparent;
	-webkit-text-stroke: 1px rgba(255,255,255,0.025);
	pointer-events: none;
	user-select: none;
	letter-spacing: 0.08em;
}

.masters__head {
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-bottom: 56px;
	max-width: 600px;
	position: relative;
	z-index: 1;
}

.masters__title { margin: 0; }

.masters__title-em {
	font-style: italic;
	background: linear-gradient(120deg, $roseGold 0%, $champagne 60%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.masters__sub {
	font-size: 0.92rem;
	color: $textSecondary;
	line-height: 1.75;
	.br-desktop { display: none; @include mq($laptop) { display: block; } }
}

// ─── Founder featured card (цвета от темы: --accent, --accent-rgb) ───────────
.founder-card {
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	gap: 48px;
	background: rgba(var(--accent-rgb), 0.04);
	border: 1px solid rgba(var(--accent-rgb), 0.2);
	border-radius: 24px;
	padding: 40px 48px;
	margin-bottom: 24px;
	overflow: hidden;
	@include transition();

	&:hover {
		border-color: rgba(var(--accent-rgb), 0.35);
		box-shadow: 0 0 60px var(--accent-glow);
	}
	&:hover .founder-card__glow { opacity: 1; }

	@include mq(0, $laptop) { flex-direction: column; align-items: flex-start; gap: 32px; padding: 32px 28px; }
}

.founder-card__glow {
	position: absolute;
	inset: 0;
	background: radial-gradient(ellipse at 30% 50%, rgba(var(--accent-rgb), 0.06) 0%, transparent 60%);
	opacity: 0;
	@include transition();
	pointer-events: none;
}

.founder-card__left {
	display: flex;
	align-items: center;
	gap: 28px;
	flex-shrink: 0;

	@include mq(0, $tablet) { flex-direction: column; align-items: flex-start; gap: 20px; }
}

.founder-card__avatar-wrap {
	position: relative;
	width: 96px; height: 96px;
	flex-shrink: 0;
}

.founder-card__photo {
	width: 96px; height: 96px;
	border-radius: 50%;
	object-fit: cover;
	object-position: center top;
	position: relative;
	z-index: 1;
	box-shadow: 0 0 30px rgba(var(--accent-rgb), 0.3);
}

.founder-card__avatar {
	width: 96px; height: 96px;
	border-radius: 50%;
	background: linear-gradient(135deg, var(--accent-dark), var(--accent));
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: $headingFont;
	font-size: 2.2rem;
	font-weight: 300;
	color: $white;
	position: absolute;
	inset: 0;
	z-index: 0;
	box-shadow: 0 0 30px rgba(var(--accent-rgb), 0.3);
}

.founder-card__avatar-ring {
	position: absolute;
	border-radius: 50%;
	border: 1px solid rgba(var(--accent-rgb), 0.35);
	@include transition();
	pointer-events: none;
}
.founder-card__avatar-ring:first-of-type { inset: -8px; }
.founder-card__avatar-ring--2 { inset: -16px; border-color: rgba(var(--accent-rgb), 0.15); }

.founder-card__avatar-stars {
	position: absolute;
	inset: -20px;
	width: calc(100% + 40px);
	height: calc(100% + 40px);
	pointer-events: none;
}

.founder-card__info { display: flex; flex-direction: column; gap: 6px; }

.founder-card__badge {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 3px 10px;
	background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.18), rgba(var(--accent-rgb), 0.08));
	border: 1px solid rgba(var(--accent-rgb), 0.3);
	border-radius: 4px;
	font-size: 0.68rem;
	font-weight: 600;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: var(--accent-light);
	width: fit-content;
}
.founder-card__badge::before {
	content: '';
	width: 5px; height: 5px;
	border-radius: 50%;
	background: var(--accent);
	box-shadow: 0 0 6px var(--accent);
}

.founder-card__name { font-size: 1.3rem; font-weight: 500; color: $textPrimary; font-family: $headingFont; }
.founder-card__role { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); }
.founder-card__exp { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: $textMuted; margin-top: 2px; }
.founder-card__exp-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

.founder-card__divider {
	width: 1px;
	align-self: stretch;
	background: linear-gradient(180deg, transparent, $border 20%, $border 80%, transparent);
	flex-shrink: 0;

	@include mq(0, $laptop) { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, $border 20%, $border 80%, transparent); align-self: auto; }
}

.founder-card__right { flex: 1; display: flex; flex-direction: column; gap: 16px; }
.founder-card__quote-icon { color: rgba(var(--accent-rgb), 0.25); flex-shrink: 0; }

.founder-card__quote {
	font-family: $headingFont;
	font-size: clamp(1.1rem, 2vw, 1.4rem);
	font-weight: 300;
	font-style: italic;
	color: $textPrimary;
	line-height: 1.5;
	margin: 0;
}

.founder-card__spec { font-size: 0.8rem; color: $textSecondary; }

// ─── Regular masters grid ─────────────────────────────────────
.masters__grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 16px;
	margin-bottom: 40px;
	position: relative;
	z-index: 1;

	@include mq(0, $tablet) { grid-template-columns: 1fr 1fr; }
}

.master-card {
	background: rgba(255,255,255,0.025);
	border: 1px solid $border;
	border-radius: 20px;
	padding: 28px 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	text-align: center;
	@include transition();
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(196,129,139,0.05) 0%, transparent 60%);
		opacity: 0;
		@include transition();
	}

	&:hover {
		border-color: rgba(196,129,139,0.2);
		transform: translateY(-4px);
		box-shadow: 0 16px 48px rgba(0,0,0,0.3);

		&::before { opacity: 1; }
		.master-card__avatar-ring { opacity: 1; transform: scale(1.05); }
	}
}

.master-card__avatar-wrap { position: relative; width: 72px; height: 72px; }

.master-card__photo {
	width: 72px; height: 72px;
	border-radius: 50%;
	object-fit: cover;
	object-position: center top;
	position: relative;
	z-index: 1;
}

.master-card__avatar {
	width: 72px; height: 72px;
	border-radius: 50%;
	background: linear-gradient(135deg, $roseGoldDark, $roseGold);
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: $headingFont;
	font-size: 1.6rem;
	font-weight: 300;
	color: $white;
	@include transition();
	position: relative;
	z-index: 1;
}

.master-card__avatar-ring {
	position: absolute;
	inset: -6px;
	border-radius: 50%;
	border: 1px solid rgba(196,129,139,0.3);
	opacity: 0;
	@include transition();
}

.master-card__info { display: flex; flex-direction: column; gap: 4px; }
.master-card__name { font-size: 0.95rem; font-weight: 500; color: $textPrimary; }
.master-card__role { font-size: 0.74rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: $roseGold; }
.master-card__divider { width: 32px; height: 1px; background: $border; }
.master-card__meta { display: flex; flex-direction: column; gap: 6px; }
.master-card__spec { font-size: 0.78rem; color: $textSecondary; }
.master-card__exp { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 0.74rem; color: $textMuted; }
.master-card__exp-dot { width: 4px; height: 4px; border-radius: 50%; background: $roseGold; flex-shrink: 0; }

// Strip
.masters__strip {
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
	padding: 24px 32px;
	background: rgba(255,255,255,0.018);
	border: 1px solid $border;
	border-radius: 16px;
	flex-wrap: wrap;

	@include mq(0, $tablet) { flex-direction: column; align-items: flex-start; }
}

.masters__strip-text { font-size: 0.95rem; color: $textSecondary; margin: 0; span { color: $textMuted; margin-left: 6px; } }

.masters__strip-link {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	font-size: 0.86rem;
	font-weight: 500;
	color: $roseGoldLight;
	text-decoration: none;
	@include transition();
	&:hover { color: $champagne; svg { transform: translateX(3px); } }
	svg { @include transition(); }
}
</style>
