/**
 * 7 PETALS HORTICULTURE PVT. LTD. - MAIN LOGIC
 * High-performance Vanilla JavaScript for Luxury User Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initFloatingHeader();
  initMobileDrawer();
  initHeroCarousel();
  initProjectFilters();
  initGalleryLightbox();
  initTestimonialSlider();
  initFaqAccordion();
  initConsultationModal();
  initBackToTop();
  initNewsletterForm();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. Floating Header & Scroll Behavior
   -------------------------------------------------------------------------- */
function initFloatingHeader() {
  const headerWrapper = document.querySelector('.header-wrapper');
  if (!headerWrapper) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      headerWrapper.classList.add('header-scrolled');
    } else {
      headerWrapper.classList.remove('header-scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation & Dropdown Accordions
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.btn-mobile-toggle');
  const closeBtn = document.querySelector('.btn-drawer-close');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const dropdownToggle = document.querySelector('.mobile-dropdown-toggle');
  const dropdownParent = document.querySelector('.mobile-nav-item-dropdown');

  if (!drawer || !toggleBtn) return;

  function openDrawer() {
    drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Accordion toggle for Mobile Services dropdown
  if (dropdownToggle && dropdownParent) {
    dropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownParent.classList.toggle('active');
    });
  }

  // Close drawer on link click (direct links and sub-menu links)
  const allNavLinks = drawer.querySelectorAll('a[href]');
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Featured Projects Category Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filters .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0 || projectCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Gallery Lightbox Popup
   -------------------------------------------------------------------------- */
let currentLightboxIndex = 0;
let galleryItemsData = [];

function initGalleryLightbox() {
  const galleryCards = document.querySelectorAll('.gallery-card-item');
  const lightboxOverlay = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (!lightboxOverlay) return;

  // Store data
  galleryCards.forEach((card, index) => {
    const img = card.querySelector('img');
    const title = card.querySelector('.project-title')?.textContent || '7 Petals Landscape Project';
    const tag = card.querySelector('.project-tag')?.textContent || 'Horticulture Design';

    galleryItemsData.push({
      src: img ? img.src : '',
      title: `${title} — ${tag}`
    });

    card.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxContent() {
    if (!galleryItemsData[currentLightboxIndex]) return;
    lightboxImg.src = galleryItemsData[currentLightboxIndex].src;
    lightboxCaption.textContent = galleryItemsData[currentLightboxIndex].title;
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) closeLightbox();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentLightboxIndex = (currentLightboxIndex - 1 + galleryItemsData.length) % galleryItemsData.length;
      updateLightboxContent();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentLightboxIndex = (currentLightboxIndex + 1) % galleryItemsData.length;
      updateLightboxContent();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxOverlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });
}

/* --------------------------------------------------------------------------
   5. Testimonial Slider
   -------------------------------------------------------------------------- */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slider-btn-prev');
  const nextBtn = document.querySelector('.slider-btn-next');

  if (slides.length === 0) return;

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.style.display = 'block';
        setTimeout(() => slide.style.opacity = '1', 50);
      } else {
        slide.style.opacity = '0';
        slide.style.display = 'none';
      }
    });
  }

  showSlide(currentIndex);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });
  }

  // Auto Advance
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 6000);
}

/* --------------------------------------------------------------------------
   6. FAQ Accordion & Live Search
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');
  const searchInput = document.getElementById('faqSearch');
  const faqItems = document.querySelectorAll('.faq-item');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentItem = header.parentElement;
      const isActive = parentItem.classList.contains('active');

      // Close all active items
      document.querySelectorAll('.faq-item.active').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-body').style.maxHeight = '0';
      });

      // Toggle clicked item
      if (!isActive) {
        parentItem.classList.add('active');
        const body = parentItem.querySelector('.faq-body');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Search filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();

      faqItems.forEach(item => {
        const title = item.querySelector('.faq-title').textContent.toLowerCase();
        const text = item.querySelector('.faq-body').textContent.toLowerCase();

        if (title.includes(term) || text.includes(term)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   7. Consultation Modal
   -------------------------------------------------------------------------- */
