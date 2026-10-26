// Generates the inner pages into the project root, using the home page's design system.
// The home page (index.html) is hand-authored and is NOT generated or touched by this script.
// Usage: node build-site.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, SERVICES, PROJECTS, PROJECT_FILTERS, GALLERY_FILTERS, CLIENTS, TESTIMONIALS, FAQS, WHY } from './site/data.mjs';
import { IM, esc, split, img, page, breadcrumbLd } from './site/ui.mjs';
import { aboutBody } from './about-page.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const written = [];
const write = (file, html) => { fs.writeFileSync(path.join(root, file), html); written.push(file); };
const TEL = `tel:${SITE.tel}`;
const svcBySlug = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));
const projBySlug = Object.fromEntries(PROJECTS.map((x) => [x.slug, x]));
const svcHref = (s) => `service-${s.slug}.html`;
const projHref = (x) => `project-${x.slug}.html`;
const isLandscape = (id) => IM[id].w >= 1000 && IM[id].w > IM[id].h;
const bi = (n) => `<i class="bi bi-${n}"></i>`;

/* ---------- fragments (home page classes) ---------- */
const sec = (inner, cls = '') => `
  <section class="section-padding ${cls}">
    <div class="container">${inner}
    </div>
  </section>`;

const head = (eyebrow, title, lead, center = false) => `
      <div class="${center ? 'text-center mx-auto ' : ''}max-w-700 mb-5 reveal-on-scroll">
        <div class="services-eyebrow ${center ? 'mx-auto ' : ''}mb-3">${esc(eyebrow)}</div>
        <h2 class="heading-editorial">${split(title)}</h2>${lead ? `\n        <p class="subheading-editorial${center ? ' mx-auto' : ''}">${esc(lead)}</p>` : ''}
      </div>`;

const checklist = (items, cols2 = false) => `<ul class="inner-checklist${cols2 ? ' cols-2' : ''}">${items.map((i) => `<li>${bi('check2-circle')}<span>${esc(i)}</span></li>`).join('')}</ul>`;

const steps = (items) => `<div class="row g-4">${items.map(([t, d], i) => `
        <div class="col-md-6 col-lg-4 reveal-on-scroll delay-${i % 3}"><div class="inner-step"><span class="inner-num">${String(i + 1).padStart(2, '0')}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`).join('')}
      </div>`;

const textCards = (items, cols = 'col-md-6 col-lg-4') => `<div class="row g-4">${items.map(([t, d], i) => `
        <div class="${cols} reveal-on-scroll delay-${i % 3}"><div class="inner-text-card"><h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`).join('')}
      </div>`;

const faqHtml = (items) => `<div class="faq-accordion">${items.map(([q, a]) => `
        <div class="faq-item"><div class="faq-header"><h3 class="faq-title">${esc(q)}</h3><div class="faq-toggle-icon">${bi('chevron-down')}</div></div><div class="faq-body"><p class="mb-0 text-secondary">${esc(a)}</p></div></div>`).join('')}
      </div>`;
const faqLd = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });

const logos = () => `<ul class="inner-logos">${CLIENTS.map(([f, n]) => `<li><img src="assets/images/7petals-logo/${f}" alt="${esc(n)}" loading="lazy" decoding="async" height="48"></li>`).join('')}</ul>`;

const quotes = () => `<div class="row g-4">${TESTIMONIALS.map((t, i) => `
        <div class="col-lg-4 reveal-on-scroll delay-${i}"><div class="testimonial-card"><p class="quote-text">“${esc(t)}”</p><div class="client-meta"><div><div class="client-name">Client feedback</div><div class="client-role">7 Petals Horticulture</div></div></div></div></div>`).join('')}
      </div>`;

const SIZES_CARD = '(min-width: 992px) 33vw, (min-width: 576px) 50vw, 100vw';

