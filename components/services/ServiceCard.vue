<script setup>
import { Scissors, Palette, Wind, Hand, Eye, Sparkles, Star, Flower2, Gem, Heart } from 'lucide-vue-next';

const iconMap = {
	scissors: Scissors,
	palette: Palette,
	wind: Wind,
	hand: Hand,
	eye: Eye,
	sparkles: Sparkles,
	star: Star,
	flower2: Flower2,
	gem: Gem,
	heart: Heart,
};

const props = defineProps({
	title:       { type: String, required: true },
	description: { type: String, required: true },
	price:       { type: String, required: true },
	icon:        { type: String, default: 'sparkles' },
	index:       { type: Number, default: 0 },
});

const resolvedIcon = computed(() => iconMap[props.icon] ?? Sparkles);
</script>

<template>
	<!-- itemscope/itemtype — Schema.org Service микроразметка -->
	<a class="service-card" href="tel:+79627488383"
	   itemscope itemtype="https://schema.org/Service">

		<!-- Скрытые мета-данные: провайдер, зона, ссылка -->
		<meta itemprop="provider" content="Lev & Lani Beauty Studio">
		<meta itemprop="areaServed" content="Владикавказ">
		<link itemprop="url" href="https://levlani.ru/#services">

		<div class="service-card__head">
			<div class="service-card__icon">
				<component :is="resolvedIcon" :size="18" />
			</div>
			<span class="service-card__num">{{ String(index + 1).padStart(2, '0') }}</span>
		</div>

		<div class="service-card__body">
			<!-- itemprop="name" + "description" — индексируются поисковиком -->
			<h3 class="service-card__title" itemprop="name">{{ title }}</h3>
			<p class="service-card__desc" itemprop="description">{{ description }}</p>
		</div>

		<!-- Цена обёрнута в Offer — Google видит стоимость услуги -->
		<div class="service-card__foot" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
			<meta itemprop="priceCurrency" content="RUB">
			<meta itemprop="availability" content="https://schema.org/InStock">
			<span class="service-card__price" itemprop="price">{{ price }}</span>
			<span class="service-card__call">
				<svg width="13" height="13" viewBox="0 0 13 13" fill="none">
					<path d="M1.5 1.5h2.5l1.2 3L3.8 6s.8 1.7 2.4 2.7l1.3-1.3 3 1.3v2.5c-5.5 0-9-3.5-9-9z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" fill="none"/>
				</svg>
				Позвонить
			</span>
		</div>
	</a>
</template>

<style lang="scss">
.service-card {
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 28px;
	background: rgba(255, 255, 255, 0.025);
	border: 1px solid $border;
	border-radius: 16px;
	cursor: pointer;
	text-decoration: none;
	@include transition();
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(196, 129, 139, 0.04) 0%, transparent 60%);
		opacity: 0;
		@include transition();
	}

	&:hover {
		border-color: rgba(196, 129, 139, 0.2);
		background: rgba(255, 255, 255, 0.04);
		transform: translateY(-3px);
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(196, 129, 139, 0.08);

		&::before { opacity: 1; }

		.service-card__icon {
			background: rgba(196, 129, 139, 0.15);
			border-color: rgba(196, 129, 139, 0.3);
			color: $roseGoldLight;
		}

		.service-card__arrow {
			transform: translateX(3px);
			color: $roseGold;
		}
	}
}

.service-card__head {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}

.service-card__icon {
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid $border;
	border-radius: 10px;
	color: $roseGold;
	@include transition();
}

.service-card__num {
	font-size: 0.7rem;
	font-weight: 600;
	letter-spacing: 0.1em;
	color: $textMuted;
}

.service-card__body {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.service-card__title {
	font-family: $headingFont;
	font-size: 1.35rem;
	font-weight: 400;
	color: $textPrimary;
	line-height: 1.2;
}

.service-card__desc {
	font-size: 0.85rem;
	color: $textSecondary;
	line-height: 1.65;
}

.service-card__foot {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 16px;
	border-top: 1px solid $border;
}

.service-card__price {
	font-family: $headingFont;
	font-size: 1.1rem;
	font-weight: 400;
	color: $roseGold;
	letter-spacing: 0.01em;
}

.service-card__call {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	font-size: 0.78rem;
	font-weight: 500;
	color: $textMuted;
	@include transition();
}

.service-card:hover .service-card__call {
	color: $roseGold;
}
</style>