function initConsultationModal() {
  const modalOverlay = document.getElementById('consultationModal');
  const triggerBtns = document.querySelectorAll('.btn-trigger-consultation');
  const closeBtn = document.querySelector('#consultationModal .modal-close-btn');
  const form = document.getElementById('consultationForm');

  if (!modalOverlay) return;

  function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Booking Confirmed!';
      submitBtn.style.backgroundColor = '#25D366';

      setTimeout(() => {
        alert('Thank you! Our Lead Landscape Architect will contact you within 2 hours to confirm your consultation schedule.');
        closeModal();
        form.reset();
        submitBtn.innerHTML = 'Book Free Consultation';
        submitBtn.style.backgroundColor = '';
      }, 1000);
    });
  }
}

/* --------------------------------------------------------------------------
   9. Back To Top Smooth Scroll
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.btn-back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   10. Newsletter Form
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    if (input && input.value) {
      alert(`Thank you for subscribing to 7 Petals Botanical Journal! Confirmation sent to ${input.value}`);
      input.value = '';
    }
  });
}

/* --------------------------------------------------------------------------
   11. Intersection Observer Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const targets = document.querySelectorAll(`
    .section-padding .heading-editorial,
    .section-padding .subheading-editorial,
    .services-header-box,
    .service-bento-card,
    .service-bento-cta-card,
    .project-card,
    .gallery-card-item,
    .stat-card,
    .about-feature-box,
    .testimonial-card,
    .faq-item,
    .estimator-card,
    .feature-card-item,
    .brand-story-box
  `);

  targets.forEach((el) => {
    if (!el.classList.contains('reveal-up') && !el.classList.contains('reveal-scale')) {
      el.classList.add('reveal-up');
    }

    // Add staggered cascade for grid siblings
    const parent = el.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(child => 
        child.classList.contains('reveal-up') || child.classList.contains('reveal-scale')
      );
      const childIndex = siblings.indexOf(el);
      if (childIndex > 0 && childIndex < 6) {
        el.classList.add(`delay-${childIndex}`);
      }
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   12. Fullscreen Hero Carousel with Ken Burns Zoom Effect
   -------------------------------------------------------------------------- */
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.hero-carousel-prev');
  const nextBtn = document.querySelector('.hero-carousel-next');
  const dots = document.querySelectorAll('.hero-dot');
  const counterCurrent = document.querySelector('.current-slide-num');
  const progressBar = document.querySelector('.hero-timer-progress');
  const heroSection = document.querySelector('.hero-carousel-section');

  if (!slides || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  const slideDuration = 6500; // 6.5 seconds per slide
  let slideTimer = null;
  let progressInterval = null;
  let progressStartTime = 0;

  function showSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentIndex = index;

    // Remove active class from all slides and dots
    slides.forEach((slide) => {
      const img = slide.querySelector('.hero-bg-img');
      slide.classList.remove('active');
      if (img) {
        // Reset scale animation by forcing reflow
        img.style.animation = 'none';
        void img.offsetWidth;
        img.style.animation = '';
      }
    });

    dots.forEach(dot => dot.classList.remove('active'));

    // Activate current slide & dot
    slides[currentIndex].classList.add('active');
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('active');
    }

    // Update Counter
    if (counterCurrent) {
      counterCurrent.textContent = (currentIndex + 1).toString().padStart(2, '0');
    }

    // Reset Progress Bar
    resetProgressBar();
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function resetProgressBar() {
    if (progressBar) {
      progressBar.style.width = '0%';
    }
    clearInterval(progressInterval);
    progressStartTime = Date.now();

    progressInterval = setInterval(() => {
      const elapsed = Date.now() - progressStartTime;
      const percent = Math.min(100, (elapsed / slideDuration) * 100);
      if (progressBar) {
        progressBar.style.width = `${percent}%`;
      }
      if (percent >= 100) {
        clearInterval(progressInterval);
      }
    }, 50);
  }

  function startAutoPlay() {
    stopAutoPlay();
    slideTimer = setInterval(() => {
      nextSlide();
    }, slideDuration);
    resetProgressBar();
  }

  function stopAutoPlay() {
    if (slideTimer) clearInterval(slideTimer);
    if (progressInterval) clearInterval(progressInterval);
  }

  // Navigation Button Handlers
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoPlay();
    });
  }

  // Pagination Dots Handlers
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startAutoPlay();
    });
  });

  // Pause on Hover
  if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
      stopAutoPlay();
    });
    heroSection.addEventListener('mouseleave', () => {
      startAutoPlay();
    });
  }

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  if (heroSection) {
    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 40;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
      startAutoPlay();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
      startAutoPlay();
    }
  }

  // Initialize
  showSlide(0);
  startAutoPlay();
}

