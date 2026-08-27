(function () {
	'use strict';
	// Mobile nav toggle
	var toggle = document.querySelector('.nav-toggle');
	var nav = document.getElementById('site-nav');
	if (toggle && nav) {
		toggle.addEventListener('click', function () {
			var open = nav.classList.toggle('open');
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		});
	}
	// Reveal on scroll (respects prefers-reduced-motion via CSS)
	var items = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window && items.length) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) {
				if (e.isIntersecting) {
					e.target.classList.add('in');
					io.unobserve(e.target);
				}
			});
		}, { threshold: 0.12 });
		items.forEach(function (el) { io.observe(el); });
		// Safety net: everything visible within 3s regardless of scroll (capture tools, odd viewports).
		setTimeout(function () { items.forEach(function (el) { el.classList.add('in'); }); }, 3000);
	} else {
		items.forEach(function (el) { el.classList.add('in'); });
	}
	// Smooth scroll for same-page anchors
	document.querySelectorAll('a[href^="#"]').forEach(function (a) {
		a.addEventListener('click', function (ev) {
			var t = document.getElementById(a.getAttribute('href').slice(1));
			if (t) { ev.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
		});
	});
})();
