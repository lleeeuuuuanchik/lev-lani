// ─── Обёртка над vue-toast-notification ──────────────────────────────────────
// Предоставляет showSuccess / showError — тонкая обёртка для удобства.
// $toast предоставляется через plugins/toaster.client.ts и доступен только
// на клиенте — вызывать эти функции нужно только в browser-контексте.

export const useToast = () => {
	const showSuccess = (text) => {
		const { $toast } = useNuxtApp();
		$toast.success(text);
	};

	const showError = (text) => {
		const { $toast } = useNuxtApp();
		$toast.error(text);
	};

	return { showSuccess, showError };
};
