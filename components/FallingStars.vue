<!-- ─── Фоновая анимация падающих звёзд ───────────────────────────────────────
     Два диагональных «метеора» — position: fixed, z-index: 2, pointer-events: none.
     Анимация через CSS keyframes (не GSAP) — не требует JS, нет hydration-проблем.
     aria-hidden — скрыто от скринридеров (декоративный элемент). -->
<template>
	<div class="falling-stars" aria-hidden>
		<div class="falling-stars__star falling-stars__star--1" />
		<div class="falling-stars__star falling-stars__star--2" />
	</div>
</template>

<style lang="scss">
.falling-stars
{
	position: fixed;
	inset: 0;
	pointer-events: none;
	z-index: 2;
	overflow: hidden;
}

.falling-stars__star
{
	position: absolute;
	width: 1.5px;
	border-radius: 2px;
	opacity: 0;
	background: linear-gradient(
		180deg,
		transparent 0%,
		rgba(232,213,190,0.2) 20%,
		rgba(255,255,255,0.95) 50%,
		rgba(196,129,139,0.6) 80%,
		transparent 100%
	);
	transform: rotate(35deg);
	animation: star-fast linear infinite;

	&--1
	{
		left: 18%;
		top: -100px;
		height: 52px;
		animation-duration: 28s;
		animation-delay: 2s;
	}

	&--2
	{
		left: 72%;
		top: -100px;
		height: 44px;
		animation-duration: 34s;
		animation-delay: 14s;
	}
}

// The star falls quickly in the first 5% of the cycle, then is invisible
@keyframes star-fast {
	0% {
		opacity: 0;
		transform: rotate(35deg) translateY(-20px) translateX(-8px);
	}
	1.5% {
		opacity: 0.95;
	}
	5% {
		opacity: 0;
		transform: rotate(35deg) translateY(105vh) translateX(50vh);
	}
	5.01%, 100% {
		opacity: 0;
		transform: rotate(35deg) translateY(105vh) translateX(50vh);
	}
}
</style>
