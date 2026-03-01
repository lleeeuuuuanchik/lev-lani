// ─── Плагин maska — маска для полей ввода ────────────────────────────────────
// Регистрирует директиву v-maska глобально для всего приложения.
// Используется в ui/Input.vue при isPhone=true:
//   <input v-maska data-maska="+7 (###) ###-##-##" ...>
// Работает и на сервере (SSR-совместим), маска применяется только в браузере.

import { vMaska } from "maska/vue";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("maska", vMaska);
});
