<script setup>
/**
 * Футер: 3 колонки навигации + бренд (логотип, соцсети). Услуги из API.
 */

// variables
const year = new Date().getFullYear();
const { servicesApi } = useApi();
const { data: services } = servicesApi.getServices();

// functions
const scrollTo = (id) =>
{
	document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<template>
	<footer class="footer">
		<div class="footer__glow" />

		<div class="footer__top">
			<div class="container footer__top-inner">
				<!-- Brand -->
				<div class="footer__brand">
					<NuxtLink to="/" class="footer__logo">
						<icons-logo />
					</NuxtLink>
					<p class="footer__tagline">
						Место, где красота становится<br>
						<em>искусством каждого дня.</em>
					</p>
					<div class="footer__social">
						<a href="https://www.instagram.com/lev_lani_/" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Instagram">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
								<rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.5" fill="none"/>
								<circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
								<circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
							</svg>
						</a>
						<a href="https://t.me/teoamor" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Telegram">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
								<path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
							</svg>
						</a>
						<a href="https://wa.me/79627488383" class="footer__social-link" aria-label="WhatsApp">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
								<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
							</svg>
						</a>
					</div>
				</div>

				<!-- Navigation columns -->
				<div class="footer__nav">
					<div class="footer__col">
						<span class="footer__col-title">Услуги</span>
						<ul class="footer__list">
							<li v-for="s in services" :key="s.id">
								<a class="footer__link" @click.prevent="scrollTo('#services')">{{ s.title }}</a>
							</li>
						</ul>
					</div>

					<div class="footer__col">
						<span class="footer__col-title">Салон</span>
						<ul class="footer__list">
							<li><a class="footer__link" @click.prevent="scrollTo('#process')">Как мы работаем</a></li>
							<li><a class="footer__link" @click.prevent="scrollTo('#contact')">Записаться</a></li>
							<li><NuxtLink to="/admin" class="footer__link">Для администратора</NuxtLink></li>
						</ul>
					</div>

					<div class="footer__col">
						<span class="footer__col-title">Контакты</span>
						<ul class="footer__list">
							<li>
								<a href="tel:+79627488383" class="footer__link">
									+7 (962) 748-83-83
								</a>
							</li>
							<li>
								<a
									href="https://2gis.ru/vladikavkaz/firm/70000001034069266"
									target="_blank"
									rel="noopener noreferrer"
									class="footer__link footer__link--address"
								>
									ул. Астана Кесаева, 4
								</a>
							</li>
							<li><span class="footer__text">Ежедневно 9:00–19:00</span></li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="footer__bottom">
			<div class="container footer__bottom-inner">
				<span class="footer__copy">© {{ year }} Lev & Lani. Все права защищены.</span>
				<NuxtLink to="/privacy" class="footer__policy">Политика конфиденциальности</NuxtLink>
			</div>
		</div>
	</footer>
</template>

<style lang="scss">
.footer {
	background: $bg;
	position: relative;
	overflow: hidden;
	border-top: 1px solid $border;
}

.footer__glow {
	position: absolute;
	width: 400px; height: 400px;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(196,129,139,0.05) 0%, transparent 70%);
	filter: blur(60px);
	bottom: -100px; left: 50%;
	transform: translateX(-50%);
	pointer-events: none;
}

.footer__top {
	padding: 72px 0 56px;
}

.footer__top-inner {
	display: grid;
	grid-template-columns: 1.2fr 2fr;
	gap: 64px;
	align-items: start;

	@include mq(0, $laptop) {
		grid-template-columns: 1fr;
		gap: 48px;
	}
}

.footer__brand {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.footer__logo {
	text-decoration: none;
	display: inline-flex;
}

.footer__tagline {
	font-size: 0.9rem;
	color: $textSecondary;
	line-height: 1.7;

	em {
		font-style: italic;
		color: $champagneMuted;
	}
}

.footer__social {
	display: flex;
	gap: 8px;
}

.footer__social-link {
	width: 36px; height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(255,255,255,0.04);
	border: 1px solid $border;
	border-radius: 8px;
	color: $textSecondary;
	@include transition();

	&:hover {
		background: rgba(196,129,139,0.1);
		border-color: rgba(196,129,139,0.25);
		color: $roseGoldLight;
	}
}

.footer__nav {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 32px;

	@include mq(0, $tablet) {
		grid-template-columns: 1fr 1fr;
	}
}

.footer__col {
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.footer__col-title {
	font-size: 0.72rem;
	font-weight: 600;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: $roseGold;
}

.footer__list {
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.footer__link {
	font-size: 0.86rem;
	color: $textSecondary;
	text-decoration: none;
	cursor: pointer;
	@include transition();

	&:hover { color: $textPrimary; }

	&--address {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		color: $textMuted;
		&::before {
			content: '📍';
			font-size: 0.75rem;
		}
		&:hover { color: $roseGoldLight; }
	}
}

.footer__text {
	font-size: 0.86rem;
	color: $textMuted;
}

.footer__bottom {
	border-top: 1px solid $border;
	padding: 18px 0;
}

.footer__bottom-inner {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
}

.footer__copy {
	font-size: 0.78rem;
	color: $textMuted;
}

.footer__policy {
	font-size: 0.78rem;
	color: $textMuted;
	text-decoration: none;
	@include transition();
	&:hover { color: $textSecondary; }
}
</style>
