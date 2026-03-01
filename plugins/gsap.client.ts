// ─── Плагин GSAP — регистрация ScrollTrigger ─────────────────────────────────
// Файл с суффиксом .client.ts — выполняется только в браузере, не на сервере.
// Регистрируем ScrollTrigger глобально один раз при старте приложения.
// Через provide экспортируем $gsap и $ScrollTrigger — доступны в любом компоненте
// через useNuxtApp().$gsap, однако в проекте GSAP импортируется динамически
// напрямую в composables/useGsapAnimations.ts (так удобнее для tree-shaking).

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineNuxtPlugin(() => {
	// Регистрация плагина необходима один раз — все последующие fromTo/to будут
	// корректно создавать ScrollTrigger-инстансы
	gsap.registerPlugin(ScrollTrigger);

	return {
		provide: {
			gsap,
			ScrollTrigger,
		},
	};
});
