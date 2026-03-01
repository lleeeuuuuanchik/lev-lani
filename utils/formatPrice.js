// ─── Форматирование цены в рублях ─────────────────────────────────────────────
// Использует Intl.NumberFormat — браузерный стандарт, не требует библиотек.
// Пример: formatPrice(4500) → '4 500 ₽'
// Используется в ServiceCard для отображения диапазонов цен из YAML-файлов.

export default function (value) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}
