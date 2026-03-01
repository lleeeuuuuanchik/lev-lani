// ─── Плагин уведомлений (vue-toast-notification) ─────────────────────────────
// Файл с суффиксом .client.ts — только браузер (toasty не нужны на сервере).
// Предоставляет $toast через provide — доступен в composables/useToast.js.
// theme-bootstrap.css — базовые стили уведомлений (переопределяются в SCSS).
//
// Использование через composable:
//   const { showSuccess, showError } = useToast();
//   showSuccess('Заявка отправлена!');

import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

export default defineNuxtPlugin(() => {
	const toast = useToast({
		position: 'top', // уведомления появляются сверху по центру
	});
	return {
		provide: { toast },
	};
});
