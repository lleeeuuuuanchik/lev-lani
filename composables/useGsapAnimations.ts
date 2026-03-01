// ─── GSAP Анимации — единая точка входа ───────────────────────────────────────
// Все функции используют динамический import('gsap') вместо статического —
// это позволяет избежать ошибок при SSR (GSAP работает только в браузере).
// Каждая функция начинается с проверки `if (!import.meta.client) return` —
// на сервере анимации пропускаются без ошибок.

export function useGsapAnimations() {
	// Плавное появление элементов Hero-секции при загрузке страницы (без ScrollTrigger).
	// selector — CSS-селектор (напр. '.hero__title, .hero__sub') — все найденные элементы
	// анимируются с небольшой задержкой (stagger) между собой.
	function animateHeroEntrance(selector: string) {
		if (!import.meta.client) return;
		import('gsap').then(({ gsap }) => {
			const els = document.querySelectorAll(selector);
			if (!els.length) return;
			gsap.fromTo(els,
				{ y: 50, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: 'power3.out', delay: 0.1 }
			);
		});
	}

	// Карточки появляются снизу при скролле (ScrollTrigger с once: true — срабатывает один раз).
	// trigger определяется автоматически как ближайший <section> или родитель первого элемента.
	function animateScrollCards(selector: string) {
		if (!import.meta.client) return;
		Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
			gsap.registerPlugin(ScrollTrigger);
			const els = document.querySelectorAll(selector);
			if (!els.length) return;
			gsap.fromTo(els,
				{ y: 40, opacity: 0 },
				{
					y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power2.out',
					scrollTrigger: {
						trigger: els[0].closest('section') ?? els[0].parentElement,
						start: 'top 78%',
						once: true, // повторно не воспроизводится при обратном скролле
					},
				}
			);
		});
	}

	// Навбар: добавляет/убирает класс 'scrolled' при прокрутке страницы > 80px.
	// CSS-класс .scrolled добавляет фоновый blur и тёмный backdrop в AppNavbar.
	function animateNavbar(el: HTMLElement) {
		if (!import.meta.client) return;
		import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
			ScrollTrigger.create({
				start: 80, // срабатывает когда скролл > 80px от верха
				onEnter:     () => el.classList.add('scrolled'),
				onLeaveBack: () => el.classList.remove('scrolled'),
			});
		});
	}

	// Заголовок секции плавно появляется снизу при скролле (одиночный элемент)
	function animateSectionTitle(selector: string) {
		if (!import.meta.client) return;
		Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
			gsap.registerPlugin(ScrollTrigger);
			const el = document.querySelector(selector);
			if (!el) return;
			gsap.fromTo(el,
				{ y: 28, opacity: 0 },
				{
					y: 0, opacity: 1, duration: 0.75, ease: 'power2.out',
					scrollTrigger: { trigger: el, start: 'top 85%', once: true },
				}
			);
		});
	}

	// Анимирует числовые счётчики (count-up) для секции со статистикой.
	// Каждый элемент должен иметь атрибут data-target="<число>" — именно до него
	// считается анимация. Значение форматируется в локали 'ru' (разделитель пробел).
	function animateCounters(selector: string) {
		if (!import.meta.client) return;
		Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
			gsap.registerPlugin(ScrollTrigger);
			const els = document.querySelectorAll(selector);
			if (!els.length) return;

			els.forEach((el) => {
				const target = parseInt((el as HTMLElement).dataset.target ?? '0', 10);
				const obj = { val: 0 }; // промежуточный объект — GSAP анимирует его свойство val
				gsap.fromTo(obj, { val: 0 }, {
					val: target,
					duration: 1.8,
					ease: 'power2.out',
					onUpdate: () => { el.textContent = Math.round(obj.val).toLocaleString('ru'); },
					scrollTrigger: { trigger: el.closest('section'), start: 'top 80%', once: true },
				});
			});
		});
	}

	// Универсальная анимация «появление снизу» — используется для произвольных блоков.
	// stagger позволяет задать задержку между элементами (по умолчанию 0.1s).
	function animateFadeInUp(selector: string, stagger = 0.1) {
		if (!import.meta.client) return;
		Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
			gsap.registerPlugin(ScrollTrigger);
			const els = document.querySelectorAll(selector);
			if (!els.length) return;
			gsap.fromTo(els,
				{ y: 30, opacity: 0 },
				{
					y: 0, opacity: 1, duration: 0.7, stagger, ease: 'power2.out',
					scrollTrigger: { trigger: els[0].parentElement, start: 'top 82%', once: true },
				}
			);
		});
	}

	// Параллакс-эффект: фоновый элемент медленно сдвигается вверх при скролле (scrub),
	// а контентный блок одновременно появляется снизу (fade-in once).
	// bgSelector — фоновый элемент (напр. изображение); contentSelector — текст/контент.
	function animateParallaxSection(bgSelector: string, contentSelector: string) {
		if (!import.meta.client) return;
		Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
			gsap.registerPlugin(ScrollTrigger);

			const bg = document.querySelector(bgSelector);
			if (bg) {
				gsap.to(bg, {
					y: -60,
					ease: 'none',
					scrollTrigger: {
						trigger: bg.closest('section'),
						start: 'top bottom',
						end: 'bottom top',
						scrub: 1.5, // значение > 1 — плавное следование за скроллом с инерцией
					},
				});
			}

			const content = document.querySelector(contentSelector);
			if (content) {
				gsap.fromTo(content,
					{ y: 24, opacity: 0 },
					{
						y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
						scrollTrigger: { trigger: content, start: 'top 80%', once: true },
					}
				);
			}
		});
	}

	return {
		animateHeroEntrance,
		animateScrollCards,
		animateNavbar,
		animateSectionTitle,
		animateCounters,
		animateFadeInUp,
		animateParallaxSection,
	};
}
