/* Inner pages only: point the (unchanged) header's section anchors at the dedicated pages
   and mark the current page. The header markup itself is not modified. */
(function () {
  'use strict';
  var PAGE_FOR_HASH = {
    '#home': 'index.html', '#about': 'about.html', '#services': 'services.html', '#projects': 'projects.html',
    '#testimonials': 'testimonials.html', '#contact': 'contact.html', '#gallery': 'gallery.html'
  };
  var SERVICE_FOR_ALT = {
    'Landscape Design': 'landscaping-site-execution', 'Garden Design': 'gardening-maintenance', 'Vertical Gardens': 'vertical-gardens',
    'Terrace Gardens': 'terrace-gardens', 'Tree Transplantation': 'tree-transplantation', 'Irrigation Systems': 'irrigation-solutions',
    'Horticulture Consultancy': 'horticulture-consultancy'
  };

  function run() {
    var file = location.pathname.split('/').pop() || 'index.html';
    if (file.indexOf('service-') === 0) file = 'services.html';
    if (file.indexOf('project-') === 0) file = 'projects.html';

    document.querySelectorAll('.header-wrapper a, .mobile-nav-drawer a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var img = a.querySelector('img');
      var alt = img ? img.getAttribute('alt') : '';
      if (alt && SERVICE_FOR_ALT[alt] && (a.classList.contains('dropdown-card') || a.classList.contains('mobile-submenu-link'))) {
        a.setAttribute('href', 'service-' + SERVICE_FOR_ALT[alt] + '.html');
      } else if (a.classList.contains('mobile-view-all-link')) {
        a.setAttribute('href', 'services.html');
      } else if (PAGE_FOR_HASH[href]) {
        a.setAttribute('href', PAGE_FOR_HASH[href]);
      } else if (/^index\.html#/.test(href)) {
        var page = PAGE_FOR_HASH[href.replace('index.html', '')];
        if (page) a.setAttribute('href', page);
      }
    });

    document.querySelectorAll('.nav-links-wrapper .nav-link-custom, .mobile-nav-links .mobile-nav-link').forEach(function (a) {
      a.classList.toggle('active', (a.getAttribute('href') || '').split('#')[0] === file);
    });
  }

  document.addEventListener('componentsLoaded', function () { setTimeout(run, 0); });
  window.addEventListener('load', function () { setTimeout(run, 0); });
})();