function projectCard(x, i = 0) {
  return `
        <div class="col-md-6 col-lg-4 reveal-on-scroll delay-${i % 3}" data-cat="${x.cats.join(' ')}">
          <article class="inner-card"><span class="inner-tag">${esc(x.type)}</span>
            <div class="inner-card-img">${img(x.hero, { sizes: SIZES_CARD })}</div>
            <div class="inner-card-body"><div class="inner-card-meta">${esc(x.client)}${x.location ? ' · ' + esc(x.location) : ''}</div>
              <h3><a href="${projHref(x)}">${esc(x.name)}</a></h3><p>${esc(x.summary)}</p>
              <span class="inner-card-link">View project ${bi('arrow-right')}</span></div></article>
        </div>`;
}
function serviceCard(s, i = 0) {
  const im = s.hero === 'bg-leaves' ? s.side : s.hero;
  return `
        <div class="col-md-6 col-lg-4 reveal-on-scroll delay-${i % 3}">
          <article class="inner-card">
            <div class="inner-card-img">${img(im, { sizes: SIZES_CARD })}</div>
            <div class="inner-card-body"><h3><a href="${svcHref(s)}">${esc(s.title)}</a></h3><p>${esc(s.card)}</p>
              <span class="inner-card-link">Learn more ${bi('arrow-right')}</span></div></article>
        </div>`;
}
function galleryItem(id, caption) {
  const m = IM[id];
  const cap = caption ?? `${m.proj ? projBySlug[m.proj].name + ' — ' : ''}${m.cap}`;
  return `
        <div class="gallery-item" data-category="${m.cat}"><div class="gallery-img-wrap">${img(id, { sizes: '(min-width: 1200px) 25vw, (min-width: 768px) 33vw, 50vw', cls: 'gallery-img', full: true })}
          <div class="gallery-overlay"><div class="gallery-overlay-content">${bi('zoom-in')}<h4 class="gallery-title">${esc(cap)}</h4></div></div></div></div>`;
}
const galleryGrid = (ids, captionFn) => `<div class="gallery-grid inner-gallery">${ids.map((id) => galleryItem(id, captionFn?.(id))).join('')}
      </div>`;

function pageHero({ trail, title, lead, image, ctas = '' }) {
  return `
  <section class="about-page-hero">
    ${img(image, { sizes: '100vw', priority: true, alt: '', cls: 'about-page-hero-bg' })}
    <div class="about-page-hero-overlay"></div>
    <div class="container position-relative z-3">
      <div class="about-hero-content">
        <ol class="inner-breadcrumb">${trail.map(([l, h], i) => (h && i < trail.length - 1 ? `<li><a href="${h}">${esc(l)}</a></li>` : `<li aria-current="page">${esc(l)}</li>`)).join('')}</ol>
        <h1 class="heading-editorial text-white mb-3">${split(title)}</h1>
        ${lead ? `<p class="about-hero-subtitle">${esc(lead)}</p>` : ''}
        ${ctas ? `<div class="about-hero-ctas">${ctas}</div>` : ''}
      </div>
    </div>
  </section>`;
}
const heroCtas = (a = ['Discuss Your Project', 'contact.html'], b = [`Call ${SITE.phone}`, TEL]) =>
  `<a href="${a[1]}" class="btn-editorial btn-editorial-primary"><span>${esc(a[0].toUpperCase())}</span>${bi('arrow-right')}</a><a href="${b[1]}" class="btn-editorial btn-editorial-outline"><span>${esc(b[0].toUpperCase())}</span>${bi(b[2] || 'telephone')}</a>`;

function ctaBand(title = 'Planning an Outdoor Project?|From Site to Finished Landscape.', text = 'From hardscape and civil finishing to softscape and garden development, 7 Petals helps turn outdoor spaces into functional, finished and visually appealing environments. Let’s discuss your project requirements.') {
  return `
  <section class="contact-cta-banner">
    <div class="container">
      <div class="contact-cta-content">
        <div class="services-eyebrow mb-3" style="color: rgba(255,255,255,0.8);">GET IN TOUCH</div>
        <h2 class="heading-editorial text-white">${split(title)}</h2>
        <p class="contact-cta-subtitle">${esc(text)}</p>
        <div class="contact-cta-buttons">
          <a href="contact.html" class="btn-editorial btn-editorial-primary">${bi('chat-dots')} Discuss Your Project</a>
          <a href="${TEL}" class="btn-editorial btn-editorial-light">${bi('telephone-fill')} Call ${SITE.phone}</a>
          <a href="https://wa.me/${SITE.whatsapp}?text=Hello%207%20Petals%20Horticulture,%20I%20would%20like%20to%20discuss%20a%20project" target="_blank" rel="noopener noreferrer" class="btn-editorial btn-whatsapp">${bi('whatsapp')} WhatsApp Us</a>
        </div>
      </div>
    </div>
  </section>`;
}

