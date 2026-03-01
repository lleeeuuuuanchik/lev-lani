// ─── Плагин SSR-ширина viewport ───────────────────────────────────────────────
// При SSR браузер неизвестен — VueUse composables (useWindowSize и т.д.)
// вернули бы width=0. provideSSRWidth(1024) устанавливает «дефолтную» ширину
// для серверного рендера, убирая гидрационные несоответствия.
// 1024px — стандартное значение, близкое к ноутбуку (условный "desktop-first").

import { provideSSRWidth } from '@vueuse/core';

export default defineNuxtPlugin((nuxtApp) => {
	provideSSRWidth(1024, nuxtApp.vueApp);
})
