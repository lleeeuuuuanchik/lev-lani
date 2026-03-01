// ─── Pinia стор — модальный диалог подтверждения ─────────────────────────────
// Используется в админке для опасных действий (удаление услуги, мастера и т.д.).
// Компонент UiConfirmDialog подключён глобально в layouts/default.vue через Teleport.
//
// Использование:
//   const store = useConfirmDialogStore();
//   store.openDialog({
//     title: 'Удалить услугу?',
//     message: 'Это действие нельзя отменить.',
//     onConfirm: () => deleteService(id),
//   });

export const useConfirmDialogStore = defineStore('confirmDialog', () => {
	// Callback-и сохраняются как ref — вызываются при нажатии кнопок в диалоге
	const confirmAction = ref(null);
	const cancelAction  = ref(null);
	const message       = ref('Вы уверены, что хотите выполнить это действие?');
	const isOpen        = ref(false);
	const title         = ref('Подтвердите действие');

	// Открывает диалог с переданными опциями.
	// onConfirm и onCancel — необязательные callbacks (по умолчанию no-op).
	const openDialog = (options) => {
		confirmAction.value = options.onConfirm || (() => {});
		cancelAction.value  = options.onCancel  || (() => {});
		message.value       = options.message   || 'Вы уверены, что хотите выполнить это действие?';
		isOpen.value        = true;
		title.value         = options.title     || 'Подтвердите действие';
	};

	const closeDialog = () => { isOpen.value = false; };

	// Вызывает onConfirm и закрывает диалог
	const confirm = () => {
		if (confirmAction.value) confirmAction.value();
		closeDialog();
	};

	// Вызывает onCancel и закрывает диалог
	const cancel = () => {
		if (cancelAction.value) cancelAction.value();
		closeDialog();
	};

	return {
		isOpen,
		title,
		message,
		openDialog,
		closeDialog,
		confirm,
		cancel,
	};
});