/* ================= ABOUT ================= */
function about() {
  const trail = [['Home', 'index.html'], ['About Us']];
  const hero = pageHero({ trail, title: 'Landscaping & Horticulture|Built for Real Spaces.', lead: 'Landscape execution, hardscape, civil finishing and horticulture solutions for residential, commercial and institutional spaces.', image: 'gcorp-walk', ctas: heroCtas(['Our Story', '#about'], ['What We Do', '#what-we-do', 'arrow-down']) });
  const body = aboutBody({ hero, ctaBand: ctaBand(), head });
  write('about.html', page({ file: 'about.html', title: 'About 7 Petals Horticulture | Landscape Execution & Hardscape Experts', desc: 'About 7 Petals Horticulture (India) Pvt. Ltd.: execution-focused landscaping, hardscape and horticulture company in Mumbai, established 2014, led by founder Amit Walawalkar.', body, ld: [breadcrumbLd(trail)], ogImage: 'gcorp-walk' }));
}

/* ================= SERVICES ================= */
function servicesHub() {
  const trail = [['Home', 'index.html'], ['Services']];
  const core = [svcBySlug['hardscape-civil-finishing'], svcBySlug['softscape-plantation']];
  const body = `
${pageHero({ trail, title: 'Landscaping &|Outdoor Works', lead: 'Hardscape, civil finishing, softscape and horticulture services — coordinated through one execution partner.', image: 'seawoods-promenade', ctas: heroCtas() })}
${sec(`${head('CORE SERVICES', 'Two Pillars,|One Complete Landscape', 'We execute the built and the living elements of an outdoor space together.')}
      <div class="row g-4">${core.map((s, i) => serviceCard(s, i).replace('col-md-6 col-lg-4', 'col-md-6')).join('')}
      </div>`)}
${sec(`${head('ALL SERVICES', 'Everything Your|Outdoor Space Needs')}
      <div class="row g-4">${SERVICES.filter((s) => !core.includes(s)).map((s, i) => serviceCard(s, i)).join('')}
      </div>`, 'bg-alt')}
${ctaBand()}`;
  write('services.html', page({ file: 'services.html', title: 'Landscaping, Hardscape & Horticulture Services | 7 Petals', desc: 'Hardscape & civil finishing, softscape, landscape execution, gardening, vertical and terrace gardens, tree transplantation, irrigation, consultancy, nursery and fabrication by 7 Petals.', body, ld: [breadcrumbLd(trail)], ogImage: 'seawoods-promenade' }));
}

