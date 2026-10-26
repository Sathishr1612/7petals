/**
 * 7 PETALS HORTICULTURE - HTML COMPONENT LOADER & NAV CONTROLLER
 * Automatically includes external HTML files (header.html, footer.html, etc.)
 */

async function loadHTMLIncludes() {
  const includeElements = document.querySelectorAll('[data-include]');
  if (includeElements.length === 0) return;

  const loadPromises = Array.from(includeElements).map(async (el) => {
    const file = el.getAttribute('data-include');
    if (!file) return;

    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Failed to load ${file}: ${response.statusText}`);
      }
      const html = await response.text();

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      const parent = el.parentNode;
      if (parent) {
        while (tempDiv.firstChild) {
          parent.insertBefore(tempDiv.firstChild, el);
        }
        parent.removeChild(el);
      }
    } catch (err) {
      console.error(`Error including HTML component (${file}):`, err);
    }
  });

  await Promise.all(loadPromises);

  // Dispatch custom event for loaded components
  document.dispatchEvent(new CustomEvent('componentsLoaded'));

  // Re-initialize dynamic header, navigation, modals, and cursor interactions
  if (typeof window.initFloatingHeader === 'function') window.initFloatingHeader();
  if (typeof window.initMobileDrawer === 'function') window.initMobileDrawer();
  if (typeof window.initConsultationModal === 'function') window.initConsultationModal();
  if (typeof window.initBackToTop === 'function') window.initBackToTop();
  if (typeof window.initGalleryLightbox === 'function') window.initGalleryLightbox();
  if (typeof window.initCustomCursor === 'function') window.initCustomCursor();

  // Setup dynamic scrollspy navigation for header links
  initNavScrollSpy();
}

/**
 * ScrollSpy: Updates active navigation item smoothly as sections scroll into view
 */
function initNavScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-links-wrapper .nav-link-custom, .mobile-nav-links .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Cross-page navigation adjustment for about.html
  const isAboutPage = window.location.pathname.endsWith('about.html') || window.location.pathname.includes('/about');
  if (isAboutPage) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        link.setAttribute('href', 'index.html' + href);
      }
      if (href === 'about.html' || href === '#about') {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const brandLinks = document.querySelectorAll('.navbar-brand-custom');
    brandLinks.forEach(b => b.setAttribute('href', 'index.html'));
  }

  function setActive(targetId) {
    if (isAboutPage) return; // Retain About Us active on about.html
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Match "#home", "index.html#home", etc.
      const linkTarget = href.includes('#') ? '#' + href.split('#')[1] : href;
      if (linkTarget === '#' + targetId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Click handler for instant active state feedback
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        setActive(targetId);
      }
    });
  });

  // Scroll listener to update active link based on viewport position
  if (sections.length > 0) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          let currentSectionId = '';
          const scrollPos = window.scrollY + 200;

          sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
              currentSectionId = section.getAttribute('id');
            }
          });

          if (currentSectionId) {
            setActive(currentSectionId);
          } else if (window.scrollY < 100) {
            setActive('home');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
}

// Execute immediately when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHTMLIncludes);
} else {
  loadHTMLIncludes();
}

window.loadHTMLIncludes = loadHTMLIncludes;
window.initNavScrollSpy = initNavScrollSpy;
