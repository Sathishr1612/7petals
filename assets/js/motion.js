/* 7 Petals motion layer: tags existing elements and reveals each one once as it enters the viewport. */
(function () {
  'use strict';
  var root = document.documentElement;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var isHome = /(^|\/)(index\.html)?$/.test(location.pathname);
  var REVEAL = '.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-zoom, .reveal-scale';
  var SKIP = '.about-page-hero, .hero-section, header, .header-wrapper, .mobile-nav-drawer, .mobile-drawer-overlay, .modal-custom-overlay, dialog, .marquee-container, .cursor-dot, .cursor-circle, [data-mo-skip], .faq-body, .mega-menu';
  var CARD = '.inner-card, .testimonial-card, .team-member-card, .faq-item, .why-pillar-card, .value-card, .mv-card, .inner-step, .inner-text-card, .capability-card, .gallery-item, .service-bento-card, .project-card, .inner-logos li, .cta-contact-list li, .f7-contact, .f7-col, .about7-narrative-item, .inner-timeline li';
  var IMG = '.inner-img, .inner-compose, .about7-mosaic, .why-spotlight-card';
  var TEXT = '.services-eyebrow, h2, h3, .subheading-editorial, section p, .inner-checklist, .inner-meta, .inner-filters, .btn-editorial, .contact-cta-subtitle, .faq-intro, .f7-band, .v2-footer-bottom';
  var ALL = [CARD, IMG, TEXT, '.row > [class*="col-"]'].join(',');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { io.unobserve(e.target); show(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  function show(el) {
    if (el.classList.contains('mo-in')) return;
    el.classList.add('mo-in');
    var d = parseFloat(el.style.getPropertyValue('--mo-d')) || 0;
    // hand control back to the element's own CSS (hover effects etc.) once the reveal has finished
    setTimeout(function () {
      el.classList.remove('mo', 'mo-in');
      el.style.removeProperty('--mo-d');
      el.removeAttribute('data-mo-dir');
    }, (0.85 + d) * 1000 + 150);
  }

  function dirFor(el) {
    if (el.matches('.row > [class*="col-"]')) {
      var kids = Array.prototype.filter.call(el.parentElement.children, function (c) { return /(^|\s)col(-|\s|$)/.test(c.className); });
      if (kids.length === 2) return kids[0] === el ? 'left' : 'right';
      return null;                       // 3+ columns: the cards inside animate instead
    }
    if (el.matches(IMG) || el.matches(CARD)) return 'scale';
    return 'up';
  }

  function init() {
    var perParent = new Map();
    var tagged = [];
    document.querySelectorAll(ALL).forEach(function (el) {
      if (el.hasAttribute('data-mo') || el.closest(SKIP)) return;
      if (el.parentElement && el.parentElement.closest('[data-mo]')) return;   // an ancestor already animates
      if (!isHome && el.matches(REVEAL)) {                                      // unify old reveals with the new system
        el.classList.remove('reveal-on-scroll', 'reveal-left', 'reveal-right', 'reveal-zoom', 'reveal-scale', 'is-revealed', 'delay-0', 'delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5');
      } else if (el.matches(REVEAL) || el.closest(REVEAL)) {
        return;                                                                 // home page keeps its existing reveals
      }
      var dir = dirFor(el);
      if (!dir) return;
      var n = perParent.get(el.parentElement) || 0;
      perParent.set(el.parentElement, n + 1);
      el.setAttribute('data-mo', '');
      el.setAttribute('data-mo-dir', dir);
      el.style.setProperty('--mo-d', ((n % 6) * 0.1).toFixed(2) + 's');
      el.classList.add('mo');
      tagged.push(el);
    });
    if (!tagged.length) return;
    root.classList.add('mo-on');
    tagged.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.94 && r.bottom > 0) {
        requestAnimationFrame(function () { requestAnimationFrame(function () { show(el); }); });
      } else {
        io.observe(el);
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  document.addEventListener('componentsLoaded', init);       // the footer arrives later via include.js

  // safety net: anything near the viewport that is still hidden after load gets shown
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.querySelectorAll('.mo:not(.mo-in)').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.2 && r.bottom > -200) show(el);
      });
    }, 4000);
  });
})();