function servicePages() {
  SERVICES.forEach((s, idx) => {
    const trail = [['Home', 'index.html'], ['Services', 'services.html'], [s.title]];
    const heroImg = isLandscape(s.hero) ? s.hero : 'bg-leaves';
    const related = s.projects.map((x) => projBySlug[x]).filter(Boolean);
    const next = [1, 2, 3].map((n) => SERVICES[(idx + n) % SERVICES.length]);
    const blocks = (s.blocks || []).filter((b) => b.items.length || b.lead);
    const body = `
${pageHero({ trail, title: s.title, lead: s.card, image: heroImg, ctas: heroCtas() })}
${sec(`
      <div class="row g-5 align-items-center">
        <div class="col-lg-5 reveal-on-scroll"><div class="inner-img">${img(s.side, { sizes: '(min-width: 992px) 40vw, 100vw' })}</div></div>
        <div class="col-lg-7 reveal-on-scroll delay-1">
          <div class="services-eyebrow mb-3">${esc(s.title.toUpperCase())}</div>
          <h2 class="heading-editorial-sm">${esc(s.heading)}</h2>
          ${s.intro.map((t) => `<p>${esc(t)}</p>`).join('')}
          <h3 class="h5 fw-bold mt-4">${esc(s.listTitle)}</h3>
          ${checklist(s.list, true)}
          <a href="contact.html" class="btn-editorial btn-editorial-primary"><span>DISCUSS YOUR PROJECT</span>${bi('arrow-right')}</a>
        </div>
      </div>`)}
${s.showcase ? sec(`${head('OUR WORK IN PICTURES', 'Hardscape|We Have Executed', s.showcase.lead)}
      <div class="row g-4">${s.showcase.items.map(([id, t, d], i) => `
        <div class="col-md-6 col-lg-4 reveal-on-scroll delay-${i % 3}"><article class="inner-card"><div class="inner-card-img">${img(id, { sizes: SIZES_CARD })}</div><div class="inner-card-body"><h3>${esc(t)}</h3><p class="mb-0">${esc(d)}</p></div></article></div>`).join('')}
      </div>`, 'bg-alt') : ''}
${s.types ? sec(`${head('SYSTEMS', 'Types of|Irrigation We Install')}${textCards(s.types)}`, 'bg-alt') : ''}
${s.benefits ? sec(`${head('BENEFITS', s.benefitsTitle)}${textCards(s.benefits)}`, s.showcase || s.types ? '' : 'bg-alt') : ''}
${sec(`${head('PROCESS', s.stepsTitle)}${steps(s.steps)}`, 'inner-dark')}
${blocks.map((b) => sec(`
      <div class="row g-5"><div class="col-lg-5 reveal-on-scroll"><h2 class="heading-editorial-sm">${esc(b.title)}</h2>${b.lead ? `<p class="inner-lead">${esc(b.lead)}</p>` : ''}</div>${b.items.length ? `<div class="col-lg-7 reveal-on-scroll delay-1">${checklist(b.items, true)}</div>` : ''}</div>`)).join('')}
${s.why ? sec(`
      <div class="row g-5"><div class="col-lg-5 reveal-on-scroll"><h2 class="heading-editorial-sm">${esc(s.why.title)}</h2></div><div class="col-lg-7 reveal-on-scroll delay-1"><p class="inner-lead">${esc(s.why.text)}</p></div></div>`, 'bg-alt') : ''}
${s.gallery.length >= 3 ? sec(`${head('PHOTO GALLERY', s.title + '|in the Field')}
      ${galleryGrid(s.gallery)}`) : ''}
${related.length ? sec(`${head('RELATED PROJECTS', 'See This Work|On Site')}<div class="row g-4">${related.map((x, i) => projectCard(x, i)).join('')}
      </div>`, 'bg-alt') : ''}
${sec(`${head('EXPLORE MORE', 'Other|Services')}<div class="row g-4">${next.map((n, i) => serviceCard(n, i)).join('')}
      </div>`, related.length ? '' : 'bg-alt')}
${ctaBand(`Planning ${/^[AEIOU]/i.test(s.title) ? 'an' : 'a'} ${s.title} Project?|Let’s Talk.`, 'Tell us about your site and requirements. Our team will arrange a consultation and provide a customised quotation.')}`;
    write(svcHref(s), page({ file: svcHref(s), title: `${s.title} | 7 Petals Horticulture, Mumbai`, desc: s.desc, body, ld: [breadcrumbLd(trail)], ogImage: isLandscape(s.hero) ? s.hero : s.side }));
  });
}

