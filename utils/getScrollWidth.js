// ─── Вычисление ширины полосы прокрутки ──────────────────────────────────────
// Разница window.innerWidth − clientWidth = ширина scrollbar.
// Результат пишется в CSS-переменную --scrollbar-width, которую используют
// модальные окна и фиксированные элементы для компенсации layout shift
// при открытии (body получает padding-right: var(--scrollbar-width)).
// Вызывается в layouts/default.vue на событии 'page:finish' (после навигации).
// setTimeout(510) — ждём завершения анимации перехода страницы.

export default function () {
    setTimeout(() => {
        document.body.style.setProperty('--scrollbar-width', (window.innerWidth - document.body.clientWidth) + 'px');
    }, 510)
}
