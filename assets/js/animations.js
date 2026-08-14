/**
 * 7 PETALS HORTICULTURE PVT. LTD. - ANIMATIONS & MICRO-INTERACTIONS
 * Powered by pure Vanilla JS, Intersection Observer, and requestAnimationFrame
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initScrollReveals();
  initAnimatedCounters();
  initHeroParallax();
  // initServicesParallax();
});

/* --------------------------------------------------------------------------
   1. Smooth Custom Cursor Follower
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const circle = document.querySelector('.cursor-circle');

  if (!dot || !circle) return;

  let mouseX = 0, mouseY = 0;
  let circleX = 0, circleY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Instant dot position
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderCursor() {
    // Smooth lerp movement for circle
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;

    circle.style.transform = `translate(${circleX}px, ${circleY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover state triggers
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-row, .bento-card, .faq-header');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* --------------------------------------------------------------------------
   2. Intersection Observer Scroll Reveal
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-zoom');

  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target); // Trigger once
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   3. Animated Counter Numbers
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');

  if (statNumbers.length === 0) return;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        let currentStep = 0;

        const counterInterval = setInterval(() => {
          currentStep++;
          const progress = currentStep / totalSteps;
          // Ease-out quad curve
          const easeProgress = 1 - (1 - progress) * (1 - progress);
          const currentValue = Math.floor(easeProgress * finalValue);

          target.textContent = currentValue + '+';

          if (currentStep >= totalSteps) {
            target.textContent = finalValue + '+';
            clearInterval(counterInterval);
          }
        }, stepTime);

        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => counterObserver.observe(num));
}

/* --------------------------------------------------------------------------
   4. Parallax Effect on Hero Section
   -------------------------------------------------------------------------- */
function initHeroParallax() {
  const heroSection = document.querySelector('.hero-section');
  const heroImg = document.querySelector('.hero-bg-img');

  if (!heroSection || !heroImg) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.25}px)`;
    }
  });

  // Subtle Mouse Parallax
  heroSection.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;

    const heroContent = document.querySelector('.hero-content-container');
    if (heroContent) {
      heroContent.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
  });
}

/* --------------------------------------------------------------------------
   5. Parallax Effect on Services & CTA Section Background Images
   -------------------------------------------------------------------------- */
function initServicesParallax() {
  const cards = document.querySelectorAll('.service-bento-card, .services-cta-banner');
  if (cards.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.isIntersectingCustom = entry.isIntersecting;
    });
  }, observerOptions);

  cards.forEach(card => observer.observe(card));

  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    cards.forEach(card => {
      if (card.isIntersectingCustom) {
        const rect = card.getBoundingClientRect();
        // Calculate a position factor from 0 (top of viewport) to 1 (bottom of viewport)
        const relativePosition = (rect.top + rect.height / 2) / windowHeight;
        // Map factor to translation range (e.g. -20px to 20px)
        const translateY = (relativePosition - 0.5) * 40;
        card.style.setProperty('--parallax-y', `${translateY}px`);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. About Section
   (Animation is now handled entirely via CSS infinite vertical loop)
   -------------------------------------------------------------------------- */