/* ================= PROJECTS ================= */
function projectsHub() {
  const trail = [['Home', 'index.html'], ['Projects']];
  const body = `
${pageHero({ trail, title: 'Our Work Speaks|Through Execution', lead: 'From structured hardscape and civil finishing to carefully executed plantation and garden development.', image: 'trees-pond', ctas: heroCtas(['Project Gallery', 'gallery.html']) })}
${sec(`
      <div class="row g-5 mb-5">
        <div class="col-lg-6 reveal-on-scroll"><p class="inner-lead">Our projects reflect 7 Petals’ experience across hardscape, civil finishing, landscape execution, softscape, plantation, gardening, irrigation and horticulture solutions.</p></div>
        <div class="col-lg-6 reveal-on-scroll delay-1"><p>Each project is different. Our role is to understand the site requirements, coordinate the relevant services and execute the work with attention to quality and finishing.</p></div>
      </div>
      <div class="inner-filters" role="group" aria-label="Filter projects by type" data-project-filters>${PROJECT_FILTERS.map(([k, l], i) => `<button type="button" class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${k}">${esc(l)}</button>`).join('')}</div>
      <div class="row g-4">${PROJECTS.map((x, i) => projectCard(x, i)).join('')}
      </div>`)}
${sec(`${head('OUR CLIENTS', 'Trusted by Leading|Developers & Institutions', 'Client logos from our company presentation.')}
      <div class="reveal-on-scroll">${logos()}</div>
      <p class="mt-5"><a href="gallery.html" class="btn-editorial btn-editorial-primary"><span>VIEW OUR PROJECT GALLERY</span>${bi('arrow-right')}</a></p>`, 'bg-alt')}
${ctaBand()}`;
  write('projects.html', page({ file: 'projects.html', title: 'Projects | Landscape & Hardscape Work by 7 Petals Horticulture', desc: 'Selected landscaping, hardscape and softscape projects by 7 Petals: Rustomjee, Godrej, Piramal, G Corp Tech Park, Oberoi, Nirlon and municipal gardens.', body, ld: [breadcrumbLd(trail)], ogImage: 'trees-pond' }));
}

