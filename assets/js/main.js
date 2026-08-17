/**
 * 7 PETALS HORTICULTURE PVT. LTD. - MAIN LOGIC
 * High-performance Vanilla JavaScript for Luxury User Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initFloatingHeader();
  initMobileDrawer();
  initHeroCarousel();
  initProjectsEditorial();
  initGalleryLightbox();
  initTestimonialSlider();
  initFaqAccordion();
  initConsultationModal();
  initBackToTop();
  initNewsletterForm();
  initScrollAnimations();
  initAboutVisualReveal();
});

/* --------------------------------------------------------------------------
   1. Floating Header & Scroll Behavior
   -------------------------------------------------------------------------- */
function initFloatingHeader() {
  const headerWrapper = document.querySelector('.header-wrapper');
  if (!headerWrapper) return;

  const SCROLL_THRESHOLD = 80;
  let isScrolled = false;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY || window.pageYOffset;
    const shouldBeScrolled = scrollY > SCROLL_THRESHOLD;

    if (shouldBeScrolled !== isScrolled) {
      isScrolled = shouldBeScrolled;
      if (isScrolled) {
        headerWrapper.classList.add('header-scrolled');
      } else {
        headerWrapper.classList.remove('header-scrolled');
      }
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
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
   3. Projects Editorial Portfolio — Interactive Showcase
   -------------------------------------------------------------------------- */
function initProjectsEditorial() {
  const section = document.querySelector('.projects-editorial');
  const imgContainer = document.querySelector('.projects-featured-image-inner');
  const details = document.getElementById('projects-details');
  const numEl = document.getElementById('proj-number');
  const catEl = document.getElementById('proj-category');
  const titleEl = document.getElementById('proj-title');
  const metaEl = document.getElementById('proj-meta');
  const descEl = document.getElementById('proj-desc');
  const counterEl = document.getElementById('proj-counter');
  const prevBtn = document.getElementById('proj-prev');
  const nextBtn = document.getElementById('proj-next');
  const imgPrevBtn = document.getElementById('img-carousel-prev');
  const imgNextBtn = document.getElementById('img-carousel-next');
  const progress = document.getElementById('proj-progress');
  const selectors = document.querySelectorAll('.project-selector');
  const imageWrap = document.querySelector('.projects-featured-image-wrap');

  if (!section || !imgContainer) return;

  const projects = [
    {
      num: '01',
      category: 'CORPORATE & COMMERCIAL LANDSCAPES',
      title: 'Corporate & Commercial Landscapes',
      location: 'OMR IT Corridor, Chennai',
      desc: 'Professional landscape design and greenery solutions for offices, business parks, commercial properties, and corporate campuses, creating welcoming and functional outdoor environments.',
      images: [
        'assets/images/7petals-projects/godrej-tree.webp',
        'assets/images/7petals-projects/garden-office-place.webp',
        'assets/images/7petals-projects/garden-projects-office.webp'
      ],
      alt: 'Corporate Green Campus'
    },
    {
      num: '02',
      category: 'RESIDENTIAL & VILLA LANDSCAPING',
      title: 'Residential & Villa Landscaping',
      location: 'Jubilee Hills, Hyderabad',
      desc: 'Custom landscape and garden designs for villas, homes, and residential communities, combining aesthetics, greenery, and practical outdoor living.',
      images: [
        'assets/images/7petals-projects/house-design.webp',
        'assets/images/7petals-projects/kilbill-bungalow.webp',
        'assets/images/7petals-projects/rustomjee-crown-apart.webp'
      ],
      alt: 'Luxury Residential Landscape'
    },
    {
      num: '03',
      category: 'INDUSTRIAL LANDSCAPING',
      title: 'Industrial Landscaping',
      location: 'Sriperumbudur, Chennai',
      desc: 'Sustainable and low-maintenance landscaping solutions for industrial campuses, large facilities, and infrastructure developments.',
      images: [
        'assets/images/7petals-projects/piramal-vaikunth.webp',
        'assets/images/7petals-projects/garden-park.webp',
        'assets/images/7petals-projects/garden-place.webp'
      ],
      alt: 'Eco-Friendly Industrial Park'
    },
    {
      num: '04',
      category: 'TERRACE & ROOFTOP GARDENS',
      title: 'Terrace & Rooftop Gardens',
      location: 'Nungambakkam, Chennai',
      desc: 'Transforming unused terraces and rooftops into beautiful green spaces with thoughtful planting, garden features, and functional outdoor areas.',
      images: [
        'assets/images/7petals-projects/rustomjee-crown-water.webp',
        'assets/images/7petals-projects/piraml-garden.webp',
        'assets/images/7petals-projects/rustomjee-crown-apartment.webp'
      ],
      alt: 'Premium Terrace Garden'
    },
    {
      num: '05',
      category: 'VERTICAL & GREEN WALLS',
      title: 'Vertical & Green Walls',
      location: 'Whitefield, Bangalore',
      desc: 'Innovative vertical gardens and living green walls that integrate greenery into modern buildings, facades, offices, and urban spaces.',
      images: [
        'assets/images/7petals-projects/piramal-vaikunth-vertical.webp',
        'assets/images/7petals-projects/rustomjee-khar-design.webp',
        'assets/images/7petals-projects/rustomjee.webp'
      ],
      alt: 'Vertical Green Wall'
    },
    {
      num: '06',
      category: 'INSTITUTIONAL LANDSCAPING',
      title: 'Institutional Landscaping',
      location: 'Anna University, Chennai',
      desc: 'Planned landscaping solutions for schools, colleges, healthcare facilities, and other institutions that enhance their surroundings and create healthier outdoor spaces.',
      images: [
        'assets/images/7petals-projects/godrej-garden.webp',
        'assets/images/7petals-projects/nursery.webp',
        'assets/images/7petals-projects/rustomjee-crown-design.webp'
      ],
      alt: 'University Campus Greens'
    },
    {
      num: '07',
      category: 'GARDEN REDEVELOPMENT',
      title: 'Garden Redevelopment',
      location: 'Mysore, Karnataka',
      desc: 'Revitalising existing gardens through improved landscape layouts, fresh planting, hardscape elements, and sustainable greenery solutions.',
      images: [
        'assets/images/7petals-projects/garden-projects-flowers.webp',
        'assets/images/7petals-projects/kilbill-bungalow.webp',
        'assets/images/7petals-projects/rustomjee-khar.webp'
      ],
      alt: 'Heritage Garden Restoration'
    },
    {
      num: '08',
      category: 'TREE TRANSPLANTATION',
      title: 'Tree Transplantation',
      location: 'Outer Ring Road, Hyderabad',
      desc: 'Professional tree transplantation solutions focused on carefully relocating and preserving mature trees during construction, redevelopment, and landscape projects.',
      images: [
        'assets/images/7petals-projects/godrej-tree-hero.jpg',
        'assets/images/7petals-projects/godrej-tree.webp',
        'assets/images/7petals-projects/rustomjee-khar-tree.webp'
      ],
      alt: 'Tree Transplantation Project'
    }
  ];

  let currentProjectIndex = 0;
  let currentImageIndex = 0;
  let isAnimatingProject = false;
  let carouselInterval = null;
  let imageElements = [];
  let isHovered = false;

  const totalProjects = projects.length;
  const DISPLAY_TIME = 4500;
  const TRANSITION_TIME = 1200; // Matches css transition
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Render images for the given project
  function renderProjectImages(projectIndex) {
    // Clear existing contents (including the static placeholder image if present)
    imgContainer.innerHTML = '';

    imageElements = [];
    const proj = projects[projectIndex];

    proj.images.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${proj.alt} - Image ${i + 1}`;
      img.className = 'projects-carousel-img';
      if (i === 0) img.classList.add('active');
      imgContainer.appendChild(img);
      imageElements.push(img);
    });

    currentImageIndex = 0;
  }

  function advanceCarousel() {
    if (isHovered || imageElements.length <= 1 || isAnimatingProject || reducedMotion) return;

    const prevIndex = currentImageIndex;
    currentImageIndex = (currentImageIndex + 1) % imageElements.length;

    imageElements[prevIndex].classList.remove('active');
    imageElements[currentImageIndex].classList.add('active');
  }

  function advanceCarouselManual() {
    if (imageElements.length <= 1 || isAnimatingProject) return;
    const prevIndex = currentImageIndex;
    currentImageIndex = (currentImageIndex + 1) % imageElements.length;
    imageElements[prevIndex].classList.remove('active');
    imageElements[currentImageIndex].classList.add('active');
    startCarousel(); // Restart timer
  }

  function previousCarouselManual() {
    if (imageElements.length <= 1 || isAnimatingProject) return;
    const prevIndex = currentImageIndex;
    currentImageIndex = (currentImageIndex - 1 + imageElements.length) % imageElements.length;
    imageElements[prevIndex].classList.remove('active');
    imageElements[currentImageIndex].classList.add('active');
    startCarousel(); // Restart timer
  }

  function startCarousel() {
    stopCarousel();
    if (imageElements.length > 1 && !reducedMotion) {
      carouselInterval = setInterval(advanceCarousel, DISPLAY_TIME);
    }
  }

  function stopCarousel() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
  }

  function updateProgress(index) {
    if (!progress) return;
    const pct = ((index + 1) / totalProjects) * 100;
    progress.style.width = pct + '%';
  }

  function updateSelectors(index) {
    selectors.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
      btn.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    if (selectors[index]) {
      selectors[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  function switchProject(index) {
    if (isAnimatingProject || index === currentProjectIndex) return;
    isAnimatingProject = true;
    stopCarousel();

    const proj = projects[index];

    if (reducedMotion) {
      renderProjectImages(index);
      numEl.textContent = proj.num;
      catEl.textContent = proj.category;
      titleEl.textContent = proj.title;
      metaEl.innerHTML = `<i class="bi bi-geo-alt"></i> ${proj.location}`;
      descEl.textContent = proj.desc;
      counterEl.textContent = `${proj.num} / 0${totalProjects}`;
      currentProjectIndex = index;
      updateProgress(index);
      updateSelectors(index);
      isAnimatingProject = false;
      return;
    }

    // Fade text out and current images out
    details.classList.add('is-transitioning');
    imageElements.forEach(img => img.classList.add('is-transitioning'));

    setTimeout(() => {
      renderProjectImages(index);

      numEl.textContent = proj.num;
      catEl.textContent = proj.category;
      titleEl.textContent = proj.title;
      metaEl.innerHTML = `<i class="bi bi-geo-alt"></i> ${proj.location}`;
      descEl.textContent = proj.desc;
      counterEl.textContent = `${proj.num} / 0${totalProjects}`;

      currentProjectIndex = index;
      updateProgress(index);
      updateSelectors(index);

      // Force reflow
      void imgContainer.offsetWidth;

      // Fade back in
      details.classList.remove('is-transitioning');

      setTimeout(() => {
        isAnimatingProject = false;
        startCarousel();
      }, 650);
    }, 480);
  }

  // Initial render
  renderProjectImages(0);

  // Hover events
  const hoverTarget = imageWrap || imgContainer;
  hoverTarget.addEventListener('mouseenter', () => { isHovered = true; });
  hoverTarget.addEventListener('mouseleave', () => { isHovered = false; });

  // Touch swipe events on mobile
  let touchStartX = 0;
  let touchEndX = 0;

  imgContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopCarousel();
  }, { passive: true });

  imgContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startCarousel();
  }, { passive: true });

  function handleSwipe() {
    if (imageElements.length <= 1) return;
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      // Swipe left (next image)
      advanceCarousel();
    } else if (touchEndX > touchStartX + threshold) {
      // Swipe right (prev image)
      const prevIndex = currentImageIndex;
      currentImageIndex = (currentImageIndex - 1 + imageElements.length) % imageElements.length;
      imageElements[prevIndex].classList.remove('active');
      imageElements[currentImageIndex].classList.add('active');
    }
  }

  // Selector clicks
  selectors.forEach((btn, i) => {
    btn.addEventListener('click', () => switchProject(i));
  });

  // Image Carousel Prev / Next Buttons
  if (imgPrevBtn) {
    imgPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      previousCarouselManual();
    });
  }

  if (imgNextBtn) {
    imgNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      advanceCarouselManual();
    });
  }

  // Prev / Next Project Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const idx = (currentProjectIndex - 1 + totalProjects) % totalProjects;
      switchProject(idx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const idx = (currentProjectIndex + 1) % totalProjects;
      switchProject(idx);
    });
  }

  // Keyboard nav when section is in focus
  section.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') switchProject((currentProjectIndex + 1) % totalProjects);
    if (e.key === 'ArrowLeft') switchProject((currentProjectIndex - 1 + totalProjects) % totalProjects);
  });

  // Section entry animation via IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('projects-visible');
        startCarousel(); // Start carousel only when visible
        observer.unobserve(section);
      }
    });
  }, { threshold: 0.12 });
  observer.observe(section);

  updateProgress(0);
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
   11b. About Visual Reveal (Custom 3-part animation)
   -------------------------------------------------------------------------- */
function initAboutVisualReveal() {
  const aboutVisual = document.getElementById('about-visual');
  if (!aboutVisual) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

  observer.observe(aboutVisual);
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

