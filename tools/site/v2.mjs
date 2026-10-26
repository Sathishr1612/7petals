// v2 (premium forest) HTML components shared by the inner pages and the home page sections below the hero.
import { SITE, SERVICES, PROJECTS, CLIENTS } from './data.mjs';
import { IM, esc, img } from './ui.mjs';

export const TEL = `tel:${SITE.tel}`;
export const bi = (n) => `<i class="bi bi-${n}" aria-hidden="true"></i>`;
export const svcBySlug = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));
export const projBySlug = Object.fromEntries(PROJECTS.map((x) => [x.slug, x]));
export const svcHref = (s) => `service-${s.slug}.html`;
export const projHref = (x) => `project-${x.slug}.html`;
export const isWide = (id, min = 1000) => IM[id].w >= min && IM[id].w > IM[id].h;
export const full = (id) => { const ws = IM[id].widths; return `assets/img/${id}-${ws.filter((x) => x <= 1280).at(-1) ?? ws.at(-1)}.webp`; };

export const sec = (inner, { cls = '', wide = false, id = '' } = {}) => `
  <section class="v2-sec ${cls}"${id ? ` id="${id}"` : ''}>
    <div class="${wide ? 'v2-wrap v2-wrap--wide' : 'v2-wrap'}">${inner}
    </div>
  </section>`;

export const head = (eyebrow, title, lead = '', { center = false, row = false } = {}) => `
      <div class="v2-head${center ? ' v2-head--center' : ''}${row ? ' v2-head--row' : ''} v2-reveal">
        <div><span class="v2-eyebrow">${esc(eyebrow)}</span>
        <h2>${esc(title)}</h2></div>${lead ? `\n        <p class="v2-lead">${esc(lead)}</p>` : ''}
      </div>`;

