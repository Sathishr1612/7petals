/* v2 page behaviour: scroll reveal, filters, lightbox and the enquiry form. No dependencies. */
(function () {
  'use strict';
  var doc = document;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Reveal on scroll */
  var els = doc.querySelectorAll('.v2-reveal');
  if (els.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      els.forEach(function (e) { io.observe(e); });
    }
  }

  /* Filters: <div data-v2-filters="#target"> buttons [data-f], targets carry data-cat="a b" */
  doc.querySelectorAll('[data-v2-filters]').forEach(function (bar) {
    var target = doc.querySelector(bar.getAttribute('data-v2-filters'));
    if (!target) return;
    var live = doc.getElementById('v2-live');
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.v2-fbtn');
      if (!btn) return;
      bar.querySelectorAll('.v2-fbtn').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      var f = btn.getAttribute('data-f'), n = 0;
      target.querySelectorAll('[data-cat]').forEach(function (it) {
        var ok = f === 'all' || (it.getAttribute('data-cat') || '').split(' ').indexOf(f) !== -1;
        it.hidden = !ok; if (ok) n++;
      });
      if (live) live.textContent = n + (n === 1 ? ' item shown' : ' items shown');
    });
  });

  /* Lightbox */
  var box = doc.getElementById('v2-lb');
  if (box && typeof box.showModal === 'function') {
    var im = box.querySelector('img'), cap = box.querySelector('.v2-lb-cap'), cnt = box.querySelector('.v2-lb-count');
    var list = [], i = 0, last = null;
    var show = function (n) {
      i = (n + list.length) % list.length;
      var a = list[i];
      im.src = a.getAttribute('href'); im.alt = a.getAttribute('data-alt') || '';
      cap.textContent = a.getAttribute('data-cap') || ''; cnt.textContent = (i + 1) + ' / ' + list.length;
    };
    doc.addEventListener('click', function (e) {
      var a = e.target.closest('[data-lb]');
      if (!a) return;
      e.preventDefault();
      var group = a.closest('[data-lb-group]') || doc;
      list = Array.prototype.filter.call(group.querySelectorAll('[data-lb]'), function (x) { return !x.closest('[hidden]'); });
      last = a; show(list.indexOf(a)); box.showModal();
    });
    box.querySelector('.v2-lb-x').addEventListener('click', function () { box.close(); });
    box.querySelector('.v2-lb-p').addEventListener('click', function () { show(i - 1); });
    box.querySelector('.v2-lb-n').addEventListener('click', function () { show(i + 1); });
    box.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.classList.contains('v2-lb-in') || e.target.classList.contains('v2-lb-stage')) box.close(); });
    box.addEventListener('close', function () { im.removeAttribute('src'); if (last) last.focus(); });
  }

  /* Enquiry form → email / WhatsApp */
  var form = doc.getElementById('enquiry-form');
  if (form) {
    var status = doc.getElementById('form-status');
    var compose = function () {
      var d = new FormData(form);
      return ['Name: ' + (d.get('name') || ''), 'Phone: ' + (d.get('phone') || ''), 'Email: ' + (d.get('email') || ''),
        'Project type: ' + (d.get('type') || ''), 'Location: ' + (d.get('location') || ''), '', d.get('message') || ''].join('\n');
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var subject = 'Project enquiry - ' + (new FormData(form).get('type') || 'Website');
      window.location.href = 'mailto:' + form.getAttribute('data-email') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(compose());
      if (status) status.textContent = 'Your email app should open with the enquiry ready to send. If it does not, write to ' + form.getAttribute('data-email') + ' or use WhatsApp.';
    });
    var wa = doc.getElementById('enquiry-whatsapp');
    if (wa) wa.addEventListener('click', function () {
      if (!form.reportValidity()) return;
      window.open('https://wa.me/' + form.getAttribute('data-wa') + '?text=' + encodeURIComponent('Hello 7 Petals Horticulture,\n' + compose()), '_blank', 'noopener');
    });
  }
})();
