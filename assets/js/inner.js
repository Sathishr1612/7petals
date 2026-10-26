/* Inner-page behaviour: project filters and the enquiry form (email / WhatsApp). */
(function () {
  'use strict';

  document.querySelectorAll('[data-project-filters]').forEach(function (bar) {
    var items = document.querySelectorAll('[data-cat]');
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      bar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
      var cat = btn.getAttribute('data-filter');
      items.forEach(function (it) {
        var cats = (it.getAttribute('data-cat') || '').split(' ');
        it.hidden = !(cat === 'all' || cats.indexOf(cat) !== -1);
      });
    });
  });

  var form = document.getElementById('enquiry-form');
  if (!form) return;
  var status = document.getElementById('form-status');

  function compose() {
    var d = new FormData(form);
    return [
      'Name: ' + (d.get('name') || ''),
      'Phone: ' + (d.get('phone') || ''),
      'Email: ' + (d.get('email') || ''),
      'Project type: ' + (d.get('type') || ''),
      'Location: ' + (d.get('location') || ''),
      '',
      d.get('message') || ''
    ].join('\n');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var subject = 'Project enquiry - ' + (new FormData(form).get('type') || 'Website');
    window.location.href = 'mailto:' + form.getAttribute('data-email') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(compose());
    if (status) status.textContent = 'Your email app should open with the enquiry ready to send. If it does not, write to ' + form.getAttribute('data-email') + ' or use WhatsApp.';
  });

  var wa = document.getElementById('enquiry-whatsapp');
  if (wa) wa.addEventListener('click', function () {
    if (!form.reportValidity()) return;
    window.open('https://wa.me/' + form.getAttribute('data-wa') + '?text=' + encodeURIComponent('Hello 7 Petals Horticulture,\n' + compose()), '_blank', 'noopener');
  });
})();