export const checks = (items, two = false) => `<ul class="v2-checks${two ? ' v2-checks--2' : ''}">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
export const steps = (items, row = false) => `<ol class="v2-steps${row ? ' v2-steps--row' : ''}">${items.map(([t, d], i) => `
        <li class="v2-reveal" data-d="${i % 3}"><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('')}
      </ol>`;
export const rules = (items) => `<ul class="v2-rules">${items.map(([t, d]) => `
        <li class="v2-reveal"><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('')}
      </ul>`;
export const features = (items, cols = 3) => `<div class="v2-grid v2-grid--${cols}">${items.map(([t, d], i) => `
        <div class="v2-reveal" data-d="${i % 3}"><div class="v2-feature"><h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`).join('')}
      </div>`;

export const faqList = (items) => items.map(([q, a]) => `<details><summary>${esc(q)}</summary><div><p>${esc(a)}</p></div></details>`).join('');
export const faqLd = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });

export const logos = () => `<ul class="v2-logos">${CLIENTS.map(([f, n]) => `<li><img src="assets/images/7petals-logo/${f}" alt="${esc(n)}" loading="lazy" decoding="async" height="44"></li>`).join('')}</ul>`;

const CARD_SIZES = '(min-width: 980px) 33vw, (min-width: 640px) 50vw, 100vw';

export function projectCard(x, i = 0, sizes = CARD_SIZES) {
  return `
        <article class="v2-card v2-reveal" data-d="${i % 3}" data-cat="${x.cats.join(' ')}">
          <span class="v2-tag">${esc(x.type)}</span>
          <div class="v2-img v2-img--43">${img(x.hero, { sizes })}</div>
          <div class="v2-card-body"><div class="v2-card-meta">${esc(x.client)}${x.location ? ' · ' + esc(x.location) : ''}</div>
            <h3><a href="${projHref(x)}">${esc(x.name)}</a></h3><p>${esc(x.summary)}</p>
            <span class="v2-link">View project ${bi('arrow-right')}</span></div>
        </article>`;
}

export function serviceTile(s, i = 0, tall = false) {
  const im = s.hero === 'bg-leaves' ? s.side : s.hero;
  return `
        <a class="v2-tile${tall ? ' v2-tile--tall' : ''} v2-reveal" data-d="${i % 3}" href="${svcHref(s)}">
          <div class="v2-tile-img">${img(im, { sizes: CARD_SIZES })}</div>
          <div class="v2-tile-body"><span class="v2-tile-num">${String(i + 1).padStart(2, '0')}</span><h3>${esc(s.title)}</h3><p>${esc(s.card)}</p><span class="v2-link">Learn more ${bi('arrow-right')}</span></div>
        </a>`;
}

/** Mosaic gallery with lightbox links. */
export function mosaic(ids, capFn) {
  return `<div class="v2-mosaic" data-lb-group>${ids.map((id) => {
    const m = IM[id]; const cap = capFn ? capFn(id) : `${m.proj ? projBySlug[m.proj].name + ' — ' : ''}${m.cap}`;
    return `<a href="${full(id)}" data-lb data-alt="${esc(m.alt)}" data-cap="${esc(cap)}">${img(id, { sizes: '(min-width: 900px) 25vw, 50vw' })}<span class="v2-cap">${esc(cap)}</span></a>`;
  }).join('')}</div>`;
}

export function hero({ trail, title, lead, image, buttons = '', eyebrow = '' }) {
  return `
  <header class="v2 v2-hero">
    <div class="v2-hero-bg">${img(image, { sizes: '100vw', priority: true, alt: '' })}</div>
    <div class="v2-wrap">
      <ol class="v2-crumbs">${trail.map(([l, h], i) => (h && i < trail.length - 1 ? `<li><a href="${h}">${esc(l)}</a></li>` : `<li aria-current="page">${esc(l)}</li>`)).join('')}</ol>
      ${eyebrow ? `<span class="v2-eyebrow">${esc(eyebrow)}</span>` : ''}
      <h1>${esc(title)}</h1>
      ${lead ? `<p class="v2-lead">${esc(lead)}</p>` : ''}
      ${buttons ? `<div class="v2-btns">${buttons}</div>` : ''}
    </div>
  </header>`;
}

export function heroSplit({ trail, title, lead, image, buttons = '', eyebrow = '' }) {
  return `
  <header class="v2 v2-hero v2-hero--split">
    <div class="v2-hero-grid">
      <div class="v2-hero-copy">
        <ol class="v2-crumbs">${trail.map(([l, h], i) => (h && i < trail.length - 1 ? `<li><a href="${h}">${esc(l)}</a></li>` : `<li aria-current="page">${esc(l)}</li>`)).join('')}</ol>
        ${eyebrow ? `<span class="v2-eyebrow">${esc(eyebrow)}</span>` : ''}
        <h1>${esc(title)}</h1>
        ${lead ? `<p class="v2-lead">${esc(lead)}</p>` : ''}
        ${buttons ? `<div class="v2-btns">${buttons}</div>` : ''}
      </div>
      <div class="v2-hero-photo">${img(image, { sizes: '(min-width: 960px) 52vw, 100vw', priority: true, alt: '' })}</div>
    </div>
  </header>`;
}

export const btn = (label, href, kind = 'gold', icon = 'arrow-right') => `<a class="v2-btn v2-btn--${kind}" href="${href}">${esc(label)} ${bi(icon)}</a>`;
export const ctaButtons = () => `${btn('Discuss Your Project', 'contact.html')}<a class="v2-btn v2-btn--line-light" href="${TEL}">${bi('telephone')} ${SITE.phone}</a>`;

export function cta(title = 'Planning an Outdoor Project?', text = 'From hardscape and civil finishing to softscape and garden development, 7 Petals helps turn outdoor spaces into functional, finished and visually appealing environments. Let’s discuss your project requirements.', id = '') {
  return `
  <section class="v2 v2-cta"${id ? ` id="${id}"` : ''}>
    <div class="v2-cta-bg">${img('bg-leaves', { sizes: '100vw', alt: '' })}</div>
    <div class="v2-wrap"><div class="v2-cta-in">
      <span class="v2-eyebrow">Get in touch</span>
      <h2 class="v2-reveal">${esc(title)}</h2>
      <p class="v2-lead v2-reveal" data-d="1">${esc(text)}</p>
      <div class="v2-btns v2-reveal" data-d="2">${btn('Discuss Your Project', 'contact.html')}<a class="v2-btn v2-btn--line-light" href="${TEL}">${bi('telephone')} ${SITE.phone}</a><a class="v2-btn v2-btn--line-light" href="https://wa.me/${SITE.whatsapp}?text=Hello%207%20Petals%20Horticulture,%20I%20would%20like%20to%20discuss%20a%20project" target="_blank" rel="noopener noreferrer">${bi('whatsapp')} WhatsApp</a></div>
    </div></div>
  </section>`;
}
