/**
 * Форматирует цену в рублях (локаль ru-RU).
 * Использует Intl.NumberFormat — браузерный стандарт, не требует библиотек.
 * @param {number} value - Сумма для форматирования
 * @returns {string} Строка вида "4 500 ₽"
 * @example formatPrice(4500) // "4 500 ₽"
 */
export default function formatPrice(value)
{
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(value);
}
