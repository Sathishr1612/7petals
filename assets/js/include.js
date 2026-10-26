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

  // main.js re-initialises header, drawer, modal, back-to-top and lightbox on the
  // 'componentsLoaded' event above, so only the cursor needs a direct call here.
  if (typeof window.initCustomCursor === 'function') window.initCustomCursor();

  // Setup dynamic scrollspy navigation for header links
  initNavScrollSpy();
}

/**
 * Marks the header link for the current page as active (works for desktop + mobile nav).
 * Service/project detail pages highlight their parent section.
 */
function initNavScrollSpy() {
  let file = window.location.pathname.split('/').pop() || 'index.html';
  if (!file.endsWith('.html')) file = 'index.html';
  if (file.startsWith('service-')) file = 'services.html';
  if (file.startsWith('project-')) file = 'projects.html';

  document.querySelectorAll('.nav-links-wrapper .nav-link-custom, .mobile-nav-links .mobile-nav-link[href]').forEach(link => {
    const target = (link.getAttribute('href') || '').split('#')[0];
    link.classList.toggle('active', target === file);
  });
}

// Execute immediately when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHTMLIncludes);
} else {
  loadHTMLIncludes();
}

window.loadHTMLIncludes = loadHTMLIncludes;
window.initNavScrollSpy = initNavScrollSpy;