function projectPages() {
  PROJECTS.forEach((x, idx) => {
    const trail = [['Home', 'index.html'], ['Projects', 'projects.html'], [x.name]];
    const heroImg = isLandscape(x.hero) && IM[x.hero].w >= 1280 ? x.hero : 'bg-leaves';
    const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
    const nxt = PROJECTS[(idx + 1) % PROJECTS.length];
    const meta = [['Client', x.client], ['Type', x.type], ...(x.location ? [['Location', x.location]] : []), ['Scope of work', x.scope.join(', ')]];
    const body = `
${pageHero({ trail, title: x.name, lead: x.summary, image: heroImg, ctas: heroCtas(['Discuss Your Project', 'contact.html'], ['All Projects', 'projects.html']) })}
${sec(`
      <dl class="inner-meta reveal-on-scroll" style="--cols:${meta.length}">${meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      ${x.detail ? `<div class="mt-5 reveal-on-scroll"><h2 class="heading-editorial-sm">Project highlights</h2><p class="inner-lead">${esc(x.detail)}</p></div>` : ''}
      <div class="mt-5">${galleryGrid(x.images, (id) => `${x.name} — ${IM[id].cap}`)}</div>`)}
${sec(`${head('SERVICES ON THIS PROJECT', 'Related|Services')}<div class="row g-4">${x.services.map((sl, i) => serviceCard(svcBySlug[sl], i)).join('')}
      </div>
      <div class="d-flex flex-wrap gap-3 mt-5"><a class="btn-editorial btn-editorial-outline" href="${projHref(prev)}"><span>← ${esc(prev.name.toUpperCase())}</span></a><a class="btn-editorial btn-editorial-outline" href="${projHref(nxt)}"><span>${esc(nxt.name.toUpperCase())} →</span></a></div>`, 'bg-alt')}
${ctaBand()}`;
    write(projHref(x), page({ file: projHref(x), title: `${x.name} | Landscape Project by 7 Petals Horticulture`, desc: `${x.summary} Project by 7 Petals Horticulture.`.slice(0, 300), body, ld: [breadcrumbLd(trail)], ogImage: x.hero }));
  });
}

/* ================= GALLERY / TESTIMONIALS / FAQ / CONTACT ================= */
function gallery() {
  const trail = [['Home', 'index.html'], ['Gallery']];
  const ids = Object.keys(IM).filter((id) => IM[id].cat !== 'bg');
  const body = `
${pageHero({ trail, title: 'Project|Gallery', lead: 'Photographs from our project files — hardscape, softscape, terrace and vertical gardens, tree transplantation and more. Captions name the client where our records identify the project.', image: 'oberoi-aerial', ctas: heroCtas(['View Projects', 'projects.html']) })}
${sec(`
      <div class="gallery-filters text-center mb-5">${GALLERY_FILTERS.map(([k, l], i) => `<button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${k}">${esc(l)}</button>`).join('')}</div>
      ${galleryGrid(ids)}`, 'gallery-section')}
${sec(`${head('PROJECT LIST', 'Projects Featured|in the Gallery')}<div class="d-flex flex-wrap gap-2">${PROJECTS.map((x) => `<a class="btn-editorial btn-editorial-outline" href="${projHref(x)}"><span>${esc(x.name.toUpperCase())}</span></a>`).join('')}</div>`, 'bg-alt')}
${ctaBand()}`;
  write('gallery.html', page({ file: 'gallery.html', title: 'Gallery | Landscape, Hardscape & Garden Photographs | 7 Petals', desc: 'Photo gallery of 7 Petals Horticulture projects: hardscape, softscape, terrace gardens, vertical gardens and tree transplantation.', body, ld: [breadcrumbLd(trail)], ogImage: 'oberoi-aerial' }));
}

function testimonials() {
  const trail = [['Home', 'index.html'], ['Testimonials']];
  const body = `
${pageHero({ trail, title: 'What Our|Clients Say', lead: 'Feedback on our landscaping and outdoor execution work.', image: 'crown-pool', ctas: heroCtas(['View Projects', 'projects.html']) })}
${sec(quotes())}
${sec(`${head('OUR CLIENTS', 'Clients We Have|Worked With', 'Logos from our company presentation.')}<div class="reveal-on-scroll">${logos()}</div>`, 'bg-alt')}
${ctaBand()}`;
  write('testimonials.html', page({ file: 'testimonials.html', title: 'Client Testimonials | 7 Petals Horticulture', desc: 'What clients say about 7 Petals Horticulture’s landscaping and hardscape execution, plus the developers and institutions we have worked with.', body, ld: [breadcrumbLd(trail)], ogImage: 'crown-pool' }));
}

function faq() {
  const trail = [['Home', 'index.html'], ['FAQ']];
  const body = `
${pageHero({ trail, title: 'Your Questions.|Our Answers.', lead: 'Answers about our hardscape, softscape and landscaping services.', image: 'gcorp-lawn', ctas: heroCtas() })}
${sec(`${faqHtml(FAQS)}<p class="text-center mt-5">Didn’t find your answer? <a href="contact.html" class="fw-bold">Contact our team</a>.</p>`)}
${ctaBand()}`;
  write('faq.html', page({ file: 'faq.html', title: 'FAQ | Hardscape, Softscape & Landscaping Questions | 7 Petals', desc: 'Answers to common questions about 7 Petals Horticulture: hardscape vs softscape, landscape execution, maintenance contracts, irrigation, plant supply and quotations.', body, ld: [breadcrumbLd(trail), faqLd(FAQS)], ogImage: 'gcorp-lawn' }));
}

function contact() {
  const trail = [['Home', 'index.html'], ['Contact Us']];
  const body = `
${pageHero({ trail, title: 'Let’s Create Beautiful|Green Spaces Together', lead: 'Whether you’re planning a residential garden, commercial landscape, terrace garden or large-scale outdoor project, our team is here to help.', image: 'vaikunth-clubhouse' })}
${sec(`
      <div class="row g-5">
        <div class="col-lg-5 reveal-on-scroll">
          <div class="services-eyebrow mb-3">GET IN TOUCH</div>
          <h2 class="heading-editorial-sm">Request a free consultation</h2>
          <p>Get in touch for professional landscaping solutions tailored to your requirements. We will arrange a consultation and provide a customised quotation.</p>
          <ul class="inner-contact-list">
            <li>${bi('telephone-fill')}<div><strong>Phone</strong><a href="${TEL}">${SITE.phone}</a></div></li>
            <li>${bi('whatsapp')}<div><strong>WhatsApp</strong><a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">${SITE.whatsappDisplay}</a></div></li>
            <li>${bi('envelope-fill')}<div><strong>Email</strong><a href="mailto:${SITE.email}">${SITE.email}</a></div></li>
            <li>${bi('geo-alt-fill')}<div><strong>Office</strong>${esc(SITE.addressLine)}<br>${esc(SITE.nursery)}</div></li>
          </ul>
        </div>
        <div class="col-lg-7 reveal-on-scroll delay-1">
          <form class="inner-form" id="enquiry-form" data-email="${SITE.email}" data-wa="${SITE.whatsapp}" novalidate>
            <div class="row g-3">
              <div class="col-md-6"><label for="f-name">Your name *</label><input class="form-control" id="f-name" name="name" required autocomplete="name"></div>
              <div class="col-md-6"><label for="f-phone">Phone *</label><input class="form-control" id="f-phone" name="phone" type="tel" required autocomplete="tel"></div>
              <div class="col-md-6"><label for="f-email">Email</label><input class="form-control" id="f-email" name="email" type="email" autocomplete="email"></div>
              <div class="col-md-6"><label for="f-type">Project type</label><select class="form-select" id="f-type" name="type"><option>Residential</option><option>Commercial</option><option>Industrial</option><option>Institutional</option><option>Hospitality</option><option>Large-scale development</option><option>Other</option></select></div>
              <div class="col-12"><label for="f-loc">Project location</label><input class="form-control" id="f-loc" name="location"></div>
              <div class="col-12"><label for="f-msg">Tell us about your project *</label><textarea class="form-control" id="f-msg" name="message" rows="5" required></textarea></div>
            </div>
            <div class="d-flex flex-wrap gap-3 mt-4"><button class="btn-editorial btn-editorial-primary" type="submit"><span>SEND BY EMAIL</span>${bi('arrow-right')}</button><button class="btn-editorial btn-editorial-outline" type="button" id="enquiry-whatsapp">${bi('whatsapp')}<span>SEND ON WHATSAPP</span></button></div>
            <p class="inner-note">This form prepares your enquiry in your email app or WhatsApp — nothing is stored on this website. See our <a href="privacy-policy.html">Privacy Policy</a>.</p>
            <p class="fw-semibold text-success" id="form-status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>`)}`;
  write('contact.html', page({ file: 'contact.html', title: 'Contact 7 Petals Horticulture | Request a Free Consultation', desc: 'Contact 7 Petals Horticulture in Vikhroli East, Mumbai for landscaping, hardscape and softscape projects. Call +91 98192 50088 or email 7petals.horti@gmail.com.', body, ld: [breadcrumbLd(trail)], ogImage: 'vaikunth-clubhouse' }));
}

/* ================= LEGAL (drafts) ================= */
function legal(file, title, desc, bodyHtml) {
  const trail = [['Home', 'index.html'], [title]];
  const body = `
${pageHero({ trail, title, image: 'bg-leaves' })}
${sec(`<div class="inner-notice"><strong>Draft for client review.</strong> This wording is a general draft and must be reviewed and approved by 7 Petals (and, where appropriate, legal counsel) before it is relied on.</div><div class="inner-prose">${bodyHtml}</div>`)}`;
  write(file, page({ file, title: `${title} | 7 Petals Horticulture`, desc, body, ld: [breadcrumbLd(trail)], noindex: true, ogImage: 'bg-leaves' }));
}
function legalPages() {
  legal('privacy-policy.html', 'Privacy Policy', 'Draft privacy policy for the 7 Petals Horticulture website.', `
<p>${esc(SITE.name)} (“7 Petals”, “we”) respects your privacy. This page explains how information is handled when you use this website.</p>
<h2>Information you give us</h2><p>When you contact us by phone, email, WhatsApp or the enquiry form, we receive the details you choose to share, such as your name, phone number, email address, project location and message. The enquiry form on this website does not store anything on the site; it prepares a message in your own email app or WhatsApp, which you then send.</p>
<h2>How we use it</h2><ul><li>To respond to your enquiry and arrange consultations or quotations.</li><li>To deliver and follow up on services you request.</li></ul>
<h2>Sharing</h2><p>We do not sell your information. We may share it with project partners or service providers only where needed to deliver the work you request, or where required by law.</p>
<h2>Cookies and analytics</h2><p>This website does not currently set advertising cookies. If analytics or similar tools are added, this policy will be updated.</p>
<h2>Third-party links</h2><p>Links such as WhatsApp open services run by third parties, with their own privacy practices.</p>
<h2>Your choices</h2><p>You may ask us to correct or delete the personal information we hold about you by writing to <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
<h2>Contact</h2><p>${esc(SITE.name)}, ${esc(SITE.addressLine)}. Email: <a href="mailto:${SITE.email}">${SITE.email}</a>. Phone: <a href="${TEL}">${SITE.phone}</a>.</p>`);
  legal('terms-and-conditions.html', 'Terms & Conditions', 'Draft terms and conditions for the 7 Petals Horticulture website and services.', `
<p>By using this website you agree to these terms. They apply to the website; project work is governed by the written quotation or contract agreed for that project.</p>
<h2>Website content</h2><p>Information and photographs on this website are provided for general information. Project photographs are from 7 Petals project files. Content may be updated without notice.</p>
<h2>Quotations and services</h2><ul><li>Quotations are prepared after discussing requirements and, where needed, a site visit.</li><li>Scope, timelines, payment terms and warranties are as set out in the written quotation or work order for each project.</li><li>Plant growth depends on site conditions and ongoing care; living plants are not guaranteed beyond what is agreed in writing.</li></ul>
<h2>Intellectual property</h2><p>Text, designs, logos and photographs on this website belong to 7 Petals or the relevant client or owner and may not be reused without permission. Client logos are shown to identify clients we have worked with.</p>
<h2>Limitation of liability</h2><p>To the extent permitted by law, 7 Petals is not liable for losses arising from use of this website or reliance on its general information.</p>
<h2>Governing law</h2><p>These terms are governed by the laws of India. [Jurisdiction wording to be confirmed by 7 Petals.]</p>
<h2>Contact</h2><p>Questions about these terms: <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>`);
  legal('eco-policy.html', 'Eco Policy', 'Draft environmental policy for 7 Petals Horticulture.', `
<p>7 Petals Horticulture works with plants, soil and water every day, so responsible environmental practice is part of our work. This draft summarises commitments drawn from our approach; it is to be confirmed by the company.</p>
<h2>Our approach</h2><ul><li><strong>Efficient water use:</strong> drip and sprinkler irrigation designed to reduce water wastage.</li><li><strong>Right plant, right place:</strong> species selected for climate, soil and maintenance needs to support healthy, long-lived planting.</li><li><strong>Preserving mature trees:</strong> tree transplantation as an alternative to removal where site conditions and tree health permit.</li><li><strong>Durable construction:</strong> well-executed hardscape and finishing that lasts, reducing rework and waste.</li><li><strong>Own nursery:</strong> plants grown and sourced through our nursery at Karjat.</li></ul>
<p>[Company-specific targets, certifications and waste-handling practices to be added by 7 Petals if required.]</p>`);
}

/* ================= 404, sitemap, robots ================= */
function misc() {
  write('404.html', page({ file: '404.html', title: 'Page not found | 7 Petals Horticulture', desc: 'Page not found.', noindex: true, ogImage: 'bg-leaves', body: `
${pageHero({ trail: [['Home', 'index.html'], ['Page not found']], title: 'Page Not|Found', lead: 'The page may have moved. Try one of the links below.', image: 'bg-leaves', ctas: heroCtas(['Home', 'index.html'], ['Services', 'services.html']) })}` }));
  const skip = ['404.html', 'privacy-policy.html', 'terms-and-conditions.html', 'eco-policy.html'];
  const urls = ['index.html', ...written.filter((f) => !skip.includes(f))];
  fs.writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((f) => `  <url><loc>${SITE.domain}/${f === 'index.html' ? '' : f}</loc></url>`).join('\n')}\n</urlset>\n`);
  fs.writeFileSync(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE.domain}/sitemap.xml\n`);
}

about(); servicesHub(); servicePages(); projectsHub(); projectPages(); gallery(); testimonials(); faq(); contact(); legalPages(); misc();
console.log(`${written.length} pages written`);
